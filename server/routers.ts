import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ===== USER PROFILE =====
  profile: router({
    get: publicProcedure.input(z.object({ userId: z.number() })).query(async ({ input }) => {
      const user = await db.getUserById(input.userId);
      if (!user) return null;
      const followersCount = await db.getFollowersCount(input.userId);
      const followingCount = await db.getFollowingCount(input.userId);
      return { ...user, followersCount, followingCount };
    }),
    update: protectedProcedure.input(z.object({
      name: z.string().optional(),
      bio: z.string().optional(),
      avatarUrl: z.string().optional(),
      interests: z.string().optional(),
      isCreator: z.boolean().optional(),
    })).mutation(async ({ ctx, input }) => {
      await db.updateUserProfile(ctx.user.id, input);
      return { success: true };
    }),
    uploadAvatar: protectedProcedure.input(z.object({
      base64: z.string(),
      mimeType: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const ext = input.mimeType.split("/")[1] || "jpg";
      const key = `avatars/${ctx.user.id}-${nanoid(8)}.${ext}`;
      const buffer = Buffer.from(input.base64, "base64");
      const { url } = await storagePut(key, buffer, input.mimeType);
      await db.updateUserProfile(ctx.user.id, { avatarUrl: url });
      return { url };
    }),
  }),

  // ===== CELL GROUPS =====
  groups: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      category: z.string().optional(),
      search: z.string().optional(),
    }).optional()).query(async ({ input }) => {
      return db.getCellGroups(input ?? {});
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const group = await db.getCellGroupById(input.id);
      if (!group) return null;
      const memberCount = await db.getMemberCount(input.id);
      return { ...group, memberCount };
    }),
    members: publicProcedure.input(z.object({ groupId: z.number() })).query(async ({ input }) => {
      return db.getCellGroupMembers(input.groupId);
    }),
    myGroups: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserCellGroups(ctx.user.id);
    }),
    create: protectedProcedure.input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      category: z.string().optional(),
      imageUrl: z.string().optional(),
      schedule: z.string().optional(),
      maxMembers: z.number().optional(),
      isPublic: z.boolean().optional(),
    })).mutation(async ({ ctx, input }) => {
      const groupId = await db.createCellGroup({ ...input, creatorId: ctx.user.id });
      return { groupId };
    }),
    join: protectedProcedure.input(z.object({ groupId: z.number() })).mutation(async ({ ctx, input }) => {
      const joined = await db.joinCellGroup(input.groupId, ctx.user.id);
      if (joined) {
        const group = await db.getCellGroupById(input.groupId);
        await db.notifyGroupMembers(input.groupId, ctx.user.id, {
          type: "group",
          title: "New member joined",
          message: `${ctx.user.name || "Someone"} joined ${group?.name || "your group"}`,
          linkUrl: `/groups/${input.groupId}`,
        });
      }
      return { joined };
    }),
    leave: protectedProcedure.input(z.object({ groupId: z.number() })).mutation(async ({ ctx, input }) => {
      await db.leaveCellGroup(input.groupId, ctx.user.id);
      return { success: true };
    }),
    isMember: protectedProcedure.input(z.object({ groupId: z.number() })).query(async ({ ctx, input }) => {
      const groups = await db.getUserCellGroups(ctx.user.id);
      return groups.some(g => g.group.id === input.groupId);
    }),
  }),

  // ===== MEETINGS =====
  meetings: router({
    list: publicProcedure.input(z.object({ groupId: z.number() })).query(async ({ input }) => {
      return db.getGroupMeetings(input.groupId);
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return db.getMeetingById(input.id);
    }),
    create: protectedProcedure.input(z.object({
      groupId: z.number(),
      title: z.string().min(1),
      description: z.string().optional(),
      scheduledAt: z.number(),
      duration: z.number().optional(),
    })).mutation(async ({ ctx, input }) => {
      const roomId = nanoid(12);
      const meetingId = await db.createMeeting({ ...input, roomId, createdBy: ctx.user.id });
      // Notify group members
      const group = await db.getCellGroupById(input.groupId);
      await db.notifyGroupMembers(input.groupId, ctx.user.id, {
        type: "meeting",
        title: "New meeting scheduled",
        message: `${input.title} in ${group?.name || "your group"} at ${new Date(input.scheduledAt).toLocaleString()}`,
        linkUrl: `/groups/${input.groupId}/meeting/${meetingId}`,
      });
      return { meetingId, roomId };
    }),
    updateStatus: protectedProcedure.input(z.object({
      meetingId: z.number(),
      status: z.enum(["scheduled", "live", "ended"]),
    })).mutation(async ({ input }) => {
      await db.updateMeetingStatus(input.meetingId, input.status);
      return { success: true };
    }),
  }),

  // ===== REELS =====
  reels: router({
    list: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      creatorId: z.number().optional(),
      tag: z.string().optional(),
    }).optional()).query(async ({ input }) => {
      return db.getReels(input ?? {});
    }),
    get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      return db.getReelById(input.id);
    }),
    feed: protectedProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    }).optional()).query(async ({ ctx, input }) => {
      return db.getFollowedReels(ctx.user.id, input?.limit ?? 20, input?.offset ?? 0);
    }),
    create: protectedProcedure.input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      videoUrl: z.string(),
      thumbnailUrl: z.string().optional(),
      duration: z.number().optional(),
      tags: z.string().optional(),
    })).mutation(async ({ ctx, input }) => {
      // LLM content moderation
      if (input.description || input.title) {
        const modResult = await moderateContent(`${input.title} ${input.description || ""}`);
        if (!modResult.safe) {
          return { reelId: null, flagged: true, reason: modResult.reason };
        }
      }
      const reelId = await db.createReel({ ...input, creatorId: ctx.user.id });
      // Parse and upsert tags
      if (input.tags) {
        try {
          const tagList = JSON.parse(input.tags) as string[];
          for (const t of tagList) await db.upsertTag(t.toLowerCase().trim());
        } catch {}
      }
      // Notify followers
      await db.notifyFollowers(ctx.user.id, {
        type: "reel",
        title: "New reel posted",
        message: `${ctx.user.name || "A creator you follow"} posted: ${input.title}`,
        linkUrl: `/reels/${reelId}`,
      });
      return { reelId, flagged: false };
    }),
    uploadVideo: protectedProcedure.input(z.object({
      base64: z.string(),
      mimeType: z.string(),
      filename: z.string(),
    })).mutation(async ({ ctx, input }) => {
      const ext = input.filename.split(".").pop() || "mp4";
      const key = `reels/${ctx.user.id}-${nanoid(8)}.${ext}`;
      const buffer = Buffer.from(input.base64, "base64");
      const { url } = await storagePut(key, buffer, input.mimeType);
      return { url };
    }),
    like: protectedProcedure.input(z.object({ reelId: z.number() })).mutation(async ({ ctx, input }) => {
      const liked = await db.toggleReelLike(input.reelId, ctx.user.id);
      return { liked };
    }),
    hasLiked: protectedProcedure.input(z.object({ reelId: z.number() })).query(async ({ ctx, input }) => {
      return db.hasUserLikedReel(input.reelId, ctx.user.id);
    }),
    view: publicProcedure.input(z.object({ reelId: z.number() })).mutation(async ({ input }) => {
      await db.incrementReelViews(input.reelId);
      return { success: true };
    }),
    comments: publicProcedure.input(z.object({ reelId: z.number() })).query(async ({ input }) => {
      return db.getReelComments(input.reelId);
    }),
    addComment: protectedProcedure.input(z.object({
      reelId: z.number(),
      content: z.string().min(1),
    })).mutation(async ({ ctx, input }) => {
      // Moderate comment
      const modResult = await moderateContent(input.content);
      if (!modResult.safe) {
        return { commentId: null, flagged: true, reason: modResult.reason };
      }
      const commentId = await db.addReelComment({ reelId: input.reelId, userId: ctx.user.id, content: input.content });
      return { commentId, flagged: false };
    }),
  }),

  // ===== FOLLOWS =====
  follows: router({
    follow: protectedProcedure.input(z.object({ userId: z.number() })).mutation(async ({ ctx, input }) => {
      const followed = await db.followUser(ctx.user.id, input.userId);
      if (followed) {
        await db.createNotification({
          userId: input.userId,
          type: "follow",
          title: "New follower",
          message: `${ctx.user.name || "Someone"} started following you`,
          linkUrl: `/profile/${ctx.user.id}`,
        });
      }
      return { followed };
    }),
    unfollow: protectedProcedure.input(z.object({ userId: z.number() })).mutation(async ({ ctx, input }) => {
      await db.unfollowUser(ctx.user.id, input.userId);
      return { success: true };
    }),
    isFollowing: protectedProcedure.input(z.object({ userId: z.number() })).query(async ({ ctx, input }) => {
      return db.isFollowing(ctx.user.id, input.userId);
    }),
  }),

  // ===== DISCOVER =====
  discover: router({
    content: publicProcedure.input(z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      category: z.string().optional(),
      contentType: z.string().optional(),
      search: z.string().optional(),
    }).optional()).query(async ({ input }) => {
      return db.getDiscoveryContent(input ?? {});
    }),
    tags: publicProcedure.query(async () => {
      return db.getPopularTags(30);
    }),
    aggregate: protectedProcedure.mutation(async () => {
      // Use LLM to generate Christian content suggestions
      const result = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are a Christian content curator. Generate 5 real, high-quality Christian articles/stories with real URLs from well-known Christian websites. Return JSON array with objects having: title, description, sourceUrl, sourceName, category (one of: faith, prayer, worship, bible-study, testimony, devotional, community), contentType (article), tags (comma-separated). Only include real, existing URLs from sites like Christianity Today, Desiring God, The Gospel Coalition, Bible Gateway, Relevant Magazine, etc."
          },
          { role: "user", content: "Generate 5 trending Christian content items for today's discover feed." }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "content_list",
            strict: true,
            schema: {
              type: "object",
              properties: {
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      sourceUrl: { type: "string" },
                      sourceName: { type: "string" },
                      category: { type: "string" },
                      contentType: { type: "string" },
                      tags: { type: "string" },
                    },
                    required: ["title", "description", "sourceUrl", "sourceName", "category", "contentType", "tags"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["items"],
              additionalProperties: false,
            },
          },
        },
      });
      const content = result.choices[0]?.message?.content;
      if (typeof content === "string") {
        try {
          const parsed = JSON.parse(content);
          for (const item of parsed.items) {
            await db.addDiscoveryContent({
              title: item.title,
              description: item.description,
              sourceUrl: item.sourceUrl,
              sourceName: item.sourceName,
              category: item.category,
              contentType: item.contentType as any,
              tags: JSON.stringify(item.tags.split(",").map((t: string) => t.trim())),
              publishedAt: Date.now(),
            });
          }
        } catch (e) {
          console.error("Failed to parse aggregated content:", e);
        }
      }
      return { success: true };
    }),
  }),

  // ===== NOTIFICATIONS =====
  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserNotifications(ctx.user.id);
    }),
    unreadCount: protectedProcedure.query(async ({ ctx }) => {
      return db.getUnreadNotificationCount(ctx.user.id);
    }),
    markRead: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
      await db.markNotificationRead(input.id, ctx.user.id);
      return { success: true };
    }),
    markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
      await db.markAllNotificationsRead(ctx.user.id);
      return { success: true };
    }),
  }),

  // ===== SEARCH =====
  search: router({
    all: publicProcedure.input(z.object({ query: z.string().min(1) })).query(async ({ input }) => {
      const [groupResults, creatorResults, contentResults] = await Promise.all([
        db.getCellGroups({ search: input.query, limit: 10 }),
        db.searchCreators(input.query, 10),
        db.getDiscoveryContent({ search: input.query, limit: 10 }),
      ]);
      return { groups: groupResults, creators: creatorResults, content: contentResults };
    }),
  }),
});

// ===== LLM CONTENT MODERATION =====
async function moderateContent(text: string): Promise<{ safe: boolean; reason?: string }> {
  try {
    const result = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are a content moderator for a Christian community platform. Review the following text and determine if it is appropriate for a Christian community. Flag content that contains: profanity, hate speech, explicit content, spam, or content that goes against Christian values. Respond with JSON."
        },
        { role: "user", content: `Review this content: "${text}"` }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "moderation_result",
          strict: true,
          schema: {
            type: "object",
            properties: {
              safe: { type: "boolean" },
              reason: { type: "string" },
            },
            required: ["safe", "reason"],
            additionalProperties: false,
          },
        },
      },
    });
    const content = result.choices[0]?.message?.content;
    if (typeof content === "string") {
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Content moderation failed:", e);
  }
  return { safe: true }; // Default to safe if moderation fails
}

export type AppRouter = typeof appRouter;

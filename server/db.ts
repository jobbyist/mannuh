import { and, desc, eq, like, or, sql, inArray, ne } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, cellGroups, cellGroupMembers, meetings,
  reels, reelLikes, reelComments, follows, discoveryContent,
  tags, notifications
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ===== USER PROFILE =====
export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result[0] ?? undefined;
}

export async function updateUserProfile(userId: number, data: { name?: string; bio?: string; avatarUrl?: string; interests?: string; isCreator?: boolean }) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set(data).where(eq(users.id, userId));
}

// ===== CELL GROUPS =====
export async function createCellGroup(data: { name: string; description?: string; category?: string; imageUrl?: string; creatorId: number; schedule?: string; maxMembers?: number; isPublic?: boolean }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(cellGroups).values(data).$returningId();
  // Auto-add creator as admin member
  await db.insert(cellGroupMembers).values({ groupId: result.id, userId: data.creatorId, role: "admin" });
  return result.id;
}

export async function getCellGroups(opts: { limit?: number; offset?: number; category?: string; search?: string } = {}) {
  const db = await getDb();
  if (!db) return [];
  const { limit = 20, offset = 0, category, search } = opts;
  const conditions = [eq(cellGroups.isPublic, true)];
  if (category) conditions.push(eq(cellGroups.category, category));
  if (search) conditions.push(or(like(cellGroups.name, `%${search}%`), like(cellGroups.description, `%${search}%`))!);
  return db.select().from(cellGroups).where(and(...conditions)).orderBy(desc(cellGroups.createdAt)).limit(limit).offset(offset);
}

export async function getCellGroupById(groupId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(cellGroups).where(eq(cellGroups.id, groupId)).limit(1);
  return result[0] ?? undefined;
}

export async function getCellGroupMembers(groupId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({ member: cellGroupMembers, user: users })
    .from(cellGroupMembers)
    .innerJoin(users, eq(cellGroupMembers.userId, users.id))
    .where(eq(cellGroupMembers.groupId, groupId));
}

export async function joinCellGroup(groupId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  const existing = await db.select().from(cellGroupMembers).where(and(eq(cellGroupMembers.groupId, groupId), eq(cellGroupMembers.userId, userId))).limit(1);
  if (existing.length > 0) return false;
  await db.insert(cellGroupMembers).values({ groupId, userId, role: "member" });
  return true;
}

export async function leaveCellGroup(groupId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(cellGroupMembers).where(and(eq(cellGroupMembers.groupId, groupId), eq(cellGroupMembers.userId, userId)));
}

export async function getUserCellGroups(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({ group: cellGroups, membership: cellGroupMembers })
    .from(cellGroupMembers)
    .innerJoin(cellGroups, eq(cellGroupMembers.groupId, cellGroups.id))
    .where(eq(cellGroupMembers.userId, userId));
}

export async function getMemberCount(groupId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(cellGroupMembers).where(eq(cellGroupMembers.groupId, groupId));
  return result[0]?.count ?? 0;
}

// ===== MEETINGS =====
export async function createMeeting(data: { groupId: number; title: string; description?: string; scheduledAt: number; duration?: number; roomId?: string; createdBy: number }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(meetings).values(data).$returningId();
  return result.id;
}

export async function getGroupMeetings(groupId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(meetings).where(eq(meetings.groupId, groupId)).orderBy(desc(meetings.scheduledAt));
}

export async function updateMeetingStatus(meetingId: number, status: "scheduled" | "live" | "ended") {
  const db = await getDb();
  if (!db) return;
  await db.update(meetings).set({ status }).where(eq(meetings.id, meetingId));
}

export async function getMeetingById(meetingId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(meetings).where(eq(meetings.id, meetingId)).limit(1);
  return result[0] ?? undefined;
}

// ===== REELS =====
export async function createReel(data: { creatorId: number; title: string; description?: string; videoUrl: string; thumbnailUrl?: string; duration?: number; tags?: string }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(reels).values(data).$returningId();
  return result.id;
}

export async function getReels(opts: { limit?: number; offset?: number; creatorId?: number; tag?: string } = {}) {
  const db = await getDb();
  if (!db) return [];
  const { limit = 20, offset = 0, creatorId, tag } = opts;
  const conditions = [eq(reels.isFlagged, false)];
  if (creatorId) conditions.push(eq(reels.creatorId, creatorId));
  if (tag) conditions.push(like(reels.tags, `%${tag}%`));
  return db.select().from(reels).where(and(...conditions)).orderBy(desc(reels.createdAt)).limit(limit).offset(offset);
}

export async function getReelById(reelId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(reels).where(eq(reels.id, reelId)).limit(1);
  return result[0] ?? undefined;
}

export async function incrementReelViews(reelId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(reels).set({ viewsCount: sql`${reels.viewsCount} + 1` }).where(eq(reels.id, reelId));
}

export async function toggleReelLike(reelId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  const existing = await db.select().from(reelLikes).where(and(eq(reelLikes.reelId, reelId), eq(reelLikes.userId, userId))).limit(1);
  if (existing.length > 0) {
    await db.delete(reelLikes).where(eq(reelLikes.id, existing[0].id));
    await db.update(reels).set({ likesCount: sql`GREATEST(${reels.likesCount} - 1, 0)` }).where(eq(reels.id, reelId));
    return false;
  }
  await db.insert(reelLikes).values({ reelId, userId });
  await db.update(reels).set({ likesCount: sql`${reels.likesCount} + 1` }).where(eq(reels.id, reelId));
  return true;
}

export async function hasUserLikedReel(reelId: number, userId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(reelLikes).where(and(eq(reelLikes.reelId, reelId), eq(reelLikes.userId, userId))).limit(1);
  return result.length > 0;
}

export async function addReelComment(data: { reelId: number; userId: number; content: string }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(reelComments).values(data).$returningId();
  return result.id;
}

export async function getReelComments(reelId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({ comment: reelComments, user: { id: users.id, name: users.name, avatarUrl: users.avatarUrl } })
    .from(reelComments)
    .innerJoin(users, eq(reelComments.userId, users.id))
    .where(and(eq(reelComments.reelId, reelId), eq(reelComments.isFlagged, false)))
    .orderBy(desc(reelComments.createdAt));
}

// ===== FOLLOWS =====
export async function followUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return false;
  const existing = await db.select().from(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId))).limit(1);
  if (existing.length > 0) return false;
  await db.insert(follows).values({ followerId, followingId });
  return true;
}

export async function unfollowUser(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
}

export async function isFollowing(followerId: number, followingId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(follows).where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId))).limit(1);
  return result.length > 0;
}

export async function getFollowedCreatorIds(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const result = await db.select({ followingId: follows.followingId }).from(follows).where(eq(follows.followerId, userId));
  return result.map(r => r.followingId);
}

export async function getFollowersCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(follows).where(eq(follows.followingId, userId));
  return result[0]?.count ?? 0;
}

export async function getFollowingCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(follows).where(eq(follows.followerId, userId));
  return result[0]?.count ?? 0;
}

export async function getFollowedReels(userId: number, limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  const followedIds = await getFollowedCreatorIds(userId);
  if (followedIds.length === 0) return [];
  return db.select().from(reels).where(and(inArray(reels.creatorId, followedIds), eq(reels.isFlagged, false))).orderBy(desc(reels.createdAt)).limit(limit).offset(offset);
}

// ===== DISCOVER CONTENT =====
export async function addDiscoveryContent(data: { title: string; description?: string; sourceUrl: string; sourceName?: string; imageUrl?: string; category?: string; tags?: string; contentType?: "article" | "video" | "podcast" | "blog" | "news"; publishedAt?: number }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(discoveryContent).values(data).$returningId();
  return result.id;
}

export async function getDiscoveryContent(opts: { limit?: number; offset?: number; category?: string; contentType?: string; search?: string } = {}) {
  const db = await getDb();
  if (!db) return [];
  const { limit = 20, offset = 0, category, contentType, search } = opts;
  const conditions = [eq(discoveryContent.isFlagged, false)];
  if (category) conditions.push(eq(discoveryContent.category, category));
  if (contentType) conditions.push(eq(discoveryContent.contentType, contentType as any));
  if (search) conditions.push(or(like(discoveryContent.title, `%${search}%`), like(discoveryContent.description, `%${search}%`))!);
  return db.select().from(discoveryContent).where(and(...conditions)).orderBy(desc(discoveryContent.createdAt)).limit(limit).offset(offset);
}

// ===== TAGS =====
export async function getPopularTags(limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tags).orderBy(desc(tags.usageCount)).limit(limit);
}

export async function upsertTag(name: string, category?: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(tags).values({ name, category, usageCount: 1 }).onDuplicateKeyUpdate({ set: { usageCount: sql`${tags.usageCount} + 1` } });
}

// ===== NOTIFICATIONS =====
export async function createNotification(data: { userId: number; type: "meeting" | "reel" | "group" | "content" | "follow" | "system"; title: string; message?: string; linkUrl?: string }) {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db.insert(notifications).values(data).$returningId();
  return result.id;
}

export async function getUserNotifications(userId: number, limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
}

export async function markNotificationRead(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(notifications).set({ isRead: true }).where(and(eq(notifications.id, notificationId), eq(notifications.userId, userId)));
}

export async function markAllNotificationsRead(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(notifications).set({ isRead: true }).where(eq(notifications.userId, userId));
}

export async function getUnreadNotificationCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  return result[0]?.count ?? 0;
}

// ===== SEARCH =====
export async function searchCreators(query: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).where(and(eq(users.isCreator, true), or(like(users.name, `%${query}%`), like(users.bio, `%${query}%`))!)).limit(limit);
}

// ===== CONTENT MODERATION =====
export async function flagReel(reelId: number, reason: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(reels).set({ isFlagged: true, flagReason: reason }).where(eq(reels.id, reelId));
}

export async function flagComment(commentId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(reelComments).set({ isFlagged: true }).where(eq(reelComments.id, commentId));
}

export async function flagDiscoveryContent(contentId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(discoveryContent).set({ isFlagged: true }).where(eq(discoveryContent.id, contentId));
}

// ===== BATCH NOTIFICATIONS =====
export async function notifyGroupMembers(groupId: number, excludeUserId: number, data: { type: "meeting" | "group"; title: string; message?: string; linkUrl?: string }) {
  const db = await getDb();
  if (!db) return;
  const members = await db.select().from(cellGroupMembers).where(and(eq(cellGroupMembers.groupId, groupId), ne(cellGroupMembers.userId, excludeUserId)));
  if (members.length === 0) return;
  const notifs = members.map(m => ({ userId: m.userId, ...data }));
  await db.insert(notifications).values(notifs);
}

export async function notifyFollowers(creatorId: number, data: { type: "reel"; title: string; message?: string; linkUrl?: string }) {
  const db = await getDb();
  if (!db) return;
  const followerRows = await db.select({ followerId: follows.followerId }).from(follows).where(eq(follows.followingId, creatorId));
  if (followerRows.length === 0) return;
  const notifs = followerRows.map(f => ({ userId: f.followerId, ...data }));
  await db.insert(notifications).values(notifs);
}

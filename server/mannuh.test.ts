import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createUser(overrides: Partial<AuthenticatedUser> = {}): AuthenticatedUser {
  return {
    id: 1,
    openId: "test-user-openid",
    email: "test@mannuh.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    bio: null,
    avatarUrl: null,
    isCreator: false,
    interests: null,
    ...overrides,
  };
}

function createContext(user?: AuthenticatedUser | null): TrpcContext {
  return {
    user: user ?? null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user data for authenticated users", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(result?.name).toBe("Test User");
    expect(result?.email).toBe("test@mannuh.com");
  });
});

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(ctx.res.clearCookie).toHaveBeenCalledWith(
      COOKIE_NAME,
      expect.objectContaining({ maxAge: -1 })
    );
  });
});

describe("groups router", () => {
  it("lists groups without errors", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.list({ limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists groups with category filter", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.list({ category: "Bible Study", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists groups with search filter", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.list({ search: "prayer", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets a group by id (returns null for non-existent)", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.get({ id: 99999 });
    expect(result).toBeNull();
  });

  it("gets group members for a group", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.members({ groupId: 99999 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("requires auth to create a group", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.groups.create({ name: "Test Group" })
    ).rejects.toThrow();
  });

  it("requires auth to join a group", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.groups.join({ groupId: 1 })
    ).rejects.toThrow();
  });

  it("requires auth to get my groups", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.groups.myGroups()).rejects.toThrow();
  });

  it("authenticated user can list my groups", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.groups.myGroups();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("meetings router", () => {
  it("lists meetings for a group", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.meetings.list({ groupId: 1 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets a meeting by id", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.meetings.get({ id: 99999 });
    expect(result).toBeUndefined();
  });

  it("requires auth to create a meeting", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.meetings.create({ groupId: 1, title: "Test", scheduledAt: Date.now() })
    ).rejects.toThrow();
  });
});

describe("reels router", () => {
  it("lists reels without errors", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.list({ limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists reels with creatorId filter", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.list({ creatorId: 1, limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets a reel by id (non-existent)", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.get({ id: 99999 });
    expect(result).toBeUndefined();
  });

  it("gets reel comments", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.comments({ reelId: 99999 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("requires auth to create a reel", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reels.create({ title: "Test", videoUrl: "https://example.com/video.mp4" })
    ).rejects.toThrow();
  });

  it("requires auth to like a reel", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reels.like({ reelId: 1 })
    ).rejects.toThrow();
  });

  it("requires auth to add a comment", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reels.addComment({ reelId: 1, content: "Great!" })
    ).rejects.toThrow();
  });

  it("requires auth to get feed", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.reels.feed()).rejects.toThrow();
  });

  it("authenticated user can get feed", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.feed();
    expect(Array.isArray(result)).toBe(true);
  });

  it("view reel increments views", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.reels.view({ reelId: 1 });
    expect(result).toEqual({ success: true });
  });
});

describe("follows router", () => {
  it("requires auth to follow", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.follows.follow({ userId: 2 })
    ).rejects.toThrow();
  });

  it("requires auth to unfollow", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.follows.unfollow({ userId: 2 })
    ).rejects.toThrow();
  });

  it("requires auth to check isFollowing", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.follows.isFollowing({ userId: 2 })
    ).rejects.toThrow();
  });
});

describe("discover router", () => {
  it("lists content without errors", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.discover.content({ limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists content with category filter", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.discover.content({ category: "faith", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("lists content with contentType filter", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.discover.content({ contentType: "article", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("gets popular tags", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.discover.tags();
    expect(Array.isArray(result)).toBe(true);
  });

  it("requires auth to aggregate content", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.discover.aggregate()).rejects.toThrow();
  });
});

describe("notifications router", () => {
  it("requires auth to list notifications", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.notifications.list()).rejects.toThrow();
  });

  it("requires auth to get unread count", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.notifications.unreadCount()).rejects.toThrow();
  });

  it("authenticated user can list notifications", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.notifications.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("authenticated user can get unread count", async () => {
    const user = createUser();
    const ctx = createContext(user);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.notifications.unreadCount();
    expect(typeof result).toBe("number");
  });

  it("requires auth to mark notification read", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.notifications.markRead({ id: 1 })
    ).rejects.toThrow();
  });

  it("requires auth to mark all read", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(caller.notifications.markAllRead()).rejects.toThrow();
  });
});

describe("search router", () => {
  it("searches across all entities", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.search.all({ query: "prayer" });
    expect(result).toHaveProperty("groups");
    expect(result).toHaveProperty("creators");
    expect(result).toHaveProperty("content");
    expect(Array.isArray(result.groups)).toBe(true);
    expect(Array.isArray(result.creators)).toBe(true);
    expect(Array.isArray(result.content)).toBe(true);
  });

  it("rejects empty search query", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.search.all({ query: "" })
    ).rejects.toThrow();
  });
});

describe("profile router", () => {
  it("gets a user profile", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    const result = await caller.profile.get({ userId: 99999 });
    expect(result).toBeNull();
  });

  it("requires auth to update profile", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.profile.update({ name: "New Name" })
    ).rejects.toThrow();
  });

  it("requires auth to upload avatar", async () => {
    const ctx = createContext(null);
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.profile.uploadAvatar({ base64: "abc", mimeType: "image/png" })
    ).rejects.toThrow();
  });
});

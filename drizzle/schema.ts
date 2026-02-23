import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  // Extended profile fields
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  isCreator: boolean("isCreator").default(false).notNull(),
  interests: text("interests"), // JSON array of interest tags
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Cell groups — virtual Christian community groups
 */
export const cellGroups = mysqlTable("cellGroups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  imageUrl: text("imageUrl"),
  creatorId: int("creatorId").notNull(),
  schedule: text("schedule"), // JSON: { day, time, timezone, recurring }
  maxMembers: int("maxMembers").default(50),
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CellGroup = typeof cellGroups.$inferSelect;
export type InsertCellGroup = typeof cellGroups.$inferInsert;

/**
 * Cell group memberships
 */
export const cellGroupMembers = mysqlTable("cellGroupMembers", {
  id: int("id").autoincrement().primaryKey(),
  groupId: int("groupId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("memberRole", ["admin", "member"]).default("member").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export type CellGroupMember = typeof cellGroupMembers.$inferSelect;

/**
 * Cell group meetings (scheduled video/audio calls)
 */
export const meetings = mysqlTable("meetings", {
  id: int("id").autoincrement().primaryKey(),
  groupId: int("groupId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  scheduledAt: bigint("scheduledAt", { mode: "number" }).notNull(), // UTC ms
  duration: int("duration").default(60), // minutes
  roomId: varchar("roomId", { length: 100 }),
  status: mysqlEnum("meetingStatus", ["scheduled", "live", "ended"]).default("scheduled").notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Meeting = typeof meetings.$inferSelect;

/**
 * Video reels — short-form Christian video content
 */
export const reels = mysqlTable("reels", {
  id: int("id").autoincrement().primaryKey(),
  creatorId: int("creatorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("videoUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  duration: int("duration"), // seconds
  tags: text("tags"), // JSON array of tags
  likesCount: int("likesCount").default(0).notNull(),
  viewsCount: int("viewsCount").default(0).notNull(),
  isFlagged: boolean("isFlagged").default(false).notNull(),
  flagReason: text("flagReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reel = typeof reels.$inferSelect;

/**
 * Reel likes
 */
export const reelLikes = mysqlTable("reelLikes", {
  id: int("id").autoincrement().primaryKey(),
  reelId: int("reelId").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Reel comments
 */
export const reelComments = mysqlTable("reelComments", {
  id: int("id").autoincrement().primaryKey(),
  reelId: int("reelId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  isFlagged: boolean("isFlagged").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Creator follows
 */
export const follows = mysqlTable("follows", {
  id: int("id").autoincrement().primaryKey(),
  followerId: int("followerId").notNull(),
  followingId: int("followingId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Aggregated Christian content from external sources
 */
export const discoveryContent = mysqlTable("discoveryContent", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  sourceUrl: text("sourceUrl").notNull(),
  sourceName: varchar("sourceName", { length: 255 }),
  imageUrl: text("imageUrl"),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  contentType: mysqlEnum("contentType", ["article", "video", "podcast", "blog", "news"]).default("article").notNull(),
  isFlagged: boolean("isFlagged").default(false).notNull(),
  publishedAt: bigint("publishedAt", { mode: "number" }), // UTC ms
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DiscoveryContent = typeof discoveryContent.$inferSelect;

/**
 * Content tags for categorization
 */
export const tags = mysqlTable("tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  category: varchar("category", { length: 100 }),
  usageCount: int("usageCount").default(0).notNull(),
});

/**
 * In-app notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("notificationType", ["meeting", "reel", "group", "content", "follow", "system"]).default("system").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  linkUrl: text("linkUrl"),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;

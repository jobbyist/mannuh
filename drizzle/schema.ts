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
  // Identity primitives
  testimony: text("testimony"),
  spiritualGifts: text("spiritualGifts"), // JSON array of gifts/serving interests
  languages: text("languages"), // JSON array of language codes
  timezone: varchar("timezone", { length: 100 }),
  denomination: varchar("denomination", { length: 100 }),
  // Privacy settings - JSON with field-level controls
  privacySettings: text("privacySettings"), // { testimony: 'public|members|cell-group-only', etc }
  // Features
  isPremium: boolean("isPremium").default(false).notNull(),
  dmEnabled: boolean("dmEnabled").default(false).notNull(), // Direct messaging
  credits: int("credits").default(0).notNull(), // Digital wallet credits
  loginStreak: int("loginStreak").default(0).notNull(),
  lastLoginDate: timestamp("lastLoginDate"),
  // Onboarding
  onboardingPurpose: text("onboardingPurpose"), // JSON array: community, learning, creating, prayer
  onboardingCompleted: boolean("onboardingCompleted").default(false).notNull(),
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
  type: mysqlEnum("notificationType", ["meeting", "reel", "group", "content", "follow", "system", "event"]).default("system").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  linkUrl: text("linkUrl"),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;

/**
 * Guided Pathways — structured learning paths for spiritual growth
 */
export const pathways = mysqlTable("pathways", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnailUrl"),
  duration: varchar("duration", { length: 50 }), // e.g., "7 days"
  category: varchar("category", { length: 100 }),
  isPremium: boolean("isPremium").default(true).notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Pathway = typeof pathways.$inferSelect;

/**
 * Pathway steps — individual lessons within a pathway
 */
export const pathwaySteps = mysqlTable("pathwaySteps", {
  id: int("id").autoincrement().primaryKey(),
  pathwayId: int("pathwayId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // Bible reading or lesson content
  stepType: mysqlEnum("stepType", ["reading", "quiz", "reflection"]).default("reading").notNull(),
  quizData: text("quizData"), // JSON for quiz questions
  audioUrl: text("audioUrl"), // TTS audio URL
  order: int("order").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PathwayStep = typeof pathwaySteps.$inferSelect;

/**
 * User pathway progress
 */
export const pathwayProgress = mysqlTable("pathwayProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  pathwayId: int("pathwayId").notNull(),
  completedSteps: text("completedSteps"), // JSON array of completed step IDs
  currentStep: int("currentStep").default(0).notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PathwayProgress = typeof pathwayProgress.$inferSelect;

/**
 * Articles — full Christian articles and stories
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(), // Full article content
  excerpt: text("excerpt"),
  imageUrl: text("imageUrl"),
  author: varchar("author", { length: 255 }).default("Published by the mannuh team").notNull(),
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  readingTimeMinutes: int("readingTimeMinutes").default(5).notNull(),
  isPremium: boolean("isPremium").default(false).notNull(),
  audioUrl: text("audioUrl"), // TTS audio URL
  likesCount: int("likesCount").default(0).notNull(),
  commentsCount: int("commentsCount").default(0).notNull(),
  viewsCount: int("viewsCount").default(0).notNull(),
  publishedAt: bigint("publishedAt", { mode: "number" }).notNull(), // UTC ms
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;

/**
 * Article likes
 */
export const articleLikes = mysqlTable("articleLikes", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  userId: int("userId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Article comments
 */
export const articleComments = mysqlTable("articleComments", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ArticleComment = typeof articleComments.$inferSelect;

/**
 * Events — church events, conferences, worship nights, etc.
 */
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  eventType: mysqlEnum("eventType", ["online", "in-person", "hybrid"]).default("in-person").notNull(),
  category: varchar("category", { length: 100 }), // worship, bible-study, conference, workshop, etc.
  location: text("location"), // For in-person events
  virtualLink: text("virtualLink"), // For online events
  startTime: bigint("startTime", { mode: "number" }).notNull(), // UTC ms
  endTime: bigint("endTime", { mode: "number" }).notNull(),
  timezone: varchar("timezone", { length: 100 }),
  organizerId: int("organizerId").notNull(),
  organizerType: mysqlEnum("organizerType", ["user", "church"]).default("user").notNull(),
  maxAttendees: int("maxAttendees"),
  isPaid: boolean("isPaid").default(false).notNull(),
  ticketPrice: int("ticketPrice"), // In cents
  isVerified: boolean("isVerified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;

/**
 * Event registrations
 */
export const eventRegistrations = mysqlTable("eventRegistrations", {
  id: int("id").autoincrement().primaryKey(),
  eventId: int("eventId").notNull(),
  userId: int("userId").notNull(),
  status: mysqlEnum("registrationStatus", ["registered", "paid", "cancelled"]).default("registered").notNull(),
  ticketsPurchased: int("ticketsPurchased").default(1).notNull(),
  paymentAmount: int("paymentAmount"), // In cents
  registeredAt: timestamp("registeredAt").defaultNow().notNull(),
});

export type EventRegistration = typeof eventRegistrations.$inferSelect;

/**
 * Churches/Ministries directory
 */
export const churches = mysqlTable("churches", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  logoUrl: text("logoUrl"),
  denomination: varchar("denomination", { length: 100 }),
  pastor: varchar("pastor", { length: 255 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }),
  zipCode: varchar("zipCode", { length: 20 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  website: text("website"),
  isVerified: boolean("isVerified").default(false).notNull(),
  ownerId: int("ownerId"), // User who claimed this page
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Church = typeof churches.$inferSelect;

/**
 * User badges for achievements
 */
export const userBadges = mysqlTable("userBadges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeType: varchar("badgeType", { length: 100 }).notNull(), // pathway-complete, streak-7, streak-30, etc.
  badgeData: text("badgeData"), // JSON with badge details
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export type UserBadge = typeof userBadges.$inferSelect;

/**
 * User blocks for privacy
 */
export const userBlocks = mysqlTable("userBlocks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // User who is blocking
  blockedUserId: int("blockedUserId").notNull(), // User being blocked
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * User mutes for content filtering
 */
export const userMutes = mysqlTable("userMutes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // User who is muting
  mutedUserId: int("mutedUserId").notNull(), // User being muted
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/**
 * Direct messages between premium users
 */
export const directMessages = mysqlTable("directMessages", {
  id: int("id").autoincrement().primaryKey(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  content: text("content").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DirectMessage = typeof directMessages.$inferSelect;

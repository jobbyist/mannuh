CREATE TABLE `cellGroupMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`userId` int NOT NULL,
	`memberRole` enum('admin','member') NOT NULL DEFAULT 'member',
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cellGroupMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cellGroups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100),
	`imageUrl` text,
	`creatorId` int NOT NULL,
	`schedule` text,
	`maxMembers` int DEFAULT 50,
	`isPublic` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cellGroups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `discoveryContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`description` text,
	`sourceUrl` text NOT NULL,
	`sourceName` varchar(255),
	`imageUrl` text,
	`category` varchar(100),
	`tags` text,
	`contentType` enum('article','video','podcast','blog','news') NOT NULL DEFAULT 'article',
	`isFlagged` boolean NOT NULL DEFAULT false,
	`publishedAt` bigint,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `discoveryContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meetings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`groupId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`scheduledAt` bigint NOT NULL,
	`duration` int DEFAULT 60,
	`roomId` varchar(100),
	`meetingStatus` enum('scheduled','live','ended') NOT NULL DEFAULT 'scheduled',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `meetings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`notificationType` enum('meeting','reel','group','content','follow','system') NOT NULL DEFAULT 'system',
	`title` varchar(255) NOT NULL,
	`message` text,
	`linkUrl` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reelComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reelId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`isFlagged` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reelComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reelLikes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reelId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reelLikes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reels` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`videoUrl` text NOT NULL,
	`thumbnailUrl` text,
	`duration` int,
	`tags` text,
	`likesCount` int NOT NULL DEFAULT 0,
	`viewsCount` int NOT NULL DEFAULT 0,
	`isFlagged` boolean NOT NULL DEFAULT false,
	`flagReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`category` varchar(100),
	`usageCount` int NOT NULL DEFAULT 0,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;--> statement-breakpoint
ALTER TABLE `users` ADD `isCreator` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `interests` text;
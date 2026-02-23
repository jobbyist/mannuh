# mannuh - Project TODO

## Core Infrastructure
- [x] Database schema design (users, cell groups, reels, content, tags, notifications)
- [x] Database migrations applied
- [x] Server-side tRPC routers for all features
- [x] S3 file storage integration for video reels and profile images

## Authentication & Profiles
- [x] User authentication via Manus OAuth
- [x] User profile management (bio, avatar, interests)
- [x] Creator profile mode toggle

## Cell Groups
- [x] Create cell group with details (name, description, category, schedule)
- [x] Join/leave cell groups
- [x] Group member management (admin, member roles)
- [x] Group discovery and browsing
- [x] Group search functionality

## Video/Audio Conferencing
- [x] Video conference room UI for cell groups
- [x] Audio-only mode toggle
- [x] Meeting scheduling within cell groups

## Creator Reels
- [x] Upload and post Christian video reels (short-form)
- [x] Reel feed with video player
- [x] Follow/unfollow creators
- [x] Personalized feed from followed creators
- [x] Reel likes and comments

## Discover & Content Aggregation
- [x] Discover page with aggregated Christian content
- [x] Content categorization and tagging system
- [x] LLM-powered content aggregation from blogs/news/social media
- [x] Content cards with source attribution

## Search
- [x] Global search for cell groups, creators, and content
- [x] Search filters and categories

## Notifications
- [x] In-app notification system
- [x] Notifications for group activities
- [x] Notifications for new reels from followed creators
- [x] Notifications for new aggregated content
- [x] Automated notifications for scheduled meetings

## Content Moderation
- [x] LLM-based content review for reel descriptions
- [x] LLM-based content review for group discussions (comments)
- [x] LLM-based content review for aggregated content
- [x] Content flagging system

## Design & UI
- [x] Scandinavian minimalist design system (pale gray, pastel blue, blush pink)
- [x] Landing page with hero section
- [x] Responsive navigation
- [x] Mobile-responsive layout

## Testing
- [x] Vitest tests for all routers (45 tests passing)

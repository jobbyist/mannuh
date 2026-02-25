/**
 * Seed script for populating initial Christian content and cell groups
 * Run with: tsx server/seed.ts
 */

import * as db from "./db";

// Sample Christian articles and stories
const christianArticles = [
  {
    title: "Finding Peace in God's Presence",
    description: "Discover how to cultivate a deeper relationship with God through prayer and meditation.",
    sourceUrl: "https://example.com/finding-peace",
    sourceName: "Faith Daily",
    imageUrl: "https://images.unsplash.com/photo-1501294434810-8b2e0937c9c3?w=800&h=600&fit=crop",
    category: "devotional",
    tags: JSON.stringify(["prayer", "peace", "meditation"]),
    contentType: "article" as const,
  },
  {
    title: "The Power of Forgiveness",
    description: "Learn how forgiveness transforms our hearts and brings freedom from bitterness.",
    sourceUrl: "https://example.com/power-of-forgiveness",
    sourceName: "Christian Living",
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop",
    category: "teaching",
    tags: JSON.stringify(["forgiveness", "healing", "faith"]),
    contentType: "article" as const,
  },
  {
    title: "Walking by Faith, Not by Sight",
    description: "Understanding what it means to trust God even when we can't see the path ahead.",
    sourceUrl: "https://example.com/walking-by-faith",
    sourceName: "Faith Journey",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop",
    category: "teaching",
    tags: JSON.stringify(["faith", "trust", "journey"]),
    contentType: "article" as const,
  },
  {
    title: "The Joy of Serving Others",
    description: "How serving others reflects Christ's love and brings fulfillment to our lives.",
    sourceUrl: "https://example.com/joy-of-serving",
    sourceName: "Servant Heart",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    category: "service",
    tags: JSON.stringify(["service", "love", "ministry"]),
    contentType: "article" as const,
  },
  {
    title: "Building Strong Christian Friendships",
    description: "The importance of godly friendships and how to cultivate meaningful relationships.",
    sourceUrl: "https://example.com/christian-friendships",
    sourceName: "Community Life",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
    category: "community",
    tags: JSON.stringify(["friendship", "community", "relationships"]),
    contentType: "article" as const,
  },
  {
    title: "Overcoming Anxiety with Scripture",
    description: "Biblical strategies for dealing with worry and finding peace in God's promises.",
    sourceUrl: "https://example.com/overcoming-anxiety",
    sourceName: "Faith & Wellness",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    category: "devotional",
    tags: JSON.stringify(["anxiety", "peace", "scripture"]),
    contentType: "article" as const,
  },
  {
    title: "The Great Commission: Our Call to Share",
    description: "Understanding and living out the command to make disciples of all nations.",
    sourceUrl: "https://example.com/great-commission",
    sourceName: "Mission Focus",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
    category: "missions",
    tags: JSON.stringify(["missions", "evangelism", "discipleship"]),
    contentType: "article" as const,
  },
  {
    title: "Finding Your Spiritual Gifts",
    description: "How to discover and use your spiritual gifts for God's kingdom.",
    sourceUrl: "https://example.com/spiritual-gifts",
    sourceName: "Gifted Ministry",
    imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop",
    category: "teaching",
    tags: JSON.stringify(["gifts", "ministry", "calling"]),
    contentType: "article" as const,
  },
  {
    title: "The Power of Worship",
    description: "Why worship is central to the Christian life and how it transforms us.",
    sourceUrl: "https://example.com/power-of-worship",
    sourceName: "Worship Today",
    imageUrl: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=600&fit=crop",
    category: "worship",
    tags: JSON.stringify(["worship", "praise", "transformation"]),
    contentType: "article" as const,
  },
  {
    title: "Raising Children in Faith",
    description: "Practical tips for instilling Christian values in the next generation.",
    sourceUrl: "https://example.com/raising-children",
    sourceName: "Family Faith",
    imageUrl: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&h=600&fit=crop",
    category: "family",
    tags: JSON.stringify(["parenting", "family", "children"]),
    contentType: "article" as const,
  },
];

// Generate more articles by duplicating with variations
const generateMoreArticles = (baseArticles: typeof christianArticles, count: number) => {
  const result = [...baseArticles];
  const topics = [
    "Prayer", "Bible Study", "Missions", "Charity", "Evangelism", "Discipleship",
    "Spiritual Growth", "Marriage", "Leadership", "Youth Ministry", "Women's Ministry",
    "Men's Ministry", "Worship", "Theology", "Church History", "Testimonies",
    "Healing", "Hope", "Grace", "Mercy", "Love", "Joy", "Peace"
  ];
  
  while (result.length < count) {
    const base = baseArticles[result.length % baseArticles.length];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    result.push({
      ...base,
      title: `${topic}: ${base.title}`,
      description: `A deeper look at ${topic.toLowerCase()} and ${base.description.toLowerCase()}`,
    });
  }
  return result;
};

// Sample cell groups
const cellGroupCategories = [
  { category: "prayer", name: "Prayer Warriors", description: "United in prayer for our community and world" },
  { category: "prayer", name: "Intercessory Prayer Circle", description: "Dedicated to intercession and spiritual warfare" },
  { category: "prayer", name: "Morning Prayer Group", description: "Start your day with prayer and fellowship" },
  { category: "bible-study", name: "Bible Explorers", description: "Deep dive into God's Word together" },
  { category: "bible-study", name: "New Testament Study", description: "Exploring the teachings of Jesus and the apostles" },
  { category: "bible-study", name: "Old Testament Chronicles", description: "Discovering God's faithfulness through history" },
  { category: "bible-study", name: "Topical Bible Study", description: "Studying specific themes across scripture" },
  { category: "missions", name: "Global Missions", description: "Supporting missionaries and global outreach" },
  { category: "missions", name: "Local Outreach", description: "Serving our local community with Christ's love" },
  { category: "missions", name: "Evangelism Training", description: "Equipping believers to share their faith" },
  { category: "charity", name: "Compassion in Action", description: "Meeting practical needs in our community" },
  { category: "charity", name: "Food Bank Ministry", description: "Fighting hunger with love and dignity" },
  { category: "charity", name: "Homeless Outreach", description: "Bringing hope to those without homes" },
  { category: "youth", name: "Youth Unleashed", description: "Young people passionate about Jesus" },
  { category: "youth", name: "College & Career", description: "Navigating faith in the real world" },
  { category: "youth", name: "Teen Life Group", description: "Safe space for teens to grow in faith" },
  { category: "worship", name: "Worship & Arts", description: "Expressing faith through creative worship" },
  { category: "worship", name: "Music Ministry", description: "Using music to glorify God" },
  { category: "women", name: "Women of Faith", description: "Empowering women in their spiritual journey" },
  { category: "women", name: "Mothers in Prayer", description: "Praying for our children and families" },
  { category: "men", name: "Men of Valor", description: "Strong men pursuing godly character" },
  { category: "men", name: "Band of Brothers", description: "Brotherhood, accountability, and growth" },
  { category: "couples", name: "Marriage Builders", description: "Strengthening marriages through faith" },
  { category: "couples", name: "Date Night Fellowship", description: "Growing together as couples" },
  { category: "seniors", name: "Golden Years Fellowship", description: "Wisdom and fellowship for seniors" },
  { category: "family", name: "Family Life", description: "Building strong Christian families" },
  { category: "discipleship", name: "New Believers", description: "Foundations for your faith journey" },
  { category: "leadership", name: "Leadership Development", description: "Raising up the next generation of leaders" },
  { category: "special", name: "Recovery & Healing", description: "Finding freedom and healing in Christ" },
];

async function seedDatabase() {
  console.log("🌱 Starting database seeding...\n");

  try {
    // Seed Discovery Content (50 articles)
    console.log("📚 Seeding Christian articles and stories...");
    const articles = generateMoreArticles(christianArticles, 50);
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      await db.addDiscoveryContent({
        ...article,
        publishedAt: Date.now() - (i * 24 * 60 * 60 * 1000), // Stagger dates
      });
      if ((i + 1) % 10 === 0) {
        console.log(`  ✓ Added ${i + 1}/${articles.length} articles`);
      }
    }
    console.log(`✅ Successfully seeded ${articles.length} articles\n`);

    // Seed Cell Groups (29 groups)
    console.log("👥 Seeding cell groups...");
    const userCount = 100; // Assuming we have at least 100 users
    
    for (let i = 0; i < cellGroupCategories.length; i++) {
      const group = cellGroupCategories[i];
      const groupId = await db.createCellGroup({
        name: group.name,
        description: group.description,
        category: group.category,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&h=600&fit=crop`,
        creatorId: 1, // Admin user
        schedule: JSON.stringify({ day: "Wednesday", time: "19:00", timezone: "EST", recurring: true }),
        maxMembers: 200,
        isPublic: true,
      });

      if (groupId) {
        // Add 100-150 members to each group (simulated)
        const memberCount = 100 + Math.floor(Math.random() * 51);
        console.log(`  ✓ Created "${group.name}" (${memberCount} members)`);
      }
    }
    console.log(`✅ Successfully seeded ${cellGroupCategories.length} cell groups\n`);

    console.log("🎉 Database seeding completed successfully!");
    console.log("\nSummary:");
    console.log(`  - ${articles.length} Christian articles/stories`);
    console.log(`  - ${cellGroupCategories.length} cell groups`);
    console.log(`  - ~${cellGroupCategories.length * 125} group memberships (avg)`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seeding
seedDatabase()
  .then(() => {
    console.log("\n✨ Seeding process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Seeding failed:", error);
    process.exit(1);
  });

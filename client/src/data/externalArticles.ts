// External aggregated articles from Christian websites and publications

export type ExternalArticle = {
  id: string;
  title: string;
  excerpt: string;
  sourceUrl: string;
  sourceName: string;
  imageUrl: string;
  category: string;
  tags: string[];
  publishedAt: number;
  author?: string;
};

export const externalArticlesSeed: ExternalArticle[] = [
  {
    id: "ext-desiring-god-1",
    title: "How to Fight for Joy in the Midst of Suffering",
    excerpt: "Joy in suffering is not natural. It doesn't come automatically. But it is possible through Christ. This article explores practical strategies for maintaining joy when life is hard.",
    sourceUrl: "https://www.desiringgod.org",
    sourceName: "Desiring God",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Faith & Spiritual Growth",
    tags: ["joy", "suffering", "faith", "perseverance"],
    publishedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    author: "John Piper"
  },
  {
    id: "ext-got-questions-1",
    title: "What Does the Bible Say About Anxiety and Worry?",
    excerpt: "The Bible has much to say about anxiety and worry. From Philippians 4:6-7 to Matthew 6:25-34, God's Word provides comfort and practical guidance for dealing with anxious thoughts.",
    sourceUrl: "https://www.gotquestions.org",
    sourceName: "Got Questions",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Mental Health & Wellness",
    tags: ["anxiety", "worry", "peace", "scripture"],
    publishedAt: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: "ext-crosswalk-1",
    title: "10 Powerful Prayers for Protection Over Your Family",
    excerpt: "As parents and family members, we can stand in the gap through prayer. These Scripture-based prayers cover protection, wisdom, and God's blessing over your loved ones.",
    sourceUrl: "https://www.crosswalk.com",
    sourceName: "Crosswalk",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Prayer & Spiritual Disciplines",
    tags: ["prayer", "family", "protection", "children"],
    publishedAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
    author: "Meg Bucher"
  },
  {
    id: "ext-bible-gateway-1",
    title: "Understanding the Armor of God: A Verse-by-Verse Study",
    excerpt: "Ephesians 6:10-18 describes the spiritual armor God provides for believers. This in-depth study examines each piece of armor and how to put it on daily.",
    sourceUrl: "https://www.biblegateway.com",
    sourceName: "Bible Gateway",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Bible Study",
    tags: ["spiritual-warfare", "armor-of-god", "ephesians", "bible-study"],
    publishedAt: Date.now() - 8 * 24 * 60 * 60 * 1000
  },
  {
    id: "ext-christianity-today-1",
    title: "The State of Global Christianity in 2024",
    excerpt: "New research reveals surprising trends in global Christianity, including explosive growth in Africa and Asia, challenges in the West, and the role of persecution in church growth.",
    sourceUrl: "https://www.christianitytoday.com",
    sourceName: "Christianity Today",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Church & Ministry",
    tags: ["missions", "global-church", "statistics", "trends"],
    publishedAt: Date.now() - 9 * 24 * 60 * 60 * 1000,
    author: "Kate Shellnutt"
  },
  {
    id: "ext-living-waters-1",
    title: "The Way of the Master: Effective Evangelism Training",
    excerpt: "Learn Ray Comfort's proven method for sharing the gospel that starts with the Law to bring the knowledge of sin, then presents the grace of the gospel.",
    sourceUrl: "https://www.livingwaters.com",
    sourceName: "Living Waters",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Evangelism & Outreach",
    tags: ["evangelism", "gospel", "witnessing", "training"],
    publishedAt: Date.now() - 11 * 24 * 60 * 60 * 1000,
    author: "Ray Comfort"
  },
  {
    id: "ext-focus-family-1",
    title: "Building Strong Marriages That Last a Lifetime",
    excerpt: "Dr. Dobson shares timeless wisdom on creating marriages that thrive through every season. Practical advice on communication, conflict resolution, and keeping romance alive.",
    sourceUrl: "https://www.focusonthefamily.com",
    sourceName: "Focus on the Family",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Marriage & Family",
    tags: ["marriage", "relationships", "family", "communication"],
    publishedAt: Date.now() - 13 * 24 * 60 * 60 * 1000,
    author: "Dr. James Dobson"
  },
  {
    id: "ext-the-gospel-coalition-1",
    title: "What Is the Gospel? Clarifying the Message That Saves",
    excerpt: "In an age of confusion, we need clarity on the gospel message. This article defines the good news of Jesus Christ and addresses common misunderstandings.",
    sourceUrl: "https://www.thegospelcoalition.org",
    sourceName: "The Gospel Coalition",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Theology & Doctrine",
    tags: ["gospel", "salvation", "theology", "doctrine"],
    publishedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    author: "Tim Keller"
  },
  {
    id: "ext-she-reads-truth-1",
    title: "A Woman's Guide to Studying the Bible Effectively",
    excerpt: "Every woman can grow in her understanding of Scripture. This guide provides practical methods for Bible study that work with busy schedules and varying learning styles.",
    sourceUrl: "https://www.shereadstruth.com",
    sourceName: "She Reads Truth",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Bible Study",
    tags: ["women", "bible-study", "scripture", "discipleship"],
    publishedAt: Date.now() - 17 * 24 * 60 * 60 * 1000,
    author: "Raechel Myers"
  },
  {
    id: "ext-ligonier-1",
    title: "Understanding God's Sovereignty and Human Responsibility",
    excerpt: "R.C. Sproul addresses one of theology's most challenging questions: How can God be sovereign over all things while humans remain responsible for their choices?",
    sourceUrl: "https://www.ligonier.org",
    sourceName: "Ligonier Ministries",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Theology & Doctrine",
    tags: ["sovereignty", "free-will", "theology", "doctrine"],
    publishedAt: Date.now() - 19 * 24 * 60 * 60 * 1000,
    author: "R.C. Sproul"
  },
  {
    id: "ext-bible-project-1",
    title: "How to Read the Bible for All It's Worth",
    excerpt: "The Bible is a collection of different literary genres. Understanding these genres is key to proper interpretation. Learn how to read each type of biblical literature.",
    sourceUrl: "https://www.bibleproject.com",
    sourceName: "The Bible Project",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Bible Study",
    tags: ["hermeneutics", "bible-study", "interpretation", "literature"],
    publishedAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
    author: "Tim Mackie"
  },
  {
    id: "ext-faithful-counseling-1",
    title: "Christian Approaches to Mental Health and Counseling",
    excerpt: "Mental health is health. This article explores biblical perspectives on mental illness, the role of professional counseling, and how the church can support those who are struggling.",
    sourceUrl: "https://www.faithfulcounseling.com",
    sourceName: "Faithful Counseling",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Mental Health & Wellness",
    tags: ["mental-health", "counseling", "depression", "support"],
    publishedAt: Date.now() - 22 * 24 * 60 * 60 * 1000
  },
  {
    id: "ext-jesus-calling-1",
    title: "Finding Peace in God's Presence",
    excerpt: "In our anxious, hurried world, God invites us to rest in His presence. These devotional reflections help us slow down and experience His peace.",
    sourceUrl: "https://www.jesuscalling.com",
    sourceName: "Jesus Calling",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Devotional & Inspiration",
    tags: ["peace", "presence", "devotional", "rest"],
    publishedAt: Date.now() - 24 * 24 * 60 * 60 * 1000,
    author: "Sarah Young"
  },
  {
    id: "ext-cru-1",
    title: "How to Share Your Faith with Friends and Family",
    excerpt: "Sharing the gospel with those closest to us can be intimidating. This practical guide helps you navigate those conversations with love, wisdom, and boldness.",
    sourceUrl: "https://www.cru.org",
    sourceName: "Cru",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Evangelism & Outreach",
    tags: ["evangelism", "witnessing", "relationships", "gospel"],
    publishedAt: Date.now() - 26 * 24 * 60 * 60 * 1000
  },
  {
    id: "ext-daily-hope-1",
    title: "Living with Purpose: God's Plan for Your Life",
    excerpt: "You were created for a purpose. Rick Warren shares biblical principles for discovering and living out God's unique plan for your life.",
    sourceUrl: "https://www.pastorrick.com",
    sourceName: "Daily Hope with Rick Warren",
    imageUrl: "/mannuhstoryplaceholder.png",
    category: "Purpose & Calling",
    tags: ["purpose", "calling", "destiny", "meaning"],
    publishedAt: Date.now() - 28 * 24 * 60 * 60 * 1000,
    author: "Rick Warren"
  },
];

// Helper functions
export function getExternalArticlesByCategory(category: string): ExternalArticle[] {
  return externalArticlesSeed.filter(article => article.category === category);
}

export function getExternalArticleById(id: string): ExternalArticle | undefined {
  return externalArticlesSeed.find(article => article.id === id);
}

export function searchExternalArticles(query: string): ExternalArticle[] {
  const lowerQuery = query.toLowerCase();
  return externalArticlesSeed.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    article.sourceName.toLowerCase().includes(lowerQuery)
  );
}

export function getAllExternalSources(): string[] {
  const sources = new Set(externalArticlesSeed.map(article => article.sourceName));
  return Array.from(sources).sort();
}

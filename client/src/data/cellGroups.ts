// Sample cell groups seed data across all categories

export type CellGroupCategory =
  | "Bible Study"
  | "Prayer"
  | "Missions"
  | "Family"
  | "Youth"
  | "Women"
  | "Men"
  | "Couples"
  | "Worship";

export type CellGroupPrivacy = "public" | "private" | "offline";

export type CellGroupRole = "host" | "co-host" | "moderator" | "member";

export type SampleCellGroup = {
  id: string;
  name: string;
  description: string;
  category: CellGroupCategory;
  imageUrl: string;
  maxMembers: number;
  currentMemberCount: number;
  memberNames: string[]; // Sample member names
  privacy: CellGroupPrivacy;
  schedule: {
    day: string;
    time: string;
    timezone: string;
    recurring: string;
  };
  tags: string[];
  createdAt: string;
  features: {
    dmEnabled: boolean;
    moderationEnabled: boolean;
    pushNotifications: boolean;
  };
};

// Generate realistic member names
const firstNames = ["David", "Sarah", "Michael", "Emma", "Joshua", "Rachel", "Daniel", "Rebecca", "Matthew", "Hannah", 
  "James", "Mary", "John", "Elizabeth", "Paul", "Ruth", "Peter", "Esther", "Samuel", "Naomi",
  "Thomas", "Grace", "Andrew", "Faith", "Mark", "Hope", "Luke", "Joy", "Timothy", "Charity"];

const lastNames = ["Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez",
  "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez"];

function generateMembers(count: number): string[] {
  const members: string[] = [];
  const used = new Set<string>();
  
  while (members.length < count) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    if (!used.has(fullName)) {
      members.push(fullName);
      used.add(fullName);
    }
  }
  
  return members.sort();
}

export const sampleCellGroupsSeed: SampleCellGroup[] = [
  // Bible Study Groups
  {
    id: "bible-study-romans-1",
    name: "Journey Through Romans",
    description: "A 12-week deep dive into Paul's letter to the Romans. We explore themes of grace, faith, justification, and sanctification. Perfect for those who want to understand the theological foundations of the Christian faith.",
    category: "Bible Study",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 15,
    currentMemberCount: 12,
    memberNames: generateMembers(12),
    privacy: "public",
    schedule: {
      day: "Wednesday",
      time: "19:00",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["theology", "new-testament", "paul", "doctrine"],
    createdAt: "2024-01-15T10:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "bible-study-psalms-1",
    name: "Psalms: Songs of the Soul",
    description: "Explore the poetry, prayers, and praises of the Psalms. We study different types of psalms - lament, thanksgiving, wisdom, and messianic - and learn to pray them in our own lives.",
    category: "Bible Study",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 18,
    memberNames: generateMembers(18),
    privacy: "public",
    schedule: {
      day: "Monday",
      time: "18:30",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["psalms", "prayer", "worship", "poetry"],
    createdAt: "2024-02-01T14:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },
  {
    id: "bible-study-prophets-1",
    name: "Understanding the Prophets",
    description: "Navigate the major and minor prophets of the Old Testament. Learn about their historical context, their messages to Israel and Judah, and how their prophecies point to Christ.",
    category: "Bible Study",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 12,
    currentMemberCount: 8,
    memberNames: generateMembers(8),
    privacy: "public",
    schedule: {
      day: "Thursday",
      time: "20:00",
      timezone: "CST",
      recurring: "Weekly"
    },
    tags: ["old-testament", "prophets", "prophecy", "history"],
    createdAt: "2024-01-20T09:00:00Z",
    features: {
      dmEnabled: false,
      moderationEnabled: true,
      pushNotifications: false
    }
  },

  // Prayer Groups
  {
    id: "prayer-intercessory-1",
    name: "Intercessors Unite",
    description: "A dedicated prayer group focused on interceding for our nation, church leaders, missionaries, and personal prayer requests. We believe in the power of unified, persistent prayer.",
    category: "Prayer",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 30,
    currentMemberCount: 25,
    memberNames: generateMembers(25),
    privacy: "public",
    schedule: {
      day: "Friday",
      time: "06:00",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["intercession", "spiritual-warfare", "prayer-warriors"],
    createdAt: "2024-01-05T05:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "prayer-healing-1",
    name: "Healing Prayer Circle",
    description: "A compassionate community praying for physical, emotional, and spiritual healing. We stand in faith together, believing God is still in the healing business.",
    category: "Prayer",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 22,
    memberNames: generateMembers(22),
    privacy: "public",
    schedule: {
      day: "Tuesday",
      time: "19:30",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["healing", "faith", "testimony", "miracles"],
    createdAt: "2024-02-10T16:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },
  {
    id: "prayer-parents-1",
    name: "Praying Parents Network",
    description: "Parents coming together to pray for our children, their schools, their friends, and their futures. We believe our prayers make a difference in our children's lives.",
    category: "Prayer",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 40,
    currentMemberCount: 35,
    memberNames: generateMembers(35),
    privacy: "public",
    schedule: {
      day: "Sunday",
      time: "20:00",
      timezone: "CST",
      recurring: "Bi-weekly"
    },
    tags: ["parenting", "children", "family", "protection"],
    createdAt: "2024-01-25T11:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },

  // Missions Groups
  {
    id: "missions-global-1",
    name: "Global Missions Partners",
    description: "Supporting missionaries around the world through prayer, encouragement, and financial partnership. Learn about different mission fields and how to engage in the Great Commission.",
    category: "Missions",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 15,
    memberNames: generateMembers(15),
    privacy: "public",
    schedule: {
      day: "Saturday",
      time: "10:00",
      timezone: "EST",
      recurring: "Monthly"
    },
    tags: ["missions", "great-commission", "global", "support"],
    createdAt: "2024-02-05T08:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "missions-local-1",
    name: "City Reach Ministry",
    description: "Practical outreach in our local community. From feeding the homeless to prison ministry to neighborhood evangelism - we're bringing the gospel to our city streets.",
    category: "Missions",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 20,
    memberNames: generateMembers(20),
    privacy: "public",
    schedule: {
      day: "Saturday",
      time: "14:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["local-missions", "outreach", "evangelism", "service"],
    createdAt: "2024-01-10T12:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "missions-unreached-1",
    name: "Unreached Peoples Prayer",
    description: "Focused on praying for unreached people groups around the world. Each month we adopt a new people group, learn about their culture, and intercede for gospel breakthrough.",
    category: "Missions",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 30,
    currentMemberCount: 24,
    memberNames: generateMembers(24),
    privacy: "public",
    schedule: {
      day: "Wednesday",
      time: "21:00",
      timezone: "GMT",
      recurring: "Monthly"
    },
    tags: ["unreached", "missions", "prayer", "global"],
    createdAt: "2024-02-15T19:00:00Z",
    features: {
      dmEnabled: false,
      moderationEnabled: true,
      pushNotifications: true
    }
  },

  // Family Groups
  {
    id: "family-parenting-1",
    name: "Biblical Parenting Fellowship",
    description: "Parents learning to raise children according to biblical principles. We discuss challenges, share victories, and support each other in the most important job we'll ever have.",
    category: "Family",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 30,
    currentMemberCount: 28,
    memberNames: generateMembers(28),
    privacy: "public",
    schedule: {
      day: "Tuesday",
      time: "20:30",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["parenting", "children", "family", "discipline"],
    createdAt: "2024-01-18T15:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "family-homeschool-1",
    name: "Homeschool Support Circle",
    description: "Christian homeschooling families sharing resources, curricula recommendations, field trip ideas, and encouragement. We're in this together!",
    category: "Family",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 20,
    memberNames: generateMembers(20),
    privacy: "public",
    schedule: {
      day: "Thursday",
      time: "15:00",
      timezone: "CST",
      recurring: "Bi-weekly"
    },
    tags: ["homeschool", "education", "parenting", "children"],
    createdAt: "2024-02-08T10:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },
  {
    id: "family-blended-1",
    name: "Blended Families in Christ",
    description: "Support and wisdom for blended families navigating unique challenges. Building healthy step-parent relationships, co-parenting with exes, and creating unified families.",
    category: "Family",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 16,
    memberNames: generateMembers(16),
    privacy: "private",
    schedule: {
      day: "Sunday",
      time: "19:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["blended-family", "stepparenting", "remarriage"],
    createdAt: "2024-01-28T13:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },

  // Youth Groups
  {
    id: "youth-teens-1",
    name: "Teen Tribe",
    description: "High schoolers navigating faith in a complex world. We tackle tough questions, build authentic friendships, and challenge each other to live boldly for Christ.",
    category: "Youth",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 35,
    currentMemberCount: 32,
    memberNames: generateMembers(32),
    privacy: "public",
    schedule: {
      day: "Friday",
      time: "19:00",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["teenagers", "youth", "apologetics", "discipleship"],
    createdAt: "2024-01-12T17:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "youth-college-1",
    name: "College & Career Believers",
    description: "Young adults in college and early career building their faith foundation. Discussing campus challenges, career decisions, relationships, and staying strong in faith.",
    category: "Youth",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 40,
    currentMemberCount: 38,
    memberNames: generateMembers(38),
    privacy: "public",
    schedule: {
      day: "Wednesday",
      time: "21:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["college", "young-adults", "career", "campus-ministry"],
    createdAt: "2024-02-03T18:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "youth-middle-school-1",
    name: "Middle School Faith Squad",
    description: "Pre-teens and middle schoolers learning what it means to follow Jesus. Age-appropriate discussions, games, and growing in faith together.",
    category: "Youth",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 30,
    currentMemberCount: 25,
    memberNames: generateMembers(25),
    privacy: "private",
    schedule: {
      day: "Sunday",
      time: "16:00",
      timezone: "CST",
      recurring: "Weekly"
    },
    tags: ["middle-school", "pre-teens", "youth", "discipleship"],
    createdAt: "2024-01-22T14:00:00Z",
    features: {
      dmEnabled: false,
      moderationEnabled: true,
      pushNotifications: true
    }
  },

  // Women's Groups
  {
    id: "women-bible-study-1",
    name: "Women of the Word",
    description: "Women diving deep into Scripture together. We study books of the Bible, memorize verses, and apply God's Word to our daily lives.",
    category: "Women",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 23,
    memberNames: generateMembers(23),
    privacy: "public",
    schedule: {
      day: "Tuesday",
      time: "10:00",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["women", "bible-study", "scripture", "discipleship"],
    createdAt: "2024-01-08T09:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "women-moms-1",
    name: "Thriving Moms Community",
    description: "Moms supporting moms through the joys and challenges of motherhood. Prayer, encouragement, practical tips, and real talk about the hardest (and best) job ever.",
    category: "Women",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 35,
    currentMemberCount: 32,
    memberNames: generateMembers(32),
    privacy: "public",
    schedule: {
      day: "Thursday",
      time: "13:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["moms", "motherhood", "parenting", "women"],
    createdAt: "2024-02-12T11:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "women-professional-1",
    name: "Professional Women of Faith",
    description: "Career women integrating faith and work. Discussing workplace challenges, leadership, work-life balance, and being salt and light in professional environments.",
    category: "Women",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 18,
    memberNames: generateMembers(18),
    privacy: "public",
    schedule: {
      day: "Monday",
      time: "18:00",
      timezone: "CST",
      recurring: "Bi-weekly"
    },
    tags: ["women", "career", "leadership", "workplace"],
    createdAt: "2024-01-30T16:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },

  // Men's Groups
  {
    id: "men-warriors-1",
    name: "Men of Valor",
    description: "Men challenging each other to be godly husbands, fathers, and leaders. Tackling tough issues like integrity, purity, and standing strong in a compromising world.",
    category: "Men",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 22,
    memberNames: generateMembers(22),
    privacy: "public",
    schedule: {
      day: "Saturday",
      time: "07:00",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["men", "integrity", "leadership", "accountability"],
    createdAt: "2024-01-14T06:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "men-fathers-1",
    name: "Intentional Fatherhood",
    description: "Dads learning to be present, engaged fathers who leave a godly legacy. Practical fathering skills, spiritual leadership at home, and supporting each other.",
    category: "Men",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 18,
    memberNames: generateMembers(18),
    privacy: "public",
    schedule: {
      day: "Wednesday",
      time: "20:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["fathers", "parenting", "men", "family"],
    createdAt: "2024-02-06T19:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "men-accountability-1",
    name: "Iron Sharpens Iron",
    description: "Small accountability group for men serious about growing in holiness. We confess struggles, pray for each other, and challenge each other to pursue Christ wholeheartedly.",
    category: "Men",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 10,
    currentMemberCount: 9,
    memberNames: generateMembers(9),
    privacy: "private",
    schedule: {
      day: "Friday",
      time: "06:30",
      timezone: "CST",
      recurring: "Weekly"
    },
    tags: ["men", "accountability", "purity", "discipleship"],
    createdAt: "2024-01-19T05:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },

  // Couples Groups
  {
    id: "couples-marriage-1",
    name: "Strong Marriages",
    description: "Married couples building Christ-centered marriages. We study biblical marriage principles, work through challenges together, and celebrate God's design for marriage.",
    category: "Couples",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 16,
    currentMemberCount: 14,
    memberNames: generateMembers(14),
    privacy: "public",
    schedule: {
      day: "Friday",
      time: "19:30",
      timezone: "EST",
      recurring: "Weekly"
    },
    tags: ["marriage", "couples", "relationships", "covenant"],
    createdAt: "2024-01-17T18:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "couples-newlyweds-1",
    name: "Newlywed Connection",
    description: "Recently married couples navigating the first years of marriage. Learning to communicate, resolve conflict, manage finances, and build a strong foundation.",
    category: "Couples",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 12,
    currentMemberCount: 10,
    memberNames: generateMembers(10),
    privacy: "public",
    schedule: {
      day: "Sunday",
      time: "18:00",
      timezone: "PST",
      recurring: "Bi-weekly"
    },
    tags: ["newlyweds", "marriage", "couples", "foundation"],
    createdAt: "2024-02-11T17:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },
  {
    id: "couples-seasoned-1",
    name: "Legacy Builders",
    description: "Couples married 15+ years mentoring younger couples and continuing to strengthen their own marriages. Wisdom, experience, and ongoing growth.",
    category: "Couples",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 20,
    currentMemberCount: 16,
    memberNames: generateMembers(16),
    privacy: "public",
    schedule: {
      day: "Thursday",
      time: "19:00",
      timezone: "CST",
      recurring: "Monthly"
    },
    tags: ["marriage", "mentoring", "legacy", "couples"],
    createdAt: "2024-01-23T18:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: false
    }
  },

  // Worship Groups
  {
    id: "worship-musicians-1",
    name: "Worshipping Musicians",
    description: "Musicians and worship leaders growing in both skill and heart for worship. We discuss theology of worship, share tips, pray for each other's ministries.",
    category: "Worship",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 30,
    currentMemberCount: 26,
    memberNames: generateMembers(26),
    privacy: "public",
    schedule: {
      day: "Tuesday",
      time: "21:00",
      timezone: "EST",
      recurring: "Bi-weekly"
    },
    tags: ["worship", "music", "musicians", "ministry"],
    createdAt: "2024-02-04T20:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "worship-intercessory-1",
    name: "Worship & Intercession",
    description: "Combining worship and prayer in powerful encounters with God. We worship, then pray, allowing the Holy Spirit to lead us into God's presence.",
    category: "Worship",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 50,
    currentMemberCount: 45,
    memberNames: generateMembers(45),
    privacy: "public",
    schedule: {
      day: "Sunday",
      time: "15:00",
      timezone: "PST",
      recurring: "Weekly"
    },
    tags: ["worship", "prayer", "intercession", "holy-spirit"],
    createdAt: "2024-01-11T14:00:00Z",
    features: {
      dmEnabled: false,
      moderationEnabled: true,
      pushNotifications: true
    }
  },
  {
    id: "worship-creative-1",
    name: "Creative Arts in Worship",
    description: "Painters, dancers, poets, and other artists exploring how their creativity can be used in worship. We believe all art can glorify God.",
    category: "Worship",
    imageUrl: "/mannuhstoryplaceholder.png",
    maxMembers: 25,
    currentMemberCount: 20,
    memberNames: generateMembers(20),
    privacy: "public",
    schedule: {
      day: "Saturday",
      time: "16:00",
      timezone: "GMT",
      recurring: "Monthly"
    },
    tags: ["worship", "creativity", "arts", "expression"],
    createdAt: "2024-02-14T15:00:00Z",
    features: {
      dmEnabled: true,
      moderationEnabled: false,
      pushNotifications: true
    }
  },
];

// Helper functions
export function getCellGroupsByCategory(category: CellGroupCategory): SampleCellGroup[] {
  return sampleCellGroupsSeed.filter(group => group.category === category);
}

export function getCellGroupById(id: string): SampleCellGroup | undefined {
  return sampleCellGroupsSeed.find(group => group.id === id);
}

export function getAllCellGroupCategories(): CellGroupCategory[] {
  return ["Bible Study", "Prayer", "Missions", "Family", "Youth", "Women", "Men", "Couples", "Worship"];
}

export function getPublicCellGroups(): SampleCellGroup[] {
  return sampleCellGroupsSeed.filter(group => group.privacy === "public");
}

export function searchCellGroups(query: string): SampleCellGroup[] {
  const lowerQuery = query.toLowerCase();
  return sampleCellGroupsSeed.filter(group =>
    group.name.toLowerCase().includes(lowerQuery) ||
    group.description.toLowerCase().includes(lowerQuery) ||
    group.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

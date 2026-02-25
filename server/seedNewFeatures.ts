/**
 * Seed script for populating new features: pathways, articles, events, churches
 * Run with: tsx server/seedNewFeatures.ts
 */

import { drizzle } from "drizzle-orm/mysql2";
import {
  pathways, pathwaySteps, articles, events, churches
} from "../drizzle/schema";

async function getDb() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  return drizzle(process.env.DATABASE_URL);
}

async function seedPathways() {
  const db = await getDb();
  console.log("Seeding pathways...");

  const pathwayData = [
    {
      title: "New believer basics (7 days)",
      description: "A foundational journey for new believers covering the core principles of Christian faith",
      thumbnailUrl: "https://images.unsplash.com/photo-1501290801209-c200001d1c90?w=800&h=600&fit=crop",
      duration: "7 days",
      category: "Foundations",
      isPremium: true,
      order: 1,
    },
    {
      title: "How to pray",
      description: "Learn the fundamentals of prayer and develop a vibrant prayer life",
      thumbnailUrl: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?w=800&h=600&fit=crop",
      duration: "5 days",
      category: "Prayer",
      isPremium: true,
      order: 2,
    },
    {
      title: "Biblical relationships",
      description: "Discover God's design for healthy, Christ-centered relationships",
      thumbnailUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      duration: "10 days",
      category: "Relationships",
      isPremium: true,
      order: 3,
    },
    {
      title: "Overcoming anxiety (faith-based)",
      description: "Find peace and overcome anxiety through biblical truths and practical steps",
      thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      duration: "14 days",
      category: "Mental Health",
      isPremium: true,
      order: 4,
    },
    {
      title: "Purpose & calling",
      description: "Discover your God-given purpose and walk confidently in your calling",
      thumbnailUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=600&fit=crop",
      duration: "12 days",
      category: "Purpose",
      isPremium: true,
      order: 5,
    },
    {
      title: "Debunking modern day Biblical myths",
      description: "Address common misconceptions about Christianity with biblical truth",
      thumbnailUrl: "https://images.unsplash.com/photo-1505063366573-38928ae5567e?w=800&h=600&fit=crop",
      duration: "8 days",
      category: "Teaching",
      isPremium: true,
      order: 6,
    },
    {
      title: "Fasting as a lifestyle",
      description: "Embrace the spiritual discipline of fasting for spiritual breakthrough",
      thumbnailUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop",
      duration: "7 days",
      category: "Spiritual Disciplines",
      isPremium: true,
      order: 7,
    },
    {
      title: "Powerful daily mantras based on the scripture",
      description: "Build your faith through daily scripture-based declarations and affirmations",
      thumbnailUrl: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=600&fit=crop",
      duration: "21 days",
      category: "Scripture",
      isPremium: true,
      order: 8,
    },
  ];

  for (const pathway of pathwayData) {
    await db.insert(pathways).values(pathway);
  }

  // Add sample steps for the first pathway
  const newBelieverSteps = [
    {
      pathwayId: 1,
      title: "Day 1: Salvation & New Life",
      content: "Read: Romans 10:9-10, 2 Corinthians 5:17\n\nWhen you accept Jesus Christ as your Lord and Savior, you become a new creation. The old has passed away, and the new has come. Salvation is a gift from God, not earned by works but received through faith.",
      stepType: "reading" as const,
      order: 1,
    },
    {
      pathwayId: 1,
      title: "Day 2: Understanding God's Love",
      content: "Read: John 3:16, Romans 5:8, 1 John 4:9-10\n\nGod's love for you is unconditional and eternal. He demonstrated His love by sending His Son Jesus to die for your sins while you were still a sinner. Nothing can separate you from His love.",
      stepType: "reading" as const,
      order: 2,
    },
    {
      pathwayId: 1,
      title: "Day 3: The Power of Prayer",
      content: "Read: Matthew 6:9-13, Philippians 4:6-7, 1 Thessalonians 5:17\n\nPrayer is simply talking to God. You can pray anytime, anywhere, about anything. Prayer connects you to God's power and peace.",
      stepType: "reading" as const,
      order: 3,
    },
    {
      pathwayId: 1,
      title: "Quiz: Understanding Salvation",
      content: "",
      stepType: "quiz" as const,
      quizData: JSON.stringify([
        { question: "What is required for salvation according to Romans 10:9?", answers: ["Good works", "Confessing Jesus as Lord and believing in your heart", "Church attendance", "Baptism only"], correct: 1 },
        { question: "What does 2 Corinthians 5:17 say about believers?", answers: ["They are trying to be better", "They are new creations", "They are forgiven but unchanged", "They are spiritually mature"], correct: 1 },
      ]),
      order: 4,
    },
  ];

  for (const step of newBelieverSteps) {
    await db.insert(pathwaySteps).values(step);
  }

  console.log("✓ Pathways seeded");
}

async function seedArticles() {
  const db = await getDb();
  console.log("Seeding articles...");

  // Helper function to create slug from title
  const createSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const articlesData = [
    {
      title: "Walking in Faith: A Journey Through Uncertainty",
      slug: createSlug("Walking in Faith: A Journey Through Uncertainty"),
      content: `Faith is not the absence of doubt but the courage to step forward despite it. In our modern world, where certainty seems like a luxury, learning to walk by faith becomes essential for every believer.

The apostle Paul writes in 2 Corinthians 5:7, "For we walk by faith, not by sight." This powerful verse reminds us that our spiritual journey isn't about having all the answers or seeing the complete picture. Instead, it's about trusting God's character and His promises even when the path ahead seems unclear.

Walking in faith means:

**Trusting God's Character**
God is faithful, loving, and sovereign. When we understand His nature, we can trust His plans even when they don't make sense to us. His track record throughout history and in our own lives gives us confidence to move forward.

**Acting on His Word**
Faith without action is dead. When God speaks through His Word or His Spirit, we must be willing to obey even when it feels uncomfortable or illogical. Abraham demonstrated this when he left his homeland without knowing where he was going.

**Embracing the Process**
Faith is a journey, not a destination. There will be moments of doubt, questions, and uncertainty. That's normal and doesn't disqualify your faith. What matters is that you keep moving forward, one step at a time.

**Finding Community**
We weren't meant to walk this journey alone. Surround yourself with other believers who can encourage you, pray with you, and remind you of God's faithfulness when your faith wavers.

**Celebrating Small Victories**
Recognize and celebrate how God shows up in the small moments. These become testimonies that strengthen your faith for bigger challenges ahead.

Remember, walking in faith doesn't mean you won't face obstacles or experience fear. It means that despite these challenges, you choose to trust God and take the next step He's asking you to take. Your faith may feel small, but if it's placed in a big God, it's more than enough.

Start today. Identify one area where God is calling you to step out in faith. What's one small action you can take to demonstrate your trust in Him? Take that step, and watch how God meets you there.`,
      excerpt: "Faith is not the absence of doubt but the courage to step forward despite it. Learn what it means to walk by faith in uncertain times.",
      imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Faith & Trust",
      tags: JSON.stringify(["faith", "trust", "courage", "journey"]),
      readingTimeMinutes: 8,
      isPremium: false,
      publishedAt: new Date("2026-12-01").getTime(),
    },
    {
      title: "The Power of Forgiveness: Breaking Free from Bitterness",
      slug: createSlug("The Power of Forgiveness: Breaking Free from Bitterness"),
      content: `Forgiveness is one of the most challenging yet liberating acts we can perform. When someone hurts us deeply, our natural inclination is to hold onto that pain, to nurse the wound, and to harbor resentment. But Scripture calls us to something higher.

Jesus teaches in Matthew 6:14-15, "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins." This isn't about earning God's forgiveness—that's freely given through Christ. Rather, it's about maintaining an open, unobstructed relationship with God.

**Understanding Forgiveness**
Forgiveness is not saying what happened was okay. It's not forgetting or pretending the hurt never occurred. Forgiveness is a decision to release someone from the debt they owe you and to trust God with justice and healing.

**The Cost of Unforgiveness**
When we refuse to forgive, we become prisoners of our own bitterness. Studies show that harboring unforgiveness leads to increased stress, anxiety, depression, and even physical health problems. The person who hurt you may have moved on, but unforgiveness keeps you trapped in the past.

**Steps to Forgiveness**
1. **Acknowledge the hurt**: Don't minimize or deny what happened. Be honest about the pain you experienced.
2. **Choose to forgive**: Forgiveness is a decision, not a feeling. You may need to make this choice repeatedly.
3. **Pray for the person**: This is often the hardest step, but praying for those who hurt us softens our hearts.
4. **Release expectations**: Let go of the need for an apology or acknowledgment.
5. **Set healthy boundaries**: Forgiveness doesn't always mean reconciliation or restored trust.

**When It's Hard**
Some hurts run deeper than others. Abuse, betrayal, abandonment—these wounds cut to our core. If you're struggling to forgive, that's okay. Forgiveness is a process, not a one-time event. Seek professional Christian counseling if needed, and remember that God is patient with your journey.

**The Freedom of Forgiveness**
When you forgive, you're not letting the other person off the hook—you're releasing yourself from a prison. You're choosing to trust God with justice rather than taking it into your own hands. You're opening yourself up to receive God's healing and peace.

Remember, you've been forgiven much by God through Christ. As you receive His forgiveness, extend it to others. It won't be easy, but it will be worth it.`,
      excerpt: "Discover how forgiveness transforms our hearts and brings freedom from the chains of bitterness.",
      imageUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Healing & Growth",
      tags: JSON.stringify(["forgiveness", "healing", "freedom", "relationships"]),
      readingTimeMinutes: 10,
      isPremium: false,
      publishedAt: new Date("2026-12-05").getTime(),
    },
    {
      title: "Building Authentic Christian Community",
      slug: createSlug("Building Authentic Christian Community"),
      content: `In an age of digital connections and surface-level interactions, genuine Christian community has become increasingly rare—and increasingly necessary. The early church in Acts modeled a radical form of community that transformed lives and turned the world upside down.

Acts 2:42-47 describes believers who "devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer." They met together daily, shared their possessions, and enjoyed each other's company. This wasn't just a nice idea—it was their way of life.

**Why Community Matters**
God designed us for relationship. From the very beginning, He said, "It is not good for man to be alone." We need each other to:
- Encourage and strengthen one another
- Hold each other accountable
- Share burdens and celebrate victories
- Sharpen one another spiritually
- Demonstrate God's love to the world

**Elements of Authentic Community**
**Vulnerability**: Real community requires removing our masks and sharing our struggles, not just our successes.
**Consistency**: Community isn't built in a weekend retreat but through regular, ongoing interaction.
**Service**: Look for ways to serve others in your community, meeting practical needs.
**Prayer**: Pray together regularly, lifting one another up before God.
**Scripture**: Center your community around God's Word, studying and applying it together.

**Overcoming Barriers**
Many Christians struggle to find or build authentic community. Common barriers include:
- **Fear of rejection**: Start small with one or two people
- **Busy schedules**: Make community a priority, not an afterthought
- **Past hurts**: Find a safe group and start building trust gradually
- **Pride**: Be willing to admit you need others

**Practical Steps**
1. Join a small group or cell group at your church
2. Invite someone over for dinner
3. Be consistent in attending church gatherings
4. Initiate conversations beyond surface level
5. Follow up with people throughout the week
6. Celebrate milestones and support during struggles

Remember, building community takes time. Don't get discouraged if it doesn't happen overnight. Keep showing up, keep being vulnerable, and keep serving others. God will honor your efforts to build the kind of community He intended for His church.`,
      excerpt: "Learn how to cultivate deep, authentic Christian relationships that reflect the early church's radical commitment to one another.",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Community & Fellowship",
      tags: JSON.stringify(["community", "fellowship", "church", "relationships"]),
      readingTimeMinutes: 9,
      isPremium: false,
      publishedAt: new Date("2026-12-10").getTime(),
    },
    {
      title: "Discovering Your Spiritual Gifts: A Biblical Guide",
      slug: createSlug("Discovering Your Spiritual Gifts: A Biblical Guide"),
      content: `Every believer has been given spiritual gifts by the Holy Spirit. These gifts aren't for personal benefit but for building up the body of Christ and advancing His kingdom. Understanding and using your gifts is essential to fulfilling your purpose.

Romans 12:6-8 says, "We have different gifts, according to the grace given to each of us." Paul goes on to list gifts like prophesying, serving, teaching, encouraging, giving, leadership, and showing mercy. Other passages mention additional gifts like wisdom, knowledge, faith, healing, miracles, and more.

**What Are Spiritual Gifts?**
Spiritual gifts are supernatural abilities given by the Holy Spirit to believers for the purpose of ministry and service. They're different from natural talents (though God can use those too) and are specifically for building up the church.

**Common Spiritual Gifts**
- **Teaching**: Ability to explain Scripture clearly and help others understand biblical truth
- **Prophecy**: Speaking God's truth to situations, often with a predictive or corrective element
- **Serving**: Meeting practical needs and working behind the scenes
- **Encouragement**: Uplifting and inspiring others toward spiritual growth
- **Giving**: Generosity in financial and material resources
- **Leadership**: Guiding and directing others toward God's purposes
- **Mercy**: Compassion and comfort for those who are suffering
- **Evangelism**: Sharing the gospel effectively with unbelievers
- **Administration**: Organizing and managing ministry activities
- **Hospitality**: Creating welcoming environments for others

**How to Discover Your Gifts**
1. **Pray**: Ask God to reveal your gifts to you
2. **Serve**: Try different areas of ministry to see where you're most effective
3. **Seek feedback**: Ask mature believers what they see in you
4. **Study Scripture**: Read about spiritual gifts in Romans 12, 1 Corinthians 12, and Ephesians 4
5. **Take an assessment**: Many churches offer spiritual gifts assessments
6. **Notice where you're fruitful**: Where does God use you most effectively?

**Using Your Gifts**
Once you've identified your gifts, it's time to use them. Don't wait for the "perfect" opportunity—start where you are. If you have the gift of teaching, lead a small group study. If you have the gift of serving, volunteer in your church. If you have the gift of encouragement, reach out to someone who's struggling.

Remember:
- Your gifts are for others, not just for you
- All gifts are equally important in God's eyes
- You may have multiple gifts
- Gifts can develop and grow over time
- Using your gifts brings joy and fulfillment

Don't hide your light under a basket. The body of Christ needs what God has placed in you. Step out in faith and start using your gifts today.`,
      excerpt: "Uncover your God-given spiritual gifts and learn how to use them to serve the church and advance God's kingdom.",
      imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Spiritual Growth",
      tags: JSON.stringify(["spiritual gifts", "ministry", "calling", "service"]),
      readingTimeMinutes: 11,
      isPremium: true,
      publishedAt: new Date("2026-12-15").getTime(),
    },
    {
      title: "Overcoming Anxiety: Biblical Strategies for Peace",
      slug: createSlug("Overcoming Anxiety: Biblical Strategies for Peace"),
      content: `Anxiety has become a epidemic in our modern world. According to recent studies, anxiety disorders affect millions of people globally. But as believers, we have access to a peace that transcends understanding—a peace that comes from God.

Philippians 4:6-7 offers a powerful antidote to anxiety: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."

**Understanding Anxiety**
Anxiety is more than just worry. It's a persistent feeling of dread, fear, or unease that can manifest physically (racing heart, sweating, trembling) and mentally (racing thoughts, difficulty concentrating). While some anxiety is normal, chronic anxiety can be debilitating.

**Biblical Truths to Combat Anxiety**
**God is in Control**: Psalm 46:1 reminds us that "God is our refuge and strength, an ever-present help in trouble."
**God Cares for You**: 1 Peter 5:7 says, "Cast all your anxiety on him because he cares for you."
**God's Plans Are Good**: Jeremiah 29:11 assures us, "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you.'"
**God Provides**: Matthew 6:25-34 teaches us not to worry about our needs because God knows what we need and will provide.

**Practical Steps**
1. **Practice Prayer**: When anxious thoughts arise, immediately turn them into prayers
2. **Memorize Scripture**: Fill your mind with God's promises
3. **Practice Gratitude**: Start each day listing things you're thankful for
4. **Take Thoughts Captive**: 2 Corinthians 10:5 teaches us to take every thought captive to Christ
5. **Breathe**: Physical practices like deep breathing can calm your nervous system
6. **Seek Community**: Share your struggles with trusted believers
7. **Professional Help**: Don't hesitate to see a Christian counselor if needed

**When to Seek Help**
If anxiety is interfering with your daily life, relationships, or ability to function, please seek professional help. There's no shame in this—it's wisdom. Many Christians benefit from a combination of prayer, Scripture, community support, and professional counseling.

Remember, God doesn't condemn you for struggling with anxiety. He invites you to bring your anxious thoughts to Him and exchange them for His peace. This is a process, not an overnight fix. Be patient with yourself as you learn to walk in God's peace.`,
      excerpt: "Find biblical peace in the midst of anxiety. Practical strategies rooted in Scripture to overcome worry and fear.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Mental Health & Faith",
      tags: JSON.stringify(["anxiety", "peace", "mental health", "prayer"]),
      readingTimeMinutes: 10,
      isPremium: true,
      publishedAt: new Date("2026-12-18").getTime(),
    },
    {
      title: "The Power of Daily Scripture Meditation",
      slug: createSlug("The Power of Daily Scripture Meditation"),
      content: `In our fast-paced, distraction-filled world, the ancient practice of Scripture meditation offers a powerful way to encounter God and transform our minds. Joshua 1:8 instructs us to meditate on God's Word "day and night" so that we "may be careful to do everything written in it."

**What is Scripture Meditation?**
Biblical meditation isn't emptying your mind but filling it with God's Word. It's the practice of slowly reading, pondering, and reflecting on Scripture, allowing it to sink deep into your heart and mind.

**Benefits of Scripture Meditation**
- Renews your mind (Romans 12:2)
- Increases spiritual discernment
- Reduces anxiety and brings peace
- Strengthens faith
- Helps you hear God's voice more clearly
- Transforms character
- Provides guidance for decisions

**How to Meditate on Scripture**
1. **Choose a passage**: Start with a single verse or short passage
2. **Read slowly**: Don't rush. Read it multiple times
3. **Ask questions**: What does this reveal about God? About me? About how I should live?
4. **Pray through it**: Turn the passage into a prayer
5. **Memorize**: Hide God's Word in your heart
6. **Apply**: Ask how this truth should change your life today
7. **Return**: Come back to the same passage over multiple days

**Creating a Daily Practice**
Start with just 5-10 minutes a day. Find a quiet time and place. Keep a journal to record insights. Be consistent—the transformation happens over time, not overnight.

**Suggested Passages to Begin**
- Psalm 23
- Philippians 4:4-9
- Romans 8:28-39
- John 15:1-17
- Psalm 119:9-16

As you develop this habit, you'll find that God's Word becomes a lamp to your feet and a light to your path. The truths you meditate on will surface in moments of decision, temptation, and need. Let God's Word dwell richly in you.`,
      excerpt: "Transform your spiritual life through the ancient practice of Scripture meditation. Learn practical steps to deepen your relationship with God through His Word.",
      imageUrl: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Spiritual Disciplines",
      tags: JSON.stringify(["scripture", "meditation", "bible study", "spiritual growth"]),
      readingTimeMinutes: 8,
      isPremium: false,
      publishedAt: new Date("2026-12-22").getTime(),
    },
    {
      title: "Understanding God's Will for Your Life",
      slug: createSlug("Understanding God's Will for Your Life"),
      content: `One of the most common questions Christians ask is: "What is God's will for my life?" We want to know His plan, His purpose, His direction. While God doesn't reveal every detail of our future, He does provide clear guidance for those who seek Him.

Romans 12:2 says, "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will."

**God's Revealed Will**
Before seeking God's specific will for your life, understand His general will revealed in Scripture:
- Salvation through faith in Jesus (1 Timothy 2:4)
- Sanctification—becoming more like Christ (1 Thessalonians 4:3)
- Spirit-filling—being controlled by the Holy Spirit (Ephesians 5:18)
- Submission—obeying God's commands (1 Peter 2:13-15)
- Suffering—enduring hardship for Christ (1 Peter 4:19)

**How God Guides**
God guides us through:
- **His Word**: Scripture provides principles and wisdom for every situation
- **Prayer**: Communicating with God and listening for His voice
- **Circumstances**: God often opens and closes doors
- **Wise Counsel**: Godly mentors and friends offer valuable perspective
- **Peace**: God's peace often confirms His direction (Colossians 3:15)
- **Spiritual Gifts**: Your gifts often point to your calling

**Keys to Discerning God's Will**
1. **Surrender**: Are you willing to do whatever God asks?
2. **Obey**: Follow what you already know to be God's will
3. **Wait**: Don't rush ahead of God's timing
4. **Trust**: Believe that God's will is good, even when you don't understand
5. **Move**: Sometimes you discover God's will by taking steps of faith

**When the Path Isn't Clear**
If you're uncertain about God's will:
- Keep doing the last thing God told you to do
- Focus on character development rather than just decisions
- Remember that God often reveals His will one step at a time
- Trust that if you're walking with God, He won't let you miss His will

God is more interested in your relationship with Him than in you making the "perfect" decision. As you walk closely with Him, trust that He will guide your steps (Proverbs 3:5-6).`,
      excerpt: "Discover how to discern God's will for your life through Scripture, prayer, and wise counsel. Find peace in knowing God's plan.",
      imageUrl: "https://images.unsplash.com/photo-1501290801209-c200001d1c90?w=1200&h=600&fit=crop",
      author: "Published by the mannuh team",
      category: "Purpose & Calling",
      tags: JSON.stringify(["God's will", "purpose", "calling", "guidance"]),
      readingTimeMinutes: 9,
      isPremium: false,
      publishedAt: new Date("2026-12-26").getTime(),
    },
    {
      title: "The Practice of Fasting: A Spiritual Discipline",
      slug: createSlug("The Practice of Fasting: A Spiritual Discipline"),
      content: `Fasting is a powerful but often neglected spiritual discipline. Jesus assumed His followers would fast, saying "when you fast" not "if you fast" (Matthew 6:16). Throughout Scripture, fasting is associated with seeking God, spiritual breakthrough, and increased sensitivity to the Holy Spirit.

**What is Biblical Fasting?**
Fasting is voluntarily abstaining from food (and sometimes other things) for spiritual purposes. It's not a way to manipulate God or earn His favor. Rather, fasting is a tool to help us focus on God, humble ourselves, and demonstrate the seriousness of our prayers.

**Types of Fasts**
- **Normal Fast**: No food, only water
- **Partial Fast**: Limited diet (like Daniel's fast of vegetables and water)
- **Complete Fast**: No food or water (only for short periods and with caution)
- **Media Fast**: Abstaining from TV, social media, etc.

**Biblical Purposes for Fasting**
- Seeking God's guidance (Acts 13:2-3)
- Expressing grief or repentance (Joel 2:12)
- Interceding for others (Esther 4:16)
- Overcoming temptation (Matthew 4:1-11)
- Preparing for ministry (Luke 4:1-14)
- Spiritual warfare (Mark 9:29)

**How to Fast Safely**
1. **Consult a doctor** if you have health conditions
2. **Start small**: Begin with a partial fast or a one-meal fast
3. **Stay hydrated**: Drink plenty of water
4. **Break your fast gently**: Ease back into eating with light foods
5. **Be wise**: Pregnant women, children, and those with certain health conditions shouldn't fast

**Making Your Fast Meaningful**
- Set a clear purpose for your fast
- Spend the time you'd normally eat in prayer and Scripture reading
- Keep a journal of what God reveals
- Be flexible if circumstances change
- Don't advertise your fast (Matthew 6:16-18)
- Expect spiritual opposition but also breakthrough

**Beyond Physical Fasting**
Consider fasting from:
- Social media
- Entertainment
- Complaining
- Shopping
- Anything that has too much control over your life

Remember, fasting isn't about impressing God or others. It's a private discipline between you and God that can lead to profound spiritual growth and breakthrough. Approach it with humility, faith, and expectation.`,
      excerpt: "Explore the biblical practice of fasting as a powerful spiritual discipline for seeking God and experiencing breakthrough.",
      imageUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Spiritual Disciplines",
      tags: JSON.stringify(["fasting", "prayer", "spiritual discipline", "breakthrough"]),
      readingTimeMinutes: 10,
      isPremium: true,
      publishedAt: new Date("2026-12-30").getTime(),
    },
    {
      title: "Cultivating Gratitude in Every Season",
      slug: createSlug("Cultivating Gratitude in Every Season"),
      content: `Gratitude is more than just good manners—it's a spiritual practice that transforms our perspective and deepens our relationship with God. 1 Thessalonians 5:18 instructs us to "give thanks in all circumstances; for this is God's will for you in Christ Jesus."

**The Power of Gratitude**
Research shows that gratitude:
- Increases happiness and life satisfaction
- Improves physical health
- Strengthens relationships
- Reduces depression and anxiety
- Increases resilience during difficult times

But beyond these benefits, gratitude is fundamentally about recognizing God as the source of every good gift (James 1:17) and responding with worship and praise.

**Biblical Examples**
- **David**: Despite many hardships, David's psalms overflow with thanksgiving
- **Paul**: Wrote about rejoicing and giving thanks from prison
- **Jesus**: Gave thanks before performing miracles and breaking bread
- **Daniel**: Continued his practice of giving thanks three times daily even when it meant facing lions

**Cultivating Daily Gratitude**
1. **Morning Gratitude**: Start each day by thanking God for three specific things
2. **Gratitude Journal**: Write down what you're grateful for each evening
3. **Thank You Notes**: Express gratitude to people who've blessed you
4. **Gratitude Prayers**: Turn complaints into thanksgiving in your prayers
5. **Gratitude in Difficulty**: Look for God's faithfulness even in trials
6. **Share Testimonies**: Tell others what God has done

**When Gratitude is Hard**
There are seasons when gratitude feels impossible—loss, pain, disappointment. In these times:
- Start with the basics: breath, life, salvation
- Remember past faithfulness: "Thus far the Lord has helped us" (1 Samuel 7:12)
- Look for small mercies: "The Lord's mercies are new every morning" (Lamentations 3:22-23)
- Trust God's character even when you don't understand His ways

**The Gratitude Challenge**
For the next 30 days:
- Write down 3 things you're grateful for each day
- Thank God specifically in prayer
- Express gratitude to at least one person daily
- When negative thoughts arise, replace them with thanksgiving
- Share what you're grateful for with your community

Watch how this practice transforms your perspective, your prayers, and your joy. Gratitude isn't denying difficulty—it's choosing to focus on God's goodness in the midst of it.`,
      excerpt: "Learn how cultivating gratitude can transform your life and deepen your relationship with God in every season.",
      imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Spiritual Growth",
      tags: JSON.stringify(["gratitude", "thanksgiving", "joy", "contentment"]),
      readingTimeMinutes: 8,
      isPremium: false,
      publishedAt: new Date("2027-01-03").getTime(),
    },
    {
      title: "Developing a Heart for Missions",
      slug: createSlug("Developing a Heart for Missions"),
      content: `The Great Commission isn't optional for Christians—it's Jesus' final command to His disciples before ascending to heaven. Matthew 28:19-20 records His words: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you."

**Understanding Missions**
Missions isn't just for "professional" missionaries. Every believer is called to participate in God's mission to reach the world with the gospel. This might mean:
- Going to another country
- Supporting missionaries financially and in prayer
- Sharing the gospel in your workplace, school, or neighborhood
- Using your skills to serve unreached people groups
- Praying strategically for nations and people groups

**Developing a Missional Heart**
**Pray for the Nations**: Use resources like the Joshua Project to pray for unreached people groups
**Study Missions**: Read biographies of missionaries like Hudson Taylor, Amy Carmichael, and Jim Elliot
**Support Missionaries**: Partner with missionaries financially and through regular communication
**Go on a Short-Term Trip**: Experience missions firsthand through a missions trip
**Learn About Cultures**: Study other cultures and learn a new language
**Share Locally**: Practice sharing your faith in your own community

**Overcoming Barriers**
Many Christians hesitate to engage in missions because of:
- Fear of the unknown
- Financial concerns
- Family responsibilities
- Feeling unqualified
- Comfort in their current situation

Remember, God doesn't call the equipped—He equips the called. If He's stirring your heart toward missions, He will provide what you need.

**Modern Missions**
Today's missions field includes:
- **Digital Missions**: Using technology and social media to reach people
- **Business as Missions**: Using your career as a platform for ministry
- **Refugee Ministry**: Serving people from unreached nations who've come to your country
- **Church Planting**: Starting new churches in underserved areas
- **Compassion Ministry**: Meeting physical needs as a gateway for sharing the gospel

**Taking Next Steps**
1. Pray and ask God how He wants you involved in missions
2. Connect with your church's missions team
3. Start supporting a missionary
4. Consider going on a short-term missions trip
5. Look for opportunities to share the gospel in your everyday life

Remember, missions isn't about guilt—it's about the joy of participating in God's redemptive plan for the world. Every believer has a role to play. What's yours?`,
      excerpt: "Discover how God is calling you to participate in His mission to reach the world with the gospel.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop",
      author: "Published by the mannuh team",
      category: "Missions & Evangelism",
      tags: JSON.stringify(["missions", "evangelism", "Great Commission", "discipleship"]),
      readingTimeMinutes: 11,
      isPremium: true,
      publishedAt: new Date("2027-01-08").getTime(),
    },
  ];

  for (const article of articlesData) {
    await db.insert(articles).values(article);
  }

  console.log("✓ Articles seeded");
}

async function seedEvents() {
  const db = await getDb();
  console.log("Seeding events...");

  const eventsData = [
    {
      title: "Hillsong Worship Night",
      description: "Join us for an evening of powerful worship led by the Hillsong team. Experience God's presence through music and prayer.",
      imageUrl: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=800&h=600&fit=crop",
      eventType: "in-person" as const,
      category: "worship",
      location: "Hillsong Church, Sydney, Australia",
      startTime: new Date("2027-02-15T19:00:00Z").getTime(),
      endTime: new Date("2027-02-15T22:00:00Z").getTime(),
      timezone: "Australia/Sydney",
      organizerId: 1,
      organizerType: "church" as const,
      maxAttendees: 5000,
      isPaid: false,
      isVerified: true,
    },
    {
      title: "Sunday Service - Grace Community Church",
      description: "Weekly Sunday service featuring expository preaching, worship, and fellowship. All are welcome!",
      imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop",
      eventType: "in-person" as const,
      category: "sunday-service",
      location: "Grace Community Church, Los Angeles, CA",
      startTime: new Date("2027-02-21T10:00:00Z").getTime(),
      endTime: new Date("2027-02-21T12:00:00Z").getTime(),
      timezone: "America/Los_Angeles",
      organizerId: 1,
      organizerType: "church" as const,
      maxAttendees: 1000,
      isPaid: false,
      isVerified: true,
    },
    {
      title: "Online Bible Study: The Book of Romans",
      description: "Deep dive into Paul's letter to the Romans. Join us virtually for this 6-week study covering chapters 1-8.",
      imageUrl: "https://images.unsplash.com/photo-1501290801209-c200001d1c90?w=800&h=600&fit=crop",
      eventType: "online" as const,
      category: "bible-study",
      virtualLink: "https://zoom.us/j/example",
      startTime: new Date("2027-02-18T20:00:00Z").getTime(),
      endTime: new Date("2027-02-18T21:30:00Z").getTime(),
      timezone: "America/New_York",
      organizerId: 1,
      organizerType: "user" as const,
      maxAttendees: 50,
      isPaid: false,
      isVerified: false,
    },
    {
      title: "Kingdom Conference 2027",
      description: "Three-day conference featuring renowned speakers, worship sessions, and breakout workshops on leadership, evangelism, and spiritual growth.",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      eventType: "hybrid" as const,
      category: "conference",
      location: "Convention Center, Dallas, TX",
      virtualLink: "https://kingdomconf.org/live",
      startTime: new Date("2027-03-10T09:00:00Z").getTime(),
      endTime: new Date("2027-03-12T17:00:00Z").getTime(),
      timezone: "America/Chicago",
      organizerId: 1,
      organizerType: "church" as const,
      maxAttendees: 2000,
      isPaid: true,
      ticketPrice: 15000, // $150.00
      isVerified: true,
    },
    {
      title: "Youth Ministry Workshop",
      description: "Equipping youth leaders with practical tools and biblical wisdom for effective ministry to teenagers in the modern world.",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
      eventType: "in-person" as const,
      category: "workshop",
      location: "Fellowship Church, Miami, FL",
      startTime: new Date("2027-02-28T13:00:00Z").getTime(),
      endTime: new Date("2027-02-28T17:00:00Z").getTime(),
      timezone: "America/New_York",
      organizerId: 1,
      organizerType: "user" as const,
      maxAttendees: 100,
      isPaid: true,
      ticketPrice: 2500, // $25.00
      isVerified: false,
    },
  ];

  for (const event of eventsData) {
    await db.insert(events).values(event);
  }

  console.log("✓ Events seeded");
}

async function seedChurches() {
  const db = await getDb();
  console.log("Seeding churches...");

  // Sample of 20 churches (in real seed, we'd have 100)
  const churchesData = [
    {
      name: "Hillsong Church",
      description: "A global church with a passion for worship, community, and reaching people with the love of Jesus.",
      logoUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=200&h=200&fit=crop",
      denomination: "Pentecostal",
      pastor: "Phil Dooley",
      address: "1-5 Solent Circuit",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      zipCode: "2147",
      phone: "+61 2 8853 5353",
      email: "info@hillsong.com",
      website: "https://hillsong.com",
      isVerified: true,
    },
    {
      name: "Elevation Church",
      description: "A multicampus church with a mission to see people saved, healed, set free, discipled, equipped, empowered and serving.",
      logoUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Steven Furtick",
      address: "4000 N Tryon St",
      city: "Charlotte",
      state: "NC",
      country: "United States",
      zipCode: "28206",
      phone: "+1 704-372-7700",
      email: "info@elevationchurch.org",
      website: "https://elevationchurch.org",
      isVerified: true,
    },
    {
      name: "Bethel Church",
      description: "A church passionate about worship, the prophetic, healing, and equipping believers to do the works of Jesus.",
      logoUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Bill Johnson",
      address: "933 College View Dr",
      city: "Redding",
      state: "CA",
      country: "United States",
      zipCode: "96003",
      phone: "+1 530-246-6000",
      email: "info@bethel.com",
      website: "https://bethel.com",
      isVerified: true,
    },
    {
      name: "Holy Trinity Brompton",
      description: "An Anglican church in London known for pioneering the Alpha Course and passionate about sharing the Christian faith.",
      logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      denomination: "Anglican",
      pastor: "Nicky Gumbel",
      address: "Brompton Road",
      city: "London",
      state: "Greater London",
      country: "United Kingdom",
      zipCode: "SW7 1JA",
      phone: "+44 20 7581 8255",
      email: "info@htb.org",
      website: "https://htb.org",
      isVerified: true,
    },
    {
      name: "Saddleback Church",
      description: "A purpose-driven church committed to helping people find and fulfill their God-given purpose.",
      logoUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=200&fit=crop",
      denomination: "Southern Baptist",
      pastor: "Andy Wood",
      address: "1 Saddleback Parkway",
      city: "Lake Forest",
      state: "CA",
      country: "United States",
      zipCode: "92630",
      phone: "+1 949-609-8000",
      email: "info@saddleback.com",
      website: "https://saddleback.com",
      isVerified: true,
    },
    {
      name: "Willow Creek Community Church",
      description: "A community church focused on turning irreligious people into fully devoted followers of Christ.",
      logoUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Dave Dummitt",
      address: "67 E Algonquin Rd",
      city: "South Barrington",
      state: "IL",
      country: "United States",
      zipCode: "60010",
      phone: "+1 847-765-5000",
      email: "info@willowcreek.org",
      website: "https://www.willowcreek.org",
      isVerified: true,
    },
    {
      name: "Lakewood Church",
      description: "A diverse and welcoming church focused on compassion and developing champions.",
      logoUrl: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Joel Osteen",
      address: "3700 Southwest Fwy",
      city: "Houston",
      state: "TX",
      country: "United States",
      zipCode: "77027",
      phone: "+1 713-491-5000",
      email: "info@lakewoodchurch.com",
      website: "https://www.lakewoodchurch.com",
      isVerified: true,
    },
    {
      name: "The Potter's House",
      description: "A multicultural, non-denominational church with a strong emphasis on family and community.",
      logoUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "T.D. Jakes",
      address: "6777 W Kiest Blvd",
      city: "Dallas",
      state: "TX",
      country: "United States",
      zipCode: "75236",
      phone: "+1 214-331-0954",
      email: "info@thepottershouse.org",
      website: "https://thepottershouse.org",
      isVerified: true,
    },
    {
      name: "Christ Embassy",
      description: "A Bible-believing church with a focus on prayer, faith, and spreading the gospel worldwide.",
      logoUrl: "https://images.unsplash.com/photo-1505063366573-38928ae5567e?w=200&h=200&fit=crop",
      denomination: "Pentecostal",
      pastor: "Chris Oyakhilome",
      address: "Plot 22/23 Billings Way",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      phone: "+234 1 342 9999",
      email: "info@christembassy.org",
      website: "https://christembassy.org",
      isVerified: true,
    },
    {
      name: "Yoido Full Gospel Church",
      description: "The world's largest Pentecostal Christian congregation with a heart for prayer and missions.",
      logoUrl: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=200&h=200&fit=crop",
      denomination: "Pentecostal",
      pastor: "Lee Young-hoon",
      address: "11 Yeoeuido-dong, Yeongdeungpo-gu",
      city: "Seoul",
      country: "South Korea",
      phone: "+82 2-780-0114",
      email: "info@fgtv.com",
      website: "https://english.fgtv.com",
      isVerified: true,
    },
    {
      name: "Brooklyn Tabernacle",
      description: "A diverse, multicultural church known for its Grammy Award-winning choir and emphasis on prayer.",
      logoUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Jim Cymbala",
      address: "17 Smith Street",
      city: "Brooklyn",
      state: "NY",
      country: "United States",
      zipCode: "11201",
      phone: "+1 718-290-2000",
      email: "info@brooklyntabernacle.org",
      website: "https://brooklyntabernacle.org",
      isVerified: true,
    },
    {
      name: "Life.Church",
      description: "An innovative church with physical and online campuses, known for the YouVersion Bible App.",
      logoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop",
      denomination: "Evangelical Covenant",
      pastor: "Craig Groeschel",
      address: "4600 E 2nd St",
      city: "Edmond",
      state: "OK",
      country: "United States",
      zipCode: "73034",
      phone: "+1 405-680-5433",
      email: "info@life.church",
      website: "https://www.life.church",
      isVerified: true,
    },
    {
      name: "Crossroads Church",
      description: "A community church focused on helping people find their way back to God.",
      logoUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Brian Tome",
      address: "3500 Madison Rd",
      city: "Cincinnati",
      state: "OH",
      country: "United States",
      zipCode: "45209",
      phone: "+1 513-731-7400",
      email: "info@crossroads.net",
      website: "https://crossroads.net",
      isVerified: false,
    },
    {
      name: "North Point Community Church",
      description: "A non-denominational church focused on creating environments where people are encouraged to explore Christianity.",
      logoUrl: "https://images.unsplash.com/photo-1501290801209-c200001d1c90?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Andy Stanley",
      address: "4350 N Point Pkwy",
      city: "Alpharetta",
      state: "GA",
      country: "United States",
      zipCode: "30022",
      phone: "+1 678-892-5000",
      email: "info@northpoint.org",
      website: "https://northpoint.org",
      isVerified: true,
    },
    {
      name: "Redeemed Christian Church of God",
      description: "A global Pentecostal denomination with thousands of parishes worldwide.",
      logoUrl: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?w=200&h=200&fit=crop",
      denomination: "Pentecostal",
      pastor: "E. A. Adeboye",
      address: "Km 46, Lagos-Ibadan Expressway",
      city: "Mowe",
      state: "Ogun",
      country: "Nigeria",
      phone: "+234 1 342 9999",
      email: "info@rccg.org",
      website: "https://rccg.org",
      isVerified: true,
    },
    {
      name: "Christ for the Nations",
      description: "A church and Bible institute focused on training leaders and spreading the gospel globally.",
      logoUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Dennis Lindsay",
      address: "3315 Conway St",
      city: "Dallas",
      state: "TX",
      country: "United States",
      zipCode: "75224",
      phone: "+1 214-376-1711",
      email: "info@cfni.org",
      website: "https://cfni.org",
      isVerified: false,
    },
    {
      name: "Gateway Church",
      description: "A multicampus church focused on worship, community, and serving the local area.",
      logoUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Josh Morris",
      address: "2121 Airport Fwy",
      city: "Southlake",
      state: "TX",
      country: "United States",
      zipCode: "76092",
      phone: "+1 817-329-4500",
      email: "info@gatewaypeople.com",
      website: "https://gatewaypeople.com",
      isVerified: true,
    },
    {
      name: "Passion City Church",
      description: "A church passionate about gathering a generation to declare the name of Jesus.",
      logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Louie Giglio",
      address: "515 Garson Dr NE",
      city: "Atlanta",
      state: "GA",
      country: "United States",
      zipCode: "30324",
      phone: "+1 404-963-9324",
      email: "info@passioncitychurch.com",
      website: "https://passioncitychurch.com",
      isVerified: true,
    },
    {
      name: "C3 Church",
      description: "A global church movement focused on connecting people to God and each other.",
      logoUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=200&fit=crop",
      denomination: "Pentecostal",
      pastor: "Phil Pringle",
      address: "19 Cowper Street",
      city: "Sydney",
      state: "NSW",
      country: "Australia",
      zipCode: "2041",
      phone: "+61 2 9550 4222",
      email: "info@c3church.com",
      website: "https://c3church.com",
      isVerified: true,
    },
    {
      name: "Victory Outreach International",
      description: "A church movement focused on reaching people affected by drugs, gangs, and crime.",
      logoUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=200&h=200&fit=crop",
      denomination: "Non-Denominational",
      pastor: "Paul Ramirez",
      address: "10012 Hubbard Street",
      city: "El Monte",
      state: "CA",
      country: "United States",
      zipCode: "91733",
      phone: "+1 626-442-1966",
      email: "info@victoryoutreach.org",
      website: "https://victoryoutreach.org",
      isVerified: false,
    },
  ];

  for (const church of churchesData) {
    await db.insert(churches).values(church);
  }

  console.log("✓ Churches seeded (20 sample churches)");
  console.log("Note: In production, add 80 more churches to reach 100 total");
}

async function main() {
  console.log("Starting seed process...\n");
  
  try {
    await seedPathways();
    await seedArticles();
    await seedEvents();
    await seedChurches();
    
    console.log("\n✅ All new features seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    process.exit(1);
  }
}

main();

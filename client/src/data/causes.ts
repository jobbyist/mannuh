export type CauseCategory =
  | "Clean Water"
  | "Food Relief"
  | "Disaster Response"
  | "Child Welfare"
  | "Education"
  | "Healthcare"
  | "Refugees"
  | "Human Rights"
  | "Anti-Trafficking"
  | "Poverty Alleviation"
  | "Faith-based Relief"
  | "Housing"
  | "Mental Health"
  | "Orphans & Vulnerable Children"
  | "Persecuted Church"
  | "Bible & Discipleship"
  | "Environment"
  | "Livelihoods"
  | "Malaria Prevention"
  | "Humanitarian Aid";

export type Cause = {
  id: string;
  title: string;
  organization: string;
  description: string;
  categories: CauseCategory[];
  region: string; // e.g., "Global", "Sub-Saharan Africa", "Middle East", "South Asia", etc.
  howToHelp: string[];
  websiteUrl: string; // official org/campaign website
  featured?: boolean;
  createdAt: string; // ISO date string
};

export const causesSeed: Cause[] = [
  {
    id: "clean-water-charitywater",
    title: "Fund Clean & Safe Drinking Water Projects",
    organization: "charity: water",
    description:
      "Support clean water projects and help communities gain reliable access to safe drinking water—unlocking better health, education, and dignity.",
    categories: ["Clean Water", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to fund water projects",
      "Start a fundraiser with friends or your church",
      "Share stories and impact updates",
      "Partner as a business or community group",
    ],
    websiteUrl: "https://www.charitywater.org/",
    featured: true,
    createdAt: "2026-02-25",
  },
  {
    id: "clean-water-wateraid",
    title: "Support Water, Sanitation & Hygiene (WASH)",
    organization: "WaterAid",
    description:
      "Help expand access to clean water, decent toilets, and hygiene education—especially for vulnerable communities.",
    categories: ["Clean Water", "Healthcare", "Humanitarian Aid"],
    region: "Africa & Asia",
    howToHelp: [
      "Donate to support WASH programs",
      "Join or host a community fundraiser",
      "Advocate for safe water access policies",
      "Share educational resources",
    ],
    websiteUrl: "https://www.wateraid.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "clean-water-waterorg",
    title: "Empower Families With Water & Sanitation Access",
    organization: "Water.org",
    description:
      "Support solutions that help families finance sustainable water and sanitation access.",
    categories: ["Clean Water", "Poverty Alleviation", "Livelihoods"],
    region: "Global",
    howToHelp: [
      "Donate to expand water & sanitation access",
      "Raise awareness and share impact stories",
      "Host a fundraiser event",
      "Engage your community group or church",
    ],
    websiteUrl: "https://water.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "food-relief-wfp",
    title: "Fight Hunger and Food Insecurity",
    organization: "World Food Programme (WFP)",
    description:
      "Support global emergency food assistance and resilience programs for communities facing hunger, conflict, and climate shocks.",
    categories: ["Food Relief", "Humanitarian Aid", "Disaster Response"],
    region: "Global",
    howToHelp: [
      "Donate to hunger relief efforts",
      "Advocate and share hunger awareness campaigns",
      "Support emergency response appeals",
      "Volunteer locally with partner initiatives",
    ],
    websiteUrl: "https://www.wfp.org/",
    featured: true,
    createdAt: "2026-02-25",
  },
  {
    id: "children-unicef",
    title: "Protect Children's Health, Safety & Education",
    organization: "UNICEF",
    description:
      "Support child-focused programs including health services, nutrition, protection, and access to education worldwide.",
    categories: ["Child Welfare", "Education", "Healthcare", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to child protection and relief programs",
      "Start a community fundraiser",
      "Share UNICEF campaigns and resources",
      "Support emergency appeals during crises",
    ],
    websiteUrl: "https://www.unicef.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "refugees-unhcr",
    title: "Support Refugees and Displaced Families",
    organization: "UNHCR (The UN Refugee Agency)",
    description:
      "Help provide shelter, protection, and essential services for refugees and displaced people fleeing conflict and persecution.",
    categories: ["Refugees", "Humanitarian Aid", "Human Rights"],
    region: "Global",
    howToHelp: [
      "Donate to refugee support programs",
      "Share verified resources to raise awareness",
      "Support local refugee assistance organizations",
      "Participate in advocacy and education initiatives",
    ],
    websiteUrl: "https://www.unhcr.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "medical-msf",
    title: "Deliver Emergency Medical Care in Crises",
    organization: "Doctors Without Borders (MSF)",
    description:
      "Support frontline medical teams delivering urgent care in conflict zones, epidemics, and disasters.",
    categories: ["Healthcare", "Disaster Response", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to support emergency medical response",
      "Share MSF crisis updates and appeals",
      "Fundraise through community initiatives",
      "Advocate for humanitarian access",
    ],
    websiteUrl: "https://www.msf.org/",
    featured: true,
    createdAt: "2026-02-25",
  },
  {
    id: "housing-habitat",
    title: "Build Safe, Affordable Housing for Families",
    organization: "Habitat for Humanity",
    description:
      "Support affordable housing and home-building projects that strengthen families and communities.",
    categories: ["Housing", "Poverty Alleviation", "Livelihoods"],
    region: "Global",
    howToHelp: [
      "Donate to support housing projects",
      "Volunteer on a build or local program",
      "Organize a church/community volunteer day",
      "Fundraise for a specific build initiative",
    ],
    websiteUrl: "https://www.habitat.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "disaster-redcross",
    title: "Respond to Disasters With Relief and Recovery Support",
    organization: "International Federation of Red Cross and Red Crescent Societies (IFRC)",
    description:
      "Support rapid disaster response, emergency supplies, and long-term recovery for affected communities.",
    categories: ["Disaster Response", "Humanitarian Aid", "Healthcare"],
    region: "Global",
    howToHelp: [
      "Donate to emergency response funds",
      "Volunteer locally with Red Cross/Red Crescent partners",
      "Support preparedness and training initiatives",
      "Share verified emergency alerts and resources",
    ],
    websiteUrl: "https://www.ifrc.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "anti-trafficking-ijm",
    title: "Protect People From Trafficking and Violence",
    organization: "International Justice Mission (IJM)",
    description:
      "Support efforts to rescue and protect people trapped in trafficking, slavery, and violence by strengthening justice systems.",
    categories: ["Anti-Trafficking", "Human Rights", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to support rescue and aftercare programs",
      "Join advocacy and awareness efforts",
      "Engage your church/community group in justice initiatives",
      "Share educational materials and updates",
    ],
    websiteUrl: "https://www.ijm.org/",
    featured: true,
    createdAt: "2026-02-25",
  },
  {
    id: "child-welfare-save-the-children",
    title: "Support Children During Conflict, Poverty & Disasters",
    organization: "Save the Children",
    description:
      "Help children access safety, nutrition, healthcare, and education during emergencies and long-term recovery.",
    categories: ["Child Welfare", "Education", "Disaster Response", "Healthcare"],
    region: "Global",
    howToHelp: [
      "Donate to child-focused emergency relief",
      "Start a fundraiser or school/church drive",
      "Share campaigns and impact reports",
      "Support local child welfare initiatives",
    ],
    websiteUrl: "https://www.savethechildren.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "poverty-worldvision",
    title: "Support Families Through Child Sponsorship and Community Development",
    organization: "World Vision",
    description:
      "Support vulnerable children and communities through sponsorship, education, clean water, and economic development programs.",
    categories: ["Poverty Alleviation", "Child Welfare", "Faith-based Relief", "Education"],
    region: "Global",
    howToHelp: [
      "Sponsor a child or donate to community programs",
      "Host a church fundraiser or awareness event",
      "Volunteer with local partner initiatives",
      "Share stories and community impact highlights",
    ],
    websiteUrl: "https://www.worldvision.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "faith-relief-samaritanspurse",
    title: "Support Faith-Based Disaster Relief and Medical Missions",
    organization: "Samaritan's Purse",
    description:
      "Help deliver emergency relief, medical care, and practical support to communities affected by disasters and crisis.",
    categories: ["Faith-based Relief", "Disaster Response", "Healthcare", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to disaster relief and crisis response",
      "Support medical mission initiatives",
      "Join volunteer opportunities when available",
      "Share crisis appeals and prayer requests",
    ],
    websiteUrl: "https://www.samaritanspurse.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "orphans-compassion",
    title: "Support Children Living in Poverty Through Sponsorship",
    organization: "Compassion International",
    description:
      "Support child sponsorship programs that provide holistic care and discipleship through local church partnerships.",
    categories: ["Orphans & Vulnerable Children", "Poverty Alleviation", "Faith-based Relief", "Education"],
    region: "Global",
    howToHelp: [
      "Sponsor a child or donate to critical needs",
      "Write encouragement letters (if available)",
      "Host a sponsorship event in your church/community",
      "Share impact stories and updates",
    ],
    websiteUrl: "https://www.compassion.com/",
    createdAt: "2026-02-25",
  },
  {
    id: "persecuted-open-doors",
    title: "Support the Persecuted Church",
    organization: "Open Doors",
    description:
      "Support believers facing persecution with practical aid, advocacy, and discipleship resources.",
    categories: ["Persecuted Church", "Bible & Discipleship", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to support persecuted believers",
      "Pray with guided resources",
      "Advocate through awareness initiatives",
      "Share verified stories and updates",
    ],
    websiteUrl: "https://www.opendoors.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "bible-discipleship-wycliffe",
    title: "Support Bible Translation and Scripture Access",
    organization: "Wycliffe Bible Translators",
    description:
      "Support efforts to translate Scripture so more people can engage with the Bible in their heart language.",
    categories: ["Bible & Discipleship", "Faith-based Relief", "Education"],
    region: "Global",
    howToHelp: [
      "Donate to support translation projects",
      "Join prayer updates and initiatives",
      "Engage your church in a translation partnership",
      "Share stories about Scripture access",
    ],
    websiteUrl: "https://www.wycliffe.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "healthcare-projecthope",
    title: "Deliver Health Supplies and Emergency Medical Aid",
    organization: "Project HOPE",
    description:
      "Support health workers and communities with training, supplies, and emergency response during crises.",
    categories: ["Healthcare", "Disaster Response", "Humanitarian Aid"],
    region: "Global",
    howToHelp: [
      "Donate to support emergency health response",
      "Share campaigns and emergency updates",
      "Support corporate/community matching drives",
      "Volunteer locally where available",
    ],
    websiteUrl: "https://www.projecthope.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "education-khanacademy",
    title: "Expand Free Education Access for Learners Everywhere",
    organization: "Khan Academy",
    description:
      "Support free, high-quality education resources for students, teachers, and self-learners worldwide.",
    categories: ["Education", "Poverty Alleviation"],
    region: "Global",
    howToHelp: [
      "Donate to keep learning resources free",
      "Share learning tools with students and parents",
      "Support teacher training and classroom use",
      "Host a local learning support group",
    ],
    websiteUrl: "https://www.khanacademy.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "mentalhealth-nami",
    title: "Support Mental Health Education and Community Resources",
    organization: "NAMI (National Alliance on Mental Illness)",
    description:
      "Support mental health education, advocacy, and community support resources that help individuals and families.",
    categories: ["Mental Health", "Human Rights", "Healthcare"],
    region: "United States (with global learning resources)",
    howToHelp: [
      "Donate to support programs and education",
      "Share resources with your community",
      "Volunteer for local outreach opportunities",
      "Advocate for better access to care",
    ],
    websiteUrl: "https://www.nami.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "malaria-amf",
    title: "Prevent Malaria With Bed Nets and Proven Interventions",
    organization: "Against Malaria Foundation (AMF)",
    description:
      "Fund long-lasting insecticidal nets and support distribution programs to reduce malaria infections and deaths.",
    categories: ["Malaria Prevention", "Healthcare", "Humanitarian Aid"],
    region: "Sub-Saharan Africa",
    howToHelp: [
      "Donate to fund bed nets and distribution",
      "Run a fundraiser or community drive",
      "Share evidence-based impact resources",
      "Encourage matched giving programs",
    ],
    websiteUrl: "https://www.againstmalaria.com/",
    featured: true,
    createdAt: "2026-02-25",
  },
  {
    id: "human-rights-amnesty",
    title: "Defend Human Rights Through Research and Advocacy",
    organization: "Amnesty International",
    description:
      "Support human rights research, advocacy, and campaigns that protect vulnerable people and hold abusers accountable.",
    categories: ["Human Rights"],
    region: "Global",
    howToHelp: [
      "Donate to support advocacy and research",
      "Take action through petitions and campaigns",
      "Host awareness events in your community",
      "Share verified resources and updates",
    ],
    websiteUrl: "https://www.amnesty.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "environment-wwf",
    title: "Protect Nature, Wildlife, and Critical Habitats",
    organization: "World Wildlife Fund (WWF)",
    description:
      "Support conservation work protecting wildlife, habitats, and climate resilience initiatives.",
    categories: ["Environment"],
    region: "Global",
    howToHelp: [
      "Donate to conservation programs",
      "Adopt a species (symbolic support) where available",
      "Share conservation campaigns and resources",
      "Join local environmental initiatives",
    ],
    websiteUrl: "https://www.worldwildlife.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "humanitarian-mercycorps",
    title: "Support Relief + Development in Fragile Contexts",
    organization: "Mercy Corps",
    description:
      "Support humanitarian response and long-term development that helps communities recover, adapt, and thrive.",
    categories: ["Humanitarian Aid", "Livelihoods", "Disaster Response"],
    region: "Global",
    howToHelp: [
      "Donate to emergency and development programs",
      "Support fundraising initiatives",
      "Share impact stories and crisis updates",
      "Engage business/community partnerships",
    ],
    websiteUrl: "https://www.mercycorps.org/",
    createdAt: "2026-02-25",
  },
  {
    id: "global-poverty-givewell",
    title: "Maximize Impact With Evidence-Based Giving",
    organization: "GiveWell",
    description:
      "Support research that identifies the most cost-effective charities tackling global health and extreme poverty.",
    categories: ["Poverty Alleviation", "Healthcare", "Malaria Prevention"],
    region: "Global",
    howToHelp: [
      "Donate through recommended funds",
      "Learn and share evidence-based giving insights",
      "Host a giving group or community discussion",
      "Encourage matched giving or workplace donations",
    ],
    websiteUrl: "https://www.givewell.org/",
    createdAt: "2026-02-25",
  },
];

// Helper functions for filtering and sorting
export const getAllCategories = (): CauseCategory[] => {
  const categoriesSet = new Set<CauseCategory>();
  causesSeed.forEach(cause => {
    cause.categories.forEach(cat => categoriesSet.add(cat));
  });
  return Array.from(categoriesSet).sort();
};

export const getAllRegions = (): string[] => {
  const regionsSet = new Set<string>();
  causesSeed.forEach(cause => regionsSet.add(cause.region));
  return Array.from(regionsSet).sort();
};

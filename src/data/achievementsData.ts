export interface AchievementItem {
  id: string;
  title: string;
  category: "triumphs" | "activities" | "certifications" | "seminars";
  tagline: string;
  description: string;
  date: string;
  issueNo?: string;
  iconName: "Trophy" | "Award" | "Flame" | "Star" | "Zap" | "Medal" | "Target" | "ShieldCheck";
  badgeText: string;
  highlights: string[];
  featured?: boolean;
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: "tech-expo-finalist",
    title: "Finalist – Tech Expo 2K25",
    category: "triumphs",
    tagline: "Distinguished Project Finalist & Technical Presenter",
    description: "Competed as a finalist at Tech Expo 2K25, demonstrating collaborative engineering, innovative system design, and impactful technical presentation skills.",
    date: "2025",
    issueNo: "FEAT NO. 01",
    iconName: "Trophy",
    badgeText: "FINALIST // TECH EXPO",
    highlights: [
      "Selected as Top Finalist among competitive tech projects",
      "Demonstrated teamwork and technical project presentation skills before industry judges"
    ],
    featured: true
  },
  {
    id: "hackathons-community",
    title: "Tech Hackathons & Developer Events",
    category: "triumphs",
    tagline: "Active Competitor Across Fast-Paced Hackathons",
    description: "Actively participated in competitive tech hackathons and developer community events, rapid prototyping AI-driven and full-stack solutions.",
    date: "2024 - PRESENT",
    issueNo: "FEAT NO. 02",
    iconName: "Zap",
    badgeText: "HACKATHON VETERAN",
    highlights: [
      "Collaborated in multidisciplinary teams to ship functional prototypes under intense time constraints",
      "Engaged in technical networking and hands-on developer hackathons"
    ],
    featured: true
  },
  {
    id: "cert-cpp",
    title: "C++ Programming Certification",
    category: "certifications",
    tagline: "Foundational & Object-Oriented C++ Programming",
    description: "Certified in core C++ programming, covering object-oriented architecture, data structures, algorithms, pointers, and memory management.",
    date: "CERTIFIED",
    issueNo: "CERT NO. 01",
    iconName: "Award",
    badgeText: "CERTIFIED // C++",
    highlights: [
      "Mastery of OOP principles, algorithms, and computational problem-solving",
      "Applied structured memory control and procedural algorithms"
    ],
    featured: true
  },
  {
    id: "cert-ai-tools",
    title: "AI Tools Workshop – Ben 10X",
    category: "certifications",
    tagline: "Mastery of Generative AI & Productivity Workflows",
    description: "Completed intensive AI Tools Workshop covering modern LLMs, prompt engineering, AI developer tooling, and productivity automation systems.",
    date: "CERTIFIED",
    issueNo: "CERT NO. 02",
    iconName: "ShieldCheck",
    badgeText: "AI SPECIALIST",
    highlights: [
      "Practical integration of AI APIs into automated developer workflows",
      "Explored prompt optimization and advanced LLM tool calling"
    ]
  },
  {
    id: "google-dev-program",
    title: "Google Developer Program",
    category: "seminars",
    tagline: "Active Attendee & Community Member",
    description: "Participated in the Google Developer Program, gaining key insights into modern web ecosystems, cloud computing architectures, and cutting-edge developer platforms.",
    date: "ATTENDEE",
    issueNo: "CONF NO. 01",
    iconName: "Star",
    badgeText: "GOOGLE DEV // VERIFIED",
    highlights: [
      "Explored modern web development standards and developer tools",
      "Connected with industry engineers and open community members"
    ]
  },
  {
    id: "c2air-cncf",
    title: "C2AIR × CNCF Kanpur",
    category: "seminars",
    tagline: "Cloud Native & AI Research Conference",
    description: "Attended C2AIR × CNCF Kanpur conference exploring Cloud Native Computing Foundation ecosystems, containerization, microservices, and AI in the cloud.",
    date: "ATTENDEE",
    issueNo: "CONF NO. 02",
    iconName: "Target",
    badgeText: "CNCF // ATTENDEE",
    highlights: [
      "Learned about container orchestration, cloud-native architectures, and microservice deployments",
      "Networked with cloud developers and open-source infrastructure contributors"
    ]
  },
  {
    id: "college-club-volunteer",
    title: "Volunteer & Coordinator – College Club",
    category: "activities",
    tagline: "Student Leadership & Club Coordination",
    description: "Spearheaded college club activities, coordinating technical workshops, organizing student events, and leading collaborative club initiatives.",
    date: "2024 - PRESENT",
    issueNo: "ACT NO. 01",
    iconName: "Flame",
    badgeText: "LEADERSHIP // CANON",
    highlights: [
      "Coordinated and led dynamic college club activities and tech workshops",
      "Managed peer collaboration, event logistics, and technical community engagement"
    ],
    featured: true
  },
];

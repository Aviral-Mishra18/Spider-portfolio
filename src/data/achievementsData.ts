export interface AchievementItem {
  id: string;
  title: string;
  category: "triumphs" | "activities" | "certifications";
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
    id: "hackathon-winner",
    title: "1st Place - Web3 & AI Hackathon",
    category: "triumphs",
    tagline: "Outperformed 150+ teams nationwide",
    description: "Architected an autonomous agent-driven workflow platform using Next.js, AI agents, and custom canvas rendering under 36 hours.",
    date: "OCT 2025",
    issueNo: "FEAT NO. 01",
    iconName: "Trophy",
    badgeText: "CHAMPION // VERIFIED",
    highlights: [
      "Built real-time interactive canvas with 60 FPS performance",
      "Awarded Best Technical Architecture & First Prize"
    ],
    featured: true
  },
  {
    id: "open-source-lead",
    title: "Lead Maintainer & Community Contributor",
    category: "activities",
    tagline: "Empowering developers across open-source ecosystems",
    description: "Actively contributing to UI component libraries, creating high-performance animation presets and developer tooling.",
    date: "2024 - PRESENT",
    issueNo: "ACT NO. 04",
    iconName: "Flame",
    badgeText: "COMMUNITY HERO",
    highlights: [
      "500+ GitHub Stars across open-source repositories",
      "Mentored 30+ junior developers in web & UI engineering"
    ],
    featured: true
  },
  {
    id: "cert-fullstack",
    title: "Advanced Full-Stack Engineering Certification",
    category: "certifications",
    tagline: "Mastery in Next.js, Node.js & Scalable Architecture",
    description: "Completed intensive specialization covering micro-frontends, edge serverless functions, state sync, and web performance optimization.",
    date: "AUG 2025",
    issueNo: "CERT NO. 89",
    iconName: "Award",
    badgeText: "CERTIFIED // SPIDER-LEVEL",
    highlights: [
      "Passed with 98% distinction in core web performance",
      "Implemented real-time websockets & distributed databases"
    ]
  },
  {
    id: "tech-fest-head",
    title: "Technical Lead - Annual University CodeFest",
    category: "activities",
    tagline: "Organized multi-track coding competitions & workshops",
    description: "Spearheaded the technical infrastructure and live leaderboard system for over 800 active participants during national tech fest.",
    date: "MAR 2025",
    issueNo: "ACT NO. 12",
    iconName: "Zap",
    badgeText: "LEADERSHIP // CANON",
    highlights: [
      "Designed zero-downtime automated judging system",
      "Conducted hands-on frontend web animation masterclass"
    ]
  },
  {
    id: "bug-bounty-feat",
    title: "Top Contributor - Security & Web Audits",
    category: "triumphs",
    tagline: "Discovered & patched key web vulnerabilities",
    description: "Identified high-impact frontend XSS and CSRF flaws in web applications, earning security hall-of-fame recognitions.",
    date: "JAN 2025",
    issueNo: "FEAT NO. 07",
    iconName: "ShieldCheck",
    badgeText: "HALL OF FAME",
    highlights: [
      "Audited client side bundles for security compliance",
      "Recognized for responsible disclosure & swift resolution"
    ]
  },
  {
    id: "streak-achievement",
    title: "365-Day Continuous Development Streak",
    category: "triumphs",
    tagline: "Unstoppable dedication to code craft & building",
    description: "Maintained a daily coding commit streak for a full year, building side projects, experimenting with WebGL, and sharpening core skills.",
    date: "2024 - 2025",
    issueNo: "FEAT NO. 99",
    iconName: "Star",
    badgeText: "UNSTOPPABLE // 365 DAYS",
    highlights: [
      "Over 1,200+ commits across public & private repositories",
      "Shipped 12+ mini-apps & interactive web experiences"
    ]
  }
];

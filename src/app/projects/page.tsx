import DailyBugleCard from "@/components/graphics/DailyBugleCard";

const PROJECTS = [
  {
    title: "Vionex AI - Developer Workspace",
    headline: "EXTRA! VIONEX AI LAUNCHES: NEXT-GEN AI DEVELOPER WORKSPACE & COLLABORATION HUB!",
    description: "Enterprise-grade AI workspace featuring sub-second streaming Llama-3.3-70B chat, automated code security reviews, AI technical documentation generator, Kanban drag-and-drop task tracking, and multi-tenant Supabase PostgreSQL architecture.",
    tech: ["Next.js 16", "React 19", "Groq AI (Llama 3.3)", "Supabase", "PostgreSQL (RLS)", "Tailwind CSS v4", "TypeScript"],
    issueNo: "NO. 2026 // SPECIAL",
    link: "https://github.com/Aviral-Mishra18/AI-Developer-Workspace",
  },
  {
    title: "VeggieMart",
    headline: "EXTRA! LOCAL DEVELOPER LAUNCHES ORGANIC PRODUCE MARKETPLACE!",
    description: "An online marketplace for fresh organic produce with real-time inventory management and high-speed order processing.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    issueNo: "NO. 1962",
    link: "#",
  },
  {
    title: "YT-GENAI",
    headline: "SPIDEY TECH REVEALS AI TOOL THAT SUMMARIZES YOUTUBE INSTANTLY!",
    description: "AI-powered tool that automatically transcribes YouTube videos and generates actionable bullet summaries in seconds.",
    tech: ["Next.js", "OpenAI API", "Python", "FastAPI"],
    issueNo: "NO. 2024",
    link: "#",
  },
  {
    title: "Club Sphere",
    headline: "CAMPUS ENGAGEMENT REVOLUTIONIZED BY NEW COMMUNITY PLATFORM!",
    description: "Community platform for university clubs to manage live events, announcements, real-time messaging, and member rosters.",
    tech: ["React", "Express", "PostgreSQL", "Socket.io"],
    issueNo: "NO. 301",
    link: "#",
  },
  {
    title: "AI Interview Generator",
    headline: "INTELLIGENT SIMULATOR PREPARES DEVS FOR TECHNICAL INTERVIEWS!",
    description: "Intelligent platform simulating real-time technical engineering interviews with voice feedback, scoring, and skill insights.",
    tech: ["Next.js", "Web Speech API", "Tailwind CSS", "Gemini API"],
    issueNo: "NO. 404",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
            DAILY BUGLE SPECIAL EDITION
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight">
            PROJECT <span className="text-red-600">HEADLINES</span>
          </h1>
        </div>
        <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0 font-mono">
          Latest press releases on full-stack web applications and AI tools built by Aviral Mishra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <DailyBugleCard
            key={idx}
            title={project.title}
            headline={project.headline}
            description={project.description}
            tech={project.tech}
            issueNo={project.issueNo}
            link={project.link}
          />
        ))}
      </div>
    </main>
  );
}

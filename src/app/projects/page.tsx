import DailyBugleCard from "@/components/graphics/DailyBugleCard";

const PROJECTS = [
  {
    title: "AI-Powered Developer Workspace",
    headline: "VIONEX AI",
    description: "Enterprise-grade AI-powered developer workspace featuring real-time project management, Kanban task tracking, and AI-driven code review. Integrated Groq LLM (llama-3.3-70b) via Vercel AI SDK for streaming AI chat assistance and automated technical documentation. Designed a multi-tenant PostgreSQL schema on Supabase with Row Level Security (RLS), roles, and 24+ relational tables.",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL (RLS)", "Groq AI SDK (Llama-3.3)", "Tailwind CSS"],
    issueNo: "NO. 2026 // PERSONAL PROJECT",
    link: "https://github.com/Aviral-Mishra18/AI-Developer-Workspace",
  },
  {
    title: "Collaborative Campus Platform",
    headline: "CLUB SPHERE",
    description: "Collaborated with peers to design and develop a collaborative full-stack web platform for managing college club activities. Built responsive UI components using React.js and Tailwind CSS with focus on clean user experience. Implemented JWT-based authentication and managed end-to-end frontend delivery.",
    tech: ["React.js", "Node.js", "Express", "MongoDB (Atlas)", "JWT", "Tailwind CSS"],
    issueNo: "NO. 2024 // TEAM PROJECT",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">
            DAILY BUGLE SPECIAL EDITION // PROJECT DOSSIER
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight text-white">
            PROJECT <span className="text-red-600">HEADLINES</span>
          </h1>
        </div>
        <p className="text-zinc-400 text-sm max-w-md mt-4 md:mt-0 font-mono">
          Featured full-stack and AI-driven applications built and delivered by Aviral Mishra.
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

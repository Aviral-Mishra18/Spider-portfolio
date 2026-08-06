import SpideySense from "@/components/animations/SpideySense";

const PROJECTS = [
  {
    title: "VeggieMart",
    description: "An online marketplace for fresh organic produce with real-time inventory management.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "#",
  },
  {
    title: "YT-GENAI",
    description: "AI-powered tool that summarizes YouTube videos and generates actionable insights automatically.",
    tech: ["Next.js", "OpenAI API", "Python", "FastAPI"],
    link: "#",
  },
  {
    title: "Club Sphere",
    description: "Community platform for university clubs to manage events, announcements, and member engagement.",
    tech: ["React", "Express", "PostgreSQL", "Socket.io"],
    link: "#",
  },
  {
    title: "AI Interview Generator",
    description: "Intelligent platform simulating technical interviews with real-time voice feedback and scoring.",
    tech: ["Next.js", "Web Speech API", "Tailwind CSS", "Gemini API"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-16">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Featured Projects</h1>
      <p className="text-zinc-400 mb-12 max-w-2xl">
        Here are some of the web applications and tools I've built. Hover over a card to activate spidey-sense!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <SpideySense key={idx} glowColor={idx % 2 === 0 ? "red" : "blue"}>
            <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:border-white/20 transition-colors">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">{project.title}</h2>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-400"
                >
                  Explore Project &rarr;
                </a>
              </div>
            </div>
          </SpideySense>
        ))}
      </div>
    </main>
  );
}

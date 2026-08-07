"use client";

import NotebookPage from "@/components/animations/NotebookPage";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 text-white relative">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          ORIGIN_STORY // NOTEBOOK_PAGE
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">About Me</span>
        </h1>
        <p className="text-base text-zinc-400 font-mono">
          Single notebook page sheet. Click the bottom corner fold or button to flip the paper sheet between Side A & Side B.
        </p>
      </div>

      {/* Single Notebook Paper Page Card */}
      <div className="relative z-10">
        <NotebookPage />
      </div>
    </main>
  );
}

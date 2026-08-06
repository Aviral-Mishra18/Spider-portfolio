"use client";

import { motion } from "framer-motion";

interface DailyBugleCardProps {
  title: string;
  headline: string;
  description: string;
  tech: string[];
  link?: string;
  issueNo?: string;
}

export default function DailyBugleCard({
  title,
  headline,
  description,
  tech,
  link = "#",
  issueNo = "NO. 1962",
}: DailyBugleCardProps) {
  return (
    <motion.div
      className="relative group bg-zinc-950 border-2 border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_35px_rgba(239,68,68,0.3)] flex flex-col justify-between"
      whileHover={{ y: -6, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Daily Bugle Header Masthead Banner */}
      <div className="bg-zinc-900 border-b-2 border-red-600/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-red-500 font-black tracking-widest text-lg font-serif uppercase">
            THE DAILY BUGLE
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-red-600 text-white text-[10px] font-mono font-bold uppercase rounded">
            EXCLUSIVE
          </span>
        </div>
        <span className="text-zinc-500 text-xs font-mono tracking-wider">{issueNo}</span>
      </div>

      {/* Comic Newspaper Front Page Headline Content */}
      <div className="p-6">
        {/* Newspaper Sub-Header */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-3 border-b border-zinc-800/80 pb-2">
          <span>NEW YORK CITY</span>
          <span>FRIENDLY NEIGHBORHOOD TECH</span>
        </div>

        {/* Bold Headline */}
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors font-serif leading-tight">
          {headline}
        </h3>

        {/* Project Name Badge */}
        <div className="inline-block bg-red-600/10 border border-red-500/30 text-red-400 font-mono text-xs font-semibold px-2.5 py-1 rounded mb-4">
          FEATURED: {title}
        </div>

        {/* Article Body Snippet */}
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
          {description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.map((item, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Newspaper Footer Call to Action */}
      <div className="px-6 py-4 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500 uppercase">READ FULL STORY &rarr;</span>
        <a
          href={link}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono tracking-wider uppercase rounded transition-colors"
        >
          EXPLORE PROJECT
        </a>
      </div>
    </motion.div>
  );
}

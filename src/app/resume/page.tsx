"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Trophy,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Terminal,
  Printer,
  Sparkles,
} from "lucide-react";

// Clean SVG Brand Icons for GitHub and LinkedIn
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

export default function ResumePage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-white relative font-sans">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden print:hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Action Header Bar (Screen only) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest mb-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
            <span>CONFIDENTIAL // VERIFIED CURRICULUM VITAE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-white">
            AVIRAL <span className="text-red-600">MISHRA</span>
          </h1>
          <p className="text-zinc-400 text-sm font-mono mt-1">
            Full-Stack Developer • TypeScript, Next.js & AI Systems Engineer
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-mono font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4 text-zinc-400" />
            <span>PRINT / SAVE PDF</span>
          </button>

          <a
            href="/resume.pdf"
            download="Aviral_Mishra_Resume.pdf"
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono font-bold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>
      </div>

      {/* Main Resume Canvas Container */}
      <div className="relative z-10 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-10 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="border-b border-zinc-800 pb-8 print:border-black/20 print:pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white print:text-black">
                Aviral Mishra
              </h2>
              <p className="text-red-400 font-mono text-sm sm:text-base font-semibold mt-1 print:text-red-700">
                Full-Stack Developer • Next.js, React & AI Systems
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 print:text-zinc-700">
              <MapPin className="w-4 h-4 text-red-500 print:text-red-700" />
              <span>Kanpur, India</span>
            </div>
          </div>

          {/* Contact Pills / Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6 font-mono text-xs">
            {/* Phone */}
            <div 
              onClick={() => copyToClipboard("9170252358", "phone")}
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-between cursor-pointer group print:bg-zinc-100 print:border-zinc-300"
            >
              <div className="flex items-center gap-2 truncate">
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="truncate text-zinc-300 print:text-black">9170252358</span>
              </div>
              {copiedItem === "phone" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 shrink-0 print:hidden" />
              )}
            </div>

            {/* Email */}
            <div 
              onClick={() => copyToClipboard("aviralmisrhra718@gmail.com", "email")}
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-between cursor-pointer group print:bg-zinc-100 print:border-zinc-300"
            >
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="truncate text-zinc-300 print:text-black">aviralmisrhra718@gmail.com</span>
              </div>
              {copiedItem === "email" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 shrink-0 print:hidden" />
              )}
            </div>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/aviral-mishra18"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-blue-500/50 transition-all flex items-center justify-between group print:bg-zinc-100 print:border-zinc-300"
            >
              <div className="flex items-center gap-2 truncate">
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate text-zinc-300 group-hover:text-blue-400 print:text-black">in/aviral-mishra18</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 shrink-0 print:hidden" />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/aviralmishra"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-between group print:bg-zinc-100 print:border-zinc-300"
            >
              <div className="flex items-center gap-2 truncate">
                <GithubIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="truncate text-zinc-300 group-hover:text-red-400 print:text-black">github.com/aviralmishra</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 shrink-0 print:hidden" />
            </a>
          </div>
        </header>

        {/* ================= CAREER OBJECTIVE ================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <Terminal className="w-4 h-4" />
            <span>CAREER OBJECTIVE</span>
          </div>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 print:bg-transparent print:p-0 print:border-none print:text-black">
            BCA student skilled in <strong className="text-white print:text-black">TypeScript, Next.js, and React.js</strong>, with hands-on experience integrating AI-driven APIs into real-world projects. A quick learner with strong problem-solving skills, seeking to contribute effectively in a professional development environment.
          </p>
        </section>

        {/* ================= TECHNICAL SKILLS ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <Code2 className="w-4 h-4" />
            <span>TECHNICAL SKILLS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            {/* Languages */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 print:bg-zinc-50 print:border-zinc-300">
              <span className="text-red-400 font-bold block mb-1 uppercase print:text-red-700">
                Languages:
              </span>
              <span className="text-zinc-200 print:text-black font-sans text-sm">
                C, C++, Python, JavaScript, TypeScript
              </span>
            </div>

            {/* Frontend */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 print:bg-zinc-50 print:border-zinc-300">
              <span className="text-blue-400 font-bold block mb-1 uppercase print:text-blue-700">
                Frontend:
              </span>
              <span className="text-zinc-200 print:text-black font-sans text-sm">
                HTML5, CSS3, React.js, Next.js, Tailwind CSS
              </span>
            </div>

            {/* Backend & Database */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 print:bg-zinc-50 print:border-zinc-300">
              <span className="text-emerald-400 font-bold block mb-1 uppercase print:text-emerald-700">
                Backend & Database:
              </span>
              <span className="text-zinc-200 print:text-black font-sans text-sm">
                Node.js, Express, MongoDB (Atlas), Supabase (PostgreSQL)
              </span>
            </div>

            {/* Tools & Libraries */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 print:bg-zinc-50 print:border-zinc-300">
              <span className="text-amber-400 font-bold block mb-1 uppercase print:text-amber-700">
                Tools & Libraries:
              </span>
              <span className="text-zinc-200 print:text-black font-sans text-sm">
                GitHub, VS Code, Vercel, Supabase, Chart.js, Recharts
              </span>
            </div>

            {/* Soft Skills */}
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 md:col-span-2 print:bg-zinc-50 print:border-zinc-300">
              <span className="text-purple-400 font-bold block mb-1 uppercase print:text-purple-700">
                Soft Skills:
              </span>
              <span className="text-zinc-200 print:text-black font-sans text-sm">
                Communication, Teamwork, Problem Solving, Time Management
              </span>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <Briefcase className="w-4 h-4" />
            <span>PROJECTS</span>
          </div>

          <div className="space-y-6">
            {/* Project 1: Club Sphere */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3 print:bg-transparent print:p-0 print:border-b print:border-zinc-300 print:pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <div>
                  <h3 className="text-lg font-bold text-white print:text-black">
                    Club Sphere
                  </h3>
                  <p className="text-xs font-mono text-red-400 print:text-red-700">
                    React.js, Node.js, Express, MongoDB, JWT
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-700 block">
                    2024 – Present
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300 print:bg-zinc-200 print:text-black">
                    Team Project
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans list-none print:text-black">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 print:text-black font-bold">•</span>
                  <span>Collaborated with peers to design and develop a collaborative platform for managing college club activities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 print:text-black font-bold">•</span>
                  <span>Built responsive UI components using React.js and Tailwind CSS with focus on clean user experience.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 print:text-black font-bold">•</span>
                  <span>Implemented JWT-based authentication and managed end-to-end frontend delivery.</span>
                </li>
              </ul>
            </div>

            {/* Project 2: Vionex AI */}
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3 print:bg-transparent print:p-0 print:border-b print:border-zinc-300 print:pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <div>
                  <h3 className="text-lg font-bold text-white print:text-black">
                    Vionex AI – AI-Powered Developer Workspace
                  </h3>
                  <p className="text-xs font-mono text-blue-400 print:text-blue-700">
                    Next.js, React, TypeScript, Supabase, Groq AI SDK, Tailwind CSS
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-700 block">
                    2026 – Present
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300 print:bg-zinc-200 print:text-black">
                    Personal Project
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans list-none print:text-black">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 print:text-black font-bold">•</span>
                  <span>Built an enterprise-grade AI-powered developer workspace with real-time project management, Kanban task tracking, and AI-driven code review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 print:text-black font-bold">•</span>
                  <span>Integrated Groq LLM (llama-3.3-70b) via Vercel AI SDK for streaming AI chat assistance and automated documentation generation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 print:text-black font-bold">•</span>
                  <span>Designed a multi-tenant PostgreSQL schema on Supabase with Row Level Security (RLS), roles, and 24+ relational tables.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <GraduationCap className="w-4 h-4" />
            <span>EDUCATION</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* PSIT-CHE */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 print:bg-transparent print:border-none print:p-0">
              <div>
                <h4 className="text-sm font-bold text-white font-sans print:text-black">
                  PSIT College of Higher Education (PSIT-CHE), CSJMU
                </h4>
                <p className="text-xs text-red-400 font-mono print:text-red-700">
                  Bachelor of Computer Applications (B.C.A.)
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-zinc-300 font-bold block print:text-black">
                  2024 – 2027 (Pursuing)
                </span>
                <span className="text-[11px] text-zinc-500 print:text-zinc-700">
                  Kanpur, India
                </span>
              </div>
            </div>

            {/* 12th Grade */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 print:bg-transparent print:border-none print:p-0">
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 font-sans print:text-black">
                  Kanya Kubja Public School, CBSE
                </h4>
                <p className="text-xs text-zinc-400 font-mono print:text-zinc-600">
                  Intermediate (12th Grade)
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-zinc-300 block print:text-black">2024</span>
                <span className="text-[11px] text-zinc-500 print:text-zinc-700">Kanpur, India</span>
              </div>
            </div>

            {/* 10th Grade */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 print:bg-transparent print:border-none print:p-0">
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 font-sans print:text-black">
                  Kanya Kubja Public School, CBSE
                </h4>
                <p className="text-xs text-zinc-400 font-mono print:text-zinc-600">
                  High School (10th Grade)
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-zinc-300 block print:text-black">2022</span>
                <span className="text-[11px] text-zinc-500 print:text-zinc-700">Kanpur, India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CERTIFICATIONS ================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <Award className="w-4 h-4" />
            <span>CERTIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5 print:bg-zinc-50 print:border-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-200 font-sans text-sm print:text-black">
                C++ Programming Certification
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2.5 print:bg-zinc-50 print:border-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-200 font-sans text-sm print:text-black">
                AI Tools Workshop – Ben 10X
              </span>
            </div>
          </div>
        </section>

        {/* ================= SEMINARS / CONFERENCES / WORKSHOPS ================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <BookOpen className="w-4 h-4" />
            <span>SEMINARS / CONFERENCES / WORKSHOPS</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-sans print:text-black">
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">Google Developer Program</strong> – Attendee
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">C2AIR × CNCF Kanpur</strong> – Attendee
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">Tech Expo 2K25</strong> – Participant; demonstrated teamwork and technical project presentation skills
              </div>
            </div>
          </div>
        </section>

        {/* ================= ACHIEVEMENTS & ACTIVITIES ================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider print:text-red-700">
            <Trophy className="w-4 h-4" />
            <span>ACHIEVEMENTS & ACTIVITIES</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300 font-sans print:text-black">
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-amber-400 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">Finalist – Tech Expo 2K25</strong>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-amber-400 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">Participated in tech hackathons</strong> and developer community events
              </div>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5 print:bg-transparent print:border-none print:p-0">
              <span className="text-amber-400 font-bold">•</span>
              <div>
                <strong className="text-white print:text-black">Volunteer, College Club Activities</strong> – coordinated and led club
              </div>
            </div>
          </div>
        </section>

        {/* Footer Navigation (Screen only) */}
        <footer className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500 print:hidden">
          <span>PORTFOLIO CANON // AVIRAL MISHRA</span>
          <div className="flex items-center gap-4">
            <Link href="/projects" className="text-zinc-400 hover:text-red-400 transition-colors">
              Projects &rarr;
            </Link>
            <Link href="/skills" className="text-zinc-400 hover:text-red-400 transition-colors">
              Skills Web &rarr;
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-red-400 transition-colors">
              Contact &rarr;
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Radio,
  MessageSquare,
  ShieldCheck,
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

export default function ContactPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sentStatus, setSentStatus] = useState(false);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    // Construct mailto fallback
    const mailtoUrl = `mailto:aviralmisrhra718@gmail.com?subject=${encodeURIComponent(
      formState.subject || `Message from ${formState.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSentStatus(true);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-white relative font-sans">
      {/* Background Atmosphere Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center space-y-3 max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>SPIDEY-SENSE FREQUENCY // DIRECT COMM LINK</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase font-mono">
          GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">TOUCH</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 font-mono">
          Ready to build high-performance web applications, AI workflows, or explore engineering missions together.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Direct Contact Telemetry Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-xl space-y-4">
            <h2 className="text-sm font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              DIRECT TRANSMISSION CHANNELS
            </h2>

            {/* Email Card */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Email Address</span>
                  <a 
                    href="mailto:aviralmisrhra718@gmail.com" 
                    className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-red-400 transition-colors truncate block"
                  >
                    aviralmisrhra718@gmail.com
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyText("aviralmisrhra718@gmail.com", "email")}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
                title="Copy Email"
              >
                {copiedKey === "email" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Phone / Mobile</span>
                  <a 
                    href="tel:+919170252358" 
                    className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-red-400 transition-colors truncate block"
                  >
                    +91 9170252358
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyText("9170252358", "phone")}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors shrink-0 ml-2"
                title="Copy Phone"
              >
                {copiedKey === "phone" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Base of Operations</span>
                <span className="text-xs sm:text-sm font-mono text-zinc-200">Kanpur, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-xl space-y-3">
            <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              DEVELOPER PROFILES & NETWORKS
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href="https://linkedin.com/in/aviral-mishra18"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-500 text-zinc-300 hover:text-blue-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 truncate">
                  <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-blue-400 shrink-0" />
              </a>

              <a
                href="https://github.com/aviralmishra"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-red-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 truncate">
                  <GithubIcon className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="truncate">GitHub</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Web Comm Dispatcher */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-white uppercase">
                <MessageSquare className="w-4 h-4 text-red-500" />
                <span>SPIDER COMM TRANSMITTER</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ENCRYPTED // ACTIVE</span>
              </div>
            </div>

            {sentStatus ? (
              <div className="p-8 rounded-xl bg-red-950/30 border border-red-500/40 text-center space-y-3 font-mono">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mx-auto text-red-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Transmitter Triggered!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your mail client has been loaded with the message addressed to aviralmisrhra718@gmail.com.
                </p>
                <button
                  onClick={() => setSentStatus(false)}
                  className="mt-4 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-zinc-400 font-bold mb-1.5 uppercase">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-600 transition-all"
                      placeholder="e.g. Peter Parker"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-zinc-400 font-bold mb-1.5 uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-600 transition-all"
                      placeholder="e.g. peter@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-zinc-400 font-bold mb-1.5 uppercase">
                    Subject / Mission Type
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-600 transition-all"
                    placeholder="Project Inquiry / Job Opportunity / Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-zinc-400 font-bold mb-1.5 uppercase">
                    Message Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-600 transition-all resize-none"
                    placeholder="Describe your project, timeline, or message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

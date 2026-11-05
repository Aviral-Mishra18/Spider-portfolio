"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import SpideyCornerGraphic from "../graphics/SpideyCornerGraphic";

const NAV_PAGES = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Triumphs", href: "/achievements" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function SpiderWebNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change or ESC
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed top-3 right-4 sm:right-6 z-50 flex items-center gap-3 sm:gap-6 pointer-events-auto">
        {/* Desktop Navigation Badges */}
        <nav className="hidden lg:flex items-center gap-2 bg-zinc-950/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {NAV_PAGES.map((page) => {
            const isActive = pathname === page.href;

            return (
              <Link
                key={page.name}
                href={page.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-white bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.7)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {page.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile / Tablet Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-full bg-zinc-950/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-red-500/50 shadow-lg backdrop-blur-md transition-all flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-red-400" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Red Spider-Man Avatar Graphic */}
        <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <SpideyCornerGraphic />
        </div>
      </div>

      {/* Mobile Navigation Spider Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex flex-col justify-start pt-20 px-4 bg-black/90 backdrop-blur-2xl">
            {/* Background Atmosphere Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-sm mx-auto bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SPIDER HUD // NAVIGATION</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links Grid */}
              <nav className="grid grid-cols-1 gap-2 font-mono text-sm">
                {NAV_PAGES.map((page) => {
                  const isActive = pathname === page.href;
                  return (
                    <Link
                      key={page.name}
                      href={page.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl font-bold flex items-center justify-between transition-all ${
                        isActive
                          ? "bg-red-600/20 border border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                          : "bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:border-red-500/40 hover:text-white"
                      }`}
                    >
                      <span>{page.name}</span>
                      <span className="text-xs text-red-400 font-mono">
                        {isActive ? "● ACTIVE" : "→"}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2 border-t border-zinc-800/60 text-center font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                AVIRAL MISHRA // PORTFOLIO
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

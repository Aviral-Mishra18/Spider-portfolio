"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className="fixed top-3 right-6 z-50 flex items-center gap-6 pointer-events-auto">
      {/* Sleek Navigation Badges (Clean, no static fan lines) */}
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

      {/* Red Spider-Man Avatar Graphic with Spidey-Sense Warning Aura */}
      <SpideyCornerGraphic />
    </div>
  );
}

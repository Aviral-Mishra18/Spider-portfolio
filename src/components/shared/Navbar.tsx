"use client";

import Link from "next/link";
import SpiderWebNav from "./SpiderWebNav";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-red-500 transition-colors z-50">
          AM<span className="text-red-600">.</span>
        </Link>

        {/* Spider-Man Web Shooter Navigation in the Top Right Corner */}
        <SpiderWebNav />
      </div>
    </header>
  );
}

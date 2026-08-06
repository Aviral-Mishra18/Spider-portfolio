import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-red-500 transition-colors">
          AM<span className="text-red-600">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/resume" className="hover:text-white transition-colors">Resume</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

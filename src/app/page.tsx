import Link from "next/link";
import SpideySense from "@/components/animations/SpideySense";
import SpiderCanvasWrapper from "@/components/3d/SpiderCanvasWrapper";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950 text-white pt-16">
      {/* Background glowing atmospheres */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="z-10 text-center px-6 max-w-5xl w-full flex flex-col items-center">
        {/* 3D React Three Fiber Web Scene */}
        <SpiderCanvasWrapper />

        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter -mt-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Aviral
          </span>{" "}
          Mishra
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-8 tracking-wide">
          Your Friendly Neighborhood Developer
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <SpideySense glowColor="red">
            <Link 
              href="/projects" 
              className="block w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors"
            >
              View Projects
            </Link>
          </SpideySense>

          <SpideySense glowColor="blue">
            <Link 
              href="/about" 
              className="block w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-md transition-colors border border-white/10"
            >
              Suit Up (About Me)
            </Link>
          </SpideySense>
        </div>
      </div>
    </main>
  );
}

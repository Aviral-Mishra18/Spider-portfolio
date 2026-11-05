import Link from "next/link";
import SpideySense from "@/components/animations/SpideySense";
import SpiderCanvasWrapper from "@/components/3d/SpiderCanvasWrapper";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-zinc-950 text-white pt-16 pb-12 px-4">
      {/* Lightweight GPU-accelerated ambient glows using CSS radial gradients (0% rasterization lag) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="z-10 text-center px-2 sm:px-6 max-w-5xl w-full flex flex-col items-center">
        {/* 3D React Three Fiber Web Scene */}
        <div data-gsap="3d-scene" className="w-full flex justify-center max-w-full overflow-hidden">
          <SpiderCanvasWrapper />
        </div>

        <h1 data-gsap="title" className="text-3xl sm:text-5xl md:text-7xl font-black mb-3 tracking-tighter -mt-4 sm:-mt-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            Aviral
          </span>{" "}
          Mishra
        </h1>
        
        <p data-gsap="subtitle" className="text-base sm:text-xl md:text-2xl text-zinc-400 font-medium mb-6 sm:mb-8 tracking-wide font-mono uppercase">
          FULL STACK DEVELOPER
        </p>

        <div data-gsap="buttons" className="flex items-center justify-center gap-4 mb-6 sm:mb-12 w-full sm:w-auto">
          <SpideySense glowColor="red">
            <Link 
              href="/about" 
              className="block w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] text-base sm:text-lg text-center"
            >
              🕷️ About Me
            </Link>
          </SpideySense>
        </div>
      </div>
    </main>
  );
}

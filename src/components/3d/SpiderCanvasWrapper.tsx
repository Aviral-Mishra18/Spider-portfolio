"use client";

import dynamic from "next/dynamic";

const SpiderScene3D = dynamic(() => import("@/components/3d/SpiderScene3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center text-zinc-500 font-mono text-sm">
      Initializing 3D Canvas...
    </div>
  ),
});

export default function SpiderCanvasWrapper() {
  return <SpiderScene3D />;
}

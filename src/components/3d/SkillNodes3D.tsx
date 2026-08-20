"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface SkillItem {
  name: string;
  level: string;
  category: string;
  color: string;
  pos: [number, number, number];
}

const SKILLS_DATA: SkillItem[] = [
  { name: "Next.js", level: "Expert", category: "Frontend", color: "#ef4444", pos: [0, 1.8, -0.5] },
  { name: "React.js", level: "Expert", category: "Frontend", color: "#61dafb", pos: [-2.2, 1.2, 0.5] },
  { name: "JavaScript", level: "Expert", category: "Frontend", color: "#f7df1e", pos: [2.2, 1.2, 0.5] },
  { name: "HTML5", level: "Expert", category: "Frontend", color: "#e34f26", pos: [-2.2, -0.4, -0.2] },
  { name: "CSS3", level: "Expert", category: "Frontend", color: "#1572b6", pos: [2.2, -0.4, -0.2] },
  { name: "GSAP & Motion", level: "Advanced", category: "Frontend", color: "#f43f5e", pos: [-1.4, 0.2, 1.2] },
  { name: "Node.js", level: "Advanced", category: "Backend", color: "#22c55e", pos: [1.4, 0.2, 1.2] },
  { name: "Express.js", level: "Advanced", category: "Backend", color: "#a855f7", pos: [-1.8, -1.4, 0.2] },
  { name: "MongoDB", level: "Advanced", category: "Database", color: "#10b981", pos: [-0.6, -1.8, 0.8] },
  { name: "Supabase", level: "Advanced", category: "Database", color: "#3ecf8e", pos: [0.6, -1.8, 0.8] },
  { name: "Python", level: "Advanced", category: "Language", color: "#eab308", pos: [1.8, -1.4, 0.2] },
  { name: "C++", level: "Advanced", category: "Language", color: "#00599c", pos: [0, -0.8, -1.2] },
];

function SkillNode({
  skill,
  onSelect,
  isSelected,
}: {
  skill: SkillItem;
  onSelect: (skill: SkillItem) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  const active = hovered || isSelected;

  return (
    <group position={skill.pos}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(skill)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[active ? 0.45 : 0.35, 1]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={active ? 2.5 : 0.8}
          wireframe={!active}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, -0.6, 0]}
        fontSize={0.25}
        color={active ? "#ef4444" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.woff"
      >
        {skill.name}
      </Text>
    </group>
  );
}

function WebConnections() {
  const linesGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < SKILLS_DATA.length; i++) {
      for (let j = i + 1; j < SKILLS_DATA.length; j++) {
        const p1 = new THREE.Vector3(...SKILLS_DATA[i].pos);
        const p2 = new THREE.Vector3(...SKILLS_DATA[j].pos);
        if (p1.distanceTo(p2) < 3.2) {
          points.push(p1);
          points.push(p2);
        }
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  return (
    <lineSegments geometry={linesGeometry}>
      <lineBasicMaterial color="#ef4444" transparent opacity={0.35} />
    </lineSegments>
  );
}

export default function SkillNodes3D() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);

  return (
    <div className="w-full h-[450px] md:h-[500px] relative rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row">
      {/* 3D Web Constellation Canvas */}
      <div className="w-full md:w-2/3 h-full relative">
        <div className="absolute top-4 left-4 z-10 font-mono text-xs text-cyan-400 tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          3D_WEB_SKILL_CONSTELLATION // CLICK NODE TO INSPECT
        </div>

        <Canvas camera={{ position: [0, 0, 5.8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ef4444" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />

          <WebConnections />

          {SKILLS_DATA.map((skill) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              onSelect={setSelectedSkill}
              isSelected={selectedSkill.name === skill.name}
            />
          ))}

          <Sparkles count={60} scale={8} size={2} speed={0.5} color="#3b82f6" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>

      {/* Interactive Cyberpunk Inspector Panel */}
      <div className="w-full md:w-1/3 bg-zinc-900/90 border-t md:border-t-0 md:border-l border-zinc-800 p-6 flex flex-col justify-between font-mono backdrop-blur-md">
        <div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
            NODE_SPECS // {selectedSkill.category}
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-3">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: selectedSkill.color }}
            />
            {selectedSkill.name}
          </h3>

          <div className="space-y-3 text-xs text-zinc-400">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span>PROFICIENCY_LEVEL:</span>
              <span className="text-red-400 font-bold">{selectedSkill.level}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span>CATEGORY:</span>
              <span className="text-cyan-400">{selectedSkill.category}</span>
            </div>

            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span>SUIT INTEGRATION:</span>
              <span className="text-emerald-400">ACTIVE_ONLINE</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <div className="text-[11px] text-zinc-500 mb-2">3D CONSTELLATION SYNC</div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: "88%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

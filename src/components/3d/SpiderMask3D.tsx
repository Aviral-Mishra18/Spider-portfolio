"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, Float, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function InteractiveMaskMesh() {
  const meshRef = useRef<THREE.Group>(null!);
  const eyeLeftRef = useRef<THREE.Mesh>(null!);
  const eyeRightRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smoothly rotate 3D mask towards mouse pointer position
    const targetX = (state.pointer.y * Math.PI) / 6;
    const targetY = (state.pointer.x * Math.PI) / 4;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetX, delta * 4);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, delta * 4);

    // Dynamic lens squint when hovered ("Spidey-Sense Lock")
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeScale = hovered ? 0.7 : 1.0;
      eyeLeftRef.current.scale.y = THREE.MathUtils.lerp(eyeLeftRef.current.scale.y, eyeScale, delta * 10);
      eyeRightRef.current.scale.y = THREE.MathUtils.lerp(eyeRightRef.current.scale.y, eyeScale, delta * 10);
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Spider-Man Stylized Mask Core Geometry */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <MeshWobbleMaterial
          color={hovered ? "#dc2626" : "#b91c1c"}
          emissive="#450a0a"
          factor={hovered ? 0.25 : 0.1}
          speed={3}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Spider-Man Web Outline Strands on Mask */}
      <mesh position={[0, 0, 0.05]}>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial color="#09090b" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Iconic Spider Eyes - Left Eye */}
      <mesh ref={eyeLeftRef} position={[-0.45, 0.2, 1.15]} rotation={[0, -0.3, -0.2]}>
        <coneGeometry args={[0.38, 0.8, 4]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Iconic Spider Eyes - Right Eye */}
      <mesh ref={eyeRightRef} position={[0.45, 0.2, 1.15]} rotation={[0, 0.3, 0.2]}>
        <coneGeometry args={[0.38, 0.8, 4]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 2.5 : 1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Chest Spider Emblem Floating Node */}
      <mesh position={[0, -0.9, 1.2]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#ef4444"
          emissiveIntensity={hovered ? 3 : 1}
        />
      </mesh>
    </group>
  );
}

export default function SpiderMask3D() {
  return (
    <div className="w-full h-[360px] md:h-[450px] relative rounded-2xl overflow-hidden bg-zinc-950/60 border border-red-500/20 backdrop-blur-md shadow-[0_0_40px_rgba(239,68,68,0.15)]">
      <div className="absolute top-4 left-4 z-10 font-mono text-xs text-red-500/80 tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        SPIDEY_HELMET // MOUSE_TRACKING_ONLINE
      </div>

      <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} className="w-full h-full">
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#3b82f6" />
        <pointLight position={[0, 0, 5]} intensity={2.5} color="#ef4444" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <InteractiveMaskMesh />
        </Float>

        <Sparkles count={45} scale={6} size={3} speed={0.4} color="#ef4444" />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}

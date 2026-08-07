"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Silence THREE.Clock deprecation warnings from third-party libraries in browser console
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

function WebParticles() {
  const count = 350;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorRed = new THREE.Color("#ef4444");
    const colorBlue = new THREE.Color("#3b82f6");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const choice = Math.random() > 0.5 ? colorRed : colorBlue;
      col[i * 3] = choice.r;
      col[i * 3 + 1] = choice.g;
      col[i * 3 + 2] = choice.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function HangingSpidey3D() {
  const groupRef = useRef<THREE.Group>(null!);
  const timeRef = useRef(0);
  const texture = useLoader(THREE.TextureLoader, "/assets/spiderman-hang.png");

  // Web thread line geometry from top center to Spider-Man
  const lineGeometry = useMemo(() => {
    const points = [new THREE.Vector3(0, 4, 0), new THREE.Vector3(0, 1.2, 0)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      
      // Realistic hanging pendulum swing animation
      const swingAngle = Math.sin(timeRef.current * 1.8) * 0.08;
      groupRef.current.rotation.z = swingAngle;
      
      // Interactive 3D tilt tracking mouse pointer
      const targetRotY = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

      // Subtle float oscillation
      groupRef.current.position.y = Math.sin(timeRef.current * 1.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Web Strand */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#ffffff" opacity={0.8} transparent linewidth={2} />
      </lineSegments>

      {/* Hanging Spider-Man Texture Quad */}
      <mesh position={[0, -0.6, 0]}>
        <planeGeometry args={[3.2, 4.8]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function SpiderScene3D() {
  return (
    <div className="w-full h-[420px] md:h-[520px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} color="#ef4444" intensity={2.5} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={2.5} />

        <Suspense fallback={null}>
          <HangingSpidey3D />
        </Suspense>

        <WebParticles />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function WebParticles() {
  const count = 300;
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorRed = new THREE.Color("#ef4444");
    const colorBlue = new THREE.Color("#3b82f6");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const choice = Math.random() > 0.5 ? colorRed : colorBlue;
      col[i * 3] = choice.r;
      col[i * 3 + 1] = choice.g;
      col[i * 3 + 2] = choice.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1;
      pointsRef.current.rotation.x += delta * 0.05;
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingEmblem() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshWobbleMaterial
          color="#ef4444"
          emissive="#7f1d1d"
          factor={0.4}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function SpiderScene3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#ef4444" intensity={2} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={2} />

        <FloatingEmblem />
        <WebParticles />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}

"use client";

import React, { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Silence THREE.Clock deprecation warnings from third-party libraries in browser console
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

// Global mouse tracker across entire viewport
const globalPointer = {
  x: 0,
  y: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      globalPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      globalPointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    },
    { passive: true }
  );
}

function WebParticles() {
  const count = 35;
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
      const dt = Math.min(delta, 0.08);
      pointsRef.current.rotation.y += dt * 0.06;
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        globalPointer.x * 0.25,
        dt * 2
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        -globalPointer.y * 0.2,
        dt * 2
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function HangingSpidey3D() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lineRef = useRef<THREE.LineSegments>(null!);
  const glowLineRef = useRef<THREE.LineSegments>(null!);

  const { camera, gl } = useThree();
  const texture = useLoader(THREE.TextureLoader, "/assets/spiderman-hang.png");

  // Fixed Ceiling Anchor coordinates in world space
  const ANCHOR_Y = 3.3;
  const REST_LENGTH = 3.8;
  const HAND_OFFSET = 1.85; // Distance from center of sprite to where hands hold the web

  // Dynamic Web Silk Line Geometry (2 Points: [Anchor] to [Hands])
  const linePositions = useMemo(() => new Float32Array(6), []);
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  // Pendulum & Physics Simulation State
  const timeRef = useRef(0);
  const currentAngle = useRef(0);
  const currentVelocity = useRef(0);
  const bounceOffset = useRef(0);
  const bounceVelocity = useRef(0);

  // Current World Position of Spider-Man center
  const currentPos = useRef(new THREE.Vector3(0, ANCHOR_Y - REST_LENGTH, 0));

  // Grabbing & Dragging State
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);

  const dragTarget = useRef(new THREE.Vector3(0, ANCHOR_Y - REST_LENGTH, 0));
  const lastDragPos = useRef({ x: 0, y: ANCHOR_Y - REST_LENGTH, time: 0 });
  const releaseVelocity = useRef({ x: 0, y: 0 });

  // Helper to accurately map window client coordinates to 3D world space at Z = 0
  const getWorldCoords = (clientX: number, clientY: number) => {
    const bounds = gl.domElement.getBoundingClientRect();
    const ndcX = ((clientX - bounds.left) / bounds.width) * 2 - 1;
    const ndcY = -(((clientY - bounds.top) / bounds.height) * 2 - 1);

    const persCam = camera as THREE.PerspectiveCamera;
    const vFov = (persCam.fov * Math.PI) / 180;
    const planeH = 2 * Math.tan(vFov / 2) * persCam.position.z;
    const planeW = planeH * (bounds.width / bounds.height);

    const worldX = ndcX * (planeW / 2);
    const worldY = ndcY * (planeH / 2);

    return { worldX, worldY };
  };

  // Start Grabbing Spider-Man
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    setIsDragging(true);
    document.body.style.cursor = "grabbing";

    const { worldX, worldY } = getWorldCoords(e.clientX, e.clientY);
    const targetY = Math.min(ANCHOR_Y - 0.8, worldY);
    dragTarget.current.set(worldX, targetY, 0);
    lastDragPos.current = { x: worldX, y: targetY, time: performance.now() };
    releaseVelocity.current = { x: 0, y: 0 };
  };

  // Global window listeners for smooth dragging anywhere on the screen
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const { worldX, worldY } = getWorldCoords(e.clientX, e.clientY);
      // Clamp bounds: Can drag left/right, pull down, but cannot drag above the ceiling anchor
      const clampedX = Math.max(-4.2, Math.min(4.2, worldX));
      const clampedY = Math.max(-4.8, Math.min(ANCHOR_Y - 0.8, worldY));

      const now = performance.now();
      const dt = Math.max((now - lastDragPos.current.time) / 1000, 0.001);

      // Track instantaneous velocity to transfer momentum on release
      releaseVelocity.current.x = (clampedX - lastDragPos.current.x) / dt;
      releaseVelocity.current.y = (clampedY - lastDragPos.current.y) / dt;

      dragTarget.current.set(clampedX, clampedY, 0);
      lastDragPos.current = { x: clampedX, y: clampedY, time: now };
    };

    const onPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      document.body.style.cursor = "auto";

      // Calculate release angle and pendulum momentum
      const dx = currentPos.current.x;
      const dy = currentPos.current.y - ANCHOR_Y;
      const L = Math.hypot(dx, dy);
      const theta = Math.atan2(dx, -dy);

      // Tangential velocity component converts to angular velocity
      const vTangential =
        releaseVelocity.current.x * Math.cos(theta) +
        releaseVelocity.current.y * Math.sin(theta);
      const omega = THREE.MathUtils.clamp(
        vTangential / Math.max(L, 1.2),
        -16,
        16
      );

      currentAngle.current = theta;
      currentVelocity.current = omega;

      // Elastic slingshot recoil if pulled downwards
      const stretch = Math.max(0, L - REST_LENGTH);
      if (stretch > 0.1) {
        bounceVelocity.current = -stretch * 18; // Slingshot bounce upward
        bounceOffset.current = -stretch;
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [camera, gl]);

  // Frame physics loop
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.06);
    timeRef.current += dt;

    if (isDraggingRef.current) {
      // 1. ACTIVE GRAB / DRAG MODE
      // Spider-Man follows user's mouse/touch target smoothly
      currentPos.current.x = THREE.MathUtils.lerp(
        currentPos.current.x,
        dragTarget.current.x,
        dt * 26
      );
      currentPos.current.y = THREE.MathUtils.lerp(
        currentPos.current.y,
        dragTarget.current.y,
        dt * 26
      );

      // Calculate string tension angle from ceiling anchor to Spider-Man
      const dx = currentPos.current.x;
      const dy = currentPos.current.y - ANCHOR_Y;
      const angle = Math.atan2(dx, -dy);
      currentAngle.current = angle;

      if (meshRef.current) {
        meshRef.current.position.set(currentPos.current.x, currentPos.current.y, 0);
        meshRef.current.rotation.z = angle;
        // Subtle 3D tilt tracking drag direction
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          (dx / 4) * 0.15,
          dt * 6
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          0,
          dt * 6
        );
        // Slightly scale up while held for tactile grab response
        meshRef.current.scale.lerp(new THREE.Vector3(1.08, 1.08, 1), dt * 8);
      }
    } else {
      // 2. FREE SWINGING / PENDULUM MODE
      const idleSway = Math.sin(timeRef.current * 1.5) * 0.04;
      const idleBob = Math.cos(timeRef.current * 1.2) * 0.03;

      // Gentle cursor bias when hovering near
      const targetRestAngle = globalPointer.x * 0.28 + idleSway;

      // Physical Pendulum Equation: d^2(theta)/dt^2 = -(g/L)*sin(theta - target) - c*velocity
      const gravity = 28.0;
      const damping = 1.7;
      const angularAcc =
        -(gravity / REST_LENGTH) *
          Math.sin(currentAngle.current - targetRestAngle) -
        damping * currentVelocity.current;

      currentVelocity.current += angularAcc * dt;
      currentAngle.current += currentVelocity.current * dt;

      // Vertical elastic bungee spring physics
      const springK = 34.0;
      const bounceDamping = 4.5;
      bounceVelocity.current +=
        (-springK * bounceOffset.current - bounceDamping * bounceVelocity.current) *
        dt;
      bounceOffset.current += bounceVelocity.current * dt;

      // Calculate position along circular pendulum arc from ceiling anchor
      const currentLength = REST_LENGTH + bounceOffset.current;
      const targetX = currentLength * Math.sin(currentAngle.current);
      const targetY =
        ANCHOR_Y - currentLength * Math.cos(currentAngle.current) + idleBob;

      currentPos.current.x = targetX;
      currentPos.current.y = targetY;

      if (meshRef.current) {
        meshRef.current.position.set(currentPos.current.x, currentPos.current.y, 0);
        meshRef.current.rotation.z = currentAngle.current;
        // Subtle 3D face turn
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          globalPointer.x * 0.12,
          dt * 4
        );
        meshRef.current.rotation.x = THREE.MathUtils.lerp(
          meshRef.current.rotation.x,
          -globalPointer.y * 0.08,
          dt * 4
        );
        const targetScale = hovered ? 1.04 : 1.0;
        meshRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, 1),
          dt * 6
        );
      }
    }

    // 3. DYNAMIC WEB SILK CORD UPDATE
    // Web connects from ceiling anchor [0, ANCHOR_Y, 0] to Spider-Man's hands
    const angle = currentAngle.current;
    const handX = currentPos.current.x - HAND_OFFSET * Math.sin(angle);
    const handY = currentPos.current.y + HAND_OFFSET * Math.cos(angle);

    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Anchor point (Ceiling)
    arr[0] = 0;
    arr[1] = ANCHOR_Y;
    arr[2] = 0;

    // End point (Spider-Man's hands holding the web)
    arr[3] = handX;
    arr[4] = handY;
    arr[5] = 0;

    posAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Outer Glowing Web Silk Aura */}
      {/* @ts-expect-error - line is supported in R3F */}
      <line ref={glowLineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={isDragging ? "#ef4444" : "#38bdf8"}
          opacity={isDragging ? 0.8 : hovered ? 0.6 : 0.25}
          transparent
          linewidth={3}
        />
      </line>

      {/* Core Crisp Web Silk Thread */}
      {/* @ts-expect-error - line is supported in R3F */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#ffffff"
          opacity={isDragging ? 1.0 : hovered ? 0.95 : 0.85}
          transparent
          linewidth={2}
        />
      </line>

      {/* Spider-Man Quad - Click & Drag anywhere on Spidey */}
      <mesh
        ref={meshRef}
        position={[0, ANCHOR_Y - REST_LENGTH, 0]}
        onPointerDown={handlePointerDown}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = isDragging ? "grabbing" : "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!isDraggingRef.current) {
            document.body.style.cursor = "auto";
          }
        }}
      >
        <planeGeometry args={[2.9, 4.8]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Fallback Mobile/Touch Visual with interactive Touch Dragging & Slingshot Release
function MobileSpideyVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, rotate: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startTouch = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    setIsDragging(true);
    const touch = e.touches[0];
    startTouch.current = { x: touch.clientX - currentPosRef.current.x, y: touch.clientY - currentPosRef.current.y };
    lastTimeRef.current = performance.now();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    const touch = e.touches[0];
    const newX = Math.max(-100, Math.min(100, touch.clientX - startTouch.current.x));
    const newY = Math.max(0, Math.min(80, touch.clientY - startTouch.current.y));

    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
    velocityRef.current = {
      x: (newX - currentPosRef.current.x) / dt,
      y: (newY - currentPosRef.current.y) / dt,
    };
    lastTimeRef.current = now;

    currentPosRef.current = { x: newX, y: newY };
    setPos({
      x: newX,
      y: newY,
      rotate: (newX / 100) * 22,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Spring release back to center with momentum
    currentPosRef.current = { x: 0, y: 0 };
    setPos({ x: 0, y: 0, rotate: 0 });
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full flex flex-col items-center justify-start relative pt-2 cursor-grab active:cursor-grabbing select-none"
    >
      <div
        className={`flex flex-col items-center origin-top ${
          isDragging ? "transition-none" : "transition-all duration-700 ease-out"
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${pos.rotate}deg)`,
        }}
      >
        {/* Dynamic Glowing Web Strand */}
        <div
          className={`w-[2px] transition-all duration-150 ${
            isDragging
              ? "h-24 bg-gradient-to-b from-white via-red-400 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              : "h-16 bg-gradient-to-b from-white via-white/80 to-red-500/70 shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          }`}
        />

        {/* Hanging Spider-Man */}
        <div
          className={`relative transition-transform duration-200 ${
            isDragging ? "scale-105" : "hover:scale-105 animate-[bounce_4s_infinite_ease-in-out]"
          }`}
        >
          <img
            src="/assets/spiderman-hang.png"
            alt="Spider-Man"
            className="w-44 sm:w-56 h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(239,68,68,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}

export default function SpiderScene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const isTouchOnly =
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(pointer: fine)").matches;
      setIsMobile(window.innerWidth < 768 || isTouchOnly);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  // Mobile / Touch devices
  if (isMobile) {
    return (
      <div className="w-full h-[280px] sm:h-[340px] relative flex items-center justify-center">
        <MobileSpideyVisual />
      </div>
    );
  }

  // Desktop WebGL Canvas with Grab-and-Drag Physics
  return (
    <div className="w-full h-[380px] md:h-[480px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "low-power",
          antialias: true,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[6, 6, 6]} color="#ef4444" intensity={2.2} />
        <pointLight position={[-6, -6, -6]} color="#3b82f6" intensity={1.8} />

        <Suspense fallback={null}>
          <HangingSpidey3D />
        </Suspense>

        <WebParticles />
      </Canvas>
    </div>
  );
}

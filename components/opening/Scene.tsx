"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useRef, type ReactNode } from "react";
import type { Group } from "three";
import { BUSINESSES, type BusinessId } from "@/lib/businesses";
import { capDelta } from "@/lib/morph";
import { BusinessModel } from "./BusinessModel";

type Pointer = { x: number; y: number };

function Rig({ pointer, still, children }: { pointer: { current: Pointer }; still: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);
  const wide = useThree((s) => s.size.width >= 760);
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const k = still ? 1 : 1 - Math.exp(-4 * capDelta(delta));
    g.rotation.y += ((still ? 0 : pointer.current.x * 0.45) - g.rotation.y) * k;
    g.rotation.x += ((still ? 0 : pointer.current.y * 0.2) - g.rotation.x) * k;
  });
  return (
    <group ref={group} position={[wide ? 1.95 : 0, 0, 0]} scale={wide ? 1 : 0.8}>
      {children}
    </group>
  );
}

export default function Scene({ business, reducedMotion }: { business: BusinessId; reducedMotion: boolean }) {
  const accent = BUSINESSES[business].accent;
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <Canvas flat dpr={[1, 2]} camera={{ position: [0, 1.6, 8], fov: 38 }}>
      <color attach="background" args={["#0B0920"]} />
      <ambientLight intensity={0.5} color="#8C7BFF" />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color={accent} />
      <directionalLight position={[-5, 3, -4]} intensity={1.4} color="#6FA8FF" />
      <Rig pointer={pointer} still={reducedMotion}>
        <BusinessModel business={business} visible={1} />
      </Rig>
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { Color, type Group, type PointLight } from "three";
import { BUSINESSES, type BusinessId } from "@/lib/businesses";
import { capDelta, rigLayout } from "@/lib/morph";
import { Morph } from "./Particles";
import { Stage } from "./Stage";

type Pointer = { x: number; y: number };

function Rig({ pointer, still, children }: { pointer: { current: Pointer }; still: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);
  const { x: offset, scale } = rigLayout(useThree((s) => s.size.width));
  useFrame(({ camera }, delta) => {
    const g = group.current;
    if (!g) return;
    const k = still ? 1 : 1 - Math.exp(-4 * capDelta(delta));
    const { x, y } = still ? { x: 0, y: 0 } : pointer.current;
    g.rotation.y += (x * 0.45 - g.rotation.y) * k;
    camera.position.x += (x * 0.7 - camera.position.x) * k;
    camera.position.y += (0.5 - y * 0.22 - camera.position.y) * k;
    camera.lookAt(0, -0.2, 0);
  });
  return (
    <group ref={group} position={[offset, 0, 0]} scale={scale}>
      {children}
    </group>
  );
}

function KeyLight({ accent }: { accent: string }) {
  const light = useRef<PointLight>(null);
  const target = useMemo(() => new Color(accent), [accent]);
  useFrame((_, delta) => void light.current?.color.lerp(target, 1 - Math.exp(-2.5 * capDelta(delta))));
  return <pointLight ref={light} position={[3, 1, 3.5]} intensity={14} distance={10} color="#FFC14D" />;
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
    <Canvas flat dpr={[1, 2]} camera={{ position: [0, 0.5, 9], fov: 36 }}>
      <Stage accent={accent} still={reducedMotion} />
      <ambientLight intensity={0.55} color="#8C7BFF" />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color="#FFE7CF" />
      <directionalLight position={[-5, 3, -4]} intensity={1.4} color="#6FA8FF" />
      <KeyLight accent={accent} />
      <Rig pointer={pointer} still={reducedMotion}>
        <Morph business={business} reducedMotion={reducedMotion} pointer={pointer} />
      </Rig>
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}

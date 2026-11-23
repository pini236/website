"use client";

import { MeshReflectorMaterial, Sparkles, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { BackSide, BoxGeometry, CanvasTexture, Color, MeshBasicMaterial, NearestFilter, SRGBColorSpace } from "three";
import { capDelta } from "@/lib/morph";
import { Block, Cyl, FLOOR, Orb, StringLights, glow, mat, rnd, type V3 } from "./parts";

export const HAZE = "#17123F";

const SKY_VERT = `varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;
const SKY_FRAG = `uniform vec3 uAccent; uniform vec3 uHaze; uniform vec3 uTop; varying vec3 vDir;
void main(){
  float h = normalize(vDir).y;
  vec3 c = mix(uHaze, uTop, smoothstep(0., .5, h));
  c += uAccent * exp(-abs(h) * 7.) * .3;
  gl_FragColor = vec4(c, 1.);
}`;

function Sky({ accent }: { accent: string }) {
  const uniforms = useMemo(() => ({ uAccent: { value: new Color(accent) }, uHaze: { value: new Color(HAZE) }, uTop: { value: new Color("#04031A") } }), []);
  const target = useMemo(() => new Color(accent), [accent]);
  useFrame((_, delta) => void uniforms.uAccent.value.lerp(target, 1 - Math.exp(-2.5 * capDelta(delta))));
  return (
    <mesh>
      <sphereGeometry args={[95, 32, 16]} />
      <shaderMaterial vertexShader={SKY_VERT} fragmentShader={SKY_FRAG} uniforms={uniforms} side={BackSide} depthWrite={false} />
    </mesh>
  );
}

function Towers({ accent }: { accent: string }) {
  const { geo, material, list } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 512;
    const x = c.getContext("2d")!;
    x.fillStyle = "#0E0B2B";
    x.fillRect(0, 0, 128, 512);
    for (let k = 0; k < 85 * 16; k++) {
      if (rnd(k) > 0.34) continue;
      x.fillStyle = rnd(k + 500) < 0.2 ? "#9FB6FF" : "#FFD49A";
      x.globalAlpha = 0.4 + rnd(k + 900) * 0.6;
      x.fillRect((k % 16) * 8 + 2, Math.floor(k / 16) * 6 + 2, 4, 3);
    }
    const map = new CanvasTexture(c);
    map.colorSpace = SRGBColorSpace;
    map.magFilter = NearestFilter;
    const list = Array.from({ length: 96 }, (_, i) => {
      const a = (rnd(i) - 0.5) * 2.3;
      const d = 24 + rnd(i + 100) * 38;
      const w = 2.4 + rnd(i + 200) * 3;
      const top = 0.5 + d * (0.03 + rnd(i + 300) * 0.2);
      return { at: [Math.sin(a) * d, top, -Math.cos(a) * d] as V3, w, a };
    });
    return { geo: new BoxGeometry(1, 40, 1), material: new MeshBasicMaterial({ map, toneMapped: false }), list };
  }, []);
  return (
    <group>
      {list.map(({ at, w, a }, i) => (
        <group key={i} position={at} rotation={[0, -a, 0]}>
          <mesh geometry={geo} material={material} position={[0, -20, 0]} scale={[w, 1, w]} />
          {i % 3 === 0 && <Block size={[w * 0.5, 0.12, 0.1]} position={[0, -0.6, w / 2 + 0.06]} material={glow(i % 2 ? accent : "#6FA8FF", 1.6)} />}
          {i % 5 === 0 && <Orb r={0.14} position={[0, 0.5, 0]} material={glow("#FF4A5A", 2)} />}
        </group>
      ))}
    </group>
  );
}

function Roof({ accent }: { accent: string }) {
  return (
    <group position={[0, FLOOR, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -1]}>
        <planeGeometry args={[30, 24]} />
        <MeshReflectorMaterial blur={[300, 90]} resolution={1024} mixBlur={1} mixStrength={90} roughness={0.75} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} color="#0C0A26" metalness={0.55} mirror={0.9} />
      </mesh>
      <Block size={[30, 0.7, 0.4]} position={[0, 0.35, -13]} material={mat.dark} />
      <Block size={[30, 0.05, 0.08]} position={[0, 0.73, -12.8]} material={glow(accent, 1.1)} />
      {[-15, 15].map((x) => (
        <Block key={x} size={[0.4, 0.7, 24]} position={[x, 0.35, -1]} material={mat.dark} />
      ))}
      <group position={[-5.5, 0, -9.5]}>
        <Block size={[1.8, 1, 1.2]} position={[0, 0.5, 0]} material={mat.dark} />
        <Block size={[1.3, 0.06, 0.02]} position={[0, 0.62, 0.61]} material={glow("#6FA8FF", 1.5)} />
        <Cyl r={0.4} h={0.12} position={[0, 1.06, 0]} material={mat.light} />
      </group>
      <group position={[-10.5, 0, -11]} scale={0.8}>
        {([[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]] as const).map(([x, z]) => (
          <Cyl key={`${x}${z}`} r={0.05} h={1.6} position={[x, 0.8, z]} material={mat.dark} />
        ))}
        <Cyl r={1} h={1.7} position={[0, 2.45, 0]} material={mat.dark} />
        <Cyl r={1.05} r2={0.05} h={0.6} position={[0, 3.6, 0]} material={mat.light} />
        <Block size={[2.02, 0.05, 0.05]} position={[0, 2.2, 1]} material={glow(accent, 1.4)} />
      </group>
      <group position={[9.5, 0, -11.5]}>
        <Cyl r={0.05} h={6} position={[0, 3, 0]} material={mat.dark} />
        <Orb r={0.1} position={[0, 6.05, 0]} material={glow("#FF4A5A", 2.2)} />
      </group>
    </group>
  );
}

export function Stage({ accent, still }: { accent: string; still: boolean }) {
  return (
    <group>
      <color attach="background" args={[HAZE]} />
      <fog attach="fog" args={[HAZE, 16, 95]} />
      <Sky accent={accent} />
      <Stars radius={70} depth={20} count={1800} factor={3.2} saturation={0.4} fade speed={still ? 0 : 0.6} />
      <Towers accent={accent} />
      <Roof accent={accent} />
      <StringLights from={[-12, 4.2, -9]} to={[6, 2.05, 4]} count={34} sag={0.3} r={0.05} accent={accent} />
      <StringLights from={[12, 4.5, -9]} to={[-5, 2.15, 4.5]} count={34} sag={0.3} r={0.05} accent={accent} />
      <Sparkles count={140} scale={[18, 5, 12]} position={[0, 0.9, -1]} size={3} speed={still ? 0 : 0.3} opacity={0.7} color={accent} />
    </group>
  );
}

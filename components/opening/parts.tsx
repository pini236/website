"use client";

import { Edges } from "@react-three/drei";
import { Color, MeshBasicMaterial, MeshStandardMaterial, type Material } from "three";

export type V3 = [number, number, number];
type At = { position?: V3; rotation?: V3 };

export const WARM = "#FFD49A";
export const IVORY = "#F4EFFF";
export const FLOOR = -1.25;

export const mat = {
  body: new MeshStandardMaterial({ color: "#3A2C9E", roughness: 0.6, metalness: 0.1 }),
  light: new MeshStandardMaterial({ color: "#5B49D8", roughness: 0.5, metalness: 0.1 }),
  pale: new MeshStandardMaterial({ color: "#A99BFF", roughness: 0.5 }),
  dark: new MeshStandardMaterial({ color: "#232A66", roughness: 0.3, metalness: 0.3 }),
  glass: new MeshStandardMaterial({ color: "#9AA8FF", transparent: true, opacity: 0.13, roughness: 0.1, depthWrite: false }),
  leaf: new MeshStandardMaterial({ color: "#1E7A66", emissive: "#3DD6C4", emissiveIntensity: 0.2, roughness: 0.9, flatShading: true }),
};

const glows = new Map<string, MeshBasicMaterial>();
export function glow(color: string, strength = 1.6) {
  const key = color + strength;
  if (!glows.has(key)) glows.set(key, new MeshBasicMaterial({ color: new Color(color).multiplyScalar(strength), toneMapped: false }));
  return glows.get(key)!;
}

const tints = new Map<string, MeshStandardMaterial>();
export function tint(color: string, emissive = 0.4) {
  const key = color + emissive;
  if (!tints.has(key)) tints.set(key, new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, roughness: 0.7 }));
  return tints.get(key)!;
}

export const rnd = (i: number) => ((Math.imul(i + 1, 2654435761) >>> 0) % 1000) / 1000;

export function Block({ size, material = mat.body, edge, position, rotation }: At & { size: V3; material?: Material; edge?: string }) {
  return (
    <mesh position={position} rotation={rotation} material={material}>
      <boxGeometry args={size} />
      {edge && <Edges threshold={15} color={edge} lineWidth={1} />}
    </mesh>
  );
}

export function Cyl({ r, r2 = r, h, seg = 20, material = mat.body, position, rotation }: At & { r: number; r2?: number; h: number; seg?: number; material?: Material }) {
  return (
    <mesh position={position} rotation={rotation} material={material}>
      <cylinderGeometry args={[r2, r, h, seg]} />
    </mesh>
  );
}

export function Orb({ r, material, position }: At & { r: number; material: Material }) {
  return (
    <mesh position={position} material={material}>
      <sphereGeometry args={[r, 12, 10]} />
    </mesh>
  );
}

export function Pad({ size, accent }: { size: [number, number]; accent: string }) {
  const [w, d] = size;
  const m = glow(accent, 1.5);
  return (
    <group position={[0, 0.012, 0]}>
      <Block size={[w, 0.02, 0.035]} position={[0, 0, d / 2]} material={m} />
      <Block size={[w, 0.02, 0.035]} position={[0, 0, -d / 2]} material={m} />
      <Block size={[0.035, 0.02, d]} position={[w / 2, 0, 0]} material={m} />
      <Block size={[0.035, 0.02, d]} position={[-w / 2, 0, 0]} material={m} />
    </group>
  );
}

export function Shell({ size, accent, position }: { size: V3; accent: string; position?: V3 }) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      <Block size={size} position={[0, h / 2, 0]} edge={accent} />
      <Block size={[w + 0.1, 0.07, d + 0.1]} position={[0, 0.035, 0]} material={mat.light} />
    </group>
  );
}

export function Windows({ cols, rows, size, gap, lit = 0.7, accent, position, rotation }: At & { cols: number; rows: number; size: [number, number]; gap: [number, number]; lit?: number; accent: string }) {
  const [w, h] = size;
  const [gx, gy] = gap;
  const panes = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const on = rnd(i) < lit;
      const x = (c - (cols - 1) / 2) * (w + gx);
      const y = (r - (rows - 1) / 2) * (h + gy);
      panes.push(
        <group key={i} position={[x, y, 0]}>
          <Block size={[w + 0.05, h + 0.05, 0.03]} material={mat.light} />
          <Block size={[w, h, 0.02]} position={[0, 0, 0.012]} material={on ? glow(rnd(i + 77) < 0.25 ? accent : WARM, 1.35) : mat.dark} />
          <Block size={[w + 0.08, 0.025, 0.07]} position={[0, -h / 2 - 0.03, 0.02]} material={mat.pale} />
        </group>,
      );
    }
  return (
    <group position={position} rotation={rotation}>
      {panes}
    </group>
  );
}

export function Awning({ width, depth = 0.45, stripes = 8, accent, position, rotation }: At & { width: number; depth?: number; stripes?: number; accent: string }) {
  const sw = width / stripes;
  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: stripes }, (_, i) => {
        const m = i % 2 ? tint(IVORY, 0.25) : tint(accent, 0.55);
        const x = (i - (stripes - 1) / 2) * sw;
        return (
          <group key={i} position={[x, 0, 0]}>
            <Block size={[sw, 0.025, depth * 1.12]} position={[0, -depth * 0.24, depth / 2]} rotation={[0.48, 0, 0]} material={m} />
            <Block size={[sw, 0.09, 0.02]} position={[0, -depth * 0.5 - 0.03, depth]} material={m} />
          </group>
        );
      })}
    </group>
  );
}

export function Sign({ size, accent, position, rotation }: At & { size: [number, number]; accent: string }) {
  const [w, h] = size;
  return (
    <group position={position} rotation={rotation}>
      <Block size={[w + 0.08, h + 0.08, 0.05]} material={mat.light} />
      <Block size={[w, h * 0.42, 0.03]} position={[0, h * 0.14, 0.03]} material={glow(accent, 1.9)} />
      <Block size={[w * 0.6, h * 0.16, 0.03]} position={[-w * 0.2, -h * 0.3, 0.03]} material={glow(IVORY, 1.2)} />
    </group>
  );
}

export function Door({ size = [0.42, 0.85], accent, position, rotation }: At & { size?: [number, number]; accent: string }) {
  const [w, h] = size;
  return (
    <group position={position} rotation={rotation}>
      <Block size={[w + 0.1, h + 0.08, 0.07]} position={[0, h / 2 + 0.02, 0]} material={mat.light} />
      <Block size={[w, h, 0.03]} position={[0, h / 2, 0.03]} material={glow(WARM, 0.95)} />
      <Block size={[w, 0.03, 0.04]} position={[0, h * 0.62, 0.04]} material={mat.light} />
      <Block size={[0.03, 0.16, 0.03]} position={[w * 0.32, h * 0.45, 0.06]} material={glow(accent, 1.8)} />
      <Block size={[w + 0.2, 0.04, 0.22]} position={[0, 0.02, 0.12]} material={mat.pale} />
    </group>
  );
}

export function Table({ r = 0.17, position }: { r?: number; position?: V3 }) {
  return (
    <group position={position}>
      <Cyl r={r} h={0.025} position={[0, 0.3, 0]} material={mat.pale} />
      <Cyl r={0.02} h={0.3} position={[0, 0.15, 0]} />
      <Cyl r={r * 0.55} h={0.02} position={[0, 0.01, 0]} />
      <Orb r={0.024} position={[0, 0.34, 0]} material={glow(WARM, 2.2)} />
    </group>
  );
}

export function Chair({ position, rotation }: At) {
  return (
    <group position={position} rotation={rotation}>
      <Block size={[0.13, 0.025, 0.13]} position={[0, 0.17, 0]} material={mat.pale} />
      <Block size={[0.13, 0.17, 0.02]} position={[0, 0.27, -0.06]} material={mat.light} />
      <Block size={[0.1, 0.16, 0.1]} position={[0, 0.08, 0]} />
    </group>
  );
}

export function Plant({ scale = 1, position }: { scale?: number; position?: V3 }) {
  return (
    <group position={position} scale={scale}>
      <Cyl r={0.05} r2={0.075} h={0.11} seg={10} position={[0, 0.055, 0]} material={mat.light} />
      {[[0, 0.2, 0, 0.1], [0.06, 0.14, 0.03, 0.07], [-0.05, 0.15, -0.04, 0.075], [0.01, 0.29, -0.01, 0.065]].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} material={mat.leaf}>
          <icosahedronGeometry args={[r, 0]} />
        </mesh>
      ))}
    </group>
  );
}

export function Planter({ length, position, rotation }: At & { length: number }) {
  const n = Math.max(2, Math.round(length / 0.14));
  return (
    <group position={position} rotation={rotation}>
      <Block size={[length, 0.1, 0.15]} position={[0, 0.05, 0]} material={mat.light} />
      {Array.from({ length: n }, (_, i) => (
        <mesh key={i} position={[(i - (n - 1) / 2) * (length / n), 0.13 + rnd(i) * 0.05, (rnd(i + 9) - 0.5) * 0.05]} material={mat.leaf}>
          <icosahedronGeometry args={[0.055 + rnd(i + 3) * 0.03, 0]} />
        </mesh>
      ))}
    </group>
  );
}

export function Lamp({ kind = "hang", length = 0.3, accent = WARM, position }: { kind?: "hang" | "post"; length?: number; accent?: string; position?: V3 }) {
  if (kind === "post")
    return (
      <group position={position}>
        <Cyl r={0.02} h={length} position={[0, length / 2, 0]} material={mat.light} />
        <Cyl r={0.05} h={0.03} position={[0, 0.015, 0]} />
        <Orb r={0.06} position={[0, length + 0.05, 0]} material={glow(accent, 2)} />
      </group>
    );
  return (
    <group position={position}>
      <Cyl r={0.006} h={length} position={[0, -length / 2, 0]} material={mat.pale} />
      <Cyl r={0.07} r2={0.015} h={0.06} position={[0, -length - 0.02, 0]} material={mat.light} />
      <Orb r={0.03} position={[0, -length - 0.06, 0]} material={glow(accent, 2.2)} />
    </group>
  );
}

export function Counter({ size, accent, position, rotation }: At & { size: V3; accent: string }) {
  const [w, h, d] = size;
  return (
    <group position={position} rotation={rotation}>
      <Block size={size} position={[0, h / 2, 0]} material={mat.light} />
      <Block size={[w + 0.04, 0.03, d + 0.04]} position={[0, h + 0.015, 0]} material={mat.pale} />
      <Block size={[w, 0.025, 0.01]} position={[0, h * 0.55, d / 2 + 0.006]} material={glow(accent, 1.7)} />
    </group>
  );
}

export function Shelf({ width, rows = 3, per = 5, accent, position, rotation }: At & { width: number; rows?: number; per?: number; accent: string }) {
  return (
    <group position={position} rotation={rotation}>
      <Block size={[width, rows * 0.2 + 0.06, 0.03]} position={[0, (rows * 0.2) / 2, 0]} material={mat.light} />
      {Array.from({ length: rows }, (_, r) => (
        <group key={r} position={[0, r * 0.2 + 0.04, 0.07]}>
          <Block size={[width, 0.018, 0.12]} material={mat.pale} />
          {Array.from({ length: per }, (_, i) => {
            const k = r * per + i;
            const h = 0.06 + rnd(k) * 0.07;
            return (
              <Block
                key={i}
                size={[(width / per) * 0.5, h, 0.05]}
                position={[(i - (per - 1) / 2) * (width / per), h / 2 + 0.01, 0]}
                material={rnd(k + 5) < 0.4 ? glow(accent, 1.5) : rnd(k + 8) < 0.5 ? glow(WARM, 1.3) : mat.pale}
              />
            );
          })}
        </group>
      ))}
    </group>
  );
}

export function Umbrella({ accent, position }: { accent: string; position?: V3 }) {
  return (
    <group position={position}>
      <Cyl r={0.012} h={0.78} position={[0, 0.39, 0]} material={mat.pale} />
      <Cyl r={0.4} r2={0.03} h={0.15} seg={8} position={[0, 0.78, 0]} material={tint(accent, 0.5)} />
      <Orb r={0.022} position={[0, 0.87, 0]} material={glow(IVORY, 1.6)} />
    </group>
  );
}

export function StringLights({ from, to, count = 9, sag = 0.14, r = 0.026, accent }: { from: V3; to: V3; count?: number; sag?: number; r?: number; accent: string }) {
  return (
    <group>
      {Array.from({ length: count }, (_, i) => {
        const t = (i + 0.5) / count;
        const p = from.map((a, k) => a + (to[k] - a) * t) as V3;
        p[1] -= sag * 4 * t * (1 - t);
        return <Orb key={i} r={r} position={p} material={glow(i % 3 === 1 ? accent : WARM, 2.1)} />;
      })}
    </group>
  );
}

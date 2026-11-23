"use client";

import { Awning, Block, Counter, Cyl, Door, Lamp, Orb, Pad, Plant, Planter, Room, Shelf, Sign, StringLights, WARM, Windows, glow, mat, tint } from "../parts";

const PI = Math.PI;

function Mannequin({ accent, position }: { accent: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cyl r={0.07} h={0.02} position={[0, 0.01, 0]} material={mat.pale} />
      <Cyl r={0.01} h={0.2} position={[0, 0.1, 0]} material={mat.pale} />
      <Cyl r={0.05} r2={0.085} h={0.24} position={[0, 0.32, 0]} material={tint(accent, 0.7)} />
      <Cyl r={0.06} r2={0.05} h={0.14} position={[0, 0.51, 0]} material={mat.pale} />
      <Orb r={0.04} position={[0, 0.63, 0]} material={mat.pale} />
    </group>
  );
}

function Bag({ accent, position, s = 1 }: { accent: string; position: [number, number, number]; s?: number }) {
  return (
    <group position={position} scale={s}>
      <Block size={[0.14, 0.17, 0.07]} position={[0, 0.085, 0]} material={tint(accent, 0.8)} />
      <Block size={[0.07, 0.02, 0.01]} position={[0, 0.19, 0]} material={mat.pale} />
    </group>
  );
}

export function Shop({ accent }: { accent: string }) {
  return (
    <group>
      <Pad size={[4.6, 3.6]} accent={accent} />

      {/* ground floor: the shop floor behind a glass front */}
      <Room size={[3.3, 1.05, 1.9]} accent={accent} posts={4} position={[0, 0, -0.35]} />
      <Shelf width={1.3} rows={4} per={6} accent={accent} position={[-0.85, 0, -1.22]} />
      <Shelf width={1.3} rows={4} per={6} accent={accent} position={[0.85, 0, -1.22]} />
      <Shelf width={1.2} rows={3} per={5} accent={accent} position={[-1.57, 0, -0.4]} rotation={[0, PI / 2, 0]} />
      <Counter size={[0.8, 0.36, 0.28]} accent={accent} position={[1.05, 0, -0.35]} />
      <Block size={[0.14, 0.1, 0.1]} position={[1.25, 0.44, -0.35]} material={mat.pale} />
      <Block size={[0.7, 0.2, 0.4]} position={[-0.3, 0.1, -0.4]} material={mat.light} />
      <Bag accent={accent} position={[-0.5, 0.2, -0.4]} />
      <Bag accent="#FFC14D" position={[-0.3, 0.2, -0.35]} s={0.8} />
      <Bag accent="#6FA8FF" position={[-0.1, 0.2, -0.42]} />
      <Mannequin accent={accent} position={[-1.1, 0, 0.35]} />
      <Mannequin accent="#FFC14D" position={[-0.75, 0, 0.35]} />
      <Mannequin accent="#6FA8FF" position={[0.9, 0, 0.35]} />
      <Mannequin accent={accent} position={[1.25, 0, 0.35]} />
      <Lamp position={[-0.9, 1.05, -0.3]} length={0.2} />
      <Lamp position={[0, 1.05, -0.3]} length={0.2} />
      <Lamp position={[0.9, 1.05, -0.3]} length={0.2} />
      <pointLight position={[0, 0.75, -0.2]} color={WARM} intensity={2.8} distance={3} />
      <Door accent={accent} size={[0.5, 0.88]} position={[0, 0, 0.63]} />
      <Awning width={3.3} depth={0.5} stripes={11} accent={accent} position={[0, 1.02, 0.62]} />
      <Sign size={[1.5, 0.3]} accent={accent} position={[0, 1.36, 0.68]} />

      {/* second floor: stockroom and studio window */}
      <Block size={[2.6, 0.9, 1.5]} position={[-0.3, 1.59, -0.5]} edge={accent} />
      <Windows cols={4} rows={1} size={[0.32, 0.5]} gap={[0.24, 0]} lit={0.8} accent={accent} position={[-0.3, 1.6, 0.26]} />
      <Windows cols={3} rows={1} size={[0.28, 0.5]} gap={[0.2, 0]} lit={0.6} accent={accent} position={[1.01, 1.6, -0.5]} rotation={[0, PI / 2, 0]} />
      <Block size={[2.8, 0.08, 1.7]} position={[-0.3, 2.08, -0.5]} material={mat.light} edge={accent} />

      {/* blade sign on the corner */}
      <Block size={[0.06, 1.1, 0.34]} position={[-1.72, 1.6, 0.3]} material={mat.light} />
      <Block size={[0.075, 0.95, 0.22]} position={[-1.72, 1.6, 0.3]} material={glow(accent, 2)} />

      {/* terrace with parcels */}
      <Block size={[0.3, 0.26, 0.3]} position={[1.25, 1.27, -0.7]} material={tint("#FFC14D", 0.35)} />
      <Block size={[0.24, 0.2, 0.24]} position={[1.3, 1.5, -0.7]} material={tint(accent, 0.5)} />
      <Block size={[0.34, 0.2, 0.26]} position={[1.3, 1.24, -0.2]} material={tint("#6FA8FF", 0.4)} />
      <Planter length={0.9} position={[1.3, 1.14, 0.5]} />
      <Cyl r={0.012} h={0.8} position={[1.68, 1.54, 0.55]} material={mat.pale} />
      <StringLights from={[1.0, 2.0, 0.2]} to={[1.68, 1.94, 0.55]} count={6} accent={accent} />

      {/* roof: big bag sign and tank */}
      <Block size={[0.7, 0.6, 0.12]} position={[-0.6, 2.47, -0.2]} material={mat.light} edge={accent} />
      <Block size={[0.5, 0.36, 0.02]} position={[-0.6, 2.42, -0.13]} material={glow(accent, 2)} />
      <mesh position={[-0.6, 2.68, -0.13]} material={glow("#F4EFFF", 1.8)}>
        <torusGeometry args={[0.12, 0.014, 8, 24, PI]} />
      </mesh>
      <Cyl r={0.2} h={0.36} position={[0.4, 2.3, -0.9]} material={mat.light} />
      <Cyl r={0.22} r2={0.02} h={0.12} position={[0.4, 2.54, -0.9]} />

      {/* pavement */}
      <Plant position={[-0.6, 0, 0.95]} />
      <Plant position={[0.6, 0, 0.95]} />
      <Bag accent={accent} position={[0.95, 0, 1.0]} s={1.2} />
      <Bag accent="#FFC14D" position={[1.15, 0, 1.08]} />
      <Block size={[0.4, 0.5, 0.03]} position={[-1.2, 0.26, 1.1]} rotation={[-0.2, 0.3, 0]} material={mat.light} />
      <Block size={[0.3, 0.05, 0.035]} position={[-1.2, 0.36, 1.12]} rotation={[-0.2, 0.3, 0]} material={glow(accent, 1.8)} />
      <Lamp kind="post" length={1} position={[-1.95, 0, 1.3]} />
      <Lamp kind="post" length={1} position={[1.95, 0, 1.3]} />
      <Planter length={1.3} position={[1.9, 0, -0.3]} rotation={[0, PI / 2, 0]} />
    </group>
  );
}

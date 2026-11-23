"use client";

import { Block, Chair, Cyl, Door, Lamp, Orb, Pad, Plant, Planter, Room, StringLights, Table, WARM, Windows, glow, mat, tint } from "../parts";

const PI = Math.PI;

function Desk({ accent, position, rotation }: { accent: string; position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Block size={[0.6, 0.03, 0.28]} position={[0, 0.24, 0]} material={mat.pale} />
      <Block size={[0.03, 0.24, 0.24]} position={[-0.27, 0.12, 0]} />
      <Block size={[0.03, 0.24, 0.24]} position={[0.27, 0.12, 0]} />
      <Block size={[0.3, 0.19, 0.015]} position={[0, 0.39, -0.07]} material={glow(accent, 1.7)} />
      <Block size={[0.03, 0.06, 0.03]} position={[0, 0.28, -0.08]} material={mat.light} />
      <Chair position={[0, 0, 0.26]} rotation={[0, PI, 0]} />
    </group>
  );
}

export function Studio({ accent }: { accent: string }) {
  return (
    <group>
      <Pad size={[4.6, 3.6]} accent={accent} />

      {/* double-height loft */}
      <Room size={[2.2, 1.9, 1.9]} accent={accent} posts={3} position={[-0.65, 0, -0.35]} />
      <Block size={[2.1, 0.03, 0.03]} position={[-0.65, 0.95, 0.6]} material={mat.light} />
      <Desk accent={accent} position={[-1.2, 0, -0.75]} />
      <Desk accent="#6FA8FF" position={[-0.4, 0, -0.75]} />
      <Block size={[1.3, 0.75, 0.03]} position={[-0.8, 1.2, -1.24]} material={mat.light} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Block key={i} size={[0.17, 0.22, 0.01]} position={[-1.3 + (i % 3) * 0.5, 1.05 + Math.floor(i / 3) * 0.32, -1.22]} material={glow(i % 2 ? accent : i % 3 ? "#FF7A45" : "#3DD6C4", 1.4)} />
      ))}
      <group position={[0.1, 0, -0.1]} rotation={[0, -0.5, 0]}>
        <Block size={[0.03, 0.75, 0.03]} position={[-0.18, 0.37, 0]} rotation={[0.12, 0, 0]} material={mat.pale} />
        <Block size={[0.03, 0.75, 0.03]} position={[0.18, 0.37, 0]} rotation={[0.12, 0, 0]} material={mat.pale} />
        <Block size={[0.5, 0.38, 0.02]} position={[0, 0.52, 0.04]} rotation={[0.12, 0, 0]} material={glow(accent, 1.5)} />
      </group>
      <Block size={[0.7, 0.2, 0.3]} position={[-1.25, 0.1, 0.25]} material={tint(accent, 0.35)} />
      <Block size={[0.7, 0.2, 0.08]} position={[-1.25, 0.28, 0.12]} material={tint(accent, 0.35)} />
      <Lamp position={[-1.2, 1.9, -0.4]} length={0.75} />
      <Lamp position={[-0.65, 1.9, -0.1]} length={0.55} />
      <Lamp position={[-0.1, 1.9, -0.5]} length={0.9} />
      <pointLight position={[-0.65, 1.1, -0.2]} color={WARM} intensity={3} distance={3.2} />
      <Door accent={accent} position={[0.2, 0, 0.63]} />

      {/* neon ring sign */}
      <mesh position={[-0.65, 1.45, 0.66]} material={glow(accent, 2.2)}>
        <torusGeometry args={[0.24, 0.02, 10, 48]} />
      </mesh>
      <Block size={[0.26, 0.03, 0.02]} position={[-0.65, 1.45, 0.66]} rotation={[0, 0, PI / 4]} material={glow("#F4EFFF", 1.8)} />

      {/* meeting box on the right, with a deck on top */}
      <Room size={[1.5, 0.95, 1.5]} accent={accent} posts={2} position={[1.25, 0, -0.5]} />
      <Table position={[1.25, 0, -0.5]} r={0.24} />
      <Chair position={[0.9, 0, -0.5]} rotation={[0, PI / 2, 0]} />
      <Chair position={[1.6, 0, -0.5]} rotation={[0, -PI / 2, 0]} />
      <Chair position={[1.25, 0, -0.85]} />
      <Block size={[0.6, 0.36, 0.02]} position={[1.25, 0.58, -1.18]} material={glow("#6FA8FF", 1.5)} />
      <Lamp position={[1.25, 0.95, -0.5]} length={0.2} />
      <Table position={[1.3, 1.04, -0.5]} r={0.15} />
      <Chair position={[1.05, 1.04, -0.5]} rotation={[0, PI / 2, 0]} />
      <Chair position={[1.55, 1.04, -0.5]} rotation={[0, -PI / 2, 0]} />
      <Planter length={1.2} position={[1.3, 1.04, 0.2]} />
      <Cyl r={0.012} h={0.8} position={[2.0, 1.44, 0.2]} material={mat.pale} />
      <Cyl r={0.012} h={0.8} position={[2.0, 1.44, -1.2]} material={mat.pale} />
      <StringLights from={[0.5, 1.9, 0.2]} to={[2.0, 1.84, 0.2]} count={9} accent={accent} />
      <StringLights from={[2.0, 1.84, 0.2]} to={[2.0, 1.84, -1.2]} count={8} accent={accent} />

      {/* roof: skylights, dish, side windows */}
      {[-1.2, -0.65, -0.1].map((x) => (
        <Block key={x} size={[0.36, 0.05, 1.1]} position={[x, 2.03, -0.35]} rotation={[0, 0, 0.2]} material={glow(WARM, 1.1)} />
      ))}
      <Cyl r={0.015} h={0.7} position={[-1.5, 2.34, -1.1]} material={mat.pale} />
      <Orb r={0.045} position={[-1.5, 2.72, -1.1]} material={glow(accent, 2.4)} />
      <Windows cols={3} rows={2} size={[0.3, 0.5]} gap={[0.22, 0.3]} lit={0.75} accent={accent} position={[-1.76, 1.0, -0.35]} rotation={[0, -PI / 2, 0]} />

      {/* pavement */}
      <Plant position={[-1.5, 0, 0.9]} />
      <Plant position={[0.55, 0, 0.9]} />
      <Planter length={1.2} position={[1.3, 0, 0.55]} />
      <Lamp kind="post" length={1} position={[-1.95, 0, 1.3]} />
      <Lamp kind="post" length={1} position={[1.95, 0, 1.3]} />
      <group position={[-0.6, 0, 1.15]}>
        <Cyl r={0.13} h={0.02} seg={24} position={[-0.2, 0.14, 0]} rotation={[PI / 2, 0, 0]} material={mat.pale} />
        <Cyl r={0.13} h={0.02} seg={24} position={[0.2, 0.14, 0]} rotation={[PI / 2, 0, 0]} material={mat.pale} />
        <Block size={[0.42, 0.025, 0.025]} position={[0, 0.24, 0]} material={glow(accent, 1.6)} />
        <Block size={[0.025, 0.14, 0.025]} position={[0.12, 0.3, 0]} material={mat.pale} />
      </group>
    </group>
  );
}

"use client";

import { Block, Chair, Cyl, Door, Lamp, Orb, Pad, Plant, Planter, Sign, StringLights, Table, WARM, Windows, glow, mat } from "../parts";

const PI = Math.PI;

export function Other({ accent }: { accent: string }) {
  return (
    <group>
      <Pad size={[4.4, 3.6]} accent={accent} />

      {/* ground floor: glass lobby */}
      <Block size={[2.7, 0.95, 0.1]} position={[0, 0.475, -1.25]} edge={accent} />
      <Block size={[0.1, 0.95, 1.9]} position={[-1.3, 0.475, -0.3]} edge={accent} />
      <Block size={[0.1, 0.95, 1.9]} position={[1.3, 0.475, -0.3]} edge={accent} />
      {[-1.3, -0.45, 0.45, 1.3].map((x) => (
        <Block key={x} size={[0.12, 0.95, 0.12]} position={[x, 0.475, 0.65]} material={mat.light} />
      ))}
      <Block size={[2.6, 0.95, 0.02]} position={[0, 0.475, 0.65]} material={mat.glass} />
      <Block size={[2.5, 0.02, 1.8]} position={[0, 0.011, -0.3]} material={mat.dark} />
      <Door accent={accent} position={[0, 0, 0.68]} />
      <Block size={[0.9, 0.36, 0.3]} position={[-0.75, 0.18, -0.6]} material={mat.light} />
      <Block size={[0.9, 0.025, 0.01]} position={[-0.75, 0.22, -0.444]} material={glow(accent, 1.7)} />
      <Lamp position={[-0.75, 0.95, -0.2]} length={0.25} />
      <Lamp position={[0.75, 0.95, -0.2]} length={0.25} />
      <Table position={[0.8, 0, -0.4]} />
      <Chair position={[0.53, 0, -0.4]} rotation={[0, PI / 2, 0]} />
      <Chair position={[1.07, 0, -0.4]} rotation={[0, -PI / 2, 0]} />
      <pointLight position={[0, 0.7, -0.2]} color={WARM} intensity={2.2} distance={2.6} />
      <Sign size={[0.9, 0.22]} accent={accent} position={[0, 1.02, 0.74]} />

      {/* second floor, pushed right */}
      <Block size={[2.9, 0.09, 2.2]} position={[0.1, 1.0, -0.3]} material={mat.light} edge={accent} />
      <Block size={[2.3, 0.85, 1.7]} position={[0.35, 1.47, -0.4]} edge={accent} />
      <Windows cols={4} rows={1} size={[0.3, 0.5]} gap={[0.22, 0]} lit={0.8} accent={accent} position={[0.35, 1.5, 0.46]} />
      <Windows cols={3} rows={1} size={[0.3, 0.5]} gap={[0.22, 0]} lit={0.7} accent={accent} position={[1.51, 1.5, -0.4]} rotation={[0, PI / 2, 0]} />
      <Planter length={0.9} position={[-1.05, 1.045, 0.55]} />
      <Planter length={1.2} position={[-1.2, 1.045, -0.3]} rotation={[0, PI / 2, 0]} />

      {/* third floor, pushed left */}
      <Block size={[2.5, 0.09, 1.9]} position={[0.3, 1.94, -0.4]} material={mat.light} edge={accent} />
      <Block size={[1.6, 0.8, 1.4]} position={[-0.15, 2.38, -0.5]} edge={accent} />
      <Windows cols={3} rows={1} size={[0.28, 0.46]} gap={[0.2, 0]} lit={0.9} accent={accent} position={[-0.15, 2.4, 0.21]} />
      <Windows cols={2} rows={1} size={[0.28, 0.46]} gap={[0.3, 0]} lit={0.6} accent={accent} position={[0.66, 2.4, -0.5]} rotation={[0, PI / 2, 0]} />
      <Block size={[0.07, 0.7, 0.26]} position={[-1.02, 2.4, 0.2]} material={mat.light} />
      <Block size={[0.085, 0.58, 0.17]} position={[-1.02, 2.4, 0.2]} material={glow(accent, 1.9)} />

      {/* roof terrace */}
      <Table position={[1.1, 1.985, -0.2]} r={0.14} />
      <Chair position={[0.86, 1.985, -0.2]} rotation={[0, PI / 2, 0]} />
      <Chair position={[1.34, 1.985, -0.2]} rotation={[0, -PI / 2, 0]} />
      <Planter length={0.8} position={[1.1, 1.985, 0.42]} />
      <Cyl r={0.012} h={0.75} position={[1.5, 2.36, 0.5]} material={mat.pale} />
      <StringLights from={[0.66, 2.7, 0.2]} to={[1.5, 2.72, 0.5]} count={7} accent={accent} />
      <StringLights from={[1.5, 2.72, 0.5]} to={[1.5, 2.72, -1.2]} count={10} accent={accent} />
      <Cyl r={0.012} h={0.75} position={[1.5, 2.36, -1.2]} material={mat.pale} />

      {/* top */}
      <Block size={[1.7, 0.08, 1.5]} position={[-0.15, 2.82, -0.5]} material={mat.light} edge={accent} />
      <Block size={[0.5, 0.3, 0.4]} position={[-0.5, 3.01, -0.8]} material={mat.light} />
      <Block size={[0.3, 0.03, 0.01]} position={[-0.5, 3.03, -0.595]} material={glow("#6FA8FF", 1.6)} />
      <Cyl r={0.015} h={0.9} position={[0.3, 3.31, -0.6]} material={mat.pale} />
      <Orb r={0.045} position={[0.3, 3.78, -0.6]} material={glow(accent, 2.4)} />
      <Planter length={0.9} position={[-0.15, 2.86, 0.1]} />

      {/* pavement */}
      <Plant position={[-0.55, 0, 0.9]} />
      <Plant position={[0.55, 0, 0.9]} />
      <Lamp kind="post" length={1.0} position={[-1.7, 0, 1.3]} />
      <Lamp kind="post" length={1.0} position={[1.7, 0, 1.3]} />
      <Planter length={1.4} position={[1.85, 0, -0.3]} rotation={[0, PI / 2, 0]} />
      <group position={[-1.75, 0, 0.2]} rotation={[0, PI / 2, 0]}>
        <Block size={[0.7, 0.04, 0.16]} position={[0, 0.16, 0]} material={mat.pale} />
        <Block size={[0.04, 0.16, 0.14]} position={[-0.28, 0.08, 0]} />
        <Block size={[0.04, 0.16, 0.14]} position={[0.28, 0.08, 0]} />
      </group>
    </group>
  );
}

"use client";

import { Awning, Block, Chair, Counter, Cyl, Door, IVORY, Island, Lamp, Planter, Plant, Shelf, Sign, StringLights, Table, Umbrella, WARM, Windows, glow, mat, tint, type V3 } from "../parts";

const PI = Math.PI;
const inside: V3[] = [[-1.05, 0, -0.15], [-0.25, 0, -0.1], [-0.05, 0, -0.85]];
const terrace: V3[] = [[1.05, 0.05, -0.95], [1.75, 0.05, -0.95], [1.05, 0.05, -0.05], [1.75, 0.05, -0.05]];

function Seating({ at }: { at: V3 }) {
  const [x, y, z] = at;
  return (
    <group>
      <Table position={at} />
      <Chair position={[x - 0.27, y, z]} rotation={[0, PI / 2, 0]} />
      <Chair position={[x + 0.27, y, z]} rotation={[0, -PI / 2, 0]} />
    </group>
  );
}

export function Restaurant({ accent }: { accent: string }) {
  return (
    <group>
      <Island size={[4.4, 3.4]} accent={accent} />

      {/* ground floor */}
      <Block size={[2.5, 1.15, 0.1]} position={[-0.75, 0.575, -1.35]} edge={accent} />
      <Block size={[0.1, 1.15, 1.8]} position={[-1.95, 0.575, -0.5]} edge={accent} />
      {([[-1.94, 0.34], [0.44, 0.34], [0.44, -1.34], [-1.2, 0.34]] as const).map(([x, z]) => (
        <Block key={`${x}${z}`} size={[0.12, 1.15, 0.12]} position={[x, 0.575, z]} material={mat.light} />
      ))}
      <Block size={[1.55, 0.26, 0.08]} position={[-0.38, 0.13, 0.36]} material={mat.light} />
      <Block size={[0.08, 0.26, 1.6]} position={[0.46, 0.13, -0.5]} material={mat.light} />
      <Block size={[1.55, 0.84, 0.02]} position={[-0.38, 0.68, 0.36]} material={mat.glass} />
      <Block size={[0.02, 0.84, 1.6]} position={[0.46, 0.68, -0.5]} material={mat.glass} />
      {[-0.9, -0.38, 0.14].map((x) => (
        <Block key={x} size={[0.03, 0.84, 0.04]} position={[x, 0.68, 0.37]} material={mat.pale} />
      ))}
      {[-1.0, -0.5, 0.0].map((z) => (
        <Block key={z} size={[0.04, 0.84, 0.03]} position={[0.47, 0.68, z]} material={mat.pale} />
      ))}
      <Block size={[2.4, 0.02, 1.7]} position={[-0.75, 0.011, -0.5]} material={tint("#3A2E7A", 0.35)} />
      <Door accent={accent} position={[-1.57, 0, 0.36]} />
      <pointLight position={[-0.7, 0.85, -0.5]} color={WARM} intensity={2.4} distance={2.6} />

      {/* inside */}
      {inside.map((p) => (
        <group key={p.join()}>
          <Seating at={p} />
          <Lamp position={[p[0], 1.15, p[2]]} length={0.32} />
        </group>
      ))}
      <Counter size={[1.15, 0.42, 0.26]} accent={accent} position={[-1.25, 0, -0.95]} />
      <Shelf width={1.15} accent={accent} position={[-1.25, 0.42, -1.28]} />
      {[-1.6, -1.3, -1.0].map((x) => (
        <Cyl key={x} r={0.05} h={0.2} position={[x, 0.1, -0.7]} material={mat.pale} />
      ))}

      {/* cornice, awnings and signs */}
      <Block size={[2.72, 0.1, 2.02]} position={[-0.75, 1.2, -0.5]} material={mat.light} edge={accent} />
      <Awning width={1.7} accent={accent} position={[-0.36, 1.14, 0.42]} />
      <Awning width={1.7} stripes={8} accent={accent} position={[0.52, 1.14, -0.5]} rotation={[0, PI / 2, 0]} />
      <Sign size={[0.62, 0.2]} accent={accent} position={[-1.57, 1.04, 0.44]} />
      <Block size={[0.06, 0.62, 0.3]} position={[0.62, 1.78, 0.52]} material={mat.light} />
      <Block size={[0.075, 0.5, 0.2]} position={[0.62, 1.78, 0.52]} material={glow(accent, 1.9)} />
      <Block size={[0.1, 0.03, 0.03]} position={[0.55, 2.0, 0.45]} material={mat.pale} />

      {/* upper floor */}
      <Block size={[2.5, 0.95, 1.8]} position={[-0.75, 1.725, -0.5]} edge={accent} />
      <Windows cols={4} rows={1} size={[0.32, 0.56]} gap={[0.26, 0]} lit={0.8} accent={accent} position={[-0.75, 1.76, 0.41]} />
      <Windows cols={3} rows={1} size={[0.32, 0.56]} gap={[0.24, 0]} lit={0.7} accent={accent} position={[0.51, 1.76, -0.62]} rotation={[0, PI / 2, 0]} />
      {[-1.62, -1.04, -0.46, 0.12].map((x) => (
        <Planter key={x} length={0.36} position={[x, 1.33, 0.47]} />
      ))}

      {/* roof */}
      <Block size={[2.62, 0.08, 1.92]} position={[-0.75, 2.24, -0.5]} material={mat.light} edge={accent} />
      <Block size={[2.62, 0.12, 0.05]} position={[-0.75, 2.34, 0.435]} />
      <Block size={[2.62, 0.12, 0.05]} position={[-0.75, 2.34, -1.435]} />
      <Block size={[0.05, 0.12, 1.92]} position={[-2.035, 2.34, -0.5]} />
      <Block size={[0.05, 0.12, 1.92]} position={[0.535, 2.34, -0.5]} />
      <Block size={[0.3, 0.6, 0.3]} position={[-1.62, 2.58, -1.05]} edge={accent} />
      <Block size={[0.38, 0.05, 0.38]} position={[-1.62, 2.9, -1.05]} material={mat.light} />
      <Block size={[0.2, 0.02, 0.2]} position={[-1.62, 2.93, -1.05]} material={glow(accent, 1.5)} />
      {[-0.95, -0.6, -0.25].map((z) => (
        <Planter key={z} length={0.95} position={[-0.15, 2.28, z]} />
      ))}
      <Block size={[0.5, 0.4, 0.42]} position={[-1.1, 2.48, -0.95]} material={mat.light} />
      <Block size={[0.2, 0.3, 0.02]} position={[-1.1, 2.43, -0.735]} material={glow(WARM, 1)} />
      <Table position={[-1.25, 2.28, 0]} r={0.14} />
      <Chair position={[-1.5, 2.28, 0]} rotation={[0, PI / 2, 0]} />
      <Chair position={[-1.0, 2.28, 0]} rotation={[0, -PI / 2, 0]} />
      <Cyl r={0.012} h={0.5} position={[-1.98, 2.59, 0.38]} material={mat.pale} />
      <Cyl r={0.012} h={0.5} position={[0.48, 2.59, 0.38]} material={mat.pale} />
      <StringLights from={[-1.98, 2.84, 0.38]} to={[0.48, 2.84, 0.38]} count={13} accent={accent} />

      {/* terrace */}
      <Block size={[1.55, 0.05, 2.3]} position={[1.38, 0.025, -0.5]} material={mat.light} edge={accent} />
      {terrace.map((p) => (
        <Seating key={p.join()} at={p} />
      ))}
      <Umbrella accent={accent} position={[1.4, 0.05, -0.95]} />
      <Cyl r={0.014} h={1.3} position={[2.1, 0.65, 0.6]} material={mat.pale} />
      <Cyl r={0.014} h={1.3} position={[2.1, 0.65, -1.6]} material={mat.pale} />
      <StringLights from={[0.56, 1.24, 0.5]} to={[2.1, 1.3, 0.6]} count={9} accent={accent} />
      <StringLights from={[2.1, 1.3, 0.6]} to={[2.1, 1.3, -1.6]} count={12} accent={accent} />
      <Planter length={1.5} position={[1.38, 0, 0.76]} />
      <Planter length={0.7} position={[2.1, 0, -0.9]} rotation={[0, PI / 2, 0]} />
      <Planter length={0.7} position={[2.1, 0, 0.0]} rotation={[0, PI / 2, 0]} />

      {/* pavement */}
      <Plant position={[-1.9, 0, 0.62]} />
      <Plant position={[-1.2, 0, 0.62]} scale={0.8} />
      <Lamp kind="post" length={1.0} position={[-1.95, 0, 1.4]} />
      <Lamp kind="post" length={1.0} position={[0.35, 0, 1.4]} />
      <group position={[-0.95, 0, 1.0]} rotation={[0, 0.3, 0]}>
        <Block size={[0.24, 0.36, 0.02]} position={[0, 0.18, 0.05]} rotation={[-0.25, 0, 0]} material={mat.light} />
        <Block size={[0.24, 0.36, 0.02]} position={[0, 0.18, -0.05]} rotation={[0.25, 0, 0]} material={mat.light} />
        <Block size={[0.16, 0.03, 0.01]} position={[0, 0.26, 0.085]} rotation={[-0.25, 0, 0]} material={glow(accent, 1.8)} />
        <Block size={[0.12, 0.02, 0.01]} position={[0, 0.2, 0.1]} rotation={[-0.25, 0, 0]} material={glow(IVORY, 1.2)} />
        <Block size={[0.14, 0.02, 0.01]} position={[0, 0.15, 0.113]} rotation={[-0.25, 0, 0]} material={glow(IVORY, 1.2)} />
      </group>
      <group position={[-0.2, 0, 1.15]}>
        <Block size={[0.6, 0.04, 0.16]} position={[0, 0.16, 0]} material={mat.pale} />
        <Block size={[0.04, 0.16, 0.14]} position={[-0.24, 0.08, 0]} />
        <Block size={[0.04, 0.16, 0.14]} position={[0.24, 0.08, 0]} />
      </group>
    </group>
  );
}

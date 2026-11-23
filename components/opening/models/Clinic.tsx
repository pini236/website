"use client";

import { Block, Chair, Counter, Cyl, Door, Lamp, Orb, Pad, Plant, Planter, Room, WARM, Windows, glow, mat } from "../parts";

const PI = Math.PI;

function Cross({ s, accent, position, rotation }: { s: number; accent: string; position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Block size={[s, s * 0.32, 0.05]} material={glow(accent, 2.2)} />
      <Block size={[s * 0.32, s, 0.05]} material={glow(accent, 2.2)} />
    </group>
  );
}

function Bed({ accent, position }: { accent: string; position: [number, number, number] }) {
  return (
    <group position={position}>
      <Block size={[0.3, 0.05, 0.66]} position={[0, 0.2, 0]} material={mat.pale} />
      <Block size={[0.26, 0.05, 0.16]} position={[0, 0.25, -0.22]} material={glow("#F4EFFF", 0.9)} />
      <Block size={[0.3, 0.3, 0.03]} position={[0, 0.24, -0.33]} material={mat.light} />
      <Block size={[0.26, 0.2, 0.03]} position={[0, 0.1, 0.3]} />
      <Block size={[0.26, 0.2, 0.03]} position={[0, 0.1, -0.3]} />
      <Cyl r={0.01} h={0.6} position={[0.24, 0.3, -0.25]} material={mat.pale} />
      <Block size={[0.07, 0.1, 0.03]} position={[0.24, 0.56, -0.25]} material={glow(accent, 1.6)} />
    </group>
  );
}

export function Clinic({ accent }: { accent: string }) {
  return (
    <group>
      <Pad size={[4.6, 3.6]} accent={accent} />

      {/* ground floor: reception and waiting room */}
      <Room size={[3.4, 1, 1.9]} accent={accent} posts={4} position={[0, 0, -0.35]} />
      <Counter size={[1, 0.38, 0.3]} accent={accent} position={[-0.9, 0, -0.7]} />
      <Block size={[0.22, 0.16, 0.02]} position={[-0.9, 0.5, -0.72]} material={glow("#6FA8FF", 1.5)} />
      <Cross s={0.3} accent={accent} position={[-0.9, 0.72, -1.24]} />
      {[0.35, 0.65, 0.95, 1.25].map((x) => (
        <Chair key={x} position={[x, 0, -1.05]} />
      ))}
      <Chair position={[1.45, 0, -0.55]} rotation={[0, -PI / 2, 0]} />
      <Chair position={[1.45, 0, -0.2]} rotation={[0, -PI / 2, 0]} />
      <Block size={[0.4, 0.12, 0.26]} position={[0.8, 0.06, -0.45]} material={mat.pale} />
      <Plant position={[0.05, 0, -1.05]} scale={0.9} />
      <Lamp position={[-0.9, 1, -0.4]} length={0.22} />
      <Lamp position={[0.8, 1, -0.5]} length={0.22} />
      <pointLight position={[0, 0.7, -0.3]} color={WARM} intensity={2.4} distance={2.8} />
      <Door accent={accent} size={[0.6, 0.85]} position={[0, 0, 0.63]} />

      {/* entrance canopy with the cross */}
      <Block size={[1.3, 0.07, 0.75]} position={[0, 1.0, 0.95]} material={mat.light} edge={accent} />
      <Cyl r={0.03} h={1} position={[-0.58, 0.5, 1.26]} material={mat.pale} />
      <Cyl r={0.03} h={1} position={[0.58, 0.5, 1.26]} material={mat.pale} />
      <Block size={[1.3, 0.03, 0.02]} position={[0, 0.97, 1.33]} material={glow(accent, 2)} />
      <Cross s={0.42} accent={accent} position={[0, 1.36, 1.3]} />

      {/* second floor: treatment rooms */}
      <Room size={[2.5, 0.85, 1.6]} accent={accent} posts={3} position={[-0.45, 1.09, -0.5]} />
      <Block size={[0.06, 0.85, 1.5]} position={[-0.45, 1.515, -0.5]} material={mat.light} />
      <Bed accent={accent} position={[-1.1, 1.1, -0.55]} />
      <Bed accent={accent} position={[0.2, 1.1, -0.55]} />
      <Lamp position={[-1.1, 1.94, -0.3]} length={0.18} accent="#DFF8FF" />
      <Lamp position={[0.2, 1.94, -0.3]} length={0.18} accent="#DFF8FF" />
      <pointLight position={[-0.45, 1.6, -0.2]} color="#DFF8FF" intensity={1.6} distance={2.2} />
      <Windows cols={3} rows={1} size={[0.26, 0.42]} gap={[0.2, 0]} lit={0.7} accent={accent} position={[-1.76, 1.55, -0.5]} rotation={[0, -PI / 2, 0]} />

      {/* terrace on the right */}
      <Planter length={1} position={[1.3, 1.09, 0.5]} />
      <Planter length={1.2} position={[1.72, 1.09, -0.4]} rotation={[0, PI / 2, 0]} />
      <Block size={[0.5, 0.04, 0.16]} position={[1.25, 1.25, -0.5]} material={mat.pale} />
      <Block size={[0.04, 0.16, 0.14]} position={[1.05, 1.17, -0.5]} />
      <Block size={[0.04, 0.16, 0.14]} position={[1.45, 1.17, -0.5]} />

      {/* roof: helipad ring, beacon, big cross */}
      <Cyl r={0.5} h={0.02} seg={40} position={[-0.9, 2.04, -0.5]} material={mat.dark} />
      <mesh position={[-0.9, 2.055, -0.5]} rotation={[-PI / 2, 0, 0]} material={glow(accent, 1.8)}>
        <ringGeometry args={[0.4, 0.44, 48]} />
      </mesh>
      <Block size={[0.07, 0.01, 0.34]} position={[-1.0, 2.056, -0.5]} material={glow("#F4EFFF", 1.4)} />
      <Block size={[0.07, 0.01, 0.34]} position={[-0.8, 2.056, -0.5]} material={glow("#F4EFFF", 1.4)} />
      <Block size={[0.2, 0.01, 0.07]} position={[-0.9, 2.056, -0.5]} material={glow("#F4EFFF", 1.4)} />
      <Block size={[0.5, 0.5, 0.4]} position={[0.3, 2.28, -0.9]} material={mat.light} edge={accent} />
      <Cross s={0.34} accent={accent} position={[0.3, 2.3, -0.69]} />
      <Cyl r={0.015} h={0.5} position={[0.3, 2.78, -0.9]} material={mat.pale} />
      <Orb r={0.045} position={[0.3, 3.05, -0.9]} material={glow("#FF5470", 2.2)} />

      {/* pavement */}
      <Plant position={[-0.75, 0, 0.9]} />
      <Plant position={[0.75, 0, 0.9]} />
      <Planter length={1.1} position={[-1.3, 0, 0.75]} />
      <Planter length={1.1} position={[1.3, 0, 0.75]} />
      <Lamp kind="post" length={1} position={[-1.95, 0, 1.3]} />
      <Lamp kind="post" length={1} position={[1.95, 0, 1.3]} />
    </group>
  );
}

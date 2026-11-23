export const PARTICLE_COUNT = 60000;

export const ease = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

export const capDelta = (seconds: number) => Math.min(seconds, 0.05);

export function resample(points: Float32Array, count: number): Float32Array {
  const n = points.length / 3;
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const j = ((i * 2654435761) % n) * 3;
    out[i * 3] = points[j];
    out[i * 3 + 1] = points[j + 1];
    out[i * 3 + 2] = points[j + 2];
  }
  return out;
}

export function blend(from: Float32Array, to: Float32Array, t: number): Float32Array {
  const k = ease(t);
  const out = new Float32Array(from.length);
  for (let i = 0; i < from.length; i++) out[i] = from[i] + (to[i] - from[i]) * k;
  return out;
}

export const SWIRL_RADIUS = 2.4;

// Mirrors the vertex shader in Particles.tsx, so a morph can be retargeted from where it is now.
export function swirled(from: Float32Array, to: Float32Array, seeds: Float32Array, t: number, time: number): Float32Array {
  const p = Math.min(1, Math.max(0, t));
  const k = ease(p);
  const burst = Math.sin(Math.PI * p);
  const out = new Float32Array(from.length);
  for (let i = 0; i < from.length; i += 3) {
    const a = seeds[i] * Math.PI * 2 + time * 0.6 + burst * 3;
    const r = SWIRL_RADIUS * burst * (0.25 + 0.75 * seeds[i + 1]);
    out[i] = from[i] + (to[i] - from[i]) * k + Math.cos(a) * r;
    out[i + 1] = from[i + 1] + (to[i + 1] - from[i + 1]) * k + (seeds[i + 2] - 0.5) * 1.2 * r;
    out[i + 2] = from[i + 2] + (to[i + 2] - from[i + 2]) * k + Math.sin(a) * r;
  }
  return out;
}

export const approach = (current: number, target: number, dt: number, rate = 9) => current + (target - current) * (1 - Math.exp(-rate * dt));

export const fadeStep = (vis: number, target: number, dt: number, outTime: number) => (vis > target ? Math.max(target, vis - dt / outTime) : target);

export const STACK_BELOW = 1000;
export const rigLayout = (width: number) => (width > STACK_BELOW ? { x: 1.6, scale: 1 } : { x: 0, scale: 0.8 });

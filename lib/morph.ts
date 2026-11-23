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

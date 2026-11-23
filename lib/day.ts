import { clamp01 } from "./scroll";

export const STOPS = [7 * 60, 11 * 60 + 30, 16 * 60, 21 * 60];

// scroll progress → minutes of the day, so the acts line up with the pictures
const KEYS: [number, number][] = [
  [0, 6 * 60 + 30],
  [0.12, 7 * 60 + 30],
  [0.35, 11 * 60 + 30],
  [0.57, 16 * 60],
  [0.7, 21 * 60],
  [0.78, 23 * 60 + 4],
  [1, 23 * 60 + 30],
];

export const dayMinutes = (p: number) => {
  const i = Math.max(1, KEYS.findIndex(([at]) => p <= at));
  const [p0, m0] = KEYS[i - 1];
  const [p1, m1] = KEYS[i];
  return m0 + (m1 - m0) * clamp01((p - p0) / (p1 - p0));
};

export const weights = (minutes: number) =>
  STOPS.map((stop, i) => {
    const before = STOPS[i - 1];
    const after = STOPS[i + 1];
    if (minutes <= stop) return before === undefined ? 1 : clamp01((minutes - before) / (stop - before));
    return after === undefined ? 1 : clamp01((after - minutes) / (after - stop));
  });

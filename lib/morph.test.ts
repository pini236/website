import { expect, test } from "vitest";
import { SWIRL_RADIUS, approach, blend, capDelta, ease, fadeStep, rigLayout, resample, swirled } from "./morph";

test("resample returns the asked count using only source points", () => {
  const src = new Float32Array([0, 0, 0, 1, 1, 1, 2, 2, 2]);
  const out = resample(src, 10);
  expect(out.length).toBe(30);
  for (let i = 0; i < 10; i++) expect([0, 1, 2]).toContain(out[i * 3]);
  expect(resample(src, 10)).toEqual(out);
});

test("blend starts at from, ends at to, and is halfway in the middle", () => {
  const a = new Float32Array([0, 0, 0]);
  const b = new Float32Array([2, 4, 6]);
  expect(Array.from(blend(a, b, 0))).toEqual([0, 0, 0]);
  expect(Array.from(blend(a, b, 1))).toEqual([2, 4, 6]);
  expect(Array.from(blend(a, b, 0.5))).toEqual([1, 2, 3]);
});

test("easing and frame delta stay in range", () => {
  expect(ease(-1)).toBe(0);
  expect(ease(2)).toBe(1);
  expect(capDelta(3)).toBe(0.05);
});

test("swirled starts at from, ends at to, and strays no further than the swirl radius", () => {
  const a = new Float32Array([0, 0, 0, 1, 1, 1]);
  const b = new Float32Array([2, 4, 6, 3, 3, 3]);
  const seeds = new Float32Array([0.2, 1, 0.9, 0.7, 0.5, 0.1]);
  expect(Array.from(swirled(a, b, seeds, 0, 5))).toEqual(Array.from(a));
  const end = swirled(a, b, seeds, 1, 5);
  for (let i = 0; i < 6; i++) expect(end[i]).toBeCloseTo(b[i], 5);
  const mid = swirled(a, b, seeds, 0.5, 5);
  const line = blend(a, b, 0.5);
  const stray = Math.hypot(mid[0] - line[0], mid[1] - line[1], mid[2] - line[2]);
  expect(stray).toBeGreaterThan(1);
  expect(stray).toBeLessThanOrEqual(SWIRL_RADIUS * 1.2);
});

test("a retarget mid-morph dims the cloud and shrinks the old model gradually, never in one frame", () => {
  const frame = 1 / 60;
  expect(approach(0.42, 0.1, frame)).toBeGreaterThan(0.35);
  expect(approach(0.42, 0.1, 2)).toBeCloseTo(0.1, 3);
  expect(fadeStep(0.8, 0, frame, 0.55)).toBeGreaterThan(0.75);
  expect(fadeStep(0.8, 0, 1, 0.55)).toBe(0);
  expect(fadeStep(0.2, 0.6, frame, 0.55)).toBe(0.6);
});

test("the model is centred until the screen is wide enough to sit beside the copy", () => {
  expect(rigLayout(390)).toEqual({ x: 0, scale: 0.8 });
  expect(rigLayout(768)).toEqual({ x: 0, scale: 0.8 });
  expect(rigLayout(1440)).toEqual({ x: 1.6, scale: 1 });
});

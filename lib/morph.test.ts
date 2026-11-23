import { expect, test } from "vitest";
import { blend, capDelta, ease, resample } from "./morph";

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

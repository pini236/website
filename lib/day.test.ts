import { expect, test } from "vitest";
import { dayMinutes, STOPS, weights } from "./day";

test("the clock only moves forward as you scroll, from morning to the night message", () => {
  const samples = [0, 0.2, 0.5, 0.7, 0.78, 1].map(dayMinutes);
  expect(samples).toEqual([...samples].sort((a, b) => a - b));
  expect(dayMinutes(0.35)).toBe(STOPS[1]);
});

test("each stop of the day shows only its own picture, and the pictures blend in between", () => {
  expect(weights(STOPS[0])).toEqual([1, 0, 0, 0]);
  expect(weights(23 * 60)).toEqual([0, 0, 0, 1]);
  const mid = weights((STOPS[1] + STOPS[2]) / 2);
  expect(mid[1]).toBeCloseTo(0.5);
  expect(mid[2]).toBeCloseTo(0.5);
});

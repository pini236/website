import { expect, test } from "vitest";
import { DAY_END, DAY_START, STOPS, moment, weights } from "./day";

test("each stop of the day shows only its own picture, and the pictures blend in between", () => {
  expect(weights(STOPS[0])).toEqual([1, 0, 0, 0]);
  expect(weights(STOPS[3])).toEqual([0, 0, 0, 1]);
  const mid = weights((STOPS[1] + STOPS[2]) / 2);
  expect(mid[1]).toBeCloseTo(0.5);
  expect(mid[2]).toBeCloseTo(0.5);
  expect(weights(DAY_START)).toEqual([1, 0, 0, 0]);
  expect(weights(DAY_END)).toEqual([0, 0, 0, 1]);
});

test("the caption belongs to the last stop the clock has passed", () => {
  expect(moment(DAY_START)).toBe(0);
  expect(moment(STOPS[1] - 1)).toBe(0);
  expect(moment(STOPS[1])).toBe(1);
  expect(moment(DAY_END)).toBe(3);
});

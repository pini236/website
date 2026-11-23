import { expect, test } from "vitest";
import { clock, sceneProgress, span } from "./scroll";

test("a pinned scene plays from 0 to 1 while it is stuck to the screen", () => {
  expect(sceneProgress(-200, 3000, 1000)).toBe(0);
  expect(sceneProgress(1000, 3000, 1000)).toBe(0.5);
  expect(sceneProgress(5000, 3000, 1000)).toBe(1);
  expect(span(0.5, 0.4, 0.6)).toBeCloseTo(0.5);
});

test("the clock runs past midnight and back", () => {
  expect(clock(23 * 60 + 47)).toBe("23:47");
  expect(clock(-1)).toBe("23:59");
});

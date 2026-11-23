import { expect, test } from "vitest";
import { SCENES, clock, daylight, locate, sceneProgress, span } from "./scroll";

test("a pinned scene plays from 0 to 1 while it is stuck to the screen", () => {
  expect(sceneProgress(-200, 3000, 1000)).toBe(0);
  expect(sceneProgress(1000, 3000, 1000)).toBe(0.5);
  expect(sceneProgress(5000, 3000, 1000)).toBe(1);
  expect(span(0.5, 0.4, 0.6)).toBeCloseTo(0.5);
});

test("the clock runs past midnight and back", () => {
  expect(clock(23 * 60 + 47)).toBe("23:47");
  expect(clock(23 * 60 + 47 + 445)).toBe("07:12");
  expect(clock(-1)).toBe("23:59");
});

test("the story hands over from scene to scene without a jump in the sky", () => {
  expect(locate(0)).toEqual({ index: 0, p: 0 });
  expect(locate(1)).toEqual({ index: SCENES.length - 1, p: 1 });
  const mid = locate((SCENES[0].len + SCENES[1].len / 2) / SCENES.reduce((n, s) => n + s.len, 0));
  expect(mid.index).toBe(1);
  expect(mid.p).toBeCloseTo(0.5);
  expect(daylight(0, 1)).toBeCloseTo(daylight(1, 0));
  expect(daylight(1, 1)).toBe(0);
  expect(daylight(3, 1)).toBe(daylight(4, 0));
  expect(daylight(4, 1)).toBe(1);
});

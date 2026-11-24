import { expect, test } from "vitest";
import { SCENES, daylight, locate } from "./night";
import { STORY } from "./story";

test("scroll walks through every scene in order and the night ends in daylight", () => {
  expect(locate(0).index).toBe(0);
  expect(locate(1)).toEqual({ index: SCENES.length - 1, p: 1 });
  expect(daylight(4, 1)).toBe(1);
});

test("both languages tell the same night", () => {
  for (const lang of ["en", "he"] as const) {
    const { story, c } = STORY[lang];
    expect(story.steps).toHaveLength(4);
    expect(story.morning).toHaveLength(4);
    expect(c.chapters).toHaveLength(SCENES.length);
  }
});

import { expect, test } from "vitest";
import { STORIES, STORY_ORDER } from "./story";

test("every business has a whole night to tell", () => {
  expect(STORY_ORDER).toEqual(["restaurant", "clinic", "shop", "studio"]);
  for (const id of STORY_ORDER) {
    const s = STORIES[id];
    expect(s.accent).toMatch(/^#[0-9A-F]{6}$/);
    expect(s.steps).toHaveLength(4);
    expect(s.morning).toHaveLength(3);
    expect(s.site.links).toHaveLength(3);
    for (const line of [s.name, s.ask, s.gone, s.lost, s.reply, s.confirm, s.done, s.site.headline]) expect(line.length).toBeGreaterThan(5);
  }
});

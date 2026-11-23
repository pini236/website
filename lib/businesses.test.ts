import { expect, test } from "vitest";
import { BUSINESSES, BUSINESS_ORDER, DEFAULT_BUSINESS } from "./businesses";

test("every business in the picker has its accent and copy", () => {
  expect(BUSINESS_ORDER).toEqual(["restaurant", "clinic", "shop", "studio", "other"]);
  expect(BUSINESS_ORDER.map((id) => BUSINESSES[id].accent)).toEqual(["#FF7A45", "#3DD6C4", "#FF4F9A", "#8C7BFF", "#FFC14D"]);
  for (const id of BUSINESS_ORDER) expect(BUSINESSES[id].lead.length).toBeGreaterThan(20);
  expect(DEFAULT_BUSINESS).toBe("other");
});

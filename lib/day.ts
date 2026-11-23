import { clamp01 } from "./scroll";

export const STOPS = [7 * 60, 11 * 60 + 30, 16 * 60, 21 * 60];
export const DAY_START = 6 * 60;
export const DAY_END = 22 * 60;

export const weights = (minutes: number) =>
  STOPS.map((stop, i) => {
    const before = STOPS[i - 1];
    const after = STOPS[i + 1];
    if (minutes <= stop) return before === undefined ? 1 : clamp01((minutes - before) / (stop - before));
    return after === undefined ? 1 : clamp01((after - minutes) / (after - stop));
  });

export const moment = (minutes: number) => Math.max(0, STOPS.findLastIndex((stop) => minutes >= stop));

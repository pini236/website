import { clamp01, ease, span } from "./scroll";

export const SCENES = [
  { id: "night", len: 4.4 },
  { id: "rewind", len: 1.6 },
  { id: "brain", len: 3.8 },
  { id: "face", len: 3.8 },
  { id: "morning", len: 2.4 },
] as const;

export const STORY_LENGTH = SCENES.reduce((n, s) => n + s.len, 0);

export const locate = (progress: number) => {
  let left = clamp01(progress) * STORY_LENGTH;
  for (let index = 0; index < SCENES.length; index++) {
    const len = SCENES[index].len;
    if (left <= len || index === SCENES.length - 1) return { index, p: clamp01(left / len) };
    left -= len;
  }
  return { index: 0, p: 0 };
};

const DUSK = 0.7;

// 0 is deep night, 1 is morning. The first night runs to dawn, the rewind takes it back.
export const daylight = (index: number, p: number) =>
  [DUSK * ease(span(p, 0.45, 0.75)), DUSK * (1 - ease(span(p, 0.05, 0.6))), 0, 0, ease(span(p, 0, 0.55))][index] ?? 0;

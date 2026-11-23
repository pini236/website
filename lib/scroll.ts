export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export const ease = (t: number) => {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
};

export const span = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

// How far a pinned scene has played: 0 when its top reaches the top of the screen, 1 when its bottom reaches the bottom.
export const sceneProgress = (scrolled: number, height: number, viewport: number) => clamp01(scrolled / Math.max(1, height - viewport));

export const clock = (minutes: number) => {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export const SCENES = [
  { id: "night", len: 4.4, label: "The night" },
  { id: "rewind", len: 1.6, label: "Again" },
  { id: "brain", len: 3.8, label: "The brain" },
  { id: "face", len: 3.8, label: "The face" },
  { id: "morning", len: 2.4, label: "Morning" },
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

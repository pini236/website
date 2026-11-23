export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

// How far a pinned scene has played: 0 when its top reaches the top of the screen, 1 when its bottom reaches the bottom.
export const sceneProgress = (scrolled: number, height: number, viewport: number) => clamp01(scrolled / Math.max(1, height - viewport));

export const span = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

export const clock = (minutes: number) => {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

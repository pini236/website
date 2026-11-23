"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SCENES, STORY_LENGTH, clock, daylight, ease, locate, sceneProgress, span } from "@/lib/scroll";
import { DEFAULT_STORY, STORIES, type StoryId } from "@/lib/story";
import { Brain, Face, Morning, Night, Rewind } from "./scenes";
import "./story.css";

const nums = (el: HTMLElement, key: string) => el.dataset[key]!.split(",").map(Number);

const drawStars = (canvas: HTMLCanvasElement) => {
  const dpr = Math.min(devicePixelRatio, 2);
  const w = (canvas.width = canvas.offsetWidth * dpr);
  const h = (canvas.height = canvas.offsetHeight * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 220; i++) {
    const y = rnd() ** 1.6 * h;
    ctx.globalAlpha = 0.25 + rnd() * 0.75;
    ctx.fillStyle = rnd() > 0.85 ? "#ffd9b8" : "#f4efff";
    ctx.beginPath();
    ctx.arc(rnd() * w, y, (0.4 + rnd() * 1.1) * dpr, 0, 7);
    ctx.fill();
  }
};

export function Story() {
  const [id, setId] = useState<StoryId>(DEFAULT_STORY);
  const [chapter, setChapter] = useState(0);
  const root = useRef<HTMLElement>(null);
  const stars = useRef<HTMLCanvasElement>(null);
  const stale = useRef(true);
  const s = STORIES[id];

  useEffect(() => {
    stale.current = true;
  }, [id]);

  useEffect(() => {
    const el = root.current!;
    const stage = el.firstElementChild as HTMLElement;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-scene]"));
    const live = layers.map((l) => Array.from(l.querySelectorAll<HTMLElement>("[data-clock],[data-type]")));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.setProperty("--m", still ? "0" : "1");

    const paint = () => stars.current && drawStars(stars.current);
    paint();
    addEventListener("resize", paint);

    const apply = (P: number) => {
      const at = locate(P);
      el.style.setProperty("--P", P.toFixed(4));
      el.style.setProperty("--day", daylight(at.index, at.p).toFixed(3));
      layers.forEach((layer, i) => {
        const p = i < at.index ? 1 : i > at.index ? 0 : at.p;
        layer.style.setProperty("--p", p.toFixed(4));
        layer.classList.toggle("on", i === at.index);
        if (i !== at.index) return;
        for (const node of live[i]) {
          if (node.dataset.clock) {
            const [from, to, a, b] = nums(node, "clock");
            const t = still ? Math.round(span(p, a, b)) : ease(span(p, a, b));
            const text = clock(from + (to - from) * t);
            node.classList.toggle("still", t === 0 || t === 1);
            for (let c = 0; c < 5; c++) if (node.children[c].textContent !== text[c]) node.children[c].textContent = text[c];
          } else {
            const [a, b] = nums(node, "type");
            const full = node.dataset.text!;
            const text = full.slice(0, Math.round(full.length * span(p, a, b)));
            if (node.textContent !== text) node.textContent = text;
          }
        }
      });
      setChapter(at.index);
    };

    let P = -1;
    let last = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const box = el.getBoundingClientRect();
      const target = sceneProgress(-box.top, box.height, stage.offsetHeight);
      const next = P < 0 || still ? target : P + (target - P) * (1 - Math.exp(-9 * dt));
      if (stale.current || Math.abs(next - P) > 0.00002) {
        stale.current = false;
        P = next;
        apply(P);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", paint);
    };
  }, []);

  return (
    <section ref={root} className="story" style={{ "--acc": s.accent, height: `${(STORY_LENGTH + 1) * 100}svh` } as CSSProperties}>
      <div className="stage">
        <div className="sky" aria-hidden="true">
          <canvas ref={stars} className="stars" />
          <div className="dawn" />
          <div className="glow" />
        </div>

        <Night s={s} pick={setId} />
        <Rewind />
        <Brain s={s} />
        <Face s={s} />
        <Morning s={s} />

        <nav className="hud" aria-label="Story">
          <ol>
            {SCENES.map((scene, i) => (
              <li key={scene.id} aria-current={i === chapter ? "step" : undefined}>
                <span>0{i + 1}</span> {scene.label}
              </li>
            ))}
          </ol>
          <a href="#what">Skip the story</a>
          <i />
        </nav>
      </div>
    </section>
  );
}

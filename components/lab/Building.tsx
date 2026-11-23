"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./building.css";

const SPOTS = [
  { x: 62.5, y: 52, say: "A name people remember" },
  { x: 39, y: 63, say: "A website that sells for you" },
  { x: 66, y: 71, say: "Answers every customer, day and night" },
  { x: 61, y: 39, say: "Knows your whole business" },
  { x: 40, y: 39, say: "Does the boring work by itself" },
  { x: 34.5, y: 73, say: "Your own app in their pocket" },
  { x: 43, y: 17, say: "A film that shows who you are" },
];

export function Building() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const st = stage.current!;
    const tags = st.querySelectorAll<HTMLElement>(".spot");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let held = false;
    let tx = 0.5;
    let ty = 0.5;
    let x = 0.5;
    let y = 0.5;
    const move = (e: PointerEvent) => {
      const b = st.getBoundingClientRect();
      held = true;
      tx = (e.clientX - b.left) / b.width;
      ty = (e.clientY - b.top) / b.height;
    };
    el.addEventListener("pointermove", move);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      if (!held && !still) {
        tx = 0.5 + 0.17 * Math.sin(t * 0.5);
        ty = 0.5 + 0.24 * Math.sin(t * 0.8 + 1);
      }
      const k = still ? 1 : 0.12;
      x += (tx - x) * k;
      y += (ty - y) * k;
      const w = st.clientWidth;
      const h = st.clientHeight;
      const R = Math.min(Math.max(140, w * 0.2), 300);
      st.style.setProperty("--mx", `${(x * w).toFixed(1)}px`);
      st.style.setProperty("--my", `${(y * h).toFixed(1)}px`);
      st.style.setProperty("--r", `${R}px`);
      tags.forEach((tag, i) => {
        const far = Math.hypot((SPOTS[i].x / 100 - x) * w, (SPOTS[i].y / 100 - y) * h) / R;
        tag.style.opacity = Math.max(0, Math.min(1, 2.4 - far * 3.2)).toFixed(2);
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={root} className="bd">
      <div ref={stage} className="bd-stage" aria-hidden="true">
        <img src="/lab/building-off.webp" alt="" />
        <img className="on" src="/lab/building-on.webp" alt="" />
        {SPOTS.map((s) => (
          <span key={s.say} className="spot" style={{ left: `${s.x}%`, top: `${s.y}%` } as CSSProperties}>
            {s.say}
          </span>
        ))}
      </div>

      <div className="bd-copy">
        <p className="eyebrow">For business owners</p>
        <h1>
          Your business,
          <em>switched on.</em>
        </h1>
        <p className="bd-lead">Everything your customers see, and everything that works for you behind it. Designed and built by one studio.</p>
        <p className="bd-hint">Move the light</p>
      </div>
    </section>
  );
}

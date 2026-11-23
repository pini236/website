"use client";

import { useEffect, useRef } from "react";
import "./building.css";

export function Building() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const st = stage.current!;
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
      const box = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -box.top / (box.height - innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
      const w = st.clientWidth;
      const h = st.clientHeight;
      const R = Math.min(Math.max(140, w * 0.2), 300);
      st.style.setProperty("--mx", `${(x * w).toFixed(1)}px`);
      st.style.setProperty("--my", `${(y * h).toFixed(1)}px`);
      st.style.setProperty("--r", `${R}px`);
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
      <div className="bd-pin">
      <div ref={stage} className="bd-stage" aria-hidden="true">
        <img src="/lab/building-scaffold.webp" alt="" />
        <img className="on" src="/lab/building-on.webp" alt="" />
        <img className="on life" src="/lab/building-life2.webp" alt="" />
        <img className="on life" src="/lab/building-life3.webp" alt="" />
      </div>

      <div className="bd-copy">
        <p className="eyebrow">For business owners</p>
        <h1>
          <span className="was">
            Is your business
            <em>still half built?</em>
          </span>
          <span className="now">
            Your business,
            <em>switched on.</em>
          </span>
        </h1>
        <p className="bd-hint">Scroll</p>
      </div>
      </div>
    </section>
  );
}

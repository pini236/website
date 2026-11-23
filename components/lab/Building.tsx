"use client";

import { useEffect, useRef } from "react";
import "./building.css";

export function Building() {
  const root = useRef<HTMLElement>(null);
  const build = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current!;
    const v = build.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let at = 0;
    let raf = 0;
    const frame = () => {
      const box = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -box.top / (box.height - innerHeight)));
      el.style.setProperty("--p", p.toFixed(4));
      const to = Math.max(0, Math.min(1, (p - 0.04) / 0.8));
      at += (to - at) * (still ? 1 : 0.14);
      const t = at * ((v.duration || 8) - 0.05);
      if (v.readyState > 1 && Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={root} className="bd">
      <div className="bd-pin">
        <div className="bd-stage" aria-hidden="true">
          <video ref={build} src="/lab/street-build.mp4" poster="/lab/street-scaffold.jpg" muted playsInline preload="auto" />
          <video className="idle" src="/lab/street-scaffold.mp4" poster="/lab/street-scaffold.jpg" autoPlay loop muted playsInline />
          <video className="live" src="/lab/street-live.mp4" autoPlay loop muted playsInline />
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

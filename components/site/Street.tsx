"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { COPY, type Lang } from "@/lib/copy";
import { sceneProgress, span } from "@/lib/scroll";

const BUILD: [number, number] = [0.44, 0.72];
const at = (a: number, b: number) => ({ "--a": a, "--b": b }) as CSSProperties;

export function Street({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const root = useRef<HTMLElement>(null);
  const scaf = useRef<HTMLVideoElement>(null);
  const build = useRef<HTMLVideoElement>(null);
  const live = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = root.current!;
    const film = build.current!;
    const loops = { scaf: scaf.current!, live: live.current! };
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown = 0;
    let raf = 0;
    let playing = "";
    // iOS only seeks a video that has been played once
    film.play().then(() => film.pause()).catch(() => {});

    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = sceneProgress(-r.top, r.height, innerHeight);
      const act = p < BUILD[0] ? "scaf" : p < BUILD[1] ? "build" : "live";
      el.style.setProperty("--p", p.toFixed(4));
      el.dataset.act = act;
      const want = !still && r.bottom > 0 && r.top < innerHeight ? act : "";
      if (want !== playing) {
        playing = want;
        for (const [name, v] of Object.entries(loops)) name === want ? v.play().catch(() => {}) : v.pause();
      }
      const target = span(p, ...BUILD);
      shown += (target - shown) * 0.2;
      if (Math.abs(target - shown) < 0.001) shown = target;
      else raf = requestAnimationFrame(frame);
      if (film.duration) film.currentTime = shown * (film.duration - 0.05);
    };
    const kick = () => {
      raf ||= requestAnimationFrame(frame);
    };
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    film.addEventListener("loadedmetadata", kick);
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      film.removeEventListener("loadedmetadata", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  const list = (items: string[], from: number, step: number, to: number) => (
    <ul>
      {items.map((t, i) => (
        <li key={t} className="on" style={at(from + i * step, to)}>
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="street" id="street" ref={root} data-act="scaf">
      <div className="pin">
        <div className="stage" aria-hidden="true">
          <video ref={build} src="/street/build.mp4" poster="/street/scaf.jpg" muted playsInline preload="auto" />
          <video ref={scaf} className="v-scaf" src="/street/scaf.mp4" poster="/street/scaf.jpg" muted playsInline loop preload="auto" />
          <video ref={live} className="v-live" src="/street/live.mp4" poster="/street/day-21.jpg" muted playsInline loop preload="auto" />
        </div>
        <div className="acts">
          <div className="act">
            <h1 className="on" style={at(-1, 0.1)}>
              {c.landing[0]}
              <em>{c.landing[1]}</em>
            </h1>
            <p className="hint on" style={at(-1, 0.05)}>
              {c.scroll}
            </p>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.13, 0.41)}>
              {c.gap.head}
            </h2>
            {list(c.gap.beats, 0.2, 0.06, 0.41)}
          </div>
          <div className="act">
            <h2 className="on" style={at(0.44, 0.73)}>
              {c.face.head}
            </h2>
            {list(c.face.items, 0.5, 0.05, 0.73)}
          </div>
          <div className="act">
            <h2 className="on" style={at(0.76, 2)}>
              {c.lights.head}
            </h2>
            <p className="sub on" style={at(0.8, 2)}>
              {c.lights.sub}
            </p>
            {list(c.lights.items, 0.84, 0.035, 2)}
            <p className="ai on" style={at(0.95, 2)}>
              {c.lights.ai}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

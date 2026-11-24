"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { COPY, type Lang } from "@/lib/copy";
import { sceneProgress, span } from "@/lib/scroll";

const BUILD: [number, number] = [0.02, 0.86];
// live.mp4 plays the arrival once, then repeats from here
const LOOP = 10.04;
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
    const shop = live.current!;
    const loops = { scaf: scaf.current!, live: shop };
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
      const want = r.bottom > 0 && r.top < innerHeight ? act : "";
      if (want !== playing) {
        if (want === "live") shop.currentTime = still ? LOOP : 0;
        playing = want;
        for (const [name, v] of Object.entries(loops)) name === want && !still ? v.play().catch(() => {}) : v.pause();
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
    const again = () => {
      shop.currentTime = LOOP;
      shop.play().catch(() => {});
    };
    shop.addEventListener("ended", again);
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    film.addEventListener("loadedmetadata", kick);
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      film.removeEventListener("loadedmetadata", kick);
      shop.removeEventListener("ended", again);
      cancelAnimationFrame(raf);
    };
  }, []);

  const dir = lang === "he" ? "/street/he" : "/street";
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
          <video ref={build} src={`${dir}/build.mp4`} poster={`${dir}/scaf.jpg`} muted playsInline preload="auto" />
          <video ref={scaf} className="v-scaf" src={`${dir}/scaf.mp4`} poster={`${dir}/scaf.jpg`} muted playsInline loop preload="auto" />
          <video ref={live} className="v-live" src={`${dir}/live.mp4`} poster={`${dir}/live.jpg`} muted playsInline preload="auto" />
        </div>
        <div className="acts">
          <div className="act">
            <h1 className="on" style={at(-1, 0.08)}>
              {c.landing[0]}
              <em>{c.landing[1]}</em>
            </h1>
            <p className="hint on" style={at(-1, 0.04)}>
              {c.scroll}
            </p>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.1, 0.38)}>
              {c.gap.head}
            </h2>
            {list(c.gap.beats, 0.16, 0.06, 0.38)}
          </div>
          <div className="act">
            <h2 className="on" style={at(0.4, 0.69)}>
              {c.face.head}
            </h2>
            {list(c.face.items, 0.45, 0.05, 0.69)}
          </div>
          <div className="act">
            <h2 className="on" style={at(0.73, 2)}>
              {c.lights.head}
            </h2>
            <p className="sub on" style={at(0.77, 2)}>
              {c.lights.sub}
            </p>
            {list(c.lights.items, 0.81, 0.035, 2)}
            <p className="ai on" style={at(0.93, 2)}>
              {c.lights.ai}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

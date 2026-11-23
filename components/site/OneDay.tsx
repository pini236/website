"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COPY, type Lang } from "@/lib/copy";
import { DAY_END, DAY_START, STOPS, moment, weights } from "@/lib/day";
import { clock } from "@/lib/scroll";

const PLATES = ["07", "11", "16", "21"];

export function OneDay({ lang }: { lang: Lang }) {
  const c = COPY[lang].day;
  const root = useRef<HTMLElement>(null);
  const touched = useRef(false);
  const [minutes, setMinutes] = useState(STOPS[0]);
  const w = weights(minutes);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (touched.current) return;
      const dt = last ? Math.min(now - last, 50) : 0;
      last = now;
      setMinutes((m) =>
        m >= DAY_END ? DAY_START : Math.min(DAY_END, m + dt * 0.045),
      );
      raf = requestAnimationFrame(tick);
    };
    const seen = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf);
        last = 0;
        if (e.isIntersecting) raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    seen.observe(root.current!);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="oneday" ref={root}>
      <h2>{c.head}</h2>
      <div className="stagebox">
        <div className="frame">
          {PLATES.map((name, i) => (
            <Image
              key={name}
              src={`/street/day-${name}.jpg`}
              alt=""
              fill
              sizes="(max-width: 820px) 180vw, 100vw"
              style={{ opacity: i === 0 || minutes >= STOPS[i] ? 1 : w[i] }}
            />
          ))}
          <span className="chip">{c.label}</span>
        </div>
        <div className="dial">
          <output className="clock" dir="ltr">
            {clock(minutes)}
          </output>
          <div>
            <p className="moment" aria-live="polite">
              {c.moments[moment(minutes)]}
            </p>
            <input
              type="range"
              min={DAY_START}
              max={DAY_END}
              step={5}
              value={Math.round(minutes / 5) * 5}
              aria-label={c.drag}
              aria-valuetext={clock(minutes)}
              onPointerDown={() => (touched.current = true)}
              onKeyDown={() => (touched.current = true)}
              onChange={(e) => {
                touched.current = true;
                setMinutes(Number(e.target.value));
              }}
            />
            <p className="drag">{c.drag}</p>
          </div>
        </div>
      </div>
      <p className="after">{c.close}</p>
    </section>
  );
}

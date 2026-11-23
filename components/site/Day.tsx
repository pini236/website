"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { COPY, type Lang } from "@/lib/copy";
import { dayMinutes, weights } from "@/lib/day";
import { clock, sceneProgress, span } from "@/lib/scroll";

const at = (a: number, b: number) => ({ "--a": a, "--b": b }) as CSSProperties;
const PLATES = ["07", "11", "16", "21"];

export function Day({ lang }: { lang: Lang }) {
  const c = COPY[lang].day;
  const root = useRef<HTMLElement>(null);
  const time = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    const el = root.current!;
    const pin = el.querySelector<HTMLElement>(".pin")!;
    let raf = 0;
    let mouse = false;

    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = sceneProgress(-r.top, r.height, innerHeight);
      const minutes = dayMinutes(p);
      el.style.setProperty("--p", p.toFixed(4));
      el.style.setProperty("--open", span(p, 0.86, 0.95).toFixed(3));
      weights(minutes).forEach((w, i) => el.style.setProperty(`--w${i}`, w.toFixed(3)));
      time.current!.textContent = clock(minutes);
      if (!mouse) {
        el.style.setProperty("--mx", `${50 + Math.sin(p * 15) * 32}%`);
        el.style.setProperty("--my", `${62 + Math.cos(p * 9) * 12}%`);
      }
    };
    const kick = () => {
      raf ||= requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse = true;
      const b = pin.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - b.left}px`);
      el.style.setProperty("--my", `${e.clientY - b.top}px`);
    };
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    pin.addEventListener("pointermove", move);
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      pin.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="day" id="day" ref={root}>
      <div className="pin">
        <div className="stage" aria-hidden="true">
          {PLATES.map((n, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={n} src={`/street/day-${n}.jpg`} alt="" className="plate" style={{ opacity: i === 0 ? 1 : `var(--w${i})` }} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/street/xray.jpg" alt="" className="xray" />
        </div>
        <output ref={time} className="dclock" dir="ltr">
          06:30
        </output>
        <p className="lens">{c.lens}</p>

        <div className="acts">
          <div className="act">
            <h2 className="on" style={at(0.02, 0.24)}>
              {c.morning.title}
            </h2>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.26, 0.46)}>
              {c.noon.title}
            </h2>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.49, 0.67)}>
              {c.supply.title}
            </h2>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.69, 0.86)}>
              {c.night.title}
            </h2>
          </div>
          <div className="act">
            <h2 className="on" style={at(0.89, 2)}>
              {c.brain.head}
            </h2>
            <p className="sub on" style={at(0.92, 2)}>
              {c.brain.body}
            </p>
          </div>
        </div>

        <div className="pings" aria-hidden="true">
          {c.morning.orders.map((t, i) => (
            <span key={t} className="ping on" style={at(0.04 + i * 0.045, 0.24)}>
              {t}
            </span>
          ))}
          <span className="ping on" style={at(0.52, 0.67)}>
            {c.supply.note}
          </span>
          <div className="dphone on" style={at(0.28, 0.46)}>
            <p className="dbubble ask">{c.noon.ask}</p>
            <p className="dbubble reply on" style={at(0.34, 0.46)}>
              {c.noon.reply}
            </p>
          </div>
          <div className="dphone on" style={at(0.71, 0.86)}>
            <small dir="ltr">{c.night.time}</small>
            <p className="dbubble ask">{c.night.ask}</p>
            <p className="dbubble reply on" style={at(0.76, 0.86)}>
              {c.night.reply}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

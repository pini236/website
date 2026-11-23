"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Lang } from "@/lib/copy";
import { STORY, type BlockId, type StoryCopy } from "@/lib/story";
import "./blueprint.css";

const W = 1500;
const H = 1000;

type Plate = { id: BlockId; x: number; y: number; w: number; h: number; z: number };

const PLATES: Plate[] = [
  { id: "brand", x: 70, y: 70, w: 300, h: 250, z: 110 },
  { id: "film", x: 470, y: 40, w: 460, h: 215, z: 50 },
  { id: "web", x: 430, y: 310, w: 620, h: 400, z: 80 },
  { id: "app", x: 1160, y: 200, w: 205, h: 420, z: 150 },
  { id: "agent", x: 80, y: 410, w: 270, h: 390, z: 130 },
  { id: "mind", x: 430, y: 770, w: 470, h: 200, z: 40 },
  { id: "flow", x: 980, y: 720, w: 460, h: 230, z: 60 },
];

const WIRES = [
  "M220 320V365H400V510H430",
  "M700 255V310",
  "M350 600H390V620H430",
  "M215 800V870H430",
  "M900 870H980",
  "M1210 720V670H1262V620",
  "M1050 510H1105V410H1160",
];

const at = (p: Plate) => ({ left: p.x, top: p.y, width: p.w, height: p.h, "--z": p.z }) as CSSProperties;

type B = { t: StoryCopy["bp"] };

const Brand = ({ t }: B) => (
  <>
    <div className="row">
      <b className="logo">{t.name[0]}</b>
      <div>
        <strong className="hd">{t.name}</strong>
        <span>{t.brand.tag}</span>
      </div>
    </div>
    <div className="swatches">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
    <div className="row type">
      <strong className="hd">Aa</strong>
      <p>
        {t.brand.fonts[0]}
        <br />
        {t.brand.fonts[1]}
      </p>
    </div>
    <div className="pattern" />
  </>
);

const Film = ({ t }: B) => (
  <>
    <div className="frame">
      <b className="hd">{t.name[0]}</b>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <span>{t.video}</span>
    </div>
    <div className="tracks">
      {[
        [0, 22, 30, 16, 20],
        [8, 30, 12, 34],
        [0, 46, 40],
      ].map((clips, r) => (
        <div key={r}>
          {clips.map((c, i) => (
            <i key={i} style={{ width: `${c}%` }} />
          ))}
        </div>
      ))}
      <em />
    </div>
  </>
);

const Web = ({ t }: B) => (
  <>
    <div className="bar">
      <i />
      <i />
      <i />
      <span dir="ltr">{t.domain}</span>
    </div>
    <div className="nav">
      <strong className="hd">{t.name}</strong>
      {t.web.nav.map((n) => (
        <span key={n}>{n}</span>
      ))}
      <em>{t.web.book}</em>
    </div>
    <div className="hero">
      <div>
        <span className="kick">{t.web.kick}</span>
        <h3 className="hd">{t.web.head}</h3>
        <p>{t.web.sub}</p>
        <div className="row">
          <em>{t.web.book}</em>
          <span className="link">{t.web.menu}</span>
        </div>
      </div>
      <div className="art">
        <b className="hd">{t.name[0]}</b>
      </div>
    </div>
    <div className="cards">
      {t.web.cards.map(([a, b]) => (
        <div key={a}>
          <i />
          <strong>{a}</strong>
          <span>{b}</span>
        </div>
      ))}
    </div>
  </>
);

const App = ({ t }: B) => (
  <>
    <i className="notch" />
    <span>{t.app.hello}</span>
    <strong className="hd">{t.app.who}</strong>
    <div className="ticket">
      <span>{t.app.ticket[0]}</span>
      <strong>{t.app.ticket[1]}</strong>
      <span>{t.app.ticket[2]}</span>
    </div>
    {t.app.lines.map((l) => (
      <div key={l} className="line">
        <i />
        <span>{l}</span>
      </div>
    ))}
    <div className="tabs">
      <i />
      <i />
      <i />
      <i />
    </div>
  </>
);

const Agent = ({ t }: B) => (
  <>
    <div className="row head">
      <b className="logo">{t.name[0]}</b>
      <div>
        <strong>{t.name}</strong>
        <span>{t.agent.status}</span>
      </div>
    </div>
    <p className="them">{t.agent.q}</p>
    <p className="us">{t.agent.a}</p>
    <p className="them">{t.agent.q2}</p>
    <p className="us">{t.agent.a2}</p>
    <p className="them dots">
      <i />
      <i />
      <i />
    </p>
  </>
);

const NODES = [
  [60, 34],
  [128, 20],
  [100, 78],
  [172, 62],
  [40, 104],
  [150, 118],
  [206, 104],
  [84, 138],
];
const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [5, 6],
  [4, 7],
  [5, 7],
];

const Mind = ({ t }: B) => (
  <>
    <div className="docs">
      {t.mind.docs.map((d) => (
        <span key={d}>{d}</span>
      ))}
    </div>
    <svg viewBox="0 0 240 160" aria-hidden="true">
      {EDGES.map(([a, b], i) => (
        <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 9 : 5} style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
    </svg>
    <div className="qa">
      <span>{t.mind.asked}</span>
      <strong>{t.mind.q}</strong>
      <p>{t.mind.a}</p>
    </div>
  </>
);

const Flow = ({ t }: B) => (
  <>
    <span className="kick">{t.flow.kick}</span>
    <div className="steps">
      {t.flow.steps.map((s, i) => (
        <div key={s} style={{ animationDelay: `${i * 0.6}s` }}>
          <i />
          <strong>{s}</strong>
        </div>
      ))}
    </div>
    <div className="log">
      {t.flow.log.map((l) => (
        <span key={l}>{l}</span>
      ))}
    </div>
  </>
);

const BODY: Record<BlockId, (p: B) => React.JSX.Element> = { brand: Brand, film: Film, web: Web, app: App, agent: Agent, mind: Mind, flow: Flow };

const Plates = ({ t, rtl }: B & { rtl: boolean }) =>
  PLATES.map((p, i) => {
    const Body = BODY[p.id];
    return (
      <div key={p.id} className={`pl ${p.id}`} dir={rtl ? "rtl" : undefined} style={{ ...at(p), "--i": i } as CSSProperties}>
        <Body t={t} />
      </div>
    );
  });

const Labels = ({ t }: B) =>
  PLATES.map((p, i) => (
    <span key={p.id} className="lbl" dir={t.name === "Paper Fox" ? undefined : "rtl"} style={{ left: p.x + p.w, top: p.y, "--z": p.z + 26, "--i": i } as CSSProperties}>
      {t.say[p.id]}
    </span>
  ));

const Sheet = () => (
  <div className="sheet">
    {PLATES.map((p) => (
      <i key={p.id} className="shade" style={at(p)} />
    ))}
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <g className="wires">
        {WIRES.map((d, i) => (
          <path key={i} d={d} pathLength="1" style={{ "--i": i } as CSSProperties} />
        ))}
      </g>
      <g className="pulses">
        {WIRES.map((d, i) => (
          <circle key={i} r="5">
            <animateMotion dur={`${3 + (i % 3)}s`} begin={`${2.4 + i * 0.5}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
      </g>
    </svg>
  </div>
);

export function Blueprint({ lang }: { lang: Lang }) {
  const t = STORY[lang].bp;
  const rtl = lang === "he";
  const root = useRef<HTMLElement>(null);
  const sparks = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = root.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const fit = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      el.style.setProperty("--rpx", String(Math.min(Math.max(130, w * 0.19), 290)));
      el.style.setProperty("--s", Math.max(Math.min(w / 2300, h / 1250), Math.min(w / 1000, h / 1500)).toFixed(4));
    };
    const cv = sparks.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio, 2);
    const size = () => {
      fit();
      cv.width = w * dpr;
      cv.height = h * dpr;
    };
    size();
    addEventListener("resize", size);
    const dots = Array.from({ length: Math.min(64, Math.round((w * h) / 20000)) }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, a: i * 2.4, r: 0.6 + Math.random() * 1.1 }));

    const tags = el.querySelectorAll<HTMLElement>(".lbl");

    let tx = w * 0.56;
    let ty = h * 0.56;
    let x = tx;
    let y = ty;
    let held = false;
    const move = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      held = true;
      tx = e.clientX - box.left;
      ty = e.clientY - box.top;
    };
    el.addEventListener("pointermove", move);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const t = (now - start) / 1000;
      if (!held && !still) {
        tx = w * (0.52 + 0.3 * Math.sin(t * 0.42));
        ty = h * (0.58 + 0.2 * Math.sin(t * 0.67 + 1));
      }
      const k = still ? 1 : 0.12;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
      if (!still) {
        el.style.setProperty("--tz", `${((x / w - 0.5) * 5).toFixed(2)}deg`);
        el.style.setProperty("--tx", `${((y / h - 0.5) * -4).toFixed(2)}deg`);
      }
      const R = parseFloat(getComputedStyle(el).getPropertyValue("--rpx")) || 220;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const d of dots) {
        const dx = x - d.x;
        const dy = y - d.y;
        const dist = Math.hypot(dx, dy) || 1;
        const near = Math.max(0, 1 - dist / (R * 2.4));
        d.vx += (Math.cos(d.a + t * 0.3) * 0.012 + (dx / dist) * near * 0.05 - (dy / dist) * near * 0.035) * (still ? 0 : 1);
        d.vy += (Math.sin(d.a * 1.7 + t * 0.25) * 0.012 + (dy / dist) * near * 0.05 + (dx / dist) * near * 0.035) * (still ? 0 : 1);
        d.vx *= 0.97;
        d.vy *= 0.97;
        d.x = (d.x + d.vx + w) % w;
        d.y = (d.y + d.vy + h) % h;
        const lit = Math.min(1, near * 2.2);
        const rad = d.r * (1 + lit * 1.6);
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, rad * 3.2);
        g.addColorStop(0, `rgba(255, ${Math.round(190 + 40 * lit)}, ${Math.round(150 + 60 * lit)}, ${0.22 + lit * 0.6})`);
        g.addColorStop(1, "rgba(255, 150, 90, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, rad * 3.2, 0, 7);
        ctx.fill();
      }
      const box = el.getBoundingClientRect();
      for (const tag of tags) {
        const b = tag.getBoundingClientRect();
        const far = Math.hypot(b.left + b.width / 2 - box.left - x, b.bottom - box.top - y) / R;
        tag.style.opacity = Math.max(0, Math.min(1, 2.1 - far * 1.5)).toFixed(2);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={root} className="bp" id="plan">
      <div className="iso plan" aria-hidden="true">
        <Sheet />
        <Plates t={t} rtl={rtl} />
      </div>
      <div className="lamp" aria-hidden="true" />
      <div className="lit" aria-hidden="true">
        <div className="iso real">
          <Plates t={t} rtl={rtl} />
        </div>
      </div>
      <div className="iso tags" aria-hidden="true">
        <Labels t={t} />
      </div>
      <canvas ref={sparks} className="sparks" aria-hidden="true" />

      <div className="bp-copy">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>
          {t.head[0]}
          <em>{t.head[1]}</em>
        </h1>
        <p className="bp-lead">{t.lead}</p>
        <p className="bp-hint">{t.hint}</p>
      </div>
    </section>
  );
}

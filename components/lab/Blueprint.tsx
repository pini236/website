"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import "./blueprint.css";

const W = 1500;
const H = 1000;

type Plate = { id: string; n: string; label: string; side: "Face" | "Brain"; x: number; y: number; w: number; h: number; z: number };

const PLATES: Plate[] = [
  { id: "brand", n: "01", label: "Brand", side: "Face", x: 70, y: 70, w: 300, h: 250, z: 110 },
  { id: "video", n: "02", label: "Brand film", side: "Face", x: 470, y: 40, w: 460, h: 215, z: 50 },
  { id: "web", n: "03", label: "Website", side: "Face", x: 430, y: 310, w: 620, h: 400, z: 80 },
  { id: "app", n: "04", label: "App", side: "Face", x: 1160, y: 200, w: 205, h: 420, z: 150 },
  { id: "agent", n: "05", label: "Agent", side: "Brain", x: 80, y: 410, w: 270, h: 390, z: 130 },
  { id: "mind", n: "06", label: "Second brain", side: "Brain", x: 430, y: 770, w: 470, h: 200, z: 40 },
  { id: "flow", n: "07", label: "Workflows", side: "Brain", x: 980, y: 720, w: 460, h: 230, z: 60 },
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

const Brand = () => (
  <>
    <div className="row">
      <b className="logo">S</b>
      <div>
        <strong className="hd">Saffron Yard</strong>
        <span>Fire kitchen · est. 2026</span>
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
        Syne ExtraBold
        <br />
        Instrument Sans
      </p>
    </div>
    <div className="pattern" />
  </>
);

const Video = () => (
  <>
    <div className="frame">
      <b className="hd">S</b>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <span>Saffron Yard · the film · 00:38</span>
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

const Web = () => (
  <>
    <div className="bar">
      <i />
      <i />
      <i />
      <span>saffronyard.com</span>
    </div>
    <div className="nav">
      <strong className="hd">Saffron Yard</strong>
      <span>Menu</span>
      <span>The yard</span>
      <span>Events</span>
      <em>Book a table</em>
    </div>
    <div className="hero">
      <div>
        <span className="kick">Open tonight until 01:00</span>
        <h3 className="hd">Fire, smoke and a long table.</h3>
        <p>Wood-fired plates made for sharing, in a courtyard under the lights.</p>
        <div className="row">
          <em>Book a table</em>
          <span className="link">See the menu</span>
        </div>
      </div>
      <div className="art">
        <b className="hd">S</b>
      </div>
    </div>
    <div className="cards">
      {[
        ["Lamb shoulder", "Twelve hours, charred lemon"],
        ["Burnt aubergine", "Tahini, pomegranate"],
        ["Saffron flatbread", "From the clay oven"],
      ].map(([a, b]) => (
        <div key={a}>
          <i />
          <strong>{a}</strong>
          <span>{b}</span>
        </div>
      ))}
    </div>
  </>
);

const App = () => (
  <>
    <i className="notch" />
    <span>Good evening,</span>
    <strong className="hd">Dana</strong>
    <div className="ticket">
      <span>Your table</span>
      <strong>Friday · 20:15</strong>
      <span>Table for 6 · the long table</span>
    </div>
    {["Pre-order the lamb", "Add a birthday note", "Invite your guests"].map((t) => (
      <div key={t} className="line">
        <i />
        <span>{t}</span>
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

const Agent = () => (
  <>
    <div className="row head">
      <b className="logo">S</b>
      <div>
        <strong>Saffron Yard</strong>
        <span>AI host · awake · 23:47</span>
      </div>
    </div>
    <p className="them">Hi! Any chance of a table for 6 this Friday around 8?</p>
    <p className="us">Friday at 20:15 I have our long table for six. Want me to book it?</p>
    <p className="them">Yes please! Under Dana.</p>
    <p className="us">Done, Dana. See you Friday.</p>
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

const Mind = () => (
  <>
    <div className="docs">
      {["Menu.pdf", "Suppliers.xlsx", "Bookings", "Reviews", "Recipes"].map((d) => (
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
      <span>You asked</span>
      <strong>What sold best on Fridays?</strong>
      <p>Lamb shoulder, by far. It runs out before ten.</p>
    </div>
  </>
);

const Flow = () => (
  <>
    <span className="kick">Runs by itself · every booking</span>
    <div className="steps">
      {["New booking", "Check stock", "Order supplier", "Send invoice", "Remind guest"].map((s, i) => (
        <div key={s} style={{ animationDelay: `${i * 0.6}s` }}>
          <i />
          <strong>{s}</strong>
        </div>
      ))}
    </div>
    <div className="log">
      <span>20:15 table held</span>
      <span>lamb ×2 ordered</span>
      <span>invoice sent</span>
    </div>
  </>
);

const BODY: Record<string, () => React.JSX.Element> = { brand: Brand, video: Video, web: Web, app: App, agent: Agent, mind: Mind, flow: Flow };

const Plates = () =>
  PLATES.map((p, i) => {
    const Body = BODY[p.id];
    return (
      <div key={p.id} className={`pl ${p.id}`} style={{ ...at(p), "--i": i } as CSSProperties}>
        <Body />
      </div>
    );
  });

const Sheet = () => (
  <div className="sheet">
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <g className="wires">
        {WIRES.map((d, i) => (
          <path key={i} d={d} pathLength="1" style={{ "--i": i } as CSSProperties} />
        ))}
      </g>
      <g className="pulses">
        {WIRES.map((d, i) => (
          <circle key={i} r="4">
            <animateMotion dur={`${3 + (i % 3)}s`} begin={`${2.4 + i * 0.5}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
      </g>
      <g className="ticks">
        {Array.from({ length: 31 }, (_, i) => (
          <path key={i} d={`M${i * 50} ${H}v${i % 2 ? 8 : 16}M0 ${Math.min(i * 50, H)}h${i % 2 ? -8 : -16}`} />
        ))}
      </g>
    </svg>
    {PLATES.map((p, i) => (
      <div key={p.id} className="foot-print" style={{ ...at(p), "--i": i } as CSSProperties}>
        <span className="tagline">
          <b>{p.n}</b> {p.label} <em>{p.side}</em>
        </span>
        <span className="dim">
          {p.w} × {p.h}
        </span>
        <i className="drop a" />
        <i className="drop b" />
        <i className="drop c" />
      </div>
    ))}
  </div>
);

export function Blueprint() {
  const root = useRef<HTMLElement>(null);
  const coords = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const fit = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      el.style.setProperty("--s", Math.max(Math.min(w / 2050, h / 1150), Math.min(w / 1000, h / 1500)).toFixed(4));
    };
    fit();
    addEventListener("resize", fit);

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
      if (coords.current) coords.current.textContent = `x ${Math.round(x).toString().padStart(4, "0")}  y ${Math.round(y).toString().padStart(4, "0")}`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", fit);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section ref={root} className="bp">
      <div className="iso plan" aria-hidden="true">
        <Sheet />
        <Plates />
      </div>
      <div className="lit" aria-hidden="true">
        <div className="iso real">
          <Plates />
        </div>
      </div>
      <div className="lamp" aria-hidden="true">
        <span ref={coords} />
      </div>

      <div className="bp-copy">
        <p className="eyebrow">Drawing 01 · your business, complete</p>
        <h1>
          Every business runs on a plan.
          <em>I build the whole thing.</em>
        </h1>
        <p className="bp-hint">Move the light to see it finished. Scroll to watch it get built.</p>
      </div>

      <dl className="title-block" aria-hidden="true">
        <div>
          <dt>Project</dt>
          <dd>Saffron Yard</dd>
        </div>
        <div>
          <dt>Sheet</dt>
          <dd>01 / 07</dd>
        </div>
        <div>
          <dt>Parts</dt>
          <dd>4 face · 3 brain</dd>
        </div>
        <div>
          <dt>Drawn by</dt>
          <dd>Rooftop AI Studio</dd>
        </div>
      </dl>
    </section>
  );
}

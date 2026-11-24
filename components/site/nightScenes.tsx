import type { CSSProperties, ReactNode } from "react";
import type { StoryCopy } from "@/lib/story";

export const rv = (a: number, b: number, c?: number, d?: number) =>
  ({ "--a": a, "--b": b, ...(c === undefined ? {} : { "--c": c, "--d": d }) }) as CSSProperties;

const Clock = ({ from, to, a, b, className = "", style }: { from: number; to: number; a: number; b: number; className?: string; style?: CSSProperties }) => (
  <span className={`clock ${className}`} style={style} dir="ltr" data-clock={`${from},${to},${a},${b}`} aria-hidden="true">
    <i>2</i>
    <i>3</i>
    <i>:</i>
    <i>4</i>
    <i>7</i>
  </span>
);

const Status = ({ time }: { time?: string }) => (
  <div className="status" dir="ltr" aria-hidden="true">
    <b>{time}</b>
    <svg viewBox="0 0 58 12">
      <path d="M0 7h3v5H0zM4.5 5h3v7h-3zM9 2.5h3V12H9zM13.5 0h3v12h-3z" />
      <path className="s" d="M21.5 4.4a8.5 8.5 0 0 1 12 0M24 7a5 5 0 0 1 7 0" />
      <circle cx="27.5" cy="10" r="1.3" />
      <rect className="s" x="39.6" y="1.1" width="15" height="9.8" rx="3" />
      <rect x="41.3" y="2.8" width="9.6" height="6.4" rx="1.5" />
      <path d="M56 4h1.2v4H56z" />
    </svg>
  </div>
);

const Phone = ({ children, time, className = "", style }: { children: ReactNode; time?: string; className?: string; style?: CSSProperties }) => (
  <div className={`phone ${className}`} style={style}>
    <i className="key k1" />
    <i className="key k2" />
    <i className="key k3" />
    <div className="screen">
      {children}
      <Status time={time} />
      <i className="homebar" />
    </div>
  </div>
);

const Notif = ({ name, text, when, className, style }: { name: string; text: string; when: ReactNode; className: string; style: CSSProperties }) => (
  <div className={`notif ${className}`} style={style}>
    <b className="avatar">{name[0]}</b>
    <div>
      <p className="notif-top">
        <strong>{name}</strong>
        <span>{when}</span>
      </p>
      <p>{text}</p>
    </div>
  </div>
);

const Typed = ({ text, a, b }: { text: string; a: number; b: number }) => (
  <span className="typed">
    <span className="hold">{text}</span>
    <span className="live" data-type={`${a},${b}`} data-text={text} aria-hidden="true" />
  </span>
);

const NIGHT = 23 * 60 + 47;
const MORNING = NIGHT + 445;

export function Night({ t }: { t: StoryCopy }) {
  const { story: s, c: COPY } = t;
  return (
    <div className="layer night on" data-scene>
      <Clock from={NIGHT} to={MORNING} a={0.45} b={0.75} className="bigclock" />

      <div className="hero rv x" style={rv(-2, -1, 0.1, 0.18)}>
        <p className="eyebrow">{COPY.day}</p>
        <h1>
          {COPY.hook}{" "}
          <em>{COPY.hookAccent}</em>
        </h1>
                <p className="hint">{COPY.hint}</p>
      </div>

      <div className="lines">
        <p className="line rv x" style={rv(0.34, 0.4, 0.72, 0.76)}>
          {COPY.nobody}
        </p>
        <p className="line rv x" style={rv(0.8, 0.85, 0.89, 0.92)}>
          {s.lost}
        </p>
        <p className="line rv x" style={rv(0.92, 0.95, 0.985, 1)}>
          {COPY.everyNight}
        </p>
      </div>

      <Phone className="rise x" style={rv(0.14, 0.3, 0.97, 1)}>
        <div className="lock">
          <svg className="padlock" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 10V7.5a5 5 0 0 1 10 0V10h1.5v10h-13V10Zm2.2 0h5.6V7.5a2.8 2.8 0 0 0-5.6 0Z" />
          </svg>
          <p className="lock-day">{COPY.day}</p>
          <Clock from={NIGHT} to={MORNING} a={0.45} b={0.75} className="lock-time" />
          <Notif
            name={s.name}
            text={s.ask}
            className="rv"
            style={rv(0.25, 0.32)}
            when={
              <>
                <span className="rv x" style={rv(-2, -1, 0.6, 0.66)}>
                  {COPY.now}
                </span>
                <span className="rv swap" style={rv(0.66, 0.72)}>
                  {COPY.ago}
                </span>
              </>
            }
          />
          <Notif name={s.name} text={s.gone} when={COPY.now} className="rv" style={rv(0.75, 0.81)} />
          <div className="lock-tools" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M8.5 3h7v3.2L13.8 9v11h-3.6V9L8.5 6.2Z" />
            </svg>
            <svg viewBox="0 0 24 24">
              <path d="M4 8h3.4l1.3-2.2h6.6L16.6 8H20v10.5H4Zm8 2.3a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
            </svg>
          </div>
        </div>
      </Phone>
    </div>
  );
}

export function Rewind({ t }: { t: StoryCopy }) {
  const COPY = t.c;
  return (
    <div className="layer rewind" data-scene>
      <svg className="dial" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <radialGradient id="dial-face">
            <stop offset="0.55" stopColor="#1c1760" stopOpacity="0" />
            <stop offset="0.86" stopColor="#2a2380" stopOpacity="0.5" />
            <stop offset="1" stopColor="#0b0920" stopOpacity="0.75" />
          </radialGradient>
        </defs>
        <circle className="face-fill" cx="200" cy="200" r="194" fill="url(#dial-face)" />
        <circle cx="200" cy="200" r="194" />
        <circle className="thin" cx="200" cy="200" r="188" />
        <circle className="thin" cx="200" cy="200" r="150" />
        <g className="ticks">
          {Array.from({ length: 60 }, (_, i) => (
            <line key={i} className={i % 5 ? "" : "h"} x1="200" y1={i % 5 ? 16 : 14} x2="200" y2={i % 5 ? 22 : 28} transform={`rotate(${i * 6} 200 200)`} />
          ))}
        </g>
        <g className="nums">
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i + 1) * Math.PI) / 6;
            return (
              <text key={i} x={(200 + 155 * Math.sin(a)).toFixed(1)} y={(200 - 155 * Math.cos(a)).toFixed(1)}>
                {i + 1}
              </text>
            );
          })}
        </g>
        <circle className="lost" cx="200" cy="200" r="150" pathLength="360" transform="rotate(263.5 200 200)" />
        <circle className="pin-a" cx="183" cy="51" r="3.4" />
        <path className="hand hr" d="M196.5 214 198 96h4l1.5 118Z" />
        <path className="hand mn" d="M197.5 222 199 42h2l1.5 180Z" />
        <circle className="cap" cx="200" cy="200" r="6" />
      </svg>
      <div className="rewind-copy rv x" style={rv(0, 0.1, 0.9, 1)}>
        <p className="tape">
          <span>◀◀</span> <Clock from={MORNING - 1440} to={NIGHT - 1440} a={0.05} b={0.6} />
        </p>
        <h2>{COPY.rewind}</h2>
        <p className="lead rv" style={rv(0.5, 0.62)}>
          {COPY.rewindSub}
        </p>
      </div>
    </div>
  );
}

export function Brain({ t }: { t: StoryCopy }) {
  const { story: s, c: COPY } = t;
  return (
    <div className="layer brain" data-scene>
      <div className="title rv x" style={rv(0, 0.08, 0.94, 1)}>
        <p className="eyebrow">{COPY.agentEyebrow}</p>
        <h2>{COPY.agent}</h2>
        <p className="lead">{COPY.agentSub}</p>
      </div>

      <Phone className="rise x" style={rv(0, 0.1, 0.94, 1)} time="23:47">
        <div className="chat">
          <header>
            <svg className="back" viewBox="0 0 12 20" aria-hidden="true">
              <path d="M10 2 2 10l8 8" />
            </svg>
            <b className="avatar">{s.name[0]}</b>
            <p>
              <strong>{s.name}</strong>
              <span>{COPY.awake}</span>
            </p>
            <Clock from={NIGHT} to={NIGHT + 1} a={0.6} b={0.61} />
          </header>
          <p className="stamp" dir="ltr">
            {COPY.day} · 23:47
          </p>
          <p className="bubble them rv" style={rv(0.04, 0.1)}>
            {s.ask}
          </p>
          <div className="slot">
            <span className="dots rv x" style={rv(0.12, 0.14, 0.45, 0.47)}>
              <i />
              <i />
              <i />
            </span>
            <p className="bubble us rv" style={rv(0.46, 0.48)}>
              <Typed text={s.reply} a={0.47} b={0.58} />
            </p>
          </div>
          <p className="bubble them rv" style={rv(0.62, 0.66)}>
            {s.confirm}
          </p>
          <p className="bubble us rv" style={rv(0.7, 0.72)}>
            <Typed text={s.done} a={0.71} b={0.8} />
          </p>
          <div className="composer" aria-hidden="true">
            <span>{COPY.type}</span>
            <svg viewBox="0 0 24 24">
              <path d="M12 19V6m0 0-5.5 5.5M12 6l5.5 5.5" />
            </svg>
          </div>
        </div>
      </Phone>

      <div className="trace rv x" style={rv(0.08, 0.12, 0.94, 1)}>
        <p className="eyebrow">{COPY.trace}</p>
        <ol>
          {s.steps.map(([head, detail], i) => {
            const a = 0.12 + i * 0.085;
            return (
              <li key={head} className="rv xm" style={rv(a, a + 0.05, a + 0.075, a + 0.085)}>
                <strong>{head}</strong>
                <span>{detail}</span>
              </li>
            );
          })}
        </ol>
        <div className="ticket rv" style={rv(0.82, 0.88)}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
          <p>
            <strong>{s.ticket[0]}</strong>
            <span>{s.ticket[1]}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const DRAW = rv(0.08, 0.2);
const FILL = rv(0.17, 0.25);

export const Mark = ({ he, style }: { he: boolean; style?: CSSProperties }) => (
  <svg className="bmark tv" viewBox="0 0 64 64" style={style} aria-hidden="true">
    {he ? (
      <>
        <g className="tv" style={FILL}>
          <path d="M17 7h22l12 12v38H17Z" fill="#fbf6ec" />
          <path d="M39 7v12h12Z" fill="#e07f4f" />
          {[30, 38, 46].flatMap((y) => [26, 34, 42].map((x) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.9" fill="#24402f" />))}
        </g>
        <path className="ln" pathLength={1} d="M17 7h22l12 12v38H17ZM39 7v12h12" />
      </>
    ) : (
      <>
        <g className="tv" style={FILL}>
          <path d="M9 9 27 25 11 35ZM55 9 37 25 53 35Z" fill="#c96a3d" />
          <path d="M11 35 27 25 32 29 37 25 53 35 32 45Z" fill="#e07f4f" />
          <path d="M11 35 32 45V59Z" fill="#fbf6ec" />
          <path d="M53 35 32 45V59Z" fill="#efe2c8" />
          <path d="M28.6 54.4h6.8L32 59Z" fill="#1b211d" />
        </g>
        <path className="ln" pathLength={1} d="M9 9 27 25 11 35ZM55 9 37 25 53 35ZM11 35 27 25 32 29 37 25 53 35 32 59ZM11 35 32 45 53 35" />
      </>
    )}
  </svg>
);

const SWATCHES = ["#24402F", "#E07F4F", "#F2B662", "#EFE2C8", "#1B211D"];

export function Face({ t, he }: { t: StoryCopy; he: boolean }) {
  const { story: s, c: COPY, bp } = t;
  return (
    <div className="layer face" data-scene>
      <div className="title rv x" style={rv(0, 0.08, 0.94, 1)}>
        <p className="eyebrow">{COPY.faceEyebrow}</p>
        <h2>{COPY.face}</h2>
        <p className="lead">{COPY.faceSub}</p>
      </div>

      <div className="set x" style={rv(0, 0.1, 0.94, 1)} aria-hidden="true">
        <div className="sheet tv" style={rv(0.52, 0.64)}>
          <div className="board">
            <div className="lockup">
              <Mark he={he} style={DRAW} />
              <strong className="bf rv" style={rv(0.2, 0.28)}>
                {s.name}
              </strong>
              <small className="rv" style={rv(0.25, 0.31)}>
                {bp.brand.tag}
              </small>
            </div>
            <div className="type rv" style={rv(0.38, 0.45)}>
              <b className="bf">{he ? "אב" : "Aa"}</b>
              <p dir="ltr">
                {bp.brand.fonts[0]}
                <br />
                {bp.brand.fonts[1]}
              </p>
            </div>
            <div className="awn tv" style={rv(0.42, 0.5)} />
            <div className="sw">
              {SWATCHES.map((hex, i) => (
                <i key={hex} className="tv" dir="ltr" style={{ ...rv(0.29 + i * 0.022, 0.35 + i * 0.022), background: hex }}>
                  {hex}
                </i>
              ))}
            </div>
          </div>
        </div>

        <div className="browser rv" style={rv(0.56, 0.68)}>
          <div className="bar">
            <i />
            <i />
            <i />
            <span dir="ltr">{s.domain}</span>
          </div>
          <div className="page">
            <div className="nav">
              <Mark he={he} />
              <b className="bf">{s.name}</b>
              {s.site.links.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <div className="pg-hero">
              <div>
                <p className="k">{s.trade}</p>
                <h3 className="bf">{s.site.headline}</h3>
                <p className="sub">{bp.web.sub}</p>
                <em>{s.site.cta}</em>
              </div>
              <div className="shot tv" style={{ ...rv(0.62, 0.74), backgroundImage: `url(/street${he ? "/he" : ""}/day-11.jpg)` }} />
            </div>
            <div className="cards">
              {bp.web.cards.map(([name, note]) => (
                <div key={name}>
                  <strong>{name}</strong>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="app rv" style={rv(0.76, 0.87)}>
          <Phone time="23:48">
            <div className="mini">
              <header>
                <Mark he={he} />
                <span>{bp.app.hello}</span>
                <strong className="bf">{bp.app.who}</strong>
              </header>
              <div className="mini-card">
                <span>{bp.app.ticket[0]}</span>
                <strong>{bp.app.ticket[1]}</strong>
                <span>{bp.app.ticket[2]}</span>
              </div>
              <ul>
                {bp.app.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <em>{s.site.cta}</em>
            </div>
          </Phone>
        </div>
      </div>
    </div>
  );
}

export function Morning({ t }: { t: StoryCopy }) {
  const { story: s, c: COPY } = t;
  return (
    <div className="layer morning" data-scene>
      <div className="title">
        <Clock from={MORNING - 37} to={MORNING} a={0} b={0.3} className="rv" style={rv(0, 0.1)} />
        <h2 className="rv" style={rv(0.1, 0.2)}>
          {COPY.morning}
        </h2>
        <p className="made-up rv" style={rv(0.76, 0.84)}>
          {COPY.madeUp}
        </p>
      </div>

      <Phone className="rise light" style={rv(0.08, 0.28)} time="07:12">
        <div className="digest">
          <p className="eyebrow">{COPY.morningSub}</p>
          <strong className="digest-name">{s.name}</strong>
          {s.morning.map(([head, detail], i) => (
            <div key={head} className="digest-row rv" style={rv(0.3 + i * 0.09, 0.38 + i * 0.09)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              <p>
                <strong>{head}</strong>
                <span>{detail}</span>
              </p>
            </div>
          ))}
          <p className="digest-foot rv" style={rv(0.68, 0.76)}>
            {COPY.digestFoot}
          </p>
        </div>
      </Phone>
    </div>
  );
}

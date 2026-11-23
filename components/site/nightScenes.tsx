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

const Phone = ({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <div className={`phone ${className}`} style={style}>
    <div className="screen">{children}</div>
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
          {COPY.hook}
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
        </div>
      </Phone>
    </div>
  );
}

export function Rewind({ t }: { t: StoryCopy }) {
  const COPY = t.c;
  return (
    <div className="layer rewind" data-scene>
      <svg className="dial" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" pathLength="1" />
        <g>
          {Array.from({ length: 60 }, (_, i) => (
            <line key={i} x1="100" y1={i % 5 ? 7 : 4} x2="100" y2="11" transform={`rotate(${i * 6} 100 100)`} />
          ))}
        </g>
        <path d="M100 15V5" />
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

      <Phone className="rise x" style={rv(0, 0.1, 0.94, 1)}>
        <div className="chat">
          <header>
            <b className="avatar">{s.name[0]}</b>
            <p>
              <strong>{s.name}</strong>
              <span>{COPY.awake}</span>
            </p>
            <Clock from={NIGHT} to={NIGHT + 1} a={0.6} b={0.61} />
          </header>
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

export function Face({ t }: { t: StoryCopy }) {
  const { story: s, c: COPY } = t;
  return (
    <div className="layer face" data-scene>
      <div className="title rv x" style={rv(0, 0.08, 0.94, 1)}>
        <p className="eyebrow">{COPY.faceEyebrow}</p>
        <h2>{COPY.face}</h2>
        <p className="lead">{COPY.faceSub}</p>
      </div>

      <div className="set x" style={rv(0, 0.1, 0.94, 1)}>
        <div className="browser">
          <div className="bar">
            <i />
            <i />
            <i />
            <span>{s.domain}</span>
          </div>
          <div className="page">
            <div className="blk nav" style={rv(0.12, 0.18)}>
              <div>
                <b>{s.name}</b>
                {s.site.links.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
            <div className="blk head" style={rv(0.2, 0.32)}>
              <div>
                <p>{t.story.trade}</p>
                <h3>{s.site.headline}</h3>
              </div>
            </div>
            <div className="blk art" style={rv(0.3, 0.42)}>
              <div>
                <b>{s.name[0]}</b>
              </div>
            </div>
            <div className="blk btn" style={rv(0.4, 0.46)}>
              <div>{s.site.cta}</div>
            </div>
            <div className="widget rv" style={rv(0.46, 0.54)}>
              <p className="bubble them">{s.confirm}</p>
              <p className="bubble us">{s.done}</p>
            </div>
          </div>
          <span className="tag rv" style={rv(0.5, 0.55)}>
            {COPY.faceParts[0]}
          </span>
        </div>

        <div className="app rv" style={rv(0.58, 0.7)}>
          <Phone>
            <div className="mini">
              <b className="avatar">{s.name[0]}</b>
              <strong>{s.name}</strong>
              <div className="mini-card">
                <strong>{s.ticket[0]}</strong>
                <span>{s.ticket[1]}</span>
              </div>
              <i />
              <i />
              <em>{s.site.cta}</em>
            </div>
          </Phone>
          <span className="tag">{COPY.faceParts[1]}</span>
        </div>

        <div className="brand rv" style={rv(0.7, 0.82)}>
          <div className="brand-card">
            <b>{s.name[0]}</b>
            <strong>{s.name}</strong>
            <p>
              <i />
              <i />
              <i />
              <span>Aa</span>
            </p>
          </div>
          <span className="tag">{COPY.faceParts[2]}</span>
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
        <p className="made-up rv" style={rv(0.7, 0.78)}>
          {COPY.madeUp}
        </p>
      </div>

      <Phone className="rise" style={rv(0.08, 0.28)}>
        <div className="digest">
          <p className="eyebrow">{COPY.morningSub}</p>
          <strong className="digest-name">{s.name}</strong>
          {s.morning.map(([head, detail], i) => (
            <div key={head} className="digest-row rv" style={rv(0.3 + i * 0.12, 0.38 + i * 0.12)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              <p>
                <strong>{head}</strong>
                <span>{detail}</span>
              </p>
            </div>
          ))}
        </div>
      </Phone>
    </div>
  );
}

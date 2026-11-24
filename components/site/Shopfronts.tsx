"use client";

import { useEffect, useState } from "react";
import { CLIENTS } from "@/lib/clients";
import { COPY, type Lang } from "@/lib/copy";

export function Shopfronts({ lang }: { lang: Lang }) {
  const c = COPY[lang].clients;
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setOn((i) => (i + 1) % CLIENTS.length), 4500);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setOn(i);
  };

  return (
    <div className="shops" data-id={CLIENTS[on].id}>
      <div className="stage" aria-hidden="true">
        {CLIENTS.map((s, i) => (
          <img key={s.id} src={`/customers/${s.id}.jpg`} alt="" loading="lazy" data-on={i === on} />
        ))}
      </div>
      <div className="shops-text">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.head}</h2>
        <p className="lead">{c.body}</p>
        <ul>
          {CLIENTS.map((s, i) => (
            <li key={s.id}>
              <button type="button" data-id={s.id} aria-pressed={i === on} onClick={() => pick(i)} onMouseEnter={() => pick(i)}>
                <b>{s.name[lang]}</b>
                <small>{s.trade[lang]}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { COPY, type Lang } from "@/lib/copy";

// live.mp4 plays the arrival once, then repeats from here
const LOOP = 10.04;

export function Close({ lang }: { lang: Lang }) {
  const c = COPY[lang].close;
  const film = useRef<HTMLVideoElement>(null);
  const dir = lang === "he" ? "/street/he" : "/street";

  useEffect(() => {
    const v = film.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const again = () => {
      v.currentTime = LOOP;
      v.play().catch(() => {});
    };
    const seen = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    v.addEventListener("ended", again);
    seen.observe(v);
    return () => {
      v.removeEventListener("ended", again);
      seen.disconnect();
    };
  }, []);

  return (
    <section className="close">
      <div className="stage" aria-hidden="true">
        <video ref={film} src={`${dir}/live.mp4`} poster={`${dir}/live.jpg`} muted playsInline preload="none" />
      </div>
      <p className="eyebrow">{c.eyebrow}</p>
      <h2>{c.head}</h2>
      <p>{c.body}</p>
      <Link href="/contact" className="cta">
        {c.button}
      </Link>
    </section>
  );
}

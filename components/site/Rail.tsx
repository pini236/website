"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/copy";
import { locate } from "@/lib/night";
import { sceneProgress } from "@/lib/scroll";
import { BLOCKS, STORY, type BlockId } from "@/lib/story";

const BUILT: Record<BlockId, number> = { brand: 0.46, web: 0.52, app: 0.58, film: 0.64, agent: 0.82, mind: 0.86, flow: 0.9 };

const progress = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  return sceneProgress(-r.top, r.height, innerHeight);
};

export function Rail({ lang }: { lang: Lang }) {
  const t = STORY[lang];
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current!;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const street = progress("street");
      const nightEl = document.getElementById("night")!.getBoundingClientRect();
      const inNight = nightEl.top < innerHeight / 2 && nightEl.bottom > innerHeight / 2;
      const scene = inNight ? locate(progress("night")).index : -1;
      const day = document.getElementById("day")!.getBoundingClientRect();
      const inDay = day.top < innerHeight / 2 && day.bottom > innerHeight / 2;
      const dayP = progress("day");
      const plan = document.getElementById("plan")!.getBoundingClientRect();
      const inPlan = plan.top < innerHeight * 0.6 && plan.bottom > innerHeight * 0.4;
      const past = nightEl.top < innerHeight;
      const now = new Set<BlockId>();
      if (scene === 2) now.add("agent");
      if (scene === 3) ["web", "app", "brand"].forEach((b) => now.add(b as BlockId));
      if (inDay) (dayP < 0.47 ? ["agent", "flow"] : ["mind", "flow"]).forEach((b) => now.add(b as BlockId));
      if (inPlan) BLOCKS.forEach((b) => now.add(b));
      for (const li of Array.from(el.children) as HTMLElement[]) {
        const id = li.dataset.id as BlockId;
        li.dataset.built = String(past || street >= BUILT[id]);
        li.dataset.now = String(now.has(id));
      }
      el.dataset.show = String(innerHeight - plan.bottom < 0 || plan.bottom > innerHeight * 0.2);
    };
    const kick = () => {
      raf ||= requestAnimationFrame(frame);
    };
    kick();
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol ref={root} className="rail" aria-label={t.rail} data-show="true">
      {BLOCKS.map((b) => (
        <li key={b} data-id={b} data-built="false" data-now="false">
          <i />
          <span>{t.blocks[b]}</span>
        </li>
      ))}
    </ol>
  );
}

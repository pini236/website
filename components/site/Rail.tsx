"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Lang } from "@/lib/copy";
import { locate } from "@/lib/night";
import { sceneProgress } from "@/lib/scroll";
import { BLOCKS, STORY, type BlockId } from "@/lib/story";

const BUILT: Record<BlockId, number> = { brand: 0.42, web: 0.48, app: 0.54, film: 0.6, agent: 0.78, mind: 0.82, flow: 0.86 };

// Where a click lands: section id and how far into it.
const TARGET: Record<BlockId, [string, number]> = {
  brand: ["street", BUILT.brand + 0.02],
  web: ["street", BUILT.web + 0.02],
  app: ["street", BUILT.app + 0.02],
  film: ["street", BUILT.film + 0.02],
  agent: ["night", 0.49],
  mind: ["day", 0.93],
  flow: ["day", 0.56],
};

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

  const go = (id: BlockId) => {
    const [section, at] = TARGET[id];
    const r = document.getElementById(section)!.getBoundingClientRect();
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollTo({ top: scrollY + r.top + at * (r.height - innerHeight), behavior: still ? "auto" : "smooth" });
  };

  return (
    <ol ref={root} className="rail" aria-label={t.rail} data-show="true">
      {BLOCKS.map((b, i) => (
        <li key={b} data-id={b} data-built="false" data-now="false" style={{ "--i": i } as CSSProperties}>
          <button type="button" onClick={() => go(b)} aria-label={`${t.blocks[b]}: ${t.bp.say[b]}`}>
            <i />
            <span className="tip" aria-hidden="true">
              <b dir="auto">{t.blocks[b]}</b>
              <em dir="auto">{t.bp.say[b]}</em>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

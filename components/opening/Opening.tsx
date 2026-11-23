"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { BUSINESSES, BUSINESS_ORDER, DEFAULT_BUSINESS, OPENING, type BusinessId } from "@/lib/businesses";
import "./opening.css";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

class Boundary extends Component<{ onFail: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let webgl: boolean | undefined;
const hasWebgl = () => (webgl ??= !!document.createElement("canvas").getContext("webgl2"));
const never = () => () => {};

const motionQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");
const onMotionChange = (cb: () => void) => {
  const q = motionQuery();
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};

export function Opening({ fallback }: { fallback: ReactNode }) {
  const [business, setBusiness] = useState<BusinessId>(DEFAULT_BUSINESS);
  const [failed, setFailed] = useState(false);
  const probed = useSyncExternalStore(never, hasWebgl, () => null);
  const supported = probed === null ? null : probed && !failed;
  const reducedMotion = useSyncExternalStore(onMotionChange, () => motionQuery().matches, () => false);
  const { accent, lead } = BUSINESSES[business];

  return (
    <section className={supported === false ? "opening flat" : "opening"} style={{ "--acc": accent } as CSSProperties}>
      <div className="opening-copy">
        <p className="eyebrow">{OPENING.eyebrow}</p>
        <h1>
          {OPENING.headline}
          <em>{OPENING.headlineAccent}</em>
        </h1>
        <p className="lead" aria-live="polite">
          {lead}
        </p>
        <p className="opening-ask" id="opening-ask">
          {OPENING.ask}
        </p>
        <div className="opening-picker" role="group" aria-labelledby="opening-ask">
          {BUSINESS_ORDER.map((id) => (
            <button key={id} type="button" aria-pressed={id === business} onClick={() => setBusiness(id)}>
              {BUSINESSES[id].label}
            </button>
          ))}
        </div>
        <Link href="/contact" className="cta">
          {OPENING.cta}
        </Link>
      </div>
      {supported === false && fallback}
      {supported && (
        <Boundary onFail={() => setFailed(true)}>
          <div className="opening-stage" aria-hidden="true">
            <Scene business={business} reducedMotion={reducedMotion} />
            <div className="opening-glow" />
          </div>
        </Boundary>
      )}
    </section>
  );
}

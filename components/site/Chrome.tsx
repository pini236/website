import Link from "next/link";
import { COPY, type Lang } from "@/lib/copy";
import { site } from "@/lib/site";

export function Header({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <header className="top">
      <Link href={lang === "he" ? "/he" : "/"} className="mark" dir="ltr">
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path d="M6 30 20 16l14 14" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="6" r="3.6" fill="var(--gold)" />
        </svg>
        <span>
          Rooftop <em>AI Studio</em>
        </span>
      </Link>
      <nav>
        <Link href={c.other.href} className="lang" lang={lang === "he" ? "en" : "he"}>
          {c.other.label}
        </Link>
        <Link href="/contact" className="pill">
          {c.nav}
        </Link>
      </nav>
    </header>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const f = COPY[lang].foot;
  return (
    <footer className="foot">
      <span>
        © 2026 {site.name}. {f.built} {site.owner}.
      </span>
      <nav>
        <Link href="/privacy">{f.privacy}</Link>
        <Link href="/delete-account">{f.remove}</Link>
        <Link href="/contact">{f.contact}</Link>
      </nav>
    </footer>
  );
}

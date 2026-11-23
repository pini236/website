import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["600", "800"] });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | AI studio for businesses`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <header className="top">
          <Link href="/" className="mark">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M6 30 20 16l14 14" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="6" r="3.6" fill="var(--gold)" />
            </svg>
            <span>
              Rooftop <em>AI Studio</em>
            </span>
          </Link>
          <Link href="/contact" className="pill">
            Talk to me
          </Link>
        </header>
        {children}
        <footer className="foot">
          <span>
            © 2026 {site.name}. Built by {site.owner}.
          </span>
          <nav>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/delete-account">Delete my data</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}

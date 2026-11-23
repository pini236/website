import type { Metadata } from "next";
import { Syne, Instrument_Sans } from "next/font/google";
import { Footer, Header } from "@/components/site/Chrome";
import { site } from "@/lib/site";
import "@/app/globals.css";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["600", "800"] });
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | AI studio for businesses`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { languages: { en: "/", he: "/he" } },
  openGraph: { title: site.name, description: site.description, url: site.url, siteName: site.name, type: "website", images: ["/street/day-21.jpg"] },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header lang="en" />
        {children}
        <Footer lang="en" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { Footer, Header } from "@/components/site/Chrome";
import { COPY } from "@/lib/copy";
import { site } from "@/lib/site";
import "@/app/globals.css";

const font = Heebo({ variable: "--font-body", subsets: ["hebrew", "latin"] });
const brand = Frank_Ruhl_Libre({ variable: "--font-brand", subsets: ["hebrew", "latin"] });
const c = COPY.he;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | סטודיו AI לעסקים`,
  description: `${c.landing.join(" ")} ${c.lights.sub}`,
  alternates: { languages: { en: "/", he: "/he" } },
  openGraph: { title: site.name, description: c.landing.join(" "), url: `${site.url}/he`, siteName: site.name, type: "website", locale: "he_IL", images: ["/street/day-21.jpg"] },
};

export default function HebrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${font.variable} ${brand.variable}`}>
      <body>
        <Header lang="he" />
        {children}
        <Footer lang="he" />
      </body>
    </html>
  );
}

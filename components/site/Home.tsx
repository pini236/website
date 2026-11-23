import Link from "next/link";
import { COPY, type Lang } from "@/lib/copy";
import { OneDay } from "./OneDay";
import { Street } from "./Street";
import "./site.css";

export function Home({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <main>
      <Street lang={lang} />
      <OneDay lang={lang} />
      <section className="who">
        <h2>{c.who.head}</h2>
        <div>
          <p>{c.who.body}</p>
          <p className="quiet">{c.who.sample}</p>
        </div>
      </section>
      <section className="close">
        <h2>{c.close.head}</h2>
        <p>{c.close.body}</p>
        <Link href="/contact" className="cta">
          {c.close.button}
        </Link>
      </section>
    </main>
  );
}

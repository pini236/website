import Link from "next/link";
import { COPY, type Lang } from "@/lib/copy";
import { Blueprint } from "./Blueprint";
import { Day } from "./Day";
import { Night } from "./Night";
import { Rail } from "./Rail";
import { Street } from "./Street";
import "./site.css";

export function Home({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <main>
      <Rail lang={lang} />
      <Street lang={lang} />
      <Night lang={lang} />
      <Day lang={lang} />
      <section className="after">
        <p>{c.day.close}</p>
        <p className="next">{c.day.next}</p>
      </section>
      <Blueprint lang={lang} />
      <section className="who">
        <div>
          <p className="eyebrow">{c.who.eyebrow}</p>
          <h2>{c.who.head}</h2>
        </div>
        <div>
          <p>{c.who.body}</p>
          <ol className="steps">
            {c.who.steps.map(([t, d]) => (
              <li key={t}>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
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

import { COPY, type Lang } from "@/lib/copy";
import { Blueprint } from "./Blueprint";
import { Close } from "./Close";
import { Customers } from "./Customers";
import { Day } from "./Day";
import { Night } from "./Night";
import { Rail } from "./Rail";
import { Street } from "./Street";
import "./site.css";

export function Home({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const dir = lang === "he" ? "/street/he" : "/street";
  const shots = [`${dir}/scaf.jpg`, "/street/xray.jpg", `${dir}/live.jpg`];
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
      <Customers lang={lang} />
      <section className="who">
        <div className="who-head">
          <div>
            <p className="eyebrow">{c.who.eyebrow}</p>
            <h2>{c.who.head}</h2>
          </div>
          <p>{c.who.body}</p>
        </div>
        <ol className="steps">
          {c.who.steps.map(([t, d], i) => (
            <li key={t}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shots[i]} alt="" loading="lazy" />
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </section>
      <Close lang={lang} />
    </main>
  );
}

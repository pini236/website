import Link from "next/link";
import { CLIENTS, CONCEPTS } from "@/lib/clients";
import { COPY, type Lang } from "@/lib/copy";

export function Customers({ lang }: { lang: Lang }) {
  const c = COPY[lang].clients;
  return (
    <section className="clients" id="customers">
      <p className="eyebrow">{c.eyebrow}</p>
      <h2>{c.head}</h2>
      <p className="lead">{c.body}</p>
      <ul className="signs">
        {CLIENTS.map((s) => (
          <li key={s.id} className="sign" data-id={s.id}>
            <b dir="auto">{s.name[lang]}</b>
            <small>{s.trade[lang]}</small>
          </li>
        ))}
      </ul>
      <div className="clients-next">
        <h3>{c.next}</h3>
        <p>{c.nextBody}</p>
      </div>
      <ul className="signs ideas">
        {CONCEPTS.map((s) => (
          <li key={s.id} className="sign idea">
            <em>{c.concept}</em>
            <b>{s.name[lang]}</b>
            <small>{s.trade[lang]}</small>
          </li>
        ))}
        <li className="sign yours">
          <Link href="/contact">
            <b>{c.yours}</b>
            <small>{c.write}</small>
          </Link>
        </li>
      </ul>
    </section>
  );
}

import Link from "next/link";
import { Story } from "@/components/story/Story";
import { COPY } from "@/lib/story";

const face = [
  ["Websites", "that stop the scroll and sell"],
  ["Brands", "name, look and voice, start to finish"],
  ["Apps and games", "on the web, iPhone and Android"],
  ["Custom platforms", "built around the way you work"],
  ["Brand videos", "made in days, not months"],
];
const brain = [
  ["AI agents", "that answer, book, sell and follow up"],
  ["A second brain", "everything your business knows, ready to answer"],
  ["Automations", "the boring work, done by itself"],
  ["AI trained on your business", "your documents, your data, your tone"],
  ["Product planning", "from a fuzzy idea to a clear first version"],
];

const List = ({ rows }: { rows: string[][] }) => (
  <ul>
    {rows.map(([a, b]) => (
      <li key={a}>
        <strong>{a}</strong>
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

export default function Home() {
  return (
    <main>
      <Story />

      <div className="day">
        <section className="promise">
          <h2>
            {COPY.promise}
            <em>{COPY.promiseAccent}</em>
          </h2>
        </section>

        <section className="split" id="what">
          <article>
            <p className="eyebrow">Outside</p>
            <h2>The face</h2>
            <p className="sub">Everything your customers see and touch.</p>
            <List rows={face} />
          </article>
          <article>
            <p className="eyebrow">Inside</p>
            <h2>The brain</h2>
            <p className="sub">Everything that works while you sleep.</p>
            <List rows={brain} />
          </article>
        </section>

        <section className="closing">
          <h2>{COPY.closing}</h2>
          <Link href="/contact" className="cta">
            {COPY.cta}
          </Link>
        </section>
      </div>
    </main>
  );
}

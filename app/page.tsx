import Link from "next/link";
import { Opening } from "@/components/opening/Opening";
import { Skyline } from "@/components/Skyline";

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
      <Opening fallback={<Skyline />} />

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
        <h2>Tell me what you run. I will show you the view from the roof.</h2>
        <Link href="/contact" className="cta">
          Talk to me
        </Link>
        <p className="note">This is the first version of the site. The full experience is being built.</p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: `Contact ${site.name}.` };

export default function Contact() {
  return (
    <main className="doc">
      <h1>Contact</h1>
      <p>
        {site.name} is run by {site.owner}. For a new project, a question about one of my apps, or anything else, write to me
        and I will answer personally.
      </p>
      <p>
        <a className="cta" href={mailto("Hello from the Rooftop website")}>
          {site.email}
        </a>
      </p>
      <h2>App support</h2>
      <p>
        If your message is about an app published by {site.name} on Google Play, please include the app name and what happened,
        so I can help quickly.
      </p>
    </main>
  );
}

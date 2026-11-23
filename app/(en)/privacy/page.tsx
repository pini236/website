import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy", description: `Privacy policy of ${site.name}.` };

export default function Privacy() {
  return (
    <main className="doc">
      <h1>Privacy policy</h1>
      <p className="meta">Last updated: 23 November 2026</p>
      <p>
        This policy covers this website and the apps published by {site.name} on Google Play. {site.name} is run by{" "}
        {site.owner}. An app may have its own privacy page with more detail; where it does, that page comes first for that app.
      </p>

      <h2>This website</h2>
      <p>
        This website has no accounts, no advertising and no tracking cookies. The hosting provider, Vercel, keeps standard
        technical logs (such as IP address and browser type) to run and protect the service. If you email me, I keep your
        message so that I can answer it.
      </p>

      <h2>The apps</h2>
      <ul>
        <li>An app collects only the data it needs in order to work. What each app collects is listed in its Google Play data safety section.</li>
        <li>Your data is used to provide the app to you, to fix problems and to keep the app secure.</li>
        <li>I do not sell personal data, and I do not share it for advertising.</li>
        <li>Data is shared with service providers only when the app needs them to work, such as hosting, sign-in or payments.</li>
        <li>Data is sent over encrypted connections.</li>
      </ul>

      <h2>How long data is kept</h2>
      <p>
        Data is kept for as long as you use the app, and deleted when you ask. Records the law requires me to keep are kept only
        for as long as the law requires.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete your data at any time. See <Link href="/delete-account">Delete my account and data</Link>,
        or write to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Children</h2>
      <p>
        The apps are not directed at children under 13, and I do not knowingly collect their data. If you believe a child has
        given personal data, write to me and I will delete it.
      </p>

      <h2>Changes</h2>
      <p>If this policy changes, the new version is published on this page with a new date.</p>

      <h2>Contact</h2>
      <p>
        {site.owner}, {site.name}: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </main>
  );
}

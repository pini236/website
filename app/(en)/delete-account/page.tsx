import type { Metadata } from "next";
import { mailto, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete my account and data",
  description: `How to ask ${site.name} to delete your account and data.`,
};

const body = "App name:\nEmail or phone used in the app:\n\nPlease delete my account and all data linked to it.";

export default function DeleteAccount() {
  return (
    <main className="doc">
      <h1>Delete my account and data</h1>
      <p>
        You can ask for your account and the data linked to it to be deleted from any app published by {site.name}, at any time
        and without giving a reason.
      </p>
      <h2>How to ask</h2>
      <ol>
        <li>Send an email with the button below.</li>
        <li>Write the app name and the email or phone number you used in the app.</li>
        <li>I confirm the request by reply, to make sure it really comes from you.</li>
      </ol>
      <p>
        <a className="cta" href={mailto("Delete my account and data", body)}>
          Send a deletion request
        </a>
      </p>
      <h2>What happens next</h2>
      <ul>
        <li>Your account and the personal data linked to it are deleted within 30 days of confirmation.</li>
        <li>Records that the law requires me to keep, such as payment records, are kept only for as long as the law requires.</li>
        <li>You get an email when the deletion is done.</li>
      </ul>
      <p>
        If the button does not open your mail app, write to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </main>
  );
}

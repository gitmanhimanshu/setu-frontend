import type { Metadata } from "next";
import LegalPage, { Section, Table } from "@/components/LegalPage";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What Setu stores, what it can and cannot see in your Google account, and how to delete your data.",
};

const UPDATED = "20 July 2026";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated={UPDATED}
      intro="Setu sends email from your own Gmail account. This page sets out exactly what it can see, what it stores, and how to remove it."
    >
      <Section title="The short version">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Setu can send email as you. It cannot read your inbox.</li>
          <li>It never sees or stores your Google password.</li>
          <li>It stores no Google tokens at rest.</li>
          <li>Your data is never sold, and never used for advertising.</li>
          <li>You can revoke access and request deletion at any time.</li>
        </ul>
      </Section>

      <Section title="What Setu accesses in your Google account">
        <p>
          When you connect Setu, Google asks you to grant these permissions and
          nothing else:
        </p>
        <Table
          head={["Permission", "Why"]}
          rows={[
            [
              <code key="1">gmail.send</code>,
              "To send the emails you approve, from your account.",
            ],
            [
              <code key="2">userinfo.email</code>,
              "To know which account you are, so your data is yours.",
            ],
            [<code key="3">openid</code>, "Standard sign-in identifier."],
          ]}
        />
        <p>
          <strong className="text-[var(--text-primary)]">
            Setu cannot read your inbox.
          </strong>{" "}
          Reading mail requires a separate permission
          (<code>gmail.readonly</code> or similar) that Setu never requests and
          could not use. This is not a policy choice we could quietly reverse —
          it is the boundary Google enforces on the permission you granted.
          Replies from the people you email go to your inbox only.
        </p>
      </Section>

      <Section title="What Setu stores">
        <Table
          head={["Data", "Why it exists"]}
          rows={[
            [
              "Your Google account ID, email address, and name",
              "To identify you across sessions and clients.",
            ],
            [
              "Your role, saved links and their descriptions",
              "To attach the right resume or portfolio to your emails.",
            ],
            [
              "Files you upload",
              "So the document can be linked in the emails you send.",
            ],
            [
              "A record of each email sent: recipient, company, subject, time, and whether it succeeded",
              "To show your history, enforce sending limits, and avoid emailing the same person twice.",
            ],
            [
              "Link-open counts and timestamps",
              "To tell you when a follow-up is worth making.",
            ],
            [
              "Plan and subscription dates",
              "To apply the free allowance and any paid plan.",
            ],
          ]}
        />
        <p>
          <strong className="text-[var(--text-primary)]">
            Setu does not store Google access or refresh tokens.
          </strong>{" "}
          The OAuth layer supplies a short-lived token per request, so there is
          no credential of yours sitting in the database.
        </p>
        <p>
          Email bodies are not stored. Setu keeps the subject line and the
          recipient for your history, not the text you sent.
        </p>
      </Section>

      <Section title="Link tracking, and the people you email">
        <p>
          When Setu attaches your resume link, it wraps it in a redirect so it
          can count opens. If the recipient clicks it, Setu records that a click
          happened and when, then sends them straight on to your document.
        </p>
        <p>
          This is worth being plain about, because it affects someone who never
          signed up for Setu:{" "}
          <strong className="text-[var(--text-primary)]">
            recipients are not individually identified.
          </strong>{" "}
          Setu records a count and a timestamp against the email you sent. It
          does not build a profile of the recipient, and does not sell or share
          this with anyone.
        </p>
        <p>
          An open is also only a signal, not proof — automated link scanners
          exist, and a person can read your email without clicking anything.
        </p>
      </Section>

      <Section title="Website visitors">
        <p>
          When you visit this site, Setu records your IP address, an approximate
          location derived from it (city, region, country, network), your browser
          user agent, and which page you opened. Repeat visits from the same IP
          increment a counter rather than creating new records.
        </p>
        <p>
          This is used to understand traffic. It is visible only to the site
          operator, and is not used for advertising or shared with advertisers.
        </p>
      </Section>

      <Section title="Who else is involved">
        <p>Setu relies on these services to operate:</p>
        <Table
          head={["Service", "Role"]}
          rows={[
            ["Google", "Sign-in and the Gmail API that delivers your email."],
            ["Neon", "The database where the data above is stored."],
            ["Render", "Hosting for the Setu server."],
            ["Vercel", "Hosting for this website."],
            ["ip-api.com", "Turns a visitor IP into an approximate location."],
          ]}
        />
        <p>
          Your data is not sold, rented, or shared with anyone beyond what these
          services need to do their job.
        </p>
      </Section>

      <Section title="Google API Services Limited Use">
        <p>
          Setu&apos;s use of information received from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--accent)] hover:underline"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. Specifically, data obtained
          through Google APIs is used only to provide the features described
          here, is not transferred to others except as required to operate the
          service or by law, is not used for advertising, and is not read by
          humans except with your explicit permission, for security purposes, or
          where required by law.
        </p>
      </Section>

      <Section title="Deleting your data">
        <p>Two independent steps, both available to you at any time:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-[var(--text-primary)]">Revoke access</strong>{" "}
            at{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--accent)] hover:underline"
            >
              myaccount.google.com/permissions
            </a>
            . Setu immediately loses the ability to send anything. You do not
            need our cooperation for this.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">
              Request deletion
            </strong>{" "}
            by emailing{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent)] hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            from your Setu account address. Your record, saved links, uploaded
            files, and send history are removed.
          </li>
        </ul>
        <p>
          Emails already delivered cannot be recalled — they are in the
          recipient&apos;s mailbox, outside Setu&apos;s reach.
        </p>
      </Section>

      <Section title="Reading the code">
        <p>
          Setu is open source. If a claim on this page matters to you, you can
          check it against the implementation rather than take our word for it:{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--accent)] hover:underline"
          >
            {GITHUB_URL.replace("https://", "")}
          </a>
          .
        </p>
      </Section>

      <Section title="Changes and contact">
        <p>
          If this policy changes in a way that affects what is collected or how
          it is used, the date at the top will change. Questions, corrections, or
          deletion requests:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent)] hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import LegalPage, { Section } from "@/components/LegalPage";
import { CONTACT_EMAIL, GITHUB_URL, LIMITS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "The terms for using Setu: what it does, what you're responsible for, sending limits, and plans.",
};

const UPDATED = "20 July 2026";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      updated={UPDATED}
      intro="Plain terms for using Setu. By connecting Setu to your Google account, you agree to them."
    >
      <Section title="What Setu is">
        <p>
          Setu is a Model Context Protocol server that lets an AI assistant —
          Claude, ChatGPT, or any compatible client — send email from your own
          Gmail account. The assistant writes; you approve; Setu delivers.
        </p>
        <p>
          Setu is not an email provider. Delivery happens through Google&apos;s
          Gmail API using the permission you granted, and Google&apos;s own terms
          and sending limits apply on top of these.
        </p>
      </Section>

      <Section title="The emails are yours">
        <p>
          This is the most important term here. Email sent through Setu leaves{" "}
          <strong className="text-[var(--text-primary)]">your</strong> account,
          under your name, and appears in your Sent folder. You are responsible
          for it — its content, its recipients, and its consequences.
        </p>
        <p>
          Setu shows you recipients and drafts before sending and asks for your
          approval. An AI assistant can still make mistakes, so read what you are
          about to send. Approving a batch means you take responsibility for it.
        </p>
      </Section>

      <Section title="What you must not do">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Send unsolicited bulk email, spam, or marketing blasts.</li>
          <li>
            Impersonate another person or organisation, or misrepresent your
            identity, experience, or qualifications.
          </li>
          <li>Send anything unlawful, harassing, deceptive, or abusive.</li>
          <li>
            Email addresses you scraped indiscriminately, or people who have
            asked you to stop.
          </li>
          <li>
            Work around the sending limits, or use multiple accounts to do so.
          </li>
        </ul>
        <p>
          Accounts used this way may be suspended without notice. The limits
          below exist partly to protect your own account: Gmail penalises senders
          whose mail bounces or gets marked as spam, and that penalty lands on
          you.
        </p>
      </Section>

      <Section title="Limits">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-[var(--text-primary)]">
              {LIMITS.perDay} emails per day
            </strong>{" "}
            per account.
          </li>
          <li>
            <strong className="text-[var(--text-primary)]">
              {LIMITS.perBatch} per batch
            </strong>
            , so you can review as you go.
          </li>
          <li>
            A short pause between sends, because a burst is a pattern Gmail reads
            as automation.
          </li>
          <li>Uploaded files are capped in size and number.</li>
        </ul>
        <p>
          These may change as the service is tuned. Google&apos;s own account
          limits apply regardless of what Setu allows.
        </p>
      </Section>

      <Section title="Plans and payment">
        <p>
          The first {LIMITS.freeEmails} emails are free. Beyond that a paid plan
          is required to keep sending. Only successfully delivered emails count
          against the free allowance — a send that fails does not.
        </p>
        <p>
          Payment is currently arranged manually by contacting us; there is no
          automated billing yet. When that changes, this page will say so before
          it applies to you. Paid plans are prepaid for the period shown on your
          dashboard, and fees already paid are not automatically refundable —
          though if something goes genuinely wrong, write to us.
        </p>
      </Section>

      <Section title="Availability, and no warranty">
        <p>
          Setu is provided as is, without warranty of any kind. It is a small,
          independently run service. It may be unavailable, may lose data, may
          change, and may stop.
        </p>
        <p>
          Setu does not guarantee that any email is delivered, opened, read, or
          replied to. Open tracking is a signal, not proof: automated scanners
          click links, and people read email without clicking anything. Do not
          treat those numbers as certainty.
        </p>
        <p>
          To the fullest extent the law allows, Setu and its author are not
          liable for lost opportunities, lost data, damage to your sending
          reputation, or any indirect or consequential loss arising from your use
          of the service.
        </p>
      </Section>

      <Section title="Ending it">
        <p>
          You can stop at any time by revoking access at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer noopener"
            className="text-[var(--accent)] hover:underline"
          >
            myaccount.google.com/permissions
          </a>
          . Setu immediately loses the ability to send. To have your stored data
          removed as well, see the{" "}
          <a href="/privacy" className="text-[var(--accent)] hover:underline">
            privacy policy
          </a>
          .
        </p>
        <p>
          We may suspend or end access for accounts that breach these terms, or
          if running the service becomes impractical.
        </p>
      </Section>

      <Section title="The code">
        <p>
          Setu is open source and released under the MIT licence. The licence
          covers the code — it does not grant use of the Setu name or logo, and
          it is separate from these terms, which cover the hosted service at this
          domain. You are free to read, fork, and self-host:{" "}
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
          These terms may change; the date at the top will change with them.
          Continuing to use Setu after that means accepting the revised terms.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--accent)] hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}

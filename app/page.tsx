import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Files,
  Gauge,
  KeyRound,
  Layers,
  MailCheck,
  Reply,
  ShieldOff,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Architecture from "@/components/Architecture";
import Aurora from "@/components/Aurora";
import ChatDemo from "@/components/ChatDemo";
import FloatingVideo from "@/components/FloatingVideo";
import Logo from "@/components/Logo";
import { AnimatedTerminal } from "@/components/CodeWindow";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import SignalPreview from "@/components/SignalPreview";
import ContextFirewallAnnouncement from "@/components/ContextFirewallAnnouncement";
import ContextFirewallFloatingCard from "@/components/ContextFirewallFloatingCard";
import { CLIENTS, LIMITS, MCP_URL, TAGLINE, GITHUB_URL } from "@/lib/site";

const features = [
  {
    icon: MailCheck,
    title: "Sends from your Gmail",
    body: "Not a noreply@ nobody answers. It leaves your account, shows in your Sent folder, and replies come back to your inbox.",
  },
  {
    icon: ShieldOff,
    title: "Cannot read your inbox",
    body: "Setu asks Google for one permission: gmail.send. Reading mail needs a scope it never requests and cannot use.",
  },
  {
    icon: FileText,
    title: "Resume link, checked",
    body: "Paste it once and it rides along on every application. Setu fetches it first — a Drive file you forgot to share gets rejected here, not silently in someone's inbox.",
  },
  {
    icon: UserCheck,
    title: "Address verification",
    body: "Optional MX and citation checks catch addresses a model invented from a naming pattern. Those bounce, and bounces cost you deliverability.",
  },
  {
    icon: Layers,
    title: "Batches with a ceiling",
    body: `${LIMITS.perBatch} per call, ${LIMITS.perDay} per day. Small enough that you review as you go instead of finding out afterwards.`,
  },
  {
    icon: Clock,
    title: "Paced sending",
    body: `A ${LIMITS.defaultDelaySeconds}s gap between sends by default. A burst is one of the patterns Gmail reads as automation.`,
  },
  {
    icon: CheckCircle2,
    title: "No duplicate sends",
    body: "Every send is recorded. Setu can check a fresh list against that history before a single email goes out.",
  },
  {
    icon: KeyRound,
    title: "OAuth, no passwords",
    body: "You sign in on Google's page. Setu never sees a password, and stores no token — the OAuth layer issues a fresh one per request.",
  },
  {
    icon: Files,
    title: "A resume per kind of role",
    body: "Save as many as you like — backend, frontend, general — each with a note on what it emphasises. Paste a job description and Setu picks the closest one, or asks you when nothing clearly fits.",
  },
  {
    icon: Reply,
    title: "Smart Follow-ups",
    body: "Since your send history is safely logged, you can effortlessly ask the AI to draft and send follow-up messages to previous contacts.",
  },
];

const steps = [
  { n: 1, title: "Add the URL", body: "One connector URL into Claude, ChatGPT, or any MCP client. Nothing to install." },
  { n: 2, title: "Sign in with Google", body: "Grant one permission — send email. That's the whole auth step." },
  { n: 3, title: "Save your resume link", body: "Setu checks it's publicly openable, then appends it to every application." },
  { n: 4, title: "Extract with LLM", body: "Provide links to LinkedIn or Naukri. Your assistant extracts recruiter emails and job requirements." },
  { n: 5, title: "Read the drafts", body: "Every recipient and a highly-personalized draft are shown before anything leaves. You approve." },
  { n: 6, title: "Sent as you via Setu", body: "Setu securely delivers the email through your own Gmail. Replies go straight to your inbox." },
  { n: 7, title: "Know when to follow up", body: "Setu tracks who opens your link. Five opens this afternoon means follow up today." },
];

const terminalLines = [
  { text: "$ claude mcp add --transport http setu \\" },
  { text: `    ${MCP_URL}`, dim: true },
  { text: "" },
  { text: "\u2713 Connector registered", dim: true },
  { text: "\u2713 Opening Google sign-in\u2026", dim: true },
  { text: "\u2713 Granted: Send email on your behalf", dim: true },
  { text: "" },
  { text: "Connected. Ask Claude to apply somewhere." },
];

export default function Home() {
  return (
    <main>
      <FloatingVideo />
      {/* Hero */}
      <section className="relative isolate">
        <Aurora />

        {/* Context Firewall Teaser Announcement */}
        <div className="mx-auto max-w-6xl px-6 pt-3 sm:pt-5">
          <ContextFirewallAnnouncement />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-3 pb-16 sm:pt-5 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]">
              <Sparkles size={12} className="text-[var(--accent)]" />
              100% Open-Source MCP Server
            </span>

            <div className="mt-7 flex items-center gap-3">
              <Logo size={44} />
              <div>
                <p
                  lang="hi"
                  className="text-3xl font-semibold tracking-tight leading-none"
                >
                  सेतु
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--text-muted)]">
                  Setu
                </p>
              </div>
            </div>

            {/* The <h1> carries the name for search and screen readers; the
                background wordmark is decoration and is aria-hidden. */}
            <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.03]">
              <span className="sr-only">Setu — </span>
              Bridge AI to
              <br />
              Opportunity.
            </h1>

            <h2 className="mt-5 text-xl sm:text-2xl font-medium text-[var(--text-primary)] tracking-tight">
              The 100% Open-Source Email MCP Server
            </h2>

            <p
              lang="hi"
              className="mt-4 text-lg text-[var(--accent)] leading-relaxed"
            >
              {TAGLINE.hi}
            </p>

            <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Setu is a free, fully open-source MCP server that lets Claude, ChatGPT, or Cursor send email outreach and applications directly from your own Gmail — researched by the assistant, and approved by you before it leaves.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--plane)] font-medium hover:opacity-90 transition-opacity"
              >
                Get started
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-medium hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] transition-all"
              >
                <GithubMark />
                Open Source
              </a>
            </div>
          </div>

          <Reveal delay={0.1}>
            <AnimatedTerminal lines={terminalLines} />
          </Reveal>
        </div>
      </section>

      {/* Email Open Tracking — highlighted feature right after hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-[var(--border)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent-glow)] via-[var(--surface)] to-[var(--surface)]">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[var(--accent)]/5 blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Eye size={13} />
                  FOLLOW-UP SIGNALS
                </div>

                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1]">
                  Know exactly when
                  <br />
                  <span className="text-[var(--accent)]">to follow up.</span>
                </h2>

                <p className="mt-5 text-[var(--text-secondary)] leading-relaxed max-w-lg">
                  Every link you send is tracked. But a number on its own tells you
                  nothing — so Setu reads it for you.
                </p>
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-lg">
                  Opened four times this afternoon? Someone is passing your resume
                  around — follow up today. Sent five days ago and never opened? That
                  isn&apos;t rejection, it&apos;s a wrong address or a spam folder, and
                  it&apos;s fixable.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/docs"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--plane)] font-medium hover:opacity-90 transition-opacity"
                  >
                    Start tracking
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <a
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-medium hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] transition-all"
                  >
                    View dashboard
                  </a>
                </div>
              </div>

              {/* Follow-up signals preview */}
              <div className="flex items-center justify-center">
                <Reveal delay={0.15}>
                  <SignalPreview />
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Job Platforms Integration */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--surface-2)]">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {/* Connection Pipeline */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-4 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-[var(--border-strong)] mb-10 shadow-lg max-w-full">
              {/* Firecrawl */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="Firecrawl - Web scraping for LLMs">
                <FirecrawlLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">Firecrawl</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* Exa AI */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="Exa AI - Search engine for AI agents">
                <ExaLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">Exa AI</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* Parallel Search */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="Parallel Search - AI web search system">
                <ParallelLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">Parallel</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* LinkedIn */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="LinkedIn Jobs">
                <LinkedInLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">LinkedIn</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* Naukri */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="Naukri.com">
                <NaukriLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">Naukri</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* Indeed */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs" title="Indeed">
                <IndeedLogo size={22} />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">Indeed</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-base font-medium select-none">+</span>

              {/* Setu */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent)]/30 shadow-xs" title="Setu MCP Server">
                <Logo size={22} />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-[var(--accent)]">SETU</span>
              </div>
              <span className="text-[var(--text-muted)] font-mono text-lg font-bold select-none">=</span>

              {/* Dream Job */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 shadow-xs">
                <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-tight">Your Dream Job</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Automate your entire job hunt
            </h2>
            <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              Setu bridges the gap between AI search engines, job portals, and your inbox. Use{" "}
              <strong className="text-[var(--text-primary)]">Firecrawl</strong>,{" "}
              <strong className="text-[var(--text-primary)]">Exa AI</strong>, and{" "}
              <strong className="text-[var(--text-primary)]">Parallel Search</strong> with your LLM to scout openings, scrape live job requirements, and extract recruiter emails directly from{" "}
              <strong className="text-[var(--text-primary)]">LinkedIn</strong>,{" "}
              <strong className="text-[var(--text-primary)]">Naukri</strong>, and{" "}
              <strong className="text-[var(--text-primary)]">Indeed</strong>. Then, let Setu instantly generate and send the perfect, highly-personalized application on your behalf.
            </p>
          </div>
        </Reveal>
      </section>


      {/* How it works — right after the hero: showing the thing working beats
          explaining the protocol behind it. */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--border)] scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Set up once. After that it&apos;s a sentence in a chat window — and
            Setu tells you what happened next.
          </p>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-2 gap-12">
          <ol className="relative">
            <span
              className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)]"
              aria-hidden="true"
            />
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <li className="relative flex gap-4 pb-7 last:pb-0">
                  <span className="relative z-[1] shrink-0 grid place-items-center w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold tabular">
                    {step.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.1}>
            <ChatDemo />
          </Reveal>
        </div>
      </section>

      {/* Works with */}
      <section className="mx-auto max-w-6xl px-6 py-14 border-t border-[var(--border)]">
        <p className="text-sm text-[var(--text-muted)]">
          Works with any MCP client
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {CLIENTS.map((client) => (
            <span
              key={client.name}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
            >
              <span className="font-medium">{client.name}</span>
              <span className="text-xs text-[var(--text-muted)]">{client.note}</span>
              {client.tested && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  tested
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-5 text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Setu speaks standard Streamable HTTP MCP with OAuth, so any compliant
          client should connect. &ldquo;Tested&rdquo; marks the ones we&apos;ve actually run —
          the rest are expected to work but unverified. These are integrations,
          not endorsements: none of these vendors sponsor or affiliate with Setu.
        </p>
      </section>

      {/* What is MCP */}
      <section id="what-is-mcp" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--border)] scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            What is MCP?
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              An AI assistant can write a good application email. What it
              can&apos;t do, on its own, is send one — it has no hands. Every
              tool it touches has to be wired in, and until recently every
              assistant needed its own wiring.
            </p>
            <p>
              <strong className="text-[var(--text-primary)] font-semibold">
                Model Context Protocol
              </strong>{" "}
              is the standard that fixed that. A tool exposes its capabilities
              once, over MCP, and any compatible client can use them — the same
              way a website works in any browser.
            </p>
            <p>
              Setu is one of those servers. It exposes six things an assistant
              can do with your Gmail, and the assistant decides when to use them.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Architecture />
        </Reveal>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--border)]">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Why this one
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Setu owns the parts a language model shouldn&apos;t be trusted with:
            who you are, what&apos;s already been sent, how much is too much, and
            the send itself.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={Math.min(i * 0.04, 0.2)}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)] transition-all">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                  <feature.icon size={17} strokeWidth={2} />
                </span>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--border)] scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            What Setu can and can&apos;t do
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Most tools ask you to trust a privacy policy. The list below
            isn&apos;t policy — it&apos;s the permission Setu holds. The things
            in the right column aren&apos;t things Setu declines to do. They&apos;re
            things it has no mechanism for.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <Reveal>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Dot ok /> Can
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                <Item ok>Send an email as you, when you approve it</Item>
                <Item ok>Read your name and email address</Item>
                <Item ok>Store your resume link and send history</Item>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Dot /> Cannot
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                <Item>Open your inbox or read a single message</Item>
                <Item>See replies from HR — those go only to you</Item>
                <Item>Know your password. Google handles login</Item>
                <Item>Keep access after you revoke it</Item>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            <Fact icon={KeyRound} title="No tokens at rest">
              The OAuth layer supplies a fresh access token per request. There is
              no credential in the database to steal.
            </Fact>
            <Fact icon={Gauge} title="Limits in code">
              {LIMITS.perDay}/day and {LIMITS.perBatch}/batch are enforced by the
              server, not suggested to the model.
            </Fact>
            <Fact icon={ShieldOff} title="Revoke anytime">
              myaccount.google.com/permissions → remove Setu. The token dies
              immediately, without asking us.
            </Fact>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-20 border-t border-[var(--border)] scroll-mt-20">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Questions
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <Faq />
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-14 text-center">
            <div
              className="absolute inset-x-0 -top-24 h-48 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 100%, var(--accent-glow), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              One URL. Two minutes.
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
              Add the connector, sign in with Google, paste your resume link.
              That&apos;s the entire setup.
            </p>
            <Link
              href="/docs"
              className="group mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--plane)] font-medium hover:opacity-90 transition-opacity"
            >
              Read the docs
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Context Firewall Floating Teaser Card */}
      <ContextFirewallFloatingCard />
    </main>
  );
}

function Dot({ ok = false }: { ok?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="grid place-items-center w-5 h-5 rounded-full text-white text-xs font-bold"
      style={{ background: ok ? "var(--good)" : "var(--critical)" }}
    >
      {ok ? "\u2713" : "\u2715"}
    </span>
  );
}

function Item({ children, ok = false }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        aria-hidden="true"
        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
        style={{ background: ok ? "var(--good)" : "var(--critical)" }}
      />
      <span>
        <span className="sr-only">{ok ? "Can: " : "Cannot: "}</span>
        {children}
      </span>
    </li>
  );
}


function Fact({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof KeyRound;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <span className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
        <Icon size={15} />
      </span>
      <h3 className="mt-3 font-semibold text-sm">{title}</h3>
      <p className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
        {children}
      </p>
    </div>
  );
}


/* Lucide dropped brand icons, so the GitHub mark is inline — same path as Nav. */
function GithubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function FirecrawlLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="Firecrawl">
      <path
        d="M12.001 2C11.666 4.667 9.8 6.9 8.2 9.2c-1.8 2.587-2.6 5.253-1.6 8.267.933 2.8 3.2 4.533 6.133 4.533 3.867 0 6.667-2.8 6.667-6.533 0-4.134-3.334-6.934-4.8-10.4C14.001 3.733 13.067 2.8 12.001 2z"
        fill="#FF5722"
      />
      <path
        d="M12.4 11.2c-.267 1.467-.933 2.667-1.867 3.733-1.067 1.2-1.467 2.4-1.067 3.867.4 1.467 1.467 2.4 2.934 2.4 2 0 3.6-1.6 3.6-3.6 0-2.267-1.867-3.867-2.667-5.8-.4-.4-.667-.667-.933-.6z"
        fill="#FFB300"
      />
    </svg>
  );
}

function ExaLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="Exa AI">
      <rect width="24" height="24" rx="6" fill="#4F46E5" fillOpacity="0.15" />
      <path
        d="M12 3.5L13.3 9.2L19 7L14.7 11.3L20.5 12L14.7 12.7L19 17L13.3 14.8L12 20.5L10.7 14.8L5 17L9.3 12.7L3.5 12L9.3 11.3L5 7L10.7 9.2L12 3.5Z"
        fill="#4F46E5"
        className="dark:fill-indigo-400"
      />
      <circle cx="12" cy="12" r="2.2" fill="#818CF8" />
    </svg>
  );
}

function ParallelLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="Parallel Search">
      <rect width="24" height="24" rx="6" fill="#9333EA" fillOpacity="0.15" />
      <path
        d="M9.5 5.5L6.5 18.5M17.5 5.5L14.5 18.5"
        stroke="#9333EA"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="dark:stroke-purple-400"
      />
      <circle cx="9.5" cy="5.5" r="1.5" fill="#A855F7" />
      <circle cx="14.5" cy="18.5" r="1.5" fill="#A855F7" />
    </svg>
  );
}

function LinkedInLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="LinkedIn">
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <path
        d="M19 19h-2.9v-4.5c0-1.1-.02-2.5-1.5-2.5-1.5 0-1.7 1.2-1.7 2.4V19H10V9.6h2.8v1.3h.04c.39-.74 1.34-1.52 2.76-1.52 2.95 0 3.5 1.94 3.5 4.47V19zM6.7 8.3c-.93 0-1.68-.76-1.68-1.69 0-.93.75-1.69 1.68-1.69.93 0 1.69.76 1.69 1.69 0 .93-.76 1.69-1.69 1.69zm1.45 10.7h-2.9V9.6h2.9V19z"
        fill="white"
      />
    </svg>
  );
}

function NaukriLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="Naukri">
      <rect width="24" height="24" rx="5" fill="#0078DB" />
      <path
        d="M6.5 18V6l6 7.5V6h3v12l-6-7.5V18H6.5z"
        fill="white"
      />
      <circle cx="17.2" cy="6.8" r="1.8" fill="#F16522" />
    </svg>
  );
}

function IndeedLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0" aria-label="Indeed">
      <rect width="24" height="24" rx="5" fill="#2164F4" />
      <path
        d="M9.8 18.5H7.5V10h2.3v8.5zm-.1-10.2c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4 0 .8-.6 1.4-1.4 1.4zm7.6 10.2h-2.3v-4.3c0-1.1-.4-1.8-1.4-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8v4.3H9.8V10h2.2v1.2h.03c.3-.6 1.1-1.4 2.4-1.4 1.7 0 2.9 1.1 2.9 3.5v5.2z"
        fill="white"
      />
      <path
        d="M17.5 5.5c-.8.5-1.9.9-3.2 1.1-.4.1-.7.1-1.1.1 0 0 .5-.9 1.4-1.4.8-.5 1.8-.7 2.9-.7v.9z"
        fill="#FFD54F"
      />
    </svg>
  );
}

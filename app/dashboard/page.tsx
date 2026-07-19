"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  FileText,
  LogOut,
  Mail,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import { HeroFigure, Meter, StatTile, StatusPill } from "@/components/StatTile";
import { CopyButton } from "@/components/CodeWindow";
import { MCP_URL } from "@/lib/site";
import { fetchStats, formatWhen, type Stats } from "@/lib/setu";
import { requestAccessToken } from "@/lib/google";

/* The user dashboard. Sign-in is Google Identity Services in a popup; the
   access token lives in sessionStorage as `setu_token` (the contract /api/stats
   was built for) and dies with the tab. The server resolves the token to an
   identity itself, so this page can only ever see its own user's rows. */

const TOKEN_KEY = "setu_token";

export default function Dashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY));
    setChecked(true);
  }, []);

  if (!checked) return null;

  return token ? (
    <Panel
      token={token}
      onSignOut={(message) => {
        sessionStorage.removeItem(TOKEN_KEY);
        setNotice(message ?? null);
        setToken(null);
      }}
    />
  ) : (
    <Connect
      notice={notice}
      onSignedIn={(t) => {
        sessionStorage.setItem(TOKEN_KEY, t);
        setNotice(null);
        setToken(t);
      }}
    />
  );
}

/* ---------- Signed-out ---------- */

function Connect({
  notice,
  onSignedIn,
}: {
  notice: string | null;
  onSignedIn: (token: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    setError(null);
    try {
      onSignedIn(await requestAccessToken());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10 text-center shadow-[var(--shadow-sm)]">
          <div
            className="mx-auto w-fit rounded-2xl p-4 grid place-items-center"
            style={{ background: "var(--accent-glow)" }}
          >
            <Logo size={40} />
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Your dashboard</h1>
          <p className="mt-2 text-sm text-ink-2 leading-relaxed">
            Applications, delivery, quota, and your saved resume — all in one
            place. Sign in with the same Google account you connected in your
            assistant.
          </p>

          {notice && (
            <p className="mt-5 rounded-lg border border-line bg-[var(--surface-2)] px-4 py-3 text-sm text-ink-2">
              {notice}
            </p>
          )}

          <button
            onClick={signIn}
            disabled={busy}
            className="mt-6 w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-line bg-[var(--plane)] font-medium text-sm hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] transition-all disabled:opacity-50"
          >
            <GoogleMark />
            {busy ? "Waiting for Google…" : "Sign in with Google"}
          </button>

          {error && (
            <p role="alert" className="mt-4 text-sm" style={{ color: "var(--critical)" }}>
              ✕ {error}
            </p>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-ink-3 leading-relaxed px-4">
          Read-only: the dashboard never asks for the send permission, so it
          cannot send anything — it only shows what you already sent.
        </p>
      </div>
    </main>
  );
}

/* ---------- Signed-in ---------- */

function Panel({
  token,
  onSignOut,
}: {
  token: string;
  onSignOut: (message?: string) => void;
}) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setStats(await fetchStats(token));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load stats.";
      if (message.includes("expired")) return onSignOut("Your session expired — sign in again.");
      setError(message);
    }
  }, [token, onSignOut]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <main className="min-h-[60vh] grid place-items-center px-6">
        <div className="text-center">
          <p role="alert" className="text-sm" style={{ color: "var(--critical)" }}>
            ✕ {error}
          </p>
          <button
            onClick={load}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-line bg-surface text-sm font-medium hover:border-[var(--border-strong)] transition-colors"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!stats) {
    return (
      <main className="min-h-[60vh] grid place-items-center px-6">
        <p className="text-sm text-ink-2">Loading your dashboard…</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-surface text-sm font-medium hover:border-[var(--border-strong)] transition-colors"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => onSignOut()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-line bg-surface text-sm font-medium hover:border-[var(--border-strong)] transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 items-start">
        {/* Left: the numbers */}
        <div className="min-w-0">
          {stats.total_sent === 0 ? (
            <EmptyState />
          ) : (
            <>
              <HeroFigure
                label="Applications sent"
                value={stats.total_sent.toLocaleString()}
                note={`${stats.companies.toLocaleString()} ${stats.companies === 1 ? "company" : "companies"} reached`}
              />

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <Meter
                  label="Today's quota"
                  used={stats.sent_last_24h}
                  total={stats.daily_limit}
                />
                <div className="grid grid-cols-2 gap-4">
                  <StatTile
                    label={stats.plan === "pro" ? "Plan" : "Free left"}
                    value={
                      stats.plan === "pro"
                        ? "Pro"
                        : `${stats.free_remaining ?? 0}`
                    }
                    note={
                      stats.plan === "pro" && stats.subscription_ends_at
                        ? `renews ${new Date(stats.subscription_ends_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
                        : stats.plan === "pro"
                          ? undefined
                          : `of ${stats.free_email_limit} lifetime`
                    }
                  />
                  <StatTile
                    label="Failed"
                    value={stats.total_failed.toLocaleString()}
                    note="all time"
                  />
                </div>
              </div>

              <RecentSends stats={stats} />
            </>
          )}
        </div>

        {/* Right: who you are + what rides along */}
        <aside className="space-y-4 lg:sticky lg:top-24 min-w-0">
          <AccountCard stats={stats} />
          <LinkCard stats={stats} />
        </aside>
      </div>
    </main>
  );
}

function AccountCard({ stats }: { stats: Stats }) {
  const initial = (stats.name ?? stats.email ?? "?").trim().charAt(0).toUpperCase();
  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 grid place-items-center w-11 h-11 rounded-full text-lg font-semibold text-white"
          style={{ background: "var(--accent)" }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-semibold truncate">{stats.name ?? stats.email}</p>
          <p className="text-xs text-ink-3 truncate flex items-center gap-1.5">
            <Mail size={11} className="shrink-0" />
            {stats.email}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink-2">Role</dt>
          <dd className="font-medium">{stats.role_label ?? "Not set yet"}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink-2">Plan</dt>
          <dd className="inline-flex items-center gap-1.5 font-medium">
            {stats.plan === "pro" ? (
              <>
                <Sparkles size={13} style={{ color: "var(--accent)" }} aria-hidden="true" />
                Pro
              </>
            ) : (
              <>
                <BadgeCheck size={13} className="text-ink-3" aria-hidden="true" />
                Free
              </>
            )}
          </dd>
        </div>
        {stats.plan === "pro" && stats.subscription_ends_at && (
          <div className="flex items-center justify-between gap-3">
            <dt className="text-ink-2">Renews</dt>
            <dd className="font-medium">
              {new Date(stats.subscription_ends_at).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <dt className="text-ink-2">Daily limit</dt>
          <dd className="font-medium tabular">{stats.daily_limit} / day</dd>
        </div>
      </dl>
    </section>
  );
}

function LinkCard({ stats }: { stats: Stats }) {
  const label = stats.link_label ?? "Resume";
  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2">
        <FileText size={15} className="text-ink-2" aria-hidden="true" />
        <h2 className="font-semibold text-sm">{label}</h2>
      </div>

      {stats.link ? (
        <>
          <p className="mt-2 text-xs text-ink-3 leading-relaxed">
            Attached to every email you send through Setu.
          </p>
          <div className="mt-3 rounded-lg border border-line bg-[var(--plane)] px-3 py-2.5">
            <code className="block text-xs leading-relaxed break-all">{stats.link}</code>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <a
              href={stats.link}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-[var(--plane)] text-xs font-medium hover:border-[var(--border-strong)] transition-colors"
            >
              <ExternalLink size={12} />
              Open
            </a>
            <CopyButton value={stats.link} />
          </div>
        </>
      ) : (
        <p className="mt-2 text-sm text-ink-2 leading-relaxed">
          No {label.toLowerCase()} saved yet. Ask your assistant:{" "}
          <em className="text-ink">&ldquo;Save my {label.toLowerCase()} link&rdquo;</em>
        </p>
      )}
    </section>
  );
}

function RecentSends({ stats }: { stats: Stats }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Recent sends</h2>

      {/* Mobile: cards — a five-column table has nowhere to go on a phone. */}
      <ul className="mt-4 sm:hidden space-y-3">
        {stats.recent.map((send, i) => (
          <li key={i} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-sm break-all">{send.to_email}</p>
              <StatusPill ok={send.success} />
            </div>
            {send.subject && (
              <p className="mt-1.5 text-sm text-ink-2 leading-snug">{send.subject}</p>
            )}
            <p className="mt-2 text-xs text-ink-3">
              {send.company && <>{send.company} · </>}
              {formatWhen(send.sent_at)}
            </p>
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="mt-4 hidden sm:block scroll-x rounded-xl border border-line">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[var(--surface-2)]">
              <Th>To</Th>
              <Th>Company</Th>
              <Th>Subject</Th>
              <Th>Status</Th>
              <Th>When</Th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.map((send, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className="px-4 py-3 align-top whitespace-nowrap font-medium">
                  {send.to_email}
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                  {send.company ?? "—"}
                </td>
                <td className="px-4 py-3 align-top text-ink-2 max-w-xs truncate">
                  {send.subject ?? "—"}
                </td>
                <td className="px-4 py-3 align-top">
                  <StatusPill ok={send.success} />
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                  {formatWhen(send.sent_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
        Nothing sent yet — let&apos;s fix that.
      </h2>
      <p className="mt-3 text-ink-2 leading-relaxed max-w-md">
        Connect Setu in your assistant and ask it to apply somewhere. Every send
        will show up here.
      </p>
      <div className="mt-5 rounded-xl border border-line bg-[var(--plane)] p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-medium text-ink-3">Connector URL</span>
          <CopyButton value={MCP_URL} />
        </div>
        <code className="block text-sm scroll-x whitespace-nowrap">{MCP_URL}</code>
      </div>
      <Link
        href="/docs"
        className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
      >
        Setup guide
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-semibold px-4 py-2.5 border-b border-line whitespace-nowrap">
      {children}
    </th>
  );
}

/* Official multi-colour G, inline — brand icons aren't in lucide. */
function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

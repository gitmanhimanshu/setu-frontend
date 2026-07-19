"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LogOut, MapPin, RefreshCw, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { HeroFigure, StatTile, StatusPill } from "@/components/StatTile";
import { SETU_URL } from "@/lib/site";
import { formatWhen } from "@/lib/setu";

/* Admin panel. Auth is HTTP Basic against ADMIN_EMAIL / ADMIN_PASSWORD on the
   server; credentials live in sessionStorage for the tab's lifetime only. */

type Overview = {
  users: number;
  subscribed: number;
  sent: number;
  failed: number;
  sent_24h: number;
};

type AdminUser = {
  google_sub: string;
  email: string;
  name: string | null;
  role: string | null;
  link: string | null;
  plan: string;
  subscribed_at: string | null;
  subscription_ends_at: string | null;
  created_at: string;
  sent: number;
  failed: number;
  sent_24h: number;
  last_sent_at: string | null;
};

type Visitor = {
  ip: string;
  country: string | null;
  region: string | null;
  city: string | null;
  org: string | null;
  path: string | null;
  user_agent: string | null;
  visit_count: number;
  first_seen: string;
  last_seen: string;
};

type VisitorsData = {
  visitors: Visitor[];
  total: number;
  unique_ips: number;
  total_hits: number;
  page: number;
  pages: number;
};

const CREDS_KEY = "setu_admin";

async function adminGet(path: string, creds: string) {
  const res = await fetch(`${SETU_URL}${path}`, {
    headers: { Authorization: `Basic ${creds}` },
    cache: "no-store",
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (res.status === 503) throw new Error("Admin is not configured on this server.");
  if (!res.ok) throw new Error(`Server returned ${res.status}`);
  return res.json();
}

export default function Admin() {
  const [creds, setCreds] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setCreds(sessionStorage.getItem(CREDS_KEY));
    setChecked(true);
  }, []);

  if (!checked) return null;

  return creds ? (
    <Panel
      creds={creds}
      onLogout={() => {
        sessionStorage.removeItem(CREDS_KEY);
        setCreds(null);
      }}
    />
  ) : (
    <Login
      onLogin={(c) => {
        sessionStorage.setItem(CREDS_KEY, c);
        setCreds(c);
      }}
    />
  );
}

function Login({ onLogin }: { onLogin: (creds: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const candidate = btoa(`${email.trim()}:${password}`);
    try {
      await adminGet("/admin/api/overview", candidate);
      onLogin(candidate);
    } catch (err) {
      setError(
        err instanceof Error && err.message === "unauthorized"
          ? "Wrong email or password."
          : err instanceof Error
            ? err.message
            : "Could not reach the server."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-[80vh] grid place-items-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Logo size={40} />
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <p className="mt-1 text-sm text-ink-2">
              Sign in to manage Setu users.
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4"
        >
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-[var(--plane)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-[var(--plane)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm" style={{ color: "var(--critical)" }}>
              ✕ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--text-primary)] text-[var(--plane)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <ShieldCheck size={15} />
            {busy ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Panel({ creds, onLogout }: { creds: string; onLogout: () => void }) {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [visitors, setVisitors] = useState<VisitorsData | null>(null);
  const [vpage, setVpage] = useState(1);
  const [tab, setTab] = useState<"users" | "visitors">("users");
  const [error, setError] = useState<string | null>(null);
  const [busySub, setBusySub] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [o, u] = await Promise.all([
        adminGet("/admin/api/overview", creds),
        adminGet("/admin/api/users", creds),
      ]);
      setOverview(o);
      setUsers(u.users);
    } catch (err) {
      if (err instanceof Error && err.message === "unauthorized") return onLogout();
      setError(err instanceof Error ? err.message : "Could not load data.");
    }
  }, [creds, onLogout]);

  const loadVisitors = useCallback(async () => {
    try {
      setVisitors(await adminGet(`/admin/api/visitors?page=${vpage}`, creds));
    } catch (err) {
      if (err instanceof Error && err.message === "unauthorized") return onLogout();
      setError(err instanceof Error ? err.message : "Could not load visitors.");
    }
  }, [creds, vpage, onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    loadVisitors();
  }, [loadVisitors]);

  async function changePlan(sub: string, plan: "free" | "pro") {
    setBusySub(sub);
    try {
      const res = await fetch(`${SETU_URL}/admin/api/plan`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${creds}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ google_sub: sub, plan, months: 1 }),
      });
      if (res.status === 401) return onLogout();
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Plan change failed.");
    } finally {
      setBusySub(null);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-ink-2">
            Every Setu user, their plan, and what they&apos;ve sent.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              load();
              loadVisitors();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium hover:border-[var(--border-strong)] transition-colors"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium hover:border-[var(--border-strong)] transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 text-sm" style={{ color: "var(--critical)" }}>
          ✕ {error}
        </p>
      )}

      {overview && (
        <>
          <div className="mt-10">
            <HeroFigure
              label="Emails sent, all time"
              value={(overview.sent ?? 0).toLocaleString()}
              note={`${(overview.sent_24h ?? 0).toLocaleString()} in the last 24 hours`}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatTile label="Users" value={(overview.users ?? 0).toLocaleString()} />
            <StatTile
              label="Subscribed"
              value={(overview.subscribed ?? 0).toLocaleString()}
              note="on a paid plan"
            />
            <StatTile
              label="Sent, last 24h"
              value={(overview.sent_24h ?? 0).toLocaleString()}
            />
            <StatTile
              label="Failed sends"
              value={(overview.failed ?? 0).toLocaleString()}
              note="all time"
            />
          </div>
        </>
      )}

      <div
        role="tablist"
        aria-label="Admin sections"
        className="mt-12 inline-flex items-center gap-0.5 p-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)]"
      >
        <TabButton active={tab === "users"} onClick={() => setTab("users")}>
          Users{users ? ` (${users.length})` : ""}
        </TabButton>
        <TabButton active={tab === "visitors"} onClick={() => setTab("visitors")}>
          Visitors{visitors ? ` (${visitors.unique_ips})` : ""}
        </TabButton>
      </div>

      <section className="mt-6" hidden={tab !== "users"}>
        <h2 className="sr-only">Users</h2>
        {!users ? (
          <p className="mt-4 text-sm text-ink-2">Loading…</p>
        ) : users.length === 0 ? (
          <p className="mt-4 text-sm text-ink-2">
            No one has signed in yet.
          </p>
        ) : (
          <div className="mt-5 scroll-x rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--surface-2)]">
                  <Th>User</Th>
                  <Th>Role</Th>
                  <Th>Plan</Th>
                  <Th className="text-right">Sent</Th>
                  <Th className="text-right">Failed</Th>
                  <Th className="text-right">Last 24h</Th>
                  <Th>Last activity</Th>
                  <Th>Subscription</Th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.google_sub}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium whitespace-nowrap">
                        {u.name ?? u.email}
                      </p>
                      {u.name && (
                        <p className="text-xs text-[var(--text-muted)]">{u.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                      {u.role ?? "—"}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <PlanControl
                        plan={u.plan}
                        busy={busySub === u.google_sub}
                        onChange={(p) => changePlan(u.google_sub, p)}
                      />
                    </td>
                    <td className="px-4 py-3 align-top text-right tabular">{u.sent}</td>
                    <td className="px-4 py-3 align-top text-right">
                      {u.failed > 0 ? (
                        <span className="inline-flex items-center gap-1.5 tabular">
                          {u.failed}
                          <StatusPill ok={false} />
                        </span>
                      ) : (
                        <span className="tabular">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-right tabular">{u.sent_24h}</td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                      {u.last_sent_at ? formatWhen(u.last_sent_at) : "never sent"}
                    </td>
                    <td className="px-4 py-3 align-top whitespace-nowrap text-xs text-[var(--text-muted)]">
                      {u.plan === "pro" && u.subscription_ends_at
                        ? `ends ${new Date(u.subscription_ends_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-6" hidden={tab !== "visitors"}>
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="sr-only">Visitors</h2>
            <p className="text-sm text-ink-2">
              Everyone who&apos;s opened the site, newest first. Repeat visits
              from the same IP add to the count rather than a new row.
            </p>
          </div>
          {visitors && (
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                {(visitors.unique_ips ?? 0).toLocaleString()} unique
              </span>
              <span className="px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                {(visitors.total_hits ?? 0).toLocaleString()} total views
              </span>
            </div>
          )}
        </div>

        {!visitors ? (
          <p className="mt-4 text-sm text-ink-2">Loading…</p>
        ) : visitors.visitors.length === 0 ? (
          <p className="mt-4 text-sm text-ink-2">No visits recorded yet.</p>
        ) : (
          <>
            <div className="mt-5 scroll-x rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-2)]">
                    <Th>Location</Th>
                    <Th>IP</Th>
                    <Th className="text-right">Visits</Th>
                    <Th>Last page</Th>
                    <Th>Last seen</Th>
                    <Th>First seen</Th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.visitors.map((v) => (
                    <tr key={v.ip} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 align-top">
                        <p className="font-medium whitespace-nowrap inline-flex items-center gap-1.5">
                          <MapPin size={12} className="text-[var(--text-muted)] shrink-0" />
                          {[v.city, v.country].filter(Boolean).join(", ") || "Unknown"}
                        </p>
                        {(v.region || v.org) && (
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            {[v.region, v.org].filter(Boolean).join(" · ")}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap tabular text-ink-2">
                        {v.ip}
                      </td>
                      <td className="px-4 py-3 align-top text-right tabular font-medium">
                        {v.visit_count}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                        {v.path ?? "—"}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap text-ink-2">
                        {formatWhen(v.last_seen)}
                      </td>
                      <td className="px-4 py-3 align-top whitespace-nowrap text-xs text-[var(--text-muted)]">
                        {new Date(v.first_seen).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {visitors.pages > 1 && (
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs text-ink-2">
                  Page {visitors.page} of {visitors.pages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVpage((p) => Math.max(1, p - 1))}
                    disabled={visitors.page <= 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm hover:border-[var(--border-strong)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </button>
                  <button
                    onClick={() => setVpage((p) => Math.min(visitors.pages, p + 1))}
                    disabled={visitors.page >= visitors.pages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm hover:border-[var(--border-strong)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-[var(--surface-2)] text-[var(--text-primary)]"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      }`}
    >
      {children}
    </button>
  );
}

/* Plan is state, so it never rides on color alone — the label carries it. */
function PlanControl({
  plan,
  busy,
  onChange,
}: {
  plan: string;
  busy: boolean;
  onChange: (plan: "free" | "pro") => void;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <select
        value={plan}
        disabled={busy}
        onChange={(e) => onChange(e.target.value as "free" | "pro")}
        aria-label="Plan"
        className="rounded-lg border border-[var(--border)] bg-[var(--plane)] px-2 py-1 text-sm disabled:opacity-50"
      >
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </select>
      {busy && <span className="text-xs text-[var(--text-muted)]">Saving…</span>}
    </span>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left font-semibold px-4 py-2.5 border-b border-[var(--border)] whitespace-nowrap ${className}`}
    >
      {children}
    </th>
  );
}

export type SavedLink = {
  name: string;
  url: string;
  updated_at: string;
  is_default: boolean;
};

export type CompanyOpenStat = {
  company: string;
  total_opens: number;
  opened_sends: number;
  last_opened_at: string | null;
};

export type Send = {
  to_email: string;
  company: string | null;
  subject: string | null;
  success: boolean;
  error: string | null;
  sent_at: string;
  open_count: number;
  first_opened_at: string | null;
  last_opened_at: string | null;
  link_name: string | null;
};

export type Stats = {
  email: string;
  name: string | null;
  role: string | null;
  role_label: string | null;
  link: string | null;
  default_link_name: string | null;
  links: SavedLink[];
  link_label: string | null;
  plan: string;
  subscribed_at: string | null;
  subscription_ends_at: string | null;
  free_email_limit: number;
  free_remaining: number | null;
  total_sent: number;
  total_failed: number;
  total_opens: number;
  opened_sends: number;
  sent_last_24h: number;
  daily_limit: number;
  companies: number;
  company_opens: CompanyOpenStat[];
  recent: Send[];
};

export type LinksResponse = {
  success?: boolean;
  detail?: string;
  default_link_name: string | null;
  link: string | null;
  links: SavedLink[];
};

export const SETU_URL =
  process.env.NEXT_PUBLIC_SETU_URL ?? "http://localhost:8000";

async function parseResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) throw new Error("Your session expired. Sign in again.");
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `Setu server returned ${res.status}`);
  }
  return data as T;
}

export async function fetchStats(accessToken: string): Promise<Stats> {
  const res = await fetch(`${SETU_URL}/api/stats`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  return parseResponse<Stats>(res);
}

export async function saveLink(
  accessToken: string,
  link: string,
  name: string,
  makeDefault = false
): Promise<LinksResponse> {
  const res = await fetch(`${SETU_URL}/api/link`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ link, name, make_default: makeDefault }),
  });
  return parseResponse<LinksResponse>(res);
}

export async function deleteLink(
  accessToken: string,
  name: string
): Promise<LinksResponse> {
  const res = await fetch(`${SETU_URL}/api/link`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return parseResponse<LinksResponse>(res);
}

export async function setDefaultLink(
  accessToken: string,
  name: string
): Promise<LinksResponse> {
  const res = await fetch(`${SETU_URL}/api/link/default`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return parseResponse<LinksResponse>(res);
}

export function formatWhen(iso: string): string {
  const then = new Date(iso).getTime();
  const mins = Math.round((Date.now() - then) / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  if (mins < 10080) return `${Math.round(mins / 1440)}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatOpenCount(n: number): string {
  if (n <= 0) return "Not opened yet";
  if (n === 1) return "Opened once";
  return `Opened ${n} times`;
}

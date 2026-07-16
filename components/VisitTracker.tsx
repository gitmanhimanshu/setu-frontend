"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SETU_URL } from "@/lib/site";

/**
 * Pings the server's /api/visit once per page load so the admin panel can show
 * who's visiting. The server dedupes by IP and geolocates — this side just
 * reports the path and forgets it. Failures are swallowed; analytics must never
 * be something a visitor notices.
 *
 * A ref guards against React StrictMode's double-invoke in dev; in a production
 * build the effect runs once per navigation.
 */
export default function VisitTracker() {
  const pathname = usePathname();
  const lastSent = useRef<string | null>(null);

  useEffect(() => {
    if (lastSent.current === pathname) return;
    lastSent.current = pathname;

    fetch(`${SETU_URL}/api/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Flame, MailX, Clock, Eye } from "lucide-react";

/**
 * Illustrative preview of the follow-up signals Setu derives from link opens.
 * The companies are examples, not real data — this is a product demo on a
 * marketing page, so it never claims to be anyone's actual numbers.
 *
 * Every signal carries an icon and a label, so state never rides on colour
 * alone.
 */

type Signal = "hot" | "warm" | "cold";

const ROWS: {
  signal: Signal;
  company: string;
  detail: string;
  action: string;
  opens: number;
}[] = [
  {
    signal: "hot",
    company: "Acme Corp",
    detail: "opened 4 times · 20 min ago",
    action: "Follow up now — you're on their mind",
    opens: 4,
  },
  {
    signal: "warm",
    company: "Initech",
    detail: "opened once · 3 hours ago",
    action: "Recently looked. A short nudge is fair",
    opens: 1,
  },
  {
    signal: "cold",
    company: "Beta Ltd",
    detail: "sent 5 days ago · never opened",
    action: "Check the address, or try a new subject",
    opens: 0,
  },
];

const STYLES: Record<Signal, { icon: typeof Flame; label: string; color: string }> = {
  hot: { icon: Flame, label: "Hot", color: "var(--critical)" },
  warm: { icon: Eye, label: "Warm", color: "var(--warning)" },
  cold: { icon: MailX, label: "Cold", color: "var(--text-muted)" },
};

export default function SignalPreview() {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (reduce) {
      setShown(ROWS.length);
      return;
    }
    if (shown >= ROWS.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : 650);
    return () => clearTimeout(t);
  }, [started, shown, reduce]);

  return (
    <div ref={ref} className="w-full max-w-sm">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--plane)] shadow-[var(--shadow-lg)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--critical)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--good)]" />
          <span className="ml-2 text-xs text-[var(--text-muted)] font-medium">
            Follow-up signals
          </span>
        </div>

        <div className="divide-y divide-[var(--border)] min-h-[228px]">
          {ROWS.slice(0, shown).map((row, i) => {
            const style = STYLES[row.signal];
            const Icon = style.icon;
            return (
              <motion.div
                key={row.company}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="px-4 py-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-sm">{row.company}</span>
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: "var(--surface-2)", color: style.color }}
                  >
                    <Icon size={10} />
                    {style.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{row.detail}</p>
                <p
                  className="mt-1.5 text-xs font-medium"
                  style={{ color: i === 0 ? "var(--accent)" : "var(--text-secondary)" }}
                >
                  → {row.action}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="px-4 py-2.5 bg-[var(--surface)] border-t border-[var(--border)]">
          <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1.5">
            <Clock size={10} />
            An open is a signal, not proof they read it
          </p>
        </div>
      </div>
    </div>
  );
}

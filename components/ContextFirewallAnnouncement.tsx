"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
import { SETU_URL } from "@/lib/site";

const TEASER_HINTS = [
  "They need better context.",
  "Something underneath the agent layer.",
  "Less noise. Better context. Smarter agents.",
];

export default function ContextFirewallAnnouncement() {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % TEASER_HINTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const trackClick = () => {
    try {
      // 1. Send tracking event to Setu visitor API
      fetch(`${SETU_URL}/api/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "context_firewall_click",
          source: "hero_announcement",
          path: `${window.location.pathname}?action=click_context_firewall`,
        }),
        keepalive: true,
      }).catch(() => {});

      // 2. Google Analytics / gtag tracking if initialized
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "context_firewall_click", {
          event_category: "announcement",
          event_label: "hero_top_bar",
          destination: "https://context-firewall.vercel.app/",
        });
      }
    } catch {
      // Analytics must never break navigation
    }
  };

  return (
    <aside
      aria-label="New Product Announcement"
      className="relative w-full max-w-5xl mx-auto"
    >
      {/* Outer animated neon glow wrapper */}
      <div className="relative group">
        {/* Continuous subtle animated glow behind the border */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-600 opacity-40 blur-sm group-hover:opacity-85 transition duration-500 animate-pulse pointer-events-none" />

        <a
          href="https://context-firewall.vercel.app/"
          target="_blank"
          rel="noreferrer noopener"
          onClick={trackClick}
          className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-cyan-400/50 bg-[#070d1e]/95 px-4 py-3 sm:px-5 sm:py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.45)]"
        >
          {/* Subtle animated light flare */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-10 left-1/4 h-24 w-48 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />
          </div>

          {/* Left: "WE ARE BUILDING" badge + Shield + Product Name + Tagline */}
          <div className="relative z-10 flex flex-wrap items-center gap-2.5 sm:gap-3 min-w-0">
            {/* "WE ARE BUILDING" highlighted badge */}
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/15 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-cyan-300 border border-cyan-400/40 shadow-sm shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              WE ARE BUILDING
            </span>

            {/* Shield Icon + Context Firewall */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 border border-cyan-400/50 shadow-inner group-hover:scale-105 transition-transform">
                <Shield className="h-4 w-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
              <span className="font-mono font-bold text-sm sm:text-base text-white tracking-tight">
                Context<span className="text-cyan-400">Firewall</span>
              </span>
            </div>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* Rotating Supporting Message */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-300 truncate">
              <span className="text-gray-400">AI coding agents don&apos;t need more context:</span>
              <div className="overflow-hidden h-5 inline-flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hintIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-semibold text-cyan-300 text-xs flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    {TEASER_HINTS[hintIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Micro Data-Stream + HIGHLIGHTED GO BUTTON */}
          <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* Micro Data-Stream particles (visible on lg screens) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-[10px] font-mono text-gray-400">
              <span className="text-red-400/90 font-medium">Messy</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-cyan-400"
              >
                →
              </motion.span>
              <span className="text-cyan-300 font-semibold px-1 py-0.5 rounded bg-blue-500/20 border border-blue-400/30">
                🛡️ Filter
              </span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                className="text-cyan-400"
              >
                →
              </motion.span>
              <span className="text-emerald-400 font-medium">Relevant</span>
            </div>

            {/* Highly Highlighted GO / EXPLORE Button */}
            <div className="relative flex items-center">
              {/* Glowing Aura behind button */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 opacity-70 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse pointer-events-none" />

              <span className="relative inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-xs sm:text-sm font-bold text-white tracking-wide shadow-lg border border-cyan-200/50 group-hover:scale-105 active:scale-95 transition-all duration-200">
                <span>Explore</span>
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 border border-white/40 group-hover:bg-white group-hover:text-blue-900 transition-all">
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </span>
            </div>
          </div>
        </a>
      </div>
    </aside>
  );
}

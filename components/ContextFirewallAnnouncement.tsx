"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Sparkles, Zap, Layers } from "lucide-react";
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
    }, 4000);
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
      <a
        href="https://context-firewall.vercel.app/"
        target="_blank"
        rel="noreferrer noopener"
        onClick={trackClick}
        className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-full border border-blue-500/30 bg-gradient-to-r from-[#070d1e]/90 via-[#0b132b]/85 to-[#120f2e]/90 px-3 py-1.5 sm:px-4 sm:py-2 text-xs shadow-md backdrop-blur-xl transition-all duration-200 hover:border-cyan-400/60 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.3)]"
      >
        {/* Subtle hover gradient shimmer */}
        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 via-cyan-500/15 to-violet-500/10" />

        {/* Left: Badge + Product + Animated Hint */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 min-w-0">
          {/* Pulsing Badge */}
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 border border-cyan-500/25">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
            </span>
            NEW
          </span>

          {/* Shield Icon + Product Name */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Shield className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="font-mono font-bold text-white tracking-tight">
              Context<span className="text-cyan-400">Firewall</span>
            </span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Headline & Rotating Subtext */}
          <div className="hidden md:flex items-center gap-1.5 text-gray-300 truncate">
            <span className="text-gray-400">AI coding agents don&apos;t need more context:</span>
            <div className="overflow-hidden h-4 inline-flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={hintIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="font-medium text-cyan-300 text-[11px]"
                >
                  {TEASER_HINTS[hintIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right: Micro Data-Stream + Compact CTA */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Micro Particle Stream (visible on lg screens) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[9px] font-mono text-gray-400">
            <span className="text-red-400/80">Noise</span>
            <span className="text-cyan-400/60">→</span>
            <span className="text-cyan-300 font-semibold">Firewall</span>
            <span className="text-cyan-400/60">→</span>
            <span className="text-emerald-400">Signal</span>
          </div>

          {/* CTA Pill */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-[11px] font-semibold text-white tracking-wide shadow-sm group-hover:scale-[1.03] transition-transform border border-cyan-300/30">
            <span className="hidden xs:inline">Explore</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </aside>
  );
}

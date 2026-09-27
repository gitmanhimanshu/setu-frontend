"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, Layers, Zap, Sparkles } from "lucide-react";

const TEASER_HINTS = [
  "Something new is being built…",
  "Not another wrapper. Something underneath the agent layer.",
  "AI coding agents don't need more context. They need better context.",
];

export default function ContextFirewallAnnouncement() {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % TEASER_HINTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="New Product Announcement"
      className="relative w-full mb-6 sm:mb-8"
    >
      <a
        href="https://context-firewall.vercel.app/"
        target="_blank"
        rel="noreferrer noopener"
        className="group relative block overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-r from-[#070d1e]/90 via-[#0b132b]/85 to-[#120f2e]/90 p-4 sm:p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_-5px_rgba(56,189,248,0.22)]"
      >
        {/* Subtle animated background light beam on hover */}
        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/10 via-cyan-500/15 to-violet-500/10" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Left Column: Announcement & Concept */}
          <div className="flex-1 space-y-2.5">
            {/* Top row: Badges & Rotating Micro-Animation Hint */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 border border-cyan-500/25 shadow-sm group-hover:border-cyan-400/50 transition-colors">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
                NEW · COMING SOON
              </span>

              <span className="text-[11px] font-mono tracking-wider text-violet-300/80 uppercase font-medium">
                WE&apos;RE BUILDING SOMETHING NEW
              </span>

              {/* Easter-egg micro-hint */}
              <div className="hidden sm:inline-flex items-center overflow-hidden h-5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hintIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="text-[11px] font-mono text-cyan-300/70 italic flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                    {TEASER_HINTS[hintIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Product Name & Catchphrase */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <div className="flex items-center gap-2">
                <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 border border-blue-400/30 shadow-inner group-hover:border-cyan-400/60 transition-colors">
                  <Shield className="h-4 w-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
                  Context<span className="text-cyan-400">Firewall</span>
                </h3>
              </div>

              <span className="text-xs sm:text-sm font-medium text-gray-300">
                AI coding agents don&apos;t need more context.{" "}
                <span className="text-cyan-300 font-semibold">They need better context.</span>
              </span>
            </div>

            {/* Supporting Micro Copy */}
            <p className="text-xs text-gray-400 font-normal leading-relaxed max-w-2xl">
              An intelligent context layer for autonomous coding agents — filtering noise, suppressing bloated logs, and distilling active AST context before it reaches inference.
              <span className="hidden sm:inline text-gray-500 ml-1.5 font-mono">
                Less noise. Better context. Smarter agents.
              </span>
            </p>
          </div>

          {/* Center/Right: Subtle Animated Data Stream Flow + CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 shrink-0 pt-2 lg:pt-0 border-t border-white/5 lg:border-t-0">
            {/* Visual Particle Pipeline: Messy -> Shield -> Clean */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-[10px] font-mono">
              <div className="flex items-center gap-1 text-red-400/80">
                <Layers className="h-3 w-3" />
                <span>Messy Context</span>
              </div>

              <div className="flex items-center px-1 text-cyan-400/60">
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </div>

              <div className="flex items-center gap-1 text-cyan-300 font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-400/30">
                <Shield className="h-3 w-3 text-cyan-400" />
                <span>Firewall</span>
              </div>

              <div className="flex items-center px-1 text-cyan-400/60">
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                >
                  →
                </motion.span>
              </div>

              <div className="flex items-center gap-1 text-emerald-400">
                <Zap className="h-3 w-3" />
                <span>Relevant Context</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-xs font-semibold text-white tracking-wide shadow-md group-hover:shadow-cyan-500/30 group-hover:scale-[1.02] active:scale-98 transition-all duration-200 border border-cyan-300/30">
                <span>Explore Context Firewall</span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>
        </div>
      </a>
    </aside>
  );
}

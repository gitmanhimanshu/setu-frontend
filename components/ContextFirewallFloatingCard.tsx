"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, X, Sparkles } from "lucide-react";

const STORAGE_KEY = "setu_cf_teaser_dismissed";

export default function ContextFirewallFloatingCard() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Only show if not previously dismissed by user
    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY) === "true";
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore if localStorage unavailable
    }
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-label="New Product Teaser"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[320px] sm:max-w-[340px] w-full"
        >
          <div className="relative rounded-2xl border border-blue-500/30 bg-[#070d1e]/90 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.25)] overflow-hidden">
            {/* Ambient Shimmer / Glow overlay */}
            <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-cyan-500/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-violet-600/15 blur-2xl" />

            {/* Header: Badge + Dismiss Button */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                <Sparkles className="h-3 w-3 text-cyan-300" />
                NEW PRODUCT
              </span>

              <button
                onClick={handleDismiss}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss announcement"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-2.5 space-y-1.5">
              <p className="text-[11px] font-mono text-gray-400 tracking-wide uppercase">
                We&apos;re building something new.
              </p>

              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 border border-blue-400/30">
                  <Shield className="h-3 w-3 text-cyan-400" />
                </div>
                <h4 className="text-sm font-bold font-mono text-white tracking-wide">
                  CONTEXT FIREWALL
                </h4>
              </div>

              <p className="text-xs text-gray-300 leading-snug">
                Better context for AI coding agents. Less noise. Smarter agents.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-end">
              <a
                href="https://context-firewall.vercel.app/"
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-xs font-semibold text-white tracking-wide shadow-sm hover:shadow-cyan-500/30 transition-all duration-200 border border-cyan-400/30 hover:scale-[1.02] active:scale-95"
              >
                <span>Explore</span>
                <ArrowRight
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";

export default function FloatingVideo() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isDismissed) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ease-in-out shadow-2xl rounded-xl overflow-hidden border border-[var(--border-strong)] bg-[var(--surface)] flex flex-col
        ${isExpanded 
          ? "bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-[500px] md:w-[600px] lg:w-[700px] max-h-[85vh]" 
          : "bottom-4 right-4 w-72 sm:w-80 md:w-96 max-h-[60vh]"
        }
      `}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface-2)] border-b border-[var(--border)] shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">See how Setu works</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-1 hover:bg-[var(--surface)] hover:text-[var(--text-primary)] rounded transition-colors"
            title={isExpanded ? "Shrink" : "Expand"}
          >
            {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            onClick={() => setIsDismissed(true)} 
            className="p-1 hover:bg-[var(--surface)] hover:text-[var(--text-primary)] rounded transition-colors"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Loom Iframe */}
      <div 
        className="relative shrink-0 w-full bg-black overflow-hidden" 
        style={{ paddingBottom: "56.25%" }}
        onClick={() => {
          // Simple click tracking (can be connected to Posthog/GA)
          try {
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("event", "video_click", { video_name: "setu_demo" });
            }
            console.log("Video Clicked (Tracked)");
          } catch (e) {}
        }}
      >
        <iframe
          src="https://www.loom.com/embed/9c5cf49cefd149a2a4395b97fb81b1f9?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

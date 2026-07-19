"use client";

import { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";

export default function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial video"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--plane)] shadow-[var(--shadow-lg)] overflow-hidden fade-up">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Setu Tutorial for Claude
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Watch how to set up and use Setu with Claude
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid place-items-center w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Close video"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video */}
        <div className="relative bg-black aspect-video">
          {!playing && (
            <button
              onClick={() => {
                videoRef.current?.play();
                setPlaying(true);
              }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/60 hover:bg-black/50 transition-colors group"
            >
              <span className="grid place-items-center w-16 h-16 rounded-full bg-[var(--accent)] text-white group-hover:scale-110 transition-transform shadow-lg">
                <Play size={28} fill="currentColor" />
              </span>
              <span className="text-sm font-medium text-white/90">
                Click to play
              </span>
            </button>
          )}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls={playing}
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source
              src="https://res.cloudinary.com/dbizsbr3w/video/upload/v1784450250/New_chat_-_Claude_-_Google_Chrome_2026-07-19_13-39-07_pbqmwl.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--surface)]">
          <p className="text-xs text-[var(--text-muted)] text-center">
            Setu connects Claude to your Gmail via MCP — send job applications
            with AI, tracked and paced.
          </p>
        </div>
      </div>
    </div>
  );
}

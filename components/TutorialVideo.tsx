"use client";

import { useState } from "react";
import { Captions } from "lucide-react";

interface TranscriptItem {
  time: string;
  text: string;
}

interface TutorialVideoProps {
  title: string;
  description: string;
  src: string;
  isLoom?: boolean;
  transcript?: TranscriptItem[];
}

export default function TutorialVideo({ title, description, src, isLoom, transcript }: TutorialVideoProps) {
  const [showTranscript, setShowTranscript] = useState(true);

  return (
    <section>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1 mb-4">{description}</p>
        </div>
        {transcript && transcript.length > 0 && (
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              showTranscript 
                ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20' 
                : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
            }`}
          >
            <Captions size={14} />
            {showTranscript ? "Hide Transcript" : "Show Transcript"}
          </button>
        )}
      </div>

      <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-black shadow-lg flex flex-col">
        {/* Video Player */}
        <div className="relative w-full" style={isLoom ? { paddingBottom: "56.25%" } : { aspectRatio: "16/9" }}>
          {isLoom ? (
            <iframe
              src={src}
              frameBorder="0"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          ) : (
            <video
              className="absolute top-0 left-0 w-full h-full object-contain"
              controls
              preload="metadata"
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Transcript Overlay */}
          {showTranscript && transcript && transcript.length > 0 && (
            <div className="absolute bottom-[50px] left-4 right-4 max-h-[50%] overflow-y-auto rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-sm space-y-3 p-4 z-10 custom-scrollbar pointer-events-auto">
              {transcript.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-xs font-mono font-medium text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                    {item.time}
                  </span>
                  <p className="text-white/95 leading-relaxed drop-shadow-md">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

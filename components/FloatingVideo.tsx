"use client";

import { useState, useEffect } from "react";
import { X, Maximize2, Minimize2, Captions } from "lucide-react";

const transcript = [
  { time: "0:00", text: "How you can use, let me show you, how you can use Setu efficiently. So, you can see, like, ah, if I am going on Plugins." },
  { time: "0:11", text: "So, I connected, ah, ah, multiple Plugins, like, you know, Firecrawl, Indeed, Nokri, and, ah, LinkedIn, also, also, like, ah, the type of, ah, Plugins I connected." },
  { time: "0:29", text: "And, ah, I can see, I can do the only this. If you like to find my job, I find jobs on LinkedIn, according to my experience, and, so, by this, you can write only this." },
  { time: "0:54", text: "Basically, I, uh, uh, given my contact or resume already, so you can give your resume here, PDF file, and, uh, write this prompt only, and it will find." },
  { time: "1:08", text: "And it will, uh, find jobs for you, and, uh, latest job for me, and it will find our jobs, like, it is searching, and it is verifying your, uh, company emails." },
  { time: "1:34", text: "And, uh, it is verifying, and it is sending. And, uh, next, Kin and Handel, Context, their company name. And, using LinkedIn Naukri, you can find all jobs, and it is just send it, or it automatically, no, it will, uh, write, uh, based on that job profile automatically." },
  { time: "1:54", text: "Setu dashboard, I can see, like, it is send it. Like, I refresh. Like, it is send it at max. Like, uh, that company, it is send it." },
  { time: "2:19", text: "And, uh, it will track also which, uh, HR opens or not. Like, this HR opens, this HR opens four times." },
  { time: "2:24", text: "We can go. Follow, uh, like, it is interested. So, it opens, uh, four times. And, uh, you go on your email and refresh also here." },
  { time: "2:36", text: "Like, if you refresh here. And, you can see, it is open. It is written, like, uh, based on your profile, like, uh, based on your file and your application ID." },
  { time: "2:48", text: "You don't need to write explicitly. Like, it is written for these two applications, different type. And, it is written in this different type." },
  { time: "2:56", text: "So, you can automate, and you can tell, like, uh, find the latest footage, five mails, media, LinkedIn, and send the mail." },
  { time: "3:09", text: "You can write only this. And, it will do it automatically. No need to worry. Like, I, I can send, uh, eighty to a hundred applications in only ten minutes." },
  { time: "3:24", text: "Yeah. You can find it from LinkedIn. Yeah, you can, like, uh, replace in three hundred, uh, uh, send three I replied, and it will send you all." },
  { time: "3:45", text: "Keep verifying emails, because, uh, verifying emails is also important." },
  { time: "3:56", text: "There may be fake emails also. Yeah, it is done, like, three applications it is done, already deployed, and zero RMS." },
  { time: "4:11", text: "Already it is ended, and you can see in there your portal. Yeah, it is opens your email or not. It opens like it is not opened." },
  { time: "4:38", text: "Thank you." },
];

export default function FloatingVideo() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
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
            onClick={() => setShowTranscript(!showTranscript)} 
            className={`p-1 rounded transition-colors ${showTranscript ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'}`}
            title="Toggle Captions"
          >
            <Captions size={14} />
          </button>
          <button 
            onClick={() => {
              setIsExpanded(!isExpanded);
              if (!isExpanded && !showTranscript) setShowTranscript(true);
            }} 
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
        className="relative shrink-0 w-full bg-black" 
        style={{ paddingBottom: "56.25%" }}
        onClick={() => {
          // Simple click tracking (can be connected to Posthog/GA)
          try {
            if (typeof window !== "undefined" && window.gtag) {
              window.gtag("event", "video_click", { video_name: "setu_demo" });
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

      {/* Transcript Section */}
      {showTranscript && (
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--surface)] border-t border-[var(--border)] text-sm space-y-3 min-h-[150px]">
          {transcript.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <span className="text-xs font-mono text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                {item.time}
              </span>
              <p className="text-[var(--text-secondary)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

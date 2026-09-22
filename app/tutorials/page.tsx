import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Tutorials - Setu",
  description: "Learn how to connect Setu to Claude, ChatGPT, and use LinkedIn/Naukri integration.",
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-[var(--plane)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--plane)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size={24} />
            <span className="font-semibold text-[15px] tracking-tight group-hover:opacity-80 transition-opacity">
              Setu
            </span>
          </Link>
          <Link 
            href="/" 
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Tutorials</h1>
          <p className="text-[var(--text-secondary)]">
            Watch these quick videos to learn how to set up Setu and automate your job search with AI.
          </p>
        </div>

        <div className="space-y-16">
          {/* First Tutorial: Loom Video */}
          <section>
            <h2 className="text-xl font-semibold mb-2">How to use Setu efficiently (LinkedIn & Naukri)</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Learn how to connect Firecrawl, LinkedIn, and Naukri with Setu to automate job applications and email follow-ups.
            </p>
            <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-black shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.loom.com/embed/9c5cf49cefd149a2a4395b97fb81b1f9?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                  frameBorder="0"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </section>

          {/* Second Tutorial: Claude Setup MP4 */}
          <section>
            <h2 className="text-xl font-semibold mb-2">Setu Tutorial for Claude</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Watch how to configure the Setu MCP server within Claude Desktop.
            </p>
            <div className="rounded-xl overflow-hidden border border-[var(--border-strong)] bg-black shadow-lg">
              <div className="relative w-full aspect-video">
                <video
                  className="w-full h-full object-contain"
                  controls
                  preload="metadata"
                >
                  <source
                    src="https://res.cloudinary.com/dbizsbr3w/video/upload/v1784450250/New_chat_-_Claude_-_Google_Chrome_2026-07-19_13-39-07_pbqmwl.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

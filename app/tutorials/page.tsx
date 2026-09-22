import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import TutorialVideo from "@/components/TutorialVideo";

export const metadata = {
  title: "Tutorials - Setu",
  description: "Learn how to connect Setu to Claude, ChatGPT, and use LinkedIn/Naukri integration.",
};

const TRANSCRIPT_1 = [
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

const TRANSCRIPT_2 = [
  { time: "0:00", text: "See, how you can save your time. Like, this is a company, and this is your mail. And basically, you are going to company, like, send email and write email, different, different." },
  { time: "0:15", text: "Will you go on GPT? Paste it. And, like, you can, say, send screenshot also. So, not it. Like, uh, uh, send email on page on my profile." },
  { time: "0:32", text: "And, you write it, it will do automatically, only to write email if you send for individual individual and it will do automatically." },
  { time: "0:42", text: "Like, uh, it'll save your time. Hm, yeah. Surat, like, it is for Surat can do it only on your filing chip, but I want to, like, send it anyhow, send it anyhow." },
  { time: "1:04", text: "Like, I am telling a demo, so, I can actually find more jobs in Surat and send it. It will send it, and if you do, yeah, I can keep finding more jobs and delete the same." },
  { time: "1:35", text: "It can mail different, different jobs based on profiles. You don't need to write more complicated not in 3D, it will do that in 3D." },
  { time: "1:44", text: "Thank you very much. Yeah, it Yeah. We'll fix it." },
  { time: "2:56", text: "and this one is, is the one that, ah, uh, uh, four mails, you can see, like, four to five mails it has ended." },
  { time: "3:23", text: "And if we go on dashboard and you can see, like, how many mails it has ended. And you can see in our mails also, like, in the same section you can see, like, refresh it and it will show you." },
  { time: "3:35", text: "And in dashboard, like, you can see, uh, it has ended for, yeah, one minute ago, one minute ago. And, yeah." },
  { time: "3:45", text: "Your solutions, it has ended. And you can see, uh, which company opened your resume. And in this you can see what applications I sended." }
];

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
          <TutorialVideo
            title="Time Saving: Send applications with just a screenshot"
            description="See how you can save time by providing just a screenshot and a little context to automate email sending based on job profiles."
            src="https://www.loom.com/embed/2c9ef434e88746bca274bbc4f52fc00b?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
            isLoom={true}
            transcript={TRANSCRIPT_2}
          />

          <TutorialVideo
            title="How to use Setu efficiently (LinkedIn & Naukri)"
            description="Learn how to connect Firecrawl, LinkedIn, and Naukri with Setu to automate job applications and email follow-ups."
            src="https://www.loom.com/embed/9c5cf49cefd149a2a4395b97fb81b1f9?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
            isLoom={true}
            transcript={TRANSCRIPT_1}
          />

          <TutorialVideo
            title="Setu Tutorial for Claude"
            description="Watch how to configure the Setu MCP server within Claude Desktop."
            src="https://res.cloudinary.com/dbizsbr3w/video/upload/v1784450250/New_chat_-_Claude_-_Google_Chrome_2026-07-19_13-39-07_pbqmwl.mp4"
            isLoom={false}
          />
        </div>
      </main>
    </div>
  );
}

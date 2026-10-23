import { useState } from "react";
import { Check, CheckCircle2, Copy, Mail, Send, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const emails = ["aniketbhalerao065@gmail.com", "support.neoluxetrust@gmail.com"];
const collaborationTopics = [
  "Web Product / Portfolio",
  "AI Tool & Workflow",
  "Creative Direction & Video",
  "Brand Strategy / LuminaLM",
] as const;

export function HomeContact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState<string>(collaborationTopics[0]);

  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopied(email);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="contact" className="border-t border-hairline bg-surface">
      <div className="container-editorial section-pad grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <p className="label-meta text-accent-yellow">Connect · Build together</p>
          <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.86] tracking-normal">
            LET&apos;S MAKE THE NEXT THING MATTER.
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft">
            Ideas, collaborations, websites, tools, and thoughtful digital work begin with a clear
            conversation.
          </p>
          <div className="mt-9 space-y-3">
            {emails.map((email) => (
              <SpotlightCard key={email} className="border border-hairline bg-background/60">
                <div className="relative z-10 flex min-w-0 items-center justify-between gap-3 p-3.5">
                  <a
                    href={`mailto:${email}`}
                    className="min-w-0 truncate font-mono text-xs sm:text-sm hover:text-accent-blue"
                  >
                    {email}
                  </a>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => void copyEmail(email)}
                    aria-label={`Copy ${email}`}
                    className="shrink-0 rounded-none border border-hairline px-3 font-mono text-[10px] uppercase"
                  >
                    {copied === email ? (
                      <>
                        <Check className="mr-1 size-3.5 text-accent-yellow" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 size-3.5" /> Copy
                      </>
                    )}
                  </Button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[34rem] flex-col items-center justify-center border border-accent-blue/40 bg-background/60 p-8 text-center"
            >
              <CheckCircle2 className="size-12 text-accent-yellow" />
              <h3 className="mt-6 text-3xl font-semibold">Message prepared.</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
                Thank you. Your brief for <span className="text-ink font-medium">{subject}</span> is
                ready—use either direct email address beside this form for immediate delivery.
              </p>
              <Button
                variant="outline"
                onClick={() => setSent(false)}
                className="mt-7 rounded-none"
              >
                Write another
              </Button>
            </motion.div>
          ) : (
            <SpotlightCard className="border border-hairline bg-background/70">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="relative z-10 p-5 md:p-8"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase text-accent-yellow">
                    Select Focus Area
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {collaborationTopics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setSubject(topic)}
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                          subject === topic
                            ? "bg-accent-blue text-primary-foreground"
                            : "border border-hairline bg-surface text-ink-soft hover:text-ink"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="text-xs text-ink-soft">
                    Name
                    <input
                      required
                      name="name"
                      className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="text-xs text-ink-soft">
                    Email
                    <input
                      required
                      type="email"
                      name="email"
                      className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue"
                      placeholder="you@email.com"
                    />
                  </label>
                </div>
                <label className="mt-5 block text-xs text-ink-soft">
                  Subject
                  <input
                    required
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue"
                    placeholder="Website, collaboration, or an idea"
                  />
                </label>
                <label className="mt-5 block text-xs text-ink-soft">
                  Message
                  <textarea
                    required
                    name="message"
                    rows={6}
                    className="mt-2 w-full resize-none border border-hairline bg-surface p-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue"
                    placeholder="Tell me what you're building, your timeline, and how we can collaborate."
                  />
                </label>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-5 h-12 w-full rounded-none bg-accent-blue text-primary-foreground hover:bg-accent-blue/90"
                >
                  Prepare message <Send />
                </Button>
                <p className="mt-4 flex items-center gap-2 text-[10px] leading-relaxed text-ink-soft">
                  <Mail className="size-3.5 shrink-0 text-accent-yellow" /> This preview confirms
                  locally; direct email is available for immediate delivery.
                </p>
              </form>
            </SpotlightCard>
          )}
        </Reveal>
      </div>
    </section>
  );
}

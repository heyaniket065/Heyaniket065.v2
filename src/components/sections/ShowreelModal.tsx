import { useState } from "react";
import { ArrowUpRight, Clapperboard, Film, Play, Sparkles, Volume2 } from "lucide-react";
import { featuredVideos } from "@/data/profile";
import { projects } from "@/data/work";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const reels = [
  {
    id: "featured",
    number: "01",
    title: "LuminaLM Featured Reel",
    subtitle: "Visual Storytelling · Strategy · Pacing",
    youtubeId: featuredVideos[0].id,
    duration: "02:45",
    directorNote:
      "Built on deliberate pacing, high-contrast visual hierarchy, and audio-locked transitions where every frame earns its screen time.",
    highlights: ["Beat-locked assembly", "Restrained typography", "Atmospheric grade"],
  },
  {
    id: "madara",
    number: "02",
    title: "Madara in Phonk — Rhythm Study",
    subtitle: "Anime Edit · Audio Architecture · Cut Discipline",
    youtubeId: featuredVideos[0].id,
    duration: "01:18",
    directorNote:
      "An edit built on rhythm and restraint—cut to a phonk track where every transition is timed to a beat that already exists in the music.",
    highlights: ["Pre-timeline beat map", "Hard-cut punctuation", "Zero filler effects"],
  },
  {
    id: "psychology",
    number: "03",
    title: "Dark Psychology — Narrative Series",
    subtitle: "Analytical Essay · Behavioral Mechanics",
    youtubeId: featuredVideos[0].id,
    duration: "04:12",
    directorNote:
      "Examining influence, perception, and self-awareness through calm visual rhythm and typographic emphasis rather than sensationalism.",
    highlights: ["Standardised episode arc", "Mechanism-first writing", "Calm visual authority"],
  },
] as const;

export function ShowreelModal({ triggerLabel = "Watch Showreel" }: { triggerLabel?: string }) {
  const [activeReel, setActiveReel] = useState<(typeof reels)[number]>(reels[0]);
  const videoProjects = projects.slice(0, 3);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          data-cursor="Play"
          className="group h-12 rounded-none border-hairline bg-surface/70 px-6 text-ink backdrop-blur-md transition-all duration-300 hover:border-accent-yellow hover:bg-accent-yellow/10"
        >
          <span className="grid size-6 place-items-center bg-accent-yellow text-accent-foreground transition-transform duration-300 group-hover:scale-110">
            <Play className="size-3 fill-current" />
          </span>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[min(76rem,95vw)] max-w-none overflow-y-auto rounded-none border border-hairline bg-background/95 p-0 backdrop-blur-2xl">
        <div className="premium-grid p-6 md:p-10">
          <DialogHeader className="border-b border-hairline pb-6 text-left">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="label-meta text-accent-yellow">
                  LuminaLM Cinema · Motion & Direction
                </p>
                <DialogTitle className="mt-2 font-display text-[clamp(2rem,4.5vw,4rem)] leading-[0.9] tracking-normal">
                  VISUAL SHOWREEL & DIRECTOR CUTS
                </DialogTitle>
              </div>
              <a
                href="https://youtube.com/@luminalm065"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border border-hairline bg-surface px-4 py-2.5 font-mono text-[10px] uppercase text-ink transition-colors hover:border-accent-blue"
              >
                YouTube Channel (@luminalm065){" "}
                <ArrowUpRight className="size-3.5 text-accent-yellow" />
              </a>
            </div>
            <DialogDescription className="mt-3 max-w-2xl text-sm text-ink-soft">
              Explore selected motion pieces, rhythm studies, and narrative essays produced under
              the LuminaLM direction system.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.45fr_.85fr]">
            <div className="flex flex-col border border-hairline bg-surface">
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  key={activeReel.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeReel.youtubeId}?rel=0&modestbranding=1`}
                  title={activeReel.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase text-accent-blue">
                    {activeReel.number} · {activeReel.subtitle}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold">{activeReel.title}</h3>
                </div>
                <span className="font-mono text-xs tabular-nums text-ink-soft">
                  <Volume2 className="mr-1.5 inline size-3.5 text-accent-yellow" />
                  Runtime {activeReel.duration}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <p className="label-meta">Select Sequence</p>
                {reels.map((reel) => {
                  const isSelected = reel.id === activeReel.id;
                  return (
                    <button
                      key={reel.id}
                      type="button"
                      onClick={() => setActiveReel(reel)}
                      className={`w-full border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-accent-blue bg-surface-strong"
                          : "border-hairline bg-surface/60 hover:border-ink/30 hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase">
                        <span className={isSelected ? "text-accent-yellow" : "text-ink-soft"}>
                          Sequence {reel.number}
                        </span>
                        <span className="tabular-nums text-ink-soft">{reel.duration}</span>
                      </div>
                      <p className="mt-2 font-semibold text-ink">{reel.title}</p>
                      <p className="mt-1 text-xs text-ink-soft">{reel.subtitle}</p>
                    </button>
                  );
                })}
              </div>

              <div className="border border-hairline bg-surface p-5">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-accent-yellow">
                  <Clapperboard className="size-3.5" />
                  <span>Director Breakdown</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {activeReel.directorNote}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-hairline pt-3 font-mono text-[10px] uppercase text-ink">
                  {activeReel.highlights.map((h, i) => (
                    <span key={h} className="inline-flex items-center gap-3">
                      {i > 0 && <span className="text-ink-soft">·</span>}
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-hairline pt-6">
            <p className="label-meta mb-4 flex items-center gap-2">
              <Film className="size-3.5 text-accent-blue" /> Production Archive Studies
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {videoProjects.map((vp) => (
                <div key={vp.slug} className="border border-hairline bg-surface/50 p-4">
                  <p className="font-mono text-[10px] uppercase text-accent-blue">
                    {vp.n} · {vp.category}
                  </p>
                  <p className="mt-1.5 font-semibold">{vp.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                    {vp.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

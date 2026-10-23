import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, CheckCircle2, Eye, Layers } from "lucide-react";
import { motion } from "motion/react";
import { projects, type Project } from "@/data/work";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SelectedWorksShowcase() {
  const [hoveredSlug, setHoveredSlug] = useState<string>(projects[0].slug);
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  const activeProject = projects.find((p) => p.slug === hoveredSlug) ?? projects[0];

  return (
    <section
      className="border-b border-hairline bg-surface"
      aria-labelledby="selected-works-heading"
    >
      <div className="container-editorial section-pad">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-meta text-accent-yellow">
              Selected Works & Case Studies · 06 Archives
            </p>
            <h2
              id="selected-works-heading"
              className="mt-5 font-display text-[clamp(2.7rem,6.5vw,6.5rem)] leading-[0.86] tracking-normal"
            >
              WORK WITH THE
              <br />
              REASONING LEFT IN.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-ink-soft">
              Hover or select any work below to preview its creative direction, or open the
              interactive Case Study Inspector to read the strategy and execution steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-[10px] uppercase">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1.5 text-accent-blue hover:text-accent-yellow"
              >
                Full Portfolio Index <ArrowUpRight className="size-3.5" />
              </Link>
              <span className="text-ink-soft">·</span>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent-yellow"
              >
                Deep Case Studies <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          {/* Left Interactive Index List */}
          <div className="divide-y divide-hairline border-y border-hairline">
            {projects.map((project, index) => {
              const isSelected = project.slug === activeProject.slug;
              return (
                <Reveal key={project.slug} delay={index * 55}>
                  <div
                    onMouseEnter={() => setHoveredSlug(project.slug)}
                    onFocus={() => setHoveredSlug(project.slug)}
                    className={`group relative flex flex-col justify-between gap-4 p-5 transition-colors duration-300 sm:flex-row sm:items-center sm:px-6 sm:py-6 ${
                      isSelected ? "bg-background" : "bg-surface hover:bg-background/60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tabular-nums">
                        <span className={isSelected ? "text-accent-yellow" : "text-accent-blue"}>
                          {project.n}
                        </span>
                        <span className="text-ink-soft">·</span>
                        <span className="text-ink-soft">{project.category}</span>
                        <span className="text-ink-soft">·</span>
                        <span className="hidden text-ink-soft sm:inline">
                          {project.tags.join(" / ")}
                        </span>
                      </div>
                      <h3 className="mt-2 font-editorial text-3xl leading-none tracking-tight sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-xs leading-relaxed text-ink-soft sm:text-sm">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {project.caseStudy ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setInspectedProject(project)}
                          data-cursor="Inspect"
                          className="h-9 rounded-none border-hairline bg-surface px-3 font-mono text-[10px] uppercase hover:border-accent-yellow hover:text-accent-yellow"
                        >
                          <Eye className="mr-1.5 size-3.5" />
                          Quick Inspect
                        </Button>
                      ) : null}
                      <Link
                        to="/portfolio/$slug"
                        params={{ slug: project.slug }}
                        data-cursor="Open"
                        className="inline-flex h-9 items-center gap-1 border border-hairline bg-background px-3 font-mono text-[10px] uppercase text-ink transition-colors hover:border-accent-blue hover:bg-accent-blue hover:text-primary-foreground"
                      >
                        Read <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Sticky Live Visual Preview Card */}
          <div className="lg:sticky lg:top-28">
            <SpotlightCard className="border border-hairline bg-background p-5 sm:p-6">
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-hairline bg-surface">
                  <img
                    src={activeProject.image.src}
                    alt={activeProject.image.alt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-accent-yellow">
                        Archive {activeProject.n} · {activeProject.category}
                      </p>
                      <p className="mt-1 font-editorial text-3xl leading-none">
                        {activeProject.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase text-ink-soft">
                    {activeProject.tags.join(" · ")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {activeProject.caseStudy
                      ? activeProject.caseStudy.overview
                      : activeProject.summary}
                  </p>

                  {activeProject.caseStudy ? (
                    <div className="mt-5 grid gap-3 border-t border-hairline pt-4 sm:grid-cols-2">
                      <div className="border border-hairline bg-surface/60 p-3">
                        <p className="font-mono text-[9px] uppercase text-accent-blue">
                          Core Strategy
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-ink">
                          {activeProject.caseStudy.strategy}
                        </p>
                      </div>
                      <div className="border border-hairline bg-surface/60 p-3">
                        <p className="font-mono text-[9px] uppercase text-accent-yellow">
                          Creative Direction
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-ink">
                          {activeProject.caseStudy.direction}
                        </p>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {activeProject.caseStudy ? (
                      <Button
                        type="button"
                        onClick={() => setInspectedProject(activeProject)}
                        className="h-10 rounded-none bg-accent-blue px-5 font-mono text-[10px] uppercase text-primary-foreground hover:bg-accent-blue/90"
                      >
                        <BookOpen className="mr-1.5 size-3.5" />
                        Open Full Case Study Breakdown
                      </Button>
                    ) : null}
                    <Button
                      asChild
                      variant="outline"
                      className="h-10 rounded-none border-hairline bg-transparent px-4 font-mono text-[10px] uppercase"
                    >
                      <Link to="/portfolio/$slug" params={{ slug: activeProject.slug }}>
                        Project Page <ArrowUpRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* Case Study Inspector Modal */}
      <Dialog
        open={Boolean(inspectedProject)}
        onOpenChange={(o) => !o && setInspectedProject(null)}
      >
        <DialogContent className="max-h-[90vh] w-[min(64rem,94vw)] max-w-none overflow-y-auto rounded-none border border-hairline bg-background p-6 md:p-10">
          {inspectedProject ? (
            <div>
              <DialogHeader className="border-b border-hairline pb-6 text-left">
                <p className="font-mono text-[10px] uppercase text-accent-yellow">
                  Case Study {inspectedProject.n} · {inspectedProject.category} ·{" "}
                  {inspectedProject.tags.join(" · ")}
                </p>
                <DialogTitle className="mt-3 font-editorial text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[0.92]">
                  {inspectedProject.title}
                </DialogTitle>
                <DialogDescription className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {inspectedProject.summary}
                </DialogDescription>
              </DialogHeader>

              {inspectedProject.caseStudy ? (
                <div className="mt-8 space-y-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="border border-hairline bg-surface p-5">
                      <p className="font-mono text-[10px] uppercase text-accent-blue">
                        01. The Challenge
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {inspectedProject.caseStudy.challenge}
                      </p>
                    </div>
                    <div className="border border-hairline bg-surface p-5">
                      <p className="font-mono text-[10px] uppercase text-accent-blue">
                        02. Research & Insight
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {inspectedProject.caseStudy.research}
                      </p>
                    </div>
                    <div className="border border-hairline bg-surface p-5">
                      <p className="font-mono text-[10px] uppercase text-accent-yellow">
                        03. Strategic Approach
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {inspectedProject.caseStudy.strategy}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="border border-hairline bg-surface/60 p-6">
                      <p className="label-meta text-accent-blue">Execution Architecture</p>
                      <ul className="mt-4 space-y-3">
                        {inspectedProject.caseStudy.execution.map((step, idx) => (
                          <li key={step} className="flex items-start gap-3 text-sm text-ink">
                            <span className="font-mono text-xs tabular-nums text-accent-yellow">
                              0{idx + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border border-hairline bg-surface/60 p-6">
                      <p className="label-meta text-accent-yellow">Key Learnings & Outcome</p>
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                        {inspectedProject.caseStudy.result}
                      </p>
                      <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                        {inspectedProject.caseStudy.learnings.map((l) => (
                          <li key={l} className="flex items-center gap-2 text-xs text-ink">
                            <CheckCircle2 className="size-3.5 shrink-0 text-accent-blue" />
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

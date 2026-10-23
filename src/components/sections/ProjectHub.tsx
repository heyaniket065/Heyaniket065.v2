import { useMemo, useState } from "react";
import { ArrowUpRight, Boxes, Check, Copy, ExternalLink, Globe, Search } from "lucide-react";
import { motion } from "motion/react";
import { ecosystemProjects } from "@/data/ecosystem";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const filterCategories = [
  "All",
  "Tools & Platforms",
  "Portfolios & Brand",
  "Creative & Design",
] as const;

function matchesCategory(type: string, category: (typeof filterCategories)[number]) {
  if (category === "All") return true;
  if (category === "Tools & Platforms")
    return type.includes("Productivity") || type.includes("Web application");
  if (category === "Portfolios & Brand")
    return (
      type.includes("Personal") || type.includes("portfolio") || type.includes("Digital experience")
    );
  if (category === "Creative & Design") return type.includes("Creative") || type.includes("Design");
  return true;
}

export function ProjectHub() {
  const [category, setCategory] = useState<(typeof filterCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ecosystemProjects.filter((p) => {
      const catMatch = matchesCategory(p.type, category);
      const qMatch =
        !query.trim() ||
        `${p.title} ${p.description} ${p.type}`.toLowerCase().includes(query.trim().toLowerCase());
      return catMatch && qMatch;
    });
  }, [category, query]);

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    window.setTimeout(() => setCopiedUrl(null), 1800);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          data-cursor="Open"
          className="group h-12 rounded-none bg-accent-blue px-6 text-sm text-primary-foreground shadow-[0_0_36px_color-mix(in_oklab,var(--accent-blue)_28%,transparent)] hover:bg-accent-blue/90"
        >
          <Boxes className="size-4 transition-transform duration-500 group-hover:rotate-12" />
          Open Project Hub
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="inset-0 top-0 h-[100svh] max-h-none w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-background/95 p-0 backdrop-blur-2xl">
        <div className="premium-grid min-h-full px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[90rem]">
            <DialogHeader className="max-w-4xl text-left">
              <p className="label-meta text-accent-yellow">
                LuminaLM · Project OS · 07 Live Deployments
              </p>
              <DialogTitle className="mt-4 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] tracking-normal">
                DIGITAL
                <br />
                ECOSYSTEM
              </DialogTitle>
              <DialogDescription className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                Explore, filter, and launch all of Aniket Bhalerao&apos;s live websites, utility
                platforms, and design experiments from one unified command deck.
              </DialogDescription>
            </DialogHeader>

            {/* Interactive Filter & Search Controls */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-hairline bg-surface/70 p-4 backdrop-blur-md">
              <div className="flex flex-wrap gap-2">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-2 font-mono text-[10px] uppercase transition-colors ${
                      category === cat
                        ? "bg-accent-blue text-primary-foreground"
                        : "border border-hairline bg-background text-ink-soft hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex w-full items-center gap-2 border border-hairline bg-background px-3 py-2 sm:w-72">
                <Search className="size-3.5 text-ink-soft" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter ecosystem..."
                  className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-ink-soft"
                />
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project, index) => (
                <motion.article
                  key={project.url}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.5 }}
                  className={
                    project.number === "05" && category === "All" && !query ? "md:col-span-2" : ""
                  }
                >
                  <SpotlightCard
                    className={`group h-full border bg-surface/85 ${
                      project.number === "05" ? "border-accent-blue/50" : "border-hairline"
                    }`}
                  >
                    <div
                      className={
                        project.number === "05" && category === "All" && !query
                          ? "relative z-10 grid h-full md:grid-cols-[1.35fr_1fr]"
                          : "relative z-10 flex h-full flex-col"
                      }
                    >
                      <div className="aspect-[16/10] overflow-hidden border-b border-hairline bg-surface-strong md:aspect-[16/9]">
                        <img
                          src={project.image}
                          alt={`${project.title} website preview`}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-soft">
                            <span>
                              {project.number} · {project.type}
                            </span>
                            <ExternalLink className="size-4 transition-colors group-hover:text-accent-yellow" />
                          </div>
                          <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                            {project.description}
                          </p>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-hairline">
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-none border-hairline bg-background hover:border-accent-blue hover:bg-accent-blue hover:text-primary-foreground"
                          >
                            <a href={project.url} target="_blank" rel="noreferrer noopener">
                              Launch Site <ArrowUpRight className="size-4" />
                            </a>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => void copyLink(project.url)}
                            className="rounded-none border border-hairline px-3 font-mono text-[10px] uppercase text-ink-soft hover:text-ink"
                          >
                            {copiedUrl === project.url ? (
                              <>
                                <Check className="mr-1 size-3.5 text-accent-yellow" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 size-3.5" /> Copy URL
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

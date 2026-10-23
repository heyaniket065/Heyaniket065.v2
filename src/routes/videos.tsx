import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { CtaBand, PageHeader } from "@/components/sections/Common";
import { featuredVideos } from "@/data/profile";
import { youtube } from "@/data/site";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Aniket Bhalerao × LuminaLM" },
      {
        name: "description",
        content:
          "Watch selected videos by Aniket Bhalerao and explore LuminaLM storytelling, creative experiments, and visual ideas on YouTube.",
      },
      { property: "og:title", content: "Videos — Aniket Bhalerao × LuminaLM" },
      {
        property: "og:description",
        content: "Selected LuminaLM videos blending storytelling, ideas, and visual craft.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Videos / LuminaLM"
        title="Ideas given rhythm, voice, and visual form."
        lede="A growing selection of work from the LuminaLM channel—where storytelling, psychology, technology, and self-improvement meet visual craft."
      >
        <Button
          asChild
          className="mt-8 h-12 rounded-none bg-accent-blue text-primary-foreground hover:bg-accent-blue/90"
        >
          <a href={youtube} target="_blank" rel="noreferrer noopener">
            Visit YouTube channel <ArrowUpRight />
          </a>
        </Button>
      </PageHeader>
      <section className="border-y border-hairline bg-surface">
        <div className="container-editorial section-pad">
          {featuredVideos.map((video, index) => (
            <Reveal key={video.id} delay={index * 80}>
              <article className="grid gap-8 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
                <div className="overflow-hidden border border-hairline bg-background shadow-[0_30px_100px_color-mix(in_oklab,var(--accent-blue)_12%,transparent)]">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="border-t border-hairline pt-6">
                  <div className="flex items-center gap-3 text-accent-yellow">
                    <Play className="size-4" />
                    <span className="label-meta text-accent-yellow">Featured / 0{index + 1}</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold">{video.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{video.description}</p>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase text-accent-blue transition-colors hover:text-accent-yellow"
                  >
                    Open on YouTube <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand
        title="Follow the next LuminaLM release."
        copy="Subscribe on YouTube to see new stories, experiments, and creative ideas as they are published."
      />
    </>
  );
}

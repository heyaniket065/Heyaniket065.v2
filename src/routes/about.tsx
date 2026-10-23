import { createFileRoute } from "@tanstack/react-router";
import { photos, timeline, values } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { CtaBand, PageHeader, SectionHead } from "@/components/sections/Common";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aniket Bhalerao" },
      {
        name: "description",
        content:
          "The story, philosophy and working method behind Aniket Bhalerao and LuminaLM: discipline, storytelling, psychology and strategy.",
      },
      { property: "og:title", content: "About — Aniket Bhalerao" },
      {
        property: "og:description",
        content:
          "Meet Aniket Bhalerao, a digital creator, AI enthusiast, developer, and strategic storyteller building LuminaLM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Me"
        title="Creativity and technology, brought into one practice."
        lede={profile.about}
      />

      <section className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <CurtainImage
            src={photos.campus.src}
            alt={photos.campus.alt}
            ratio="4 / 5"
            imgClassName="grayscale"
          />
          <div className="pb-2">
            <Reveal>
              <p className="label-meta">Who I am</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                I am Aniket Bhalerao, a digital creator, AI enthusiast, developer, and strategic
                storyteller. My work moves between technology and creative expression, always
                looking for a clearer and more useful outcome.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                I enjoy building useful tools, experimenting with AI systems, designing digital
                products, and creating content that combines creativity with technology. Psychology,
                storytelling, and self-improvement shape how I think about people and the
                experiences I build for them.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                LuminaLM is the personal brand connecting these interests under one principle: Think
                Better. Build Better.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial grid gap-10 md:grid-cols-3">
          {[
            {
              t: "Mission",
              c: "Make work where structure, psychology and craft are visible in the result.",
            },
            {
              t: "Vision",
              c: "Grow LuminaLM into a creative practice with a recognisable point of view.",
            },
            { t: "Approach", c: "Write first. Plan second. Produce third. Subtract last." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 90} className="border-t border-ink pt-5">
              <p className="label-meta">{b.t}</p>
              <p className="mt-4 text-[1.35rem] leading-[1.25] tracking-[-0.03em]">{b.c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Timeline" title="A progression, not a highlight reel." />
          <ol className="relative mt-14 border-l border-hairline pl-6 md:pl-10">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 80} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[1.6rem] top-2 size-1.5 rounded-full bg-ink md:-left-[2.6rem]" />
                <p className="label-meta">{t.year}</p>
                <h3 className="mt-3 text-[1.6rem] tracking-[-0.035em]">{t.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{t.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial">
          <SectionHead eyebrow="Values" title="Four rules the work is checked against." />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="bg-background p-7">
                <p className="text-[1.3rem] tracking-[-0.03em]">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-editorial grid gap-12 section-pad lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-meta">Current focus</p>
            <h2 className="mt-4 text-section max-w-[16ch]">
              Building a body of work that compounds.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">
              The near-term focus is consistency: a repeatable format, a stronger edit standard, and
              writing that holds up away from the visuals. The longer-term direction is an ecosystem
              around LuminaLM — resources, essays and collaborative projects.
            </p>
          </div>
          <CurtainImage
            src={photos.waterfall.src}
            alt={photos.waterfall.alt}
            ratio="4 / 3"
            imgClassName="grayscale"
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

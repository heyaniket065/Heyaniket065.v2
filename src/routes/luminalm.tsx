import { createFileRoute } from "@tanstack/react-router";
import { photos, pillars, youtube } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { ButtonLink, CtaBand, PageHeader, SectionHead } from "@/components/sections/Common";
import { NarrativeEngine } from "@/components/sections/NarrativeEngine";

export const Route = createFileRoute("/luminalm")({
  head: () => ({
    meta: [
      { title: "LuminaLM — The Story" },
      {
        name: "description",
        content:
          "What LuminaLM represents, why it exists and how psychology, strategy and visual editing shape the work of Aniket Bhalerao.",
      },
      { property: "og:title", content: "LuminaLM — The Story" },
      {
        property: "og:description",
        content: "What LuminaLM represents, why it exists, and the thinking behind the work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LuminaLM,
});

function LuminaLM() {
  return (
    <>
      <PageHeader
        eyebrow="The brand"
        title="LuminaLM is a way of thinking made visible."
        lede="It began as a place to publish edits. It became the framework behind them: narrative structure, applied psychology, deliberate strategy and visual craft, held to one standard."
      />

      <section className="container-editorial">
        <CurtainImage
          src={photos.bike.src}
          alt={photos.bike.alt}
          ratio="16 / 10"
          imgClassName="grayscale"
        />
      </section>

      <section className="section-pad">
        <div className="container-editorial grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="label-meta">Why it exists</p>
            <p className="mt-5 text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.3] tracking-[-0.03em]">
              Most content disappears because nothing underneath it was decided. LuminaLM is the
              argument that decisions made before production are what make work memorable after it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="label-meta">What it explores</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              How attention actually works. Why some ideas stay and others slide past. What
              discipline looks like when it is a creative tool rather than a personality trait. How
              editing, sound and typography carry meaning that words alone cannot.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Each piece is an experiment in the same question: can this be simpler, clearer and
              still hit harder?
            </p>
            <div className="mt-8">
              <ButtonLink href={youtube} variant="ghost" cursor="Watch">
                Watch on YouTube
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <NarrativeEngine />

      <section className="section-pad">
        <div className="container-editorial">
          <SectionHead eyebrow="The system" title="Five forces, one standard." />
          <div className="mt-14 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="bg-background p-8">
                <p className="label-meta">{p.n}</p>
                <h3 className="mt-6 text-[1.5rem] tracking-[-0.035em]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want the thinking applied to your work?" />
    </>
  );
}

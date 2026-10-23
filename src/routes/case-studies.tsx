import { createFileRoute, Link } from "@tanstack/react-router";
import { caseStudies } from "@/data/work";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — How the Work Was Built" },
      {
        name: "description",
        content:
          "Long-form breakdowns of selected projects: challenge, research, strategy, direction, execution and learnings.",
      },
      { property: "og:title", content: "Case Studies — How the Work Was Built" },
      {
        property: "og:description",
        content: "Long-form breakdowns of selected projects and the thinking behind them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseStudies,
});

function CaseStudies() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="The full reasoning, not the highlight."
        lede="Each study follows the same spine: what the problem was, what was researched, what was decided, and what was learned."
      />

      <section className="container-editorial pb-8">
        <div className="hairline-t">
          {caseStudies.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <Link
                to="/portfolio/$slug"
                params={{ slug: p.slug }}
                data-cursor="Read"
                className="group grid gap-8 border-b border-hairline py-12 lg:grid-cols-[20rem_1fr] lg:gap-14"
              >
                <CurtainImage
                  src={p.image.src}
                  alt={p.image.alt}
                  ratio="4 / 3"
                  imgClassName="grayscale transition-all duration-[1200ms] group-hover:grayscale-0"
                />
                <div>
                  <p className="label-meta">
                    {p.n} · {p.category}
                  </p>
                  <h2 className="mt-4 max-w-[18ch] text-[clamp(1.6rem,3.2vw,2.5rem)] tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {p.caseStudy?.overview}
                  </p>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">
                    <span className="label-meta">Challenge</span>
                    <br />
                    {p.caseStudy?.challenge}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Want your project documented this way?" />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";
import { experience } from "@/data/profile";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Aniket Bhalerao's creator and project experience across LuminaLM, ToolNami, AI research, and independent web development.",
      },
      { property: "og:title", content: "Experience — Aniket Bhalerao" },
      {
        property: "og:description",
        content:
          "A clear record of creator practice, product building, AI experimentation, and web development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience / Practice"
        title="Built through projects, experiments, and steady execution."
        lede="A transparent view of the work behind LuminaLM—combining founder responsibilities, product building, independent development, and ongoing AI research."
      />
      <section className="border-y border-hairline bg-surface">
        <div className="container-editorial section-pad grid gap-14 lg:grid-cols-[.55fr_1.45fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="label-meta text-accent-yellow">Current trajectory</p>
            <h2 className="mt-5 font-editorial text-[clamp(2.7rem,5vw,5rem)] leading-[.92]">
              Learn. Create. Improve.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              This timeline focuses on real initiatives and capabilities. Unverified employers,
              dates, titles, and performance claims are intentionally excluded.
            </p>
            <ArrowDown className="mt-10 size-5 text-accent-blue" />
          </Reveal>
          <ol className="border-t border-hairline">
            {experience.map((item, index) => (
              <Reveal
                as="li"
                key={item.organisation}
                delay={index * 70}
                className="group grid gap-6 border-b border-hairline py-9 md:grid-cols-[5rem_1fr] md:py-12"
              >
                <span className="font-mono text-[10px] text-accent-blue">{item.number} / 04</span>
                <div>
                  <p className="label-meta text-accent-yellow">{item.label}</p>
                  <h3 className="mt-3 text-2xl font-semibold md:text-4xl">{item.role}</h3>
                  <p className="mt-2 font-editorial text-2xl text-ink-soft">{item.organisation}</p>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="border border-hairline px-3 py-1.5 font-mono text-[9px] uppercase text-ink-soft"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand title="Looking for a thoughtful digital collaborator?" />
    </>
  );
}

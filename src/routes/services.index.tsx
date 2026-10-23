import { createFileRoute, Link } from "@tanstack/react-router";
import { services } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Content strategy, digital storytelling, creative direction, media creation, brand narrative, audience strategy, visual editing and personal brand development.",
      },
      { property: "og:title", content: "Services — Aniket Bhalerao" },
      {
        property: "og:description",
        content: "Strategy, storytelling, direction and craft — the ways of working together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Eight ways of working, one method."
        lede="Every engagement starts with structure: what the work is for, who it is for, and what it refuses to be. Production follows that, never the other way around."
      />

      <section className="container-editorial pb-8">
        <ul className="hairline-t">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 50}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  data-cursor="Open"
                  className="group grid gap-3 border-b border-hairline py-8 md:grid-cols-[3rem_1fr_22rem] md:items-baseline md:gap-8"
                >
                  <span className="label-meta">{s.n}</span>
                  <span className="text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {s.title}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">{s.short}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Not sure which one you need?"
        copy="Describe the problem in plain language and the right scope usually becomes obvious."
      />
    </>
  );
}

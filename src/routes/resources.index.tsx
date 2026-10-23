import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { resourceTypes, resources } from "@/data/library";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Resources — Frameworks & Guides" },
      {
        name: "description",
        content:
          "Frameworks, guides and templates from the LuminaLM practice: beat maps, opening frameworks and subtraction checklists.",
      },
      { property: "og:title", content: "Resources — Frameworks & Guides" },
      {
        property: "og:description",
        content: "Frameworks, guides and templates from the LuminaLM practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resources,
});

function Resources() {
  const [active, setActive] = useState<string>("All");
  const list = useMemo(
    () => (active === "All" ? resources : resources.filter((r) => r.type === active)),
    [active],
  );

  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="The tools the work actually uses."
        lede="Working frameworks rather than lead magnets. Everything here is marked honestly — several are still in progress."
      />

      <section className="container-editorial pb-8">
        <div className="hairline-t flex flex-wrap gap-x-6 gap-y-2 py-4">
          {resourceTypes.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              data-cursor="Filter"
              className={`label-meta transition-colors duration-300 ${active === t ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={i * 60} className="bg-background">
              <Link
                to="/resources/$slug"
                params={{ slug: r.slug }}
                data-cursor="Open"
                className="group block h-full p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="label-meta">{r.type}</span>
                  <span className="label-meta">{r.status}</span>
                </div>
                <h3 className="mt-10 text-[1.45rem] tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-1">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Want one of these applied to your project?" />
    </>
  );
}

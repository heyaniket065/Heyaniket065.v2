import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, projects } from "@/data/work";
import { CtaBand, PageHeader, ProjectCard } from "@/components/sections/Common";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Selected Work by Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Selected projects across strategy, storytelling, video and psychology — each documented with the thinking behind it.",
      },
      { property: "og:title", content: "Portfolio — Selected Work by Aniket Bhalerao" },
      {
        property: "og:description",
        content: "Selected projects across strategy, storytelling, video and psychology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active || p.tags.includes(active)),
    [active],
  );

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work, with the reasoning left in."
        lede="Each project is presented the way it was built: problem, research, strategy, direction, execution. Numbers appear only where they are verified."
      />

      <section className="container-editorial">
        <div className="hairline-t hairline-b flex flex-wrap gap-x-6 gap-y-2 py-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="Filter"
              className={`label-meta transition-colors duration-300 ${
                active === c ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {c}
              {active === c ? (
                <span className="ml-2 inline-block h-px w-6 align-middle bg-ink" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="pb-20 text-sm text-ink-soft">Nothing in this category yet.</p>
        ) : null}
      </section>

      <CtaBand title="Have a project worth documenting?" />
    </>
  );
}

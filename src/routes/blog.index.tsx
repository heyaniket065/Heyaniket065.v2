import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { articles, blogCategories } from "@/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Writing by Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Essays on storytelling, psychology, strategy and craft from the LuminaLM practice.",
      },
      { property: "og:title", content: "Journal — Writing by Aniket Bhalerao" },
      {
        property: "og:description",
        content: "Essays on storytelling, psychology, strategy and craft.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [active, setActive] = useState<string>("All");
  const list = useMemo(
    () => (active === "All" ? articles : articles.filter((a) => a.category === active)),
    [active],
  );
  const featured = articles.find((a) => a.featured) ?? articles[0];

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Thinking, written down before it is filmed."
        lede="Notes on structure, attention and the discipline behind creative work."
      />

      {featured ? (
        <section className="container-editorial">
          <Reveal>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              data-cursor="Read"
              className="group block hairline-t hairline-b py-10"
            >
              <p className="label-meta">
                Featured · {featured.category} · {featured.readingTime}
              </p>
              <h2 className="mt-5 max-w-[18ch] text-section transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
            </Link>
          </Reveal>
        </section>
      ) : null}

      <section className="container-editorial pb-8 pt-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-hairline pb-4">
          {blogCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="Filter"
              className={`label-meta transition-colors duration-300 ${active === c ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul>
          {list.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 60}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  data-cursor="Read"
                  className="group grid gap-3 border-b border-hairline py-8 md:grid-cols-[1fr_22rem] md:items-baseline md:gap-10"
                >
                  <div>
                    <p className="label-meta">
                      {a.category} · {a.date} · {a.readingTime}
                    </p>
                    <h3 className="mt-4 text-[clamp(1.4rem,2.6vw,2rem)] tracking-[-0.035em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      {a.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-soft">{a.excerpt}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Reading something you want built?" />
    </>
  );
}

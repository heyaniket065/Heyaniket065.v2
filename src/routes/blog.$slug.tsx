import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { articles, getArticle } from "@/data/blog";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/Common";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    const title = a ? `${a.title} — Journal` : "Journal";
    const description = a?.excerpt ?? "Article.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article } = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <header className="container-editorial pb-12 pt-36 md:pb-16 md:pt-48">
        <Reveal>
          <p className="label-meta">
            {article.category} · {article.date} · {article.readingTime}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[18ch] text-hero">{article.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lede text-ink-soft">{article.excerpt}</p>
        </Reveal>
      </header>

      <article className="container-editorial hairline-t pb-16 pt-12">
        <div className="mx-auto max-w-[46rem]">
          {article.body.map((b, i) => {
            if (b.type === "h2")
              return (
                <Reveal key={i}>
                  <h2 className="mt-14 text-[clamp(1.5rem,3vw,2.1rem)] tracking-[-0.035em]">
                    {b.text}
                  </h2>
                </Reveal>
              );
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <blockquote className="my-10 border-l border-ink pl-6 text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.35] tracking-[-0.03em]">
                    {b.text}
                  </blockquote>
                </Reveal>
              );
            if (b.type === "list")
              return (
                <Reveal key={i}>
                  <ul className="my-6 space-y-3">
                    {(b.items ?? []).map((it) => (
                      <li
                        key={it}
                        className="border-b border-hairline pb-3 text-[1.0625rem] leading-relaxed text-ink-soft"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <Reveal key={i}>
                <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ink-soft">{b.text}</p>
              </Reveal>
            );
          })}
        </div>
      </article>

      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <p className="label-meta">Keep reading</p>
          <ul className="mt-8">
            {more.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  data-cursor="Read"
                  className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-5"
                >
                  <span className="text-[1.35rem] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
                    {a.title}
                  </span>
                  <span className="label-meta">{a.readingTime}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

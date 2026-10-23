import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getResource, resources } from "@/data/library";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, CtaBand } from "@/components/sections/Common";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.resource;
    const title = r ? `${r.title} — Resources` : "Resource";
    const description = r?.summary ?? "Resource detail.";
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
  component: ResourceDetail,
});

function ResourceDetail() {
  const { resource } = Route.useLoaderData();
  const more = resources.filter((r) => r.slug !== resource.slug).slice(0, 3);

  return (
    <>
      <header className="container-editorial pb-14 pt-36 md:pb-20 md:pt-48">
        <Reveal>
          <p className="label-meta">
            {resource.type} · {resource.status}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[14ch] text-hero">{resource.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lede text-ink-soft">{resource.summary}</p>
        </Reveal>
      </header>

      <section className="hairline-t bg-surface">
        <div className="container-editorial grid gap-12 section-pad lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="label-meta">What's inside</p>
            <ul className="mt-6">
              {resource.contents.map((c, i) => (
                <li key={c} className="flex gap-5 border-b border-hairline py-4">
                  <span className="label-meta pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.05rem] tracking-[-0.02em]">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <p className="label-meta">Availability</p>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              {resource.status === "Available"
                ? "This resource is ready. Get in touch and it will be sent across."
                : "This resource is still being written. Ask for it and you'll be told the moment it is ready — nothing is sent before it is genuinely useful."}
            </p>
            <div className="mt-8">
              <ButtonLink to="/contact" cursor="Write">
                Request this resource
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-editorial section-pad">
          <p className="label-meta">More resources</p>
          <ul className="mt-8">
            {more.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/resources/$slug"
                  params={{ slug: r.slug }}
                  data-cursor="Open"
                  className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline py-5"
                >
                  <span className="text-[1.3rem] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
                    {r.title}
                  </span>
                  <span className="label-meta">{r.type}</span>
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

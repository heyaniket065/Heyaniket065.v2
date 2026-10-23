import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService, services } from "@/data/services";
import { projects } from "@/data/work";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, CtaBand, ProjectCard, SectionHead } from "@/components/sections/Common";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s ? `${s.title} — Services` : "Service";
    const description = s?.short ?? "Service detail.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <header className="container-editorial pb-14 pt-36 md:pb-20 md:pt-48">
        <Reveal>
          <p className="label-meta">Service {service.n}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[14ch] text-hero">{service.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lede text-ink-soft">{service.overview}</p>
        </Reveal>
      </header>

      <section className="hairline-t bg-surface">
        <div className="container-editorial grid gap-12 section-pad lg:grid-cols-2">
          <Reveal>
            <p className="label-meta">The problem</p>
            <p className="mt-5 text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.32] tracking-[-0.03em]">
              {service.problem}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="label-meta">Strategic approach</p>
            <ul className="mt-5 space-y-3">
              {service.approach.map((a) => (
                <li
                  key={a}
                  className="border-b border-hairline pb-3 text-sm leading-relaxed text-ink-soft"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial">
          <SectionHead eyebrow="Process" title="Four steps, in this order." />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <Reveal key={p.step} delay={i * 70} className="bg-background p-7">
                <p className="label-meta">{p.step}</p>
                <p className="mt-6 text-[1.3rem] tracking-[-0.03em]">{p.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-editorial grid gap-12 section-pad lg:grid-cols-2">
          <div>
            <p className="label-meta">Deliverables</p>
            <ul className="mt-5">
              {service.deliverables.map((d) => (
                <li key={d} className="border-b border-hairline py-3 text-sm">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-meta">Questions</p>
            <ul className="mt-5">
              {service.faq.map((f) => (
                <li key={f.q} className="border-b border-hairline py-4">
                  <p className="text-[1.05rem] tracking-[-0.02em]">{f.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink to="/faq" variant="ghost" cursor="Open">
                All questions
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Related work" title="Examples of this thinking applied." />
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-editorial section-pad">
          <p className="label-meta">Other services</p>
          <ul className="mt-6">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-baseline justify-between gap-6 border-b border-hairline py-5"
                >
                  <span className="text-[1.3rem] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2">
                    {s.title}
                  </span>
                  <span className="label-meta">{s.n}</span>
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

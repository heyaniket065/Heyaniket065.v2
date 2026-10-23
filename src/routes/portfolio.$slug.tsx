import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/work";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { CtaBand, ProjectCard, SectionHead } from "@/components/sections/Common";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — Case Study` : "Case Study";
    const description = p?.summary ?? "Project case study.";
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
  component: ProjectDetail,
});

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-b border-hairline py-9 md:grid-cols-[12rem_1fr] md:gap-12">
      <p className="label-meta">{label}</p>
      <div className="max-w-2xl text-sm leading-relaxed text-ink-soft">{children}</div>
    </Reveal>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const cs = project.caseStudy;
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <header className="container-editorial pb-12 pt-36 md:pb-16 md:pt-48">
        <Reveal>
          <p className="label-meta">
            {project.n} · {project.category} · {project.year}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-[14ch] text-hero">{project.title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lede text-ink-soft">{project.summary}</p>
        </Reveal>
        <Reveal delay={220}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="border border-hairline px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <section className="container-editorial">
        <CurtainImage
          src={project.image.src}
          alt={project.image.alt}
          ratio="16 / 10"
          imgClassName="grayscale"
        />
      </section>

      {cs ? (
        <section className="container-editorial section-pad">
          <div className="hairline-t">
            <Block label="Overview">{cs.overview}</Block>
            <Block label="Challenge">{cs.challenge}</Block>
            <Block label="Research">{cs.research}</Block>
            <Block label="Strategy">{cs.strategy}</Block>
            <Block label="Creative direction">{cs.direction}</Block>
            <Block label="Execution">
              <ol className="space-y-2">
                {cs.execution.map((e, i) => (
                  <li key={e} className="flex gap-4">
                    <span className="label-meta pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ol>
            </Block>
            <Block label="Result">{cs.result}</Block>
            <Block label="Learnings">
              <ul className="space-y-2">
                {cs.learnings.map((l) => (
                  <li key={l}>— {l}</li>
                ))}
              </ul>
            </Block>
          </div>
        </section>
      ) : null}

      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Next" title="More from the portfolio." />
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

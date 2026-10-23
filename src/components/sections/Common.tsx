import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { Magnetic } from "@/components/motion/Magnetic";
import type { Project } from "@/data/work";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="container-editorial pb-14 pt-36 md:pb-20 md:pt-48">
      <Reveal>
        <p className="label-meta">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-6 max-w-[16ch] font-editorial text-[clamp(3.4rem,7vw,7rem)] leading-[.9]">
          {title}
        </h1>
      </Reveal>
      {lede ? (
        <Reveal delay={160}>
          <p className="mt-7 max-w-2xl text-lede text-ink-soft">{lede}</p>
        </Reveal>
      ) : null}
      {children ? <Reveal delay={220}>{children}</Reveal> : null}
    </header>
  );
}

export function SectionHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="label-meta">{eyebrow}</p>
        <h2 className="mt-4 max-w-[18ch] font-editorial text-[clamp(2.5rem,5vw,5rem)] leading-[.92]">
          {title}
        </h2>
      </div>
      {note ? <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{note}</p> : null}
    </div>
  );
}

export function ButtonLink({
  to,
  href,
  children,
  variant = "solid",
  cursor,
  magnetic = true,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  cursor?: string;
  magnetic?: boolean;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 px-5 py-3 text-[0.85rem] tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    variant === "solid"
      ? "bg-primary text-primary-foreground hover:-translate-y-0.5"
      : "border border-hairline text-ink hover:border-ink hover:bg-surface",
  );
  const inner = (
    <>
      {children}
      <ArrowRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
    </>
  );
  const node = href ? (
    <a href={href} target="_blank" rel="noreferrer noopener" className={cls} data-cursor={cursor}>
      {inner}
    </a>
  ) : (
    <Link to={to ?? "/"} className={cls} data-cursor={cursor}>
      {inner}
    </Link>
  );
  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={index * 90}>
      <Link
        to="/portfolio/$slug"
        params={{ slug: project.slug }}
        data-cursor="View"
        className="group block"
      >
        <div className="relative overflow-hidden">
          <CurtainImage
            src={project.image.src}
            alt={project.image.alt}
            ratio="4 / 5"
            delay={index * 90}
            imgClassName="grayscale transition-all duration-[1400ms] group-hover:grayscale-0 group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 label-meta text-background mix-blend-difference">
            {project.n}
          </span>
          <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-ink/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:flex">
            <span className="inline-flex translate-y-2 items-center gap-1.5 bg-primary px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
              View Project <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.35rem] tracking-[-0.03em]">{project.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{project.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="border border-hairline px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-ink-soft"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
        </div>
      </Link>
    </Reveal>
  );
}

export function CtaBand({
  title = "Let's build something meaningful.",
  copy = "Bring the idea, the constraint or the half-finished thought. The rest is structure.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="hairline-t bg-surface">
      <div className="container-editorial section-pad">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="max-w-[14ch] text-section">{title}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm leading-relaxed text-ink-soft">{copy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/contact" cursor="Write">
                Start a conversation
              </ButtonLink>
              <ButtonLink to="/portfolio" variant="ghost" cursor="View">
                Explore portfolio
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

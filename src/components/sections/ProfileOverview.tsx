import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BriefcaseBusiness, CircleUserRound, Play, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const previews = [
  {
    to: "/about",
    eyebrow: "About me",
    title: "Creativity and technology, shaped with intention.",
    copy: "A multidisciplinary creator building at the intersection of AI, code, design, psychology, and story.",
    icon: CircleUserRound,
    meta: "Identity · Vision · Discipline",
  },
  {
    to: "/skills",
    eyebrow: "Skills",
    title: "From intelligent systems to visual craft.",
    copy: "AI, Python, web development, Figma, content, editing, and the tools behind polished digital work.",
    icon: Sparkles,
    meta: "AI · Web · Design · Media",
  },
  {
    to: "/experience",
    eyebrow: "Experience",
    title: "A practice built through real projects.",
    copy: "LuminaLM, ToolNami, AI research, and independent web projects—presented without invented titles or metrics.",
    icon: BriefcaseBusiness,
    meta: "04 Practice Pillars",
  },
  {
    to: "/videos",
    eyebrow: "Videos",
    title: "Ideas developed through motion and narrative.",
    copy: "Watch selected LuminaLM work and follow the evolving video archive on YouTube.",
    icon: Play,
    meta: "Film · Pacing · Strategy",
  },
] as const;

export function ProfileOverview() {
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="container-editorial section-pad">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <p className="label-meta text-accent-yellow">Profile · At a glance</p>
            <h2 className="mt-5 max-w-4xl font-editorial text-[clamp(3rem,6vw,6.5rem)] leading-[.9]">
              A creator who thinks across disciplines.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft lg:justify-self-end">
            Digital creator, AI enthusiast, developer, and strategic storyteller—building useful
            experiences under LuminaLM.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {previews.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.to} delay={index * 70} className="h-full">
                <SpotlightCard tilt className="h-full border border-hairline bg-background">
                  <Link
                    to={item.to}
                    data-cursor="Explore"
                    className="group relative z-10 flex h-full min-h-[21rem] flex-col p-6 transition-colors duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="size-5 text-accent-blue transition-transform duration-500 group-hover:scale-110" />
                      <ArrowUpRight className="size-4 text-ink-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-yellow" />
                    </div>
                    <div className="mt-auto pt-14">
                      <p className="label-meta text-accent-blue">
                        0{index + 1} · {item.eyebrow}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold leading-tight transition-colors group-hover:text-accent-yellow">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.copy}</p>
                      <p className="mt-5 border-t border-hairline pt-3 font-mono text-[10px] uppercase text-ink-soft">
                        {item.meta}
                      </p>
                    </div>
                  </Link>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

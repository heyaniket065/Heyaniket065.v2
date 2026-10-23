import { createFileRoute } from "@tanstack/react-router";
import {
  Braces,
  BrainCircuit,
  Clapperboard,
  PenTool,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";
import { skillGroups } from "@/data/profile";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Explore Aniket Bhalerao's skills across AI, LLMs, Python, web development, UI/UX, Figma, content creation, video editing, and visual design.",
      },
      { property: "og:title", content: "Skills — Aniket Bhalerao" },
      {
        property: "og:description",
        content: "A multidisciplinary toolkit spanning AI, development, design, and digital media.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkillsPage,
});

const icons: LucideIcon[] = [BrainCircuit, Braces, PenTool, Clapperboard];

function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills / Capabilities"
        title="A toolkit built for ideas that need to become real."
        lede="Technical curiosity, visual judgment, and storytelling craft—combined to move from early thinking to a polished digital experience."
      />
      <section className="container-editorial pb-24 md:pb-36">
        <div className="grid gap-3 lg:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <Reveal key={group.label} delay={index * 70}>
                <article className="group flex min-h-[25rem] flex-col border border-hairline bg-surface p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent-blue/60 md:p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="size-7 text-accent-blue transition-transform duration-500 group-hover:scale-110" />
                    <span className="font-mono text-[10px] text-ink-soft">0{index + 1} / 04</span>
                  </div>
                  <div className="mt-auto pt-16">
                    <p className="label-meta text-accent-yellow">{group.label}</p>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
                      {group.description}
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="border border-hairline bg-background px-3 py-2 font-mono text-[10px] uppercase text-ink transition-colors duration-300 group-hover:border-accent-blue/30"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal
          delay={280}
          className="mt-3 flex items-center gap-3 border border-hairline p-5 text-sm text-ink-soft"
        >
          <Sparkles className="size-4 shrink-0 text-accent-yellow" />
          Tools support the work. Clear thinking, curiosity, and consistent practice shape the
          result.
        </Reveal>
      </section>
      <CtaBand title="Need this mix of creative and technical thinking?" />
    </>
  );
}

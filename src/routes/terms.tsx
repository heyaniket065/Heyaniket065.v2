import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Aniket Bhalerao" },
      { name: "description", content: "Terms of use for this site and the work presented on it." },
      { property: "og:title", content: "Terms — Aniket Bhalerao" },
      {
        property: "og:description",
        content: "Terms of use for this site and the work presented on it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    t: "Ownership",
    c: "All writing, photographs and project documentation on this site belong to Aniket Bhalerao unless stated otherwise. Please do not republish them as your own.",
  },
  {
    t: "Use of the work",
    c: "You are welcome to reference, quote or link to anything here with attribution. Commercial reuse requires permission.",
  },
  {
    t: "Accuracy",
    c: "Content is kept honest and deliberately conservative. Where a figure or claim is not verified, it is left out rather than estimated.",
  },
  {
    t: "Engagements",
    c: "Any paid work is governed by the scope agreed in writing before it begins, not by this page.",
  },
  {
    t: "Changes",
    c: "These terms may be updated as the practice grows. The current version is always the one shown here.",
  },
];

function Terms() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="The plain version." />
      <section className="container-editorial hairline-t pb-24 pt-10">
        <div className="mx-auto max-w-[46rem]">
          {sections.map((s, i) => (
            <Reveal key={s.t} delay={i * 60} className="border-b border-hairline py-8">
              <h2 className="text-[1.35rem] tracking-[-0.03em]">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.c}</p>
            </Reveal>
          ))}
          <p className="mt-8 text-xs text-ink-soft">
            This is a plain-language summary, not legal advice.
          </p>
        </div>
      </section>
    </>
  );
}

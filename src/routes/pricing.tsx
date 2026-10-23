import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, CtaBand, PageHeader, SectionHead } from "@/components/sections/Common";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Working Together" },
      {
        name: "description",
        content:
          "How engagements are scoped and priced: transparent tiers, honest placeholders and no invented figures.",
      },
      { property: "og:title", content: "Pricing — Working Together" },
      {
        property: "og:description",
        content: "How engagements are scoped and priced, explained plainly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    n: "01",
    name: "Single piece",
    scope: "One project taken from idea to finished output.",
    includes: [
      "Discovery conversation",
      "Narrative structure",
      "Creative direction",
      "Production and edit",
      "One revision round",
    ],
    best: "A launch video, a signature piece, a reset of an existing format.",
  },
  {
    n: "02",
    name: "Series",
    scope: "A repeatable format designed to compound over time.",
    includes: [
      "Audience and motivation map",
      "Series architecture",
      "Episode pattern and templates",
      "Batch production",
      "Review rhythm",
    ],
    best: "Creators or brands publishing regularly who want coherence.",
    featured: true,
  },
  {
    n: "03",
    name: "Ongoing direction",
    scope: "Continuous strategy and creative direction across your output.",
    includes: [
      "Monthly planning",
      "Narrative and brand guardrails",
      "Edit reviews",
      "Positioning work",
      "Async availability",
    ],
    best: "Long-term partnerships where consistency matters more than volume.",
  },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Scope first. Numbers second."
        lede="Rates are set against scope, not against a menu. The tiers below describe what an engagement contains; exact figures are agreed in conversation."
      />

      <section className="container-editorial pb-8">
        <div className="grid gap-px bg-hairline lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal
              key={t.n}
              delay={i * 90}
              className={t.featured ? "bg-ink text-background p-9" : "bg-background p-9"}
            >
              <div className="flex items-center justify-between">
                <span className="label-meta">{t.n}</span>
                {t.featured ? <span className="label-meta">Most requested</span> : null}
              </div>
              <h2 className="mt-10 text-[1.75rem] tracking-[-0.04em]">{t.name}</h2>
              <p
                className={`mt-3 text-sm leading-relaxed ${t.featured ? "opacity-70" : "text-ink-soft"}`}
              >
                {t.scope}
              </p>
              <p className={`mt-10 text-[2.5rem] tracking-[-0.05em] ${t.featured ? "" : ""}`}>
                On request
              </p>
              <p className={`mt-2 text-xs ${t.featured ? "opacity-60" : "text-ink-soft"}`}>
                Priced per scope, quoted before work begins.
              </p>
              <ul className="mt-8 space-y-3">
                {t.includes.map((inc) => (
                  <li
                    key={inc}
                    className={`border-b pb-3 text-sm ${t.featured ? "border-background/20 opacity-80" : "border-hairline text-ink-soft"}`}
                  >
                    {inc}
                  </li>
                ))}
              </ul>
              <p
                className={`mt-6 text-sm leading-relaxed ${t.featured ? "opacity-70" : "text-ink-soft"}`}
              >
                <span className="label-meta">Best for</span>
                <br />
                {t.best}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial">
          <SectionHead
            eyebrow="How it works"
            title="What you pay for is the thinking, then the making."
            note="No retainers you cannot leave, no packages padded with deliverables nobody reads."
          />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                s: "Step 01",
                t: "Conversation",
                c: "Describe the problem. If it is not a fit, you will be told directly.",
              },
              {
                s: "Step 02",
                t: "Scope",
                c: "A written scope with what is included and what is deliberately excluded.",
              },
              {
                s: "Step 03",
                t: "Quote",
                c: "A figure against that scope. It does not move unless the scope does.",
              },
              {
                s: "Step 04",
                t: "Work",
                c: "Structure, production, review, delivery — in that order.",
              },
            ].map((x, i) => (
              <Reveal key={x.s} delay={i * 70} className="bg-background p-7">
                <p className="label-meta">{x.s}</p>
                <p className="mt-6 text-[1.3rem] tracking-[-0.03em]">{x.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{x.c}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-soft">
              Note: pricing figures are intentionally left as “on request” rather than invented.
              Replace these with your real rates whenever you're ready.
            </p>
            <div className="mt-8">
              <ButtonLink to="/contact" cursor="Write">
                Ask for a quote
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Ready to scope something?" />
    </>
  );
}

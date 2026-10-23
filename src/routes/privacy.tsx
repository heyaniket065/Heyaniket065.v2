import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Aniket Bhalerao" },
      { name: "description", content: "How information submitted through this site is handled." },
      { property: "og:title", content: "Privacy — Aniket Bhalerao" },
      {
        property: "og:description",
        content: "How information submitted through this site is handled.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    t: "What is collected",
    c: "Only what you type into the contact form: your name, email, and the message itself. There is no tracking pixel, advertising network or analytics profile built about you here.",
  },
  {
    t: "How it is used",
    c: "Solely to reply to your enquiry and to discuss possible work. It is never sold, traded or shared for marketing.",
  },
  {
    t: "Storage",
    c: "The contact form on this site is currently a front-end demonstration and does not transmit or store submissions. If that changes, this page will be updated before it does.",
  },
  {
    t: "Third parties",
    c: "External links (YouTube, social platforms) are governed by their own privacy policies once you leave this site.",
  },
  {
    t: "Your control",
    c: "You may ask for any message you have sent to be deleted. Ask, and it will be.",
  },
];

function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Short, because there is little to collect." />
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

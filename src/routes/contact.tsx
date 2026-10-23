import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { budgets, projectTypes, timelines } from "@/data/library";
import { site, socials, youtube } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a Conversation" },
      {
        name: "description",
        content:
          "Start a conversation about strategy, storytelling, creative direction or collaboration with Aniket Bhalerao.",
      },
      { property: "og:title", content: "Contact — Start a Conversation" },
      {
        property: "og:description",
        content: "Start a conversation about strategy, storytelling or collaboration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const field =
  "w-full border-b border-hairline bg-transparent py-3 text-[0.95rem] outline-none transition-colors duration-300 placeholder:text-ink-soft focus:border-ink";

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you're trying to make."
        lede="Plain description beats a polished brief. If it isn't a fit, you'll be told directly rather than quoted anyway."
      />

      <section className="container-editorial hairline-t pb-8 pt-12">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            {sent ? (
              <Reveal>
                <div className="border border-hairline p-10">
                  <p className="label-meta">Received</p>
                  <h2 className="mt-5 max-w-[18ch] text-section">Thanks — your note is noted.</h2>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
                    This form is a front-end demonstration and does not yet deliver messages
                    anywhere. Connect it to email or a database whenever you're ready and it will
                    start sending for real.
                  </p>
                  <button onClick={() => setSent(false)} className="link-underline mt-8 text-sm">
                    Write another message
                  </button>
                </div>
              </Reveal>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-8"
              >
                <Reveal className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="label-meta" htmlFor="name">
                      Name
                    </label>
                    <input id="name" required placeholder="Your name" className={`${field} mt-3`} />
                  </div>
                  <div>
                    <label className="label-meta" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className={`${field} mt-3`}
                    />
                  </div>
                </Reveal>

                <Reveal delay={60}>
                  <label className="label-meta" htmlFor="type">
                    Project type
                  </label>
                  <select id="type" className={`${field} mt-3`} defaultValue={projectTypes[0]}>
                    {projectTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Reveal>

                <Reveal delay={120} className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label className="label-meta" htmlFor="budget">
                      Budget
                    </label>
                    <select id="budget" className={`${field} mt-3`} defaultValue={budgets[0]}>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-meta" htmlFor="timeline">
                      Timeline
                    </label>
                    <select id="timeline" className={`${field} mt-3`} defaultValue={timelines[0]}>
                      {timelines.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </Reveal>

                <Reveal delay={180}>
                  <label className="label-meta" htmlFor="message">
                    What are you trying to make?
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="The idea, the constraint, or the half-finished thought."
                    className={`${field} mt-3 resize-none`}
                  />
                </Reveal>

                <Reveal delay={240}>
                  <button
                    type="submit"
                    data-cursor="Send"
                    className="group inline-flex items-center gap-2 bg-ink px-6 py-3.5 text-[0.85rem] text-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                  >
                    Send message
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </Reveal>
              </form>
            )}
          </div>

          <aside>
            <Reveal>
              <p className="label-meta">Elsewhere</p>
              <ul className="mt-6">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between border-b border-hairline py-4 text-sm"
                    >
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {s.label}
                      </span>
                      <span className="text-ink-soft">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <p className="label-meta mt-12">Response</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Messages are read personally. Replies come when there is something worth saying,
                usually within a few days.
              </p>
              <p className="mt-8 text-sm leading-relaxed text-ink-soft">
                {site.name} · {site.brand}
                <br />
                <a
                  href={youtube}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline"
                >
                  YouTube
                </a>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      <div className="h-24" />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { faqCategories, faqs } from "@/data/library";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Working with Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Questions about LuminaLM, services, process, pricing and collaboration — answered plainly.",
      },
      { property: "og:title", content: "FAQ — Working with Aniket Bhalerao" },
      {
        property: "og:description",
        content: "Questions about LuminaLM, services, process and collaboration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  const [active, setActive] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null);
  const list = useMemo(
    () => (active === "All" ? faqs : faqs.filter((f) => f.category === active)),
    [active],
  );

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Answers, without the sales voice."
        lede="If a question is missing, ask it directly — the answer will be added here."
      />

      <section className="container-editorial pb-8">
        <div className="hairline-t flex flex-wrap gap-x-6 gap-y-2 py-4">
          {faqCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              data-cursor="Filter"
              className={`label-meta transition-colors duration-300 ${active === c ? "text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <ul>
          {list.map((f, i) => {
            const isOpen = open === f.q;
            return (
              <li key={f.q} className="border-b border-hairline">
                <Reveal delay={i * 40}>
                  <button
                    onClick={() => setOpen(isOpen ? null : f.q)}
                    data-cursor={isOpen ? "Close" : "Open"}
                    className="flex w-full items-start justify-between gap-8 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="max-w-2xl text-[clamp(1.05rem,1.8vw,1.35rem)] tracking-[-0.025em]">
                      {f.q}
                    </span>
                    <Plus
                      className={`mt-1 size-4 shrink-0 text-ink-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand title="Still have a question?" copy="Ask it directly — plain answers, no pitch." />
    </>
  );
}

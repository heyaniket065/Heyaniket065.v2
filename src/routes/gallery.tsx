import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { photos } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";
import { CtaBand, PageHeader } from "@/components/sections/Common";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Aniket Bhalerao" },
      {
        name: "description",
        content: "A small visual record: discipline, place and identity behind the LuminaLM work.",
      },
      { property: "og:title", content: "Gallery — Aniket Bhalerao" },
      { property: "og:description", content: "A small visual record behind the LuminaLM work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

const items = [
  { ...photos.ncc, caption: "Discipline", ratio: "3 / 4" },
  { ...photos.waterfall, caption: "Distance", ratio: "4 / 5" },
  { ...photos.campus, caption: "Everyday", ratio: "4 / 5" },
  { ...photos.bike, caption: "Motion", ratio: "3 / 4" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A visual record, kept short."
        lede="Only real photographs. Nothing staged for a portfolio, nothing generated."
      />

      <section className="container-editorial pb-8">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.src} className={i % 2 === 1 ? "md:mt-24" : undefined}>
              <button
                onClick={() => setOpen(i)}
                data-cursor="Expand"
                className="block w-full text-left"
              >
                <CurtainImage
                  src={it.src}
                  alt={it.alt}
                  ratio={it.ratio}
                  imgClassName="grayscale transition-all duration-[1200ms] hover:grayscale-0"
                />
              </button>
              <Reveal delay={80}>
                <div className="hairline-t mt-4 flex items-center justify-between pt-3">
                  <span className="label-meta">{it.caption}</span>
                  <span className="label-meta">{String(i + 1).padStart(2, "0")} / 04</span>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {open !== null ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-6 top-6 border border-hairline p-2.5 transition-colors hover:border-ink"
          >
            <X className="size-4" />
          </button>
          <img
            src={items[open]!.src}
            alt={items[open]!.alt}
            className="max-h-[82vh] w-auto object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}

      <div className="mt-16">
        <CtaBand title="Want visuals made with this eye?" />
      </div>
    </>
  );
}

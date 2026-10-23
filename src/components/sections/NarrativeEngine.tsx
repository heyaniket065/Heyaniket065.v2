import { pillars } from "@/data/site";
import { CurtainImage } from "@/components/motion/Curtain";
import { Reveal } from "@/components/motion/Reveal";

export function NarrativeEngine() {
  return (
    <section id="narrative-engine" aria-label="Explore the thinking" className="hairline-t">
      <div className="container-editorial section-pad">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="label-meta text-signal">Discipline matrix / 05</p>
              <h2 className="mt-4 max-w-[12ch] font-editorial text-[clamp(2.8rem,6vw,6.5rem)] leading-[.88]">
                Explore the thinking behind the work.
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed text-ink-soft md:block">
              Five forces. One operating system. Built to turn ambiguity into deliberate output.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid auto-rows-[minmax(16rem,auto)] gap-3 md:grid-cols-6">
          {pillars.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 70}
              className={
                i === 0
                  ? "md:col-span-4 md:row-span-2"
                  : i === 1 || i === 4
                    ? "md:col-span-2"
                    : "md:col-span-3"
              }
            >
              <article className="group relative h-full min-h-[18rem] overflow-hidden border border-hairline bg-surface p-6 md:p-8">
                <CurtainImage
                  src={p.photo.src}
                  alt={p.photo.alt}
                  ratio={i === 0 ? "16 / 9" : "4 / 5"}
                  className="absolute inset-0 h-full opacity-35"
                  imgClassName="grayscale brightness-75 transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-transparent" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex justify-between">
                    <span className="label-meta text-signal">{p.n}</span>
                    <span className="label-meta">{p.line}</span>
                  </div>
                  <div className="pt-24">
                    <h3
                      className={
                        i === 0
                          ? "font-editorial text-[clamp(3rem,6vw,6rem)] leading-none"
                          : "font-editorial text-4xl leading-none"
                      }
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">{p.copy}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

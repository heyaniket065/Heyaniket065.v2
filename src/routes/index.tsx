import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Copy,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MonitorSmartphone,
  Play,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";
import { ecosystemProjects } from "@/data/ecosystem";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { CurtainImage } from "@/components/motion/Curtain";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectHub } from "@/components/sections/ProjectHub";
import { ShowreelModal } from "@/components/sections/ShowreelModal";
import { InteractiveStudio } from "@/components/sections/InteractiveStudio";
import { SelectedWorksShowcase } from "@/components/sections/SelectedWorksShowcase";
import { Lumina3DStage } from "@/components/sections/Lumina3DStage";
import { BioscienceWorkbench } from "@/components/sections/BioscienceWorkbench";
import { WorldClassEnhancements } from "@/components/sections/WorldClassEnhancements";
import { HomeContact } from "@/components/sections/HomeContact";
import { ProfileOverview } from "@/components/sections/ProfileOverview";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket Bhalerao — Digital Creator, AI Enthusiast & Developer" },
      {
        name: "description",
        content:
          "Portfolio of Aniket Bhalerao, a digital creator, AI enthusiast, developer, strategic storyteller, and creator of LuminaLM.",
      },
      {
        name: "keywords",
        content:
          "Aniket Bhalerao, LuminaLM, Digital Creator, Portfolio, Website Creator, ToolNami, AI Projects, Personal Brand",
      },
      { property: "og:title", content: "Aniket Bhalerao — Digital Creator × LuminaLM" },
      {
        property: "og:description",
        content:
          "Explore AI experiments, digital products, web projects, stories, and the growing LuminaLM ecosystem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const platforms = [
  {
    name: "GitHub",
    handle: "heyaniket065",
    href: "https://github.com/heyaniket065?tab=repositories",
    icon: Github,
    className: "col-span-2 lg:col-span-5",
    number: "01",
    category: "Code / Experiments",
  },
  {
    name: "YouTube",
    handle: "@luminalm065",
    href: "https://youtube.com/@luminalm065",
    icon: Youtube,
    className: "lg:col-span-4",
    number: "02",
    category: "Film / Ideas",
  },
  {
    name: "LinkedIn",
    handle: "Aniket Bhalerao",
    href: "https://www.linkedin.com/in/aniket-bhalerao-o07",
    icon: Linkedin,
    className: "lg:col-span-3",
    number: "03",
    category: "Work / Network",
  },
  {
    name: "Instagram",
    handle: "@hey_aniket_065",
    href: "https://www.instagram.com/hey_aniket_065",
    icon: Instagram,
    className: "lg:col-span-5",
    number: "04",
    category: "Visual diary",
  },
  {
    name: "X",
    handle: "@Instgram136",
    href: "https://x.com/Instgram136",
    icon: X,
    className: "lg:col-span-3",
    number: "05",
    category: "Thoughts / Notes",
  },
  {
    name: "Facebook",
    handle: "Connect",
    href: "https://www.facebook.com/share/19cdfcUFpw/",
    icon: Facebook,
    className: "lg:col-span-4",
    number: "06",
    category: "Community",
  },
];

const founderTimeline = [
  {
    year: "STUDY",
    title: "BA Student",
    copy: "Building cultural, linguistic, and journalistic range through formal study.",
  },
  {
    year: "CREATE",
    title: "Digital Creator & Storyteller",
    copy: "Turning observations into stories, visual systems, and useful digital experiences.",
  },
  {
    year: "BUILD",
    title: "Website Builder & AI Enthusiast",
    copy: "Exploring modern interfaces, practical AI, and products designed around real people.",
  },
  {
    year: "FOUND",
    title: "Creator of LuminaLM",
    copy: "Growing a connected ecosystem where ideas become websites, tools, media, and future ventures.",
  },
];

const heroStats = [
  {
    num: "07",
    label: "Live Digital Properties",
    detail: "Deployed websites, AI tools & creative platforms",
  },
  {
    num: "06",
    label: "Connected Channels",
    detail: "GitHub · YouTube · LinkedIn · Instagram · X · FB",
  },
  {
    num: "04",
    label: "Core Craft Pillars",
    detail: "AI Systems · Web Engineering · Design · Storytelling",
  },
  {
    num: "24/7",
    label: "LuminaLM Ecosystem",
    detail: "Independent studio shipping tools, code & media",
  },
] as const;

function PortraitTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 140, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 24 });
  const badgeX = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 140,
    damping: 24,
  });
  const badgeY = useSpring(useTransform(y, [-0.5, 0.5], [-8, 8]), { stiffness: 140, damping: 24 });
  const glowX = useTransform(x, [-0.5, 0.5], [15, 85]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative mx-auto w-full max-w-[31rem] [perspective:1200px] lg:ml-auto"
    >
      <div
        aria-hidden
        className="aura-breathe absolute inset-[6%] rounded-full bg-accent-blue/30 blur-[95px]"
      />
      <div
        aria-hidden
        className="float-ring pointer-events-none absolute -right-6 -top-6 hidden size-28 rounded-full border border-dashed border-accent-yellow/35 sm:block"
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="portrait-float relative border border-ink/20 bg-surface p-2 shadow-[0_30px_100px_color-mix(in_oklab,var(--accent-blue)_24%,transparent)]"
      >
        <div className="relative overflow-hidden">
          <CurtainImage
            src="/images/aniket-company-black-shirt.png"
            alt="Aniket Bhalerao in a professional black outfit"
            ratio="4 / 5"
            loading="eager"
            direction="center"
            imgClassName="object-cover object-[50%_28%]"
          />
          <div
            aria-hidden
            className="holo-scanline pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-transparent via-accent-blue/15 to-transparent"
          />
        </div>

        <motion.div
          aria-hidden
          style={{ left: useTransform(glowX, (value) => `${value}%`) }}
          className="pointer-events-none absolute inset-y-2 w-16 -skew-x-12 bg-linear-to-r from-transparent via-ink/15 to-transparent blur-lg"
        />

        {/* Floating Top-Left Parallax Tag */}
        <motion.div
          style={{ x: badgeX, y: badgeY }}
          className="absolute left-5 top-5 border border-ink/15 bg-background/80 px-3 py-1.5 backdrop-blur-xl"
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-accent-blue">
            AI · Code · Story
          </p>
        </motion.div>

        {/* Bottom Identity Bar */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between border border-ink/15 bg-background/80 p-3.5 backdrop-blur-xl">
          <div>
            <p className="font-mono text-[9px] uppercase text-accent-yellow">Creator · Founder</p>
            <p className="mt-1 text-sm font-semibold">Aniket Bhalerao × LuminaLM</p>
          </div>
          <span className="font-mono text-[9px] uppercase tabular-nums text-ink-soft">
            07 Live Sites
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="premium-grid relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-hairline pt-28">
      <div
        aria-hidden
        className="particle-drift absolute left-[8%] top-[22%] size-1 bg-accent-yellow"
      />
      <div
        aria-hidden
        className="particle-drift absolute right-[9%] top-[17%] size-1 bg-accent-blue [animation-delay:1.4s]"
      />
      <div
        aria-hidden
        className="particle-drift absolute bottom-[14%] left-[48%] size-1 bg-ink [animation-delay:2.8s]"
      />

      <div className="container-editorial my-auto grid w-full gap-12 py-12 lg:grid-cols-[1.45fr_.85fr] lg:items-center">
        <div className="relative z-10">
          <Reveal>
            <p className="label-meta text-accent-yellow">
              LuminaLM Flagship Portfolio · Creative Technology & Storytelling
            </p>
          </Reveal>
          <MaskText
            text={"ANIKET\nBHALERAO"}
            as="h1"
            delay={120}
            step={90}
            className="mt-7 font-display text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.82] tracking-normal"
          />
          <Reveal delay={360}>
            <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase leading-relaxed text-accent-blue sm:text-xs">
              Digital Creator <span className="text-ink-soft">·</span> AI Enthusiast{" "}
              <span className="text-ink-soft">·</span> Developer{" "}
              <span className="text-ink-soft">·</span> Strategic Storyteller
            </p>
          </Reveal>
          <Reveal delay={440}>
            <p className="mt-6 font-editorial text-[clamp(2rem,4vw,4rem)] leading-none">
              Think Better. <span className="text-accent-yellow">Build Better.</span>
            </p>
          </Reveal>
          <Reveal delay={520}>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
              Building useful tools, experimenting with AI systems, designing digital products, and
              creating content that combines creativity with technology.
            </p>
          </Reveal>
          <Reveal delay={600} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#ecosystem"
                data-cursor="Explore"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-none bg-accent-blue px-6 text-primary-foreground hover:bg-accent-blue/90",
                )}
              >
                Explore Projects <ArrowDownRight />
              </a>
            </Magnetic>
            <Magnetic>
              <ProjectHub />
            </Magnetic>
            <Magnetic>
              <ShowreelModal triggerLabel="Watch Showreel" />
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-cursor="Write"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-none border-hairline bg-transparent px-6 hover:border-accent-yellow hover:bg-accent-yellow/10 hover:text-ink",
                )}
              >
                Connect With Me
              </a>
            </Magnetic>
          </Reveal>
        </div>
        <Reveal delay={240}>
          <PortraitTilt />
        </Reveal>
      </div>

      {/* Full-Width 4-Column Ecosystem & Discipline Strip Below Hero Split */}
      <div className="border-t border-hairline bg-surface/85 backdrop-blur-md">
        <div className="container-editorial grid grid-cols-2 divide-x divide-y divide-hairline lg:grid-cols-4 lg:divide-y-0">
          {heroStats.map((stat, idx) => (
            <Reveal key={stat.label} delay={150 + idx * 60} className="p-5 sm:p-6">
              <p className="font-display text-3xl leading-none tabular-nums text-accent-yellow sm:text-4xl">
                {stat.num}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase text-ink">{stat.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformHub() {
  return (
    <section className="border-y border-hairline" aria-labelledby="platform-heading">
      <div className="container-editorial section-pad">
        <Reveal className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="label-meta text-accent-yellow">Platform hub · Connected surface</p>
            <h2
              id="platform-heading"
              className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,7vw,7rem)] leading-[0.9] tracking-normal"
            >
              ONE CREATOR.
              <br />
              MANY SURFACES.
            </h2>
          </div>
          <div className="max-w-sm lg:pb-1">
            <p className="text-sm leading-relaxed text-ink-soft">
              Follow the work, code, films, posts, and evolving ideas across Aniket&apos;s connected
              digital presence.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tabular-nums text-accent-blue">
              06 channels · One connected practice
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-2.5 lg:mt-14 lg:grid-cols-12 lg:gap-3">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <Reveal
                key={platform.name}
                delay={index * 55}
                className={`min-w-0 ${platform.className}`}
              >
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="Visit"
                  aria-label={`${platform.name} — ${platform.handle} (opens in a new tab)`}
                  onPointerMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                  }}
                  className={`social-tile spotlight-card group relative flex h-full min-h-[170px] flex-col justify-between overflow-hidden border border-hairline bg-surface p-4 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-accent-blue focus-visible:outline-2 focus-visible:outline-accent-blue sm:p-6 lg:min-h-[240px] ${
                    index === 0 ? "min-h-[205px] lg:min-h-[240px]" : ""
                  }`}
                >
                  {index === 0 && (
                    <span
                      aria-hidden
                      className="social-orbit absolute -right-10 -top-20 size-56 rounded-full border border-accent-blue/20 sm:size-72"
                    />
                  )}
                  <span className="relative z-10 flex items-start justify-between gap-2">
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-5 shrink-0 text-accent-blue transition-transform duration-500 group-hover:scale-110 sm:size-6" />
                      <span className="hidden font-mono text-[9px] uppercase text-ink-soft sm:inline">
                        {platform.category}
                      </span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-ink-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-yellow" />
                  </span>
                  <span className="relative z-10 block min-w-0">
                    <span className="mb-3 block h-px w-8 bg-accent-blue/50 transition-[width] duration-500 group-hover:w-16" />
                    <span
                      className={`block font-semibold leading-none ${
                        index === 0 ? "text-3xl sm:text-5xl" : "text-xl sm:text-3xl"
                      }`}
                    >
                      {platform.name}
                    </span>
                    <span className="mt-2 block break-all font-mono text-[9px] uppercase leading-4 text-ink-soft sm:break-normal sm:text-[10px]">
                      {platform.handle}
                    </span>
                  </span>
                  <span className="absolute bottom-4 right-4 hidden font-mono text-[9px] tabular-nums text-ink-soft/50 sm:bottom-6 sm:right-6 sm:block">
                    {platform.number} / 06
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
      <div className="overflow-hidden border-t border-hairline bg-surface py-3" aria-hidden="true">
        <div className="social-ticker flex w-max whitespace-nowrap font-mono text-[10px] uppercase text-ink-soft">
          {Array.from({ length: 4 }, (_, index) => (
            <span key={index} className="flex shrink-0 items-center gap-8 pr-8">
              <span>Think better</span>
              <span className="text-accent-yellow">✳</span>
              <span>Build better</span>
              <span className="text-accent-blue">✳</span>
              <span>Learn · Create · Improve</span>
              <span className="text-accent-yellow">✳</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="container-editorial section-pad grid gap-16 lg:grid-cols-[.82fr_1.18fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-meta text-accent-yellow">Founder story · Becoming</p>
          <h2 className="mt-5 font-editorial text-[clamp(3.2rem,7vw,7rem)] leading-[0.88]">
            Learn. Create. Improve.
          </h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft">
            Aniket is shaping a multidisciplinary path through study, storytelling, technology, and
            disciplined execution—building each project as part of a larger body of work.
          </p>
        </Reveal>
        <div className="relative border-l border-hairline pl-7 md:pl-12">
          {founderTimeline.map((item, index) => (
            <Reveal
              key={item.year}
              delay={index * 70}
              className="relative border-b border-hairline py-10 first:pt-0 last:border-0"
            >
              <span className="absolute -left-[2.05rem] top-11 size-2.5 rounded-full border border-accent-blue bg-surface md:-left-[3.35rem]" />
              <p className="font-mono text-[10px] uppercase tabular-nums text-accent-blue">
                0{index + 1} · {item.year}
              </p>
              <h3 className="mt-4 text-2xl font-semibold md:text-4xl">{item.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolNamiSpotlight() {
  const toolnami = ecosystemProjects[4];
  return (
    <section className="container-editorial section-pad">
      <Reveal>
        <p className="label-meta text-accent-yellow">Featured project · ToolNami</p>
      </Reveal>
      <Reveal delay={80} className="mt-8">
        <SpotlightCard className="border border-accent-blue/40 bg-surface shadow-[0_30px_100px_color-mix(in_oklab,var(--accent-blue)_12%,transparent)]">
          <div className="relative z-10 grid lg:grid-cols-[1.3fr_.7fr]">
            <div className="group aspect-[16/10] overflow-hidden border-b border-hairline lg:border-b-0 lg:border-r">
              <img
                src={toolnami.image}
                alt="ToolNami website preview"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-accent-yellow" />
                  <span className="label-meta">Flagship utility platform</span>
                </div>
                <h2 className="mt-8 font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.82] tracking-normal">
                  TOOL
                  <br />
                  NAMI
                </h2>
                <p className="mt-7 text-sm leading-relaxed text-ink-soft">
                  Professional online tools platform focused on productivity tools, PDF utilities,
                  image tools, and creator-focused solutions.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-fit rounded-none bg-accent-blue text-primary-foreground hover:bg-accent-blue/90"
                >
                  <a href={toolnami.url} target="_blank" rel="noreferrer noopener">
                    Open ToolNami <ArrowUpRight />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 w-fit rounded-none border-hairline bg-background/50 hover:border-accent-yellow"
                >
                  <a href={ecosystemProjects[5].url} target="_blank" rel="noreferrer noopener">
                    Lovable Edition <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}

const ecosystemFilters = ["All", "Tools & Apps", "Portfolios", "Creative Media"] as const;

function Ecosystem() {
  const [activeFilter, setActiveFilter] = useState<(typeof ecosystemFilters)[number]>("All");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const visibleProjects = ecosystemProjects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Tools & Apps")
      return project.type.includes("Productivity") || project.type.includes("Web application");
    if (activeFilter === "Portfolios")
      return (
        project.type.includes("Personal") ||
        project.type.includes("portfolio") ||
        project.type.includes("Digital experience")
      );
    if (activeFilter === "Creative Media")
      return project.type.includes("Creative") || project.type.includes("Design");
    return true;
  });

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    window.setTimeout(() => setCopiedUrl(null), 1800);
  };

  return (
    <section id="ecosystem" className="border-y border-hairline bg-surface">
      <div className="container-editorial section-pad">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="label-meta text-accent-yellow">07 connected properties</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.86] tracking-normal">
              EXPLORE MY
              <br />
              DIGITAL ECOSYSTEM
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="mb-6 max-w-md text-sm leading-relaxed text-ink-soft">
              Explore all my websites, projects, experiments and digital creations from one place.
            </p>
            <ProjectHub />
          </div>
        </Reveal>

        {/* Interactive Category Filter Bar */}
        <Reveal
          delay={60}
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-hairline py-4"
        >
          <div className="flex flex-wrap gap-2">
            {ecosystemFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                data-cursor="Filter"
                className={`px-4 py-2 font-mono text-[10px] uppercase transition-colors ${
                  activeFilter === filter
                    ? "bg-accent-blue text-primary-foreground"
                    : "border border-hairline bg-background text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tabular-nums text-ink-soft">
            Showing 0{visibleProjects.length} / 0{ecosystemProjects.length} Properties
          </span>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal
              key={project.url}
              delay={(index % 3) * 70}
              className={project.number === "05" && activeFilter === "All" ? "lg:col-span-2" : ""}
            >
              <SpotlightCard className="group h-full border border-hairline bg-background transition-colors duration-500 hover:border-accent-blue/60">
                <article className="relative z-10 flex h-full flex-col">
                  <div className="aspect-[16/10] overflow-hidden border-b border-hairline">
                    <img
                      src={project.image}
                      alt={`${project.title} website preview`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[9px] uppercase tabular-nums text-accent-blue">
                      {project.number} · {project.type}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="w-fit rounded-none border-hairline bg-transparent hover:border-accent-yellow hover:bg-accent-yellow/10 hover:text-ink"
                      >
                        <a href={project.url} target="_blank" rel="noreferrer noopener">
                          Visit website <ArrowUpRight />
                        </a>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => void handleCopy(project.url)}
                        aria-label={`Copy ${project.title} URL`}
                        className="h-9 rounded-none border border-hairline px-3 font-mono text-[10px] uppercase text-ink-soft hover:text-ink"
                      >
                        {copiedUrl === project.url ? (
                          <Check className="size-3.5 text-accent-yellow" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const items = [
    { icon: Code2, text: "Websites & digital products" },
    { icon: Bot, text: "AI projects & useful tools" },
    { icon: Play, text: "Stories & visual media" },
    { icon: MonitorSmartphone, text: "Future-focused experiments" },
  ];
  return (
    <section className="container-editorial section-pad">
      <Reveal>
        <p className="label-meta text-accent-yellow">LuminaLM · Operating system</p>
        <h2 className="mt-5 max-w-5xl font-editorial text-[clamp(3rem,7vw,7rem)] leading-[.9]">
          Stories, strategy & growth—built into a living digital ecosystem.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.text} delay={i * 60} className="bg-background">
              <SpotlightCard className="h-full p-6">
                <div className="relative z-10">
                  <Icon className="size-6 text-accent-blue" />
                  <p className="mt-16 text-lg font-medium">{item.text}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={280}>
        <p className="mt-14 border-t border-hairline pt-8 font-display text-[clamp(2.4rem,6vw,6rem)] leading-[.86] tracking-normal">
          FOCUS. PLAN. EXECUTE.
        </p>
      </Reveal>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <ProfileOverview />
      <PlatformHub />
      <Lumina3DStage />
      <InteractiveStudio />
      <BioscienceWorkbench />
      <SelectedWorksShowcase />
      <FounderStory />
      <ToolNamiSpotlight />
      <Ecosystem />
      <WorldClassEnhancements />
      <Manifesto />
      <HomeContact />
    </>
  );
}

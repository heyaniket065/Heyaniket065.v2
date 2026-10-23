import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Clapperboard,
  Layers,
  PenTool,
  Sparkles,
  Terminal,
  Wand2,
} from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const studioDisciplines = [
  {
    id: "ai",
    index: "01",
    label: "Intelligence & AI Systems",
    kicker: "AI & LLMs · Prompt Systems · Python · Applied Research",
    headline: "Turning raw model capability into practical, human-centered tools.",
    description:
      "Designing structured prompt architectures, LLM workflows, and utility-driven AI experiments that solve real creator and productivity bottlenecks.",
    icon: BrainCircuit,
    metrics: [
      { label: "Focus Area", value: "LLM Workflows & Prompt Architecture" },
      { label: "Primary Stack", value: "Python · Modern AI SDKs · Web APIs" },
      { label: "Live Output", value: "ToolNami Studio & AI Experiments" },
    ],
    pipeline: [
      {
        step: "01",
        name: "Intent Mapping",
        detail: "Deconstruct ambiguous user problems into deterministic system prompts.",
      },
      {
        step: "02",
        name: "Context Framing",
        detail: "Constraint-driven reasoning layers with structured output schemas.",
      },
      {
        step: "03",
        name: "Interface Binding",
        detail: "Wrap intelligence inside fast, zero-friction web interfaces.",
      },
    ],
    interactiveSample: {
      title: "System Prompt Blueprint — Creator Engine",
      code: `ROLE: Strategic Narrative & Product Architect
INPUT: Raw Idea + Audience Constraint + Format
PROCESS:
  1. Extract core psychological tension
  2. Map 3-act structural hook & pacing rhythm
  3. Output shippable web/video specification
STANDARD: Zero fluff. High signal clarity.`,
    },
  },
  {
    id: "web",
    index: "02",
    label: "Full-Stack Web Craft",
    kicker: "JavaScript · HTML/CSS · Modern React · Interactive UI",
    headline: "Fast, architectural websites built with editorial precision.",
    description:
      "Engineering responsive digital products, utility platforms, and high-retention brand experiences from clean semantic structure to fluid motion.",
    icon: Braces,
    metrics: [
      { label: "Architecture", value: "Component-Driven SPA & SSR Systems" },
      { label: "Motion Standard", value: "60fps Compositor CSS & Spring Physics" },
      { label: "Live Ecosystem", value: "07 Deployed Digital Properties" },
    ],
    pipeline: [
      {
        step: "01",
        name: "Grid & Semantic Core",
        detail: "12-column architectural layout with strict typographic scale.",
      },
      {
        step: "02",
        name: "Interactive Surfaces",
        detail: "Spotlight tracking, magnetic affordances, and keyboard command hubs.",
      },
      {
        step: "03",
        name: "Performance Polish",
        detail: "Reduced-motion compliance, crisp hairlines, and instant route transitions.",
      },
    ],
    interactiveSample: {
      title: "Live Ecosystem Routing Matrix",
      code: `ECOSYSTEM_NODES = [
  "toolnami.ai.studio"        -> Productivity & File Utilities
  "aniketbhalerao.lovable.app" -> Creator Flagship OS
  "neoluxe.lovable.app"        -> Design Systems & AI Lab
  "neoluxetrast.lovable.app"   -> Storytelling & Visual Media
]`,
    },
  },
  {
    id: "design",
    index: "03",
    label: "Visual Identity & UI/UX",
    kicker: "Figma · Design Systems · Photoshop · Illustrator",
    headline: "Interfaces where typography, contrast, and spacing do the heavy lifting.",
    description:
      "Shaping cohesive brand systems like LuminaLM Night—combining brutalist display scale, classical editorial serifs, and Swiss grid discipline.",
    icon: PenTool,
    metrics: [
      { label: "Design System", value: "LuminaLM Night & Editorial Grid" },
      { label: "Tooling", value: "Figma · Adobe Suite · CSS Tokens" },
      { label: "Principle", value: "Restraint over decoration" },
    ],
    pipeline: [
      {
        step: "01",
        name: "Typographic Contrast",
        detail: "Pairing Archivo Black display power with Instrument Serif nuance.",
      },
      {
        step: "02",
        name: "Surface Hierarchy",
        detail: "Deep navy canvas, 1px translucent hairlines, and high-intent signal accents.",
      },
      {
        step: "03",
        name: "Interactive States",
        detail: "Every hover, focus, and modal transition responds within 150ms.",
      },
    ],
    interactiveSample: {
      title: "LuminaLM Design Token Spec",
      code: `--font-display: "Archivo Black", sans-serif;
--font-serif:   "Instrument Serif", Georgia, serif;
--font-sans:    "Manrope", system-ui, sans-serif;
--canvas-60:    #0B1220 (Deep Lumina Navy)
--surface-30:   #111827 (Architectural Slate)
--signal-10:    #3B82F6 (Electric Blue) / #FACC15 (Solar)`,
    },
  },
  {
    id: "media",
    index: "04",
    label: "Strategic Storytelling & Film",
    kicker: "After Effects · CapCut · Psychology · Narrative Pacing",
    headline: "Motion, rhythm, and behavioral psychology engineered for retention.",
    description:
      "Crafting visual essays, beat-locked edits, and long-horizon content formats that hold attention through structure rather than cheap spectacle.",
    icon: Clapperboard,
    metrics: [
      { label: "Core Series", value: "Dark Psychology · Mastery & Vision" },
      { label: "Post-Production", value: "After Effects · CapCut · Sound Design" },
      { label: "Distribution", value: "YouTube (@luminalm065) & Social Hub" },
    ],
    pipeline: [
      {
        step: "01",
        name: "Thesis & Tension",
        detail: "Identify the exact cognitive hook before opening the timeline.",
      },
      {
        step: "02",
        name: "Beat-Locked Cut",
        detail: "Synchronize every visual transition to the underlying musical architecture.",
      },
      {
        step: "03",
        name: "Lasting Takeaway",
        detail: "Close on self-awareness and clarity so the work compounds over time.",
      },
    ],
    interactiveSample: {
      title: "Timeline Rhythm & Retention Blueprint",
      code: `[00:00 - 00:04] PATTERN INTERRUPT -> High-contrast visual thesis
[00:04 - 00:28] MECHANISM BUILD   -> Paced narrative + beat cuts
[00:28 - 00:52] COGNITIVE SHIFT   -> Real-world strategic example
[00:52 - END]   RESIDUAL THOUGHT  -> Restrained typographic close`,
    },
  },
] as const;

export function InteractiveStudio() {
  const [activeTab, setActiveTab] = useState<(typeof studioDisciplines)[number]["id"]>("ai");
  const current = studioDisciplines.find((d) => d.id === activeTab) ?? studioDisciplines[0];
  const Icon = current.icon;

  return (
    <section className="border-b border-hairline bg-background" aria-labelledby="studio-heading">
      <div className="container-editorial section-pad">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end">
          <div>
            <p className="label-meta text-accent-yellow">
              Interactive Capability Matrix · 04 Pillars
            </p>
            <h2
              id="studio-heading"
              className="mt-5 font-display text-[clamp(2.7rem,6.5vw,6.5rem)] leading-[0.86] tracking-normal"
            >
              CRAFT STUDIO &<br />
              SYSTEM ARCHITECTURE
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Switch across Aniket&apos;s four core disciplines to inspect the workflow, tools, and
              execution standards behind every project.
            </p>
          </div>
        </Reveal>

        {/* Interactive Discipline Selector Bar */}
        <Reveal delay={80} className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {studioDisciplines.map((item) => {
            const TabIcon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                data-cursor="Inspect"
                className={`group relative flex flex-col justify-between border p-4 text-left transition-all duration-300 sm:p-5 ${
                  isActive
                    ? "border-accent-blue bg-surface-strong text-ink shadow-[0_20px_60px_color-mix(in_oklab,var(--accent-blue)_16%,transparent)]"
                    : "border-hairline bg-surface/60 text-ink-soft hover:border-ink/30 hover:bg-surface hover:text-ink"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tabular-nums text-accent-yellow">
                    {item.index} / 04
                  </span>
                  <TabIcon
                    className={`size-4 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-accent-blue" : "text-ink-soft"
                    }`}
                  />
                </div>
                <p className="mt-5 text-sm font-semibold sm:text-base">{item.label}</p>
                <span
                  className={`mt-3 block h-0.5 transition-all duration-500 ${
                    isActive ? "w-full bg-accent-blue" : "w-6 bg-hairline group-hover:w-12"
                  }`}
                />
              </button>
            );
          })}
        </Reveal>

        {/* Dynamic Workbench Display */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 grid gap-3 lg:grid-cols-[1.25fr_.75fr]"
        >
          <SpotlightCard className="border border-hairline bg-surface p-6 md:p-10">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase text-accent-blue">
                    {current.kicker}
                  </span>
                  <span className="font-mono text-[10px] uppercase tabular-nums text-ink-soft">
                    Discipline {current.index}
                  </span>
                </div>
                <h3 className="mt-5 max-w-2xl font-editorial text-[clamp(2rem,4vw,3.6rem)] leading-[0.96]">
                  {current.headline}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                  {current.description}
                </p>

                {/* 3-Step Execution Pipeline */}
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {current.pipeline.map((step) => (
                    <div key={step.step} className="border border-hairline bg-background/70 p-4">
                      <p className="font-mono text-[10px] uppercase tabular-nums text-accent-yellow">
                        Step {step.step}
                      </p>
                      <p className="mt-2 text-sm font-semibold">{step.name}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-[9px] uppercase text-ink-soft">{m.label}</p>
                    <p className="mt-1 text-xs font-medium text-ink">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Right Column: Live Architecture / Spec Inspector */}
          <SpotlightCard className="flex flex-col justify-between border border-hairline bg-surface p-6 md:p-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-accent-yellow" />
                  <span className="font-mono text-[10px] uppercase text-ink">
                    {current.interactiveSample.title}
                  </span>
                </div>
                <Icon className="size-4 text-accent-blue" />
              </div>
              <pre className="mt-5 overflow-x-auto bg-background/90 p-4 font-mono text-xs leading-relaxed text-ink-soft border border-hairline">
                <code>{current.interactiveSample.code}</code>
              </pre>
            </div>

            <div className="relative z-10 mt-8 border-t border-hairline pt-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <Wand2 className="size-4 text-accent-yellow" />
                  <span>Explore full capability breakdown</span>
                </div>
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-accent-blue transition-colors hover:text-accent-yellow"
                >
                  All Skills & Tools <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, Compass, Copy, Cpu, Dna, Sparkles } from "lucide-react";
import { AstatecLogo } from "@/components/ui/AstatecLogo";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Button } from "@/components/ui/button";

const SCOPE_MODULES = [
  { id: "web", label: "Interactive Web Platform", tag: "React · TypeScript · Tailwind" },
  { id: "three", label: "3D WebGL / Motion Experience", tag: "Three.js · Shaders · 60fps" },
  { id: "ai", label: "Custom AI Agent & Workflow", tag: "Gemini SDK · Grounding · Tools" },
  { id: "story", label: "Strategic Storytelling & Film", tag: "Direction · Pacing · Brand OS" },
] as const;

export function WorldClassEnhancements() {
  const [istTime, setIstTime] = useState<string>("18:30 IST");
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["web", "ai"]);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("IST");
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((x) => x !== id) : prev) : [...prev, id],
    );
  };

  const activeScopeLabels = SCOPE_MODULES.filter((m) => selectedScopes.includes(m.id)).map(
    (m) => m.label,
  );

  const generatedBrief = `Hello Aniket, I explored your LuminaLM portfolio and would like to collaborate on: ${activeScopeLabels.join(
    " + ",
  )}. Let's discuss architecture, timeline, and next steps.`;

  const copyBrief = async () => {
    await navigator.clipboard.writeText(generatedBrief);
    setCopiedBrief(true);
    window.setTimeout(() => setCopiedBrief(false), 1800);
  };

  return (
    <section className="border-b border-hairline bg-background">
      <div className="container-editorial section-pad">
        {/* Global Studio Command & Telemetry Bento */}
        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          {/* Left: Interactive Collaboration Scope & Architecture Builder */}
          <SpotlightCard className="border border-hairline bg-surface p-6 md:p-8">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase text-accent-yellow">
                    Interactive Scope Configurator · Global Studio Standard
                  </span>
                  <span className="font-mono text-[10px] uppercase tabular-nums text-ink-soft">
                    <Clock className="mr-1 inline size-3 text-accent-blue" />
                    India · {istTime}
                  </span>
                </div>
                <h2 className="mt-4 font-editorial text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.92]">
                  Configure your next digital build.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
                  Select the capabilities you need below to assemble a custom project brief, or jump
                  straight into the full Astatec AI Studio to prototype ideas live.
                </p>

                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {SCOPE_MODULES.map((mod) => {
                    const active = selectedScopes.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleScope(mod.id)}
                        className={`border p-4 text-left transition-colors ${
                          active
                            ? "border-accent-blue bg-surface-strong text-ink"
                            : "border-hairline bg-background/60 text-ink-soft hover:text-ink"
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[9px] uppercase">
                          <span className={active ? "text-accent-yellow" : "text-ink-soft"}>
                            {mod.tag}
                          </span>
                          <span>{active ? "Selected" : "Add"}</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold">{mod.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-hairline pt-5">
                <p className="font-mono text-[10px] uppercase text-ink-soft">
                  Generated Brief Preview:
                </p>
                <p className="mt-2 border border-hairline bg-background p-3 font-mono text-xs leading-relaxed text-ink">
                  {generatedBrief}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={() => void copyBrief()}
                    className="h-10 rounded-none bg-accent-blue px-5 font-mono text-[10px] uppercase text-primary-foreground hover:bg-accent-blue/90"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="mr-1.5 size-3.5 text-accent-yellow" /> Brief Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 size-3.5" /> Copy Custom Brief
                      </>
                    )}
                  </Button>
                  <a
                    href="#contact"
                    className="inline-flex h-10 items-center gap-1.5 border border-hairline bg-background px-4 font-mono text-[10px] uppercase text-ink hover:border-accent-yellow"
                  >
                    Send in Contact Form <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Right: Astatec AI Studio & Lab Launchpad */}
          <div className="flex flex-col justify-between gap-4">
            <SpotlightCard className="border border-accent-blue/50 bg-surface p-6 md:p-8">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AstatecLogo size={36} />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-accent-yellow">
                        Flagship Feature · Menu & Workspace
                      </p>
                      <h3 className="text-xl font-semibold">ASTATEC AI STUDIO</h3>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-accent-blue">
                    Gemini 4 Argon
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  A full multi-turn AI workspace built directly into Aniket&apos;s
                  portfolio—featuring real-time Google Search & Maps grounding, Nano Banana 2.1
                  image creation/editing, and live voice conversation.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase text-ink-soft">
                  <span>Multi-Turn Chat</span>
                  <span>·</span>
                  <span>Search & Maps</span>
                  <span>·</span>
                  <span>Image Studio</span>
                  <span>·</span>
                  <span>Live Voice</span>
                </div>

                <div className="mt-6">
                  <Link
                    to="/ai-studio"
                    data-cursor="Launch AI"
                    className="inline-flex h-11 items-center gap-2 bg-accent-blue px-6 font-mono text-xs uppercase text-primary-foreground transition-colors hover:bg-accent-blue/90"
                  >
                    Launch Full AI Studio <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>

            <div className="grid grid-cols-2 gap-4">
              <a
                href="#three-studio"
                className="group border border-hairline bg-surface p-5 transition-colors hover:border-accent-blue"
              >
                <Cpu className="size-5 text-accent-blue" />
                <p className="mt-4 font-mono text-[10px] uppercase text-accent-yellow">
                  01 · WebGL Lab
                </p>
                <p className="mt-1 text-base font-semibold group-hover:text-accent-blue">
                  3D Chronometer Core
                </p>
                <p className="mt-1 text-xs text-ink-soft">8-part procedural Three.js PBR model</p>
              </a>

              <a
                href="#bioscience-lab"
                className="group border border-hairline bg-surface p-5 transition-colors hover:border-accent-yellow"
              >
                <Dna className="size-5 text-accent-yellow" />
                <p className="mt-4 font-mono text-[10px] uppercase text-accent-blue">
                  02 · DeepMind Science
                </p>
                <p className="mt-1 text-base font-semibold group-hover:text-accent-yellow">
                  Bioscience Lab
                </p>
                <p className="mt-1 text-xs text-ink-soft">AlphaFold v6, PDB & PubChem</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

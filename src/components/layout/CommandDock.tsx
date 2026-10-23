import { useEffect, useState } from "react";
import { Check, Command, Copy, Palette, Sparkles, Terminal } from "lucide-react";

export const ATMOSPHERE_THEMES = [
  { id: "lumina", label: "Lumina Night", swatch: "#3b82f6" },
  { id: "obsidian", label: "Obsidian Gold", swatch: "#f59e0b" },
  { id: "cobalt", label: "Cyber Cobalt", swatch: "#38bdf8" },
  { id: "emerald", label: "Matrix Emerald", swatch: "#10b981" },
] as const;

export type AtmosphereId = (typeof ATMOSPHERE_THEMES)[number]["id"];

export function applyAtmosphere(id: AtmosphereId) {
  if (typeof document === "undefined") return;
  if (id === "lumina") {
    document.documentElement.removeAttribute("data-atmosphere");
  } else {
    document.documentElement.setAttribute("data-atmosphere", id);
  }
  try {
    window.localStorage.setItem("lm-atmosphere", id);
  } catch {
    // ignore storage errors
  }
}

export function CommandDock({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [theme, setTheme] = useState<AtmosphereId>("lumina");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lm-atmosphere") as AtmosphereId | null;
      if (saved && ATMOSPHERE_THEMES.some((t) => t.id === saved)) {
        setTheme(saved);
        applyAtmosphere(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const cycleTheme = () => {
    const idx = ATMOSPHERE_THEMES.findIndex((t) => t.id === theme);
    const next = ATMOSPHERE_THEMES[(idx + 1) % ATMOSPHERE_THEMES.length];
    setTheme(next.id);
    applyAtmosphere(next.id);
  };

  const copyQuickEmail = async () => {
    await navigator.clipboard.writeText("aniketbhalerao065@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const currentThemeObj = ATMOSPHERE_THEMES.find((t) => t.id === theme) ?? ATMOSPHERE_THEMES[0];

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[75] hidden -translate-x-1/2 lg:block">
      <div className="pointer-events-auto flex items-center gap-1 border border-hairline bg-background/85 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={onOpenSearch}
          data-cursor="Command"
          className="flex items-center gap-2 border border-transparent px-3 py-2 font-mono text-[10px] uppercase text-ink transition-colors hover:border-hairline hover:bg-surface"
        >
          <Command className="size-3.5 text-accent-blue" />
          <span>Command</span>
          <kbd className="border border-hairline bg-surface px-1.5 py-0.5 text-[9px] text-ink-soft">
            ⌘K
          </kbd>
        </button>

        <span className="h-4 w-px bg-hairline" aria-hidden="true" />

        <button
          type="button"
          onClick={cycleTheme}
          data-cursor="Theme"
          title="Switch visual atmosphere"
          className="flex items-center gap-2 border border-transparent px-3 py-2 font-mono text-[10px] uppercase text-ink transition-colors hover:border-hairline hover:bg-surface"
        >
          <Palette className="size-3.5 text-accent-yellow" />
          <span>{currentThemeObj.label}</span>
        </button>

        <span className="h-4 w-px bg-hairline" aria-hidden="true" />

        <a
          href="#ecosystem"
          data-cursor="Explore"
          className="flex items-center gap-1.5 border border-transparent px-3 py-2 font-mono text-[10px] uppercase text-ink-soft transition-colors hover:border-hairline hover:bg-surface hover:text-ink"
        >
          <Sparkles className="size-3.5 text-accent-blue" />
          <span>07 Live Sites</span>
        </a>

        <span className="h-4 w-px bg-hairline" aria-hidden="true" />

        <button
          type="button"
          onClick={() => void copyQuickEmail()}
          data-cursor="Copy"
          className="flex items-center gap-1.5 border border-transparent px-3 py-2 font-mono text-[10px] uppercase text-ink-soft transition-colors hover:border-hairline hover:bg-surface hover:text-ink"
        >
          {copied ? (
            <Check className="size-3.5 text-accent-yellow" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span>{copied ? "Email Copied" : "Copy Email"}</span>
        </button>
      </div>
    </div>
  );
}

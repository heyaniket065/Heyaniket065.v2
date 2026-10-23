import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Palette,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { projects } from "@/data/work";
import { services } from "@/data/services";
import { articles } from "@/data/blog";
import { resources } from "@/data/library";
import { ecosystemProjects } from "@/data/ecosystem";
import { ATMOSPHERE_THEMES, applyAtmosphere, type AtmosphereId } from "./CommandDock";

type Item = {
  title: string;
  kind: string;
  to?: string;
  href?: string;
  text: string;
};

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [filterKind, setFilterKind] = useState<string>("All");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const index = useMemo<Item[]>(
    () => [
      ...ecosystemProjects.map((e) => ({
        title: e.title,
        kind: "Live Website",
        href: e.url,
        text: `${e.description} ${e.type}`,
      })),
      ...projects.map((p) => ({
        title: p.title,
        kind: "Project",
        to: `/portfolio/${p.slug}`,
        text: `${p.summary} ${p.tags.join(" ")}`,
      })),
      ...services.map((s) => ({
        title: s.title,
        kind: "Service",
        to: `/services/${s.slug}`,
        text: s.short,
      })),
      ...articles.map((a) => ({
        title: a.title,
        kind: "Article",
        to: `/blog/${a.slug}`,
        text: `${a.excerpt} ${a.category}`,
      })),
      ...resources.map((r) => ({
        title: r.title,
        kind: "Resource",
        to: `/resources/${r.slug}`,
        text: `${r.summary} ${r.type}`,
      })),
    ],
    [],
  );

  const kinds = ["All", "Live Website", "Project", "Service", "Article", "Resource"] as const;

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const byKind = filterKind === "All" ? index : index.filter((i) => i.kind === filterKind);
    if (!term) return byKind.slice(0, 8);
    return byKind
      .filter((i) => `${i.title} ${i.kind} ${i.text}`.toLowerCase().includes(term))
      .slice(0, 14);
  }, [q, filterKind, index]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("aniketbhalerao065@gmail.com");
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-[90]"
      role="dialog"
      aria-modal="true"
      aria-label="Command Center Search"
    >
      <button
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-xl"
      />
      <div className="relative mx-auto mt-[8vh] w-[min(52rem,94vw)] border border-hairline bg-background shadow-[0_40px_120px_-40px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <Search className="size-4 text-accent-blue" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search live websites, projects, case studies, articles, or services..."
            className="w-full bg-transparent text-base outline-none placeholder:text-ink-soft"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-soft transition-colors hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-surface/50 px-5 py-2.5">
          <div className="flex flex-wrap gap-1.5">
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilterKind(k)}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                  filterKind === k
                    ? "bg-accent-blue text-primary-foreground"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void handleCopyEmail()}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-accent-yellow hover:underline"
          >
            {copiedEmail ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copiedEmail ? "Copied Email" : "Copy Email"}
          </button>
        </div>

        <ul className="max-h-[46vh] overflow-y-auto divide-y divide-hairline">
          {results.length === 0 ? (
            <li className="px-5 py-10 text-center text-sm text-ink-soft">No results for “{q}”.</li>
          ) : (
            results.map((r) => (
              <li key={r.to ?? r.href}>
                {r.href ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={onClose}
                    className="flex items-center justify-between gap-6 px-5 py-3.5 transition-colors hover:bg-surface"
                  >
                    <div>
                      <span className="text-[0.95rem] font-medium">{r.title}</span>
                      <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{r.text}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase text-accent-blue">
                      {r.kind} <ExternalLink className="size-3" />
                    </span>
                  </a>
                ) : (
                  <Link
                    to={r.to ?? "/"}
                    onClick={onClose}
                    className="flex items-center justify-between gap-6 px-5 py-3.5 transition-colors hover:bg-surface"
                  >
                    <div>
                      <span className="text-[0.95rem] font-medium">{r.title}</span>
                      <p className="mt-0.5 line-clamp-1 text-xs text-ink-soft">{r.text}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase text-ink-soft">
                      {r.kind} <ArrowUpRight className="size-3" />
                    </span>
                  </Link>
                )}
              </li>
            ))
          )}
        </ul>

        {/* Footer Atmosphere Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-surface px-5 py-3">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase text-ink-soft">
            <Palette className="size-3.5 text-accent-yellow" />
            <span>Atmosphere Preset:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ATMOSPHERE_THEMES.map((themeItem) => (
              <button
                key={themeItem.id}
                type="button"
                onClick={() => applyAtmosphere(themeItem.id as AtmosphereId)}
                className="inline-flex items-center gap-1.5 border border-hairline bg-background px-2.5 py-1 font-mono text-[10px] uppercase text-ink transition-colors hover:border-accent-blue"
              >
                <span className="size-2" style={{ backgroundColor: themeItem.swatch }} />
                {themeItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

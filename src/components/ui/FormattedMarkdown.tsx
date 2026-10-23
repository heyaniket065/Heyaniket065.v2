import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Combined regex for: [label](url), `code`, **bold**, __bold__, *italic*
  const tokenRegex =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(__([^_]+)__)|(\*([^*]+)\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // [label](url)
      const label = match[2];
      const url = match[3];
      nodes.push(
        <a
          key={`link-${key++}`}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-0.5 font-medium text-accent-blue underline decoration-accent-blue/50 underline-offset-2 transition-colors hover:text-accent-yellow"
        >
          <span>{label}</span>
          <ArrowUpRight className="inline size-3 shrink-0" />
        </a>,
      );
    } else if (match[4]) {
      // `code`
      nodes.push(
        <code
          key={`code-${key++}`}
          className="border border-hairline bg-background/90 px-1.5 py-0.5 font-mono text-[0.75em] text-accent-yellow"
        >
          {match[5]}
        </code>,
      );
    } else if (match[6] || match[8]) {
      // **bold** or __bold__
      const boldContent = match[7] ?? match[9] ?? "";
      nodes.push(
        <strong key={`bold-${key++}`} className="font-semibold text-ink">
          {renderInlineMarkdown(boldContent)}
        </strong>,
      );
    } else if (match[10]) {
      // *italic*
      nodes.push(
        <em key={`em-${key++}`} className="italic text-ink/90">
          {match[11]}
        </em>,
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function FormattedMarkdown({ content, className }: { content: string; className?: string }) {
  const blocks: ReactNode[] = [];
  const rawLines = content.replace(/\r\n/g, "\n").split("\n");

  let i = 0;
  let blockKey = 0;

  while (i < rawLines.length) {
    const line = rawLines[i] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code block ```
    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < rawLines.length && !(rawLines[i] ?? "").trim().startsWith("```")) {
        codeLines.push(rawLines[i] ?? "");
        i++;
      }
      i++; // skip closing ```
      blocks.push(
        <pre
          key={`pre-${blockKey++}`}
          className="my-2.5 overflow-x-auto border border-hairline bg-background p-3 font-mono text-[11px] leading-relaxed text-ink-soft"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Headings (#, ##, ###, ####)
    const headingMatch = /^(#{1,4})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1]?.length ?? 3;
      const headingText = headingMatch[2] ?? "";
      const headingClass =
        level === 1
          ? "mt-3 mb-1.5 text-base font-bold tracking-tight text-ink"
          : level === 2
            ? "mt-3 mb-1.5 text-sm font-bold tracking-tight text-ink"
            : "mt-2.5 mb-1 text-xs font-bold uppercase tracking-wider text-accent-yellow";
      blocks.push(
        <div key={`h-${blockKey++}`} className={headingClass}>
          {renderInlineMarkdown(headingText)}
        </div>,
      );
      i++;
      continue;
    }

    // Blockquote (> ...)
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < rawLines.length && (rawLines[i] ?? "").trim().startsWith(">")) {
        quoteLines.push((rawLines[i] ?? "").trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote
          key={`q-${blockKey++}`}
          className="my-2 border border-hairline bg-background/60 px-3 py-2 text-xs italic text-ink-soft"
        >
          {renderInlineMarkdown(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    // Unordered list (- , * , • )
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < rawLines.length && /^[-*•]\s+/.test((rawLines[i] ?? "").trim())) {
        items.push((rawLines[i] ?? "").trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul key={`ul-${blockKey++}`} className="my-2 space-y-1.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 bg-accent-blue" />
              <span className="flex-1">{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list (1. , 2. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < rawLines.length && /^\d+\.\s+/.test((rawLines[i] ?? "").trim())) {
        items.push((rawLines[i] ?? "").trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push(
        <ol key={`ol-${blockKey++}`} className="my-2 space-y-1.5 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="font-mono text-[10px] font-bold tabular-nums text-accent-yellow">
                0{idx + 1}.
              </span>
              <span className="flex-1">{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Standard paragraph
    blocks.push(
      <p key={`p-${blockKey++}`} className="my-1.5 first:mt-0 last:mb-0">
        {renderInlineMarkdown(trimmed)}
      </p>,
    );
    i++;
  }

  return <div className={cn("space-y-1 leading-relaxed", className)}>{blocks}</div>;
}

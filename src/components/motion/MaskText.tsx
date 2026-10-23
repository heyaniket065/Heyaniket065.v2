import type { ElementType } from "react";
import { useInView } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Editorial stagger mask: each word rises from behind an overflow-hidden line.
 */
export function MaskText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  delay = 0,
  step = 70,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  const lines = text.split("\n");
  let n = 0;

  return (
    <Tag ref={ref} className={cn(visible && "is-revealed", className)}>
      {lines.map((line, li) => (
        <span key={li} className="mask-line">
          {line.split(" ").map((word, wi) => {
            const i = n++;
            return (
              <span
                key={`${li}-${wi}`}
                className={cn("mask-word", wordClassName)}
                style={{ animationDelay: `${delay + i * step}ms` }}
              >
                {word}
                {wi < line.split(" ").length - 1 ? "\u00A0" : ""}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

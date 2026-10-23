import { useInView } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Geometric clip-path curtain reveal for photography.
 * "up" wipes bottom-to-top, "center" opens from the centre outward.
 */
export function CurtainImage({
  src,
  alt,
  className,
  imgClassName,
  ratio = "4 / 5",
  loading = "lazy",
  direction = "up",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  loading?: "lazy" | "eager";
  direction?: "up" | "center";
  delay?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={cn(
        "curtain relative overflow-hidden bg-surface-strong",
        direction === "center" && "curtain-center",
        visible && "is-revealed",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        style={{ animationDelay: `${delay}ms` }}
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          imgClassName,
        )}
      />
    </div>
  );
}

/** Scroll progress (0→1) of an element travelling through the viewport. */
export function ScrollRule({ className }: { className?: string }) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className={cn("rule-draw block h-px w-full bg-ink", visible && "is-revealed", className)}
    />
  );
}

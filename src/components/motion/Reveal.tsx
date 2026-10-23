import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  ratio = "4 / 5",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: string;
  loading?: "lazy" | "eager";
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={cn(
        "mask-reveal relative overflow-hidden bg-surface-strong",
        visible && "is-visible",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          visible ? "scale-100" : "scale-[1.08]",
          imgClassName,
        )}
      />
    </div>
  );
}

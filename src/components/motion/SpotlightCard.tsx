import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
};

export function SpotlightCard({ children, className, tilt = false }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);

    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rx = ((y / rect.height - 0.5) * -4).toFixed(2);
      const ry = ((x / rect.width - 0.5) * 4).toFixed(2);
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el || !tilt) return;
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "spotlight-card spotlight-border transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

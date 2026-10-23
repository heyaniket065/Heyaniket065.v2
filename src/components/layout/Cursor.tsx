import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let currentX = mouseX;
    let currentY = mouseY;
    let coreX = mouseX;
    let coreY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const interactive = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle magnetic pull toward element center when reasonably sized
        if (rect.width < 260 && rect.height < 120) {
          targetX = mouseX + (centerX - mouseX) * 0.28;
          targetY = mouseY + (centerY - mouseY) * 0.28;
        } else {
          targetX = mouseX;
          targetY = mouseY;
        }
        setActive(true);
        setLabel(interactive.dataset["cursor"] ?? null);
      } else {
        targetX = mouseX;
        targetY = mouseY;
        setActive(false);
        setLabel(null);
      }
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      coreX += (mouseX - coreX) * 0.45;
      coreY += (mouseY - coreY) * 0.45;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, []);

  if (!enabled) return null;

  const size = active ? (label ? 80 : 48) : 18;

  return (
    <>
      <div
        ref={coreRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[101]"
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            active ? "size-1.5 bg-accent-yellow" : "size-2 bg-accent-blue"
          }`}
        />
      </div>
      <div
        ref={followerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-3xl" />
        <div
          className={`relative flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active
              ? "border-accent-yellow/80 bg-accent-blue/15 shadow-[0_0_28px_color-mix(in_oklab,var(--accent-blue)_35%,transparent)]"
              : "border-ink/40 bg-ink/5"
          } ${pressed ? "scale-90" : "scale-100"}`}
          style={{ width: size, height: size }}
        >
          {label ? (
            <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink">
              {label}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

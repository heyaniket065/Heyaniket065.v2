import { useEffect } from "react";

/**
 * Global inertial scrolling. Desktop/pointer only — touch devices keep their
 * native scroll physics. Fully disabled for prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let raf = 0;
    let destroyed = false;
    let instance: { raf: (t: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
      });
      instance = lenis as unknown as { raf: (t: number) => void; destroy: () => void };
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, []);

  return null;
}

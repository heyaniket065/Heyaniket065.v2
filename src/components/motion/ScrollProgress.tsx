import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.25,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[115] h-[3px] w-full bg-hairline/30"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-linear-to-r from-accent-blue via-accent-blue to-accent-yellow shadow-[0_0_14px_color-mix(in_oklab,var(--accent-yellow)_65%,transparent)]"
      />
    </div>
  );
}

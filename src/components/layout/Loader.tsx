import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Loader() {
  const [done, setDone] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("lm-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.sessionStorage.setItem("lm-loaded", "1");
      return;
    }
    setDone(false);
    document.body.style.overflow = "hidden";
    const started = performance.now();
    let frame = 0;
    const count = (now: number) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1500) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(count);
    };
    frame = requestAnimationFrame(count);
    const exit = setTimeout(() => setLeaving(true), 1550);
    const t = setTimeout(() => {
      window.sessionStorage.setItem("lm-loaded", "1");
      setDone(true);
      document.body.style.overflow = "";
    }, 2350);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exit);
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden bg-background">
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-background transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${leaving ? "-translate-y-full" : "translate-y-0"}`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-background transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${leaving ? "translate-y-full" : "translate-y-0"}`}
      />
      <div
        className={`relative z-10 flex h-full flex-col justify-between p-6 transition-opacity duration-300 md:p-10 ${leaving ? "opacity-0" : "opacity-100"}`}
      >
        <div className="flex justify-between label-meta">
          <span>{site.name}</span>
          <span>{site.brand} / System boot</span>
        </div>
        <div className="text-center">
          <p className="display-architectural text-[clamp(5rem,20vw,18rem)]">
            {String(progress).padStart(3, "0")}
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent-yellow">
            Think better. Build better.
          </p>
        </div>
        <div>
          <div className="h-px bg-hairline">
            <div
              className="h-px bg-accent-blue transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase text-ink-soft">
            <span>Calibrating experience</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

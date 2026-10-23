import { cn } from "@/lib/utils";

export function AstatecLogo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Outer Architectural Octagon Frame */}
      <polygon
        points="15,3 33,3 45,15 45,33 33,45 15,45 3,33 3,15"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      {/* Rotated Inner Diamond Sacred Grid */}
      <polygon points="24,5 43,24 24,43 5,24" stroke="var(--accent-blue)" strokeWidth="1.5" />
      {/* Precision Crosshair Axes */}
      <line
        x1="24"
        y1="3"
        x2="24"
        y2="45"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      <line
        x1="3"
        y1="24"
        x2="45"
        y2="24"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      {/* Astatec 4-Point Neural Star Core */}
      <path
        d="M24 10L27.6 20.4L38 24L27.6 27.6L24 38L20.4 27.6L10 24L20.4 20.4L24 10Z"
        fill="var(--accent-blue)"
        fillOpacity="0.22"
        stroke="var(--accent-yellow)"
        strokeWidth="1.6"
      />
      {/* Central Signal Nucleus */}
      <circle cx="24" cy="24" r="3" fill="var(--accent-yellow)" />
    </svg>
  );
}

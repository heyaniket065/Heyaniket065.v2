import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";
import { FloatingAiWidget } from "./FloatingAiWidget";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SmoothScroll />
      <ScrollProgress />
      <Loader />
      <Cursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <FloatingAiWidget />
      <Footer />
    </div>
  );
}

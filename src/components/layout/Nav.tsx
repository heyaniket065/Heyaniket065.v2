import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { primaryNav, utilityNav, site, socials } from "@/data/site";
import { SearchOverlay } from "./SearchOverlay";
import { CommandDock } from "./CommandDock";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4 md:pt-6">
        <nav
          className={cn(
            "pointer-events-auto flex w-full max-w-[84rem] items-center justify-between gap-6 border px-4 py-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-6",
            scrolled
              ? "border-hairline bg-background/80 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link to="/" className="group flex items-baseline gap-2" aria-label="Home">
            <span className="font-mono text-[0.76rem] font-bold uppercase">ANIKET®</span>
            <span className="label-meta hidden sm:inline">{site.brand}</span>
          </Link>

          <ul className="hidden items-center gap-0 xl:flex">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "relative px-2 py-1.5 font-mono text-[0.58rem] uppercase transition-colors duration-300 2xl:px-3 2xl:text-[0.65rem]",
                    isActive(item.to) ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-2 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 2xl:inset-x-3",
                      isActive(item.to) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              data-cursor="Search"
              className="grid size-9 place-items-center border border-hairline text-ink-soft transition-colors hover:text-ink"
            >
              <Search className="size-4" />
            </button>
            <Link
              to="/contact"
              className="hidden bg-primary px-4 py-2 font-mono text-[0.68rem] uppercase text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              Start a project
            </Link>
            <button
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center border border-hairline xl:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </header>

      {menu ? (
        <div className="fixed inset-0 z-[95] flex flex-col bg-background xl:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <span className="label-meta">Menu</span>
            <button
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center border border-hairline"
            >
              <X className="size-4" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 pb-10">
            <ul>
              {primaryNav.map((item, i) => (
                <li
                  key={item.to}
                  className="reveal is-visible border-b border-hairline"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <Link
                    to={item.to}
                    className="flex items-baseline justify-between py-4 text-[2rem] tracking-[-0.04em]"
                  >
                    {item.label}
                    <span className="label-meta">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {utilityNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="label-meta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-ink-soft"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <CommandDock onOpenSearch={() => setSearch(true)} />
    </>
  );
}

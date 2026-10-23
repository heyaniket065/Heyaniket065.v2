import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { primaryNav, site, socials, utilityNav } from "@/data/site";

export function Footer() {
  return (
    <footer className="hairline-t bg-background">
      <div className="container-editorial py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="display-architectural text-[clamp(2.8rem,5vw,5.5rem)]">ANIKET</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">{site.role}</p>
            <p className="mt-8 label-meta">{site.philosophy}</p>
          </div>

          <nav aria-label="Footer">
            <p className="label-meta">Navigate</p>
            <ul className="mt-5 space-y-2.5">
              {primaryNav.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-meta">More</p>
            <ul className="mt-5 space-y-2.5">
              {utilityNav.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-meta">Channels</p>
            <ul className="mt-5 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-col gap-4 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aniket Bhalerao. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link to="/privacy" className="hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-ink">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

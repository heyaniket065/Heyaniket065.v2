import { useState } from "react";
import { Github, Instagram, Mail, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const projectTypes = ["Web application", "Mobile app", "AI system", "Custom e-commerce"];
const budgets = ["₹ INR", "$ USD", "Custom scope"];

export function HireDialog() {
  const [project, setProject] = useState("Web application");
  const [budget, setBudget] = useState("₹ INR");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="h-12 rounded-none bg-primary px-6 font-mono text-[0.7rem] uppercase text-primary-foreground hover:bg-primary/90"
        >
          Hire me / Let's build <Send />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border-hairline bg-background p-7 sm:max-w-2xl sm:p-10">
        <DialogHeader>
          <p className="label-meta text-signal">Project signal / 01</p>
          <DialogTitle className="mt-4 max-w-[14ch] font-editorial text-4xl font-normal leading-none sm:text-6xl">
            Build the right thing, with intent.
          </DialogTitle>
          <DialogDescription className="mt-4 max-w-lg leading-relaxed text-ink-soft">
            Choose a starting point, then continue to the full brief. No account or sales funnel.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-7">
          <p className="label-meta">Project type</p>
          <div className="mt-3 grid gap-px bg-hairline sm:grid-cols-2">
            {projectTypes.map((item) => (
              <Button
                key={item}
                type="button"
                variant="ghost"
                onClick={() => setProject(item)}
                className={`h-auto min-h-12 justify-start rounded-none px-4 py-3 text-left text-xs ${project === item ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background text-ink-soft hover:bg-surface hover:text-ink"}`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <p className="label-meta">Budget language</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {budgets.map((item) => (
              <Button
                key={item}
                type="button"
                variant="outline"
                onClick={() => setBudget(item)}
                className={`rounded-none font-mono text-[0.68rem] ${budget === item ? "border-primary text-signal" : "border-hairline"}`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-hairline pt-6">
          <Button
            asChild
            className="h-12 w-full rounded-none bg-ink text-background hover:bg-ink/90"
          >
            <Link to="/contact">
              Continue with project brief <Send />
            </Link>
          </Button>
          <div className="mt-4 grid grid-cols-3 gap-px bg-hairline">
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 bg-background px-3 py-4 text-xs text-ink-soft transition-colors hover:text-ink"
            >
              <Mail className="size-4" /> Email
            </a>
            <a
              href="https://www.instagram.com/hey_aniket_065"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 bg-background px-3 py-4 text-xs text-ink-soft transition-colors hover:text-ink"
            >
              <Instagram className="size-4" /> Instagram
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 bg-background px-3 py-4 text-xs text-ink-soft transition-colors hover:text-ink"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

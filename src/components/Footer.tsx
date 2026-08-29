import { ArrowUp } from "lucide-react";

import { profile } from "@/config/portfolioData";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-sm text-zinc-400">
            {profile.name}
            <span className="text-zinc-700"> — </span>
            <span className="text-zinc-600">{profile.title}</span>
          </p>
          <p className="mt-1.5 font-mono text-[11px] text-zinc-700">
            Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              aria-label={social.label}
              className="text-zinc-600 transition-colors hover:text-accent"
            >
              <social.icon className="h-[18px] w-[18px]" />
            </a>
          ))}

          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-500 transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MapPin, Send } from "lucide-react";

import { profile } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Contact"
          title="Building something that has to hold up? Let's talk."
          description="Open to full-stack and integration-heavy roles where the frontend, the workflow layer and the system of record all have to agree."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 lg:grid-cols-[1.3fr_1fr]"
        >
          <motion.div variants={fadeUp} className="surface-card relative overflow-hidden p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative">
              <p className="mono-label">Direct line</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">
                {profile.email}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
                Fastest way to reach me. I reply to anything with a real problem attached.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CopyEmailButton email={profile.email} />
                <ButtonLink href={`mailto:${profile.email}`} variant="secondary">
                  <Send className="h-4 w-4" />
                  Compose email
                </ButtonLink>
              </div>

              <div className="my-7 hairline" />

              <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
                <span className="text-zinc-800">·</span>
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  {profile.availability}
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="surface-card group flex items-center gap-4 p-5 transition-colors hover:border-zinc-700 hover:bg-elevated"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated text-zinc-400 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <social.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-zinc-200">{social.label}</span>
                  <span className="block truncate font-mono text-xs text-zinc-600">
                    {social.handle}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by permissions — fall back to a manual selection prompt.
      window.prompt("Copy the address:", email);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-zinc-950 transition-all hover:bg-accent-soft hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      aria-live="polite"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied to clipboard" : "Copy email"}
    </button>
  );
}

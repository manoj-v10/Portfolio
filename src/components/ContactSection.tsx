"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MapPin, Phone, Send } from "lucide-react";

import { profile } from "@/config/portfolioData";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import { Tile, TileLabel } from "@/components/Tile";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Contact"
          title="Building something that has to hold up?"
          description="Open to full-stack and integration-heavy roles where the frontend, the workflow layer and the system of record all have to agree."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bento md:auto-rows-[minmax(130px,auto)]"
        >
          {/* Primary CTA */}
          <Tile
            interactive={false}
            className="col-span-2 row-span-2 justify-between md:col-span-2 md:row-span-2"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
            />
            <div className="relative">
              <TileLabel>Direct line</TileLabel>
              <p className="mt-4 break-all text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                {profile.email}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-zinc-500">
                Fastest way to reach me. I reply to anything with a real problem attached.
              </p>
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-2">
              <CopyEmailButton />
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-base px-4 text-[13px] text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-raised"
              >
                <Send className="h-4 w-4" />
                Compose
              </a>
            </div>
          </Tile>

          {/* Phone */}
          <a
            href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
            className="tile tile-interactive group col-span-1 justify-between p-5 md:col-span-1"
          >
            <Phone className="h-4 w-4 text-pop-amber" />
            <p className="mt-3 font-mono text-[13px] font-medium text-zinc-200">
              {profile.phone}
            </p>
            <TileLabel className="mt-1">Call or WhatsApp</TileLabel>
          </a>

          {/* Location */}
          <Tile className="col-span-1 justify-between">
            <MapPin className="h-4 w-4 text-pop-cyan" />
            <p className="mt-3 text-[13px] font-medium text-zinc-200">{profile.location}</p>
            <TileLabel className="mt-1">IST · UTC+5:30</TileLabel>
          </Tile>

          {/* Availability */}
          <Tile interactive={false} className="col-span-2 justify-between md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <TileLabel className="text-accent">{profile.availability}</TileLabel>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">
              Currently at Elbrit Life Sciences, and open to conversations about full-stack and ERP
              integration roles.
            </p>
          </Tile>

          {/* Socials */}
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              className="tile tile-interactive group col-span-2 flex-row items-center gap-4 p-5 md:col-span-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile-sm border border-line bg-base text-zinc-400 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                <social.icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-zinc-200">{social.label}</span>
                <span className="block truncate font-mono text-[11px] text-zinc-600">
                  {social.handle}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-700 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked by permissions — fall back to a manual selection prompt.
      window.prompt("Copy the address:", profile.email);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-all",
        copied
          ? "bg-accent-soft text-zinc-950"
          : "bg-accent text-zinc-950 hover:bg-accent-soft hover:shadow-glow",
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

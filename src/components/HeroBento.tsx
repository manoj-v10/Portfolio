"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, Check, Copy, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { profile, stats, techMarquee } from "@/config/portfolioData";
import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Tile, TileLabel } from "@/components/Tile";

const [tenure] = stats;

export function HeroBento() {
  return (
    <section id="top" className="relative scroll-mt-28 pb-16 pt-14 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop" />

      <div className="container relative">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          animate="visible"
          className="bento md:auto-rows-[minmax(116px,auto)]"
        >
          {/* ------------------------------- Identity ------------------------------ */}
          <Tile
            interactive={false}
            className="col-span-2 row-span-2 justify-between p-6 md:col-span-4 md:row-span-2 md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/[0.07] blur-3xl"
            />

            <div className="relative flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-base/70 px-3 py-1.5 font-mono text-[11px] text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                {profile.name}
              </span>
              <Sparkles className="h-4 w-4 shrink-0 text-accent" />
            </div>

            <div className="relative mt-6">
              <h1 className="max-w-3xl text-balance text-[2rem] font-semibold leading-[1.04] tracking-tight sm:text-[2.75rem] lg:text-[3.25rem]">
                <span className="text-gradient">{profile.headline} </span>
                <span className="text-accent">{profile.headlineHighlight}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-zinc-500 sm:text-sm">
                {profile.title} in {profile.location.split(",")[0]}. {profile.subheadline}
              </p>
            </div>
          </Tile>

          {/* ----------------------------- Availability ---------------------------- */}
          <Tile className="col-span-1 justify-between">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <p className="mt-3 text-[13px] font-medium leading-snug text-zinc-200">
              Open to work
            </p>
            <TileLabel className="mt-1">Available now</TileLabel>
          </Tile>

          {/* ------------------------------- Location ------------------------------ */}
          <Tile className="col-span-1 justify-between">
            <MapPin className="h-4 w-4 text-pop-cyan" />
            <p className="mt-3 text-[13px] font-medium leading-snug text-zinc-200">
              {profile.location.split(",")[0]}
            </p>
            <TileLabel className="mt-1">India · IST</TileLabel>
          </Tile>

          {/* ------------------------------ Experience ----------------------------- */}
          <Tile className="col-span-1 justify-between">
            <TileLabel>Experience</TileLabel>
            <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-zinc-100">
              {tenure.value}
            </p>
            <TileLabel className="mt-1">In production</TileLabel>
          </Tile>

          {/* ------------------------------- Résumé -------------------------------- */}
          <motion.a
            href={profile.resumeHref}
            download
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="tile tile-interactive group col-span-1 justify-between bg-accent p-5 text-zinc-950 hover:bg-accent-soft"
          >
            <ArrowDownToLine className="h-4 w-4" />
            <p className="mt-3 text-[13px] font-semibold leading-snug">Résumé</p>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-950/60">
              Download PDF
            </span>
          </motion.a>

          {/* -------------------------------- Socials ------------------------------ */}
          <Tile interactive={false} className="col-span-2 justify-between md:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <TileLabel>Elsewhere</TileLabel>
              <CopyEmail />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="group flex flex-col items-start gap-2 rounded-tile-sm border border-line bg-base/60 p-3 transition-colors hover:border-zinc-600 hover:bg-raised"
                >
                  <social.icon className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-accent" />
                  <span className="text-[11px] text-zinc-400">{social.label}</span>
                </a>
              ))}
            </div>
          </Tile>

          {/* ------------------------------- Stack --------------------------------- */}
          <Tile interactive={false} className="col-span-2 justify-between md:col-span-2">
            <TileLabel>Stack</TileLabel>
            {/* The row is sized by the taller socials tile, so centre the marquee in the slack. */}
            <div className="relative mt-4 flex flex-1 items-center overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-tile to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-tile to-transparent"
              />
              <div className="flex w-max animate-marquee items-center gap-2">
                {[...techMarquee, ...techMarquee].map((tech, index) => (
                  <span
                    key={`${tech}-${index}`}
                    className="whitespace-nowrap rounded-full border border-line bg-base/60 px-3 py-1.5 font-mono text-[11px] text-zinc-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Tile>
        </motion.div>
      </div>
    </section>
  );
}

function CopyEmail() {
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors",
        copied
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line text-zinc-500 hover:border-zinc-600 hover:text-zinc-200",
      )}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, MapPin, Network } from "lucide-react";

import { profile, stats, techMarquee } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid-fade"
      />

      <div className="container relative">
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" size="md" className="shadow-glow">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </Badge>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.75rem]"
          >
            <span className="text-gradient">Engineering Enterprise Platforms, </span>
            <span className="bg-gradient-to-r from-accent to-cyanic bg-clip-text text-transparent">
              Resilient ERP Integrations
            </span>
            <span className="text-gradient"> &amp; Modern Web Architectures.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-base"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#architecture" size="lg" variant="primary">
              Explore Architecture
              <Network className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink
              href={profile.socials[0].href}
              target="_blank"
              rel="noreferrer noopener"
              size="lg"
              variant="secondary"
            >
              <Github className="h-4 w-4" />
              View Code Repos
            </ButtonLink>
            <ButtonLink href={profile.resumeHref} download size="lg" variant="ghost">
              <Download className="h-4 w-4" />
              Download Resume
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8">
            <TerminalPill />
          </motion.div>
        </motion.div>

        <motion.dl
          variants={staggerContainer(0.07, 0.35)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line/70 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="group relative bg-surface p-6 transition-colors hover:bg-elevated"
            >
              <stat.icon className="h-[18px] w-[18px] text-zinc-600 transition-colors group-hover:text-accent" />
              <dd className="mt-4 font-mono text-3xl font-semibold tracking-tight text-zinc-100">
                {stat.value}
              </dd>
              <dt className="mt-1.5 text-sm font-medium text-zinc-300">{stat.label}</dt>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">{stat.detail}</p>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      <div className="relative mt-16 overflow-hidden py-4">
        <div className="hairline absolute inset-x-0 top-0" />
        <div className="hairline absolute inset-x-0 bottom-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent"
        />
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...techMarquee, ...techMarquee].map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small live-status pill that reads like a shell prompt. */
function TerminalPill() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 overflow-hidden rounded-xl border border-line bg-surface/90 px-4 py-2.5 shadow-card">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-zinc-700" />
        <span className="h-2 w-2 rounded-full bg-accent/70 animate-pulse-dot" />
      </span>
      <span className="hidden h-4 w-px bg-line sm:block" />
      <code className="truncate font-mono text-xs text-zinc-500">
        <span className="text-accent">$</span> status --role
        <span className="text-zinc-300"> full-stack</span>
        <span className="text-zinc-600"> · </span>
        <span className="text-cyanic">erp-integration</span>
        <span className="text-zinc-600"> · </span>
        <span className="text-zinc-400">automation</span>
        <ArrowRight className="ml-1.5 inline h-3 w-3 text-zinc-700" />
      </code>
    </div>
  );
}

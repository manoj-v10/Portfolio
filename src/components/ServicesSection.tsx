"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import { services } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import type { Service } from "@/types";

/** Lime, black, lime — the dark centre card keeps the two filled cards from competing. */
const TONES: Record<
  Service["tone"],
  {
    card: string;
    title: string;
    body: string;
    bullet: string;
    check: string;
    icon: string;
    arrow: string;
    rule: string;
  }
> = {
  solid: {
    card: "border-accent bg-accent",
    title: "text-zinc-950",
    body: "text-zinc-950/70",
    bullet: "text-zinc-950",
    check: "text-zinc-950",
    icon: "text-zinc-950",
    arrow: "bg-zinc-950 text-accent",
    rule: "bg-zinc-950/15",
  },
  dark: {
    card: "border-line bg-tile",
    title: "text-zinc-50",
    body: "text-zinc-500",
    bullet: "text-zinc-300",
    check: "text-accent",
    icon: "text-accent",
    arrow: "bg-accent text-zinc-950",
    rule: "bg-line",
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="What I do"
          title="Services."
          description="Three things I get hired for — and what each one actually covers."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 lg:grid-cols-3"
        >
          {services.map((service) => {
            const tone = TONES[service.tone];

            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className={cn(
                  "group relative flex min-h-[420px] flex-col rounded-tile border p-7 shadow-tile transition-transform duration-300 hover:-translate-y-1 sm:p-8",
                  tone.card,
                )}
              >
                <service.icon className={cn("h-10 w-10", tone.icon)} strokeWidth={1.75} />

                <h3
                  className={cn(
                    "mt-8 text-[24px] font-semibold leading-[1.15] tracking-tight sm:text-[26px]",
                    tone.title,
                  )}
                >
                  {service.title}
                </h3>

                <p className={cn("mt-4 text-[14px] leading-relaxed", tone.body)}>
                  {service.description}
                </p>

                <div className={cn("my-7 h-px w-full", tone.rule)} />

                <ul className="space-y-3.5">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn("flex items-center gap-3 text-[14px]", tone.bullet)}
                    >
                      <Check className={cn("h-4 w-4 shrink-0", tone.check)} strokeWidth={2.5} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex justify-end pt-8">
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
                      tone.arrow,
                    )}
                  >
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase, CircleDot, MapPin, TrendingUp } from "lucide-react";

import { experience } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/SectionHeading";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Enterprise contributions, in production."
          description="Not side projects — systems the business runs on, where the failure mode is a wrong number in a ledger rather than a broken layout."
        />

        <div className="relative mt-12">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 hidden h-full w-px bg-gradient-to-b from-accent/50 via-line to-transparent sm:block"
          />

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-10"
          >
            {experience.map((item) => (
              <motion.article key={item.company} variants={fadeUp} className="relative sm:pl-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 hidden h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-surface text-accent shadow-glow sm:flex"
                >
                  <CircleDot className="h-3.5 w-3.5 animate-pulse-dot" />
                </span>

                <div className="surface-card overflow-hidden">
                  <header className="flex flex-col gap-4 border-b border-line p-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Briefcase className="h-4 w-4 text-accent" />
                        <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
                          {item.role}
                        </h3>
                      </div>
                      <p className="mt-1.5 text-[15px] text-zinc-400">{item.company}</p>
                      <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-zinc-600">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </p>
                    </div>

                    <Badge variant="accent" size="md" className="shrink-0 self-start font-mono">
                      {item.period}
                    </Badge>
                  </header>

                  <div className="p-6">
                    <p className="max-w-3xl text-[15px] leading-relaxed text-zinc-400">
                      {item.summary}
                    </p>

                    <p className="mono-label mt-8">Focus areas</p>
                    <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line/70 sm:grid-cols-2 lg:grid-cols-3">
                      {item.focusAreas.map((focus) => (
                        <div
                          key={focus.title}
                          className="group bg-surface p-5 transition-colors hover:bg-elevated"
                        >
                          <focus.icon className="h-[18px] w-[18px] text-zinc-600 transition-colors group-hover:text-accent" />
                          <h4 className="mt-3.5 text-sm font-medium text-zinc-200">
                            {focus.title}
                          </h4>
                          <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                            {focus.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="mono-label mt-8">Impact</p>
                    <ul className="mt-4 space-y-2.5">
                      {item.impact.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-[14px] leading-relaxed text-zinc-400"
                        >
                          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="my-6 hairline" />

                    <div className="flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <Badge key={tech} variant="tech">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

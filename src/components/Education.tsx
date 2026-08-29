"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

import { education } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Education"
          title="Where the fundamentals came from."
          description="An electronics and communication background — signals, systems and constraints — which turns out to be a reasonable grounding for integration work."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {education.map((item) => (
            <motion.div
              key={item.qualification}
              variants={fadeUp}
              className="surface-card group relative overflow-hidden p-6 transition-colors hover:border-zinc-700"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated text-zinc-400 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <GraduationCap className="h-[18px] w-[18px]" />
                  </span>
                  <span className="font-mono text-[11px] text-zinc-600">{item.period}</span>
                </div>

                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-zinc-100">
                  {item.qualification}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500">{item.institution}</p>

                <div className="my-5 hairline" />

                <p className="inline-flex items-center gap-2 font-mono text-xs text-accent">
                  <Award className="h-3.5 w-3.5" />
                  {item.result}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

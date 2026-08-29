"use client";

import { motion } from "framer-motion";

import { skillGroups } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

const LEVEL_STYLES: Record<string, string> = {
  Core: "border-accent/30 bg-accent/10 text-accent",
  Strong: "border-cyanic/25 bg-cyanic/10 text-cyanic",
  Working: "border-line bg-zinc-900 text-zinc-500",
};

export function SkillsGrid() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Capabilities"
          title="The stack, grouped by the problem it solves."
          description="Four layers I work across daily. Depth is marked honestly — Core is what I build with unsupervised, Working is what I can be productive in with support."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={fadeUp}
              className={cn(
                "surface-card group relative overflow-hidden p-6 transition-colors hover:border-zinc-700",
                group.span === "wide" && "lg:col-span-2",
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                  group.accent === "emerald" ? "bg-accent/20" : "bg-cyanic/20",
                )}
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border bg-elevated",
                      group.accent === "emerald"
                        ? "border-accent/30 text-accent"
                        : "border-cyanic/30 text-cyanic",
                    )}
                  >
                    <group.icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-100">
                    {group.title}
                  </h3>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">
                  {group.description}
                </p>

                <div className="my-5 hairline" />

                <ul className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-zinc-900/60 py-1.5 pl-3 pr-1.5 font-mono text-[12px] text-zinc-300 transition-colors hover:border-zinc-600">
                        {skill.name}
                        <span
                          className={cn(
                            "rounded-md border px-1.5 py-0.5 text-[10px] uppercase tracking-wide",
                            LEVEL_STYLES[skill.level],
                          )}
                        >
                          {skill.level}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

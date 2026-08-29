"use client";

import { motion } from "framer-motion";

import { skillGroups } from "@/config/portfolioData";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import { Tile, TileLabel } from "@/components/Tile";

const LEVEL_STYLES: Record<string, string> = {
  Core: "border-accent/30 bg-accent/10 text-accent",
  Strong: "border-pop-cyan/25 bg-pop-cyan/10 text-pop-cyan",
  Working: "border-line bg-base text-zinc-600",
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Capabilities"
          title="The stack, grouped by the problem it solves."
          description="Depth is marked honestly — Core is what I build with unsupervised, Working is what I can be productive in with support."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bento md:auto-rows-[minmax(180px,auto)]"
        >
          {skillGroups.map((group) => (
            <Tile
              key={group.id}
              className={cn(
                "group justify-start",
                group.span === "wide" ? "col-span-2 md:col-span-2" : "col-span-2 md:col-span-1",
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                  group.accent === "emerald" ? "bg-accent/20" : "bg-pop-cyan/20",
                )}
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-tile-sm border bg-base",
                      group.accent === "emerald"
                        ? "border-accent/30 text-accent"
                        : "border-pop-cyan/30 text-pop-cyan",
                    )}
                  >
                    <group.icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-tight text-zinc-100">
                    {group.title}
                  </h3>
                </div>

                <p className="mt-3.5 text-[12px] leading-relaxed text-zinc-500">
                  {group.description}
                </p>
              </div>

              <ul className="relative mt-6 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-base/60 py-1 pl-3 pr-1 font-mono text-[11px] text-zinc-300">
                      {skill.name}
                      <span
                        className={cn(
                          "rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-wide",
                          LEVEL_STYLES[skill.level],
                        )}
                      >
                        {skill.level}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Tile>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

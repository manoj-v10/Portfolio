"use client";

import type { CSSProperties } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { skillGroups } from "@/config/portfolioData";
import { brandFor, displayName } from "@/config/techIcons";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import { TechIcon } from "@/components/TechIcon";
import { Tile, TileLabel } from "@/components/Tile";
import type { SkillGroup } from "@/types";

const LEVEL_STYLES: Record<string, string> = {
  Core: "border-accent/40 bg-accent/15 text-accent",
  Strong: "border-pop-cyan/30 bg-pop-cyan/10 text-pop-cyan",
  Working: "border-line bg-base text-zinc-400",
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Capabilities"
          title="The stack, grouped by the problem it solves."
          description="Depth is marked honestly — Core is what I build with unsupervised, Working is what I can be productive in with support. Hover a logo to see where it sits."
        />

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-start gap-4 lg:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <SkillGroupCard key={group.id} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <Tile interactive={false} className="group/card justify-start p-6">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100",
          group.accent === "emerald" ? "bg-accent/15" : "bg-pop-cyan/15",
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
          <h3 className="text-[15px] font-semibold tracking-tight text-zinc-100">{group.title}</h3>
          <TileLabel className="ml-auto shrink-0">{group.skills.length}</TileLabel>
        </div>

        <p className="mt-3.5 text-[12px] leading-relaxed text-zinc-400">{group.description}</p>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {group.skills.map((skill) => (
          <TechTile key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </Tile>
  );
}

function TechTile({ name, level }: { name: string; level: string }) {
  const brand = brandFor(name);

  // Motion values rather than state: the spotlight tracks the cursor without
  // re-rendering the tile on every mousemove.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(90px circle at ${mouseX}px ${mouseY}px, rgba(163,230,53,0.18), transparent 70%)`;

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      style={{ "--brand": brand?.hex ?? "#a3e635" } as CSSProperties}
      className="group/tile relative flex min-h-[112px] flex-col items-center overflow-hidden rounded-tile-sm border border-line bg-base/60 p-2.5 transition-colors duration-300 hover:border-zinc-700"
      title={`${name} — ${level}`}
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
      />

      <span className="relative flex flex-1 items-center">
        <TechIcon
          name={name}
          className="h-7 w-7 text-zinc-400 transition-colors duration-300 group-hover/tile:text-[color:var(--brand)]"
        />
      </span>

      <span className="relative line-clamp-2 w-full text-balance px-0.5 text-center text-[10px] leading-tight text-muted transition-colors duration-300 group-hover/tile:text-zinc-300">
        {displayName(name)}
      </span>

      {/* Slot is always reserved, so revealing the level never shifts the label. */}
      <span className="relative mt-1.5 h-[13px] w-full">
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full border text-center text-[8px] uppercase leading-[11px] tracking-wider opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100",
            LEVEL_STYLES[level],
          )}
        >
          {level}
        </span>
      </span>
    </motion.div>
  );
}

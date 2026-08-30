"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp } from "lucide-react";

import { experience } from "@/config/portfolioData";
import { brandFor } from "@/config/techIcons";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { TechIcon } from "@/components/TechIcon";
import { Tile, TileLabel } from "@/components/Tile";

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Experience"
          title="Where the work happens."
          description="Systems the business runs on, where the failure mode is a wrong number in a ledger rather than a broken layout."
        />

        {experience.map((item) => (
          <motion.div
            key={item.company}
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="bento md:auto-rows-[minmax(116px,auto)]"
          >
            {/* Role header */}
            <Tile interactive={false} className="col-span-2 md:col-span-4">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile-sm border border-line bg-base text-accent">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{item.company}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">{item.location}</p>
                  </div>
                </div>

                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-[11px] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  {item.period}
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
                {item.summary}
              </p>
            </Tile>

            {/* Focus areas as individual tiles */}
            {item.focusAreas.map((focus) => (
              <Tile key={focus.title} className="col-span-2 justify-start md:col-span-1">
                <focus.icon className="h-4 w-4 text-accent" />
                <h4 className="mt-4 text-[13px] font-semibold leading-snug text-zinc-200">
                  {focus.title}
                </h4>
                <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
                  {focus.description}
                </p>
              </Tile>
            ))}

            {/* Impact */}
            <Tile interactive={false} className="col-span-2 md:col-span-4">
              <TileLabel>Impact</TileLabel>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {item.impact.map((line) => (
                  <li key={line} className="flex gap-3 text-[13px] leading-relaxed text-zinc-400">
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="my-5 hairline" />

              <div className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-base/60 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {brandFor(tech) ? <TechIcon name={tech} className="h-3 w-3" /> : null}
                    {tech}
                  </span>
                ))}
              </div>
            </Tile>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

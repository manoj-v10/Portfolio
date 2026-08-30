"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

import { education } from "@/config/portfolioData";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionLabel } from "@/components/SectionLabel";
import { Tile, TileLabel } from "@/components/Tile";

export function EducationSection() {
  return (
    <section id="education" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Education"
          title="Where the fundamentals came from."
          description="An electronics and communication background — signals, systems and constraints — which turns out to be reasonable grounding for integration work."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bento md:auto-rows-[minmax(170px,auto)]"
        >
          {education.map((item) => (
            <Tile key={item.qualification} className="col-span-2 justify-between">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile-sm border border-line bg-base text-accent">
                  <GraduationCap className="h-[18px] w-[18px]" />
                </span>
                <TileLabel>{item.period}</TileLabel>
              </div>

              <div className="mt-5">
                <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-zinc-100">
                  {item.qualification}
                </h3>
                <p className="mt-1.5 text-[13px] text-zinc-400">{item.institution}</p>
              </div>

              <div className="my-4 hairline" />

              <p className="inline-flex items-center gap-2 font-mono text-[12px] text-accent">
                <Award className="h-3.5 w-3.5" />
                {item.result}
              </p>
            </Tile>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

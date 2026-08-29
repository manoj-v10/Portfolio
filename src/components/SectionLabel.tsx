"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionLabel({ eyebrow, title, description, className }: SectionLabelProps) {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("mb-6 flex flex-col gap-3 md:mb-8", className)}
    >
      <motion.span
        variants={fadeUp}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-tile px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </motion.span>

      <motion.h2
        variants={fadeUp}
        className="text-2xl font-semibold tracking-tight text-gradient sm:text-3xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p variants={fadeUp} className="max-w-xl text-[14px] leading-relaxed text-zinc-500">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

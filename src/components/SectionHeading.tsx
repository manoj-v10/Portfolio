"use client";

import { motion } from "framer-motion";

import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn("max-w-2xl", className)}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-accent/40" />
        <span className="mono-label">{eyebrow}</span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="mt-4 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-relaxed text-zinc-500">
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

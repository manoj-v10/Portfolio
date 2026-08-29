"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TileProps = HTMLMotionProps<"div"> & {
  /** Adds the hover lift. Turn off for tiles that hold their own interactive children. */
  interactive?: boolean;
};

/**
 * One bento cell. Spans are passed in as grid utilities via `className`
 * so each section controls its own composition.
 */
export function Tile({ className, interactive = true, children, ...props }: TileProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn("tile p-5", interactive && "tile-interactive", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function TileLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("mono-label", className)} {...props} />;
}

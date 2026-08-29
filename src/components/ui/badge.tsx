import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border transition-colors",
  {
    variants: {
      variant: {
        default: "border-line bg-elevated text-zinc-400",
        accent: "border-accent/25 bg-accent/10 text-accent",
        cyan: "border-cyanic/25 bg-cyanic/10 text-cyanic",
        tech: "border-line bg-zinc-900/70 font-mono text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "sm" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { badgeVariants };

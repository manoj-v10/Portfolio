"use client";

import { brandFor, lettermark } from "@/config/techIcons";
import { cn } from "@/lib/utils";

interface TechIconProps {
  name: string;
  className?: string;
  /** Paint the icon in the brand's own colour rather than inheriting currentColor. */
  colored?: boolean;
}

/**
 * A brand logo where one exists, otherwise a lettermark. Both render at the same
 * box size so a grid of them stays on a consistent baseline.
 */
export function TechIcon({ name, className, colored = false }: TechIconProps) {
  const brand = brandFor(name);

  if (!brand) {
    return (
      <span
        aria-hidden
        className={cn(
          "flex items-center justify-center font-mono text-[13px] font-semibold tracking-tight",
          className,
        )}
      >
        {lettermark(name)}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={brand.title}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      fill={colored ? brand.hex : "currentColor"}
    >
      <path d={brand.path} />
    </svg>
  );
}

export { brandFor };

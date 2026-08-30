"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import { services } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import type { Service } from "@/types";

/** Lime and black alternating, matching the rest of the page. */
const TONES: Record<
  Service["tone"],
  {
    card: string;
    index: string;
    title: string;
    body: string;
    bullet: string;
    check: string;
    icon: string;
    arrow: string;
    rule: string;
    pin: string;
  }
> = {
  solid: {
    card: "border-accent bg-accent",
    index: "text-zinc-950/45",
    title: "text-zinc-950",
    body: "text-zinc-950/70",
    bullet: "text-zinc-950",
    check: "text-zinc-950",
    icon: "text-zinc-950",
    arrow: "bg-zinc-950 text-accent",
    rule: "bg-zinc-950/15",
    pin: "bg-zinc-950/30",
  },
  dark: {
    card: "border-line bg-tile",
    index: "text-zinc-700",
    title: "text-zinc-50",
    body: "text-zinc-500",
    bullet: "text-zinc-300",
    check: "text-accent",
    icon: "text-accent",
    arrow: "bg-accent text-zinc-950",
    rule: "bg-line",
    pin: "bg-zinc-700",
  },
};

/** Resting tilt per card; hovering straightens it. Cleared on small screens. */
const TILT = [-2.2, 1.6, -1.4, 2.1];

interface Connector {
  key: string;
  d: string;
}

export function ServicesSection() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });
  // Tilt only in the two-column layout; a rotated card can overflow a narrow viewport.
  const [isWide, setIsWide] = useState(false);
  const reduceMotion = useReducedMotion();

  /** Draw a dashed arc from each card to the next, measured from the DOM. */
  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const base = grid.getBoundingClientRect();
    setCanvas({ width: base.width, height: base.height });
    setIsWide(window.innerWidth >= 1024);

    // Connectors are decorative and only make sense in the two-column layout.
    if (window.innerWidth < 1024) {
      setConnectors([]);
      return;
    }

    const next: Connector[] = [];

    for (let i = 0; i < cardRefs.current.length - 1; i++) {
      const a = cardRefs.current[i];
      const b = cardRefs.current[i + 1];
      if (!a || !b) continue;

      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();

      const from = {
        x: ra.left - base.left + ra.width / 2,
        y: ra.top - base.top + ra.height / 2,
      };
      const to = {
        x: rb.left - base.left + rb.width / 2,
        y: rb.top - base.top + rb.height / 2,
      };

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;

      // Walk out from each centre to where the line crosses that card's edge,
      // plus a small gap, so the arc lives in the gutter rather than under a card.
      const edge = (w: number, h: number) =>
        Math.min(
          Math.abs(ux) < 1e-6 ? Infinity : w / 2 / Math.abs(ux),
          Math.abs(uy) < 1e-6 ? Infinity : h / 2 / Math.abs(uy),
        );

      const gap = 14;
      const ta = edge(ra.width, ra.height) + gap;
      const tb = edge(rb.width, rb.height) + gap;

      const start = { x: from.x + ux * ta, y: from.y + uy * ta };
      const end = { x: to.x - ux * tb, y: to.y - uy * tb };

      // Bow the arc perpendicular to the run for a hand-drawn feel.
      const mid = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
      const bow = Math.min(70, len * 0.18);
      const control = { x: mid.x - (dy / len) * bow, y: mid.y + (dx / len) * bow };

      next.push({
        key: `c-${i}`,
        d: `M ${start.x} ${start.y} Q ${control.x} ${control.y}, ${end.x} ${end.y}`,
      });
    }

    setConnectors(next);
  }, []);

  useEffect(() => {
    measure();
    const grid = gridRef.current;
    window.addEventListener("resize", measure);

    if (!grid || typeof ResizeObserver === "undefined") {
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section id="services" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="My expertise"
          title="Building modern digital solutions with Code & AI."
          description="Four things I get hired for. I use AI as part of how I build — for scaffolding, review and integration — alongside the engineering, not instead of it."
        />

        <div ref={gridRef} className="relative mt-4">
          {/* Dashed connectors, drawn behind the cards */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
            viewBox={`0 0 ${Math.max(canvas.width, 1)} ${Math.max(canvas.height, 1)}`}
            fill="none"
          >
            <defs>
              <marker
                id="svc-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#71717a" />
              </marker>
            </defs>

            {connectors.map((connector, index) => (
              <motion.path
                key={connector.key}
                d={connector.d}
                stroke="#71717a"
                strokeWidth={1.5}
                strokeDasharray="5 8"
                strokeLinecap="round"
                markerEnd="url(#svc-arrow)"
                initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, delay: 0.25 + index * 0.25, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative grid gap-5 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                tilt={isWide ? TILT[index % TILT.length] : 0}
                registerRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  tilt,
  registerRef,
}: {
  service: Service;
  index: number;
  tilt: number;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const tone = TONES[service.tone];

  return (
    <motion.article
      ref={registerRef}
      variants={fadeUp}
      whileHover={{ rotate: 0, y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative flex flex-col rounded-tile border p-7 shadow-tile sm:p-8",
        // Offsetting alternate cards gives the scattered, pinned-up feel.
        index % 2 === 1 && "lg:mt-10",
        tone.card,
      )}
      style={{ rotate: `${tilt}deg` }}
    >
      {/* Pin holding the card to the page */}
      <span
        aria-hidden
        className={cn(
          "absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-base",
          tone.pin,
        )}
      />

      <div className="flex items-start justify-between gap-4">
        <span className={cn("font-mono text-lg font-semibold italic", tone.index)}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <service.icon className={cn("h-9 w-9", tone.icon)} strokeWidth={1.75} />
      </div>

      <h3
        className={cn(
          "mt-6 text-[22px] font-semibold leading-[1.15] tracking-tight sm:text-[25px]",
          tone.title,
        )}
      >
        {service.title}
      </h3>

      <p className={cn("mt-3.5 text-[14px] leading-relaxed", tone.body)}>{service.description}</p>

      <div className={cn("my-6 h-px w-full", tone.rule)} />

      <ul className="space-y-3">
        {service.bullets.map((bullet) => (
          <li key={bullet} className={cn("flex items-center gap-3 text-[14px]", tone.bullet)}>
            <Check className={cn("h-4 w-4 shrink-0", tone.check)} strokeWidth={2.5} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex justify-end pt-7">
        <span
          aria-hidden
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            tone.arrow,
          )}
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
        </span>
      </div>
    </motion.article>
  );
}

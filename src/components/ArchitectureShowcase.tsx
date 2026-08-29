"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, MousePointerClick, RotateCcw } from "lucide-react";

import { architectureEdges, architectureNodes } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/SectionHeading";
import type { ArchitectureNode, NodeKind } from "@/types";

interface EdgeGeometry {
  key: string;
  from: string;
  to: string;
  protocol: string;
  path: string;
  midpoint: { x: number; y: number };
}

const KIND_STYLES: Record<NodeKind, { ring: string; text: string; label: string }> = {
  client: { ring: "border-accent/40", text: "text-accent", label: "Client" },
  gateway: { ring: "border-cyanic/40", text: "text-cyanic", label: "Gateway" },
  service: { ring: "border-accent/40", text: "text-accent", label: "Service" },
  data: { ring: "border-cyanic/40", text: "text-cyanic", label: "Data" },
  ops: { ring: "border-zinc-600", text: "text-zinc-400", label: "Ops" },
};

/** All nodes reachable downstream of `startId`, inclusive. */
function reachableFrom(startId: string): Set<string> {
  const byId = new Map(architectureNodes.map((node) => [node.id, node]));
  const seen = new Set<string>();
  const queue = [startId];

  while (queue.length > 0) {
    const current = queue.shift() as string;
    if (seen.has(current)) continue;
    seen.add(current);
    byId.get(current)?.downstream.forEach((next) => {
      if (!seen.has(next)) queue.push(next);
    });
  }

  return seen;
}

export function ArchitectureShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [edges, setEdges] = useState<EdgeGeometry[]>([]);
  const [canvas, setCanvas] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeNode = useMemo(
    () => architectureNodes.find((node) => node.id === activeId) ?? null,
    [activeId],
  );

  const litNodes = useMemo(
    () => (activeId ? reachableFrom(activeId) : null),
    [activeId],
  );

  /** Measure node boxes and lay the connector paths out over them. */
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const base = container.getBoundingClientRect();
    setCanvas({ width: base.width, height: base.height });

    const next: EdgeGeometry[] = [];

    for (const edge of architectureEdges) {
      const fromEl = nodeRefs.current[edge.from];
      const toEl = nodeRefs.current[edge.to];
      if (!fromEl || !toEl) continue;

      const a = fromEl.getBoundingClientRect();
      const b = toEl.getBoundingClientRect();

      const from = { x: a.left - base.left, y: a.top - base.top, w: a.width, h: a.height };
      const to = { x: b.left - base.left, y: b.top - base.top, w: b.width, h: b.height };

      const dx = to.x + to.w / 2 - (from.x + from.w / 2);
      const dy = to.y + to.h / 2 - (from.y + from.h / 2);
      const horizontal = Math.abs(dx) > Math.abs(dy);

      let start: { x: number; y: number };
      let end: { x: number; y: number };
      let control1: { x: number; y: number };
      let control2: { x: number; y: number };

      if (horizontal) {
        const forward = dx >= 0;
        start = { x: forward ? from.x + from.w : from.x, y: from.y + from.h / 2 };
        end = { x: forward ? to.x : to.x + to.w, y: to.y + to.h / 2 };
        const bend = Math.max(28, Math.abs(end.x - start.x) * 0.45);
        control1 = { x: start.x + (forward ? bend : -bend), y: start.y };
        control2 = { x: end.x - (forward ? bend : -bend), y: end.y };
      } else {
        const downward = dy >= 0;
        start = { x: from.x + from.w / 2, y: downward ? from.y + from.h : from.y };
        end = { x: to.x + to.w / 2, y: downward ? to.y : to.y + to.h };
        const bend = Math.max(24, Math.abs(end.y - start.y) * 0.5);
        control1 = { x: start.x, y: start.y + (downward ? bend : -bend) };
        control2 = { x: end.x, y: end.y - (downward ? bend : -bend) };
      }

      next.push({
        key: `${edge.from}->${edge.to}`,
        from: edge.from,
        to: edge.to,
        protocol: edge.protocol,
        path: `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`,
        midpoint: {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2,
        },
      });
    }

    setEdges(next);
  }, []);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    Object.values(nodeRefs.current).forEach((el) => el && observer.observe(el));

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const isEdgeLit = (edge: EdgeGeometry) =>
    Boolean(litNodes && litNodes.has(edge.from) && litNodes.has(edge.to));

  return (
    <section id="architecture" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="System Design"
          title="How the systems I build actually fit together."
          description="Every enterprise feature I ship crosses these five layers. Select a node to trace what flows downstream of it and read the implementation detail at that layer."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-6 lg:grid-cols-[1.65fr_1fr]"
        >
          {/* ------------------------------ Diagram ------------------------------ */}
          <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
              <span className="inline-flex items-center gap-2 mono-label">
                <MousePointerClick className="h-3.5 w-3.5 text-accent" />
                Interactive data flow
              </span>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                disabled={!activeId}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-zinc-500 transition-colors hover:text-zinc-200 disabled:opacity-40 disabled:hover:text-zinc-500"
              >
                <RotateCcw className="h-3 w-3" />
                reset
              </button>
            </div>

            <div ref={containerRef} className="relative p-5 sm:p-8">
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                width={canvas.width}
                height={canvas.height}
                viewBox={`0 0 ${Math.max(canvas.width, 1)} ${Math.max(canvas.height, 1)}`}
                fill="none"
              >
                <defs>
                  <marker
                    id="arrow-idle"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
                  </marker>
                  <marker
                    id="arrow-lit"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                  </marker>
                </defs>

                {edges.map((edge) => {
                  const lit = isEdgeLit(edge);
                  return (
                    <g key={edge.key}>
                      <path
                        d={edge.path}
                        stroke={lit ? "#34d399" : "#27272a"}
                        strokeWidth={lit ? 1.75 : 1.25}
                        markerEnd={lit ? "url(#arrow-lit)" : "url(#arrow-idle)"}
                        className="transition-[stroke] duration-300"
                        opacity={litNodes && !lit ? 0.35 : 1}
                      />
                      {lit ? (
                        <path
                          d={edge.path}
                          stroke="#6ee7b7"
                          strokeWidth={2}
                          strokeDasharray="4 20"
                          strokeLinecap="round"
                          className="animate-flow-dash"
                        />
                      ) : null}
                    </g>
                  );
                })}
              </svg>

              <div className="lattice relative">
                {architectureNodes.map((node) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    active={activeId === node.id}
                    lit={litNodes ? litNodes.has(node.id) : null}
                    onSelect={() => setActiveId((current) => (current === node.id ? null : node.id))}
                    registerRef={(el) => {
                      nodeRefs.current[node.id] = el;
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3">
              {architectureEdges.map((edge) => (
                <span
                  key={`${edge.from}-${edge.to}`}
                  className={cn(
                    "font-mono text-[11px] transition-colors",
                    litNodes && litNodes.has(edge.from) && litNodes.has(edge.to)
                      ? "text-accent"
                      : "text-zinc-700",
                  )}
                >
                  {edge.protocol}
                </span>
              ))}
            </div>
          </div>

          {/* --------------------------- Detail panel --------------------------- */}
          <div className="surface-card min-h-[420px] p-6">
            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-elevated",
                        KIND_STYLES[activeNode.kind].ring,
                        KIND_STYLES[activeNode.kind].text,
                      )}
                    >
                      <activeNode.icon className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <p className="mono-label">{KIND_STYLES[activeNode.kind].label} layer</p>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-100">
                        {activeNode.label}
                      </h3>
                      <p className="mt-0.5 text-sm text-zinc-500">{activeNode.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {activeNode.stack.map((item) => (
                      <Badge key={item} variant="tech">
                        {item}
                      </Badge>
                    ))}
                  </div>

                  <div className="my-5 hairline" />

                  <p className="mono-label">Implementation</p>
                  <ul className="mt-3 space-y-3">
                    {activeNode.specs.map((spec) => (
                      <li key={spec} className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {activeNode.downstream.length > 0 ? (
                    <p className="mt-5 font-mono text-[11px] text-zinc-600">
                      → pushes into{" "}
                      <span className="text-accent">
                        {activeNode.downstream
                          .map(
                            (id) =>
                              architectureNodes.find((node) => node.id === id)?.label ?? id,
                          )
                          .join(", ")}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-5 font-mono text-[11px] text-zinc-600">
                      → terminal layer, nothing downstream
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[368px] flex-col justify-center"
                >
                  <p className="mono-label">No layer selected</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-200">
                    Pick a node to trace the pathway.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    Selecting a layer lights every hop downstream of it and swaps this panel for the
                    implementation detail — the contracts, the failure handling, the reason it is
                    built that way.
                  </p>
                  <ul className="mt-6 space-y-2">
                    {architectureNodes.map((node) => (
                      <li key={node.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(node.id)}
                          className="flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-2 text-left text-sm text-zinc-500 transition-colors hover:border-line hover:bg-elevated hover:text-zinc-200"
                        >
                          {node.label}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface NodeCardProps {
  node: ArchitectureNode;
  active: boolean;
  /** null when nothing is selected, otherwise whether this node is on the lit pathway. */
  lit: boolean | null;
  onSelect: () => void;
  registerRef: (el: HTMLButtonElement | null) => void;
}

function NodeCard({ node, active, lit, onSelect, registerRef }: NodeCardProps) {
  const dimmed = lit === false;

  return (
    <button
      ref={registerRef}
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      style={
        {
          "--col": node.position.col + 1,
          "--row": node.position.row + 1,
        } as CSSProperties
      }
      className={cn(
        "lattice-node group relative z-10 rounded-xl border bg-surface p-4 text-left transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        active
          ? "border-accent/60 bg-elevated shadow-glow"
          : lit
            ? "border-accent/25 bg-elevated"
            : "border-line hover:border-zinc-600 hover:bg-elevated",
        dimmed && "opacity-45",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-base transition-colors",
            active || lit ? "border-accent/40 text-accent" : "border-line text-zinc-500",
          )}
        >
          <node.icon className="h-4 w-4" />
        </span>
        <span className="mono-label">{KIND_STYLES[node.kind].label}</span>
      </div>

      <p className="mt-3 text-sm font-medium leading-snug text-zinc-200">{node.label}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-zinc-600">{node.tagline}</p>
    </button>
  );
}

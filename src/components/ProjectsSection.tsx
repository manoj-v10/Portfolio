"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Target,
  Wrench,
  X,
} from "lucide-react";

import { projects } from "@/config/portfolioData";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/SectionLabel";
import { Tile, TileLabel } from "@/components/Tile";
import type { Project } from "@/types";

const SPANS: Record<Project["span"], string> = {
  hero: "col-span-2 md:col-span-2 md:row-span-2",
  wide: "col-span-2 md:col-span-2",
  regular: "col-span-2 md:col-span-1",
};

const MIN_HEIGHTS: Record<Project["span"], string> = {
  hero: "min-h-[420px]",
  wide: "min-h-[260px]",
  regular: "min-h-[260px]",
};

/** How many tech chips fit before the layout starts to look crowded. */
const TAG_LIMIT: Record<Project["span"], number> = { hero: 8, wide: 5, regular: 3 };

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-28 py-16 md:py-20">
      <div className="container">
        <SectionLabel
          eyebrow="Selected work"
          title="Projects, and the decisions behind them."
          description="Each tile opens the parts worth discussing — the constraint that shaped the design, and what it bought."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bento md:auto-rows-[minmax(130px,auto)]"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const isHero = project.span === "hero";
  const tagLimit = TAG_LIMIT[project.span];
  const hiddenTags = project.tech.length - tagLimit;

  return (
    <Tile
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open details for ${project.name}`}
      className={cn(
        "group cursor-pointer justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-base",
        SPANS[project.span],
        MIN_HEIGHTS[project.span],
      )}
    >
      {/* Corner bloom on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      {project.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
      ) : null}

      <div className="relative flex h-full flex-col">
        <header className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="font-mono text-[11px] font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-3 w-px shrink-0 bg-line" />
            <TileLabel className="truncate">{project.category}</TileLabel>
          </div>

          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-base text-zinc-500 transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-zinc-950"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </header>

        <h3
          className={cn(
            "mt-5 font-semibold leading-tight tracking-tight text-zinc-50",
            isHero ? "text-xl sm:text-2xl" : "text-[17px]",
          )}
        >
          {project.name}
        </h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">{project.tagline}</p>

        <p
          className={cn(
            "mt-4 text-[13px] leading-relaxed text-zinc-400",
            !isHero && "line-clamp-3",
          )}
        >
          {project.summary}
        </p>

        {isHero ? (
          <ul className="mt-5 space-y-2">
            {project.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2.5 text-[12px] text-zinc-400">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 flex gap-2.5 text-[12px] text-zinc-400">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <span>{project.outcomes[0]}</span>
          </p>
        )}

        <div className="mt-auto pt-6">
          <div className="hairline" />
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.tech.slice(0, tagLimit).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-base/60 px-2.5 py-1 font-mono text-[10px] text-zinc-500 transition-colors group-hover:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
              {hiddenTags > 0 ? (
                <span className="font-mono text-[10px] text-zinc-700">+{hiddenTags}</span>
              ) : null}
            </div>
            <span className="shrink-0 font-mono text-[10px] text-zinc-700">{project.year}</span>
          </div>
        </div>
      </div>
    </Tile>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => setMounted(true), []);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;

    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, handleKey]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} details`}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="tile my-auto w-full max-w-2xl p-0"
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-tile border-b border-line bg-tile/95 p-6 backdrop-blur">
              <div>
                <TileLabel>
                  {project.category} · {project.year}
                </TileLabel>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{project.tagline}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-base text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="space-y-8 p-6">
              <p className="text-[14px] leading-relaxed text-zinc-400">{project.summary}</p>

              <section>
                <TileLabel>Engineering challenges</TileLabel>
                <div className="mt-4 space-y-3">
                  {project.challenges.map((challenge) => (
                    <div
                      key={challenge.problem}
                      className="rounded-tile-sm border border-line bg-base/50 p-5"
                    >
                      <div className="flex gap-3">
                        <Target className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                        <p className="text-[13px] leading-relaxed text-zinc-300">
                          {challenge.problem}
                        </p>
                      </div>
                      <div className="mt-3.5 flex gap-3 border-t border-line pt-3.5">
                        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <p className="text-[13px] leading-relaxed text-zinc-400">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <TileLabel>Outcomes</TileLabel>
                <ul className="mt-4 space-y-2.5">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-[13px] text-zinc-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <TileLabel>Stack</TileLabel>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-base/60 px-3 py-1 font-mono text-[11px] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {project.links.live || project.links.repo ? (
                <footer className="flex flex-wrap gap-3 border-t border-line pt-6">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-accent-soft"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit live site
                    </a>
                  ) : null}
                  {project.links.repo ? (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-base px-4 text-sm text-zinc-200 transition-colors hover:border-zinc-600"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  ) : null}
                </footer>
              ) : (
                <p className="border-t border-line pt-6 font-mono text-[11px] text-zinc-600">
                  Internal enterprise system — source and deployment are private.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

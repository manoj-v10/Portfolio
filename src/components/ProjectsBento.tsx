"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Maximize2,
  Target,
  Wrench,
  X,
} from "lucide-react";

import { projects } from "@/config/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/SectionHeading";
import type { Project } from "@/types";

const SPAN_CLASSES: Record<Project["span"], string> = {
  hero: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2",
  regular: "md:col-span-1",
};

export function ProjectsBento() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title="Projects, and the engineering decisions behind them."
          description="Each card opens into the parts worth discussing — the constraint that shaped the design, and what it bought."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelected(project)}
            />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const isHero = project.span === "hero";

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "surface-card group relative flex flex-col overflow-hidden p-6 transition-colors hover:border-zinc-700",
        SPAN_CLASSES[project.span],
      )}
    >
      {project.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      ) : null}

      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={project.featured ? "accent" : "default"}>{project.category}</Badge>
            <span className="font-mono text-[11px] text-zinc-600">{project.year}</span>
          </div>
          <h3
            className={cn(
              "mt-3.5 font-semibold tracking-tight text-zinc-100",
              isHero ? "text-2xl" : "text-lg",
            )}
          >
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-zinc-500">{project.tagline}</p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open architectural deep-dive for ${project.name}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-500 transition-colors hover:border-accent/40 hover:text-accent"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </header>

      <p
        className={cn(
          "mt-5 flex-1 text-pretty text-[14px] leading-relaxed text-zinc-400",
          !isHero && "line-clamp-4",
        )}
      >
        {project.summary}
      </p>

      {isHero ? (
        <ul className="mt-6 space-y-2">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-[13px] text-zinc-400">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="my-5 hairline" />

      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, isHero ? 12 : 5).map((tech) => (
          <Badge key={tech} variant="tech">
            {tech}
          </Badge>
        ))}
        {!isHero && project.tech.length > 5 ? (
          <Badge variant="tech">+{project.tech.length - 5}</Badge>
        ) : null}
      </div>

      <footer className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent transition-colors hover:text-accent-soft"
        >
          Deep dive
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live
          </a>
        ) : null}

        {project.links.repo ? (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <Github className="h-3.5 w-3.5" />
            Repo
          </a>
        ) : null}
      </footer>
    </motion.article>
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
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} architectural deep-dive`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="surface-card my-auto w-full max-w-3xl"
          >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-line bg-surface/95 p-6 backdrop-blur">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{project.category}</Badge>
                  <span className="font-mono text-[11px] text-zinc-600">{project.year}</span>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">{project.tagline}</p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close deep-dive"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-100"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="space-y-8 p-6">
              <p className="text-[15px] leading-relaxed text-zinc-400">{project.summary}</p>

              <section>
                <p className="mono-label">Engineering challenges</p>
                <div className="mt-4 space-y-3">
                  {project.challenges.map((challenge) => (
                    <div
                      key={challenge.problem}
                      className="rounded-xl border border-line bg-elevated/60 p-5"
                    >
                      <div className="flex gap-3">
                        <Target className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                        <p className="text-[14px] leading-relaxed text-zinc-300">
                          {challenge.problem}
                        </p>
                      </div>
                      <div className="mt-3.5 flex gap-3 border-t border-line pt-3.5">
                        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <p className="text-[14px] leading-relaxed text-zinc-400">
                          {challenge.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <p className="mono-label">Outcomes</p>
                <ul className="mt-4 space-y-2.5">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-[14px] text-zinc-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="mono-label">Stack</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="tech" size="md">
                      {tech}
                    </Badge>
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
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-accent-soft"
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
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-elevated px-4 text-sm text-zinc-200 transition-colors hover:border-zinc-600"
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

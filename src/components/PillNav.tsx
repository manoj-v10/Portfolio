"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, GraduationCap, Home, Layers, Mail, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Home", href: "#top", icon: Home },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Services", href: "#services", icon: Wrench },
  { label: "Projects", href: "#projects", icon: FolderGit2 },
  { label: "Skills", href: "#skills", icon: Layers },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function PillNav() {
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const sections = ITEMS.map((item) => document.querySelector<HTMLElement>(item.href)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <motion.ul
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-line bg-tile/85 p-1.5 shadow-lift backdrop-blur-xl no-scrollbar"
      >
        {ITEMS.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-colors sm:px-4",
                  isActive ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-200",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="pill-active"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <item.icon className="relative h-4 w-4 shrink-0" />
                <span className={cn("relative hidden sm:inline", isActive && "font-medium")}>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
}

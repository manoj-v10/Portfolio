"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";

import { navItems, profile } from "@/config/portfolioData";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navItems[0].href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section currently owns the viewport.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line/80 bg-base/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-6">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-elevated text-accent transition-colors group-hover:border-accent/40">
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-mono text-sm text-zinc-300">
            {profile.name.toLowerCase().replace(" ", "-")}
            <span className="text-accent">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm transition-colors",
                  active === item.href
                    ? "text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-200",
                )}
              >
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg border border-line bg-elevated"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={profile.resumeHref}
            download
            className="rounded-lg border border-line bg-elevated px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-elevated text-zinc-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-elevated hover:text-zinc-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeHref}
                  download
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-accent"
                >
                  Download Résumé
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

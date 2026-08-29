import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: LucideIcon;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  headline: string;
  subheadline: string;
  resumeHref: string;
  socials: SocialLink[];
}

export interface Stat {
  value: string;
  label: string;
  detail: string;
  icon: LucideIcon;
}

export type NodeKind = "client" | "gateway" | "service" | "data" | "ops";

export interface ArchitectureNode {
  id: string;
  label: string;
  kind: NodeKind;
  tagline: string;
  icon: LucideIcon;
  /** Tech implemented at this layer. */
  stack: string[];
  /** Concrete engineering specifics surfaced when the node is selected. */
  specs: string[];
  /** Ids of downstream nodes this one pushes data into. */
  downstream: string[];
  /** Column / row placement on the diagram lattice. */
  position: { col: number; row: number };
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  protocol: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  focusAreas: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  impact: string[];
  stack: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "emerald" | "cyan";
  /** Wide cards span two columns in the bento grid. */
  span: "wide" | "regular";
  skills: { name: string; level: "Core" | "Strong" | "Working" }[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  category: string;
  span: "hero" | "wide" | "regular";
  featured: boolean;
  tech: string[];
  /** Problems worth talking about in an interview. */
  challenges: { problem: string; solution: string }[];
  outcomes: string[];
  links: { live?: string; repo?: string };
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
  result: string;
  field?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

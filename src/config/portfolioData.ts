import {
  Activity,
  Blocks,
  Boxes,
  Braces,
  Building2,
  Cable,
  Database,
  GitBranch,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  MonitorSmartphone,
  Network,
  RadioTower,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";

import type {
  ArchitectureEdge,
  ArchitectureNode,
  ExperienceItem,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Stat,
} from "@/types";

export const profile: Profile = {
  name: "Manoj V",
  title: "Full-Stack Developer & ERP Integration Specialist",
  location: "Chennai, India",
  email: "manojvashee2003@gmail.com",
  availability: "Open for High-Impact Roles",
  headline:
    "Engineering Enterprise Platforms, Resilient ERP Integrations & Modern Web Architectures.",
  subheadline:
    "I build the seam between the three layers most teams struggle to keep in sync — product-grade frontends, distributed workflow automation, and the transactional ERP backends that hold the money. 1.5+ years shipping systems where a dropped record is an accounting problem, not a console warning.",
  resumeHref: "/Manoj_V_Resume.pdf",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/manoj-v10",
      handle: "manoj-v10",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/manoj-v10",
      handle: "in/manoj-v10",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:manojvashee2003@gmail.com",
      handle: "manojvashee2003@gmail.com",
      icon: Mail,
    },
  ],
};

export const navItems: NavItem[] = [
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const stats: Stat[] = [
  {
    value: "12+",
    label: "Enterprise Modules Delivered",
    detail: "Shipped inside Elbrit One — field reporting, approvals, expense and stock views.",
    icon: Blocks,
  },
  {
    value: "20+",
    label: "Data Pipelines Built",
    detail: "n8n + webhook orchestrations moving ERP, CRM and reporting data on schedule.",
    icon: Workflow,
  },
  {
    value: "30+",
    label: "ERP Workflows Optimized",
    detail: "Frappe client & server scripts covering validation, approval and ledger sync.",
    icon: Server,
  },
  {
    value: "99.5%",
    label: "Sync Reliability",
    detail: "Idempotent retries and Sentry alerting on GraphQL stock/invoice sync jobs.",
    icon: ShieldCheck,
  },
];

/* -------------------------------------------------------------------------- */
/*                          Interactive architecture                          */
/* -------------------------------------------------------------------------- */

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "ui",
    label: "Plasmic / Next.js UI",
    kind: "client",
    tagline: "Visual-first enterprise frontend",
    icon: MonitorSmartphone,
    stack: ["Next.js 15", "React", "Plasmic Studio", "TypeScript", "Tailwind"],
    specs: [
      "Plasmic code components registered from a Next.js App Router host, so business users can recompose pages without redeploying the app shell.",
      "Server Components fetch first-paint data; client islands own filters, tables and optimistic mutations.",
      "Role-gated navigation driven by the ERP user profile — one build, many personas.",
    ],
    downstream: ["gateway"],
    position: { col: 0, row: 1 },
  },
  {
    id: "gateway",
    label: "GraphQL / REST Gateway",
    kind: "gateway",
    tagline: "Contract boundary & auth",
    icon: Cable,
    stack: ["GraphQL", "REST", "Route Handlers", "JWT / Session"],
    specs: [
      "A single typed edge in front of ERPNext: GraphQL for read-heavy dashboard queries, REST for transactional writes.",
      "Auth tokens exchanged once and cached server-side — browser code never sees ERP credentials.",
      "Response shaping and pagination live here, so the UI never depends on raw Frappe doctype shapes.",
    ],
    downstream: ["erp", "automation"],
    position: { col: 1, row: 1 },
  },
  {
    id: "erp",
    label: "Node.js / ERPNext Engine",
    kind: "service",
    tagline: "Business rules & transactions",
    icon: Server,
    stack: ["ERPNext", "Frappe", "Node.js", "Python", "Server Scripts"],
    specs: [
      "Server Scripts enforce validation, approval chains and posting rules at the document level — not in the UI.",
      "Custom doctypes model the domain (field reporting, expense claims, stock movement) and stay migration-safe.",
      "Long-running jobs are pushed to background queues so request latency stays flat under load.",
    ],
    downstream: ["db"],
    position: { col: 2, row: 1 },
  },
  {
    id: "db",
    label: "PostgreSQL / Neon",
    kind: "data",
    tagline: "Transactional system of record",
    icon: Database,
    stack: ["PostgreSQL", "Neon", "MariaDB", "Firebase"],
    specs: [
      "Serverless Postgres branches on Neon give every feature branch a throwaway copy of production shape.",
      "Indexed reporting views keep Power BI extracts cheap without touching the write path.",
      "Every sync write is idempotent on a natural key, so a replayed webhook can never double-post.",
    ],
    downstream: ["observability"],
    position: { col: 3, row: 1 },
  },
  {
    id: "automation",
    label: "n8n Automation Layer",
    kind: "ops",
    tagline: "Scheduled & event-driven pipelines",
    icon: Workflow,
    stack: ["n8n", "Webhooks", "Cron", "OneSignal"],
    specs: [
      "Webhook and cron triggers fan out into ERP, CRM and notification systems from one versioned workflow.",
      "Failure branches capture the payload, alert the channel and re-queue instead of silently dropping the run.",
      "Push notifications and digest emails are composed here — application code stays free of delivery concerns.",
    ],
    downstream: ["observability"],
    position: { col: 2, row: 0 },
  },
  {
    id: "observability",
    label: "Sentry / Power BI",
    kind: "ops",
    tagline: "Errors, traces & business reporting",
    icon: Activity,
    stack: ["Sentry", "Power BI", "Structured Logs"],
    specs: [
      "Sentry spans wrap sync jobs, so a failed invoice push surfaces with its payload and correlation id.",
      "Power BI reads curated views — business users get numbers without an analyst in the loop.",
      "Alert thresholds are tied to pipeline SLAs rather than raw error counts.",
    ],
    downstream: [],
    position: { col: 3, row: 0 },
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { from: "ui", to: "gateway", protocol: "GraphQL / REST" },
  { from: "gateway", to: "erp", protocol: "Authenticated API" },
  { from: "gateway", to: "automation", protocol: "Webhook trigger" },
  { from: "erp", to: "db", protocol: "Transactional write" },
  { from: "automation", to: "observability", protocol: "Run telemetry" },
  { from: "db", to: "observability", protocol: "Reporting views" },
];

/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    company: "Elbrit Life Sciences Pvt. Ltd.",
    role: "Front-End Developer",
    period: "Jan 2025 — Present",
    location: "Chennai, India",
    summary:
      "Own the frontend and integration surface of Elbrit One, the internal platform the field and finance teams run on. The work sits across three layers: the product UI, the ERPNext business logic underneath it, and the automation that keeps both in step with the systems of record.",
    focusAreas: [
      {
        title: "Enterprise Platform Development",
        description:
          "Built Elbrit One module by module on Next.js + Plasmic — field reporting, approvals, expense and inventory views — with role-aware navigation off the ERP user profile.",
        icon: Building2,
      },
      {
        title: "ERPNext Client & Server Scripting",
        description:
          "Custom doctypes, validation rules and approval chains written as Frappe server scripts, so business rules hold regardless of which client submits the document.",
        icon: Braces,
      },
      {
        title: "n8n Automated Data Pipelines",
        description:
          "Scheduled and event-driven workflows moving data between ERPNext, reporting stores and notification channels, with explicit failure branches and re-queue paths.",
        icon: Workflow,
      },
      {
        title: "GraphQL Stock & Invoice Sync",
        description:
          "Ledger synchronisation for stock and invoice data built on idempotent writes, so retries and replayed webhooks converge instead of double-posting.",
        icon: RadioTower,
      },
      {
        title: "Monitoring & Reporting",
        description:
          "Sentry instrumentation around sync jobs plus Power BI reporting views — failures arrive with payloads, and business numbers arrive without an analyst.",
        icon: Activity,
      },
    ],
    impact: [
      "Replaced manual spreadsheet reporting for field teams with a live ERP-backed module used daily across regions.",
      "Cut approval turnaround by moving multi-step sign-off from email threads into enforced ERPNext workflow states.",
      "Made stock/invoice sync observable end to end — failures now page with context instead of surfacing at month-end close.",
    ],
    stack: [
      "Next.js",
      "React",
      "Plasmic",
      "TypeScript",
      "ERPNext",
      "Frappe",
      "n8n",
      "GraphQL",
      "PostgreSQL",
      "Sentry",
      "Power BI",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Architecture",
    description:
      "Component systems that non-engineers can safely recompose, without giving up type safety or render performance.",
    icon: Layers,
    accent: "emerald",
    span: "wide",
    skills: [
      { name: "Next.js (App Router)", level: "Core" },
      { name: "React", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "Plasmic", level: "Core" },
      { name: "Tailwind CSS", level: "Strong" },
      { name: "Framer Motion", level: "Strong" },
      { name: "Shadcn / Radix", level: "Strong" },
    ],
  },
  {
    id: "erp",
    title: "ERP & Enterprise Automation",
    description:
      "Business rules enforced at the document layer, and the pipelines that keep every downstream system honest.",
    icon: Boxes,
    accent: "cyan",
    span: "regular",
    skills: [
      { name: "ERPNext", level: "Core" },
      { name: "Frappe Server Scripts", level: "Core" },
      { name: "Frappe Client Scripts", level: "Core" },
      { name: "n8n Workflows", level: "Core" },
      { name: "Webhook Orchestration", level: "Strong" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Typed contracts at the edge, transactional integrity behind it, and idempotency wherever a retry can happen.",
    icon: Network,
    accent: "cyan",
    span: "regular",
    skills: [
      { name: "Node.js", level: "Strong" },
      { name: "GraphQL", level: "Strong" },
      { name: "REST API Design", level: "Core" },
      { name: "Python", level: "Strong" },
      { name: "Java", level: "Working" },
    ],
  },
  {
    id: "data",
    title: "Databases & Observability",
    description:
      "The part that decides whether an integration is trustworthy: durable storage, real telemetry, honest reporting.",
    icon: Database,
    accent: "emerald",
    span: "wide",
    skills: [
      { name: "PostgreSQL / Neon", level: "Core" },
      { name: "Firebase", level: "Strong" },
      { name: "Sentry", level: "Strong" },
      { name: "Power BI", level: "Strong" },
      { name: "Git", level: "Core" },
      { name: "Linux", level: "Strong" },
      { name: "Netlify / Vercel", level: "Strong" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: "elbrit-one",
    name: "Elbrit One",
    tagline: "Internal enterprise platform on Next.js + ERPNext",
    summary:
      "The platform the field, finance and inventory teams work in daily. A Next.js + Plasmic frontend sits over ERPNext, with role-aware modules for reporting, approvals, expenses and stock — all reading and writing through one authenticated API edge.",
    year: "2025 — Present",
    category: "Enterprise Platform",
    span: "hero",
    featured: true,
    tech: ["Next.js", "Plasmic", "TypeScript", "ERPNext", "Frappe", "GraphQL", "n8n", "Sentry"],
    challenges: [
      {
        problem:
          "Business users needed to reshape pages, but every layout tweak was becoming a developer ticket and a redeploy.",
        solution:
          "Registered typed Plasmic code components against the Next.js host, so composition moved to Studio while data-fetching and auth stayed in reviewed code.",
      },
      {
        problem:
          "Validation logic duplicated in the UI drifted from what ERPNext actually enforced, letting bad documents through non-UI paths.",
        solution:
          "Moved the rules down into Frappe server scripts as the single source of truth; the frontend now reflects errors rather than defining them.",
      },
      {
        problem:
          "Retried webhooks and replayed jobs were capable of double-posting ledger entries.",
        solution:
          "Made every sync write idempotent on a natural key and wrapped the jobs in Sentry spans, so a replay converges and a failure arrives with its payload.",
      },
    ],
    outcomes: [
      "12+ modules live across regional field teams",
      "Approvals moved from email threads to enforced workflow states",
      "Sync failures surface in minutes, not at month-end close",
    ],
    links: {},
  },
  {
    id: "forensic-detection",
    name: "Forensic Document Detection",
    tagline: "HR document verification with a Python analysis engine",
    summary:
      "A verification service for HR document review. A Netlify-hosted frontend hands uploads to a Python analysis engine on Vercel, which scores documents for tampering signals and persists results and audit history to Neon Postgres.",
    year: "2025",
    category: "Full-Stack / Analysis",
    span: "wide",
    featured: true,
    tech: ["Next.js", "Python", "Vercel Functions", "Neon Postgres", "Netlify"],
    challenges: [
      {
        problem:
          "Analysis runs are CPU-heavy and unpredictable in duration — long enough to blow a normal request budget.",
        solution:
          "Split the deployment: a static-fast frontend on Netlify, and an isolated Python engine on Vercel with its own runtime limits and cold-start budget.",
      },
      {
        problem:
          "Verification results are an audit trail — they have to survive, be attributable, and be queryable later.",
        solution:
          "Persisted every run to Neon Postgres with its inputs and verdict, so a decision can be re-examined months later rather than re-run from scratch.",
      },
    ],
    outcomes: [
      "Reviewer time per document cut to a single upload-and-read pass",
      "Full audit history retained per submission",
    ],
    links: {},
  },
  {
    id: "doctors-trip",
    name: "Doctors Trip Portal",
    tagline: "Event booking portal with Google SSO",
    summary:
      "A trip registration and booking portal for medical practitioners. Firebase Google authentication gates the flow, bookings persist per authenticated identity, and the whole thing ships as a static-fast Netlify deploy.",
    year: "2025",
    category: "Web App",
    span: "regular",
    featured: false,
    tech: ["Next.js", "Firebase Auth", "Netlify", "Tailwind CSS"],
    challenges: [
      {
        problem:
          "Registration needed to be frictionless for non-technical users while still being reliably attributable.",
        solution:
          "Used Firebase Google SSO as the only sign-in path — no password reset flows to support, and every booking carries a verified identity.",
      },
      {
        problem:
          "Duplicate bookings from the same practitioner corrupted headcounts.",
        solution:
          "Keyed bookings on the authenticated uid so the write path itself enforces the one-booking-per-user rule.",
      },
    ],
    outcomes: [
      "Zero-password onboarding for practitioners",
      "Booking records attributable to a verified identity",
    ],
    links: {},
  },
  {
    id: "sso-suite",
    name: "SSO Integration Suite",
    tagline: "Microsoft, Google & Truecaller auth flows",
    summary:
      "A set of production authentication integrations built against Plasmic and Next.js hosts — Microsoft Entra, Google, and Truecaller number-verification — each reduced to a single reusable callback and session boundary.",
    year: "2024 — 2025",
    category: "Auth / Integration",
    span: "regular",
    featured: false,
    tech: ["Next.js", "Microsoft Entra ID", "Firebase", "Truecaller SDK", "OAuth 2.0"],
    challenges: [
      {
        problem:
          "Each provider wanted a different callback contract, and the app was accumulating provider-specific branches.",
        solution:
          "Normalised every provider into one callback handler that returns the same session shape, so downstream code never asks which provider signed the user in.",
      },
      {
        problem:
          "Tokens were at risk of leaking into client-side state via visual-builder components.",
        solution:
          "Kept exchange and refresh strictly server-side; the browser only ever receives an opaque session.",
      },
    ],
    outcomes: [
      "Three providers behind one session contract",
      "No provider credentials in client bundles",
    ],
    links: {},
  },
  {
    id: "push-delivery",
    name: "Push Notification Delivery",
    tagline: "OneSignal + n8n event fan-out",
    summary:
      "Notification delivery for internal platform events. Application code emits domain events; n8n owns fan-out, templating and retry, with OneSignal handling device delivery.",
    year: "2025",
    category: "Automation",
    span: "regular",
    featured: false,
    tech: ["OneSignal", "n8n", "Webhooks", "Next.js"],
    challenges: [
      {
        problem:
          "Delivery logic scattered across features made every notification change a code change.",
        solution:
          "Moved templating and routing into versioned n8n workflows — the app emits an event and stops caring how it reaches a device.",
      },
      {
        problem:
          "A failed send was invisible until someone reported not receiving it.",
        solution:
          "Added explicit failure branches that capture the payload, alert the channel and re-queue the run.",
      },
    ],
    outcomes: [
      "Notification changes ship without an app deploy",
      "Failed sends alert instead of disappearing",
    ],
    links: {},
  },
];

export const techMarquee: string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "Plasmic",
  "Tailwind CSS",
  "ERPNext",
  "Frappe",
  "n8n",
  "GraphQL",
  "REST",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Neon",
  "Firebase",
  "Sentry",
  "Power BI",
  "Git",
  "Linux",
];

export const navIcon = { Globe, GitBranch, Zap };

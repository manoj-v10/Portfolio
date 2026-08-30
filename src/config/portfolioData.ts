import {
  Activity,
  BarChart3,
  Boxes,
  Braces,
  Building2,
  CodeXml,
  Database,
  Github,
  Layers,
  Linkedin,
  Mail,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  Workflow,
  Wrench,
} from "lucide-react";

import type {
  EducationItem,
  ExperienceItem,
  Profile,
  Project,
  Service,
  SkillGroup,
  Stat,
} from "@/types";

export const profile: Profile = {
  name: "Manoj V",
  title: "Full-Stack Developer & ERP Integration Specialist",
  location: "Chennai, India",
  email: "manojvashee2003@gmail.com",
  phone: "+91 770-834-6030",
  availability: "Open for High-Impact Roles",
  headline: "Building Enterprise platforms with",
  headlineHighlight: "Code & AI.",
  subheadline:
    "I build ERP integrations and the backend services behind them, the frontends that sit on top, and the web pages and dashboards that carry it all.",
  resumeHref: "/Manoj_V_FullStack_Developer_Resume.pdf",
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


export const stats: Stat[] = [
  {
    value: "1.8 yrs",
    label: "Shipping Production Systems",
    detail: "Enterprise platform and ERP integration work at Elbrit Life Sciences since Jan 2025.",
    icon: Activity,
  },
];



/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    company: "Elbrit Life Sciences Pvt. Ltd.",
    role: "Front-End Developer",
    period: "Jan 2025 — Present",
    location: "Chennai, TN",
    summary:
      "Leading the end-to-end development of Elbrit One, a unified enterprise platform integrating sales, HR and inventory operations. The work spans the product UI, the ERPNext customisation underneath it, and the automation and analytics layers that keep the whole thing trustworthy.",
    focusAreas: [
      {
        title: "Enterprise Platform Development",
        description:
          "End-to-end development of Elbrit One, bringing sales, HR and inventory operations into a single platform rather than three disconnected tools.",
        icon: Building2,
      },
      {
        title: "Component-Driven UI with Plasmic",
        description:
          "Designing and implementing UI/UX components in Plasmic to hold visual consistency across modules and accelerate feature rollouts.",
        icon: Layers,
      },
      {
        title: "ERPNext Customisation",
        description:
          "Complex client-side and server-side scripts automating business workflows and enforcing data integrity at the document layer.",
        icon: Braces,
      },
      {
        title: "Role-Based Data Visibility",
        description:
          "A visibility system across a six-level organisational hierarchy, controlling record access by role profile, territory and department for 480+ users.",
        icon: ShieldCheck,
      },
      {
        title: "GraphQL & REST Integration",
        description:
          "Architecting and optimising APIs for real-time ERPNext integration — invoices, stock ledgers and performance analytics kept in sync.",
        icon: RadioTower,
      },
      {
        title: "Automated Data Pipelines",
        description:
          "Pipelines and process workflows engineered in n8n, significantly reducing manual intervention across business modules.",
        icon: Workflow,
      },
      {
        title: "Analytics & Monitoring",
        description:
          "Power BI integrated with custom connectors to surface KPIs inside the platform, plus Sentry for error tracking and performance monitoring.",
        icon: BarChart3,
      },
      {
        title: "Internal Business Tooling",
        description:
          "Validation dashboards, conference landing pages and interactive tools built and maintained for day-to-day business operations.",
        icon: Wrench,
      },
    ],
    impact: [
      "Unified sales, HR and inventory operations behind a single platform used across the business.",
      "Enforced record-level access for 480+ users across a six-tier hierarchy, resolved server-side rather than hidden in the UI.",
      "Cut manual intervention across business modules by moving recurring processes into n8n pipelines.",
      "Made KPIs available inside the platform via custom Power BI connectors, removing the analyst round-trip.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "Plasmic",
      "JavaScript",
      "ERPNext",
      "Frappe",
      "n8n",
      "GraphQL",
      "REST APIs",
      "Node.js",
      "PostgreSQL",
      "Power BI",
      "Sentry",
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
      "Component systems that stay visually consistent across modules and let new features ship without rebuilding the layout each time.",
    icon: Layers,
    accent: "emerald",
    span: "wide",
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "Plasmic", level: "Core" },
      { name: "Responsive UI/UX", level: "Strong" },
      { name: "HTML", level: "Core" },
      { name: "CSS", level: "Core" },
    ],
  },
  {
    id: "erp",
    title: "ERP & Enterprise Automation",
    description:
      "Business rules enforced at the document layer, and the pipelines that keep every downstream system honest.",
    icon: Boxes,
    accent: "cyan",
    span: "wide",
    skills: [
      { name: "ERPNext", level: "Core" },
      { name: "Frappe Server Scripts", level: "Core" },
      { name: "Frappe Client Scripts", level: "Core" },
      { name: "n8n Workflows", level: "Core" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Typed contracts at the edge, access control resolved server-side, and integrity held where it actually matters.",
    icon: Network,
    accent: "cyan",
    span: "wide",
    skills: [
      { name: "Node.js", level: "Strong" },
      { name: "GraphQL", level: "Strong" },
      { name: "REST APIs", level: "Core" },
      { name: "Java", level: "Strong" },
      { name: "SQL", level: "Strong" },
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
      { name: "PostgreSQL (Neon DB)", level: "Core" },
      { name: "Firebase / Firestore", level: "Strong" },
      { name: "NoSQL", level: "Strong" },
      { name: "Power BI", level: "Strong" },
      { name: "Sentry", level: "Strong" },
    ],
  },
  {
    id: "ai",
    title: "AI-Assisted Engineering",
    description:
      "Using models as leverage on real delivery work — scaffolding, review and integration — not as a novelty.",
    icon: Sparkles,
    accent: "emerald",
    span: "wide",
    skills: [
      { name: "Prompt Engineering", level: "Strong" },
      { name: "LLM Integration", level: "Strong" },
      { name: "Claude", level: "Strong" },
      { name: "Cursor", level: "Strong" },
      { name: "GitHub Copilot", level: "Strong" },
    ],
  },
  {
    id: "platforms",
    title: "Platforms & Tooling",
    description: "The everyday surface: version control, deployment targets and the shell underneath.",
    icon: Wrench,
    accent: "cyan",
    span: "wide",
    skills: [
      { name: "Git", level: "Core" },
      { name: "Linux", level: "Strong" },
      { name: "Netlify", level: "Strong" },
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
    tagline: "Unified enterprise platform for sales, HR & inventory",
    summary:
      "The platform the business runs on. A Plasmic and Next.js frontend over a customised ERPNext backend, consolidating sales, HR and inventory operations into one system — with real-time GraphQL and REST integration keeping invoices, stock ledgers and performance analytics in sync.",
    year: "2025 — Present",
    category: "Enterprise Platform",
    span: "hero",
    featured: true,
    tech: [
      "Next.js",
      "React.js",
      "Plasmic",
      "ERPNext",
      "Frappe",
      "GraphQL",
      "REST APIs",
      "n8n",
      "Power BI",
      "Sentry",
    ],
    challenges: [
      {
        problem:
          "Sales, HR and inventory each lived in their own tooling, so the same entity carried three different versions of the truth.",
        solution:
          "Modelled all three domains as one ERPNext data layer and put a single Plasmic component library over it, so a record has one definition regardless of which module opens it.",
      },
      {
        problem:
          "Validation duplicated in the UI drifted from what ERPNext actually enforced, letting bad documents through non-UI paths.",
        solution:
          "Moved the rules into Frappe server scripts as the single source of truth. The frontend now reflects errors instead of defining them.",
      },
      {
        problem:
          "Business users needed live KPIs, but every question turned into a request routed through an analyst.",
        solution:
          "Integrated Power BI with custom connectors that surface the numbers inside the platform itself, and wired Sentry around the sync jobs so a broken figure is traceable to a failed run.",
      },
    ],
    outcomes: [
      "Sales, HR and inventory operations unified into one platform",
      "Real-time invoice, stock ledger and analytics synchronisation",
      "KPIs surfaced in-platform, removing the analyst round-trip",
    ],
    links: {},
  },
  {
    id: "rbac-hierarchy",
    name: "Six-Level Role-Based Visibility",
    tagline: "Record-level access control for 480+ users",
    summary:
      "A data visibility system spanning a six-level organisational hierarchy. Every record request is scoped by role profile, territory and department before it leaves the server, so a regional manager and a field rep querying the same endpoint receive genuinely different result sets.",
    year: "2025",
    category: "Access Control",
    span: "wide",
    featured: true,
    tech: ["ERPNext", "Frappe Server Scripts", "GraphQL", "Node.js", "PostgreSQL"],
    challenges: [
      {
        problem:
          "A flat role list cannot express a six-tier org chart — permissions had to compose across hierarchy depth, territory and department simultaneously.",
        solution:
          "Resolved visibility as a server-side query scope derived from the user's position in the hierarchy, rather than a per-screen permission flag that every new feature would have to remember to check.",
      },
      {
        problem:
          "Filtering in the client would have meant sending records to browsers that were never entitled to see them.",
        solution:
          "Pushed the entire decision behind the API boundary. Unauthorised rows are never serialised, so there is nothing sensitive in the payload to leak.",
      },
    ],
    outcomes: [
      "480+ users served under one consistent access model",
      "Visibility rules applied once, not re-implemented per screen",
    ],
    links: {},
  },
  {
    id: "smart-traffic",
    name: "Smart Traffic Management System",
    tagline: "Emergency vehicle prioritisation with YOLO + Dijkstra",
    summary:
      "A traffic management system that detects ambulances at signals in real time and clears a path for them. YOLO handles detection from the camera feed; Dijkstra's algorithm allocates the shortest viable route through the signal network.",
    year: "2024",
    category: "Computer Vision",
    span: "regular",
    featured: false,
    tech: ["Python", "OpenCV", "YOLO", "Dijkstra Algorithm"],
    challenges: [
      {
        problem:
          "Detection had to be reliable enough at signal-camera quality that a false positive would not disrupt normal traffic flow.",
        solution:
          "Used YOLO for real-time ambulance detection on the live feed, keeping inference fast enough to act on within a single signal cycle.",
      },
      {
        problem:
          "Clearing one junction is pointless if the next one stops the vehicle again.",
        solution:
          "Applied Dijkstra's algorithm across the signal network to allocate a shortest path and prioritise the whole corridor rather than a single intersection.",
      },
    ],
    outcomes: [
      "Reduced delays for emergency vehicles across the signal network",
      "Real-time detection acted on within a signal cycle",
    ],
    links: {},
  },
  {
    id: "library-management",
    name: "Library Management System",
    tagline: "Java + MySQL circulation and inventory app",
    summary:
      "A web application covering the full circulation loop for a library — book checkouts, returns and inventory — backed by MySQL, with automatic overdue notifications and reservation management.",
    year: "2023",
    category: "Full-Stack",
    span: "regular",
    featured: false,
    tech: ["Java", "MySQL", "HTML", "CSS", "JavaScript"],
    challenges: [
      {
        problem:
          "Overdue tracking done manually is the first thing a librarian stops doing when the desk is busy.",
        solution:
          "Automated overdue detection and notification off the transaction records, so the reminder fires without anyone remembering to check.",
      },
      {
        problem:
          "Reservations and checkouts compete for the same physical copy.",
        solution:
          "Modelled books, members and transactions as distinct entities in MySQL so a reservation holds against a specific copy rather than a title.",
      },
    ],
    outcomes: [
      "Full checkout, return and inventory loop in one application",
      "Overdue notices and reservations handled automatically",
    ],
    links: {},
  },
  {
    id: "forensic-detection",
    name: "Forensic Document Detection",
    tagline: "HR document verification with a Python analysis engine",
    summary:
      "A verification service for HR document review. A Netlify-hosted frontend hands uploads to a Python analysis engine, which scores documents for tampering signals and persists results and audit history to Neon Postgres.",
    year: "2025",
    category: "Full-Stack",
    span: "wide",
    featured: false,
    tech: ["Next.js", "Python", "Neon Postgres", "Netlify"],
    challenges: [
      {
        problem:
          "Analysis runs are CPU-heavy and unpredictable in duration — long enough to blow a normal request budget.",
        solution:
          "Split the deployment so the frontend stays static-fast while the Python engine runs isolated with its own runtime limits.",
      },
      {
        problem:
          "Verification results are an audit trail — they have to survive, be attributable and be queryable later.",
        solution:
          "Persisted every run with its inputs and verdict to Neon Postgres, so a decision can be re-examined months later rather than re-run from scratch.",
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
    span: "wide",
    featured: false,
    tech: ["Next.js", "Firebase Auth", "Firestore", "Netlify"],
    challenges: [
      {
        problem:
          "Registration needed to be frictionless for non-technical users while still being reliably attributable.",
        solution:
          "Used Firebase Google SSO as the only sign-in path — no password reset flows to support, and every booking carries a verified identity.",
      },
      {
        problem: "Duplicate bookings from the same practitioner corrupted headcounts.",
        solution:
          "Keyed bookings on the authenticated uid so the write path itself enforces one booking per user.",
      },
    ],
    outcomes: [
      "Zero-password onboarding for practitioners",
      "Booking records attributable to a verified identity",
    ],
    links: {},
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    id: "wordpress",
    title: "WordPress & Plugin Development.",
    description:
      "Business sites and web pages on WordPress — custom plugins, forms and theme work that stays maintainable after launch.",
    bullets: [
      "Custom Plugin Development",
      "Forms & Integrations",
      "Theme & Design Handling",
      "Page Building & Layouts",
      "Performance & SEO",
    ],
    icon: TabletSmartphone,
    tone: "solid",
  },
  {
    id: "erp",
    title: "ERP Integration & Automation.",
    description:
      "ERPNext customisation and the pipelines that keep every downstream system in step.",
    bullets: [
      "ERPNext Customisation",
      "Client & Server Scripts",
      "n8n Data Pipelines",
      "GraphQL & REST Sync",
      "Role-Based Access",
    ],
    icon: Boxes,
    tone: "dark",
  },
  {
    id: "web-mobile",
    title: "Web & Enterprise Platform Development",
    description:
      "Product-grade frontends on Next.js and React, and the enterprise platforms built on top of them.",
    bullets: [
      "Next.js & React",
      "Plasmic Components",
      "Responsive UI/UX",
      "Dashboards & Tooling",
      "REST & GraphQL APIs",
    ],
    icon: CodeXml,
    tone: "solid",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Education                                  */
/* -------------------------------------------------------------------------- */

export const education: EducationItem[] = [
  {
    qualification: "B.E. Electronics and Communication Engineering",
    field: "Electronics & Communication",
    institution: "Kongu Engineering College",
    period: "2020 — 2024",
    result: "CGPA 7.6 / 10",
  },
  {
    qualification: "Higher Secondary Academic",
    institution: "GRD CPF Matric School",
    period: "2018 — 2020",
    result: "Score 70 / 100",
  },
];

export const techMarquee: string[] = [
  "React.js",
  "Next.js",
  "JavaScript",
  "Plasmic",
  "ERPNext",
  "Frappe",
  "n8n",
  "GraphQL",
  "REST APIs",
  "Node.js",
  "Java",
  "SQL",
  "PostgreSQL",
  "Neon DB",
  "Firebase",
  "Power BI",
  "Sentry",
  "Git",
  "Linux",
  "Netlify",
];

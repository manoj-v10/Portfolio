import { brandIcons, type BrandIcon } from "@/config/brandIcons";

/**
 * Maps a skill name to its brand logo. Anything absent here (Plasmic, Power BI,
 * and the conceptual skills like REST APIs or Prompt Engineering) renders as a
 * lettermark instead — see TechIcon.
 */
const SKILL_TO_BRAND: Record<string, string> = {
  // Frontend
  "React.js": "react",
  "Next.js": "nextdotjs",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML: "html5",
  CSS: "css",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framer",

  // ERP & automation
  ERPNext: "erpnext",
  "Frappe Server Scripts": "frappe",
  "Frappe Client Scripts": "frappe",
  Frappe: "frappe",
  "n8n Workflows": "n8n",
  n8n: "n8n",

  // Backend
  "Node.js": "nodedotjs",
  GraphQL: "graphql",
  Java: "openjdk",
  Python: "python",

  // Data & observability
  "PostgreSQL (Neon DB)": "postgresql",
  PostgreSQL: "postgresql",
  "Neon Postgres": "neon",
  MySQL: "mysql",
  "Firebase / Firestore": "firebase",
  "Firebase Auth": "firebase",
  Firestore: "firebase",
  Sentry: "sentry",

  // AI tooling
  Claude: "claude",
  Cursor: "cursor",
  "GitHub Copilot": "githubcopilot",

  // Platforms
  Git: "git",
  Linux: "linux",
  Netlify: "netlify",
  Vercel: "vercel",
  OpenCV: "opencv",
};

export function brandFor(name: string): BrandIcon | null {
  const slug = SKILL_TO_BRAND[name];
  return slug ? (brandIcons[slug] ?? null) : null;
}

/** Initials used when a skill has no brand logo, e.g. "REST APIs" -> "RA". */
export function lettermark(name: string): string {
  const words = name.replace(/[^\w\s/]/g, " ").split(/[\s/]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Shorter labels for the tile grid, where the full name would truncate. */
const SHORT_NAMES: Record<string, string> = {
  "PostgreSQL (Neon DB)": "PostgreSQL",
  "Frappe Server Scripts": "Server Scripts",
  "Frappe Client Scripts": "Client Scripts",
  "Firebase / Firestore": "Firebase",
  "n8n Workflows": "n8n",
  "GitHub Copilot": "Copilot",
  "Responsive UI/UX": "Responsive UI",
  "Prompt Engineering": "Prompting",
  "LLM Integration": "LLM Integration",
};

export function displayName(name: string): string {
  return SHORT_NAMES[name] ?? name;
}

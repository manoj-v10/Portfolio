/**
 * Extracts only the brand paths this site uses out of `simple-icons` into
 * src/config/brandIcons.ts, so the package stays a devDependency and never
 * reaches the client bundle.
 *
 *   node scripts/generate-brand-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const si = require("simple-icons");

const SLUGS = [
  "react",
  "nextdotjs",
  "javascript",
  "typescript",
  "html5",
  "css",
  "tailwindcss",
  "erpnext",
  "frappe",
  "n8n",
  "nodedotjs",
  "graphql",
  "openjdk",
  "postgresql",
  "mysql",
  "firebase",
  "neon",
  "sentry",
  "claude",
  "cursor",
  "githubcopilot",
  "git",
  "linux",
  "netlify",
  "vercel",
  "python",
  "opencv",
  "framer",
];

const entries = [];
const missing = [];

for (const slug of SLUGS) {
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (!icon) {
    missing.push(slug);
    continue;
  }
  entries.push({ slug, title: icon.title, hex: icon.hex, path: icon.path });
}

if (missing.length) {
  console.error("Missing from simple-icons:", missing.join(", "));
  process.exit(1);
}

const body = entries
  .map(
    (e) =>
      `  ${JSON.stringify(e.slug)}: {\n` +
      `    title: ${JSON.stringify(e.title)},\n` +
      `    hex: ${JSON.stringify("#" + e.hex)},\n` +
      `    path: ${JSON.stringify(e.path)},\n` +
      `  },`,
  )
  .join("\n");

const out = `// GENERATED FILE — do not edit by hand.
// Regenerate with: node scripts/generate-brand-icons.mjs
// Source: simple-icons (devDependency, never bundled).

export interface BrandIcon {
  title: string;
  hex: string;
  /** SVG path data on a 24x24 viewBox. */
  path: string;
}

export const brandIcons: Record<string, BrandIcon> = {
${body}
};

export type BrandSlug = keyof typeof brandIcons;
`;

const target = path.join(process.cwd(), "src", "config", "brandIcons.ts");
fs.writeFileSync(target, out, "utf8");
console.log(`Wrote ${entries.length} brand icons to ${path.relative(process.cwd(), target)}`);

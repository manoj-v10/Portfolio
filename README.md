# Manoj V — Portfolio

Senior-level developer portfolio built as a single static page. Deep dark UI, bento layouts,
and an interactive system-architecture diagram that traces data flow across the layers I work in.

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15 (App Router, React 19)                   |
| Language   | TypeScript (strict)                                 |
| Styling    | Tailwind CSS 3.4 + `tailwindcss-animate`            |
| Motion     | Framer Motion (viewport-triggered reveals)          |
| Icons      | Lucide React                                        |
| Primitives | Hand-rolled shadcn-style `Button` / `Badge` / `Card` |
| Fonts      | Inter (UI) + JetBrains Mono (tech labels, code)      |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, viewport theme
│   ├── page.tsx            # section composition
│   └── globals.css         # tokens, .surface-card, .lattice grid
├── components/
│   ├── ui/                 # Button, Badge, Card
│   ├── Navbar.tsx          # scroll-spy nav with shared layoutId indicator
│   ├── Hero.tsx            # badge, headline, stats row, tech marquee
│   ├── ArchitectureShowcase.tsx  # interactive node diagram (measured SVG edges)
│   ├── ExperienceTimeline.tsx
│   ├── ProjectsBento.tsx   # bento grid + deep-dive modal (portal)
│   ├── SkillsGrid.tsx
│   ├── ContactSection.tsx  # copy-to-clipboard email
│   ├── SectionHeading.tsx
│   └── Footer.tsx
├── config/
│   └── portfolioData.ts    # ALL content lives here — typed, no prose in components
├── lib/
│   ├── motion.ts           # shared Framer Motion variants + viewport config
│   └── utils.ts            # cn()
└── types/
    └── index.ts            # strict interfaces for every data structure
```

## Editing content

Everything user-facing is in [`src/config/portfolioData.ts`](src/config/portfolioData.ts) and typed
against [`src/types/index.ts`](src/types/index.ts). Components never hardcode copy.

- **Projects** — add to `projects`. `span: "hero" | "wide" | "regular"` controls bento footprint;
  `links.live` / `links.repo` render the corresponding buttons only when present.
- **Architecture** — `architectureNodes` carries `position: { col, row }` on a 4×2 lattice and
  `downstream` ids. Edges are drawn from measured DOM boxes, so adding a node needs no coordinates
  beyond its grid cell. Selecting a node lights its full transitive downstream pathway.
- **Skills** — `span: "wide"` makes a card span two columns; `level` drives the Core/Strong/Working chip.

## Before deploying

1. Add `public/Manoj_V_Resume.pdf` (see [`public/README.md`](public/README.md)).
2. Fill in `links.live` / `links.repo` on any project whose source is public.
3. Optionally add an OG image and wire `openGraph.images` in `src/app/layout.tsx`.

## Notes

- Fully static — `next build` prerenders the single route; deploys to Vercel or Netlify as-is.
- Motion respects `prefers-reduced-motion` via a global override in `globals.css`.
- The architecture diagram recomputes its edges through a `ResizeObserver`, so it survives
  responsive reflow and font loading without hardcoded coordinates.

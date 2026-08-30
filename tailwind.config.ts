import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1180px" },
    },
    extend: {
      colors: {
        base: "#0a0a0c",
        tile: "#202025",
        raised: "#2a2a31",
        line: "#33333b",
        // Dimmest neutral that still clears 4.5:1 on the card surface.
        muted: "#8a8a90",
        accent: {
          DEFAULT: "#a3e635",
          soft: "#bef264",
          deep: "#65a30d",
        },
        // Playful tile accents — used sparingly, one per small tile.
        pop: {
          amber: "#fbbf24",
          violet: "#a78bfa",
          cyan: "#22d3ee",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        tile: "26px",
        "tile-sm": "20px",
      },
      boxShadow: {
        tile: "0 1px 0 0 rgba(255,255,255,0.045) inset, 0 18px 40px -28px rgba(0,0,0,0.95)",
        lift: "0 1px 0 0 rgba(255,255,255,0.07) inset, 0 30px 60px -30px rgba(0,0,0,1)",
        glow: "0 0 0 1px rgba(163,230,53,0.22), 0 0 40px -12px rgba(163,230,53,0.4)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.75)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "equalize-1": { "0%,100%": { height: "30%" }, "50%": { height: "95%" } },
        "equalize-2": { "0%,100%": { height: "85%" }, "50%": { height: "35%" } },
        "equalize-3": { "0%,100%": { height: "50%" }, "50%": { height: "100%" } },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        float: "float 5s ease-in-out infinite",
        "equalize-1": "equalize-1 1.1s ease-in-out infinite",
        "equalize-2": "equalize-2 1.4s ease-in-out infinite",
        "equalize-3": "equalize-3 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

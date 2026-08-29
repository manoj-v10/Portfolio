import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        base: "#09090b",
        surface: "#121215",
        elevated: "#17171b",
        line: "#27272a",
        accent: {
          DEFAULT: "#34d399",
          soft: "#6ee7b7",
          deep: "#059669",
        },
        cyanic: {
          DEFAULT: "#22d3ee",
          soft: "#67e8f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52,211,153,0.16), 0 0 32px -8px rgba(52,211,153,0.35)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.16), 0 0 32px -8px rgba(34,211,238,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -32px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(9,9,11,0) 0%, #09090b 78%), radial-gradient(60% 50% at 50% 0%, rgba(52,211,153,0.10) 0%, rgba(9,9,11,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.82)" },
        },
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "flow-dash": "flow-dash 1s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

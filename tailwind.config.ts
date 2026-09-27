import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDFBF7",
        foreground: "#181411",
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFFFF",
          warm: "#FBF7F0",
          cream: "#F5EFE6",
        },
        primary: {
          DEFAULT: "#C85A17", // Vedic Saffron-Orange
          dark: "#A6440C",
          light: "#E06D2B",
          soft: "#FFF7ED",
        },
        terracotta: {
          DEFAULT: "#C85A17",
          dark: "#A6440C",
          light: "#E06D2B",
        },
        secondary: {
          DEFAULT: "#D97706", // Sacred Amber
          dark: "#B45309",
          light: "#F59E0B",
          soft: "#FEF3C7",
        },
        gold: {
          DEFAULT: "#D97706",
          dark: "#B45309",
          light: "#FBBF24",
        },
        navy: {
          DEFAULT: "#131B2E",
          dark: "#0B1120",
          light: "#1E293B",
          border: "#334155",
        },
        textHeading: "#181411",
        textBody: "#443931",
        textMuted: "#786B61",
        textCaption: "#9A8C82",
        textInverted: "#FFFFFF",
        border: {
          DEFAULT: "#E7DFD5",
          subtle: "#F2EBE2",
          warm: "#E2D5C3",
          gold: "rgba(217, 119, 6, 0.35)",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "'Noto Serif Devanagari'", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "'Noto Sans Devanagari'", "Outfit", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(43, 35, 29, 0.04), 0 1px 2px rgba(43, 35, 29, 0.02)",
        card: "0 4px 20px rgba(43, 35, 29, 0.06), 0 1px 3px rgba(43, 35, 29, 0.04)",
        hover: "0 10px 30px rgba(43, 35, 29, 0.10), 0 3px 8px rgba(43, 35, 29, 0.06)",
        navy: "0 12px 36px rgba(11, 21, 38, 0.25)",
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;

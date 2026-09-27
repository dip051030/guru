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
        background: "#FAF7F2",
        foreground: "#2B231D",
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFDF9",
          warm: "#F5EFE6",
          cream: "#F9F4EB",
        },
        primary: {
          DEFAULT: "#B34A26",
          dark: "#963B1C",
          light: "#CD6440",
          soft: "#FBF1ED",
        },
        secondary: {
          DEFAULT: "#C5994E",
          dark: "#A87C35",
          light: "#DEC07E",
          soft: "#F9F5EC",
        },
        navy: {
          DEFAULT: "#12213A",
          dark: "#0B1526",
          light: "#1C3257",
          border: "#233A60",
        },
        textHeading: "#231B15",
        textBody: "#50443B",
        textMuted: "#7E7065",
        textCaption: "#9C8E82",
        textInverted: "#FFFFFF",
        border: {
          DEFAULT: "#EADFCF",
          subtle: "#F2EAE0",
          warm: "#E2D5C3",
          gold: "rgba(197, 153, 78, 0.35)",
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

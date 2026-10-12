import React from "react";

// Line-drawn rashi glyphs on a 24×24 grid, styled to match the Phosphor icons.
// Inline SVG instead of the Unicode signs (♈ …), which phones render as emoji.
const PATHS: Record<string, string> = {
  aries:
    "M12 21V10 M12 10C12 5.5 9.5 3.5 7 3.5S3 5.2 3 7.8 5 11.5 7 11.5 M12 10C12 5.5 14.5 3.5 17 3.5S21 5.2 21 7.8 19 11.5 17 11.5",
  taurus: "M3.5 3.5c.6 4 4 6.5 8.5 6.5s7.9-2.5 8.5-6.5 M12 10a5.5 5.5 0 1 0 0 11 5.5 5.5 0 1 0 0-11",
  gemini: "M4 3.5c5 2 11 2 16 0 M4 20.5c5-2 11-2 16 0 M8.5 5v14 M15.5 5v14",
  cancer:
    "M3.5 9a3 3 0 1 0 6 0 3 3 0 1 0-6 0 M6.5 6C10.5 3 16.5 3.2 20.5 6.8 M14.5 15a3 3 0 1 0 6 0 3 3 0 1 0-6 0 M17.5 18c-4 3-10 2.8-14-.8",
  leo: "M3.5 16a3 3 0 1 0 6 0 3 3 0 1 0-6 0 M9.5 16C9.5 12 7.5 10 7.5 7.5a4.5 4.5 0 0 1 9 0c0 3.5-3.5 6.5-3.5 10.5a2.5 2.5 0 0 0 5 0",
  virgo:
    "M3 6.5c1 0 2 .8 2 2.5V19 M5 9c0-1.6 1.1-2.5 2.5-2.5S10 7.4 10 9v10 M10 9c0-1.6 1.1-2.5 2.5-2.5S15 7.4 15 9v6.5c0 3 1.5 5 4 5.5 M15 16c1-2.5 2.6-3.6 4-3.6 1.3 0 2 .9 2 2.2 0 2.2-2.6 4.6-6.5 6.4",
  libra: "M3.5 20.5h17 M3.5 16H8a4 4 0 1 1 8 0h4.5",
  scorpio:
    "M3 6.5c1 0 2 .8 2 2.5V19 M5 9c0-1.6 1.1-2.5 2.5-2.5S10 7.4 10 9v10 M10 9c0-1.6 1.1-2.5 2.5-2.5S15 7.4 15 9v8.5c0 1.4.8 2 2 2h4 M18.5 17l2.5 2.5-2.5 2.5",
  sagittarius: "M4 20 20 4 M12.5 4H20v7.5 M7.5 11.5l5 5",
  capricorn:
    "M3 5c1.8 0 2.8 1.6 3.4 4.5L8.5 19 M8.5 19 11.3 8.5C11.9 6.4 12.9 5 14 5s2 1.2 2 3.5v8.5 M16 17a2.6 2.6 0 1 0 2.6-2.6c-1.7 0-2.6 1.3-2.6 2.6 0 2.2-1.4 3.8-3.6 3.8",
  aquarius: "M3 10.5 6 7.5l3 3 3-3 3 3 3-3 3 3 M3 17l3-3 3 3 3-3 3 3 3-3 3 3",
  pisces: "M6 3c3.8 4.5 3.8 13.5 0 18 M18 3c-3.8 4.5-3.8 13.5 0 18 M4.5 12h15",
};

export const ZODIAC_IDS = Object.keys(PATHS);

interface ZodiacIconProps extends Omit<React.SVGProps<SVGSVGElement>, "id"> {
  sign: string;
  size?: number | string;
  strokeWidth?: number;
}

export default function ZodiacIcon({ sign, size = 20, strokeWidth = 1.8, ...props }: ZodiacIconProps) {
  const d = PATHS[sign];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

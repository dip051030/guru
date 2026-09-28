"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "gold";
  showText?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  variant = "dark",
  showText = true,
}: BrandLogoProps) {
  // Dimensions based on size
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textStyles = {
    dark: {
      title: "text-[#12213A]",
      sub: "text-[#B34A26]",
      tag: "text-[#8C7A6B]",
    },
    light: {
      title: "text-white",
      sub: "text-[#D4AF37]",
      tag: "text-[#9EB1C7]",
    },
    gold: {
      title: "text-[#C5994E]",
      sub: "text-[#E6C687]",
      tag: "text-[#A8987E]",
    },
  }[variant];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Luxury Geometric Astrolabe & Lotus Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-500 hover:rotate-45"
        >
          {/* Subtle Outer Concentric Ring with Cardinal Degree Ticks */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke={variant === "light" ? "rgba(212,175,55,0.4)" : "rgba(179,74,38,0.35)"}
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={variant === "light" ? "#D4AF37" : "#C5994E"}
            strokeWidth="1.2"
          />

          {/* 12-Spoke Radial Horizon Lines (Rashi Cusps) */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 50 + 38 * Math.cos(angle);
            const y1 = 50 + 38 * Math.sin(angle);
            const x2 = 50 + 42 * Math.cos(angle);
            const y2 = 50 + 42 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={variant === "light" ? "#E6C687" : "#B34A26"}
                strokeWidth="1.2"
              />
            );
          })}

          {/* Intersecting Sacred Diamond Matrix (North Indian Kundali Matrix) */}
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            stroke={variant === "light" ? "rgba(255,255,255,0.85)" : "#12213A"}
            strokeWidth="1.2"
            fill={variant === "light" ? "rgba(255,255,255,0.03)" : "rgba(179,74,38,0.04)"}
          />
          <polygon
            points="50,20 80,50 50,80 20,50"
            stroke={variant === "light" ? "#D4AF37" : "#B34A26"}
            strokeWidth="1.5"
            fill={variant === "light" ? "rgba(212,175,55,0.12)" : "rgba(197,153,78,0.12)"}
          />

          {/* Diagonal Cross Rays */}
          <line
            x1="20"
            y1="20"
            x2="80"
            y2="80"
            stroke={variant === "light" ? "rgba(212,175,55,0.5)" : "rgba(179,74,38,0.4)"}
            strokeWidth="0.8"
          />
          <line
            x1="80"
            y1="20"
            x2="20"
            y2="80"
            stroke={variant === "light" ? "rgba(212,175,55,0.5)" : "rgba(179,74,38,0.4)"}
            strokeWidth="0.8"
          />

          {/* Radiant Central Sun / Bindu Sanctum */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill={variant === "light" ? "#D4AF37" : "#B34A26"}
          />
          <circle
            cx="50"
            cy="50"
            r="4"
            fill={variant === "light" ? "#12213A" : "#FFFFFF"}
          />
          <circle
            cx="50"
            cy="50"
            r="1.8"
            fill={variant === "light" ? "#FFFFFF" : "#B34A26"}
          />
        </svg>
      </div>

      {/* Clean Minimal Typography Lockup - Guru Nilhari */}
      {showText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-serif tracking-tight font-bold leading-none ${
              size === "sm" ? "text-base" : size === "md" ? "text-xl" : "text-2xl"
            } ${textStyles.title}`}
          >
            गुरु निलहरि
          </span>
          <span className={`text-[9px] font-mono tracking-widest uppercase mt-1 font-bold ${textStyles.sub}`}>
            Vedic Sanatan Kendra UK
          </span>
        </div>
      )}
    </div>
  );
}

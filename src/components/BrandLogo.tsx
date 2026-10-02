"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark" | "gold";
  showText?: boolean;
  hideTextOnMobile?: boolean;
}

export default function BrandLogo({
  className = "",
  size = "md",
  variant = "dark",
  showText = true,
  hideTextOnMobile = true,
}: BrandLogoProps) {
  // Dimensions based on size
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const textStyles = {
    dark: {
      title: "text-stone-900",
      sub: "text-[#D95B16]",
      tag: "text-stone-500",
    },
    light: {
      title: "text-white",
      sub: "text-amber-400",
      tag: "text-stone-300",
    },
    gold: {
      title: "text-[#C5994E]",
      sub: "text-[#E6C687]",
      tag: "text-[#A8987E]",
    },
  }[variant];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Official Sacred Sun-Lotus Om Logo */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <img
          src="/logo.png"
          alt="Guru Nilhari - Vedic Sanatan Kendra UK"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xs"
        />
      </div>

      {/* Clean Typography Lockup (Hidden on mobile, visible on sm and up) */}
      {showText && (
        <div className={`${hideTextOnMobile ? "hidden sm:flex" : "flex"} flex-col text-left`}>
          <span
            className={`font-serif tracking-tight font-black leading-none ${
              size === "sm" ? "text-sm sm:text-base" : size === "md" ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            } ${textStyles.title}`}
          >
            गुरु निलहरि
          </span>
          <span className={`text-[8.5px] sm:text-[9.5px] font-mono tracking-widest uppercase mt-0.5 sm:mt-1 font-bold ${textStyles.sub}`}>
            Vedic Sanatan Kendra UK
          </span>
        </div>
      )}
    </div>
  );
}

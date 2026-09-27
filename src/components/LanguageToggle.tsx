"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  variant?: "header" | "mobile" | "footer";
}

export default function LanguageToggle({ variant = "header" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-cream/70 border border-border">
        <div className="flex items-center gap-2 text-xs font-mono text-navy font-semibold">
          <Globe className="w-4 h-4 text-terracotta" />
          <span>भाषा / Language</span>
        </div>
        <div className="flex items-center p-0.5 rounded-lg bg-surface border border-border">
          <button
            onClick={() => setLanguage("ne")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              language === "ne"
                ? "bg-terracotta text-white shadow-sm font-serif"
                : "text-textMuted hover:text-navy"
            }`}
          >
            नेपाली
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              language === "en"
                ? "bg-terracotta text-white shadow-sm font-mono"
                : "text-textMuted hover:text-navy"
            }`}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#F3ECE1] border border-[#E0D3C0] text-xs shadow-inner">
      <button
        onClick={() => setLanguage("ne")}
        aria-label="Switch to Nepali"
        className={`px-3 py-1 rounded-full transition-all duration-200 font-serif ${
          language === "ne"
            ? "bg-white text-terracotta font-bold shadow-sm"
            : "text-textMuted hover:text-navy"
        }`}
      >
        नेपाली
      </button>
      <button
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-full transition-all duration-200 font-mono text-[11px] ${
          language === "en"
            ? "bg-white text-terracotta font-bold shadow-sm"
            : "text-textMuted hover:text-navy"
        }`}
      >
        EN
      </button>
    </div>
  );
}

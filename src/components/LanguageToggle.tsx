"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { IconGlobe as Globe } from "./icons/CustomIcons";

interface LanguageToggleProps {
  variant?: "header" | "mobile" | "footer";
}

export default function LanguageToggle({ variant = "header" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-3 rounded-none bg-stone-50 border border-stone-300">
        <div className="flex items-center gap-2 text-xs font-mono text-[#181411] font-bold">
          <Globe className="w-4 h-4 text-[#C85A17]" />
          <span>भाषा / Language</span>
        </div>
        <div className="flex items-center p-0.5 rounded-none bg-white border border-stone-300">
          <button
            onClick={() => setLanguage("ne")}
            className={`px-3 py-1 rounded-none text-xs font-bold transition-all ${
              language === "ne"
                ? "bg-[#C85A17] text-white"
                : "text-stone-600 hover:text-[#C85A17]"
            }`}
          >
            नेपाली
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-none text-xs font-bold transition-all ${
              language === "en"
                ? "bg-[#C85A17] text-white"
                : "text-stone-600 hover:text-[#C85A17]"
            }`}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center p-0.5 rounded-lg bg-stone-100/90 border border-stone-200 text-xs">
      <button
        onClick={() => setLanguage("ne")}
        aria-label="Switch to Nepali"
        className={`px-2.5 py-1 rounded-md transition-all text-xs font-semibold ${
          language === "ne"
            ? "bg-[#D95B16] text-white shadow-xs"
            : "text-stone-600 hover:text-[#D95B16]"
        }`}
      >
        नेपाली
      </button>
      <button
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-md transition-all text-xs font-semibold ${
          language === "en"
            ? "bg-[#D95B16] text-white shadow-xs"
            : "text-stone-600 hover:text-[#D95B16]"
        }`}
      >
        EN
      </button>
    </div>
  );
}

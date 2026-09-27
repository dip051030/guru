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
      <div className="flex items-center justify-between p-3 rounded-none bg-slate-50 border border-slate-300">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-900 font-bold">
          <Globe className="w-4 h-4 text-slate-900" />
          <span>भाषा / Language</span>
        </div>
        <div className="flex items-center p-0.5 rounded-none bg-white border border-slate-300">
          <button
            onClick={() => setLanguage("ne")}
            className={`px-3 py-1 rounded-none text-xs font-bold transition-all ${
              language === "ne"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            नेपाली
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-none text-xs font-bold transition-all ${
              language === "en"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center p-0.5 rounded-none bg-slate-100 border border-slate-300 text-xs">
      <button
        onClick={() => setLanguage("ne")}
        aria-label="Switch to Nepali"
        className={`px-2.5 py-1 rounded-none transition-colors text-xs font-bold ${
          language === "ne"
            ? "bg-slate-900 text-white shadow-2xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        नेपाली
      </button>
      <button
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
        className={`px-2.5 py-1 rounded-none transition-colors text-xs font-bold ${
          language === "en"
            ? "bg-slate-900 text-white shadow-2xs"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        EN
      </button>
    </div>
  );
}

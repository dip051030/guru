"use client";

import React from "react";
import Link from "next/link";
import { IconArrowLeft, IconCalendar } from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  titleNe: string;
  titleEn: string;
  descNe: string;
  descEn: string;
  ctaNe?: string;
  ctaEn?: string;
  onCta?: () => void;
}

/** Simple, consistent hero for sub-pages: breadcrumb, title, one line, one action. */
export default function PageHero({ titleNe, titleEn, descNe, descEn, ctaNe, ctaEn, onCta }: Props) {
  const { language } = useLanguage();
  const isNe = language === "ne";
  return (
    <section className="w-full bg-[#0E1A2E] text-white px-4 sm:px-6 lg:px-10 pt-8 pb-10">
      <div className="max-w-[1300px] mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300">
          <IconArrowLeft size={14} /> {isNe ? "गृहपृष्ठ" : "Home"}
        </Link>
        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">{isNe ? titleNe : titleEn}</h1>
            <p className="mt-2 text-stone-300">{isNe ? descNe : descEn}</p>
          </div>
          {onCta && (
            <button onClick={onCta} className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D95B16] hover:bg-[#B8480C] text-white text-sm font-semibold shrink-0">
              <IconCalendar size={16} /> {isNe ? ctaNe : ctaEn}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

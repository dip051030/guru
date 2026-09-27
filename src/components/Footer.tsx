"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onOpenInquiry: (subject?: string) => void;
}

export default function Footer({ onOpenInquiry }: FooterProps) {
  const { t, language } = useLanguage();

  return (
    <footer id="contact" className="w-full bg-[#0B1526] text-[#BAC7D8] border-t border-[#1C2C45] pt-16 pb-12">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#1C2C45]">
          {/* Brand Column (Col 1 to 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-sm text-[#93A5BC] max-w-md font-light leading-relaxed mt-2">
              {t.footer.tagline}
            </p>

            <div className="mt-2 flex items-center gap-3 text-xs font-mono text-gold">
              <span>{t.footer.city}</span>
            </div>
          </div>

          {/* Quick Links (Col 6 to 7) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              {t.footer.quickLinks}
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-[#93A5BC]">
              <a href="#" className="hover:text-white transition-colors">
                {t.header.home}
              </a>
              <a href="#kundali" className="hover:text-white transition-colors">
                {t.header.kundali}
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                {t.header.services}
              </a>
              <a href="#works" className="hover:text-white transition-colors">
                {t.header.research}
              </a>
              <a href="#philosophy" className="hover:text-white transition-colors">
                {language === "ne" ? "वैदिक मूल्यमान्यता" : "Ethical Manifesto"}
              </a>
              <a href="#about-guru" className="hover:text-white transition-colors">
                {t.header.aboutGuru}
              </a>
            </div>
          </div>

          {/* Practice Groups (Col 8 to 9) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              {t.footer.ourServices}
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-[#93A5BC]">
              <button
                onClick={() => onOpenInquiry(language === "ne" ? "जन्म कुण्डली तथा विंशोत्तरी दशा" : "Natal Kundali & Dasha")}
                className="text-left hover:text-white transition-colors"
              >
                {language === "ne" ? "जन्म कुण्डली तथा दशा" : "Natal Kundali & Dasha"}
              </button>
              <button
                onClick={() => onOpenInquiry(language === "ne" ? "विवाह कुण्डली मिलान" : "Matrimonial Compatibility")}
                className="text-left hover:text-white transition-colors"
              >
                {language === "ne" ? "विवाह कुण्डली मिलान" : "Marriage Matchmaking"}
              </button>
              <button
                onClick={() => onOpenInquiry(language === "ne" ? "नयाँ व्यापार तथा उद्योग साइत" : "Enterprise Muhurta")}
                className="text-left hover:text-white transition-colors"
              >
                {language === "ne" ? "व्यापारिक शुभ साइत" : "Auspicious Muhurta"}
              </button>
              <button
                onClick={() => onOpenInquiry(language === "ne" ? "गृह प्रवेश तथा वास्तु परामर्श" : "Vastu Consultation")}
                className="text-left hover:text-white transition-colors"
              >
                {language === "ne" ? "वास्तु तथा दिशा शोधन" : "Vedic Vastu Alignment"}
              </button>
              <button
                onClick={() => onOpenInquiry(language === "ne" ? "शान्ति तथा वैदिक अनुष्ठान" : "Graha Shanti Rituals")}
                className="text-left hover:text-white transition-colors"
              >
                {language === "ne" ? "शान्ति तथा अनुष्ठान" : "Shanti & Vedic Rituals"}
              </button>
            </div>
          </div>

          {/* Contact (Col 10 to 12) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              {t.footer.contactTitle}
            </span>
            <div className="text-xs font-mono text-[#93A5BC] leading-relaxed space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>
                  {language === "ne"
                    ? "बालुवाटार, काठमाडौँ, नेपाल (सभामुख निवास नजिक)"
                    : "Baluwatar, Kathmandu, Nepal (Near Speaker's Residence)"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-terracotta shrink-0" />
                <span>{t.footer.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>+९७७ १ ४४१२३४५ / ९८५१०१२३४५</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span>contact@guruneelhari.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6A7E97]">
          <div>
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>{t.footer.standards}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

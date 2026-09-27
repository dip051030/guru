"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Compass, Heart } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onOpenInquiry: (subject?: string) => void;
}

export default function Footer({ onOpenInquiry }: FooterProps) {
  return (
    <footer id="contact" className="w-full bg-[#0B1526] text-[#BAC7D8] border-t border-[#1C2C45] pt-16 pb-12">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#1C2C45]">
          {/* Brand Column (Col 1 to 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-sm text-[#93A5BC] max-w-md font-light leading-relaxed mt-2">
              काठमाडौँको ऐतिहासिक वैदिक परम्परामा आधारित प्रामाणिक ज्योतिष परामर्श। व्यक्तिगत जन्म कुण्डली, विंशोत्तरी दशा फल, विवाह मिलान, व्यापारिक साइत र पञ्चाङ्ग गणनाको शुद्ध मार्गदर्शन।
            </p>

            <div className="mt-2 flex items-center gap-3 text-xs font-mono text-gold">
              <span>बालुवाटार, काठमाडौँ</span>
              <span>•</span>
              <span>वि.सं. २०८१</span>
              <span>•</span>
              <span>चित्रापक्षीय अयनांश</span>
            </div>
          </div>

          {/* Quick Links (Col 6 to 7) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              द्रुत लिङ्कहरू
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-[#93A5BC]">
              <a href="#" className="hover:text-white transition-colors">
                गृह पृष्ठ (Home)
              </a>
              <a href="#ephemeris" className="hover:text-white transition-colors">
                कुण्डली तथा पञ्चाङ्ग
              </a>
              <a href="#solutions" className="hover:text-white transition-colors">
                शास्त्रीय सेवाहरू
              </a>
              <a href="#works" className="hover:text-white transition-colors">
                परामर्श तथा अनुसन्धान
              </a>
              <a href="#philosophy" className="hover:text-white transition-colors">
                वैदिक मूल्यमान्यता
              </a>
              <a href="#about-guru" className="hover:text-white transition-colors">
                ज्योतिषाचार्य परिचय
              </a>
            </div>
          </div>

          {/* Practice Groups (Col 8 to 9) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              हाम्रा सेवाहरू
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-[#93A5BC]">
              <button
                onClick={() => onOpenInquiry("जन्म कुण्डली तथा विंशोत्तरी दशा")}
                className="text-left hover:text-white transition-colors"
              >
                जन्म कुण्डली तथा दशा
              </button>
              <button
                onClick={() => onOpenInquiry("विवाह कुण्डली मिलान")}
                className="text-left hover:text-white transition-colors"
              >
                विवाह कुण्डली मिलान
              </button>
              <button
                onClick={() => onOpenInquiry("नयाँ व्यापार तथा उद्योग साइत")}
                className="text-left hover:text-white transition-colors"
              >
                व्यापारिक शुभ साइत
              </button>
              <button
                onClick={() => onOpenInquiry("गृह प्रवेश तथा वास्तु परामर्श")}
                className="text-left hover:text-white transition-colors"
              >
                वास्तु तथा दिशा शोधन
              </button>
              <button
                onClick={() => onOpenInquiry("शान्ति तथा वैदिक अनुष्ठान")}
                className="text-left hover:text-white transition-colors"
              >
                शान्ति तथा अनुष्ठान
              </button>
            </div>
          </div>

          {/* Contact (Col 10 to 12) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
              सम्पर्क तथा ठेगाना
            </span>
            <div className="text-xs font-mono text-[#93A5BC] leading-relaxed space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                <span>बालुवाटार, काठमाडौँ, नेपाल (सभामुख निवास नजिक)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-terracotta shrink-0" />
                <span>आइतबार – शुक्रबार: बिहान ८:०० – साँझ ६:००</span>
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
            © २०८१ नील हरि वैदिक ज्योतिष केन्द्र। सर्वाधिकार सुरक्षित।
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>प्रामाणिक वैदिक ज्योतिष तथा दृक-गणित</span>
            <span>•</span>
            <span>काठमाडौँ, नेपाल</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

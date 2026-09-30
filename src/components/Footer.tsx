"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onOpenInquiry: (subject?: string) => void;
}

export default function Footer({ onOpenInquiry }: FooterProps) {
  const { t, language } = useLanguage();
  const isNe = language === "ne";

  return (
    <footer id="contact" className="w-full bg-[#0D1524] text-stone-300 border-t border-stone-800/80 pt-16 pb-24 md:pb-12">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800/60">
          
          {/* Brand Column (Col 1 to 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <BrandLogo variant="light" size="lg" />
            </Link>

            <div className="mt-1">
              <span className="text-amber-400 font-serif font-bold text-sm block">
                {isNe ? "गुरु नीलहरी" : "GURU NILHARI"}
              </span>
              <span className="text-stone-400 font-mono text-xs block">
                {isNe ? "CEO तथा प्रमुख परामर्शदाता" : "CEO & Chief Consultant"}
              </span>
              <span className="text-stone-300 font-serif text-xs font-semibold block mt-0.5">
                {isNe ? "वैदिक सनातन केन्द्र युके" : "VEDIC SANATAN KENDRA UK"}
              </span>
              <p className="text-xs font-serif text-amber-300/80 italic mt-1">
                {isNe ? "वैदिक ज्ञान • संस्कार • परामर्श" : "Vedic Knowledge • Rituals • Consultation"}
              </p>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="mt-1 flex items-center gap-2 text-xs font-mono text-[#F59E0B] font-bold">
              <span>www.gurunilhari.com</span>
              <span className="text-stone-600">•</span>
              <span>UK Registered</span>
            </div>
          </div>

          {/* Quick Links (Col 5 to 6) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] font-bold">
              {t.footer.quickLinks}
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-stone-400">
              <Link href="/" className="hover:text-white transition-colors">
                {t.header.home}
              </Link>
              <Link href="/services" className="hover:text-white transition-colors">
                {t.header.services}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors text-amber-400 font-bold flex items-center gap-1">
                <ShoppingBag className="w-3 h-3 text-[#C85A17]" />
                <span>{isNe ? "स्टोर (Store)" : "Store (Buy)"}</span>
              </Link>
              <Link href="/#horoscope-section" className="hover:text-white transition-colors">
                {t.header.horoscope}
              </Link>
              <Link href="/ephemeris" className="hover:text-white transition-colors">
                {t.header.kundali}
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                {t.header.aboutGuru}
              </Link>
              <Link href="/consultation" className="hover:text-white transition-colors">
                {isNe ? "परामर्श बुकिङ" : "Consultation"}
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                {t.header.contactNav}
              </Link>
            </div>
          </div>

          {/* Services (Book) (Col 7 to 8) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] font-bold">
              {isNe ? "परामर्श सेवाहरू (SERVICES)" : "SERVICES (BOOK)"}
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-stone-400">
              <Link href="/services" className="hover:text-white transition-colors">
                {isNe ? "• वैदिक ज्योतिष शास्त्र (Astrology)" : "• Vedic Astrology"}
              </Link>
              <Link href="/services#service-vastu" className="hover:text-white transition-colors">
                {isNe ? "• वास्तु शास्त्र परामर्श (Vastu)" : "• Vastu Shastra"}
              </Link>
              <Link href="/services#service-karmakanda" className="hover:text-white transition-colors">
                {isNe ? "• कर्मकाण्ड तथा पूजा (Karmakanda)" : "• Karmakanda & Puja"}
              </Link>
              <Link href="/#muhurta-section" className="hover:text-white transition-colors">
                {isNe ? "• शुभ साइत निर्धारण (Muhurta)" : "• Auspicious Muhurta"}
              </Link>
              <Link href="/#gemstone-section" className="hover:text-white transition-colors">
                {isNe ? "• रत्न पहिचान परामर्श (Gemstone)" : "• Gemstone Consultation"}
              </Link>
              <Link href="/services#service-colour" className="hover:text-white transition-colors">
                {isNe ? "• रङ्ग थेरापी (Colour Therapy)" : "• Colour Wellness"}
              </Link>
            </div>
          </div>

          {/* Store Items (Buy) (Col 9 to 10) & Contact (Col 11 to 12) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F59E0B] font-bold">
              {isNe ? "धार्मिक सामग्री स्टोर (STORE)" : "SPIRITUAL STORE (BUY)"}
            </span>
            <div className="flex flex-col gap-2.5 text-xs font-mono text-stone-400">
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• पूजा सामग्री (Puja Samagri)" : "• Puja Samagri"}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• हवन सामग्री (Havan Materials)" : "• Havan Materials"}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• रुद्राक्ष तथा जपमाला (Rudraksha & Mala)" : "• Rudraksha & Mala"}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• प्राणप्रतिष्ठित यन्त्र (Yantras)" : "• Energized Yantras"}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• प्रमाणित नौ रत्न (Certified Gemstones)" : "• Certified Gemstones"}
              </Link>
              <Link href="/store" className="hover:text-white transition-colors">
                {isNe ? "• ज्योतिष तथा धार्मिक पुस्तकहरू" : "• Astrology & Spiritual Books"}
              </Link>
            </div>

            {/* Direct Contact details */}
            <div className="mt-4 pt-4 border-t border-stone-800 text-xs font-mono text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <a href="https://wa.me/447838820518" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  +44 7838 820518 (UK)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C85A17] shrink-0" />
                <a href="mailto:contact@gurunilhari.com" className="hover:text-white">
                  contact@gurunilhari.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Section 20 UK Legal Disclaimer */}
        <div className="my-8 p-5 bg-[#080E1A] border border-stone-800 text-stone-400 text-xs leading-relaxed font-sans">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-stone-300 font-bold">
                {isNe ? "वैधानिक सूचना तथा मार्गदर्शन (UK Legal Disclaimer):" : "UK Legal Notice & Disclaimer:"}
              </p>
              <p className="text-stone-400 font-light">
                {isNe
                  ? "वैदिक ज्योतिष, वास्तु, रत्न तथा रङ्ग सम्बन्धी सेवाहरू परम्परागत तथा complementary guidance को रूपमा प्रदान गरिन्छन्। यी सेवाहरूले medical, legal वा financial professional advice लाई replace गर्दैनन्। बहुमूल्य धातु तथा रत्न सम्बन्धी सामग्रीहरू यूकेका प्रचलित मापदण्ड तथा hallmarking नियम अनुसार उपलब्ध गराइन्छ।"
                  : "Vedic astrology, Vastu, gemstone and colour-related services are provided as traditional and complementary guidance and are not a substitute for professional medical, legal or financial advice. All precious metal items and gemstone jewellery comply with applicable UK hallmarking and consumer regulations."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            © २०२६ गुरु नीलहरी • वैदिक सनातन केन्द्र युके (VEDIC SANATAN KENDRA UK). सर्वाधिकार सुरक्षित।
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>+44 7838 820518</span>
            <span>•</span>
            <span>www.gurunilhari.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

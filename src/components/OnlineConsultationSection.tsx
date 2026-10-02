"use client";

import React, { useState } from "react";
import {
  IconCalendar,
  IconClock,
  IconUsers,
  IconPhone,
  IconMail,
  IconCheckCircle,
  IconShield,
  IconSparkles,
  IconMessageCircle,
} from "@/components/icons/CustomIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function OnlineConsultationSection() {
  const { language } = useLanguage();
  const isNe = language === "ne";

  const [service, setService] = useState("astrology");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("morning");
  const [mode, setMode] = useState("online");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="consultation" className="w-full py-16 md:py-24 bg-white border-b border-stone-200 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 text-[#D95B16] rounded-full font-mono text-xs uppercase tracking-widest font-bold mb-3">
            <IconCalendar size={14} />
            <span>DIRECT APPOINTMENT SCHEDULING</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight">
            अनलाइन परामर्श
          </h2>
          <span className="block text-xs sm:text-sm font-mono text-[#D95B16] font-bold tracking-widest uppercase mt-1">
            Online & In-Person Consultation Booking
          </span>
          <p className="mt-3 text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
            आफ्नो आवश्यकता अनुसार उपयुक्त सेवा छनोट गरी व्यक्तिगत परामर्श लिनुहोस्।
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#D95B16] font-bold">
            <span>सेवा छनोट</span>
            <span>→</span>
            <span>मिति / समय</span>
            <span>→</span>
            <span>माध्यम</span>
            <span>→</span>
            <span>बुकिङ</span>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-[#FAF7F2] border border-stone-200/90 rounded-2xl p-6 sm:p-10 shadow-sm">
          {isSubmitted ? (
            <div className="p-8 bg-white border border-emerald-300 rounded-2xl text-center max-w-md mx-auto shadow-xs">
              <IconCheckCircle size={48} className="text-emerald-600 mx-auto mb-4" />
              <h3 className="font-serif font-bold text-stone-900 text-xl">
                {isNe ? "परामर्श अनुरोध प्राप्त भयो!" : "Consultation Request Received!"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-light leading-relaxed">
                {isNe
                  ? "धन्यवाद। गुरु नीलहरीको सचिवालयले +44 7838 820518 मार्फत तपाईंलाई शीघ्र समय निश्चित गर्न सम्पर्क गर्नेछ।"
                  : "Thank you. Guru Nilhari's office will reach out to you directly via WhatsApp/Phone to confirm your appointment slot."}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-6 py-3 rounded-xl bg-stone-900 text-white text-xs font-mono font-bold uppercase hover:bg-[#D95B16] transition-colors active:scale-95 shadow-xs"
              >
                {isNe ? "अर्को परामर्श बुक गर्नुहोस्" : "Book Another Slot"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Service Selection */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                  १. परामर्श सेवा छनोट गर्नुहोस् (Select Service) *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-sans focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  required
                >
                  <option value="astrology">वैदिक ज्योतिष शास्त्र (Vedic Astrology)</option>
                  <option value="vastu">वास्तु शास्त्र (Vastu Shastra)</option>
                  <option value="muhurta">शुभ मुहूर्त (Muhurta Consultation)</option>
                  <option value="gemstone">रत्न तथा जेमस्टोन परामर्श (Gemstone Consultation)</option>
                  <option value="colour">रङ्ग थेरापी तथा वेल्नेस (Colour Consultation)</option>
                  <option value="karmakanda">कर्मकाण्ड तथा पूजा सेवा (Karmakanda & Puja)</option>
                  <option value="other">अन्य व्यक्तिगत परामर्श (Other Consultation)</option>
                </select>
              </div>

              {/* Step 2 & 3: Date & Preferred Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                    २. उपयुक्त मिति (Preferred Date) *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-mono focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                    ३. उपयुक्त समय (Preferred Time) *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-sans focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  >
                    <option value="morning">बिहान (Morning: 09:00 - 12:00 GMT)</option>
                    <option value="afternoon">दिउँसो (Afternoon: 12:00 - 16:00 GMT)</option>
                    <option value="evening">साँझ (Evening: 16:00 - 20:00 GMT)</option>
                    <option value="weekend">सप्ताहन्त (Weekend Session)</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Online vs In-person */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                  ४. भेटघाटको माध्यम (Consultation Mode) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${
                    mode === "online" ? "border-[#D95B16] bg-white shadow-xs" : "border-stone-200 bg-stone-50"
                  }`}>
                    <input
                      type="radio"
                      name="consultationMode"
                      checked={mode === "online"}
                      onChange={() => setMode("online")}
                      className="text-[#D95B16] focus:ring-[#D95B16]"
                    />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block font-sans">
                        अनलाइन भिडियो परामर्श (Online Video Consultation)
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        विश्वव्यापी • WhatsApp / Zoom HD Encrypted
                      </span>
                    </div>
                  </label>

                  <label className={`p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${
                    mode === "in-person" ? "border-[#D95B16] bg-white shadow-xs" : "border-stone-200 bg-stone-50"
                  }`}>
                    <input
                      type="radio"
                      name="consultationMode"
                      checked={mode === "in-person"}
                      onChange={() => setMode("in-person")}
                      className="text-[#D95B16] focus:ring-[#D95B16]"
                    />
                    <div>
                      <span className="font-bold text-xs text-stone-900 block font-sans">
                        प्रत्यक्ष भेटघाट (In-Person Consultation)
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        वैदिक सनातन केन्द्र युके (UK Centre)
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 5: Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                    पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="उदा: सुवास न्यौपाने"
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-sans focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                    फोन / ह्वाट्सएप (Phone / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 ... वा +977 ..."
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-mono focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                    इमेल ठेगाना (Email Address)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-sans focus:outline-hidden focus:border-[#D95B16] transition-colors"
                  />
                </div>
              </div>

              {/* Step 6: Notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-800 font-bold mb-2">
                  जन्म विवरण वा मुख्य जिज्ञासा (Birth Details / Specific Query)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isNe
                      ? "जन्म मिति, समय, स्थान वा तपाईंले परामर्श लिन चाहेको मुख्य विषय उल्लेख गर्नुहोस्..."
                      : "Birth date, exact birth time, place of birth, or specific topics for consultation..."
                  }
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-sm font-sans focus:outline-hidden focus:border-[#D95B16] transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#D95B16] hover:bg-[#B8480C] text-white font-mono text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <IconCalendar size={18} className="text-orange-200" />
                <span>{isNe ? "परामर्श बुक गर्नुहोस् (Book Consultation)" : "Book Consultation"}</span>
              </button>
            </form>
          )}

          {/* Legal / Complementary Disclaimer (Section 20 of spec) */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 text-[11px] font-sans text-stone-500 leading-relaxed">
            <p>
              <strong className="text-stone-700 font-mono">Disclaimer:</strong>{" "}
              वैदिक ज्योतिष, वास्तु, रत्न तथा रङ्ग सम्बन्धी सेवाहरू परम्परागत तथा complementary guidance को रूपमा प्रदान गरिन्छन्। यी सेवाहरूले medical, legal वा financial professional advice लाई replace गर्दैनन्।
            </p>
            <p className="mt-1 text-stone-400 font-mono">
              Vedic astrology, Vastu, gemstone and colour-related services are provided as traditional and complementary guidance and are not a substitute for professional medical, legal or financial advice.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

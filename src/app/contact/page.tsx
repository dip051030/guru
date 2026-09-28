"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Phone, Mail, MapPin, Clock, Globe, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import ObservatoryHeader from "@/components/ObservatoryHeader";
import InquiryDrawer from "@/components/InquiryDrawer";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>(undefined);

  // Quick form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formService, setFormService] = useState("astrology");
  const [formMode, setFormMode] = useState("remote");
  const [formNotes, setFormNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setInquiryOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground relative">
      <ObservatoryHeader onOpenInquiry={handleOpenInquiry} />

      {/* Breadcrumb & Subpage Hero Banner */}
      <section className="w-full bg-[#131B2E] text-white border-b border-stone-800/80 pt-10 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C85A17_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "ne" ? "गृहपृष्ठ" : "Home"}</span>
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-amber-400 font-bold">
              {language === "ne" ? "सम्पर्क तथा परामर्श निर्धारण" : "Contact & Consultation"}
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+44 7838 820518</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              {language === "ne"
                ? "परामर्श निर्धारण तथा सम्पर्क केन्द्र"
                : "Schedule Consultation & Contact Centre"}
            </h1>
            <p className="mt-3 text-stone-300 text-sm md:text-base font-light leading-relaxed">
              {language === "ne"
                ? "गुरु निलहरिसँग प्रत्यक्ष व्यक्तिगत भेटघाट (UK Centre) वा उच्च गतिको अनलाइन भिडियो परामर्श लिन तलको फारम भर्नुहोस् वा सिधै ह्वाट्सएपमा सम्पर्क गर्नुहोस्।"
                : "Schedule an in-person session at Vedic Sanatan Kendra UK or an encrypted remote video consultation worldwide with Guru Nilhari."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Direct Contact Details & Interactive Form */}
      <section className="w-full py-16 px-6 lg:px-12 bg-[#FAF7F2] border-b border-stone-200">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Coordinates Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 bg-white border border-stone-200 shadow-xs">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C85A17] font-bold">
                {language === "ne" ? "प्रत्यक्ष सम्पर्क विवरण" : "DIRECT COORDINATES"}
              </span>
              <h2 className="text-2xl font-serif text-stone-900 mt-2 mb-6">
                {language === "ne" ? "वैदिक सनातन केन्द्र युके" : "Vedic Sanatan Kendra UK"}
              </h2>

              <div className="space-y-5 text-sm font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 font-serif">
                      {language === "ne" ? "मुख्य कार्यालय" : "Official Centre"}
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm font-light mt-0.5">
                      Vedic Sanatan Kendra UK<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 font-serif">
                      {language === "ne" ? "फोन तथा ह्वाट्सएप" : "Phone & WhatsApp"}
                    </h4>
                    <a
                      href="https://wa.me/447838820518"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C85A17] hover:underline font-mono text-sm font-bold block mt-0.5"
                    >
                      +44 7838 820518
                    </a>
                    <span className="text-[11px] text-stone-500 font-mono">
                      {language === "ne" ? "(२४/७ सन्देश तथा अपोइन्टमेन्ट)" : "(24/7 direct messaging)"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 font-serif">
                      {language === "ne" ? "आधिकारिक इमेल" : "Official Email"}
                    </h4>
                    <a
                      href="mailto:contact@gurunilhari.com"
                      className="text-[#C85A17] hover:underline font-mono text-sm block mt-0.5"
                    >
                      contact@gurunilhari.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 font-serif">
                      {language === "ne" ? "वेबसाइट" : "Website"}
                    </h4>
                    <a
                      href="https://www.gurunilhari.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-700 hover:text-[#C85A17] font-mono text-sm block mt-0.5"
                    >
                      www.gurunilhari.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#C85A17]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 font-serif">
                      {language === "ne" ? "कार्यालय समय" : "Consultation Hours"}
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm font-mono mt-0.5">
                      08:00 - 20:00 GMT (UK Time)<br />
                      13:45 - 01:45 NPT (Nepal Time)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Button */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <a
                  href="https://wa.me/447838820518"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors font-sans"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>{language === "ne" ? "ह्वाट्सएपमा सिधै सन्देश पठाउनुहोस्" : "Direct WhatsApp Connect"}</span>
                </a>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-6 bg-white border border-stone-200 flex items-center gap-4">
              <ShieldCheck className="w-10 h-10 text-[#C85A17] shrink-0" />
              <div>
                <h4 className="font-bold text-stone-900 font-serif text-sm">
                  {language === "ne" ? "वैदिक मर्यादा र पूर्ण गोपनीयता" : "Confidential & Ethical Consultations"}
                </h4>
                <p className="text-xs text-stone-500 font-light mt-1">
                  {language === "ne"
                    ? "कुनै पनि व्यक्तिगत कुण्डली वा परामर्श तेस्रो पक्षसँग साझा गरिँदैन।"
                    : "Your birth data and personal discussions are never shared with any third party."}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 bg-white border border-stone-200 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C85A17] font-bold">
                {language === "ne" ? "परामर्श फारम" : "BOOKING INTAKE"}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-stone-900 mt-2 mb-3">
                {language === "ne" ? "अपोइन्टमेन्ट अनुरोध गर्नुहोस्" : "Request an Appointment"}
              </h2>
              <p className="text-sm text-stone-600 font-light mb-8">
                {language === "ne"
                  ? "विवरणहरू भर्नुहोस्, हाम्रो कार्यालयबाट केही घण्टाभित्रै समय निश्चित गरिनेछ।"
                  : "Please provide your details below. Our desk will confirm your appointment within hours."}
              </p>

              {submitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-serif font-bold text-stone-900 text-xl">
                    {language === "ne" ? "अनुरोध प्राप्त भयो!" : "Appointment Request Received"}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                    {language === "ne"
                      ? "धन्यवाद। गुरु निलहरिको सचिवालयले +44 7838 820518 मार्फत तपाईंलाई शीघ्र सम्पर्क गर्नेछ।"
                      : "Thank you. Guru Nilhari's office will reach out via WhatsApp/Phone at the earliest to confirm the schedule."}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-stone-900 text-white text-xs font-mono font-bold uppercase tracking-wider hover:bg-stone-800"
                  >
                    {language === "ne" ? "अर्को अनुरोध पठाउनुहोस्" : "Submit Another Request"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                        {language === "ne" ? "पुरा नाम *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder={language === "ne" ? "उदा: सुवास न्यौपाने" : "e.g., Subash Sharma"}
                        className="w-full px-4 py-3 border border-stone-300 focus:outline-hidden focus:border-[#C85A17] text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                        {language === "ne" ? "सम्पर्क फोन / ह्वाट्सएप *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+44 ... वा +977 ..."
                        className="w-full px-4 py-3 border border-stone-300 focus:outline-hidden focus:border-[#C85A17] text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                        {language === "ne" ? "इमेल ठेगाना" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 border border-stone-300 focus:outline-hidden focus:border-[#C85A17] text-sm font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                        {language === "ne" ? "सेवा विधा (Service Pillar) *" : "Consultation Pillar *"}
                      </label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-4 py-3 border border-stone-300 focus:outline-hidden focus:border-[#C85A17] text-sm font-sans bg-white"
                      >
                        <option value="astrology">
                          {language === "ne" ? "१. ज्योतिष तथा कुण्डली (Astrology)" : "1. Astrology & Horoscope"}
                        </option>
                        <option value="gemstone">
                          {language === "ne" ? "२. रत्न पहिचान तथा परामर्श (Gemstone)" : "2. Gemstone Identification"}
                        </option>
                        <option value="vastu">
                          {language === "ne" ? "३. वास्तु शास्त्र: घर र कार्यालय (Vastu)" : "3. Vastu Shastra: Home & Office"}
                        </option>
                        <option value="karmakanda">
                          {language === "ne" ? "४. कर्मकाण्ड: वैदिक पूजा तथा अनुष्ठान (Puja)" : "4. Karmakanda: Vedic Puja"}
                        </option>
                        <option value="marriage">
                          {language === "ne" ? "५. विवाह कुण्डली मिलान तथा शुभ साइत" : "5. Marriage Matchmaking & Muhurta"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                      {language === "ne" ? "भेटघाटको माध्यम *" : "Consultation Mode *"}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className={`p-4 border cursor-pointer flex items-center gap-3 transition-colors ${
                        formMode === "remote" ? "border-[#C85A17] bg-amber-50/50" : "border-stone-200 hover:bg-stone-50"
                      }`}>
                        <input
                          type="radio"
                          name="mode"
                          checked={formMode === "remote"}
                          onChange={() => setFormMode("remote")}
                          className="text-[#C85A17] focus:ring-[#C85A17]"
                        />
                        <div>
                          <div className="font-bold text-xs font-sans text-stone-900">
                            {language === "ne" ? "अनलाइन भिडियो परामर्श (विश्वव्यापी)" : "Online Video Session (Global)"}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono">Zoom / WhatsApp Video HD</div>
                        </div>
                      </label>

                      <label className={`p-4 border cursor-pointer flex items-center gap-3 transition-colors ${
                        formMode === "in-person" ? "border-[#C85A17] bg-amber-50/50" : "border-stone-200 hover:bg-stone-50"
                      }`}>
                        <input
                          type="radio"
                          name="mode"
                          checked={formMode === "in-person"}
                          onChange={() => setFormMode("in-person")}
                          className="text-[#C85A17] focus:ring-[#C85A17]"
                        />
                        <div>
                          <div className="font-bold text-xs font-sans text-stone-900">
                            {language === "ne" ? "प्रत्यक्ष भेटघाट (बेलायत केन्द्र)" : "In-Person Session (UK Centre)"}
                          </div>
                          <div className="text-[11px] text-stone-500 font-mono">Vedic Sanatan Kendra UK</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-bold mb-2">
                      {language === "ne" ? "जन्म विवरण वा परामर्शको मुख्य विषय" : "Birth Details / Query Notes"}
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder={
                        language === "ne"
                          ? "जन्म मिति, समय, स्थान वा तपाईंका मुख्य जिज्ञासाहरू उल्लेख गर्नुहोस्..."
                          : "Birth date, exact time, birth city, or specific questions you wish to address..."
                      }
                      className="w-full px-4 py-3 border border-stone-300 focus:outline-hidden focus:border-[#C85A17] text-sm font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#C85A17] hover:bg-[#A6440C] text-white font-bold text-sm uppercase tracking-wider font-mono shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-orange-200" />
                    <span>{language === "ne" ? "परामर्श समय सुरक्षित गर्नुहोस्" : "Confirm Consultation Request"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialTopic={inquiryTopic}
      />
    </main>
  );
}

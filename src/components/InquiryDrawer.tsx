"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconClose,
  IconSend,
  IconCheckCircle,
  IconCompass,
  IconShield,
  IconVideo,
  IconMapPin,
} from "@/components/icons/CustomIcons";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function InquiryDrawer({
  isOpen,
  onClose,
  initialTopic,
}: InquiryDrawerProps) {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState("kundali");
  const [meetingMode, setMeetingMode] = useState<"in_person" | "online">("online");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [pob, setPob] = useState("");
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const CONSULTATION_TYPES = [
    {
      id: "astrology",
      title: language === "ne" ? "ज्योतिष तथा कुण्डली (Astrology - Jyotish & Horoscope)" : "Astrology (Jyotish & Horoscope)",
      desc: language === "ne" ? "विस्तृत जन्म कुण्डली, विंशोत्तरी दशा, करियर, विवाह र भविष्य फल।" : "Comprehensive natal chart analysis, planetary dashas, career, and matrimonial guidance.",
    },
    {
      id: "gemstone",
      title: language === "ne" ? "रत्न पहिचान (Gemstone Identification - Ratna Consultation)" : "Gemstone Identification (Ratna Consultation)",
      desc: language === "ne" ? "ग्रह अनुकूलताका लागि प्रामाणिक वैज्ञानिक रत्न पहिचान र निष्पक्ष परीक्षण।" : "Certified gemological identification, testing, and astrological suitability analysis.",
    },
    {
      id: "vastu",
      title: language === "ne" ? "वास्तु शास्त्र (Vastu Shastra - Home & Office Harmony)" : "Vastu Shastra (Home & Office Harmony)",
      desc: language === "ne" ? "घर, भवन तथा कार्यालयका लागि पञ्चतत्व सन्तुलन, दिशा शोधन र वास्तु परामर्श।" : "Residential and commercial architectural alignment, energetic balance, and remedial Vastu.",
    },
    {
      id: "karmakanda",
      title: language === "ne" ? "कर्मकाण्ड (Karmakanda - Vedic Rituals & Puja)" : "Karmakanda (Vedic Rituals & Puja)",
      desc: language === "ne" ? "रुद्राभिषेक, ग्रह शान्ति, वास्तु पूजा, सत्यनारायण कथा तथा वैदिक अनुष्ठान।" : "Authentic Vedic rituals, Graha Shanti, Rudrabhishek, and consecrated havans.",
    },
    {
      id: "patro",
      title: language === "ne" ? "नेपाली पात्रो, तिथि तथा पञ्चाङ्ग परामर्श" : "Nepali Patro & Ephemeris Consultation",
      desc: language === "ne" ? "चाडपर्व निर्णय, संस्कार कर्म तथा शुभ मुहूर्त निर्धारण।" : "Festival dates, Vedic rites of passage, and auspicious Muhurta timing.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg(language === "ne" ? "कृपया आफ्नो पूरा नाम र फोन नम्बर प्रविष्ट गर्नुहोस्।" : "Please enter your full name and phone number.");
      return;
    }
    setErrorMsg("");

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#B34A26", "#C5994E", "#12213A"],
      });
    } catch {
      // Ignore confetti error
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setDob("");
    setTob("");
    setPob("");
    setQuestion("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-50 flex items-center justify-end">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-xl h-full bg-white border-l border-[#E5DAC8] p-6 md:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D95B16] font-bold">
                        <IconCompass className="w-4 h-4 text-[#D95B16]" />
                        <span>{language === "ne" ? "वैदिक सनातन केन्द्र युके // परामर्श बुकिङ" : "VEDIC SANATAN KENDRA UK // CONSULTATION"}</span>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          className="p-2 rounded-xl border border-stone-200 hover:border-[#D95B16] text-[#181411] transition-colors"
                          aria-label="Close"
                        >
                          <IconClose className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {submitted ? (
                      <div className="py-14 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl border-2 border-orange-200 bg-orange-50 flex items-center justify-center mb-6">
                          <IconCheckCircle className="w-8 h-8 text-[#D95B16]" />
                        </div>
                        <Dialog.Title className="font-serif text-3xl text-[#181411] font-bold">
                          {language === "ne" ? "परामर्श आवेदन प्राप्त भयो" : "Consultation Request Received"}
                        </Dialog.Title>
                        <Dialog.Description className="mt-4 text-sm text-stone-600 max-w-md font-light leading-relaxed">
                          {language === "ne" ? (
                            <>
                              आदरणीय <strong className="font-semibold text-[#181411]">{fullName}</strong> ज्यू,
                              तपाईंको परामर्श अनुरोध वैदिक सनातन केन्द्र युके (Guru Nilhari) मा दर्ता भएको छ।
                              हाम्रो सचिवालयले तपाईंको सम्पर्क नम्बर <span className="font-mono text-[#D95B16] font-bold">{phone}</span> वा
                              इमेलमा २४ घण्टाभित्र सम्पर्क गरी परामर्शको निश्चित समय र आवश्यक तयारीबारे जानकारी गराउनेछ।
                            </>
                          ) : (
                            <>
                              Dear <strong className="font-semibold text-[#181411]">{fullName}</strong>,
                              your consultation request has been registered at Vedic Sanatan Kendra UK (Guru Nilhari).
                              Our coordinator will contact you at <span className="font-mono text-[#D95B16] font-bold">{phone}</span> within 24 hours to confirm your scheduled appointment time.
                            </>
                          )}
                        </Dialog.Description>

                        <div className="mt-8 p-4 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs text-stone-600 text-left w-full space-y-1.5">
                          <div>{language === "ne" ? "बुकिङ दर्ता नं" : "Booking Reference"}: VSK-{(Math.random() * 9000 + 1000).toFixed(0)}</div>
                          <div>{language === "ne" ? "माध्यम" : "Mode"}: {meetingMode === "online" ? (language === "ne" ? "अनलाइन भिडियो (Zoom/WhatsApp)" : "Online Video (Zoom/WhatsApp)") : (language === "ne" ? "प्रत्यक्ष भेट (सनातन केन्द्र युके)" : "In-Person (Sanatan Kendra UK)")}</div>
                          <div>{language === "ne" ? "गोपनीयता" : "Privacy"}: {language === "ne" ? "१००% व्यक्तिगत र मर्यादित" : "100% Strictly Confidential"}</div>
                        </div>

                        <button
                          onClick={handleReset}
                          className="mt-8 px-8 py-3.5 rounded-xl bg-[#D95B16] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#B8480C] transition-colors font-bold shadow-xs"
                        >
                          {language === "ne" ? "बन्द गरी मुख्य पृष्ठमा फर्कनुहोस्" : "Return to Home Page"}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                        <div>
                          <Dialog.Title className="font-serif text-2xl text-[#181411] font-bold">
                            {language === "ne" ? "गुरु निलहरिसँग परामर्श" : "Consultation with Guru Nilhari"}
                          </Dialog.Title>
                          <Dialog.Description className="mt-1 text-xs text-stone-500 font-light">
                            {language === "ne" ? "वैदिक सनातन केन्द्र युके • प्रत्यक्ष भेटघाट वा विश्वव्यापी अनलाइन भिडियो परामर्श।" : "Vedic Sanatan Kendra UK • Direct UK in-person or encrypted video consultation worldwide."}
                          </Dialog.Description>
                        </div>

                        {/* Meeting Mode Switcher */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-2 font-bold">
                            {language === "ne" ? "परामर्शको माध्यम (CONSULTATION MODE)" : "CONSULTATION MODE"}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setMeetingMode("online")}
                              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                                meetingMode === "online"
                                  ? "border-[#D95B16] bg-orange-50 text-[#D95B16] font-bold"
                                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                              }`}
                            >
                              <IconVideo className="w-4 h-4 text-[#D95B16] shrink-0" />
                              <div className="text-xs font-mono">
                                <div className="font-semibold">{language === "ne" ? "अनलाइन भिडियो" : "Online Video"}</div>
                                <div className="text-[10px] text-stone-500">Zoom / WhatsApp</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setMeetingMode("in_person")}
                              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors ${
                                meetingMode === "in_person"
                                  ? "border-[#D95B16] bg-orange-50 text-[#D95B16] font-bold"
                                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"
                              }`}
                            >
                              <IconMapPin className="w-4 h-4 text-[#D95B16] shrink-0" />
                              <div className="text-xs font-mono">
                                <div className="font-semibold">{language === "ne" ? "प्रत्यक्ष भेट" : "In-Person"}</div>
                                <div className="text-[10px] text-stone-500">{language === "ne" ? "सनातन केन्द्र युके" : "Sanatan Kendra UK"}</div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Consultation Topic Selector */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-2 font-bold">
                            {language === "ne" ? "परामर्शको विषय छनोट गर्नुहोस्" : "SELECT CONSULTATION DOMAIN"}
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {CONSULTATION_TYPES.map((type) => (
                              <label
                                key={type.id}
                                className={`p-3.5 rounded-xl border flex flex-col cursor-pointer transition-colors ${
                                  selectedType === type.id
                                    ? "border-[#D95B16] bg-orange-50/50"
                                    : "border-stone-200 bg-white hover:border-[#D95B16]"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="tier"
                                    value={type.id}
                                    checked={selectedType === type.id}
                                    onChange={() => setSelectedType(type.id)}
                                    className="accent-[#D95B16]"
                                  />
                                  <span className="font-serif text-sm font-bold text-[#181411]">
                                    {type.title}
                                  </span>
                                </div>
                                <span className="text-[11px] text-stone-500 ml-5 mt-0.5 font-light">
                                  {type.desc}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Personal Contact Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "पूरा नाम *" : "Full Name *"}
                            </label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder={language === "ne" ? "तपाईंको पूरा नाम" : "Your full name"}
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "फोन / WhatsApp नम्बर *" : "Phone / WhatsApp *"}
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+44 7XXX XXXXXX / +977 98XXXXXXXX"
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "इमेल ठेगाना" : "Email Address"}
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "जन्म मिति (BS वा AD)" : "Date of Birth (BS or AD)"}
                            </label>
                            <input
                              type="text"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              placeholder={language === "ne" ? "उदा: २०४८-०५-१४ वा 1991-08-30" : "e.g. 1992-05-15"}
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "जन्म समय (Time of Birth)" : "Time of Birth (Exact)"}
                            </label>
                            <input
                              type="text"
                              value={tob}
                              onChange={(e) => setTob(e.target.value)}
                              placeholder={language === "ne" ? "उदा: बिहान ०६:४५ वा 18:30" : "e.g. 06:45 AM or 18:30"}
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                              {language === "ne" ? "जन्म स्थान (जिल्ला वा देश)" : "Place of Birth (City/Country)"}
                            </label>
                            <input
                              type="text"
                              value={pob}
                              onChange={(e) => setPob(e.target.value)}
                              placeholder={language === "ne" ? "उदा: काठमाडौँ वा पोखरा" : "e.g. Kathmandu or Sydney"}
                              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-600 mb-1.5 font-bold">
                            {language === "ne" ? "मुख्य जिज्ञासा वा समस्या (विस्तृत विवरण)" : "Key Inquiries or Guidance Needed"}
                          </label>
                          <textarea
                            rows={3}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder={language === "ne" ? "कुण्डली, विवाह, व्यापार, अध्ययन वा स्वास्थ्य सम्बन्धी मुख्य प्रश्नहरू यहाँ लेख्नुहोस्..." : "Please describe your primary questions regarding career, marriage, business, or life..."}
                            className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-[#FAF7F2] text-[#181411] font-mono text-xs focus:outline-none focus:border-[#D95B16] resize-none"
                          />
                        </div>

                        {errorMsg && (
                          <div className="text-xs font-mono text-[#D95B16] bg-orange-50 p-2.5 border border-[#D95B16]/30 rounded-xl">
                            {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl bg-[#D95B16] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#B8480C] transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
                        >
                          <IconSend className="w-3.5 h-3.5" />
                          <span>{language === "ne" ? "परामर्श अनुरोध पठाउनुहोस्" : "Submit Consultation Request"}</span>
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Security & Confidentiality Footer */}
                  <div className="pt-6 border-t border-stone-200 mt-8 flex items-center gap-2 text-[11px] font-mono text-stone-500">
                    <IconShield className="w-3.5 h-3.5 text-[#D95B16] shrink-0" />
                    <span>
                      {language === "ne"
                        ? "तपाईंको सम्पूर्ण विवरण वैदिक मर्यादा र आचारसंहिता अनुसार पूर्ण रूपमा गोप्य राखिनेछ।"
                        : "Your personal details and birth chart are protected under strict spiritual and ethical discretion."}
                    </span>
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

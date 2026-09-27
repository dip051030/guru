"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Compass, Shield, Calendar, Phone, Video, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

const CONSULTATION_TYPES = [
  {
    id: "kundali",
    title: "विस्तृत जन्म कुण्डली तथा विंशोत्तरी दशा",
    desc: "करियर, स्वास्थ्य, आर्थिक योग, अनुकूल समय र सात्विक उपाय।",
  },
  {
    id: "marriage",
    title: "विवाह कुण्डली मिलान तथा शुभ लग्न साइत",
    desc: "अष्टकूट गुण मिलान, नाडी/मङ्गल विचार र पाणिग्रहण साइत।",
  },
  {
    id: "business",
    title: "नयाँ व्यवसाय, लगानी तथा सम्झौता साइत",
    desc: "उद्योग शिलान्यास, कम्पनी दर्ता र वित्तीय वृद्धिको शुभ मुहूर्त।",
  },
  {
    id: "vastu",
    title: "गृह प्रवेश, जग्गा खरिद तथा वास्तु परामर्श",
    desc: "भूमि परीक्षण, पञ्चतत्व सन्तुलन र वास्तु शान्ति साइत।",
  },
  {
    id: "patro",
    title: "नेपाली पात्रो, तिथि तथा पञ्चाङ्ग परामर्श",
    desc: "चाडपर्व निर्णय, संस्कार कर्म तथा क्यालेन्डर इन्जिन सहयोग।",
  },
];

export default function InquiryDrawer({
  isOpen,
  onClose,
  initialTopic,
}: InquiryDrawerProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg("कृपया तपाईंको पूरा नाम र फोन/ह्वाट्सएप नम्बर अनिवार्य भर्नुहोस्।");
      return;
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#A8624F", "#C9A66B", "#3A342E"],
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    setErrorMsg("");
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
                  className="relative w-full max-w-xl h-full bg-surface border-l border-border p-6 md:p-10 flex flex-col justify-between overflow-y-auto shadow-hard"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-border">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
                        <Compass className="w-4 h-4 text-secondary" />
                        <span>नील हरि वैदिक ज्योतिष केन्द्र // परामर्श बुकिङ</span>
                      </div>

                      <Dialog.Close asChild>
                        <button
                          className="p-2 border border-border hover:border-primary text-foreground transition-colors"
                          aria-label="बन्द गर्नुहोस्"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {submitted ? (
                      <div className="py-14 flex flex-col items-center text-center">
                        <div className="w-16 h-16 border border-secondary bg-surface-elevated flex items-center justify-center mb-6">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <Dialog.Title className="font-serif text-3xl text-textHeading font-semibold">
                          परामर्श आवेदन प्राप्त भयो
                        </Dialog.Title>
                        <Dialog.Description className="mt-4 text-sm text-textBody max-w-md font-light leading-relaxed">
                          आदरणीय <strong className="font-semibold">{fullName}</strong> ज्यू,
                          तपाईंको परामर्श अनुरोध नील हरि वैदिक ज्योतिष केन्द्रमा दर्ता भएको छ।
                          हाम्रो सचिवालयले तपाईंको सम्पर्क नम्बर <span className="font-mono text-primary font-bold">{phone}</span> वा
                          इमेलमा २४ घण्टाभित्र सम्पर्क गरी परामर्शको निश्चित समय र आवश्यक तयारीबारे जानकारी गराउनेछ।
                        </Dialog.Description>

                        <div className="mt-8 p-4 border border-border bg-surface-elevated font-mono text-xs text-textMuted text-left w-full space-y-1.5">
                          <div>बुकिङ दर्ता नं: NHK-{(Math.random() * 9000 + 1000).toFixed(0)}</div>
                          <div>माध्यम: {meetingMode === "online" ? "अनलाइन भिडियो (Zoom/WhatsApp)" : "प्रत्यक्ष भेट (बालुवाटार, काठमाडौँ)"}</div>
                          <div>गोपनीयता: १००% व्यक्तिगत र मर्यादित</div>
                        </div>

                        <button
                          onClick={handleReset}
                          className="mt-8 px-8 py-3 bg-primary text-textInverted text-xs font-mono uppercase tracking-widest hover:bg-primary-dark transition-colors"
                        >
                          बन्द गरी मुख्य पृष्ठमा फर्कनुहोस्
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                        <div>
                          <Dialog.Title className="font-serif text-2xl text-textHeading font-normal">
                            गुरु नील हरिसँग परामर्श
                          </Dialog.Title>
                          <Dialog.Description className="mt-1 text-xs text-textMuted font-light">
                            कुण्डली तथा जन्म विवरणका आधारमा प्रत्यक्ष वा अनलाइन ज्योतिषीय परामर्श।
                          </Dialog.Description>
                        </div>

                        {/* Meeting Mode Switcher */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
                            परामर्शको माध्यम (CONSULTATION MODE)
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setMeetingMode("online")}
                              className={`p-3 border text-left flex items-center gap-2.5 transition-colors ${
                                meetingMode === "online"
                                  ? "border-primary bg-surface-elevated text-primary font-medium"
                                  : "border-border bg-surface text-textBody"
                              }`}
                            >
                              <Video className="w-4 h-4 text-secondary shrink-0" />
                              <div className="text-xs font-mono">
                                <div className="font-semibold">अनलाइन भिडियो</div>
                                <div className="text-[10px] text-textMuted">Zoom / WhatsApp</div>
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setMeetingMode("in_person")}
                              className={`p-3 border text-left flex items-center gap-2.5 transition-colors ${
                                meetingMode === "in_person"
                                  ? "border-primary bg-surface-elevated text-primary font-medium"
                                  : "border-border bg-surface text-textBody"
                              }`}
                            >
                              <MapPin className="w-4 h-4 text-secondary shrink-0" />
                              <div className="text-xs font-mono">
                                <div className="font-semibold">प्रत्यक्ष भेट</div>
                                <div className="text-[10px] text-textMuted">बालुवाटार, काठमाडौँ</div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Consultation Topic Selector */}
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-2">
                            परामर्शको विषय छनोट गर्नुहोस्
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {CONSULTATION_TYPES.map((type) => (
                              <label
                                key={type.id}
                                className={`p-3 border flex flex-col cursor-pointer transition-colors ${
                                  selectedType === type.id
                                    ? "border-primary bg-surface-elevated"
                                    : "border-border bg-surface hover:border-secondary/50"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="tier"
                                    value={type.id}
                                    checked={selectedType === type.id}
                                    onChange={() => setSelectedType(type.id)}
                                    className="accent-primary"
                                  />
                                  <span className="font-serif text-sm font-semibold text-foreground">
                                    {type.title}
                                  </span>
                                </div>
                                <span className="text-[11px] text-textMuted ml-5 mt-0.5 font-light">
                                  {type.desc}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Personal Contact Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              पूरा नाम *
                            </label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="तपाईंको पूरा नाम"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              फोन / WhatsApp नम्बर *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+977 98XXXXXXXX"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              इमेल ठेगाना
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="your@email.com"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              जन्म मिति (BS वा AD)
                            </label>
                            <input
                              type="text"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              placeholder="उदा: २०४८-०५-१४ वा 1991-08-30"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              जन्म समय (Time of Birth)
                            </label>
                            <input
                              type="text"
                              value={tob}
                              onChange={(e) => setTob(e.target.value)}
                              placeholder="उदा: बिहान ०६:४५ वा 18:30"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                              जन्म स्थान (जिल्ला वा देश)
                            </label>
                            <input
                              type="text"
                              value={pob}
                              onChange={(e) => setPob(e.target.value)}
                              placeholder="उदा: काठमाडौँ वा पोखरा"
                              className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-widest text-textMuted mb-1.5">
                            मुख्य जिज्ञासा वा समस्या (विस्तृत विवरण)
                          </label>
                          <textarea
                            rows={3}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="कुण्डली, विवाह, व्यापार, अध्ययन वा स्वास्थ्य सम्बन्धी मुख्य प्रश्नहरू यहाँ लेख्नुहोस्..."
                            className="w-full px-3 py-2.5 border border-border bg-background text-foreground font-mono text-xs focus:outline-none focus:border-primary resize-none"
                          />
                        </div>

                        {errorMsg && (
                          <div className="text-xs font-mono text-primary bg-primary/10 p-2.5 border border-primary/30">
                            {errorMsg}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-4 bg-primary text-textInverted font-mono text-xs uppercase tracking-widest hover:bg-primary-dark transition-all duration-200 flex items-center justify-center gap-2 shadow-soft"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>परामर्श अनुरोध पठाउनुहोस् (Book Appointment)</span>
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Security & Confidentiality Footer */}
                  <div className="pt-6 border-t border-border mt-8 flex items-center gap-2 text-[11px] font-mono text-textMuted">
                    <Shield className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>तपाईंको सम्पूर्ण विवरण वैदिक मर्यादा र आचारसंहिता अनुसार पूर्ण रूपमा गोप्य राखिनेछ।</span>
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


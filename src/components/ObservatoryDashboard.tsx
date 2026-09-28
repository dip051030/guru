"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import {
  Compass,
  Orbit,
  Sparkles,
  ArrowUpRight,
  RotateCw,
  Radio,
} from "lucide-react";

// Institutional accreditations & calculation standards
const KENDRA_STANDARDS = [
  {
    name: "पञ्चाङ्ग निर्णायक विकास समिति",
    category: "शास्त्रीय निर्णय तथा पर्व तालमेल",
    desc: "Nepal Panchanga Board Accordance",
  },
  {
    name: "सूर्य सिद्धान्त दृक-गणित",
    category: "चित्रापक्षीय अयनांश (Lahiri)",
    desc: "Surya Siddhanta Astronomical Precision",
  },
  {
    name: "वाराणसेय गुरुकुल परम्परा",
    category: "पाराशरी तथा जैमिनी सूत्र",
    desc: "Varanasi Gurukul Lineage",
  },
  {
    name: "नेपाली पात्रो इन्जिन सहकार्य",
    category: "१९७०–२१५० वि.सं. गणना",
    desc: "Nepali Patra Engine Integration",
  },
  {
    name: "वास्तु तथा संस्कार शोधन",
    category: "पञ्चतत्व सन्तुलन एवं साइत",
    desc: "Vastu & Samskara Purification",
  },
  {
    name: "२८+ वर्षको जनविश्वास",
    category: "काठमाडौँ, नेपाल",
    desc: "28+ Years Continuous Trust",
  },
];

export default function ObservatoryDashboard() {
  const [activeTab, setActiveTab] = useState<"choghadiya" | "transit" | "patra">("choghadiya");
  const [animatingInstrument, setAnimatingInstrument] = useState(false);
  const astrolabeRef = useRef<SVGSVGElement | null>(null);

  // anime.js celestial instrument rotation and stroke animation
  const triggerAstrolabeAnimation = () => {
    if (!astrolabeRef.current) return;
    setAnimatingInstrument(true);

    try {
      const outerRing = astrolabeRef.current.querySelector(".astro-ring-outer");
      const innerRing = astrolabeRef.current.querySelector(".astro-ring-inner");
      const ticks = astrolabeRef.current.querySelectorAll(".astro-dial-ticks line");

      if (outerRing) {
        animate(outerRing, {
          rotate: [0, 360],
          duration: 3000,
          ease: "outQuad",
        });
      }

      if (innerRing) {
        animate(innerRing, {
          rotate: [0, -360],
          duration: 2600,
          ease: "outQuad",
        });
      }

      if (ticks && ticks.length > 0) {
        animate(ticks, {
          opacity: [0.2, 1, 0.5],
          delay: stagger(25),
          duration: 1200,
          ease: "inOutSine",
        });
      }
    } catch {
      // Fallback safe
    }

    setTimeout(() => {
      setAnimatingInstrument(false);
    }, 3000);
  };

  useEffect(() => {
    triggerAstrolabeAnimation();
  }, []);

  return (
    <section id="panchanga" className="w-full py-16 md:py-24 border-b border-border bg-surface-elevated/60 relative overflow-hidden scroll-mt-20">
      <div id="dashboard" className="absolute -top-20 left-0" />
      {/* Backlit.ui ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[400px] backlit-glow-gold pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Cockpit Status Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 border border-secondary/40 bg-surface text-xs font-mono tracking-widest text-primary uppercase mb-3">
              <Radio className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>काठमाडौँ मानक वेधशाला // REAL-TIME PANCHANGA & GRAHA GOCHAR</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-textHeading font-normal tracking-tight">
              खगोलीय पञ्चाङ्ग तथा ग्रह-गोचर
            </h2>
            <p className="mt-3 text-textBody text-sm md:text-base max-w-2xl font-light">
              काठमाडौँको देशान्तर र अक्षांश (27°43′N, 85°19′E) मा आधारित वास्तविक समयको
              पञ्चाङ्ग, चौघडिया साइत र नवग्रह गोचर अनुगमन।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerAstrolabeAnimation}
              disabled={animatingInstrument}
              className="px-4 py-2.5 border border-border bg-surface hover:border-secondary text-xs font-mono uppercase tracking-wider text-foreground transition-all flex items-center gap-2 shadow-soft"
            >
              <RotateCw className={`w-3.5 h-3.5 text-secondary ${animatingInstrument ? "animate-spin" : ""}`} />
              <span>खगोलीय यन्त्र घुमाउनुहोस् (Rotate Astrolabe)</span>
            </button>
          </div>
        </div>

        {/* Backlit KPI Cards Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Today's Tithi */}
          <div className="backlit-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-textMuted uppercase pb-3 border-b border-border">
                <span>आजको तिथि (TITHI)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl md:text-3xl text-foreground font-semibold">
                  शुक्ल त्रयोदशी
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-textMuted flex items-center justify-between">
              <span>पक्ष: शुक्ल (SHUKLA)</span>
              <span className="text-emerald-700 font-medium">शुभ फलदायी</span>
            </div>
          </div>

          {/* Card 2: Nakshatra */}
          <div className="backlit-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-textMuted uppercase pb-3 border-b border-border">
                <span>नक्षत्र र चरण (NAKSHATRA)</span>
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl md:text-3xl text-primary font-semibold">
                  उत्तराफाल्गुनी
                </span>
                <span className="font-mono text-xs text-textMuted">(चरण ४)</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-textMuted flex items-center justify-between">
              <span>स्वामी: सूर्य (SURYA)</span>
              <span className="text-primary font-semibold">ध्रुव / स्थिर संज्ञक</span>
            </div>
          </div>

          {/* Card 3: Abhijit Muhurta */}
          <div className="backlit-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-textMuted uppercase pb-3 border-b border-border">
                <span>अभिजित मुहूर्त (ABHIJIT)</span>
                <Orbit className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl md:text-3xl text-foreground font-semibold">
                  ११:४२ – १२:३०
                </span>
                <span className="font-mono text-xs text-secondary font-medium">दिउँसो</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-textMuted flex items-center justify-between">
              <span>सर्वकार्य सिद्धि</span>
              <span className="text-emerald-700 font-semibold">अति शुभ समय</span>
            </div>
          </div>

          {/* Card 4: Rahu Kaal Window */}
          <div className="backlit-panel p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-textMuted uppercase pb-3 border-b border-border">
                <span>राहु काल (RAHU KAAL)</span>
                <Compass className="w-3.5 h-3.5 text-secondary" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-2xl md:text-3xl text-primary font-semibold">
                  १६:२५ – १७:५५
                </span>
                <span className="font-mono text-xs text-textMuted">साँझ</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-textMuted flex items-center justify-between">
              <span>शुभ कार्य निषेध</span>
              <span className="text-primary font-medium">बहिष्कार समय</span>
            </div>
          </div>
        </div>

        {/* Central Cockpit: Anime.js Interactive Instrument + Live Telemetry Feed */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Anime.js Animated Astrolabe Instrument (5 cols) */}
          <div className="lg:col-span-5 border border-border bg-surface p-6 md:p-8 flex flex-col justify-between shadow-soft relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-border text-xs font-mono">
              <span className="text-secondary font-medium tracking-wider flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-primary" />
                खगोलीय यन्त्र चक्र (CELESTIAL ASTROLABE)
              </span>
              <span className="text-textCaption uppercase">काठमाडौँ</span>
            </div>

            {/* SVG Astrolabe Graphic animated by Anime.js */}
            <div className="flex flex-col items-center justify-center py-6">
              <svg
                ref={astrolabeRef}
                viewBox="0 0 320 320"
                className="w-full max-w-[280px] aspect-square"
              >
                {/* Outer Ring */}
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  fill="none"
                  stroke="#E8DFD2"
                  strokeWidth="2"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="132"
                  fill="none"
                  stroke="#C9A66B"
                  strokeWidth="1.5"
                  className="astro-ring-outer"
                  style={{ transformOrigin: "160px 160px" }}
                />

                {/* Dial Ticks */}
                <g className="astro-dial-ticks" stroke="#3A342E" strokeWidth="1">
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 360) / 24;
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 160 + 132 * Math.cos(rad);
                    const y1 = 160 + 132 * Math.sin(rad);
                    const x2 = 160 + 124 * Math.cos(rad);
                    const y2 = 160 + 124 * Math.sin(rad);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                  })}
                </g>

                {/* Middle Ecliptic Wheel */}
                <circle
                  cx="160"
                  cy="160"
                  r="100"
                  fill="none"
                  stroke="#A8624F"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="astro-ring-inner"
                  style={{ transformOrigin: "160px 160px" }}
                />

                {/* Inner Crosshairs */}
                <line x1="160" y1="40" x2="160" y2="280" stroke="#E8DFD2" strokeWidth="1" />
                <line x1="40" y1="160" x2="280" y2="160" stroke="#E8DFD2" strokeWidth="1" />

                {/* Vedic Diamond Inscription */}
                <polygon
                  points="160,80 240,160 160,240 80,160"
                  fill="none"
                  stroke="#C9A66B"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Center Pivot Point */}
                <circle cx="160" cy="160" r="5" fill="#A8624F" />
                <circle cx="160" cy="160" r="12" fill="none" stroke="#A8624F" strokeWidth="1" />
              </svg>

              <div className="mt-2 text-center font-mono text-[11px] text-textMuted">
                Topocentric Altitude & Azimuth Coordinate Matrix
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-textMuted">
              <span>LATITUDE: 27° 43&apos; N</span>
              <span>LONGITUDE: 85° 19&apos; E</span>
            </div>
          </div>

          {/* Right Column: Motion.dev Interactive Telemetry Tabs (7 cols) */}
          <div className="lg:col-span-7 border border-border bg-surface p-6 md:p-8 flex flex-col justify-between shadow-soft">
            <div>
              {/* Tab Selector */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-foreground">
                  <span className="w-2 h-2 bg-secondary" />
                  <span>दैनिक पञ्चाङ्ग तथा गोचर विवरण</span>
                </div>

                <div className="flex items-center border border-border text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("choghadiya")}
                    className={`px-3 py-1.5 transition-colors ${
                      activeTab === "choghadiya"
                        ? "bg-primary text-textInverted font-medium"
                        : "bg-surface text-textMuted hover:text-foreground"
                    }`}
                  >
                    दैनिक चौघडिया
                  </button>
                  <button
                    onClick={() => setActiveTab("transit")}
                    className={`px-3 py-1.5 transition-colors ${
                      activeTab === "transit"
                        ? "bg-primary text-textInverted font-medium"
                        : "bg-surface text-textMuted hover:text-foreground"
                    }`}
                  >
                    नवग्रह गोचर
                  </button>
                  <button
                    onClick={() => setActiveTab("patra")}
                    className={`px-3 py-1.5 transition-colors ${
                      activeTab === "patra"
                        ? "bg-primary text-textInverted font-medium"
                        : "bg-surface text-textMuted hover:text-foreground"
                    }`}
                  >
                    पात्रो प्रविधि
                  </button>
                </div>
              </div>

              {/* Tab Content 1: Choghadiya */}
              {activeTab === "choghadiya" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 flex flex-col gap-2.5 text-xs font-mono"
                >
                  <div className="p-3 border border-border bg-surface-elevated flex items-center justify-between">
                    <div>
                      <span className="text-secondary font-bold">अमृत (Amrit)</span>
                      <span className="text-textMuted text-[11px] ml-2">०६:०२ – ०७:३२</span>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px]">अति शुभ (Highly Auspicious)</span>
                  </div>

                  <div className="p-3 border border-border bg-surface-elevated flex items-center justify-between">
                    <div>
                      <span className="text-foreground font-semibold">शुभ (Shubh)</span>
                      <span className="text-textMuted text-[11px] ml-2">०९:०२ – १०:३२</span>
                    </div>
                    <span className="text-emerald-700 font-medium text-[11px]">शुभ फलदायी (Auspicious)</span>
                  </div>

                  <div className="p-3 border border-border bg-surface-elevated flex items-center justify-between">
                    <div>
                      <span className="text-foreground font-semibold">लाभ (Labh)</span>
                      <span className="text-textMuted text-[11px] ml-2">१५:०२ – १६:३२</span>
                    </div>
                    <span className="text-secondary font-medium text-[11px]">व्यापार एवं उन्नति (Prosperity)</span>
                  </div>

                  <div className="p-3 border border-border bg-surface-elevated flex items-center justify-between">
                    <div>
                      <span className="text-primary font-semibold">काल / उद्वेग (Kaal / Udveg)</span>
                      <span className="text-textMuted text-[11px] ml-2">१२:०२ – १३:३२</span>
                    </div>
                    <span className="text-primary font-medium text-[11px]">वर्जित / अशान्ति (Avoid Activity)</span>
                  </div>

                  <div className="p-3 border border-border bg-surface-elevated flex items-center justify-between">
                    <div>
                      <span className="text-secondary font-bold">अमृत (Amrit - Evening)</span>
                      <span className="text-textMuted text-[11px] ml-2">१६:३२ – १८:०२</span>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px]">अति शुभ साइत (Evening Window)</span>
                  </div>
                </motion.div>
              )}

              {/* Tab Content 2: Planetary Ingress (Graha Gochar) */}
              {activeTab === "transit" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-2.5 text-xs font-mono"
                >
                  <div className="flex items-center justify-between p-3 border border-border bg-surface-elevated">
                    <span className="font-semibold text-foreground">सूर्य (Surya)</span>
                    <span className="text-textBody">मीन राशि (Pisces) • वसन्त ऋतु</span>
                    <span className="text-secondary font-medium">उत्तरायण</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border bg-surface-elevated">
                    <span className="font-semibold text-foreground">चन्द्रमा (Chandra)</span>
                    <span className="text-textBody">कन्या राशि (Virgo) • नक्षत्र उत्तराफाल्गुनी</span>
                    <span className="text-emerald-700 font-medium">शुभ चन्द्रबल</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border bg-surface-elevated">
                    <span className="font-semibold text-foreground">बृहस्पति (Guru)</span>
                    <span className="text-textBody">वृषभ राशि (Taurus) • मार्गी स्थिति</span>
                    <span className="text-emerald-700 font-medium">ज्ञान तथा धन कारक</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border bg-surface-elevated">
                    <span className="font-semibold text-foreground">शनि (Shani)</span>
                    <span className="text-textBody">कुम्भ राशि (Aquarius) • मूलत्रिकोण</span>
                    <span className="text-primary font-medium">कर्मफल प्रदाता</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border bg-surface-elevated">
                    <span className="font-semibold text-foreground">राहु र केतु</span>
                    <span className="text-textBody">मीन-कन्या अक्ष (Pisces-Virgo Axis)</span>
                    <span className="text-textCaption">अप्रत्यक्ष छाया ग्रह</span>
                  </div>
                </motion.div>
              )}

              {/* Tab Content 3: Patro Engine */}
              {activeTab === "patra" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 space-y-3 text-xs font-mono"
                >
                  <div className="p-3.5 border border-secondary/40 bg-surface-elevated">
                    <div className="flex justify-between items-center text-xs font-bold text-foreground">
                      <span>नेपाली पात्रो इन्जिन (Pradip Koirala Patra Framework)</span>
                      <span className="text-emerald-700 font-semibold">शुद्ध गणना</span>
                    </div>
                    <p className="mt-1.5 text-textMuted text-[11px] leading-relaxed">
                      विक्रम संवत् (BS) र ईस्वी सन् (AD) बीचको सटीक दुईतर्फी रूपान्तरण। १९७० देखि २१५० वि.सं. सम्मका
                      सम्पूर्ण महिना, गते, बार, संक्रान्ति र चाडपर्वहरू शास्त्रसम्मत रूपमा प्रमाणीकरण।
                    </p>
                  </div>
                  <div className="p-3.5 border border-border bg-surface-elevated">
                    <div className="flex justify-between items-center text-xs font-bold text-foreground">
                      <span>चित्रापक्षीय (लाहिडी) अयनांश</span>
                      <span className="text-secondary font-mono">२४° ११′ १८″</span>
                    </div>
                    <p className="mt-1.5 text-textMuted text-[11px] leading-relaxed">
                      नेपाल पञ्चाङ्ग निर्णायक विकास समितिद्वारा अनुमोदित वैदिक दृक-गणित सिद्धान्त।
                      काठमाडौँ मानक समय (UTC+5:45) अनुसार सूर्योदय र सूर्यास्त गणना।
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-textMuted">
              <span>स्थान: काठमाडौँ (२७°४३′ उत्तर, ८५°१९′ पूर्व)</span>
              <span className="text-secondary font-semibold">वैदिक सनातन केन्द्र युके (Guru Nilhari)</span>
            </div>
          </div>
        </div>

        {/* Kendra Accreditations & Methodological Standards Strip */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-textMuted">
              केन्द्रका शास्त्रीय मानक तथा सम्बद्धता // KENDRA METHODOLOGICAL STANDARDS
            </span>
            <span className="font-mono text-[11px] text-secondary font-medium">
              सिद्धान्त-संहिता-होरा त्रिस्कन्ध सम्मत
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {KENDRA_STANDARDS.map((std) => (
              <div
                key={std.name}
                className="p-4 border border-border bg-surface hover:border-secondary transition-all duration-200 flex flex-col justify-between gap-3 shadow-soft group"
              >
                <div className="flex items-center justify-between text-secondary">
                  <span className="font-serif text-sm font-bold">ॐ</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-textMuted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="font-serif text-sm font-semibold text-textHeading group-hover:text-primary transition-colors leading-snug">
                    {std.name}
                  </div>
                  <div className="font-mono text-[10px] text-primary font-medium mt-1">
                    {std.category}
                  </div>
                  <div className="font-mono text-[9px] text-textMuted mt-0.5">
                    {std.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

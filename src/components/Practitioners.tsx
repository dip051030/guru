"use client";

import React from "react";
import { User, Mail, Award, BookOpen, Terminal, Sparkles, Shield, Compass } from "lucide-react";
import { motion } from "framer-motion";

interface PractitionersProps {
  onOpenInquiry: (subject: string) => void;
}

export default function Practitioners({ onOpenInquiry }: PractitionersProps) {
  return (
    <section id="about-guru" className="w-full py-16 md:py-24 border-b border-border bg-background">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-primary uppercase mb-3">
              <User className="w-3.5 h-3.5" />
              <span>THE SCHOLAR & MASTER ASTROLOGER</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-textHeading font-normal tracking-tight">
              Guru Neel Hari
            </h2>
            <p className="mt-3 text-textBody text-sm md:text-base max-w-2xl font-light">
              Master Vedic Astrologer, ephemeris mathematician, and spiritual
              counselor rooted in the Himalayan Jyotish lineage.
            </p>
          </div>

          <div className="text-xs font-mono text-textMuted uppercase tracking-wider">
            ATELIER FOUNDER // KATHMANDU
          </div>
        </div>

        {/* Profile Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 border border-border bg-surface p-8 md:p-10 flex flex-col justify-between shadow-soft"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
                <div>
                  <h3 className="font-serif text-3xl text-textHeading font-semibold">
                    Guru Neel Hari
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-secondary mt-1">
                    VEDIC JYOTISH MASTER & ASTRONOMICAL RESEARCHER
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenInquiry("Private Consultation with Guru Neel Hari")}
                    className="px-5 py-2.5 border border-primary bg-primary text-textInverted text-xs font-mono tracking-wider uppercase hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-soft"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request Private Reading</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm text-textBody font-light leading-relaxed">
                <p>
                  <strong className="font-semibold text-foreground">Guru Neel Hari</strong> is a
                  renowned authority in classical Vedic Jyotish and computational astrometry.
                  Raised in the venerable scholarly traditions of the Kathmandu Valley, he has
                  dedicated decades to the study and preservation of the ancient Siddhantic texts,
                  including the *Brihat Parashara Hora Shastra*, *Jaimini Upadesha Sutras*, and
                  *Surya Siddhanta*.
                </p>
                <p>
                  Recognizing that astrology loses its sanctity when decoupled from empirical
                  astronomical reality, Guru Neel Hari pioneered the synthesis of classical
                  sidereal mathematics with modern high-precision astronomical computation. He
                  oversaw the algorithmic architecture of the **Nepali Patra Engine**, delivering
                  unimpeachable Bikram Sambat date conversion and Panchanga calculations for
                  institutions worldwide.
                </p>
                <p>
                  Today, Guru Neel Hari serves as a trusted advisor to founders, executives, and
                  discerning seekers across the globe. His consultations offer an unvarnished,
                  deeply compassionate examination of karma, dharma, and temporal opportunity—free
                  from superstition, automated clichés, or superficial generalities.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted block">
                    PRIMARY DISCIPLINE
                  </span>
                  <span className="text-xs font-mono text-foreground font-medium mt-1 block">
                    Parashara & Jaimini Sidereal
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted block">
                    ASTRONOMICAL MATRIX
                  </span>
                  <span className="text-xs font-mono text-foreground font-medium mt-1 block">
                    Swiss Ephemeris & Nepali Patra
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted block">
                    SANCTUARY
                  </span>
                  <span className="text-xs font-mono text-foreground font-medium mt-1 block">
                    Kathmandu Valley (UTC+5:45)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-textMuted">
              <span>ETHICS: ABSOLUTE CONFIDENTIALITY & SCIENTIFIC RIGOR</span>
              <span className="text-primary font-semibold">SCHEDULE DIRECTLY BELOW</span>
            </div>
          </motion.div>

          {/* Sidebar Pillars */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-border bg-surface p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-secondary uppercase font-semibold">
                <Compass className="w-4 h-4 text-primary" />
                <span>CONSULTATION ETHOS</span>
              </div>
              <p className="text-xs text-textMuted leading-relaxed">
                &ldquo;Astrology is not fatalism; it is the sacred cartography of
                time. When you know the celestial currents, you can navigate your
                karmic path with wisdom, dignity, and grace.&rdquo;
              </p>
              <div className="pt-2 border-t border-border font-serif text-xs text-textHeading italic">
                — Guru Neel Hari
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border bg-surface p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-semibold">
                <Award className="w-4 h-4 text-secondary" />
                <span>AREAS OF INQUIRY</span>
              </div>
              <ul className="text-xs font-mono text-textBody space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span>Executive & Enterprise Muhurta Timing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span>Comprehensive Birth Kundali & Navamsha (D9)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span>Vimshottari Dasha & Planetary Transits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span>Nepali Patra Calendar & Panchanga Advisory</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

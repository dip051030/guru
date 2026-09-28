"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 astro-grid opacity-25 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-md"
          >
            <div className="w-14 h-14 border border-secondary flex items-center justify-center mb-6 bg-surface">
              <span className="font-serif text-2xl text-primary font-bold">ॐ</span>
            </div>

            <span className="text-[11px] font-mono tracking-widest uppercase text-secondary mb-2">
              VEDIC SANATAN KENDRA UK
            </span>

            <h1 className="font-serif text-3xl md:text-4xl text-foreground font-normal tracking-tight">
              Guru Nilhari
            </h1>

            <p className="font-serif text-sm text-textMuted mt-2 italic">
              शुभम् भवतु • वैदिक सनातन केन्द्र युके
            </p>
          </motion.div>

          <button
            onClick={() => {
              setVisible(false);
              if (onComplete) onComplete();
            }}
            className="absolute bottom-10 text-xs font-mono tracking-widest text-textMuted hover:text-primary transition-colors underline underline-offset-4"
          >
            [ प्रवेश गर्नुहोस् / Enter ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

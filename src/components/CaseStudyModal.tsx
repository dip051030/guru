"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Code2, Database, Shield } from "lucide-react";

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  tag: string;
  subtitle: string;
  client: string;
  year: string;
  summary: string;
  challenge: string;
  engineeringSolution: string;
  architectureDetails: string[];
  deliverables: string[];
  metrics: { label: string; value: string }[];
  quote: string;
}

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onOpenInquiry: (topic: string) => void;
}

export default function CaseStudyModal({
  study,
  onClose,
  onOpenInquiry,
}: CaseStudyModalProps) {
  return (
    <Dialog.Root open={!!study} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {study && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-secondary/40 shadow-hard p-6 md:p-10 flex flex-col gap-8 my-auto"
                >
                  {/* Close Button */}
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-6 right-6 p-2 border border-border bg-surface hover:bg-surface-elevated text-foreground transition-colors"
                      aria-label="Close Case Study"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>

                  {/* Modal Header */}
                  <div className="border-b border-border pb-6 pr-12">
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-secondary mb-2">
                      <span>{study.number}</span>
                      <span>//</span>
                      <span>{study.tag}</span>
                      <span>//</span>
                      <span>{study.year}</span>
                    </div>

                    <Dialog.Title className="font-serif text-2xl md:text-4xl text-textHeading font-normal tracking-tight">
                      {study.title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-textBody text-base font-light">
                      {study.subtitle}
                    </Dialog.Description>
                  </div>

                  {/* Key Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 border border-border bg-surface-elevated">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-serif text-2xl text-primary font-semibold">
                          {m.value}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-textMuted mt-1">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-primary font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" />
                        पृष्ठभूमि तथा चुनौती (Context & Challenge)
                      </h3>
                      <p className="text-textBody leading-relaxed font-light">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold mb-3 flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5" />
                        ज्योतिषीय समाधान (Vedic Resolution)
                      </h3>
                      <p className="text-textBody leading-relaxed font-light">
                        {study.engineeringSolution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture Checklist */}
                  <div className="border border-border p-6 bg-background">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-textHeading font-semibold mb-4 flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-primary" />
                      शास्त्रीय कार्यविधि तथा पञ्चाङ्ग सूत्र (Methodology & Standards)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-textBody">
                      {study.architectureDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Quote */}
                  {study.quote && (
                    <div className="border-l-2 border-primary pl-4 py-2 italic font-serif text-base text-textHeading">
                      &ldquo;{study.quote}&rdquo;
                    </div>
                  )}

                  {/* Action Footer */}
                  <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-xs text-textMuted">
                      सहकार्य: {study.client}
                    </span>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenInquiry(`परामर्श अनुरोध: ${study.title}`);
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-primary text-textInverted text-xs font-mono uppercase tracking-widest hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                    >
                      <span>यस विषयमा परामर्श लिनुहोस्</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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

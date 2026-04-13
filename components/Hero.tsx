"use client";

import { FileDown, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Hero() {
  const t = useTranslations('hero');
  const descriptionLines = t('description').split('\n');
  const textContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };
  const textLine = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:pt-32">
      {/* Hero-specific decorative lights */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[120px] pointer-events-none" 
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-primary/60" />
                <p className="tracking-[0.3em] text-primary uppercase text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  {t('role')}
                </p>
              </motion.div>
              
              <motion.h1 
                className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('greeting') ? (
                  <>
                    {t('greeting')}{' '}
                  </>
                ) : null}
                <span className="block bg-gradient-to-r from-wine via-primary to-accent bg-clip-text text-transparent pb-1">
                  {t('name')}
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-foreground/82 max-w-xl"
                variants={textContainer}
                initial="hidden"
                animate="show"
                transition={{ delayChildren: 0.42 }}
              >
                {descriptionLines.map((line, idx) => (
                  <motion.span
                    key={`${line}-${idx}`}
                    className="block"
                    variants={textLine}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-5"
            >
              <a
                href="/cv.pdf"
                download
                className="group flex items-center gap-3 rounded-full border border-wine/20 bg-secondary/15 px-10 py-4 text-wine transition-all duration-300 hover:border-vino/30 hover:bg-secondary/25 hover:text-vino hover:shadow-xl hover:scale-105 active:scale-95 dark:border-white/12 dark:bg-white/5 dark:text-vino"
              >
                <FileDown className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="font-semibold tracking-wide">{t('btnCV')}</span>
              </a>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div 
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group profile-glow">
              <div className="profile-glow-orbit" aria-hidden="true" />
              <div className="profile-glow-scan" aria-hidden="true" />
              <div className="profile-glow-dots" aria-hidden="true" />
              <div className="relative z-10 h-80 w-80 overflow-hidden rounded-full border border-white/50 bg-white/10 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02] md:h-[460px] md:w-[460px]">
                <img
                  src="/me.jpg"
                  alt={t('name')}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

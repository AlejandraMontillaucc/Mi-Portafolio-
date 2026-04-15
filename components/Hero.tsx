"use client";

import { FileDown, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Hero() {
  const t = useTranslations('hero');
  const descriptionLines = t('description').split('\n');
  const nameWords = t('name').split(' ').filter(Boolean);
  const textContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.16,
      },
    },
  };
  const textLine = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };
  const nameContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.35,
      },
    },
  };
  const nameWord = {
    hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-8 lg:px-10 pt-28 pb-24 md:pt-32 md:pb-32">
      {/* Hero-specific decorative lights */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/12 blur-[130px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-28 -right-28 h-[34rem] w-[34rem] rounded-full bg-wine/10 blur-[150px] pointer-events-none" 
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-[100rem]"
      >
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-6">
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
                transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {t('greeting') ? (
                  <>
                    {t('greeting')}{' '}
                  </>
                ) : null}
                <motion.span
                  className="relative block pb-1"
                  variants={nameContainer}
                  initial="hidden"
                  animate="show"
                >
                  <span className="sr-only">{t('name')}</span>
                  <span aria-hidden="true" className="block">
                    {nameWords.map((word, idx) => (
                      <motion.span
                        key={`${word}-${idx}`}
                        variants={nameWord}
                        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block bg-gradient-to-r from-wine via-vino to-wine bg-clip-text text-transparent drop-shadow-[0_18px_46px_rgba(109,0,6,0.38)]"
                      >
                        {word}
                        {idx < nameWords.length - 1 ? '\u00A0' : null}
                      </motion.span>
                    ))}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-10 -bottom-1 h-[2px] opacity-70"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, rgba(109,0,6,0.0) 0px, rgba(109,0,6,0.0) 10px, rgba(109,0,6,0.65) 10px, rgba(109,0,6,0.65) 28px)',
                      backgroundSize: '220px 100%',
                    }}
                    animate={{
                      backgroundPositionX: ['0%', '200%'],
                      opacity: [0.4, 0.78, 0.4],
                      filter: ['blur(0.2px)', 'blur(0.8px)', 'blur(0.2px)'],
                    }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: 'linear', delay: 1.8 }}
                  />
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-10 -bottom-1 h-[2px] opacity-50 dark:opacity-65"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(to right, rgba(255,255,255,0.0) 0px, rgba(255,255,255,0.0) 14px, rgba(255,255,255,0.42) 14px, rgba(255,255,255,0.42) 30px)',
                      backgroundSize: '240px 100%',
                    }}
                    animate={{ backgroundPositionX: ['200%', '0%'] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: 'linear', delay: 2.1 }}
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-foreground/82 max-w-xl"
                variants={textContainer}
                initial="hidden"
                animate="show"
                transition={{ delayChildren: 1.2 }}
              >
                {descriptionLines.map((line, idx) => (
                  <motion.span
                    key={`${line}-${idx}`}
                    className="block"
                    variants={textLine}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                className="group hero-cv-breathe relative flex items-center gap-3 overflow-hidden rounded-full border border-wine/30 bg-gradient-to-r from-wine via-vino to-primary px-8 py-3.5 text-sm text-white shadow-[0_16px_50px_rgba(109,0,6,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(109,0,6,0.28)] active:translate-y-0 active:scale-95 dark:border-white/10"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/14 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hero-cv-shimmer" />
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
              <div className="relative z-10 h-88 w-88 overflow-hidden rounded-full border border-white/55 bg-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.22)] ring-1 ring-wine/18 backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.02] md:h-[520px] md:w-[520px] lg:h-[580px] lg:w-[580px] dark:border-white/20 dark:ring-white/10">
                <img
                  src="/me.jpg"
                  alt={t('name')}
                  className="h-full w-full object-cover brightness-[1.06] contrast-[1.06] saturate-[1.05] transition-transform duration-700 group-hover:scale-110 dark:brightness-[0.94] dark:contrast-[1.02] dark:saturate-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-primary/14" />
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

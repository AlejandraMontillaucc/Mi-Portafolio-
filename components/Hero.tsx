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
        <div className="grid items-center gap-16 md:grid-cols-2">
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
                href="#proyectos"
                className="group relative overflow-hidden rounded-full bg-wine px-10 py-4 text-white transition-all duration-300 hover:bg-vino hover:scale-105 hover:shadow-[0_16px_48px_rgba(109,0,6,0.32)] active:scale-95"
              >
                <span className="relative z-10 font-semibold tracking-wide">{t('btnProjects')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-wine via-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              
              <a
                href="#contacto"
                className="group relative overflow-hidden rounded-full border-2 border-wine/35 px-10 py-4 text-foreground/88 transition-all duration-300 hover:border-wine/55 hover:text-wine hover:bg-wine/6 hover:scale-105 hover:shadow-[0_12px_26px_rgba(109,0,6,0.12)] active:scale-95 dark:text-foreground/88 dark:hover:text-vino dark:hover:bg-vino/10"
              >
                <span className="font-semibold tracking-wide">{t('btnContact')}</span>
              </a>

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
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative group">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-[40px] border border-primary/10 scale-110 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-115" />
              <div className="absolute -inset-8 rounded-[50px] border border-primary/5 scale-120 transition-transform duration-1000 group-hover:-rotate-3 group-hover:scale-125" />
              
              <div className="relative z-10 h-96 w-80 md:h-[550px] md:w-[420px] overflow-hidden rounded-[32px] border-2 border-white/50 bg-white/10 shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
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

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden sm:flex"
        >
          <a href="#sobre-mi" className="group flex flex-col items-center gap-2 text-foreground/40 transition-colors duration-300 hover:text-primary">
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore</span>
            <div className="relative flex items-center justify-center h-10 w-6 rounded-full border border-foreground/20 group-hover:border-primary transition-colors">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-foreground/40 group-hover:bg-primary transition-colors"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

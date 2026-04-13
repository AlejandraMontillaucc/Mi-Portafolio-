"use client";

import { motion } from 'motion/react';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px -60% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-2 mb-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px -60% 0px' }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 justify-center"
      >
        <span className="text-sm font-medium tracking-[0.18em] text-wine/80 dark:text-vino">
          {number} —
        </span>
        <div className="h-px flex-1 bg-wine/15 dark:bg-border/20 max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -60% 0px' }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-4xl lg:text-5xl text-foreground tracking-[0.06em] uppercase"
      >
        {title}
      </motion.h2>

      <div className="mx-auto">
        <div className="h-px w-28 bg-gradient-to-r from-transparent via-wine/45 to-transparent" />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -60% 0px' }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-lg text-foreground/75"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

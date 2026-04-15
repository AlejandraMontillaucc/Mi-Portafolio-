"use client";

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface SectionTitleProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ number, title, subtitle }: SectionTitleProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-2 mb-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 2, 0, -2, 0],
              }
        }
        className="flex items-center gap-4 justify-center"
      >
        <span className="text-sm font-medium tracking-[0.18em] text-wine/80 dark:text-vino">
          {number} —
        </span>
        <div className="h-px flex-1 bg-wine/15 dark:bg-border/20 max-w-xs" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10, clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        animate={
          reduceMotion || isTitleHovered
            ? { y: 0, filter: 'drop-shadow(0 12px 40px rgba(109,0,6,0.12))' }
            : {
                y: [0, -4, 0, 4, 0],
                filter: [
                  'drop-shadow(0 12px 40px rgba(109,0,6,0.10))',
                  'drop-shadow(0 14px 44px rgba(109,0,6,0.14))',
                  'drop-shadow(0 12px 40px rgba(109,0,6,0.10))',
                ],
              }
        }
        onHoverStart={() => setIsTitleHovered(true)}
        onHoverEnd={() => setIsTitleHovered(false)}
        whileHover={{ filter: 'drop-shadow(0 16px 54px rgba(109,0,6,0.20))' }}
        className="relative inline-flex justify-center font-serif text-4xl lg:text-5xl text-foreground tracking-[0.06em] uppercase"
      >
        {title}
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-3 left-1/2 h-px w-[min(16rem,70vw)] origin-center -translate-x-1/2 bg-gradient-to-r from-transparent via-wine/60 to-transparent"
        />
      </motion.h2>

      <div className="mx-auto">
        <div className="h-px w-28 bg-gradient-to-r from-transparent via-wine/45 to-transparent" />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-lg text-foreground/75"
        >
          <motion.span
            className="inline-block"
            animate={reduceMotion ? undefined : { y: [0, 1, 0, -1, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 5.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          >
            {subtitle}
          </motion.span>
        </motion.p>
      )}
    </motion.div>
  );
}

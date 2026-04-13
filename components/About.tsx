"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from "./SectionTitle";
import { motion } from 'motion/react';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="sobre-mi" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <SectionTitle number="01" title={t('title')} centered />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -55% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 space-y-8 text-lg leading-relaxed text-foreground/82 text-center md:text-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -55% 0px' }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('p1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -55% 0px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('p2')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -55% 0px' }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('p3')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

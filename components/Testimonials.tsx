"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  /**
   * AQUÍ VAN FUTURAS RESEÑAS/TESTIMONIOS
   * Cuando tengas testimonios reales, agrégalos al array 'testimonials'.
   * Por ahora se muestran tarjetas vacías con un diseño elegante.
   */
  const testimonials = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  return (
    <section id="testimonios" className="relative bg-muted/30 dark:bg-muted/10 px-6 sm:px-8 lg:px-12 py-24 md:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="06" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-6 rounded-2xl border border-wine/12 bg-background/55 p-12 text-center transition-all duration-300 hover:-translate-y-1 hover:border-wine/28 hover:shadow-[0_20px_70px_rgba(109,0,6,0.14)] overflow-hidden flex items-center justify-center"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 mx-auto rounded-full bg-wine/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-wine/55 dark:text-vino/70" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-wine/55 dark:text-vino/70">Próximamente</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

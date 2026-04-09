"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';

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
    <section id="testimonios" className="relative bg-muted px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="04" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className="group relative flex flex-col gap-6 rounded-2xl bg-background/50 p-12 border border-primary/10 transition-all duration-300 hover:border-primary/20 hover:shadow-lg overflow-hidden flex items-center justify-center text-center"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 mx-auto rounded-full bg-primary/5 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary/20" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-primary/30">Próximamente</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


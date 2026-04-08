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
              className="group relative flex flex-col gap-6 rounded-2xl bg-background/50 p-8 border border-primary/5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -right-4 -top-4 text-primary/5 transition-transform duration-500 group-hover:scale-110">
                <Quote className="h-24 w-24 rotate-12" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-primary/40" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-full bg-primary/5" />
                  <div className="h-4 w-[90%] rounded-full bg-primary/5" />
                  <div className="h-4 w-[75%] rounded-full bg-primary/5" />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded-full bg-primary/10" />
                    <div className="h-3 w-16 rounded-full bg-primary/5" />
                  </div>
                </div>
              </div>

              {/* Sutil overlay message visible only on hover for dev awareness or kept clean */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium uppercase tracking-widest text-primary/40">Próximamente</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


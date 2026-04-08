"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      name: 'Carlos Rodríguez',
      role: 'CEO, TechStart',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      content: t('t1'),
    },
    {
      name: 'María Fernández',
      role: 'Product Manager, InnovateLab',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      content: t('t2'),
    },
    {
      name: 'Juan Pérez',
      role: 'CTO, DesignHub',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      content: t('t3'),
    },
  ];

  return (
    <section className="relative bg-muted px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="04" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="space-y-6 rounded-2xl bg-background p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <Quote className="h-10 w-10 text-primary/20" />
              <blockquote className="text-lg leading-relaxed text-foreground/70">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


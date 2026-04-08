"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from "./SectionTitle";

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="sobre-mi" className="relative px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-4xl">
        <SectionTitle number="01" title={t('title')} centered />

        <div className="mt-16 space-y-8 text-lg leading-relaxed text-foreground/70 text-center md:text-xl">
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
        </div>
      </div>
    </section>
  );
}

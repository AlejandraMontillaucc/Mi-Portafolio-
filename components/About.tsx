"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from "./SectionTitle";

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({ value, label }: StatProps) => (
  <div className="space-y-2">
    <div className="font-serif text-4xl text-primary">{value}</div>
    <div className="text-foreground/60">{label}</div>
  </div>
);

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="sobre-mi" className="relative px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-6xl">
        <SectionTitle number="01" title={t('title')} />

        <div className="grid items-start gap-16 md:grid-cols-2">
          <h3 className="font-serif text-3xl text-foreground md:text-4xl">
            {t('subtitle')}
          </h3>

          <div className="space-y-6 text-lg leading-relaxed text-foreground/70">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <Stat value="3+" label={t('years')} />
              <Stat value="20+" label={t('projects')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

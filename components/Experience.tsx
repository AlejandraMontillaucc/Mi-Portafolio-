"use client";

import React from 'react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function Experience() {
  const t = useTranslations('experience');

  const experiences = [
    { year: '2024 - Presente', title: t('job1title'), company: 'TechInnovate', description: t('job1desc') },
    { year: '2023 - 2024', title: t('job2title'), company: 'CreativeStudio', description: t('job2desc') },
    { year: '2022 - 2023', title: t('job3title'), company: 'StartupLab', description: t('job3desc') },
    { year: '2021 - 2022', title: t('job4title'), company: 'CodeAcademy', description: t('job4desc') },
  ];

  return (
    <section id="experiencia" className="relative px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-5xl">
        <SectionTitle number="05" title={t('title')} centered />

        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-0 top-0 bottom-0 w-px -translate-x-1/2 bg-primary/20 md:left-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col gap-8 md:flex-row",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary md:left-1/2" />

                  {/* Content Card */}
                  <div className={cn(
                    "flex-1 pl-8 md:pl-0",
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                  )}>
                    <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                      {exp.year}
                    </div>
                    <h3 className="mb-2 font-serif text-2xl">{exp.title}</h3>
                    <div className="mb-3 font-medium text-primary">{exp.company}</div>
                    <p className="text-foreground/70">{exp.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import React from 'react';
import { Code2, Database, Layout, Smartphone, Cloud, GitBranch } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';

export default function Skills() {
  const t = useTranslations('skills');

  const skills = [
    { icon: Code2, title: t('s1'), description: t('s1desc') },
    { icon: Database, title: t('s2'), description: t('s2desc') },
    { icon: Layout, title: t('s3'), description: t('s3desc') },
    { icon: Smartphone, title: t('s4'), description: t('s4desc') },
    { icon: Cloud, title: t('s5'), description: t('s5desc') },
    { icon: GitBranch, title: t('s6'), description: t('s6desc') },
  ];

  return (
    <section id="habilidades" className="relative px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="03" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group space-y-4 rounded-2xl border border-transparent bg-card p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <skill.icon className="h-7 w-7 text-primary transition-colors group-hover:text-inherit" />
              </div>
              <h3 className="font-serif text-xl">{skill.title}</h3>
              <p className="text-foreground/70">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


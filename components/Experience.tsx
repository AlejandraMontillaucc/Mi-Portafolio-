"use client";

import React from 'react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function Experience() {
  const t = useTranslations('experience');

  const jobs = [
    {
      title: t('jobs.manicurist.title'),
      company: t('jobs.manicurist.company'),
      date: t('jobs.manicurist.date'),
      desc: t('jobs.manicurist.desc'),
    },
    {
      title: t('jobs.admin_assistant.title'),
      company: t('jobs.admin_assistant.company'),
      date: t('jobs.admin_assistant.date'),
      desc: t('jobs.admin_assistant.desc'),
    },
    {
      title: t('jobs.customer_service.title'),
      company: t('jobs.customer_service.company'),
      date: t('jobs.customer_service.date'),
      desc: t('jobs.customer_service.desc'),
    },
    {
      title: t('jobs.nail_tech.title'),
      company: t('jobs.nail_tech.company'),
      date: t('jobs.nail_tech.date'),
      desc: t('jobs.nail_tech.desc'),
    },
  ];

  const education = [
    {
      title: t('education.software_eng.title'),
      institution: t('education.software_eng.institution'),
      date: t('education.software_eng.date'),
      desc: t('education.software_eng.desc'),
    },
    {
      title: t('education.sena.title'),
      institution: t('education.sena.institution'),
      date: t('education.sena.date'),
    },
    {
      title: t('education.beauty.title'),
      institution: t('education.beauty.institution'),
      date: t('education.beauty.date'),
    },
    {
      title: t('education.secondary.title'),
      institution: t('education.secondary.institution'),
      date: t('education.secondary.date'),
    },
    {
      title: t('education.primary.title'),
      institution: t('education.primary.institution'),
      date: t('education.primary.date'),
    },
  ];

  const complementary = [
    { title: t('complementary.socioemotional.title'), institution: t('complementary.socioemotional.institution') },
    { title: t('complementary.convivencia.title'), institution: t('complementary.convivencia.institution') },
    { title: t('complementary.entrepreneurship.title'), institution: t('complementary.entrepreneurship.institution') },
  ];

  return (
    <section id="experiencia" className="relative px-6 sm:px-8 lg:px-10 py-24 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[90rem]">
        <SectionTitle number="05" title={t('title')} />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Timeline: Experience */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-wine/15 pb-4">
              <div className="rounded-lg bg-wine/10 p-2 text-wine dark:bg-vino/15 dark:text-vino">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-3xl">{t('experience_title')}</h3>
            </div>

            <div className="relative space-y-10 pl-8">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-wine/40 via-wine/20 to-transparent dark:from-vino/45 dark:via-vino/25" />

              {jobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Dot */}
                  <div className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-wine transition-transform duration-300 group-hover:scale-150 dark:bg-vino" />
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif text-xl text-foreground group-hover:text-wine transition-colors dark:group-hover:text-vino">
                        {job.title}
                      </h4>
                      {job.date && (
                        <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-medium text-wine dark:bg-vino/15 dark:text-vino">
                          {job.date}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {job.company}
                    </div>
                    {job.desc && (
                      <p className="text-sm leading-relaxed text-foreground/75 max-w-md">
                        {job.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline: Education */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-wine/15 pb-4">
              <div className="rounded-lg bg-wine/10 p-2 text-wine dark:bg-vino/15 dark:text-vino">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-3xl">{t('education_title')}</h3>
            </div>

            <div className="relative space-y-10 pl-8">
              {/* Vertical Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-wine/40 via-wine/20 to-transparent dark:from-vino/45 dark:via-vino/25" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Dot */}
                  <div className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full border-2 border-background bg-wine transition-transform duration-300 group-hover:scale-150 dark:bg-vino" />
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif text-xl text-foreground group-hover:text-wine transition-colors dark:group-hover:text-vino">
                        {edu.title}
                      </h4>
                      {edu.date && (
                        <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-medium text-wine dark:bg-vino/15 dark:text-vino">
                          {edu.date}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {edu.institution}
                    </div>
                    {edu.desc && (
                      <p className="text-sm leading-relaxed text-foreground/75 max-w-md">
                        {edu.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Complementary Section */}
              <div className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="h-5 w-5 text-wine dark:text-vino" />
                  <h4 className="font-serif text-lg text-wine uppercase tracking-wider dark:text-vino">
                    {t('complementary_title')}
                  </h4>
                </div>
                <div className="grid gap-4">
                  {complementary.map((item, index) => (
                    <div 
                      key={index}
                      className="rounded-xl border border-wine/12 bg-card p-4 transition-all duration-300 hover:border-wine/28 hover:bg-wine/5 hover:shadow-[0_16px_50px_rgba(109,0,6,0.10)]"
                    >
                      <div className="text-sm font-semibold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.institution}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

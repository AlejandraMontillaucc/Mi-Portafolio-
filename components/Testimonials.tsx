"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      id: 1,
      text: t('items.t1.text'),
      author: t('items.t1.author'),
      role: t('items.t1.role'),
      phone: t('items.t1.phone'),
    },
    {
      id: 2,
      text: t('items.t2.text'),
      author: t('items.t2.author'),
      role: t('items.t2.role'),
      phone: t('items.t2.phone'),
    },
    {
      id: 3,
      text: t('items.t3.text'),
      author: t('items.t3.author'),
      role: t('items.t3.role'),
      phone: t('items.t3.phone'),
    },
    {
      id: 4,
      text: t('items.t4.text'),
      author: t('items.t4.author'),
      role: t('items.t4.role'),
      phone: t('items.t4.phone'),
    },
  ];

  return (
    <section id="testimonios" className="relative bg-muted/30 dark:bg-muted/10 px-6 sm:px-8 lg:px-12 py-24 md:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="06" title={t('title')} />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-wine/16 bg-background/40 p-8 shadow-[0_18px_70px_rgba(36,20,22,0.10)] backdrop-blur-md transition-all duration-500 hover:border-wine/32 hover:shadow-[0_28px_110px_rgba(109,0,6,0.18)]"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'conic-gradient(from 180deg, rgba(109,0,6,0) 0deg, rgba(109,0,6,0.32) 55deg, rgba(201,132,122,0.22) 95deg, rgba(109,0,6,0) 140deg, rgba(109,0,6,0.32) 220deg, rgba(201,132,122,0.20) 260deg, rgba(109,0,6,0) 360deg)',
                  filter: 'blur(14px)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-wine/8 group-hover:ring-wine/14 transition-[box-shadow,ring] duration-500" />

              {item.text ? (
                <>
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <div className="absolute inset-0 bg-[radial-gradient(720px_circle_at_16%_18%,rgba(109,0,6,0.12),transparent_55%),radial-gradient(760px_circle_at_86%_38%,rgba(192,129,107,0.10),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(109,0,6,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,0,6,0.10)_1px,transparent_1px)] bg-[size:56px_56px] opacity-0 transition-opacity duration-500 group-hover:opacity-60 [mask-image:radial-gradient(60%_65%_at_50%_40%,black,transparent)]" />
                  </div>
                  <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle, rgba(109,0,6,0.22) 0%, transparent 62%)', filter: 'blur(26px)' }} />

                  <div className="relative flex flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-wine/14 bg-wine/10 text-wine shadow-[0_14px_45px_rgba(109,0,6,0.18)]">
                          <Quote className="h-5 w-5 text-wine/80 dark:text-vino/85" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground/92">{item.author}</div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/65">
                            {item.role ? (
                              <span className="inline-flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-wine/70" />
                                {item.role}
                              </span>
                            ) : null}
                            {item.phone ? (
                              <span className="inline-flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-wine/40" />
                                {item.phone}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="rounded-full border border-wine/12 bg-background/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-wine/70 backdrop-blur-sm">
                        {t('badge')}
                      </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-wine/18 to-transparent" />

                    <p className="text-base leading-relaxed text-foreground/82 whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                </>
              ) : (
                <div className="relative flex min-h-[220px] flex-col items-center justify-center gap-4 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-wine/14 bg-wine/10 text-wine">
                    <Quote className="h-5 w-5 text-wine/70 dark:text-vino/80" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-wine/70 dark:text-vino/80">
                    {t('soon')}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

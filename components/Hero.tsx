"use client";

import { ArrowDown, FileDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:pt-32">
      {/* Background Decorative Letter */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-0 select-none opacity-[0.02] dark:opacity-[0.04] -translate-y-1/2">
        <span className="font-serif text-[40rem] leading-none text-primary">
          A
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <p className="tracking-widest text-primary uppercase">{t('role')}</p>
              <h1 className="font-serif text-5xl md:text-7xl">
                {t('greeting')}{' '}
                <span className="text-primary">{t('name')}</span>
              </h1>
              <p className="text-xl leading-relaxed text-foreground/70">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#proyectos"
                className="rounded-lg bg-primary px-8 py-3 text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              >
                {t('btnProjects')}
              </a>
              <a
                href="#contacto"
                className="rounded-lg border border-primary px-8 py-3 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {t('btnContact')}
              </a>
              <a
                href="/cv.pdf"
                download
                className="group flex items-center gap-2 rounded-lg bg-secondary/20 border border-primary/20 px-8 py-3 text-primary transition-all duration-300 hover:bg-secondary/30 hover:shadow-md hover:scale-[1.02]"
              >
                <FileDown className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="font-medium">{t('btnCV')}</span>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative z-10 h-96 w-80 overflow-hidden rounded-3xl border-2 border-primary/20 bg-accent shadow-lg md:h-[500px] md:w-96">
                <img
                  src="/me.jpg"
                  alt={t('name')}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -right-8 top-8 -z-0 h-96 w-80 rounded-3xl border-2 border-primary/20 opacity-50 md:h-[500px] md:w-96" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#sobre-mi" className="flex flex-col items-center gap-2 text-foreground/50 transition-colors duration-200 hover:text-primary">
            <span className="text-sm">Scroll</span>
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}


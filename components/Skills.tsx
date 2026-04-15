"use client";

import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

type Tech = {
  name: string;
  brand: string;
  glow: string;
  Logo: React.ComponentType<{ className?: string }>;
};

function ReactLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 10.11c-1.04 0-1.89.85-1.89 1.89 0 1.04.85 1.89 1.89 1.89 1.04 0 1.89-.85 1.89-1.89 0-1.04-.85-1.89-1.89-1.89zm0-7.11c-.62 0-1.26.09-1.9.27-.42.12-.66.56-.54.98.12.42.56.66.98.54.48-.13.97-.2 1.46-.2 2.56 0 4.97 1.7 6.76 4.8.23.4.74.54 1.14.31.4-.23.54-.74.31-1.14C18.16 4.99 15.21 3 12 3zm0 18c-2.56 0-4.97-1.7-6.76-4.8-.23-.4-.74-.54-1.14-.31-.4.23-.54.74-.31 1.14C5.84 19.01 8.79 21 12 21c.62 0 1.26-.09 1.9-.27.42-.12.66-.56.54-.98-.12-.42-.56-.66-.98-.54-.48.13-.97.2-1.46.2zm7.89-9c0 3.12-1.7 6.05-4.8 8.24-.38.27-.47.79-.2 1.17.27.38.79.47 1.17.2 3.52-2.5 5.54-5.9 5.54-9.61 0-.46-.03-.93-.1-1.39-.06-.43-.46-.72-.89-.66-.43.06-.72.46-.66.89.06.38.08.77.08 1.16zm-15.78 0c0-3.12 1.7-6.05 4.8-8.24.38-.27.47-.79.2-1.17-.27-.38-.79-.47-1.17-.2C4.42 4.89 2.4 8.29 2.4 12c0 .46.03.93.1 1.39.06.43.46.72.89.66.43-.06.72-.46.66-.89-.06-.38-.08-.77-.08-1.16z" />
      <path d="M7.39 7.93c-1.56 2.7-2.14 5.65-1.65 8.3.07.43.48.71.91.64.43-.07.71-.48.64-.91-.41-2.23.08-4.77 1.44-7.13.23-.4.09-.91-.31-1.14-.4-.23-.91-.09-1.14.31zm9.22 8.14c1.56-2.7 2.14-5.65 1.65-8.3-.07-.43-.48-.71-.91-.64-.43.07-.71.48-.64.91.41 2.23-.08 4.77-1.44 7.13-.23.4-.09.91.31 1.14.4.23.91.09 1.14-.31z" />
    </svg>
  );
}

function TailwindLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.76.19 1.303.741 1.905 1.352.98.996 2.092 2.148 4.595 2.148 2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.303-.741-1.905-1.352C15.615 7.152 14.503 6 12 6zm-5 6c-2.667 0-4.333 1.333-5 4 1-1.333 2.167-1.833 3.5-1.5.76.19 1.303.741 1.905 1.352C8.385 16.848 9.497 18 12 18c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-.76-.19-1.303-.741-1.905-1.352C10.615 13.152 9.503 12 7 12z" />
    </svg>
  );
}

function JavaScriptLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M0 0v24h24V0H0zm13.2 19.2c0 2.31-1.35 3.36-3.33 3.36-1.79 0-2.82-.93-3.36-2.04l1.82-1.1c.35.62.67 1.14 1.44 1.14.73 0 1.2-.29 1.2-1.41v-7.62h2.23v7.67zm6.93 3.36c-2.06 0-3.39-.98-4.04-2.27l1.82-1.05c.48.78.11 1.44 1.65 1.44.79 0 1.29-.4 1.29-.95 0-.66-.52-.89-1.39-1.27l-.48-.2c-1.38-.59-2.3-1.33-2.3-2.89 0-1.44 1.1-2.54 2.82-2.54 1.23 0 2.11.43 2.75 1.55l-1.75 1.12c-.38-.66-.8-.92-1-.92-.51 0-.83.32-.83.74 0 .52.32.74 1.05 1.06l.48.2c1.62.7 2.54 1.41 2.54 3 0 1.72-1.35 2.66-3.16 2.66z" />
    </svg>
  );
}

function TypeScriptLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M1.5 1.5h21v21h-21v-21zm11.7 10.2v1.8h-3v8.1H8.1v-8.1H5.1v-1.8h8.1zm3.12 10.98c-1.8 0-3.12-.9-3.6-2.34l1.8-.96c.3.78.78 1.32 1.74 1.32.84 0 1.38-.42 1.38-1.02 0-.72-.6-.96-1.62-1.38l-.54-.24c-1.56-.66-2.58-1.5-2.58-3.3 0-1.62 1.26-2.88 3.24-2.88 1.41 0 2.43.48 3.15 1.77l-1.68 1.08c-.36-.66-.78-.96-1.47-.96-.69 0-1.14.42-1.14.96 0 .66.45.9 1.5 1.32l.54.24c1.83.78 2.85 1.56 2.85 3.42 0 1.95-1.53 3-3.57 3z" />
    </svg>
  );
}

function HtmlLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm17.3 6.98H7.2l.25 2.78h11.1l-.83 9.27-5.72 1.59-5.71-1.59-.39-4.38h2.8l.2 2.26 3.1.86 3.1-.86.32-3.58H4.95L4.2 4.2h14.86l-.26 2.78z" />
    </svg>
  );
}

function CssLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm14.36 6.6H7.03l.2 2.28h8.44l-.29 3.2H7.52l.2 2.28h7.46l-.44 4.9-3.74 1.03-3.74-1.03-.24-2.72H5.19l.36 4.06L12 22.1l6.45-1.8 1.24-13.7H4.05l-.2-2.28h12.2l-.19 2.28z" />
    </svg>
  );
}

function GitLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M23.55 11.2 12.8.45a1.55 1.55 0 0 0-2.2 0l-2.23 2.23 2.83 2.83a1.85 1.85 0 0 1 2.34 2.36l2.73 2.73a1.85 1.85 0 1 1-1.11 1.04l-2.56-2.56v6.73a1.85 1.85 0 1 1-1.56-.06V11a1.85 1.85 0 0 1-1-.99L8.21 7.15 0.45 14.91a1.55 1.55 0 0 0 0 2.2l10.75 10.75a1.55 1.55 0 0 0 2.2 0l10.15-10.16a1.55 1.55 0 0 0 0-2.2z" />
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5C5.73.5.75 5.6.75 12c0 5.13 3.28 9.48 7.83 11.01.57.11.78-.25.78-.55v-2.02c-3.19.71-3.86-1.58-3.86-1.58-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.75 1.2 1.75 1.2 1.02 1.79 2.67 1.27 3.32.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.32 3.2 1.2.93-.27 1.93-.4 2.92-.41.99.01 1.99.14 2.92.41 2.22-1.52 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.51-2.69 5.5-5.25 5.79.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.79.55A11.52 11.52 0 0 0 23.25 12C23.25 5.6 18.27.5 12 .5z" />
    </svg>
  );
}

function NextLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0.5c-6.35 0-11.5 5.15-11.5 11.5S5.65 23.5 12 23.5 23.5 18.35 23.5 12 18.35 0.5 12 0.5zm6.68 18.09c-.24.3-.69.35-.98.11l-6.28-4.78a.6.6 0 0 1-.24-.49V6.7c0-.33.27-.6.6-.6h1.33c.33 0 .6.27.6.6v5.86l5.8 4.41c.3.24.35.68.12.97l-.95 1.15z" />
    </svg>
  );
}

function VercelLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.5 23 21.5H1L12 2.5z" />
    </svg>
  );
}

function TechChip({ tech, index }: { tech: Tech; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, y: -4 }}
      style={
        {
          '--brand': tech.brand,
          '--brandGlow': tech.glow,
        } as React.CSSProperties
      }
      className="group relative flex w-full min-w-0 items-center gap-3 rounded-2xl border border-wine/14 bg-background/55 px-4 py-4 shadow-[0_14px_50px_rgba(36,20,22,0.06)] ring-1 ring-wine/8 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--brand)] hover:ring-wine/18 hover:shadow-[0_22px_80px_var(--brandGlow)] sm:px-5"
    >
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/30 dark:bg-white/5">
        <span
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(30px 30px at 50% 40%, var(--brand) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
        <tech.Logo className="relative h-5 w-5" />
      </span>

      <span className="truncate text-sm font-semibold text-foreground/90">{tech.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const t = useTranslations('skills');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const categories = useMemo(() => {
    const interfaces: Tech[] = [
      { name: 'HTML', brand: '#E34F26', glow: 'rgba(227,79,38,0.34)', Logo: HtmlLogo },
      { name: 'CSS', brand: '#1572B6', glow: 'rgba(21,114,182,0.30)', Logo: CssLogo },
      { name: 'JavaScript', brand: '#F7DF1E', glow: 'rgba(247,223,30,0.28)', Logo: JavaScriptLogo },
      { name: 'TypeScript', brand: '#3178C6', glow: 'rgba(49,120,198,0.28)', Logo: TypeScriptLogo },
    ];

    const frameworks: Tech[] = [
      { name: 'React', brand: '#61DAFB', glow: 'rgba(97,218,251,0.26)', Logo: ReactLogo },
      { name: 'Next.js', brand: isDark ? '#FFFFFF' : '#111111', glow: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,17,17,0.14)', Logo: NextLogo },
    ];

    const ui: Tech[] = [
      { name: 'Tailwind CSS', brand: '#06B6D4', glow: 'rgba(6,182,212,0.26)', Logo: TailwindLogo },
    ];

    const tools: Tech[] = [
      { name: 'GitHub', brand: isDark ? '#FFFFFF' : '#111111', glow: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,17,17,0.14)', Logo: GitHubLogo },
      { name: 'Vercel', brand: isDark ? '#FFFFFF' : '#111111', glow: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,17,17,0.14)', Logo: VercelLogo },
    ];

    return [
      { title: t('interfaces'), description: t('interfacesDesc'), items: interfaces },
      { title: t('frameworks'), description: t('frameworksDesc'), items: frameworks },
      { title: t('ui'), description: t('uiDesc'), items: ui },
      { title: t('tools'), description: t('toolsDesc'), items: tools },
    ];
  }, [isDark, t]);

  return (
    <section id="habilidades" className="relative px-6 sm:px-8 lg:px-12 py-24 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle 
          number="03" 
          title={t('title')} 
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.75, delay: categoryIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl border border-wine/12 bg-card/45 p-6 shadow-[0_22px_80px_rgba(36,20,22,0.10)] backdrop-blur-sm sm:p-8 lg:p-9"
            >
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_18%_18%,rgba(109,0,6,0.12),transparent_55%),radial-gradient(780px_circle_at_85%_35%,rgba(192,129,107,0.10),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(109,0,6,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,0,6,0.08)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(60%_70%_at_50%_40%,black,transparent)]" />
              </div>

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-wine shadow-[0_0_0_5px_rgba(109,0,6,0.12)]" />
                  <h3 className="text-2xl font-serif text-foreground/95">{category.title}</h3>
                </div>

                <p className="mb-7 max-w-xl text-base leading-relaxed text-foreground/75">
                  {category.description}
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {category.items.map((tech, idx) => (
                    <div
                      key={`${category.title}-${tech.name}`}
                      style={
                        {
                          color: tech.brand,
                        } as React.CSSProperties
                      }
                    >
                      <TechChip tech={tech} index={idx} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

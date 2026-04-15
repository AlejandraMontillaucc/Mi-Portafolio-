"use client";

import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo?: string;
  isLive?: boolean;
}

export default function Projects() {
  const t = useTranslations('projects');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const projects: Project[] = [
    {
      title: t('items.legalconnect.title'),
      description: t('items.legalconnect.description'),
      image: '/legalconnect.png',
      tags: ['TypeScript', 'JavaScript'],
      github: 'https://github.com/AndresMira21/analyzer-contract-frontend.git',
      demo: 'https://analyzer-contract-frontend-kohl.vercel.app/',
      isLive: false,
    },
    {
      title: t('items.vite_app.title'),
      description: t('items.vite_app.description'),
      image: '/WhatsApp%20Image%202026-04-15%20at%202.36.20%20AM.jpeg',
      tags: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
      github: 'https://github.com/AlejandraMontillaucc/Integraci-n-Calidad.git',
    },
    {
      title: t('items.multiview.title'),
      description: t('items.multiview.description'),
      image: '/Captura%20de%20pantalla%202026-04-15%20034026.png',
      tags: ['JavaScript', 'CSS', 'HTML', 'Python'],
      github: 'https://github.com/AlejandraMontillaucc/proyecto-calculo.git',
    },
  ];

  return (
    <section id="proyectos" className="relative bg-muted/30 dark:bg-muted/10 px-6 sm:px-8 lg:px-12 py-24 md:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="02" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const isLive = project.isLive ?? Boolean(project.demo);

              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-wine/12 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/28 hover:shadow-[0_20px_70px_rgba(109,0,6,0.14)]"
                >
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end justify-center gap-4 bg-gradient-to-t from-background/80 to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                        transition={reduceMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={reduceMotion ? undefined : { scale: 1.12, y: -8 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.96, y: 0 }}
                        className="rounded-full bg-wine p-3 text-white shadow-[0_14px_45px_rgba(109,0,6,0.22)] transition-colors hover:bg-vino"
                        aria-label={t('labels.github')}
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                      {project.demo ? (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                          transition={
                            reduceMotion
                              ? undefined
                              : { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }
                          }
                          whileHover={reduceMotion ? undefined : { scale: 1.12, y: -8 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.96, y: 0 }}
                          className="rounded-full bg-wine p-3 text-white shadow-[0_14px_45px_rgba(109,0,6,0.22)] transition-colors hover:bg-vino"
                          aria-label={t('labels.demo')}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </motion.a>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-4 p-5 sm:p-6">
                    <h3 className="font-serif text-xl sm:text-2xl">{project.title}</h3>
                    <p className="text-sm text-foreground/80 sm:text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full bg-secondary/60 px-3 py-1 text-xs text-wine/85 dark:text-vino"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {!isLive ? (
                      <div className="pt-1 text-xs font-semibold uppercase tracking-[0.22em] text-wine/70">
                        {t('labels.notLive')}
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              );
            })
          ) : (
            /* Card de ejemplo estructural vacía (se muestra cuando no hay proyectos) */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 p-24 text-center"
            >
              <div className="rounded-full bg-primary/5 p-6 animate-pulse">
                <ExternalLink className="h-10 w-10 text-primary/20" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

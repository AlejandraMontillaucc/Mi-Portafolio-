"use client";

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

export default function Projects() {
  const t = useTranslations('projects');

  /**
   * AQUÍ PUEDES AGREGAR TUS PROYECTOS REALES
   * Solo añade objetos a este array siguiendo la estructura de la interfaz Project.
   */
  const projects: Project[] = [
    /* 
    {
      title: 'LegalConnect',
      description: 'Asistente inteligente para análisis de contratos',
      image: 'URL de la imagen o path en /public',
      tags: ['TypeScript', 'JavaScript'],
      github: 'https://github.com/AndresMira21/analyzer-contract-frontend.git',
      demo: 'https://analyzer-contract-frontend-kohl.vercel.app/',
    },
    */
  ];

  return (
    <section id="proyectos" className="relative bg-muted px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="02" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-transparent bg-background shadow-sm transition-all duration-300 hover:border-primary hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-center gap-4 bg-gradient-to-t from-background/80 to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:scale-110"
                      aria-label="Ver en GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:scale-110"
                      aria-label="Ver demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <h3 className="font-serif text-2xl">{project.title}</h3>
                  <p className="text-foreground/70">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary/30 px-3 py-1 text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* Card de ejemplo estructural vacía (se muestra cuando no hay proyectos) */
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/20 p-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <ExternalLink className="h-8 w-8 text-primary/40" />
              </div>
              <p className="text-lg text-foreground/50">
                Aún no hay proyectos para mostrar. <br /> 
                Agrega tus proyectos en el código de <code className="rounded bg-muted px-1">Projects.tsx</code>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


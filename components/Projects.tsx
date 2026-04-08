"use client";

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function Projects() {
  const t = useTranslations('projects');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: t('p1'),
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Task Management App',
      description: t('p2'),
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      tags: ['TypeScript', 'Firebase', 'Tailwind CSS'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Portfolio CMS',
      description: t('p3'),
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
      tags: ['Next.js', 'PostgreSQL', 'Prisma'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Health & Fitness Tracker',
      description: t('p4'),
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
      tags: ['React Native', 'Express', 'Chart.js'],
      github: '#',
      demo: '#',
    },
    {
      title: 'AI Blog Generator',
      description: t('p5'),
      image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=600&fit=crop',
      tags: ['Python', 'OpenAI API', 'Flask'],
      github: '#',
      demo: '#',
    },
    {
      title: 'Real Estate Platform',
      description: t('p6'),
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Mapbox', 'Supabase'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="proyectos" className="relative bg-muted px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="02" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
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
                    className="rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:scale-110"
                    aria-label="Ver en GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href={project.demo}
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
                  {project.tags.map((tag) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}


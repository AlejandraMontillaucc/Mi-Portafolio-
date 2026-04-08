"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 py-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="font-serif text-2xl text-primary">AM</div>
          <p className="text-sm text-foreground/50">
            {t('tagline')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <span>© {currentYear}</span>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            {t('madeWith')} <Heart className="h-4 w-4 fill-primary text-primary" /> {t('by')} <span className="font-medium text-primary">Maria Alejandra</span>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          {[
            { href: '#inicio', label: t('home') },
            { href: '#proyectos', label: t('projects') },
            { href: '#contacto', label: t('contact') },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/50 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}


"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-6 sm:px-8 lg:px-10 py-12">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="font-serif text-2xl text-wine">AM</div>
          <p className="text-sm text-foreground/70">
            {t('tagline')}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/75">
          <span>© {currentYear}</span>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            {t('madeWith')} <Heart className="h-4 w-4 fill-vino text-vino" /> {t('by')} <span className="font-medium text-wine">Maria Alejandra</span>
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
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-wine dark:hover:text-vino"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

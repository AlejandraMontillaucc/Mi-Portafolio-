"use client";

import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'es', flag: '🇨🇴', name: 'Español' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const locale = useLocale();
  const t = useTranslations('navbar');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: t('home') },
    { href: '#sobre-mi', label: t('about') },
    { href: '#proyectos', label: t('projects') },
    { href: '#experiencia', label: t('experience') },
    { href: '#contacto', label: t('contact') },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      window.location.reload();
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg border-b bg-gradient-to-b from-background via-background/95 to-background/90",
        isScrolled
          ? "border-primary/20 shadow-lg shadow-primary/5 py-3"
          : "border-secondary/30 shadow-md shadow-secondary/10 py-5"
      )}
    >
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary opacity-60" />

      <div className="max-w-full px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            className="group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground font-serif transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-xl shadow-lg shadow-primary/30"
          >
            <span className="text-lg relative z-10">AM</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-3 py-2 text-foreground/70 transition-all duration-300 hover:text-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 scale-0 rounded-lg bg-gradient-to-r from-secondary/20 to-primary/20 transition-transform duration-300 group-hover:scale-100" />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 rounded-xl border border-primary/20 bg-gradient-to-r from-secondary/20 to-primary/20 px-4 py-2.5 text-foreground/70 transition-all duration-300 hover:from-secondary/30 hover:to-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium uppercase">{locale}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-3 min-w-[180px] overflow-hidden rounded-2xl border-2 border-primary/20 bg-background/98 shadow-2xl shadow-primary/10 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-3 text-left transition-all duration-200",
                        locale === lang.code
                          ? "bg-gradient-to-r from-primary/15 to-secondary/15 text-primary border-l-4 border-primary"
                          : "text-foreground/60 hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="group rounded-xl border border-primary/20 bg-gradient-to-br from-secondary/20 to-primary/20 p-3 transition-all duration-300 hover:from-secondary/30 hover:to-primary/30 hover:scale-110 hover:shadow-lg hover:shadow-primary/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-primary transition-transform duration-300 group-hover:rotate-45" />
                ) : (
                  <Moon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Toggles */}
          <div className="flex items-center gap-4 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-xl border border-primary/10 bg-secondary/20 p-2.5"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-primary" /> : <Moon className="h-5 w-5 text-primary" />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl bg-primary p-2.5 text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full space-y-6 border-b-2 border-primary/10 bg-background/98 px-6 py-8 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-300 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center justify-between text-xl font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
                <span className="h-2 w-2 scale-0 rounded-full bg-primary transition-transform group-hover:scale-100" />
              </a>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground/50">Idioma</span>
            <div className="flex gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "rounded-xl border-2 px-4 py-2 transition-all duration-300",
                    locale === lang.code
                      ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/5"
                      : "border-primary/10 text-foreground/40 hover:border-primary/30"
                  )}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  );
}


"use client";

import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const LANGUAGES = [
  { code: 'es', flag: '🇨🇴', name: 'Español' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
];

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [activeHref, setActiveHref] = useState('#inicio');
  
  const locale = useLocale();
  const t = useTranslations('navbar');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { href: '#inicio', label: t('home') },
      { href: '#sobre-mi', label: t('about') },
      { href: '#proyectos', label: t('projects') },
      { href: '#experiencia', label: t('experience') },
      { href: '#contacto', label: t('contact') },
    ],
    [t]
  );

  useEffect(() => {
    if (!mounted) return;

    const ids = navLinks
      .map((l) => l.href.replace('#', ''))
      .filter(Boolean);

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target) return;
        setActiveHref(`#${(visible.target as HTMLElement).id}`);
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.15, 0.25, 0.35],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mounted, navLinks]);

  useEffect(() => {
    if (!mounted) return;

    const close = () => setShowLanguageMenu(false);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, [mounted]);

  const handleLanguageChange = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full">
      <div
        className={cn(
          "relative w-full border-b border-white/10 backdrop-blur-2xl transition-all duration-500 dark:border-white/5",
          isScrolled ? "bg-background/70 shadow-2xl shadow-primary/10" : "bg-background/45 shadow-lg shadow-primary/5"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-70" />
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-70"
          style={{ backgroundSize: '200% 100%', animation: 'navLine 12s linear infinite' }}
        />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-80" />

        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            <a
              href="#inicio"
              onClick={() => {
                setActiveHref('#inicio');
                setIsMobileMenuOpen(false);
              }}
              className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary shadow-inner shadow-primary/10 ring-1 ring-white/10 dark:ring-white/5">
                <span className="font-serif text-base">AM</span>
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-primary/15 via-transparent to-secondary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </span>
              <span className="hidden text-sm font-medium tracking-wide text-foreground/75 md:inline">María</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveHref(link.href)}
                    className={cn(
                      "group relative rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "text-foreground bg-white/10 ring-1 ring-white/10 dark:bg-white/5 dark:ring-white/5"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/5 hover:scale-[1.03]"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span
                      className={cn(
                        "pointer-events-none absolute bottom-1 left-3 right-3 h-px origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-primary transition-transform duration-500",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu((v) => !v)}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-foreground/70 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-foreground hover:shadow-lg hover:shadow-primary/10 dark:border-white/5"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4 text-primary/90 transition-transform duration-300 group-hover:rotate-6" />
                  <span className="text-xs font-semibold uppercase tracking-widest">{locale}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 top-full mt-3 min-w-[180px] overflow-hidden rounded-2xl border border-white/10 bg-background/70 shadow-2xl shadow-primary/10 backdrop-blur-2xl dark:border-white/5">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10" />
                    <div className="relative">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors",
                            locale === lang.code
                              ? "bg-white/10 text-foreground"
                              : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                          )}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="group rounded-xl border border-white/10 bg-white/5 p-2.5 text-primary/90 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10 dark:border-white/5"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                ) : (
                  <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>

              <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-primary/90 backdrop-blur-xl dark:border-white/5"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl transition-colors hover:bg-white/15 dark:border-white/5"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative px-1 pb-5 pt-4">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 opacity-70" />
                <div className="relative flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = activeHref === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setActiveHref(link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-white/10 text-foreground ring-1 ring-white/10 dark:bg-white/5 dark:ring-white/5"
                            : "text-foreground/75 hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        {link.label}
                        <span className={cn("h-1.5 w-1.5 rounded-full bg-primary transition-opacity", isActive ? "opacity-100" : "opacity-40")} />
                      </a>
                    );
                  })}

                  <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium text-foreground/60">Idioma</span>
                    <div className="flex gap-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-widest transition-colors dark:border-white/5",
                            locale === lang.code ? "bg-white/10 text-foreground" : "text-foreground/60 hover:bg-white/10 hover:text-foreground"
                          )}
                        >
                          {lang.code.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

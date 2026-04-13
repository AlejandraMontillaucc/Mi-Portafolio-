"use client";

import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import Lottie from 'lottie-react';
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
  const [cuteAnimation, setCuteAnimation] = useState<Record<string, unknown> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  const locale = useLocale();
  const t = useTranslations('navbar');

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);

    const url = encodeURI('/Valentine lips.json');
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setCuteAnimation(data))
      .catch(() => setCuteAnimation(null));

    return () => media.removeEventListener('change', update);
  }, [mounted]);

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
          "relative w-full border-b border-wine/20 bg-secondary/70 backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-background/35",
          isScrolled
            ? "shadow-[0_16px_60px_rgba(36,20,22,0.14)]"
            : "shadow-[0_10px_40px_rgba(36,20,22,0.10)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/18 via-transparent to-primary/14 opacity-55" />
        <div className="pointer-events-none absolute left-3 top-0 bottom-0 z-10 flex items-center md:left-4">
          <div className="h-full aspect-square origin-left scale-[1.35] overflow-visible transform-gpu md:scale-[1.55]">
            {cuteAnimation ? (
              <Lottie
                animationData={cuteAnimation}
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-[100rem] px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="h-10 w-10 md:w-[110px]" aria-hidden="true" />

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveHref(link.href)}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-in-out",
                      isActive
                        ? "text-wine bg-wine/10 ring-1 ring-wine/25 dark:bg-vino/15 dark:text-wine dark:ring-white/10"
                        : "text-foreground/90 hover:text-vino hover:bg-wine/5 hover:scale-105"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span
                      className={cn(
                        "pointer-events-none absolute bottom-1 left-4 right-4 h-px origin-left rounded-full bg-gradient-to-r from-wine via-vino to-accent transition-transform duration-500",
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
                  className="group flex items-center gap-2 rounded-xl border border-wine/18 bg-secondary/55 px-3 py-2 text-foreground/90 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-secondary/75 hover:text-wine dark:border-white/10 dark:bg-white/5 dark:hover:text-vino"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4 text-wine transition-transform duration-300 group-hover:rotate-6 dark:text-vino" />
                  <span className="text-xs font-semibold uppercase tracking-widest">{locale}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 top-full mt-3 min-w-[180px] overflow-hidden rounded-2xl border border-wine/18 bg-secondary/75 shadow-[0_18px_60px_rgba(36,20,22,0.14)] backdrop-blur-sm dark:border-white/10 dark:bg-background/55">
                    <div className="relative">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors",
                            locale === lang.code
                              ? "bg-wine/10 text-wine dark:bg-vino/15 dark:text-foreground"
                              : "text-foreground/90 hover:bg-wine/5 hover:text-vino"
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
                className="group rounded-xl border border-wine/18 bg-secondary/55 p-2.5 text-wine backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-secondary/75 hover:text-vino dark:border-white/10 dark:bg-white/5"
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
                className="rounded-xl border border-wine/18 bg-secondary/55 p-2.5 text-wine backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-vino"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="rounded-xl border border-wine/18 bg-secondary/65 p-2.5 text-foreground shadow-[0_12px_40px_rgba(36,20,22,0.10)] backdrop-blur-sm transition-colors hover:bg-secondary/80 dark:border-white/10 dark:bg-white/6"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="relative mt-4 rounded-2xl border border-wine/18 bg-secondary/70 px-2 pb-5 pt-4 shadow-[0_18px_60px_rgba(36,20,22,0.14)] backdrop-blur-sm dark:border-white/10 dark:bg-background/45">
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
                          "flex items-center justify-between rounded-xl px-4 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-in-out",
                          isActive
                            ? "bg-wine/10 text-wine ring-1 ring-wine/22 dark:bg-vino/15 dark:text-wine dark:ring-white/10"
                            : "text-foreground/90 hover:bg-wine/5 hover:text-vino"
                        )}
                      >
                        {link.label}
                        <span className={cn("h-1.5 w-1.5 rounded-full bg-wine transition-opacity dark:bg-vino", isActive ? "opacity-100" : "opacity-35")} />
                      </a>
                    );
                  })}

                  <div className="flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                    <span className="text-sm font-medium text-foreground/75">Idioma</span>
                    <div className="flex gap-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            "rounded-xl border border-wine/18 bg-secondary/55 px-3 py-2 text-xs font-semibold tracking-widest transition-colors dark:border-white/10 dark:bg-white/5",
                            locale === lang.code ? "bg-wine/10 text-wine dark:bg-vino/15 dark:text-foreground" : "text-foreground/80 hover:bg-wine/5 hover:text-vino"
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

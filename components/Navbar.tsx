"use client";

import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);

  // Detect scroll
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '#inicio', label: language === 'ES' ? 'Inicio' : 'Home' },
    { href: '#sobre-mi', label: language === 'ES' ? 'Sobre mí' : 'About' },
    { href: '#proyectos', label: language === 'ES' ? 'Proyectos' : 'Projects' },
    { href: '#experiencia', label: language === 'ES' ? 'Experiencia' : 'Experience' },
    { href: '#contacto', label: language === 'ES' ? 'Contacto' : 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 rounded-2xl transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 border border-border/50'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="px-6 md:px-10">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-primary text-primary-foreground font-serif transition-all duration-300 hover:scale-110 hover:rotate-3"
          >
            <span className="text-sm">SM</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-foreground/70 hover:text-primary transition-all duration-300 group font-medium"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* Language */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent/50 transition-all duration-300 text-primary border border-border/50"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language}</span>
              </button>

              {showLanguageMenu && (
                <div className="absolute top-full mt-3 right-0 bg-background/90 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl overflow-hidden min-w-[90px] animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      setLanguage('ES');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left transition-colors duration-200 ${
                      language === 'ES'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent/30 text-foreground/70'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('EN');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left transition-colors duration-200 ${
                      language === 'EN'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent/30 text-foreground/70'
                    }`}
                  >
                    EN
                  </button>
                </div>
              )}
            </div>

            {/* Theme */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full hover:bg-accent/50 transition-all duration-300 text-primary border border-border/50"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent/50 transition-all duration-300 text-primary"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-4 border-t border-border pt-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground/70 hover:text-primary transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Language */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('ES')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      language === 'ES'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/30 text-foreground/70'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    onClick={() => setLanguage('EN')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      language === 'EN'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/30 text-foreground/70'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
'use client'
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Obtener idioma actual de la cookie si existe
    const savedLocale = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1] as 'es' | 'en';
    if (savedLocale) setLanguage(savedLocale);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLocale: 'es' | 'en') => {
    setLanguage(newLocale);
    // Establecer la cookie para que next-intl la reconozca en toda la página
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    setShowLanguageMenu(false);
    // Recargar la página para que los cambios surtan efecto en todo el sitio
    window.location.reload();
  };

  const navLinks = [
    { href: '#inicio', label: language === 'es' ? 'Inicio' : 'Home' },
    { href: '#sobre-mi', label: language === 'es' ? 'Sobre mí' : 'About' },
    { href: '#proyectos', label: language === 'es' ? 'Proyectos' : 'Projects' },
    { href: '#experiencia', label: language === 'es' ? 'Experiencia' : 'Experience' },
    { href: '#contacto', label: language === 'es' ? 'Contacto' : 'Contact' },
  ];

  const languages = [
    { code: 'es', flag: '🇨🇴', name: 'Español' },
    { code: 'en', flag: '🇺🇸', name: 'English' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(194,138,130,0.08)] transition-all duration-300 border-none"
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between gap-10">
          {/* Logo - Left */}
          <a
            href="#inicio"
            className="group relative flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#C28A82]/10 text-[#C28A82] font-serif text-lg font-bold transition-all duration-500 hover:scale-110"
          >
            AM
            <div className="absolute inset-0 rounded-full border border-[#C28A82]/20 group-hover:border-[#C28A82]/40 transition-colors duration-300"></div>
            {/* Soft Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-[#C28A82]/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>

          {/* Navigation Links & Actions - All Pushed Further Right */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-14 lg:gap-20">
            <div className="flex items-center gap-8 lg:gap-12 text-[15px] font-bold tracking-wide text-foreground/50">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative hover:text-[#C28A82] transition-colors duration-300 group whitespace-nowrap"
                >
                  {link.label}
                  {/* Subtle Underline */}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#C28A82]/60 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Right Side Actions (Language & Theme) - Far Right */}
            <div className="flex items-center gap-5 lg:gap-8 border-l border-[#C28A82]/10 pl-10 lg:pl-12">
              {/* Language Switcher */}
              <div className="relative group">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-[#C28A82]/5 border border-[#C28A82]/10 text-[13px] font-bold text-[#C28A82] hover:bg-[#C28A82]/10 transition-all duration-300 min-w-[100px] justify-center"
                >
                  <Globe className="w-4.5 h-4.5 opacity-60" />
                  <span className="uppercase">{language}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute top-full mt-4 right-0 bg-background/95 backdrop-blur-2xl border border-[#C28A82]/20 rounded-[32px] shadow-[0_20px_50px_-15px_rgba(194,138,130,0.3)] p-5 w-[260px] animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
                    <div className="flex flex-col gap-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code as 'es' | 'en')}
                          className={`flex items-center gap-4 w-full px-4 py-3 rounded-[20px] transition-all duration-300 group/item relative ${
                            language === lang.code 
                              ? 'bg-[#C28A82]/10 text-[#C28A82]' 
                              : 'text-foreground/50 hover:bg-[#C28A82]/5 hover:text-[#C28A82]/80'
                          }`}
                        >
                          {/* Flag Icon - Small and centered in the airy box */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border border-[#C28A82]/10 text-base shadow-sm flex-shrink-0 transition-transform group-hover/item:scale-105 select-none overflow-hidden font-normal">
                            {lang.flag}
                          </div>
                          
                          <div className="flex flex-col items-start">
                            <span className="text-[13px] font-bold tracking-tight leading-none">{lang.name}</span>
                            <span className="text-[8px] uppercase tracking-[0.1em] opacity-30 font-black mt-1">{lang.code}</span>
                          </div>

                          {language === lang.code && (
                            <div className="ml-auto flex items-center justify-center pr-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C28A82] opacity-60 shadow-[0_0_8px_rgba(194,138,130,0.4)]"></div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-3 rounded-2xl bg-[#C28A82]/5 border border-[#C28A82]/10 text-[#C28A82]/70 hover:text-[#C28A82] hover:bg-[#C28A82]/10 transition-all duration-300"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5.5 h-5.5 transition-transform duration-500 hover:rotate-45" />
                  ) : (
                    <Moon className="w-5.5 h-5.5 transition-transform duration-500 hover:-rotate-12" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl bg-[#C28A82]/5 border border-[#C28A82]/10 text-[#C28A82]"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#C28A82]/5 border border-[#C28A82]/10 text-[#C28A82]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 space-y-3 border-t border-[#C28A82]/10 pt-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-xl text-foreground/50 hover:text-[#C28A82] hover:bg-[#C28A82]/5 transition-all duration-200 font-bold text-base"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Decorative Pink Scroll Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C28A82]/30 to-transparent transition-opacity duration-700 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>
    </nav>
  );
}

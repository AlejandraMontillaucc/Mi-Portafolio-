'use client'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('navbar')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#inicio', label: t('home') },
    { href: '#sobre-mi', label: t('about') },
    { href: '#proyectos', label: t('projects') },
    { href: '#experiencia', label: t('experience') },
    { href: '#contacto', label: t('contact') },
  ]

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  const currentLocale = pathname.split('/')[1]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          <a href="#inicio" className="text-2xl font-serif font-semibold text-primary">SM</a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-foreground/70 hover:text-primary transition-colors duration-200">
                {link.label}
              </a>
            ))}

            <div className="flex items-center gap-1">
              {['es', 'en', 'fr', 'pt'].map((locale) => (
                <button key={locale} onClick={() => changeLanguage(locale)}
                  className={`uppercase text-xs font-medium px-2 py-1 rounded transition-colors duration-200 ${currentLocale === locale ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'}`}>
                  {locale}
                </button>
              ))}
            </div>

            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                className="block text-foreground/70 hover:text-primary transition-colors duration-200">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-foreground/10">
              {['es', 'en', 'fr', 'pt'].map((locale) => (
                <button key={locale} onClick={() => { changeLanguage(locale); setIsMobileMenuOpen(false) }}
                  className={`uppercase text-xs font-medium px-2 py-1 rounded ${currentLocale === locale ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'}`}>
                  {locale}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
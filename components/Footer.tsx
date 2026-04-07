'use client'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-center md:text-left">
            <div className="text-2xl font-serif font-semibold text-primary mb-2">SM</div>
            <p className="text-foreground/60">{t('tagline')}</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-foreground/60">
              <span>{t('madeWith')}</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span>{t('by')}</span>
            </div>
            <p className="text-foreground/60 text-sm">
              © {currentYear} {t('rights')}
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#inicio" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              {t('home')}
            </a>
            <a href="#proyectos" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              {t('projects')}
            </a>
            <a href="#contacto" className="text-foreground/60 hover:text-primary transition-colors duration-200">
              {t('contact')}
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
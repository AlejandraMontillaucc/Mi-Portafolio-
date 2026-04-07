'use client'
import { ArrowDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] dark:opacity-[0.04] z-0">
        <span className="font-serif text-[40rem] leading-none text-primary">A</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center space-y-12 text-center md:text-left h-full">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-serif">
                {t('greeting')}{' '}
                <span className="text-primary">{t('name')}</span>
              </h1>
              <p className="text-xl text-foreground/70 dark:text-foreground/60 leading-relaxed max-w-lg mx-auto md:mx-0">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <a href="#proyectos" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 hover:shadow-lg transition-all duration-200">
                {t('btnProjects')}
              </a>
              <a href="#contacto" className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                {t('btnContact')}
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="w-80 h-96 md:w-96 md:h-[500px] bg-accent rounded-3xl overflow-hidden shadow-lg">
                <img src="/yo.jpg" alt={t('name')} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -z-10 top-8 -right-8 w-80 h-96 md:w-96 md:h-[500px] border border-primary/20 rounded-3xl"></div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#sobre-mi" className="flex flex-col items-center gap-2 text-foreground/50 hover:text-primary transition-colors duration-200">
            <span className="text-sm">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
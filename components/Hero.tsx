'use client'
import { ArrowDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 px-6 overflow-hidden bg-background">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] dark:opacity-[0.04] z-0">
        <span className="font-serif text-[40rem] leading-none text-[#C28A82]">A</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col justify-center space-y-10 text-center md:text-left h-full">
            <div className="space-y-6">
              <span className="text-[#C28A82] text-xs font-bold tracking-[0.2em] uppercase block mb-4">
                Software Engineer
              </span>
              <h1 className="text-5xl md:text-7xl font-light text-foreground/90 leading-tight">
                {t('greeting')}, soy <span className="font-serif italic text-[#C28A82] font-medium">{t('name')}</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-lg mx-auto md:mx-0 font-light">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-wrap gap-5 justify-center md:justify-start pt-4">
              <a href="#proyectos" className="px-10 py-4 bg-[#C28A82] text-white rounded-xl hover:opacity-90 hover:shadow-xl transition-all duration-300 text-sm font-bold tracking-wide">
                {t('btnProjects')}
              </a>
              <a href="#contacto" className="px-10 py-4 border border-[#C28A82]/30 text-[#C28A82] rounded-xl hover:bg-[#C28A82]/5 transition-all duration-300 text-sm font-bold tracking-wide">
                {t('btnContact')}
              </a>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative group">
              <div className="w-80 h-[450px] md:w-[450px] md:h-[600px] bg-secondary rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img src="/yo.jpg" alt={t('name')} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -z-10 top-6 -right-6 w-full h-full border border-[#C28A82]/20 rounded-[40px] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce cursor-pointer">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C28A82] to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
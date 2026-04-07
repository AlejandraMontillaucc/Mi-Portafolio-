'use client'
import { useTranslations } from 'next-intl'

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="sobre-mi" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <span className="text-primary text-sm tracking-widest uppercase">01</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">{t('title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          <div>
            <h3 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">
              {t('subtitle')}
            </h3>
          </div>

          <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>

            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-serif text-primary mb-2">3+</div>
                <div className="text-foreground/60">{t('years')}</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-primary mb-2">20+</div>
                <div className="text-foreground/60">{t('projects')}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
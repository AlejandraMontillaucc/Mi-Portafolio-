'use client'
import { useTranslations } from 'next-intl'

const experiences = [
  { year: '2024 - Presente', titleKey: 'job1title', company: 'TechInnovate', descKey: 'job1desc' },
  { year: '2023 - 2024', titleKey: 'job2title', company: 'CreativeStudio', descKey: 'job2desc' },
  { year: '2022 - 2023', titleKey: 'job3title', company: 'StartupLab', descKey: 'job3desc' },
  { year: '2021 - 2022', titleKey: 'job4title', company: 'CodeAcademy', descKey: 'job4desc' },
]

export default function Experience() {
  const t = useTranslations('experience')

  return (
    <section id="experiencia" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center">
          <span className="text-primary text-sm tracking-widest uppercase">05</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">{t('title')}</h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 transform md:-translate-x-1/2"></div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 border-4 border-background"></div>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}>
                  <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
                    {exp.year}
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{t(exp.titleKey)}</h3>
                  <div className="text-primary mb-3">{exp.company}</div>
                  <p className="text-foreground/70">{t(exp.descKey)}</p>
                </div>
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
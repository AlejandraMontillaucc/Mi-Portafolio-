'use client'
import { Quote } from 'lucide-react'
import { useTranslations } from 'next-intl'

const testimonials = [
  {
    name: 'Carlos Rodríguez',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    contentKey: 't1',
  },
  {
    name: 'María Fernández',
    role: 'Product Manager, InnovateLab',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    contentKey: 't2',
  },
  {
    name: 'Juan Pérez',
    role: 'CTO, DesignHub',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    contentKey: 't3',
  },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <section className="py-32 px-6 bg-muted relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <span className="text-primary text-sm tracking-widest uppercase">04</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">{t('title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-2xl space-y-6 hover:shadow-lg transition-shadow duration-300 border border-transparent">
              <Quote className="w-10 h-10 text-primary/30" />
              <p className="text-foreground/70 text-lg leading-relaxed">
                "{t(testimonial.contentKey)}"
              </p>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
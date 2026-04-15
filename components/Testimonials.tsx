"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      id: 1,
      text:
        'Quiero recomendar el trabajo de mi manicurista, Alejandra, quien cada mes me diseña las uñas con mucho cuidado y dedicación. Sus resultados son muy bonitos, prolijos y duraderos.\n\nUsa materiales de buena calidad, lo que se nota en el acabado y la duración del diseño. Además, ofrece servicio a domicilio, lo que resulta muy cómodo.\n\nTambién es una persona muy amable, empática y profesional, lo que hace que la atención sea muy agradable.\n\nLa recomiendo totalmente por su talento y excelente servicio.',
      author: 'Luisa Salazar',
      role: 'Clienta',
      phone: '3153505689',
    },
    {
      id: 2,
      text: 'Quiero destacar el trabajo de mi manicurista, Alejandra, por su dedicación, cuidado en los detalles y resultados impecables en cada diseño.\n\nSus trabajos son personalizados, duraderos y de gran calidad. Además, es una persona amable, responsable y profesional, lo que hace que cada cita sea muy agradable.\n\nLa recomiendo totalmente por su talento y excelente servicio.',
      author: 'Claudia Salazar',
      role: 'Clienta',
      phone: '3166023779',
    },
    {
      id: 3,
      text: 'Es un gusto recomendar a Alejandra, a quien conozco tanto a nivel personal como profesional. Quiero destacar sus habilidades y cualidades como futura profesional.\n\nHa sido muy importante en mi emprendimiento, aportando creatividad y apoyo en proyectos de publicidad.\n\nComo manicurista, su trabajo es excelente, y su personalidad amable, honesta y empática genera mucha confianza. También es una persona disciplinada y constante, lo que se refleja en todo lo que hace, incluyendo su compromiso con su salud y estilo de vida.',
      author: 'Carolina Hidalgo',
      role: 'Compañera de trabajo',
      phone: '3183722460',
    },
  ];

  return (
    <section id="testimonios" className="relative bg-muted/30 dark:bg-muted/10 px-6 sm:px-8 lg:px-12 py-24 md:py-28 transition-colors duration-500">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="06" title={t('title')} />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-6 rounded-2xl border border-wine/12 bg-background/55 p-12 text-center transition-all duration-300 hover:-translate-y-1 hover:border-wine/28 hover:shadow-[0_20px_70px_rgba(109,0,6,0.14)] overflow-hidden"
            >
              {item.text ? (
                <>
                  <div className="h-10 w-10 mx-auto rounded-full bg-wine/10 flex items-center justify-center">
                    <Quote className="h-5 w-5 text-wine/70 dark:text-vino/80" />
                  </div>

                  <p className="text-base leading-relaxed text-foreground/85 whitespace-pre-line">
                    {item.text}
                  </p>

                  <div className="pt-2 text-sm font-semibold text-foreground/90">
                    {item.author}
                  </div>
                  {item.role || item.phone ? (
                    <div className="space-y-1 text-xs text-foreground/70">
                      {item.role ? <div>{item.role}</div> : null}
                      {item.phone ? <div>{item.phone}</div> : null}
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="space-y-4 flex flex-col items-center justify-center flex-1">
                  <div className="h-10 w-10 mx-auto rounded-full bg-wine/10 flex items-center justify-center">
                    <Quote className="h-5 w-5 text-wine/55 dark:text-vino/70" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest text-wine/55 dark:text-vino/70">
                    Próximamente
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

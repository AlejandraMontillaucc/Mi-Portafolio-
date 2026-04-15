"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from "./SectionTitle";
import { motion } from 'motion/react';
import Lottie from 'lottie-react';

export default function About() {
  const t = useTranslations('about');
  const [womanAnimation, setWomanAnimation] = useState<Record<string, unknown> | null>(null);
  const [polishAnimation, setPolishAnimation] = useState<Record<string, unknown> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);

    const urlWoman = encodeURI('/Woman on Computer.json');
    fetch(urlWoman)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setWomanAnimation(data))
      .catch(() => setWomanAnimation(null));

    const urlPolish = encodeURI('/Nail Polish (1).json');
    fetch(urlPolish)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setPolishAnimation(data))
      .catch(() => setPolishAnimation(null));

    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section id="sobre-mi" className="relative px-6 sm:px-8 lg:px-12 py-24 md:py-28">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="01" title={t('title')} />

        <div className="mt-12 grid items-center gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-[1fr_2.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[320px] md:max-w-none"
          >
            <div className="mx-auto aspect-square w-full max-w-[420px] xl:max-w-[480px]">
              {womanAnimation ? (
                <Lottie
                  animationData={womanAnimation}
                  loop={!reduceMotion}
                  autoplay={!reduceMotion}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-5xl space-y-8 text-base leading-relaxed text-foreground/82 text-center sm:text-lg md:text-xl lg:text-[1.25rem] xl:text-[1.35rem]"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('p1')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('p2')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('p3')}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[320px] md:max-w-none"
          >
            <div className="mx-auto aspect-square w-full max-w-[420px] xl:max-w-[480px]">
              {polishAnimation ? (
                <Lottie
                  animationData={polishAnimation}
                  loop={!reduceMotion}
                  autoplay={!reduceMotion}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

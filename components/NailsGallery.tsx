"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Instagram, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';
import { motion, AnimatePresence } from 'motion/react';

const NAIL_IMAGES = [
  { id: 1, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.10 PM.jpeg', alt: 'Uñas 1' },
  { id: 2, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.10 PM (1).jpeg', alt: 'Uñas 2' },
  { id: 3, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.10 PM (2).jpeg', alt: 'Uñas 3' },
  { id: 4, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.11 PM.jpeg', alt: 'Uñas 4' },
  { id: 5, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.11 PM (1).jpeg', alt: 'Uñas 5' },
  { id: 6, src: '/unas/WhatsApp Image 2026-04-14 at 12.07.11 PM (2).jpeg', alt: 'Uñas 6' },
  { id: 7, src: '/unas/WhatsApp Image 2026-04-14 at 12.08.56 PM.jpeg', alt: 'Uñas 7' },
  { id: 8, src: '/unas/WhatsApp Image 2026-04-14 at 6.17.33 PM.jpeg', alt: 'Uñas 8' },
];

export default function NailsGallery() {
  const t = useTranslations('nails');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shiftPx, setShiftPx] = useState(220);

  const images = useMemo(
    () =>
      NAIL_IMAGES.map((img) => ({
        ...img,
        src: encodeURI(img.src),
      })),
    []
  );

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const goNext = () => setActiveIndex((v) => (v + 1) % images.length);
  const goPrev = () => setActiveIndex((v) => (v - 1 + images.length) % images.length);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const computeShift = () => {
      const w = window.innerWidth;
      const clamped = Math.max(150, Math.min(280, Math.round(w * 0.2)));
      setShiftPx(clamped);
    };

    computeShift();
    window.addEventListener('resize', computeShift, { passive: true });
    return () => window.removeEventListener('resize', computeShift);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (selectedImageIndex === null) return;
      closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [images.length, selectedImageIndex]);

  const getOffsetFromActive = (index: number) => {
    const total = images.length;
    const half = total / 2;
    let diff = index - activeIndex;
    if (diff > half) diff -= total;
    if (diff < -half) diff += total;
    return diff;
  };

  return (
    <section id="unas" className="relative px-6 sm:px-8 lg:px-10 py-24 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[100rem]">
        <div className="mb-16 text-center">
          <SectionTitle number="04" title={t('title')} />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/82">
            {t('description')}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-wine/12 bg-card/35 px-6 py-10 shadow-[0_20px_70px_rgba(109,0,6,0.10)] backdrop-blur-sm sm:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_18%,rgba(109,0,6,0.12),transparent_55%),radial-gradient(1000px_circle_at_85%_35%,rgba(192,129,107,0.10),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(109,0,6,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,0,6,0.08)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(62%_72%_at_50%_40%,black,transparent)]" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div
              className="relative mx-auto h-[420px] w-full sm:h-[520px] lg:h-[600px]"
              style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
            >
              <div className="pointer-events-none absolute inset-0">
                <motion.div
                  className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-wine/40 to-transparent"
                  animate={{ y: ['-8%', '108%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {images.map((img, index) => {
                const offset = getOffsetFromActive(index);
                const depth = Math.abs(offset);
                const hidden = depth > 2;
                const scale = Math.max(0.72, 1 - depth * 0.16);
                const opacity = Math.max(0, 1 - depth * 0.28);
                const rotateY = offset * -34;
                const z = -depth * 160;
                const x = offset * shiftPx;
                const blur = depth === 0 ? 'blur(0px)' : `blur(${Math.min(1.25, depth * 0.55)}px)`;

                return (
                  <motion.button
                    key={img.id}
                    type="button"
                    initial={false}
                    animate={{
                      x,
                      z,
                      rotateY,
                      scale,
                      opacity: hidden ? 0 : opacity,
                      filter: hidden ? 'blur(6px)' : blur,
                    }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
                    onClick={() => openModal(index)}
                    className={[
                      'group absolute left-1/2 top-1/2 w-[min(86vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-gradient-to-r from-wine/40 via-vino/18 to-accent/18 p-[1px] outline-none',
                      hidden ? 'pointer-events-none' : 'pointer-events-auto',
                    ].join(' ')}
                    style={{
                      transformStyle: 'preserve-3d',
                      zIndex: 100 - depth,
                      boxShadow:
                        depth === 0
                          ? '0 32px 100px rgba(109,0,6,0.22)'
                          : '0 18px 60px rgba(36,20,22,0.10)',
                    }}
                    whileHover={
                      depth === 0
                        ? {
                            scale: 1.03,
                          }
                        : {}
                    }
                  >
                    <div className="relative overflow-hidden rounded-[2rem] bg-background/65">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 680px, 86vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />

                        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute inset-0 bg-[radial-gradient(520px_circle_at_50%_35%,rgba(109,0,6,0.22),transparent_60%)]" />
                          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.07)_0px,rgba(255,255,255,0.07)_1px,transparent_1px,transparent_8px)] mix-blend-overlay" />
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,0.55))]" />
                      </div>

                      <div className="absolute left-6 bottom-6 right-6 flex items-end justify-between gap-6 text-white">
                        <div className="min-w-0">
                        </div>

                        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur sm:flex">
                          <Eye className="h-4 w-4" />
                          {t('view')}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="rounded-full border border-wine/18 bg-background/55 p-3 text-foreground transition-all hover:bg-background/75 hover:shadow-[0_16px_50px_rgba(109,0,6,0.12)] active:scale-95"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full border border-wine/18 bg-background/55 p-3 text-foreground transition-all hover:bg-background/75 hover:shadow-[0_16px_50px_rgba(109,0,6,0.12)] active:scale-95"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Link */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://www.instagram.com/alejandranails05?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 py-4 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <Instagram className="h-6 w-6 transition-transform group-hover:rotate-12" />
            <span>{t('instagram')}</span>
          </a>
        </div>
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl md:p-10"
          >
            <button
              onClick={closeModal}
              className="absolute right-6 top-6 rounded-full bg-foreground/10 p-3 text-foreground transition-colors hover:bg-foreground/20"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative flex h-full w-full items-center justify-center">
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-0 z-10 rounded-full bg-foreground/10 p-3 text-foreground transition-all hover:bg-foreground/20 hover:scale-110 md:-left-12"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative h-[85vh] w-[min(92vw,1180px)] overflow-hidden rounded-3xl bg-gradient-to-r from-wine/35 via-vino/20 to-accent/20 p-[1px] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl bg-background/65">
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(109,0,6,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(109,0,6,0.10)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(60%_70%_at_50%_40%,black,transparent)]" />
                    <motion.div
                      className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/65 to-transparent"
                      animate={{ y: ['-10%', '110%'] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  <Image
                    src={images[selectedImageIndex].src}
                    alt={images[selectedImageIndex].alt}
                    fill
                    sizes="92vw"
                    className="object-contain"
                  />

                  <div className="pointer-events-none absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-wine shadow-[0_0_0_4px_rgba(109,0,6,0.18)]" />
                  </div>
                </div>
              </motion.div>

              <button
                onClick={nextImage}
                className="absolute right-0 z-10 rounded-full bg-foreground/10 p-3 text-foreground transition-all hover:bg-foreground/20 hover:scale-110 md:-right-12"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

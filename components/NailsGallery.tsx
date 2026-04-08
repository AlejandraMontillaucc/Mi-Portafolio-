"use client";

import React, { useState } from 'react';
import { Instagram, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';
import { motion, AnimatePresence } from 'motion/react';

const NAIL_IMAGES = [
  { id: 1, src: '/unas/unas1.jpg', alt: 'Nail Design 1' },
  { id: 2, src: '/unas/unas2.jpg', alt: 'Nail Design 2' },
  { id: 3, src: '/unas/unas3.jpg', alt: 'Nail Design 3' },
  { id: 4, src: '/unas/unas4.jpg', alt: 'Nail Design 4' },
  { id: 5, src: '/unas/unas5.jpg', alt: 'Nail Design 5' },
  { id: 6, src: '/unas/unas6.jpg', alt: 'Nail Design 6' },
];

export default function NailsGallery() {
  const t = useTranslations('nails');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % NAIL_IMAGES.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + NAIL_IMAGES.length) % NAIL_IMAGES.length);
    }
  };

  return (
    <section id="unas" className="relative px-6 py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <SectionTitle number="04" title={t('title')} centered />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70">
            {t('description')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {NAIL_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openModal(index)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-muted"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex flex-col items-center gap-2 text-white">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                    <Eye className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider">{t('view')}</span>
                </div>
              </div>
            </motion.div>
          ))}
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
                className="relative max-h-full max-w-full overflow-hidden rounded-3xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={NAIL_IMAGES[selectedImageIndex].src}
                  alt={NAIL_IMAGES[selectedImageIndex].alt}
                  className="max-h-[85vh] object-contain"
                />
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

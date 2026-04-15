"use client";

import React, { useEffect, useId, useMemo, useState } from 'react';
import Lottie from 'lottie-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

interface ContactLinkProps {
  href: string;
  platform: string;
  handle: string;
  brand: string;
  glow: string;
  Logo: React.ComponentType<{ className?: string }>;
}

function MailLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.2l8 5.2 8-5.2V7H4zm16 2.32-7.4 4.81a1 1 0 0 1-1.2 0L4 9.32V17h16V9.32z" />
    </svg>
  );
}

function GitHubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 .5C5.73.5.75 5.6.75 12c0 5.13 3.28 9.48 7.83 11.01.57.11.78-.25.78-.55v-2.02c-3.19.71-3.86-1.58-3.86-1.58-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.75 1.2 1.75 1.2 1.02 1.79 2.67 1.27 3.32.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.3-5.23-5.8 0-1.28.45-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.17 0 0 .98-.32 3.2 1.2.93-.27 1.93-.4 2.92-.41.99.01 1.99.14 2.92.41 2.22-1.52 3.2-1.2 3.2-1.2.64 1.65.24 2.87.12 3.17.75.82 1.2 1.87 1.2 3.15 0 4.51-2.69 5.5-5.25 5.79.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.79.55A11.52 11.52 0 0 0 23.25 12C23.25 5.6 18.27.5 12 .5z" />
    </svg>
  );
}

function PhoneLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.6 2.7c.5-.5 1.2-.6 1.8-.3l2.5 1.2c.7.3 1 1.1.8 1.8l-.8 2.4c-.2.6 0 1.2.4 1.6l2.4 2.4c.4.4 1 .6 1.6.4l2.4-.8c.7-.2 1.5.1 1.8.8l1.2 2.5c.3.6.2 1.3-.3 1.8l-1.4 1.4c-.6.6-1.5.9-2.4.7-3-.7-5.9-2.3-8.5-5-2.7-2.7-4.3-5.5-5-8.5-.2-.9.1-1.8.7-2.4L6.6 2.7z" />
    </svg>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.2c-5.38 0-9.76 4.09-9.76 9.12 0 1.61.48 3.12 1.31 4.44L2 22l6.43-1.7c1.15.5 2.43.78 3.77.78 5.38 0 9.76-4.09 9.76-9.12S17.38 2.2 12 2.2zm0 16.26c-1.18 0-2.28-.3-3.25-.82l-.23-.12-3.82 1.01 1.03-3.56-.15-.25c-.7-1.14-1.07-2.44-1.07-3.78 0-3.92 3.33-7.11 7.49-7.11 4.16 0 7.49 3.19 7.49 7.11 0 3.92-3.33 7.11-7.49 7.11zm4.2-5.35c-.23-.12-1.35-.64-1.56-.72-.21-.08-.36-.12-.52.12-.15.24-.6.72-.73.86-.13.14-.27.16-.5.06-.23-.12-.97-.34-1.85-1.08-.68-.54-1.14-1.2-1.28-1.4-.13-.2-.01-.31.1-.42.1-.1.23-.24.34-.36.11-.12.15-.2.23-.34.08-.14.04-.26-.02-.38-.06-.12-.52-1.18-.72-1.62-.19-.43-.38-.36-.52-.36h-.44c-.15 0-.4.06-.6.28-.21.22-.8.75-.8 1.84 0 1.09.82 2.14.93 2.29.11.15 1.6 2.45 3.89 3.44.55.23.97.37 1.3.47.55.16 1.05.14 1.44.08.44-.06 1.35-.52 1.54-1.02.19-.5.19-.92.13-1.02-.06-.1-.21-.16-.44-.28z" />
    </svg>
  );
}

function InstagramLogo({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <defs>
        <linearGradient id={gradientId} x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEDA75" />
          <stop offset="0.35" stopColor="#FA7E1E" />
          <stop offset="0.6" stopColor="#D62976" />
          <stop offset="0.8" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        d="M7.5 2.5h9A5 5 0 0 1 21.5 7.5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      />
      <path
        d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      />
      <path
        d="M17.2 6.6h.01"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ContactCard = ({ href, platform, handle, brand, glow, Logo }: ContactLinkProps) => (
  <motion.a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    whileHover={{ scale: 1.03, y: -4 }}
    transition={{ type: 'spring', stiffness: 360, damping: 26 }}
    style={
      {
        '--brand': brand,
        '--glow': glow,
      } as React.CSSProperties
    }
    className="group relative overflow-hidden rounded-2xl border border-wine/14 bg-background/55 p-5 shadow-[0_18px_65px_rgba(36,20,22,0.10)] ring-1 ring-wine/8 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--brand)] hover:ring-wine/18 hover:shadow-[0_26px_95px_var(--glow)]"
  >
    <div className="flex items-center gap-4">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/35 dark:bg-white/5">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(36px 36px at 50% 35%, var(--brand) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
        />
        <Logo className="relative h-6 w-6" />
      </div>

      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
          {platform}
        </div>
        <div className="mt-1 truncate text-sm font-semibold text-foreground/92">{handle}</div>
      </div>
    </div>

    <div
      className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: 'radial-gradient(circle, var(--brand) 0%, transparent 60%)',
        filter: 'blur(22px)',
      }}
    />
  </motion.a>
);

export default function Contact() {
  const t = useTranslations('contact');
  const { resolvedTheme } = useTheme();
  const instagramGradientId = useId();
  const [danceCatAnimation, setDanceCatAnimation] = useState<Record<string, unknown> | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);

    const url = encodeURI('/Dance cat.json');
    fetch(url)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setDanceCatAnimation(data))
      .catch(() => setDanceCatAnimation(null));

    return () => media.removeEventListener('change', update);
  }, []);

  const contactCards = useMemo(() => {
    const isDark = resolvedTheme === 'dark';

    return [
      {
        href: 'mailto:alejadiiaz27@gmail.com',
        platform: t('links.email'),
        handle: 'alejadiiaz27@gmail.com',
        brand: isDark ? 'rgba(255,255,255,0.78)' : 'rgba(17,17,17,0.72)',
        glow: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)',
        Logo: MailLogo,
      },
      {
        href: 'https://github.com/AlejandraMontillaucc',
        platform: t('links.github'),
        handle: 'AlejandraMontillaucc',
        brand: isDark ? '#FFFFFF' : '#111111',
        glow: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,17,17,0.14)',
        Logo: GitHubLogo,
      },
      {
        href: 'tel:+573162376930',
        platform: t('links.phone'),
        handle: '+57 316 237 6930',
        brand: isDark ? 'rgba(255,255,255,0.78)' : 'rgba(17,17,17,0.72)',
        glow: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)',
        Logo: PhoneLogo,
      },
      {
        href: 'https://wa.me/573234762158',
        platform: t('links.whatsappWork'),
        handle: '+57 323 476 2158',
        brand: '#25D366',
        glow: 'rgba(37,211,102,0.22)',
        Logo: WhatsAppLogo,
      },
      {
        href: 'https://www.instagram.com/ale.05d?igsh=MW5paDNnYm8yb2g1Yg==',
        platform: t('links.instagramPersonal'),
        handle: '@ale.05d',
        brand: '#D62976',
        glow: 'rgba(214,41,118,0.22)',
        Logo: (props: { className?: string }) => <InstagramLogo {...props} gradientId={`${instagramGradientId}-p`} />,
      },
      {
        href: 'https://www.instagram.com/alejandranails05?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        platform: t('links.instagramWork'),
        handle: '@alejandranails05',
        brand: '#FA7E1E',
        glow: 'rgba(250,126,30,0.22)',
        Logo: (props: { className?: string }) => <InstagramLogo {...props} gradientId={`${instagramGradientId}-w`} />,
      },
    ];
  }, [instagramGradientId, resolvedTheme, t]);

  return (
    <section id="contacto" className="relative px-6 sm:px-8 lg:px-12 py-24 md:py-28">
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="07" title={t('title')} />

        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h3 className="font-serif text-3xl">{t('subtitle')}</h3>
            <p className="text-lg leading-relaxed text-foreground/82">
              {t('connectDesc')}
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {contactCards.map((c) => (
                <ContactCard
                  key={c.href}
                  href={c.href}
                  platform={c.platform}
                  handle={c.handle}
                  brand={c.brand}
                  glow={c.glow}
                  Logo={c.Logo}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-14 flex w-full max-w-[520px] justify-center md:mt-20"
          >
            <div className="relative aspect-square w-full max-w-[420px]">
              {danceCatAnimation ? (
                <Lottie
                  animationData={danceCatAnimation}
                  loop={!reduceMotion}
                  autoplay={!reduceMotion}
                  rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
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

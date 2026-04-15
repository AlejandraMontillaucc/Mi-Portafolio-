"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';

import { Award, Briefcase, ChevronDown, GraduationCap } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';

export default function Experience() {
  const t = useTranslations('experience');
  const [filter, setFilter] = useState<'all' | 'experience' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<
    'highlights' | 'responsibilities' | 'tools' | 'full' | null
  >(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const ratiosRef = useRef<Record<string, number>>({});

  type TimelineType = 'experience' | 'education';
  type TimelineGroup = 'experience' | 'education' | 'complementary';
  type TimelineItem = {
    id: string;
    type: TimelineType;
    group: TimelineGroup;
    title: string;
    org: string;
    date?: string;
    details?: string;
    responsibilities?: string[];
    tools?: string[];
    highlights?: string[];
  };

  const items = useMemo<TimelineItem[]>(() => {
    const getList = (path: string) => {
      try {
        const value = t.raw(path);
        if (!Array.isArray(value)) return undefined;
        const list = value
          .filter((entry): entry is string => typeof entry === 'string')
          .map((entry) => entry.trim())
          .filter(Boolean);
        return list.length > 0 ? list : undefined;
      } catch {
        return undefined;
      }
    };

    const jobs: TimelineItem[] = [
      {
        id: 'exp-manicurist',
        type: 'experience',
        group: 'experience',
        title: t('jobs.manicurist.title'),
        org: t('jobs.manicurist.company'),
        date: t('jobs.manicurist.date'),
        details: t('jobs.manicurist.desc'),
        responsibilities: getList('jobs.manicurist.responsibilities'),
        tools: getList('jobs.manicurist.tools'),
        highlights: getList('jobs.manicurist.highlights'),
      },
      {
        id: 'exp-admin-assistant',
        type: 'experience',
        group: 'experience',
        title: t('jobs.admin_assistant.title'),
        org: t('jobs.admin_assistant.company'),
        date: t('jobs.admin_assistant.date'),
        details: t('jobs.admin_assistant.desc'),
        responsibilities: getList('jobs.admin_assistant.responsibilities'),
        tools: getList('jobs.admin_assistant.tools'),
        highlights: getList('jobs.admin_assistant.highlights'),
      },
      {
        id: 'exp-customer-service',
        type: 'experience',
        group: 'experience',
        title: t('jobs.customer_service.title'),
        org: t('jobs.customer_service.company'),
        date: t('jobs.customer_service.date'),
        details: t('jobs.customer_service.desc'),
        responsibilities: getList('jobs.customer_service.responsibilities'),
        tools: getList('jobs.customer_service.tools'),
        highlights: getList('jobs.customer_service.highlights'),
      },
      {
        id: 'exp-nail-tech',
        type: 'experience',
        group: 'experience',
        title: t('jobs.nail_tech.title'),
        org: t('jobs.nail_tech.company'),
        date: t('jobs.nail_tech.date'),
        details: t('jobs.nail_tech.desc'),
        responsibilities: getList('jobs.nail_tech.responsibilities'),
        tools: getList('jobs.nail_tech.tools'),
        highlights: getList('jobs.nail_tech.highlights'),
      },
    ];

    const education: TimelineItem[] = [
      {
        id: 'edu-software-eng',
        type: 'education',
        group: 'education',
        title: t('education.software_eng.title'),
        org: t('education.software_eng.institution'),
        date: t('education.software_eng.date'),
        details: t('education.software_eng.desc'),
        responsibilities: getList('education.software_eng.responsibilities'),
        tools: getList('education.software_eng.tools'),
        highlights: getList('education.software_eng.highlights'),
      },
      {
        id: 'edu-sena',
        type: 'education',
        group: 'education',
        title: t('education.sena.title'),
        org: t('education.sena.institution'),
        date: t('education.sena.date'),
      },
      {
        id: 'edu-beauty',
        type: 'education',
        group: 'education',
        title: t('education.beauty.title'),
        org: t('education.beauty.institution'),
        date: t('education.beauty.date'),
      },
      {
        id: 'edu-secondary',
        type: 'education',
        group: 'education',
        title: t('education.secondary.title'),
        org: t('education.secondary.institution'),
        date: t('education.secondary.date'),
      },
      {
        id: 'edu-primary',
        type: 'education',
        group: 'education',
        title: t('education.primary.title'),
        org: t('education.primary.institution'),
        date: t('education.primary.date'),
      },
    ];

    const complementary: TimelineItem[] = [
      {
        id: 'edu-comp-socioemotional',
        type: 'education',
        group: 'complementary',
        title: t('complementary.socioemotional.title'),
        org: t('complementary.socioemotional.institution'),
      },
      {
        id: 'edu-comp-convivencia',
        type: 'education',
        group: 'complementary',
        title: t('complementary.convivencia.title'),
        org: t('complementary.convivencia.institution'),
      },
      {
        id: 'edu-comp-entrepreneurship',
        type: 'education',
        group: 'complementary',
        title: t('complementary.entrepreneurship.title'),
        org: t('complementary.entrepreneurship.institution'),
      },
    ];

    return [...jobs, ...education, ...complementary];
  }, [t]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((i) => i.type === filter);
  }, [filter, items]);

  const stableIndexById = useMemo(() => new Map(items.map((item, index) => [item.id, index])), [items]);

  const rows = useMemo(() => {
    if (filter !== 'all') {
      return filteredItems.map((item) => ({ kind: 'item' as const, key: item.id, item }));
    }

    const exp = items.filter((i) => i.type === 'experience');
    const edu = items.filter((i) => i.type === 'education');
    const result: Array<
      | { kind: 'header'; key: string; label: string }
      | { kind: 'item'; key: string; item: TimelineItem }
    > = [];

    if (exp.length > 0) {
      result.push({ kind: 'header', key: 'hdr-exp', label: t('filters.experience') });
      exp.forEach((item) => result.push({ kind: 'item', key: item.id, item }));
    }
    if (edu.length > 0) {
      result.push({ kind: 'header', key: 'hdr-edu', label: t('filters.education') });
      edu.forEach((item) => result.push({ kind: 'item', key: item.id, item }));
    }
    return result;
  }, [filter, filteredItems, items, t]);

  const visibleRows = useMemo(() => {
    if (showAll) return rows;

    const takeCount = filter === 'all' ? 5 : 4;
    const out: typeof rows = [];
    let used = 0;

    for (const row of rows) {
      if (row.kind === 'header') {
        out.push(row);
        continue;
      }

      if (used >= takeCount) break;
      out.push(row);
      used += 1;
    }

    return out;
  }, [filter, rows, showAll]);

  const hiddenCount = useMemo(() => Math.max(0, rows.length - visibleRows.length), [rows.length, visibleRows.length]);

  useEffect(() => {
    const el = document.querySelector(`[data-timeline-item="${expandedId ?? ''}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [expandedId]);

  useEffect(() => {
    if (!expandedId) return;
    if (!filteredItems.some((item) => item.id === expandedId)) {
      setExpandedId(null);
      setExpandedPanel(null);
    }
  }, [expandedId, filteredItems]);

  useEffect(() => {
    setExpandedId(null);
    setExpandedPanel(null);
    setShowAll(false);
  }, [filter]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline-item]'));
    if (nodes.length === 0) return;

    ratiosRef.current = Object.fromEntries(nodes.map((n) => [n.dataset.timelineItem ?? '', 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.timelineItem ?? '';
          ratiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        const best = Object.entries(ratiosRef.current).sort((a, b) => b[1] - a[1])[0];
        if (!best) return;
        if (best[1] <= 0) return;
        setActiveId((prev) => (prev === best[0] ? prev : best[0]));
      },
      { root: null, rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.2, 0.35, 0.5, 0.7] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [filter, items.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.92', 'end 0.2'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const Tab = ({
    value,
    label,
  }: {
    value: 'all' | 'experience' | 'education';
    label: string;
  }) => {
    const isActive = filter === value;
    return (
      <button
        type="button"
        onClick={() => setFilter(value)}
        className="relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 transition-colors hover:text-wine"
      >
        {isActive ? (
          <motion.span
            layoutId="experience-tabs"
            className="absolute inset-0 rounded-full border border-wine/18 bg-wine/8 shadow-[0_18px_60px_rgba(109,0,6,0.10)] dark:border-white/10 dark:bg-white/5"
            transition={{ type: 'spring', stiffness: 520, damping: 44 }}
          />
        ) : null}
        <span className="relative">{label}</span>
      </button>
    );
  };

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="relative px-6 sm:px-8 lg:px-12 py-24 md:py-28 overflow-hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.16] dark:opacity-[0.20]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(109,0,6,0.22) 1px, transparent 1px), radial-gradient(rgba(192,129,107,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px, 54px 54px',
            backgroundPosition: '0 0, 12px 18px',
          }}
        />
        <div className="absolute -top-48 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-wine/10 blur-[140px] dark:bg-vino/14" />
      </div>
      <div className="mx-auto max-w-[100rem]">
        <SectionTitle number="05" title={t('title')} />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-wine/14 bg-background/55 px-3 py-2 shadow-[0_18px_60px_rgba(36,20,22,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <Tab value="all" label={t('filters.all')} />
            <Tab value="experience" label={t('filters.experience')} />
            <Tab value="education" label={t('filters.education')} />
          </div>
        </div>

        <div className="relative mt-14">
          <motion.div
            aria-hidden="true"
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-wine/35 via-wine/15 to-transparent md:left-1/2 md:-translate-x-1/2 dark:from-vino/45 dark:via-vino/22"
            style={{ scaleY: reduceMotion ? 1 : lineScale, opacity: 1 }}
          />
          {!reduceMotion ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(109,0,6,0.22), transparent)',
                filter: 'blur(0.5px)',
              }}
              animate={{ y: ['-12%', '12%'] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : null}
          {!reduceMotion ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-0 h-full w-px opacity-70 md:left-1/2 md:-translate-x-1/2"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(109,0,6,0.0) 0px, rgba(109,0,6,0.0) 10px, rgba(109,0,6,0.22) 10px, rgba(109,0,6,0.22) 16px)',
                backgroundSize: '1px 22px',
                filter: 'blur(0.4px)',
              }}
              animate={{ backgroundPositionY: ['0px', '44px'] }}
              transition={{ duration: 1.25, repeat: Infinity, ease: 'linear' }}
            />
          ) : null}

          <AnimatePresence mode="popLayout">
            <motion.div layout className="flex flex-col gap-10 md:gap-14">
              {visibleRows.map((row, rowIndex) => {
                if (row.kind === 'header') {
                  return (
                    <motion.div
                      key={row.key}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex items-center gap-4 pb-2 pt-4 md:pb-0 md:pt-8"
                    >
                      <div className="absolute left-4 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-wine/35 to-transparent md:left-1/2 md:-translate-x-1/2" />
                      <div className="mx-auto flex items-center gap-3 rounded-full border border-wine/14 bg-background/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 shadow-[0_18px_60px_rgba(36,20,22,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                        <span className="h-2 w-2 rounded-full bg-wine/80 shadow-[0_0_0_4px_rgba(109,0,6,0.14)] dark:bg-vino" />
                        {row.label}
                      </div>
                    </motion.div>
                  );
                }

                const item = row.item;
                const stableIndex = stableIndexById.get(item.id) ?? rowIndex;
                const sideLeft = stableIndex % 2 === 0;
                const dir = isDesktop ? (sideLeft ? -1 : 1) : 0;
                const isActive = activeId === item.id;
                const isHovered = hoveredId === item.id;
                const isExpanded = expandedId === item.id;
                const detailsSentences = (item.details ?? '')
                  .split('.')
                  .map((s) => s.trim())
                  .filter(Boolean);
                const summary = detailsSentences.length > 0 ? `${detailsSentences[0]}.` : item.details;
                const hasStructured = Boolean(
                  (item.responsibilities && item.responsibilities.length > 0) ||
                    (item.tools && item.tools.length > 0) ||
                    (item.highlights && item.highlights.length > 0)
                );
                const canExpand = Boolean(hasStructured || detailsSentences.length > 1);
                const showFullDetails = Boolean(
                  item.details &&
                    (detailsSentences.length > 1 ||
                      (!item.responsibilities?.length && !item.tools?.length && !item.highlights?.length))
                );
                const previewChips = [
                  ...(item.highlights ?? []),
                  ...(item.tools ?? []),
                  ...(item.responsibilities ?? []),
                ]
                  .map((entry) => entry.replace(/\.$/, '').trim())
                  .filter(Boolean)
                  .slice(0, 3);

                const Icon =
                  item.group === 'experience' ? Briefcase : item.group === 'education' ? GraduationCap : Award;
                const badge =
                  item.group === 'experience'
                    ? t('experience_title')
                    : item.group === 'education'
                      ? t('education_title')
                      : t('complementary_title');

                const focusMode = Boolean(activeId && filteredItems.some((i) => i.id === activeId));
                const soften = focusMode && !isActive && !isHovered;

                return (
                  <motion.div
                    key={row.key}
                    layout
                    custom={{ dir, delay: Math.min(stableIndex * 0.05, 0.3) }}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, margin: '0px 0px -18% 0px', amount: 0.25 }}
                    variants={{
                      hidden: ({ dir: d }: { dir: number }) => ({
                        opacity: 0,
                        y: 22,
                        x: reduceMotion ? 0 : d * 26,
                        filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
                      }),
                      visible: ({ delay }: { delay: number }) => ({
                        opacity: 1,
                        y: 0,
                        x: 0,
                        filter: 'blur(0px)',
                        transition: {
                          duration: reduceMotion ? 0.01 : 0.75,
                          delay: reduceMotion ? 0 : delay,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }),
                      exit: ({ dir: d }: { dir: number }) => ({
                        opacity: 0,
                        y: 12,
                        x: reduceMotion ? 0 : d * 18,
                        filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
                        transition: { duration: reduceMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] },
                      }),
                    }}
                    data-timeline-item={item.id}
                    className={['relative transition-opacity duration-500', soften ? 'opacity-60' : 'opacity-100'].join(
                      ' '
                    )}
                  >
                    <div className="absolute left-4 top-8 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                      {!reduceMotion ? (
                        <motion.div
                          animate={
                            isActive || isHovered
                              ? { scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }
                              : { scale: 1, opacity: 0.45 }
                          }
                          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(109,0,6,0.18)_0%,transparent_60%)] blur-[2px]"
                        />
                      ) : null}
                      <div
                        className={[
                          'relative h-3.5 w-3.5 rounded-full border border-background bg-wine shadow-[0_0_0_6px_rgba(109,0,6,0.10)] dark:bg-vino dark:shadow-[0_0_0_6px_rgba(138,28,31,0.10)]',
                          isActive || isHovered ? 'shadow-[0_0_0_7px_rgba(109,0,6,0.14)]' : '',
                        ].join(' ')}
                      />
                    </div>

                    <div className="md:grid md:grid-cols-2 md:gap-10">
                      <div className={sideLeft ? 'md:pr-10' : 'md:col-start-2 md:pl-10'}>
                        <motion.button
                          type="button"
                          layout
                          aria-expanded={canExpand ? isExpanded : undefined}
                          aria-controls={canExpand ? `${item.id}-details` : undefined}
                          onClick={() => {
                            if (!canExpand) return;
                            setExpandedId((v) => {
                              const next = v === item.id ? null : item.id;
                              if (!next) {
                                setExpandedPanel(null);
                                return next;
                              }

                              if (item.highlights?.length) {
                                setExpandedPanel('highlights');
                              } else if (item.responsibilities?.length) {
                                setExpandedPanel('responsibilities');
                              } else if (item.tools?.length) {
                                setExpandedPanel('tools');
                              } else if (showFullDetails) {
                                setExpandedPanel('full');
                              } else {
                                setExpandedPanel(null);
                              }

                              return next;
                            });
                          }}
                          onMouseEnter={() => setHoveredId(item.id)}
                          onMouseLeave={(e) => {
                            setHoveredId((v) => (v === item.id ? null : v));
                            e.currentTarget.style.setProperty('--mx', '50%');
                            e.currentTarget.style.setProperty('--my', '28%');
                          }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            e.currentTarget.style.setProperty('--mx', `${x}px`);
                            e.currentTarget.style.setProperty('--my', `${y}px`);
                          }}
                          style={
                            {
                              transformStyle: 'preserve-3d',
                              willChange: 'transform',
                              ['--mx' as string]: '50%',
                              ['--my' as string]: '28%',
                            } as React.CSSProperties
                          }
                          whileHover={reduceMotion ? undefined : { y: -8, rotateX: 2, rotateY: sideLeft ? -2 : 2 }}
                          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                          className={[
                            'group relative w-full overflow-hidden rounded-2xl border border-wine/16 bg-background/35 p-8 text-left shadow-[0_18px_70px_rgba(36,20,22,0.10)] backdrop-blur-md transition-all duration-500',
                            'hover:border-wine/34 hover:shadow-[0_30px_120px_rgba(109,0,6,0.18)]',
                            isActive ? 'ring-1 ring-wine/18' : 'ring-1 ring-wine/8',
                            soften ? 'brightness-[0.98] saturate-[0.98]' : 'brightness-100 saturate-100',
                            isActive ? 'md:scale-[1.01]' : '',
                            canExpand ? 'cursor-pointer' : 'cursor-default',
                          ].join(' ')}
                        >
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                'radial-gradient(240px circle at var(--mx) var(--my), rgba(109,0,6,0.18), transparent 62%)',
                              filter: 'blur(1px)',
                            }}
                          />
                          <div className="pointer-events-none absolute inset-0 opacity-70">
                            <div className="absolute inset-0 bg-[radial-gradient(720px_circle_at_16%_18%,rgba(109,0,6,0.12),transparent_55%),radial-gradient(760px_circle_at_86%_38%,rgba(192,129,107,0.10),transparent_60%)]" />
                          </div>
                          <div
                            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background: 'radial-gradient(circle, rgba(109,0,6,0.22) 0%, transparent 62%)',
                              filter: 'blur(28px)',
                            }}
                          />

                          <div className="relative flex flex-col gap-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-wine/14 bg-wine/10 text-wine shadow-[0_14px_45px_rgba(109,0,6,0.18)] transition-colors duration-500 group-hover:border-wine/26 dark:text-vino"
                                  animate={
                                    reduceMotion
                                      ? undefined
                                      : isActive || isHovered
                                        ? { rotate: [0, -6, 0, 6, 0] }
                                        : { rotate: 0 }
                                  }
                                  transition={
                                    reduceMotion
                                      ? undefined
                                      : { duration: 2.8, repeat: isActive || isHovered ? Infinity : 0, ease: 'easeInOut' }
                                  }
                                >
                                  <Icon className="h-5 w-5" />
                                </motion.div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-foreground/92 transition-colors duration-500 group-hover:text-foreground">
                                    {item.title}
                                  </div>
                                  <div className="mt-0.5 text-xs text-foreground/65 transition-colors duration-500 group-hover:text-foreground/80">
                                    {item.org}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="rounded-full border border-wine/12 bg-background/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-wine/70 backdrop-blur-sm">
                                  {badge}
                                </div>
                                {item.date ? (
                                  <div className="text-xs text-foreground/55 transition-colors duration-500 group-hover:text-foreground/70">
                                    {item.date}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            {summary ? (
                              <div className="text-sm leading-relaxed text-foreground/70 transition-colors duration-500 group-hover:text-foreground/82">
                                {summary}
                              </div>
                            ) : null}

                            {previewChips.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {previewChips.map((entry) => (
                                  <span
                                    key={entry}
                                    className="rounded-full border border-wine/14 bg-background/45 px-3 py-1 text-[11px] font-semibold text-foreground/80 backdrop-blur-sm transition-colors duration-500 group-hover:border-wine/24 group-hover:text-foreground/90"
                                  >
                                    {entry}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {canExpand ? (
                              <div className="flex items-center justify-between gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-wine/18 to-transparent" />
                                <div className="inline-flex items-center gap-2 rounded-full border border-wine/12 bg-background/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/75 backdrop-blur-sm">
                                  {isExpanded ? t('details.collapse') : t('details.expand')}
                                  <motion.span
                                    animate={reduceMotion ? undefined : { rotate: isExpanded ? 180 : 0 }}
                                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                                    className="text-wine/80"
                                  >
                                    <ChevronDown className="h-4 w-4" />
                                  </motion.span>
                                </div>
                              </div>
                            ) : null}

                            <AnimatePresence initial={false}>
                              {isExpanded ? (
                                <motion.div
                                  key="expanded"
                                  id={`${item.id}-details`}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  transition={{ duration: reduceMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                                  className="space-y-5"
                                >
                                  <div className="flex flex-wrap gap-2">
                                    {item.highlights?.length ? (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedPanel('highlights');
                                        }}
                                        className="relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80"
                                      >
                                        {expandedPanel === 'highlights' ? (
                                          <motion.span
                                            layoutId={`timeline-panel-${item.id}`}
                                            className="absolute inset-0 rounded-full border border-wine/18 bg-wine/10 shadow-[0_18px_60px_rgba(109,0,6,0.10)]"
                                            transition={{ type: 'spring', stiffness: 520, damping: 44 }}
                                          />
                                        ) : (
                                          <span className="absolute inset-0 rounded-full border border-wine/12 bg-background/45 backdrop-blur-sm" />
                                        )}
                                        <span className="relative">{t('details.highlights')}</span>
                                      </button>
                                    ) : null}

                                    {item.responsibilities?.length ? (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedPanel('responsibilities');
                                        }}
                                        className="relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80"
                                      >
                                        {expandedPanel === 'responsibilities' ? (
                                          <motion.span
                                            layoutId={`timeline-panel-${item.id}`}
                                            className="absolute inset-0 rounded-full border border-wine/18 bg-wine/10 shadow-[0_18px_60px_rgba(109,0,6,0.10)]"
                                            transition={{ type: 'spring', stiffness: 520, damping: 44 }}
                                          />
                                        ) : (
                                          <span className="absolute inset-0 rounded-full border border-wine/12 bg-background/45 backdrop-blur-sm" />
                                        )}
                                        <span className="relative">{t('details.responsibilities')}</span>
                                      </button>
                                    ) : null}

                                    {item.tools?.length ? (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedPanel('tools');
                                        }}
                                        className="relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80"
                                      >
                                        {expandedPanel === 'tools' ? (
                                          <motion.span
                                            layoutId={`timeline-panel-${item.id}`}
                                            className="absolute inset-0 rounded-full border border-wine/18 bg-wine/10 shadow-[0_18px_60px_rgba(109,0,6,0.10)]"
                                            transition={{ type: 'spring', stiffness: 520, damping: 44 }}
                                          />
                                        ) : (
                                          <span className="absolute inset-0 rounded-full border border-wine/12 bg-background/45 backdrop-blur-sm" />
                                        )}
                                        <span className="relative">{t('details.tools')}</span>
                                      </button>
                                    ) : null}

                                    {showFullDetails ? (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedPanel('full');
                                        }}
                                        className="relative rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80"
                                      >
                                        {expandedPanel === 'full' ? (
                                          <motion.span
                                            layoutId={`timeline-panel-${item.id}`}
                                            className="absolute inset-0 rounded-full border border-wine/18 bg-wine/10 shadow-[0_18px_60px_rgba(109,0,6,0.10)]"
                                            transition={{ type: 'spring', stiffness: 520, damping: 44 }}
                                          />
                                        ) : (
                                          <span className="absolute inset-0 rounded-full border border-wine/12 bg-background/45 backdrop-blur-sm" />
                                        )}
                                        <span className="relative">{t('details.expand')}</span>
                                      </button>
                                    ) : null}
                                  </div>

                                  <AnimatePresence mode="wait" initial={false}>
                                    {expandedPanel === 'full' && showFullDetails ? (
                                      <motion.div
                                        key="panel-full"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-sm leading-relaxed text-foreground/80"
                                      >
                                        {item.details}
                                      </motion.div>
                                    ) : null}

                                    {expandedPanel === 'responsibilities' && item.responsibilities?.length ? (
                                      <motion.ul
                                        key="panel-resp"
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        variants={{
                                          hidden: { opacity: 0 },
                                          show: {
                                            opacity: 1,
                                            transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
                                          },
                                        }}
                                        className="space-y-2 text-sm text-foreground/82"
                                      >
                                        {item.responsibilities.map((entry) => (
                                          <motion.li
                                            key={entry}
                                            variants={{
                                              hidden: { opacity: 0, y: 8 },
                                              show: { opacity: 1, y: 0 },
                                            }}
                                            className="flex gap-2"
                                          >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wine/70 dark:bg-vino" />
                                            <span className="leading-relaxed">{entry}</span>
                                          </motion.li>
                                        ))}
                                      </motion.ul>
                                    ) : null}

                                    {expandedPanel === 'highlights' && item.highlights?.length ? (
                                      <motion.ul
                                        key="panel-high"
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        variants={{
                                          hidden: { opacity: 0 },
                                          show: {
                                            opacity: 1,
                                            transition: { staggerChildren: reduceMotion ? 0 : 0.06 },
                                          },
                                        }}
                                        className="space-y-2 text-sm text-foreground/82"
                                      >
                                        {item.highlights.map((entry) => (
                                          <motion.li
                                            key={entry}
                                            variants={{
                                              hidden: { opacity: 0, y: 8 },
                                              show: { opacity: 1, y: 0 },
                                            }}
                                            className="flex gap-2"
                                          >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-wine/70 dark:bg-vino" />
                                            <span className="leading-relaxed">{entry}</span>
                                          </motion.li>
                                        ))}
                                      </motion.ul>
                                    ) : null}

                                    {expandedPanel === 'tools' && item.tools?.length ? (
                                      <motion.div
                                        key="panel-tools"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex flex-wrap gap-2"
                                      >
                                        {item.tools.map((entry) => (
                                          <span
                                            key={entry}
                                            className="rounded-full border border-wine/12 bg-background/45 px-3 py-1 text-xs font-semibold text-foreground/80 backdrop-blur-sm"
                                          >
                                            {entry}
                                          </span>
                                        ))}
                                      </motion.div>
                                    ) : null}
                                  </AnimatePresence>
                                </motion.div>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        </motion.button>
                      </div>
                      {sideLeft ? <div className="hidden md:block" /> : <div className="hidden md:block md:col-start-1" />}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {hiddenCount > 0 ? (
            <div className="mt-12 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group relative overflow-hidden rounded-full border border-wine/16 bg-background/55 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/85 shadow-[0_18px_60px_rgba(36,20,22,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/28 hover:text-wine hover:shadow-[0_26px_90px_rgba(109,0,6,0.18)]"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(420px circle at 50% 0%, rgba(109,0,6,0.16), transparent 60%)' }} />
                <span className="relative">
                  {t('list.showAll')} <span className="text-foreground/60">({hiddenCount})</span>
                </span>
              </button>
            </div>
          ) : showAll ? (
            <div className="mt-12 flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setShowAll(false);
                  setExpandedId(null);
                  setExpandedPanel(null);
                }}
                className="rounded-full border border-wine/14 bg-background/55 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/80 shadow-[0_18px_60px_rgba(36,20,22,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-wine/24 hover:text-wine"
              >
                {t('list.showLess')}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

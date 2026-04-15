"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer className="relative px-6 sm:px-8 lg:px-10 py-12">
      <div className="mx-auto max-w-[100rem]">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-wine/35 to-transparent dark:via-white/20" />
      </div>
      <div className="mx-auto mt-8 flex max-w-[100rem] items-center justify-center">
        <div className="relative flex flex-col items-center gap-4">
          <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(240px_circle_at_50%_50%,rgba(109,0,6,0.14),transparent_60%)] opacity-80 dark:bg-[radial-gradient(240px_circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-wine shadow-[0_0_0_4px_rgba(109,0,6,0.12)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-vino/80 shadow-[0_0_0_4px_rgba(138,28,31,0.10)]" />
            <span className="h-2 w-2 rounded-full bg-accent/70 shadow-[0_0_0_4px_rgba(192,129,107,0.12)]" />
          </div>
          <div className="inline-flex items-center justify-center rounded-full border border-wine/14 bg-background/55 px-5 py-2 text-sm text-foreground/70 shadow-[0_18px_60px_rgba(36,20,22,0.10)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            © 2026 Alejandra Montilla
          </div>
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/55">
            Portafolio
          </div>
        </div>
      </div>
    </footer>
  );
}

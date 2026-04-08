"use client";

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ContactLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const ContactLink = ({ href, icon: Icon, label }: ContactLinkProps) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="group flex items-center gap-4 text-foreground/70 transition-colors hover:text-primary"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
      <Icon className="h-5 w-5" />
    </div>
    <span>{label}</span>
  </a>
);

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(formData);
    alert(t('successMsg'));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contacto" className="relative px-6 py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />

      <div className="mx-auto max-w-7xl">
        <SectionTitle number="06" title={t('title')} />

        <div className="grid gap-16 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="font-serif text-3xl">{t('subtitle')}</h3>
            <p className="text-lg leading-relaxed text-foreground/70">
              {t('connectDesc')}
            </p>

            <div className="space-y-6">
              <ContactLink 
                href="mailto:tu@email.com" 
                icon={Mail} 
                label="tu@email.com" 
              />
              <ContactLink 
                href="https://linkedin.com/in/tu-perfil" 
                icon={Linkedin} 
                label="LinkedIn Profile" 
              />
              <ContactLink 
                href="https://github.com/tu-usuario" 
                icon={Github} 
                label="GitHub Profile" 
              />
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
              <input
                type="text"
                id="name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-primary"
                placeholder={t('namePlaceholder')}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
              <input
                type="email"
                id="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-primary"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-primary"
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50",
                isSubmitting && "cursor-not-allowed"
              )}
            >
              <Send className={cn("h-5 w-5", isSubmitting && "animate-pulse")} />
              {isSubmitting ? 'Enviando...' : t('send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


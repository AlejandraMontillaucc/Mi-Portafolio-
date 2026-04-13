"use client";

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

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
    className="group flex items-center gap-4 text-foreground/85 transition-colors hover:text-wine dark:hover:text-vino"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-wine/10 text-wine transition-all group-hover:bg-wine group-hover:text-white dark:bg-vino/15 dark:text-vino dark:group-hover:bg-vino">
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
    <section id="contacto" className="relative px-6 sm:px-8 lg:px-10 py-24 md:py-28">
      <div className="mx-auto max-w-[90rem]">
        <SectionTitle number="06" title={t('title')} />

        <div className="grid gap-16 md:grid-cols-2">
          {/* Contact Info */}
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
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">{t('name')}</label>
              <input
                type="text"
                id="name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-wine"
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
                className="w-full rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-wine"
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
                className="w-full resize-none rounded-xl border border-transparent bg-card px-4 py-3 outline-none transition-all focus:border-wine"
                placeholder={t('messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-xl bg-wine py-4 font-medium text-white transition-all duration-300 hover:bg-vino hover:shadow-[0_20px_55px_rgba(109,0,6,0.26)] disabled:opacity-50",
                isSubmitting && "cursor-not-allowed"
              )}
            >
              <Send className={cn("h-5 w-5", isSubmitting && "animate-pulse")} />
              {isSubmitting ? 'Enviando...' : t('send')}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

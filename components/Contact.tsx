'use client'
import { Mail, Send } from 'lucide-react'
import { GitBranch } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('successMsg'))
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contacto" className="py-32 px-6 bg-muted relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-primary text-sm tracking-widest uppercase">06</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">{t('title')}</h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Info contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif mb-6">{t('connect')}</h3>
              <p className="text-foreground/70 mb-8">{t('connectDesc')}</p>
            </div>

            <div className="space-y-4">
              <a href="mailto:tu@email.com" className="flex items-center gap-4 p-4 bg-background rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-foreground/60 text-sm">tu@email.com</div>
                </div>
              </a>

              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-background rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-foreground/60 text-sm">@tuusuario</div>
                </div>
              </a>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-background p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">{t('name')}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t('namePlaceholder')} />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">{t('email')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={t('emailPlaceholder')} />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">{t('message')}</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder={t('messagePlaceholder')} />
              </div>

              <button type="submit" className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2">
                {t('send')}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
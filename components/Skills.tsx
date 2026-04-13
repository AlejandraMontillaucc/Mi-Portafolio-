"use client";

import React from 'react';
import { 
  FileCode2, 
  Palette, 
  Cpu, 
  Atom, 
  Zap, 
  Wind, 
  GitBranch, 
  Github 
} from 'lucide-react';
import SectionTitle from './SectionTitle';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';

export default function Skills() {
  const t = useTranslations('skills');

  const categories = [
    {
      title: t('frontend'),
      skills: [
        { name: 'HTML', icon: FileCode2 },
        { name: 'CSS', icon: Palette },
        { name: 'JavaScript', icon: Cpu },
        { name: 'React', icon: Atom },
        { name: 'Next.js', icon: Zap },
        { name: 'Tailwind CSS', icon: Wind },
      ],
    },
    {
      title: t('tools'),
      skills: [
        { name: 'Git', icon: GitBranch },
        { name: 'GitHub', icon: Github },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="habilidades" className="relative px-6 py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionTitle 
          number="03" 
          title={t('title')} 
          subtitle={t('subtitle')}
        />

        <div className="grid gap-12 md:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <h3 className="inline-block border-b-2 border-wine/25 pb-2 text-2xl font-serif">
                {category.title}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, translateY: -5 }}
                    className="group flex items-center gap-3 rounded-xl border border-wine/12 bg-card px-5 py-3 shadow-sm transition-all duration-300 hover:border-wine/28 hover:bg-accent/30 hover:shadow-md"
                  >
                    <skill.icon className="h-5 w-5 text-wine/85 transition-colors group-hover:text-vino" />
                    <span className="font-medium text-foreground/90 group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

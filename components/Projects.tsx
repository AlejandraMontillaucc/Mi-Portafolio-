'use client'
import { ExternalLink, GitBranch } from 'lucide-react'
import { useTranslations } from 'next-intl'

const projects = [
  {
    title: 'E-Commerce Platform',
    descKey: 'p1',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Task Management App',
    descKey: 'p2',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    tags: ['TypeScript', 'Firebase', 'Tailwind CSS'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Portfolio CMS',
    descKey: 'p3',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    tags: ['Next.js', 'PostgreSQL', 'Prisma'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Health & Fitness Tracker',
    descKey: 'p4',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
    tags: ['React Native', 'Express', 'Chart.js'],
    github: '#',
    demo: '#',
  },
  {
    title: 'AI Blog Generator',
    descKey: 'p5',
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=600&fit=crop',
    tags: ['Python', 'OpenAI API', 'Flask'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Real Estate Platform',
    descKey: 'p6',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    tags: ['Vue.js', 'Mapbox', 'Supabase'],
    github: '#',
    demo: '#',
  },
]

export default function Projects() {
  const t = useTranslations('projects')

  return (
    <section id="proyectos" className="py-32 px-6 bg-muted relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-border"></div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-primary text-sm tracking-widest uppercase">02</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">{t('title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-background rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-transparent hover:border-primary transition-all duration-300 group">
              <div className="relative overflow-hidden h-64">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                  <a href={project.github} className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform" aria-label="GitHub">
                    <GitBranch className="w-5 h-5" />
                  </a>
                  <a href={project.demo} className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform" aria-label="Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-serif">{project.title}</h3>
                <p className="text-foreground/70">{t(project.descKey)}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
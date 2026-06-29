import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projects, CATEGORIES, type Project, type Category } from '../data/projectsData';

interface Section03Props {
  onProjectClick?: (slug: string) => void;
}

export const Section03 = ({ onProjectClick }: Section03Props) => {
  const [activeFilter, setActiveFilter] = useState<Category>('Todos');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Extract unique categories from the data (for dynamic use with CMS)
  const availableCategories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return CATEGORIES.filter((c) => c === 'Todos' || cats.has(c));
  }, []);

  return (
    <section className="min-h-screen pt-36 pb-24 px-8 md:px-24 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">
              Portfólio
            </span>
            <h2 className="font-serif text-[46px] md:text-[70px] tracking-tighter leading-[0.9]">
              Projetos
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-muted max-w-xs leading-relaxed font-light opacity-70"
          >
            Uma seleção de trabalhos que definem a nossa visão arquitetónica.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-1 mb-16 border-b border-ink/5 pb-4"
        >
          <LayoutGroup id="portfolio-filters">
            {availableCategories.map((category) => {
              const isActive = activeFilter === category;
              const count =
                category === 'Todos'
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className="relative px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold transition-all duration-500 cursor-pointer"
                  style={{
                    color: isActive ? 'var(--accent-color)' : 'var(--ink-color)',
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  <span className="relative z-10">
                    {category}
                    <span
                      className="ml-1.5 text-[8px] font-mono opacity-50"
                      style={{ opacity: isActive ? 0.7 : 0.3 }}
                    >
                      {String(count).padStart(2, '0')}
                    </span>
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="filter-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </LayoutGroup>
        </motion.div>

        {/* Projects Grid */}
        <LayoutGroup id="portfolio-grid">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => onProjectClick?.(project.slug)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Results count */}
        <motion.div
          layout
          className="mt-16 flex items-center justify-between border-t border-ink/5 pt-8"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
            {activeFilter !== 'Todos' && (
              <span className="ml-1">
                em {activeFilter}
              </span>
            )}
          </p>

          {activeFilter !== 'Todos' && (
            <button
              onClick={() => setActiveFilter('Todos')}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent hover:opacity-70 transition-opacity cursor-pointer"
            >
              Ver todos
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Project Card Component
   ───────────────────────────────────────────── */

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  // Make the first project span 2 columns on large screens
  const isLarge = index === 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { type: 'spring', bounce: 0.1, duration: 0.6 },
        opacity: { duration: 0.4, delay: index * 0.05 },
        y: { duration: 0.5, delay: index * 0.05 },
      }}
      onClick={onClick}
      className={`group relative cursor-pointer ${
        isLarge ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div
        className={`overflow-hidden rounded-sm relative ${
          isLarge
            ? 'aspect-[16/9] md:aspect-[2/1]'
            : 'aspect-[4/5] md:aspect-[3/4]'
        }`}
      >
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Project Info Overlay (hover) */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Top: Category + Arrow */}
          <div className="flex justify-between items-start translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold bg-accent/80 backdrop-blur-sm px-3 py-1 rounded-sm">
              {project.category}
            </span>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom: Title + Year */}
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2 block">
              {project.location} — {project.year}
            </span>
            <h3
              className={`font-serif tracking-tight ${
                isLarge ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'
              }`}
            >
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Mobile Info (always visible on mobile) */}
      <div className="mt-4 md:mt-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg md:text-xl font-serif tracking-tight group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h3>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-accent/80 mt-1">
              {project.category}
            </p>
          </div>
          <span className="text-[10px] font-mono opacity-30 mt-1">
            {project.year}
          </span>
        </div>
        <div className="w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700 mt-3" />
      </div>
    </motion.article>
  );
};

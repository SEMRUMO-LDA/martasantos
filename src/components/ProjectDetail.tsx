import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/projectsData';
import { ProjectGallery } from './ProjectGallery';

interface ProjectDetailProps {
  slug: string | null;
  onClose: () => void;
  onSelectProject: (slug: string) => void;
}

export const ProjectDetail = ({ slug, onClose, onSelectProject }: ProjectDetailProps) => {
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    if (slug) {
      const found = projects.find((p) => p.slug === slug);
      if (found) setActiveProject(found);
    }
  }, [slug]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (slug) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [slug]);

  // Escape key to close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activeProject) return null;

  const project = activeProject;

  // Find next/prev projects for quick navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/98 backdrop-blur-xl flex flex-col md:flex-row text-white"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-[60] w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 group cursor-pointer shadow-sm text-white"
          aria-label="Fechar lightbox"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>

        {/* Left Side: Photo Gallery (Sticky on desktop) */}
        <div className="w-full md:w-[60%] lg:w-[65%] h-[50vh] md:h-full p-6 md:p-12 lg:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
          <ProjectGallery images={project.gallery} title={project.title} />
        </div>

        {/* Right Side: Project Details & Scrollable Text */}
        <div className="w-full md:w-[40%] lg:w-[35%] h-[50vh] md:h-full overflow-y-auto custom-scrollbar flex flex-col justify-between p-8 md:p-12 lg:p-16">
          <div className="flex flex-col gap-10">
            {/* Header / Category */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">
                {project.category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-tight font-light text-white">
                {project.title}
              </h2>
            </div>

            {/* Project Specs Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-8">
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1 text-white">
                  Localização
                </span>
                <span className="text-xs font-light tracking-wide text-white/90">{project.location}</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1 text-white">
                  Ano
                </span>
                <span className="text-xs font-mono font-bold text-white/95">{project.year}</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1 text-white">
                  Área
                </span>
                <span className="text-xs font-light tracking-wide text-white/90">{project.area}</span>
              </div>
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1 text-white">
                  Fase
                </span>
                <span className="text-xs font-light tracking-wide text-white/90">Concluído</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-4 text-white">
                Descrição do Projeto
              </span>
              <p className="text-sm font-light text-white/80 leading-relaxed whitespace-pre-line opacity-95">
                {project.description}
              </p>
            </div>
          </div>

          {/* Bottom Quick Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col gap-4">
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 text-white">
              Navegar Projetos
            </span>
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={() => onSelectProject(prevProject.slug)}
                className="flex flex-col items-start text-left group max-w-[45%] cursor-pointer"
              >
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] font-bold text-accent group-hover:-translate-x-1 transition-transform duration-300">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </div>
                <span className="text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-white transition-all duration-300 truncate w-full mt-1 text-white/80">
                  {prevProject.title}
                </span>
              </button>

              <button
                onClick={() => onSelectProject(nextProject.slug)}
                className="flex flex-col items-end text-right group max-w-[45%] cursor-pointer"
              >
                <div className="flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] font-bold text-accent group-hover:translate-x-1 transition-transform duration-300">
                  <span>Seguinte</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-white transition-all duration-300 truncate w-full mt-1 text-white/80">
                  {nextProject.title}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

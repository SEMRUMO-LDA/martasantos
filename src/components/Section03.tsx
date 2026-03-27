import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const Section03 = () => {
  const projects = [
    {
      title: "Casa na Comporta",
      category: "Residencial",
      year: "2024",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
      size: "large"
    },
    {
      title: "Apartamento Chiado",
      category: "Renovação",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      size: "small"
    },
    {
      title: "Escritório LX",
      category: "Comercial",
      year: "2024",
      image: "https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=1000&auto=format&fit=crop",
      size: "medium"
    },
    {
      title: "Villa Algarve",
      category: "Residencial",
      year: "2022",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop",
      size: "medium"
    }
  ];

  return (
    <section className="min-h-screen pt-36 pb-24 px-8 md:px-24 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">Portfólio</span>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter">Projetos <br /> Selecionados</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-muted max-w-xs leading-relaxed font-light opacity-70"
          >
            Uma seleção de trabalhos que definem a nossa visão arquitetónica, onde cada linha conta uma história de luz e espaço.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group relative cursor-pointer"
              data-cursor-text="Ver Projeto"
            >
              <div className="aspect-[4/5] md:aspect-auto md:h-[500px] overflow-hidden rounded-sm relative shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Project Info Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-bg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold bg-accent/90 px-4 py-1.5 rounded-md">{project.category}</span>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-70 mb-2 block">{project.year}</span>
                    <h3 className="text-3xl md:text-5xl font-serif">{project.title}</h3>
                  </div>
                </div>
              </div>

              {/* Mobile Info */}
              <div className="mt-6 md:hidden">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-serif">{project.title}</h3>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">{project.year}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-accent mt-1">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 flex justify-center pb-12"
        >
          <Magnetic strength={0.2}>
            <button className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:text-accent transition-colors">
              Explorar Todos os Projetos
              <div className="w-12 h-[1px] bg-current group-hover:w-20 transition-all duration-500" />
            </button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};

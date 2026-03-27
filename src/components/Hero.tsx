import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero = ({ onCtaClick }: HeroProps) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="h-screen pt-32 pb-16 px-8 md:px-24 flex flex-col justify-center relative bg-bg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Image with Parallax */}
        <motion.div 
          style={{ y: y1, opacity }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <Magnetic strength={0.2}>
            <div className="absolute -top-12 left-0 w-12 h-12 border border-ink/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-ink hover:text-bg transition-all duration-500 group">
              <ArrowRight className="w-5 h-5 -rotate-45 group-hover:scale-110 transition-transform" />
            </div>
          </Magnetic>
          <div className="aspect-[3/2] overflow-hidden rounded-sm shadow-xl">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
              alt="Architecture Detail" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Center/Right Content */}
        <div className="lg:col-span-7 flex flex-col gap-12 pl-0 lg:pl-12">
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <h1 className="font-serif text-6xl md:text-[120px] leading-[0.8] tracking-tighter mb-8">
              Atelier <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1.5px var(--ink-color)',
                  paintOrder: 'stroke fill'
                }}
              >
                Arquitectura
              </span>
            </h1>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="flex flex-col gap-8"
            >
              <p className="text-[13px] text-muted leading-relaxed font-light max-w-sm">
                Marta Santos Arquitecta é um atelier focado na criação de espaços que equilibram funcionalidade, estética e sustentabilidade. A nossa abordagem é guiada pela simplicidade e pela atenção ao detalhe, transformando cada projeto numa experiência única e intemporal.
              </p>
              <Magnetic strength={0.1}>
                <button 
                  onClick={onCtaClick}
                  className="w-fit px-14 py-5 border border-accent text-[11px] uppercase tracking-[0.3em] font-bold rounded-lg hover:bg-accent hover:text-bg transition-all duration-700 relative overflow-hidden group"
                >
                  <span className="relative z-10">Processo</span>
                  <motion.div 
                    className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  />
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="flex flex-col gap-8"
            >
              <p className="text-[13px] text-muted leading-relaxed font-light italic opacity-60">
                "Uma coleção de estruturas minimalistas. A apresentação de espaços arquitetónicos de excelência. Explore o meu trabalho e a metodologia por trás de cada projeto, onde a luz e a matéria se fundem em harmonia."
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-12 left-8 md:left-24 flex items-center gap-6 text-[11px] uppercase tracking-[0.3em] font-bold text-muted">
        <Magnetic strength={0.2}>
          <span className="cursor-pointer hover:text-accent transition-colors">VAMOS REUNIR?</span>
        </Magnetic>
        <span className="opacity-20">/</span>
        <Magnetic strength={0.2}>
          <span className="cursor-pointer hover:text-accent transition-colors">CONHECER PORTFÓLIO</span>
        </Magnetic>
      </div>

      {/* Vertical Line & Number with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 right-12 flex flex-col items-center gap-6"
      >
        <span className="text-[12px] font-mono opacity-20 vertical-text tracking-[0.5em] font-bold">01</span>
        <div className="w-[1px] h-32 bg-ink/10" />
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-light/30 -z-0 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
    </section>
  );
};

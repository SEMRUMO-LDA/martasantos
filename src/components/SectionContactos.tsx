import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const SectionContactos = () => {
  return (
    <section className="min-h-screen py-32 px-8 md:px-24 bg-bg text-ink relative overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-8 block">Contactos</span>
              <h2 className="font-serif text-6xl md:text-[110px] leading-[0.85] tracking-tighter mb-20">
                Vamos <br /> <span className="text-transparent stroke-ink stroke-1" style={{ WebkitTextStroke: '1px var(--ink-color)' }}>Reunir?</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Email</span>
                  <Magnetic strength={0.1}>
                    <a href="mailto:info@martasantos.pt" className="flex items-center gap-4 text-xl md:text-3xl font-serif hover:text-accent transition-colors group">
                      <Mail className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                      info@martasantos.pt
                    </a>
                  </Magnetic>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Telefone</span>
                  <Magnetic strength={0.1}>
                    <a href="tel:+351912345678" className="flex items-center gap-4 text-xl md:text-3xl font-serif hover:text-accent transition-colors group">
                      <Phone className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" />
                      +351 912 345 678
                    </a>
                  </Magnetic>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Localização</span>
                  <div className="flex items-center gap-4 text-xl md:text-3xl font-serif">
                    <MapPin className="w-5 h-5 opacity-20" />
                    Lisboa, Portugal
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30">Social</span>
                  <div className="flex gap-6 text-xl md:text-3xl font-serif">
                    <Magnetic strength={0.2}>
                      <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <a href="#" className="hover:text-accent transition-colors">Linkedin</a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="aspect-square border border-ink/10 rounded-lg p-12 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-serif mb-6">Pronto para começar o seu projeto?</h3>
                <p className="text-xs opacity-40 leading-relaxed font-light max-w-xs mb-12">
                  Estamos disponíveis para novos desafios e colaborações. Entre em contacto connosco para agendar uma reunião inicial.
                </p>
                <Magnetic strength={0.2}>
                  <button className="px-12 py-5 bg-ink text-bg text-[11px] uppercase tracking-[0.3em] font-bold rounded-lg hover:bg-accent hover:text-white transition-all duration-500 flex items-center gap-4 group/btn">
                    Enviar Mensagem
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </Magnetic>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vertical Line & Number */}
      <div className="absolute top-1/4 right-12 flex flex-col items-center gap-6">
        <span className="text-[12px] font-mono opacity-20 vertical-text tracking-[0.5em] font-bold">05</span>
        <div className="w-[1px] h-32 bg-ink/10" />
      </div>
    </section>
  );
};

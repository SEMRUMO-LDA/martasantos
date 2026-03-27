import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const SectionContactos = () => {
  return (
    <section className="min-h-screen pt-36 pb-24 px-8 md:px-24 bg-bg text-ink relative overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-6 block">Contactos</span>
              <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-16">
                Vamos <br /> Reunir?
              </h2>

              <div className="space-y-10">
                <div className="flex items-center gap-5">
                  <Mail className="w-6 h-6 opacity-20 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 block mb-2">Email</span>
                    <Magnetic strength={0.1}>
                      <a href="mailto:info@martasantos.pt" className="text-xl md:text-2xl font-serif hover:text-accent transition-colors block">
                        info@martasantos.pt
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <Phone className="w-6 h-6 opacity-20 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 block mb-2">Telefone</span>
                    <Magnetic strength={0.1}>
                      <a href="tel:+351912345678" className="text-xl md:text-2xl font-serif hover:text-accent transition-colors block">
                        +351 912 345 678
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <MapPin className="w-6 h-6 opacity-20 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 block mb-2">Localização</span>
                    <div className="text-xl md:text-2xl font-serif">
                      Lisboa, Portugal
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-ink/5">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30 block mb-4">Social</span>
                  <div className="flex gap-6 text-lg font-serif">
                    <Magnetic strength={0.2}>
                      <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
                        <Instagram className="w-4 h-4 opacity-40" />
                        Instagram
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
                        <Linkedin className="w-4 h-4 opacity-40" />
                        Linkedin
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="border border-ink/10 rounded-2xl p-10 md:p-14 relative overflow-hidden group bg-gradient-to-br from-bg to-accent-light/20"
            >
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-serif mb-5 leading-tight">Pronto para começar o seu projeto?</h3>
                <p className="text-sm opacity-50 leading-relaxed mb-10 max-w-md">
                  Estamos disponíveis para novos desafios e colaborações. Entre em contacto connosco para agendar uma reunião inicial.
                </p>
                <Magnetic strength={0.2}>
                  <button className="px-16 py-4 rounded-full border border-accent/60 text-accent font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-accent hover:text-bg transition-all duration-300 backdrop-blur-sm whitespace-nowrap flex items-center gap-3 group/btn relative overflow-hidden">
                    <span className="relative z-10">Vamos Reunir?</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-accent/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Magnetic } from './Magnetic';

export const Section02 = () => {
  const steps = [
    {
      number: "01",
      title: "Conceito",
      description: "A primeira fase onde exploramos as ideias base, o contexto e as necessidades do cliente para definir a alma do projeto."
    },
    {
      number: "02",
      title: "Desenvolvimento",
      description: "Transformamos o conceito em planos técnicos detalhados, escolhendo materiais e refinando cada pormenor construtivo."
    },
    {
      number: "03",
      title: "Execução",
      description: "O acompanhamento rigoroso da obra garante que a visão inicial se materializa com a máxima qualidade e fidelidade ao design."
    }
  ];

  return (
    <section className="min-h-screen py-32 px-8 md:px-24 bg-accent-dark text-bg relative overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.05] select-none">
        <h2 className="text-[20vw] font-serif leading-none uppercase tracking-tighter">Metodologia</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">O Nosso Método</span>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-8">Processo <br /> Criativo</h2>
              <p className="text-xs opacity-60 leading-relaxed font-light max-w-xs">
                Acreditamos que a boa arquitetura nasce de um diálogo constante entre o sonho e a realidade técnica.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8 space-y-24 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start group border-t border-white/5 pt-12"
              >
                <div className="md:col-span-2">
                  <span className="text-5xl md:text-7xl font-serif opacity-10 group-hover:opacity-100 group-hover:text-accent transition-all duration-1000">{step.number}</span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-3xl md:text-5xl font-serif mb-6 group-hover:translate-x-6 transition-transform duration-1000">{step.title}</h3>
                  <p className="text-sm md:text-lg opacity-40 leading-relaxed font-light max-w-xl group-hover:opacity-100 transition-opacity duration-1000">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-[10%] w-32 h-32 border border-white/5 rounded-full"
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 left-[5%] w-48 h-48 border border-white/5 rounded-full"
      />
    </section>
  );
};


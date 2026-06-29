import React from 'react';
import { motion } from 'motion/react';

export const SectionParceiros = () => {
  const partners = [
    "Empresa 1",
    "Empresa 2",
    "Empresa 3",
    "Empresa 4",
    "Empresa 5",
    "Empresa 6"
  ];

  return (
    <section className="min-h-screen bg-accent-dark text-bg px-8 md:px-24 pt-36 pb-32 relative overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">Rede de Excelência</span>
            <h2 className="font-serif text-[46px] md:text-[70px] tracking-tighter">Parceiros</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-bg/60 max-w-xs leading-relaxed font-light"
          >
            Trabalhamos com os melhores especialistas para garantir que cada detalhe do seu projeto é executado com precisão.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-6 cursor-pointer">
                <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">0{index + 1}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold group-hover:text-accent transition-colors duration-500">{partner}</span>
                  <div className="w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700 mt-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

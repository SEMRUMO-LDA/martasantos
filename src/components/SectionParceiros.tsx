import React from 'react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';

export const SectionParceiros = () => {
  const partners = [
    "Structural Design Co.",
    "Urban Materials",
    "Eco Build Systems",
    "Modern Glass Works",
    "Precision Engineering",
    "Aesthetic Interiors"
  ];

  return (
    <section className="min-h-screen bg-accent-dark text-bg px-8 md:px-24 py-32 relative overflow-hidden flex flex-col justify-center">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.05] select-none">
        <h2 className="text-[20vw] font-serif leading-none uppercase tracking-tighter">Colaboração</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">Parceiros</span>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter">Rede de <br /> Excelência</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs text-bg/60 max-w-xs leading-relaxed font-light"
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
              <Magnetic strength={0.1}>
                <div className="flex items-center gap-6 cursor-pointer">
                  <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">0{index + 1}</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.3em] font-bold group-hover:text-accent transition-colors duration-500">{partner}</span>
                    <div className="w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700 mt-2" />
                  </div>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vertical Line & Number */}
      <div className="absolute top-1/4 right-12 flex flex-col items-center gap-6">
        <span className="text-[12px] font-mono opacity-20 vertical-text tracking-[0.5em] font-bold">04</span>
        <div className="w-[1px] h-32 bg-white/10" />
      </div>
    </section>
  );
};

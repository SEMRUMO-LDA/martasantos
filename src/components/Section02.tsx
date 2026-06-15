import React from 'react';
import { motion } from 'motion/react';

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
    <section className="min-h-screen bg-accent-dark text-bg px-8 md:px-24 pt-36 pb-32 relative overflow-hidden flex flex-col">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4 block">O Nosso Método</span>
            <h2 className="font-serif text-[46px] md:text-[70px] tracking-tighter">Processo</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs text-bg/60 max-w-xs leading-relaxed font-light"
          >
            Acreditamos que a boa arquitetura nasce de um diálogo constante entre o sonho e a realidade técnica.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-6">
                <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-500">{step.number}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-bold group-hover:text-accent transition-colors duration-500">{step.title}</span>
                  <div className="w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-700 mt-2" />
                  <p className="text-xs text-bg/40 leading-relaxed font-light mt-4 group-hover:text-bg/80 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

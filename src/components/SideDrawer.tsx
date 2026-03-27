import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionChange: (index: number) => void;
}

export const SideDrawer = ({ isOpen, onClose, onSectionChange }: SideDrawerProps) => {
  const links = ["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-accent-dark/80 backdrop-blur-xl text-bg z-[70] p-12 flex flex-col shadow-2xl border-l border-white/10"
          >
            <div className="flex justify-end mb-8">
              <Magnetic strength={0.4}>
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </Magnetic>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-8 pb-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4">Navegação</h3>
                  <div className="flex flex-col gap-2">
                    {links.map((link, index) => (
                      <button 
                        key={link}
                        onClick={() => {
                          onSectionChange(index);
                          onClose();
                        }}
                        className="text-xl font-display text-left hover:text-accent transition-all hover:translate-x-2 duration-500"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>


                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4">Contactos</h3>
                  <div className="space-y-3 text-xs opacity-70">
                    <Magnetic strength={0.1}>
                      <a href="mailto:info@martasantos.pt" className="flex items-center gap-3 hover:text-accent transition-colors">
                        <Mail className="w-4 h-4" />
                        info@martasantos.pt
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.1}>
                      <a href="tel:+351912345678" className="flex items-center gap-3 hover:text-accent transition-colors">
                        <Phone className="w-4 h-4" />
                        +351 912 345 678
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent mb-4">Siga-nos</h3>
                  <div className="flex gap-6">
                    <Magnetic strength={0.3}>
                      <a href="#" className="opacity-50 hover:opacity-100 hover:text-accent transition-all">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                      <a href="#" className="opacity-50 hover:opacity-100 hover:text-accent transition-all">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4 mt-auto">
              <div className="flex flex-col gap-2">
                <a href="#" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Política de Privacidade
                </a>
                <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 hover:text-accent transition-all">
                  Livro de Reclamações Online
                </a>
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-40">
                © 2026 Marta Santos Arquitecta<br />
                Todos os direitos reservados.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

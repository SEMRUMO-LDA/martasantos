import React from 'react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';
import logoDark from '../assets/logo-dark.png';
import logoWhite from '../assets/logo-white.png';

interface NavbarProps {
  activeSection: number;
  onSectionChange: (index: number) => void;
  onMenuToggle: () => void;
  theme: string;
}

export const Navbar = ({ activeSection, onSectionChange, onMenuToggle, theme }: NavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const links = ["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"];

  // Detectar qual cor de texto usar baseado no fundo
  // Seções com fundo ESCURO (devem ter texto branco): Processo (1) e Parceiros (3)
  // Seções com fundo CLARO (devem ter texto preto): Hero (0), Projetos (2), Contactos (4)
  const isDarkSection = activeSection === 1 || activeSection === 3; // bg-accent-dark
  const useWhiteText = isDarkSection;

  // Logo: usar WHITE em fundos escuros, DARK em fundos claros
  const useDarkLogo = !useWhiteText;

  return (
    <nav className="fixed top-6 left-0 w-full z-50 pointer-events-none px-8 md:px-24">
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between px-6 py-2.5 rounded-full border transition-all duration-700 ease-out"
          style={{
            background: useWhiteText
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(80px) saturate(200%)',
            WebkitBackdropFilter: 'blur(80px) saturate(200%)',
            border: useWhiteText
              ? '1px solid rgba(255, 255, 255, 0.18)'
              : '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: useWhiteText
              ? '0 8px 32px -8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
              : '0 8px 32px -8px rgba(31, 38, 135, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
          }}
        >
          {/* Logo alinhado à esquerda do contentor (que está alinhado à grelha) */}
          <div className="flex items-center gap-5">
            {/* Traço vertical mais forte para equilíbrio visual - Lado Esquerdo */}
            <div className="w-[2px] h-5 bg-accent hidden md:block" />
            
            <Magnetic strength={0.06}>
              <button
                onClick={() => onSectionChange(0)}
                className="cursor-pointer block transition-all duration-300 hover:opacity-100"
              >
                <img
                  src={useDarkLogo ? logoDark : logoWhite}
                  alt="Marta Santos"
                  className="w-28 sm:w-32 md:w-36 h-auto transition-all duration-500 opacity-90"
                />
              </button>
            </Magnetic>
          </div>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, index) => (
              <Magnetic key={link} strength={0.05}>
                <button
                  onClick={() => onSectionChange(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative px-5 py-2 text-[10px] uppercase tracking-[0.1em] font-bold cursor-pointer z-10 transition-all duration-700 ease-out"
                  style={{
                    color: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                    opacity: activeSection === index ? 1 : (hoveredIndex === index ? 0.85 : 0.5),
                  }}
                >
                  <span className="relative">{link}</span>
                  {activeSection === index && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-accent"
                      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    />
                  )}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Hamburger island — hidden on desktop */}
          <div className="md:hidden flex items-center pr-2">
            <Magnetic strength={0.15}>
              <button
                onClick={onMenuToggle}
                className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1 group transition-all duration-700 ease-out"
              >
                <span
                  className="block w-4 h-[1px] transition-all duration-700 ease-out group-hover:w-5 group-hover:bg-accent"
                  style={{
                    backgroundColor: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                    opacity: 0.7
                  }}
                />
                <span
                  className="block w-4 h-[1px] transition-all duration-700 ease-out group-hover:w-3 group-hover:bg-accent"
                  style={{
                    backgroundColor: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                    opacity: 0.7
                  }}
                />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

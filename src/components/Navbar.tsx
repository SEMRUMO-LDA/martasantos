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
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Logo no canto superior esquerdo - alinhado verticalmente com o menu */}
      <div className="fixed top-6 left-8 md:left-12 pointer-events-auto">
        <div className="flex items-center h-[38px]">
          <Magnetic strength={0.06}>
            <motion.button
              onClick={() => onSectionChange(0)}
              className="cursor-pointer block"
              whileHover={{ scale: 1.02, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              <motion.img
                key={useDarkLogo ? 'dark' : 'white'}
                src={useDarkLogo ? logoDark : logoWhite}
                alt="Marta Santos"
                className="w-28 sm:w-32 md:w-36 lg:w-40 h-auto transition-all duration-500"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1))'
                }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* Centered nav links (desktop) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className="hidden md:flex items-center gap-4 px-4 py-3 pointer-events-auto relative rounded-full transition-all duration-700 ease-out"
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
          {links.map((link, index) => (
            <Magnetic key={link} strength={0.05}>
              <button
                onClick={() => onSectionChange(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer z-10 transition-all duration-700 ease-out"
                style={{
                  color: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                  opacity: activeSection === index ? 1 : (hoveredIndex === index ? 0.85 : 0.5),
                  textShadow: useWhiteText ? '0 1px 2px rgba(0, 0, 0, 0.2)' : '0 1px 1px rgba(255, 255, 255, 0.4)'
                }}
              >
                {activeSection === index && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-accent"
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link}</span>
              </button>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Hamburger island — always visible, top-right */}
      <div className="fixed top-6 right-8 pointer-events-auto">
        <Magnetic strength={0.15}>
          <button
            onClick={onMenuToggle}
            className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1 group transition-all duration-700 ease-out"
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
    </nav>
  );
};

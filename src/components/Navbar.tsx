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

  // Detectar se é tema escuro (afternoon ou night) OU se está em seção com fundo escuro
  const isDarkTheme = theme === 'theme-afternoon' || theme === 'theme-night';
  const isDarkSection = activeSection === 1 || activeSection === 3; // Processo (1) e Parceiros (3) têm bg-accent-dark
  const useWhiteText = isDarkTheme || isDarkSection;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Logo no canto superior esquerdo */}
      <div className="fixed top-6 left-8 md:left-12 pointer-events-auto flex items-center" style={{ height: '60px' }}>
        <Magnetic strength={0.06}>
          <motion.button
            onClick={() => onSectionChange(0)}
            className="cursor-pointer block"
            whileHover={{ scale: 1.02, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          >
            <motion.img
              key={useWhiteText ? 'white' : 'dark'}
              src={useWhiteText ? logoWhite : logoDark}
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

      {/* Centered nav links (desktop) */}
      <div className="flex justify-center px-8 py-6">
        <div
          className="hidden md:flex items-center gap-1 p-2 pointer-events-auto relative rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          {links.map((link, index) => (
            <Magnetic key={link} strength={0.05}>
              <button
                onClick={() => onSectionChange(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-bold cursor-pointer z-10 transition-all duration-500"
                style={{
                  color: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                  opacity: activeSection === index ? 1 : (hoveredIndex === index ? 0.9 : 0.6),
                  textShadow: useWhiteText ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(255, 255, 255, 0.5)'
                }}
              >
                {activeSection === index && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
                    }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
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
        <Magnetic strength={0.2}>
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1 group"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <span
              className="block w-4 h-[1px] transition-all duration-500 group-hover:w-5 group-hover:bg-accent group-hover:opacity-100"
              style={{
                backgroundColor: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                opacity: 0.8
              }}
            />
            <span
              className="block w-4 h-[1px] transition-all duration-500 group-hover:w-3 group-hover:bg-accent group-hover:opacity-100"
              style={{
                backgroundColor: useWhiteText ? '#ffffff' : 'var(--ink-color)',
                opacity: 0.8
              }}
            />
          </button>
        </Magnetic>
      </div>
    </nav>
  );
};

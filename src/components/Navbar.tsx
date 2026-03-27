import React from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  activeSection: number;
  onSectionChange: (index: number) => void;
  onMenuToggle: () => void;
}

export const Navbar = ({ activeSection, onSectionChange, onMenuToggle }: NavbarProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const links = ["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center px-8 py-6 pointer-events-none">
      <div className="flex items-center gap-4 p-1 bg-white/60 backdrop-blur-xl rounded-xl border border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] pointer-events-auto relative">
        {links.map((link, index) => (
          <Magnetic key={link} strength={0.1}>
            <button 
              onClick={() => onSectionChange(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative px-6 py-2.5 flex items-center gap-2 transition-all duration-500 cursor-pointer z-10 text-[13px] font-medium tracking-tight ${activeSection === index ? 'text-black' : 'text-black/50 hover:text-black'}`}
            >
              <span className="relative">{link}</span>
              
              {/* Active Section Indicator (Subtle Line) */}
              {activeSection === index && (
                <motion.div 
                  layoutId="active-line"
                  className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover Line in #f2ffee or Accent */}
              {hoveredIndex === index && activeSection !== index && (
                <motion.div 
                  layoutId="hover-line"
                  className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-accent/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          </Magnetic>
        ))}
      </div>
      
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-6 right-8 pointer-events-auto">
        <Magnetic strength={0.3}>
          <button 
            onClick={onMenuToggle}
            className="w-12 h-12 bg-white/60 backdrop-blur-xl border border-white/40 rounded-lg flex flex-col items-center justify-center gap-1.5 group shadow-sm"
          >
            <div className="w-5 h-[1.5px] bg-black group-hover:w-6 transition-all" />
            <div className="w-5 h-[1.5px] bg-black group-hover:w-4 transition-all" />
          </button>
        </Magnetic>
      </div>
    </nav>
  );
};

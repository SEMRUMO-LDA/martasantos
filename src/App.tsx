import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Section02 } from './components/Section02';
import { Section03 } from './components/Section03';
import { SectionParceiros } from './components/SectionParceiros';
import { SectionContactos } from './components/SectionContactos';
import { SideDrawer } from './components/SideDrawer';
import { CustomCursor } from './components/CustomCursor';

const SECTIONS = [
  (props: any) => <Hero {...props} />,
  () => <Section02 />,
  () => <Section03 />,
  () => <SectionParceiros />,
  () => <SectionContactos />,
];

const SECTION_COUNT = SECTIONS.length;

// Slide variants — direction: 1 = forward (right→left), -1 = backward (left→right)
const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const transition = {
  opacity: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  // Time-based theme
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 14) {
        setTheme('');
      } else if (hour >= 14 && hour < 20) {
        setTheme('theme-afternoon');
      } else {
        setTheme('theme-night');
      }
    };
    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSectionChange = (index: number) => {
    if (index === activeSection) return;
    setDirection(index > activeSection ? 1 : -1);
    setActiveSection(index);
  };

  // Mouse-wheel → page navigation with friction
  const wheelLockRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);
  const scrollResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const SCROLL_THRESHOLD = 180; // Precisa acumular 180px de scroll para mudar
  const LOCK_DURATION = 1000; // Tempo de lock aumentado para 1000ms
  const ACCUMULATOR_RESET_TIME = 150; // Reset accumulator após 150ms sem scroll

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('.overflow-y-auto');

      if (scrollableParent) {
        const canScrollDown =
          scrollableParent.scrollHeight > scrollableParent.clientHeight &&
          scrollableParent.scrollTop + scrollableParent.clientHeight <
            scrollableParent.scrollHeight - 1;
        const canScrollUp = scrollableParent.scrollTop > 1;

        if (
          (e.deltaY > 0 && canScrollDown) ||
          (e.deltaY < 0 && canScrollUp)
        ) {
          return; // let the inner scroll happen
        }
      }

      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();

      if (wheelLockRef.current) return;

      // Acumular scroll até atingir threshold (criar atrito)
      scrollAccumulatorRef.current += e.deltaY;

      // Reset accumulator se o utilizador parar de fazer scroll
      if (scrollResetTimerRef.current) {
        clearTimeout(scrollResetTimerRef.current);
      }
      scrollResetTimerRef.current = setTimeout(() => {
        scrollAccumulatorRef.current = 0;
      }, ACCUMULATOR_RESET_TIME);

      if (Math.abs(scrollAccumulatorRef.current) < SCROLL_THRESHOLD) {
        return; // Não mudou ainda - precisa de mais scroll
      }

      // Threshold atingido - determinar direção ANTES de resetar
      const scrollDirection = scrollAccumulatorRef.current > 0 ? 1 : -1;

      // Mudar de página
      wheelLockRef.current = true;
      setIsNavigating(true);
      scrollAccumulatorRef.current = 0; // Reset accumulator

      setTimeout(() => {
        wheelLockRef.current = false;
        setIsNavigating(false);
      }, LOCK_DURATION);

      if (scrollDirection > 0) {
        // scroll down → next section
        setActiveSection(prev => {
          const next = Math.min(SECTION_COUNT - 1, prev + 1);
          if (next !== prev) setDirection(1);
          return next;
        });
      } else {
        // scroll up → previous section
        setActiveSection(prev => {
          const next = Math.max(0, prev - 1);
          if (next !== prev) setDirection(-1);
          return next;
        });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleSectionChange(Math.min(SECTION_COUNT - 1, activeSection + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleSectionChange(Math.max(0, activeSection - 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection]);

  const CurrentSection = SECTIONS[activeSection];

  // Detectar cor dos controles inferiores
  // Seções com fundo ESCURO (devem ter controles brancos): Processo (1) e Parceiros (3)
  // Seções com fundo CLARO (devem ter controles pretos): Hero (0), Projetos (2), Contactos (4)
  const isDarkSection = activeSection === 1 || activeSection === 3;
  const useWhiteControls = isDarkSection;

  return (
    <main className={`relative h-screen w-screen overflow-hidden bg-bg ${theme}`}>
      <CustomCursor />

      {/* Navigation Lock Indicator */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 pointer-events-none bg-black/5 z-[60]"
          />
        )}
      </AnimatePresence>

      <Navbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onMenuToggle={() => setIsMenuOpen(true)}
        theme={theme}
      />

      <SideDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSectionChange={handleSectionChange}
      />

      {/* Page Slides */}
      <div className="h-full w-full overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSection}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="absolute inset-0 overflow-y-auto custom-scrollbar"
          >
            {activeSection === 0
              ? <Hero onCtaClick={() => handleSectionChange(1)} onNavigate={handleSectionChange} />
              : <CurrentSection />
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar (Vertical Right) */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center justify-center"
           style={{ color: useWhiteControls ? '#ffffff' : '#000000' }}>
        
        <div
          className="w-[1.5px] h-48 relative transition-colors duration-500"
          style={{
            backgroundColor: useWhiteControls ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <motion.div
            animate={{ height: `${((activeSection + 1) / SECTION_COUNT) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full transition-colors duration-500 absolute top-0"
            style={{
              backgroundColor: useWhiteControls ? '#ffffff' : '#000000'
            }}
          />
        </div>
      </div>

      {/* Canto Inferior Direito: Info Rodapé (Desktop) */}
      <div className="fixed bottom-12 right-12 z-40 hidden md:flex flex-col items-end gap-3 transition-colors duration-500"
           style={{ color: useWhiteControls ? '#ffffff' : '#000000' }}>
        
        {/* Links do Rodapé */}
        <div className="flex items-center gap-4 text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-bold">
          <a href="#" className="relative group hover:opacity-100 transition-opacity whitespace-nowrap py-1">
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">Política de Privacidade</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <span className="opacity-10">|</span>
          <a href="#" className="relative group hover:opacity-100 transition-opacity whitespace-nowrap py-1">
            <span className="opacity-40 group-hover:opacity-100 transition-opacity">Livro de Reclamações Online</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <span className="opacity-10">|</span>
          <span className="opacity-40 whitespace-nowrap">© 2026 Marta Santos</span>
        </div>
      </div>
    </main>
  );
}

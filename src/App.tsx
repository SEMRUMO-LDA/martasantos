import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const transition = {
  x: { type: 'spring' as const, stiffness: 280, damping: 32, mass: 0.9 },
  opacity: { duration: 0.25, ease: 'easeInOut' },
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
  const SCROLL_THRESHOLD = 100; // Precisa acumular 100px de scroll para mudar
  const LOCK_DURATION = 800; // Tempo de lock aumentado para 800ms
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
      <div className="grain-overlay" />
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

      {/* Progress bar - Vertical no canto direito */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex items-center gap-6">
        <div
          className="w-[1px] h-48 transition-colors duration-500 relative"
          style={{
            backgroundColor: useWhiteControls ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <motion.div
            animate={{ height: `${((activeSection + 1) / SECTION_COUNT) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full transition-colors duration-500 absolute bottom-0"
            style={{
              backgroundColor: useWhiteControls ? '#ffffff' : '#000000'
            }}
          />
          <div
            className="absolute -left-8 top-0 flex flex-col gap-2 text-[7px] uppercase tracking-[0.3em] font-bold transition-colors duration-500"
            style={{
              color: useWhiteControls ? '#ffffff' : '#000000',
              opacity: 0.4,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}
          >
            <span>01</span>
          </div>
          <div
            className="absolute -left-8 bottom-0 flex flex-col gap-2 text-[7px] uppercase tracking-[0.3em] font-bold transition-colors duration-500"
            style={{
              color: useWhiteControls ? '#ffffff' : '#000000',
              opacity: 0.4,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}
          >
            <span>0{SECTION_COUNT}</span>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 transition-colors duration-500">
        <div className="relative group/tooltip">
          <button
            onClick={() => handleSectionChange(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group focus:outline-none focus:ring-2"
            style={{
              background: useWhiteControls ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: useWhiteControls ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
              boxShadow: '0 4px 16px -4px rgba(0, 0, 0, 0.15)',
              color: useWhiteControls ? '#ffffff' : '#000000'
            }}
            title={activeSection > 0 ? `Anterior: ${["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection - 1]}` : ''}
            aria-label={activeSection > 0 ? `Navegar para ${["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection - 1]}` : 'Primeira página'}
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
          {activeSection > 0 && (
            <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-ink text-bg px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold whitespace-nowrap">
                {["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection - 1]}
              </div>
            </div>
          )}
        </div>
        <div className="relative group/tooltip">
          <button
            onClick={() => handleSectionChange(Math.min(SECTION_COUNT - 1, activeSection + 1))}
            disabled={activeSection === SECTION_COUNT - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group focus:outline-none focus:ring-2"
            style={{
              background: useWhiteControls ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: useWhiteControls ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.15)',
              boxShadow: '0 4px 16px -4px rgba(0, 0, 0, 0.15)',
              color: useWhiteControls ? '#ffffff' : '#000000'
            }}
            title={activeSection < SECTION_COUNT - 1 ? `Próximo: ${["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection + 1]}` : ''}
            aria-label={activeSection < SECTION_COUNT - 1 ? `Navegar para ${["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection + 1]}` : 'Última página'}
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          {activeSection < SECTION_COUNT - 1 && (
            <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-ink text-bg px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold whitespace-nowrap">
                {["Atelier", "Processo", "Projetos", "Parceiros", "Contactos"][activeSection + 1]}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

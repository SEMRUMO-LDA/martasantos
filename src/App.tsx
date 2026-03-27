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

  // Mouse-wheel → page navigation
  const wheelLockRef = useRef(false);

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
      wheelLockRef.current = true;
      setTimeout(() => { wheelLockRef.current = false; }, 1200);

      if (e.deltaY > 0) {
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

  return (
    <main className={`relative h-screen w-screen overflow-hidden bg-bg ${theme}`}>
      <div className="grain-overlay" />
      <CustomCursor />

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
              ? <Hero onCtaClick={() => handleSectionChange(1)} />
              : <CurrentSection />
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/10 z-50 mix-blend-difference">
        <motion.div
          animate={{ width: `${((activeSection + 1) / SECTION_COUNT) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-white"
        />
        <div className="absolute -top-6 left-0 w-full flex justify-between text-[7px] uppercase tracking-[0.3em] font-bold text-white opacity-40">
          <span>01</span>
          <span>0{SECTION_COUNT}</span>
        </div>
      </div>

      {/* Nav arrows */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 mix-blend-difference text-white">
        <button
          onClick={() => handleSectionChange(Math.max(0, activeSection - 1))}
          disabled={activeSection === 0}
          className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => handleSectionChange(Math.min(SECTION_COUNT - 1, activeSection + 1))}
          disabled={activeSection === SECTION_COUNT - 1}
          className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group"
        >
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </main>
  );
}

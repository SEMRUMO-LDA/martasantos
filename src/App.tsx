import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Section02 } from './components/Section02';
import { Section03 } from './components/Section03';
import { SectionParceiros } from './components/SectionParceiros';
import { SectionContactos } from './components/SectionContactos';
import { SideDrawer } from './components/SideDrawer';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 14) {
        setTheme(''); // Morning/Default
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
    const target = sectionRefs.current[index];
    if (target && containerRef.current) {
      containerRef.current.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const target = e.target as HTMLElement;
      const scrollableParent = target.closest('.overflow-y-auto');
      
      if (scrollableParent) {
        const canScrollDown = scrollableParent.scrollHeight > scrollableParent.clientHeight && 
                             scrollableParent.scrollTop + scrollableParent.clientHeight < scrollableParent.scrollHeight - 1;
        const canScrollUp = scrollableParent.scrollTop > 1;
        
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
          // Let the vertical scroll happen
          return;
        }
      }

      // If we are scrolling vertically, move horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    <Hero onCtaClick={() => handleSectionChange(1)} />,
    <Section02 />,
    <Section03 />,
    <SectionParceiros />,
    <SectionContactos />
  ];

  return (
    <main className={`relative h-screen w-screen overflow-hidden bg-bg ${theme}`}>
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
        onMenuToggle={() => setIsMenuOpen(true)}
      />

      <SideDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onSectionChange={handleSectionChange}
      />
      
      {/* Global Progress Bar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/10 z-50 mix-blend-difference">
        <motion.div 
          animate={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-white"
        />
        <div className="absolute -top-6 left-0 w-full flex justify-between text-[7px] uppercase tracking-[0.3em] font-bold text-white opacity-40">
          <span>01</span>
          <span>0{sections.length}</span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="h-full w-full flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {sections.map((section, index) => (
          <div 
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="h-full w-screen snap-start snap-always shrink-0 relative overflow-y-auto custom-scrollbar"
          >
            {section}
          </div>
        ))}
      </div>
      
      {/* Footer info */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-12 mix-blend-difference text-white">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleSectionChange(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => handleSectionChange(Math.min(sections.length - 1, activeSection + 1))}
            disabled={activeSection === sections.length - 1}
            className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-5 disabled:cursor-not-allowed group"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}






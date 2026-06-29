import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goNext = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : '0%',
      opacity: 0,
    }),
    center: {
      x: '0%',
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : dir < 0 ? '100%' : '0%',
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.3 },
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full bg-ink/5 flex items-center justify-center rounded-sm text-xs opacity-50 uppercase tracking-widest">
        Sem Imagens Disponíveis
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between">
      {/* Main Image Area */}
      <div className="relative flex-1 min-h-[350px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden rounded-sm bg-black/5 dark:bg-white/5 flex items-center justify-center group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Imagem ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="w-full h-full object-contain pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Counter Overlay */}
        <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-white font-bold">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black cursor-pointer shadow-sm"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black cursor-pointer shadow-sm"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto py-2 hide-scrollbar snap-x scroll-smooth">
          {images.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`relative flex-shrink-0 w-20 h-16 rounded-sm overflow-hidden border transition-all duration-500 snap-start cursor-pointer ${
                  isSelected
                    ? 'border-accent scale-[1.02]'
                    : 'border-white/10 opacity-40 hover:opacity-80'
                }`}
              >
                <img
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Dot — instant
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring — spring lag
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 120, mass: 0.6 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A';

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      const card = target.closest('[data-cursor-text]');
      if (card) {
        setCursorText(card.getAttribute('data-cursor-text') || '');
        setIsHovered(true);
      } else if (!isInteractive) {
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  const ringSize = cursorText ? 100 : isHovered ? 52 : 32;

  return (
    <>
      {/* Outer ring — spring lag + mix-blend-difference */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: cursorText ? 'normal' : 'exclusion',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          backgroundColor: cursorText
            ? 'rgba(117, 179, 104, 0.95)'
            : isHovered
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0)',
          border: cursorText
            ? '0px solid transparent'
            : isHovered
            ? '1px solid rgba(255,255,255,0.1)'
            : '0.5px solid rgba(255,255,255,0.6)',
          backdropFilter: cursorText ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[9px] uppercase tracking-widest font-bold text-white text-center px-2 leading-tight"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot — instant, mix-blend-difference */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'exclusion',
          backgroundColor: 'white',
        }}
        animate={{
          opacity: isVisible ? (isHovered && !cursorText ? 0 : 1) : 0,
          scale: isHovered && !cursorText ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

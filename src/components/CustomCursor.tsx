import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.tagName === 'BUTTON' || target.tagName === 'A') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      const projectCard = target.closest('[data-cursor-text]');
      if (projectCard) {
        setCursorText(projectCard.getAttribute('data-cursor-text') || '');
        setIsHovered(true);
      } else if (!target.closest('button') && !target.closest('a')) {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovered ? (cursorText ? 100 : 40) : 8,
        height: isHovered ? (cursorText ? 100 : 40) : 8,
        backgroundColor: isHovered ? 'rgba(117, 179, 104, 0.95)' : 'rgba(117, 179, 104, 1)',
        backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)',
      }}
    >
      {cursorText && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-widest font-bold text-bg text-center px-2"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

import React from 'react';

interface LogoProps {
  useWhite?: boolean;
}

export const Logo = ({ useWhite }: LogoProps) => {
  return (
    <div 
      className={`font-serif text-[18px] md:text-[22px] leading-none select-none transition-colors duration-500 lowercase ${
        useWhite ? 'text-white' : 'text-ink'
      }`}
      style={{
        fontWeight: 500, // Passando para Medium
        letterSpacing: '-0.02em' // Tracking diminuído para precisão arquitetónica
      }}
    >
      marta santos
    </div>
  );
};

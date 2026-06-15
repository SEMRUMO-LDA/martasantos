import React from 'react';

interface LogoProps {
  useWhite?: boolean;
}

export const Logo = ({ useWhite }: LogoProps) => {
  return (
    <div
      className={`flex items-baseline gap-2 font-serif leading-none select-none transition-colors duration-500 lowercase ${
        useWhite ? 'text-white' : 'text-ink'
      }`}
      style={{ letterSpacing: '-0.02em' }}
    >
      <span className="text-[18px] md:text-[22px]" style={{ fontWeight: 300 }}>
        marta santos
      </span>
      <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em]" style={{ fontWeight: 400 }}>
        arquitecta
      </span>
    </div>
  );
};

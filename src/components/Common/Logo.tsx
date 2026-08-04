import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  compactOnMobile?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  compactOnMobile = false,
  onClick,
  className = '',
}) => {
  const sizeMap = {
    sm: {
      box: 'w-7 h-7 rounded-lg',
      sparkle: 'w-4 h-4',
      title: 'text-base',
      sub: 'text-[8px]',
    },
    md: {
      box: 'w-9 h-9 rounded-xl',
      sparkle: 'w-5 h-5',
      title: 'text-lg',
      sub: 'text-[9px]',
    },
    lg: {
      box: 'w-12 h-12 rounded-2xl',
      sparkle: 'w-7 h-7',
      title: 'text-2xl',
      sub: 'text-[11px]',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-3 select-none shrink-0 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Icon Emblem Container with Animated Glow */}
      <div className="relative shrink-0">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 ${currentSize.box} bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 overflow-hidden`}
        >
          {/* Subtle sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
          
          {/* Sparkles SVG Emblem */}
          <svg
            className={`${currentSize.sparkle} fill-white text-white drop-shadow`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3c.132 0 .263 0 .393 0A9 9 0 0 0 21 12a9 9 0 0 0-8.607 9 9 0 0 0-8.607-9A9 9 0 0 0 12 3z" fill="currentColor" opacity="0.9" />
            <path d="M19 3v4" stroke="currentColor" strokeWidth="2" />
            <path d="M21 5h-4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Outer ambient glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Brand Text */}
      <div>
        <span className={`${currentSize.title} font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors block leading-none`}>
          Resource<span className="text-indigo-500">Hub</span>
        </span>
        {showSubtitle && (
          <span className={`${compactOnMobile ? 'hidden xs:block sm:block' : 'block'} ${currentSize.sub} font-mono tracking-widest text-zinc-400 uppercase mt-1 leading-none`}>
            AI SaaS Platform
          </span>
        )}
      </div>
    </div>
  );
};

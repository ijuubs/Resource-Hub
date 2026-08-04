import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdPlaceholderProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  type?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  width = '100%',
  height = 90,
  className = '',
  type = 'Advertisement'
}) => {
  return (
    <div
      style={{ width, height, minHeight: height }}
      className={`bg-zinc-900/50 border border-zinc-800/50 border-dashed rounded-xl flex flex-col items-center justify-center text-zinc-500 relative overflow-hidden group ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Megaphone className="w-6 h-6 mb-2 opacity-50" />
      <span className="text-xs font-medium uppercase tracking-widest">{type}</span>
    </div>
  );
};

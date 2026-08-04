import React from 'react';
import { AdWrapper } from './AdWrapper';

export const StickyFooterBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`fixed bottom-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800/50 flex justify-center pb-safe pt-2 ${className}`}>
    <AdWrapper placementKey="stickyFooter" className="!my-0" />
  </div>
);

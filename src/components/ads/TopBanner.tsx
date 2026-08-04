import React from 'react';
import { AdWrapper } from './AdWrapper';

export const TopBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdWrapper placementKey="topBanner" className={`w-full max-w-5xl mx-auto ${className}`} />
);

import React from 'react';
import { AdWrapper } from './AdWrapper';

export const NativeAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdWrapper placementKey="native" className={`w-full ${className}`} />
);

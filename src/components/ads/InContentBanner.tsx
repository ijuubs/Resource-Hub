import React from 'react';
import { AdWrapper } from './AdWrapper';

export const InContentBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdWrapper placementKey="inContent" className={`mx-auto ${className}`} />
);

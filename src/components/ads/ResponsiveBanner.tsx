import React from 'react';
import { AdWrapper } from './AdWrapper';
import { adConfig } from '../../config/ads';

export const ResponsiveBanner: React.FC<{ placementKey: keyof typeof adConfig.placements; className?: string }> = ({ 
  placementKey, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <AdWrapper placementKey={placementKey} />
    </div>
  );
};

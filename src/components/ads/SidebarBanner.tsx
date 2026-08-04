import React from 'react';
import { AdWrapper } from './AdWrapper';

export const SidebarBanner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`hidden lg:block sticky top-24 ${className}`}>
    <AdWrapper placementKey="sidebar" />
  </div>
);

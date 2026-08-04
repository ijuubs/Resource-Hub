import React, { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { adConfig, AdPlacementConfig } from '../../config/ads';
import { AdPlaceholder } from './AdPlaceholder';

interface AdWrapperProps {
  placementKey: keyof typeof adConfig.placements;
  className?: string;
}

export const AdWrapper: React.FC<AdWrapperProps> = ({ placementKey, className = '' }) => {
  const config = adConfig.placements[placementKey] as AdPlacementConfig;
  const [ref, isIntersecting] = useIntersectionObserver({ rootMargin: adConfig.lazyLoadOffset });
  const scriptInjected = useRef(false);
  const containerId = `ad-container-${config.id}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (!adConfig.enabled || !config.enabled || adConfig.developmentMode) return;
    if (isIntersecting && !scriptInjected.current) {
      scriptInjected.current = true;
      
      const container = document.getElementById(containerId);
      if (container) {
        // Implement Adsterra script injection
        // This is a generic approach; adapt to exact Adsterra snippet requirements
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//www.highperformanceformat.com/${config.id}/invoke.js`;
        script.async = true;
        // Sometimes Adsterra uses specific data attributes
        script.setAttribute('data-cfasync', 'false');
        
        const adOptions = document.createElement('script');
        adOptions.type = 'text/javascript';
        adOptions.innerHTML = `
          atOptions = {
            'key' : '${config.id}',
            'format' : 'iframe',
            'height' : ${config.height || 90},
            'width' : ${config.width || 728},
            'params' : {}
          };
        `;
        
        container.appendChild(adOptions);
        container.appendChild(script);
      }
    }
  }, [isIntersecting, config, containerId]);

  if (!adConfig.enabled || !config.enabled) {
    return null;
  }

  // To prevent CLS, set minHeight/minWidth
  const minHeight = typeof config.height === 'number' ? `${config.height}px` : config.height;
  const minWidth = typeof config.width === 'number' ? `${config.width}px` : config.width;

  return (
    <div 
      ref={ref} 
      className={`ad-wrapper flex justify-center items-center overflow-hidden my-4 ${className}`}
      style={{ minHeight, minWidth }}
      aria-hidden="true"
    >
      {adConfig.developmentMode ? (
        <AdPlaceholder width={config.width} height={config.height} type={placementKey} />
      ) : (
        <div id={containerId} className="w-full h-full flex justify-center items-center" />
      )}
    </div>
  );
};

export type AdProvider = 'adsterra' | 'adsense' | 'placeholder';

export interface AdPlacementConfig {
  id: string;
  width?: number | string;
  height?: number | string;
  format?: string;
  enabled: boolean;
}

export interface AdSystemConfig {
  enabled: boolean;
  provider: AdProvider;
  developmentMode: boolean; // If true, forces placeholders
  lazyLoadOffset: string; // Intersection observer offset
  placements: {
    topBanner: AdPlacementConfig;
    inContent: AdPlacementConfig;
    sidebar: AdPlacementConfig;
    stickyFooter: AdPlacementConfig;
    native: AdPlacementConfig;
  };
}

export const adConfig: AdSystemConfig = {
  enabled: true,
  provider: 'adsterra',
  developmentMode: true, // Set to false in production to load real scripts
  lazyLoadOffset: '200px',
  placements: {
    topBanner: {
      id: 'adsterra-top-728x90',
      width: 728,
      height: 90,
      enabled: true,
    },
    inContent: {
      id: 'adsterra-incontent-300x250',
      width: 300,
      height: 250,
      enabled: true,
    },
    sidebar: {
      id: 'adsterra-sidebar-160x600',
      width: 160,
      height: 600,
      enabled: true,
    },
    stickyFooter: {
      id: 'adsterra-sticky-320x50',
      width: 320,
      height: 50,
      enabled: true,
    },
    native: {
      id: 'adsterra-native',
      width: '100%',
      height: 200,
      enabled: true,
    },
  },
};

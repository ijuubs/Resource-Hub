import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Resource,
  Article,
  DigitalProduct,
  Category,
  AffiliateLink,
  AnalyticsSummary,
  SystemSettings,
  ResourceType,
} from '../types';
import {
  INITIAL_RESOURCES,
  INITIAL_ARTICLES,
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_AFFILIATE_LINKS,
  INITIAL_ANALYTICS,
  INITIAL_SETTINGS,
} from '../data/initialData';
import { trackAnalyticsEvent } from '../services/api';

export type ActiveTab =
  | 'home'
  | 'resources'
  | 'resource-detail'
  | 'articles'
  | 'article-detail'
  | 'products'
  | 'ai-workspace'
  | 'admin'
  | 'sitemap'
  | 'bookmarks'
  | 'privacy'
  | 'terms'
  | 'about';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isLoading: boolean;
  triggerLoading: (durationMs?: number) => void;
  resources: Resource[];
  articles: Article[];
  products: DigitalProduct[];
  categories: Category[];
  affiliateLinks: AffiliateLink[];
  analytics: AnalyticsSummary;
  settings: SystemSettings;
  selectedResourceSlug: string | null;
  setSelectedResourceSlug: (slug: string | null) => void;
  selectedArticleSlug: string | null;
  setSelectedArticleSlug: (slug: string | null) => void;
  activeCategoryFilter: string | null;
  activeTypeFilter: ResourceType | null;
  searchQuery: string;
  searchModalOpen: boolean;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchResults: { resources: Resource[]; articles: Article[] };
  bookmarks: string[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setSearchModalOpen: (open: boolean) => void;
  setCategoryFilter: (categorySlug: string | null) => void;
  setTypeFilter: (type: ResourceType | null) => void;
  navigateToResource: (slug: string) => void;
  navigateToArticle: (slug: string) => void;
  addResource: (resource: Partial<Resource>) => Resource;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  addArticle: (article: Partial<Article>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addProduct: (product: Partial<DigitalProduct>) => DigitalProduct;
  updateProduct: (id: string, updates: Partial<DigitalProduct>) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  incrementAffiliateClick: (id: string) => void;
  recordResourceDownload: (resourceId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);

  const triggerLoading = (durationMs: number = 400) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, durationMs);
  };
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [products, setProducts] = useState<DigitalProduct[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(INITIAL_AFFILIATE_LINKS);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(INITIAL_ANALYTICS);
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);

  const [selectedResourceSlug, setSelectedResourceSlug] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState<ResourceType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');

    const handleUrlState = () => {
      try {
        const rawPathname = window.location.pathname;
        const pathname = rawPathname.length > 1 && rawPathname.endsWith('/')
          ? rawPathname.slice(0, -1)
          : rawPathname;
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab') as ActiveTab | null;
        const resourceParam = params.get('resource');
        const articleParam = params.get('article');

        if (pathname.startsWith('/resource/')) {
          const slug = pathname.replace('/resource/', '');
          if (slug) {
            setSelectedResourceSlug(slug);
            setActiveTab('resource-detail');
            return;
          }
        }

        if (pathname.startsWith('/article/')) {
          const slug = pathname.replace('/article/', '');
          if (slug) {
            setSelectedArticleSlug(slug);
            setActiveTab('article-detail');
            return;
          }
        }

        // Clean pathname routes
        if (pathname === '/resources') {
          setActiveTab('resources');
        } else if (pathname === '/articles') {
          setActiveTab('articles');
        } else if (pathname === '/products') {
          setActiveTab('products');
        } else if (pathname === '/ai-workspace') {
          setActiveTab('ai-workspace');
        } else if (pathname === '/privacy') {
          setActiveTab('privacy');
        } else if (pathname === '/terms') {
          setActiveTab('terms');
        } else if (pathname === '/about') {
          setActiveTab('about');
        } else if (pathname === '/sitemap') {
          setActiveTab('sitemap');
        } else if (pathname === '/bookmarks') {
          setActiveTab('bookmarks');
        } else if (pathname === '/admin') {
          setActiveTab('admin');
        } else if (resourceParam) {
          setSelectedResourceSlug(resourceParam);
          setActiveTab('resource-detail');
        } else if (articleParam) {
          setSelectedArticleSlug(articleParam);
          setActiveTab('article-detail');
        } else if (tabParam) {
          setActiveTab(tabParam);
        } else if (pathname === '' || pathname === '/') {
          setActiveTab('home');
        }
      } catch (e) {
        // Fallback for isolated iframe environments
      }
    };

    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    return () => window.removeEventListener('popstate', handleUrlState);
  }, []);

  const getPathForTab = (tab: ActiveTab, resourceSlug?: string | null, articleSlug?: string | null): string => {
    switch (tab) {
      case 'resources': return '/resources';
      case 'articles': return '/articles';
      case 'products': return '/products';
      case 'ai-workspace': return '/ai-workspace';
      case 'privacy': return '/privacy';
      case 'terms': return '/terms';
      case 'about': return '/about';
      case 'sitemap': return '/sitemap';
      case 'bookmarks': return '/bookmarks';
      case 'admin': return '/admin';
      case 'resource-detail': return resourceSlug ? `/resource/${resourceSlug}` : '/resources';
      case 'article-detail': return articleSlug ? `/article/${articleSlug}` : '/articles';
      case 'home':
      default: return '/';
    }
  };

  const navigateToResource = (slug: string) => {
    setSelectedResourceSlug(slug);
    setActiveTab('resource-detail');
    trackAnalyticsEvent('view_resource', slug);
    // Increment view count
    setResources((prev) =>
      prev.map((res) => (res.slug === slug ? { ...res, viewsCount: res.viewsCount + 1 } : res))
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      window.history.pushState({}, '', `/resource/${slug}`);
    } catch (e) {}
  };

  const navigateToArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setActiveTab('article-detail');
    trackAnalyticsEvent('view_article', slug);
    setArticles((prev) =>
      prev.map((art) => (art.slug === slug ? { ...art, viewsCount: art.viewsCount + 1 } : art))
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      window.history.pushState({}, '', `/article/${slug}`);
    } catch (e) {}
  };

  const setCategoryFilter = (categorySlug: string | null) => {
    setActiveCategoryFilter(categorySlug);
    setActiveTab('resources');
  };

  const setTypeFilter = (type: ResourceType | null) => {
    setActiveTypeFilter(type);
    setActiveTab('resources');
  };

  const addResource = (partial: Partial<Resource>): Resource => {
    const newRes: Resource = {
      id: `res-${Date.now()}`,
      title: partial.title || 'Untitled Resource',
      slug: partial.slug || `resource-${Date.now()}`,
      metaDescription: partial.metaDescription || '',
      type: partial.type || 'ai-tool',
      category: partial.category || 'ai-tools',
      tags: partial.tags || ['AI'],
      featuredImage: partial.featuredImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      shortSummary: partial.shortSummary || '',
      contentBlocks: partial.contentBlocks || [{ id: '1', type: 'paragraph', content: 'Detailed summary coming soon.' }],
      faqs: partial.faqs || [],
      isFeatured: partial.isFeatured || false,
      isPremium: partial.isPremium || false,
      rating: 5.0,
      reviewCount: 1,
      viewsCount: 0,
      downloadsCount: 0,
      versionHistory: [{ version: 'v1.0', date: new Date().toISOString().split('T')[0], changes: 'Created via AI Generator', author: 'Admin' }],
      status: partial.status || 'published',
      createdBy: 'admin-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interactiveConfig: partial.interactiveConfig,
    };
    setResources((prev) => [newRes, ...prev]);
    return newRes;
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r))
    );
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  const addArticle = (partial: Partial<Article>): Article => {
    const newArt: Article = {
      id: `art-${Date.now()}`,
      title: partial.title || 'Untitled Article',
      slug: partial.slug || `article-${Date.now()}`,
      metaDescription: partial.metaDescription || '',
      category: partial.category || 'finance-growth',
      tags: partial.tags || ['Growth'],
      featuredImage: partial.featuredImage || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      readingTimeMinutes: partial.readingTimeMinutes || 5,
      author: partial.author || {
        name: 'ResourceHub Editorial',
        role: 'AI & Growth Team',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      contentBlocks: partial.contentBlocks || [{ id: '1', type: 'paragraph', content: 'Article content placeholder.' }],
      faqs: partial.faqs || [],
      relatedResourceIds: partial.relatedResourceIds || [],
      status: partial.status || 'published',
      viewsCount: 0,
      createdBy: 'admin-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setArticles((prev) => [newArt, ...prev]);
    return newArt;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const addProduct = (partial: Partial<DigitalProduct>): DigitalProduct => {
    const newProd: DigitalProduct = {
      id: `prod-${Date.now()}`,
      title: partial.title || 'Digital Pack',
      slug: partial.slug || `prod-${Date.now()}`,
      shortDescription: partial.shortDescription || '',
      fullDescription: partial.fullDescription || '',
      price: partial.price || 19,
      format: partial.format || 'ZIP',
      fileSize: partial.fileSize || '5.0 MB',
      featuredImage: partial.featuredImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      version: '1.0',
      salesCount: 0,
      rating: 5.0,
      status: 'published',
      downloadsCount: 0,
      features: partial.features || ['Digital PDF/ZIP file', 'Full license included'],
      downloadUrl: '/downloads/product-file.zip',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<DigitalProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const incrementAffiliateClick = (id: string) => {
    setAffiliateLinks((prev) =>
      prev.map((aff) => (aff.id === id ? { ...aff, clickCount: aff.clickCount + 1 } : aff))
    );
    setAnalytics((prev) => ({ ...prev, affiliateClicks: prev.affiliateClicks + 1 }));
    trackAnalyticsEvent('affiliate_click', id);
  };

  const recordResourceDownload = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, downloadsCount: r.downloadsCount + 1 } : r))
    );
    setAnalytics((prev) => ({ ...prev, totalDownloads: prev.totalDownloads + 1 }));
    trackAnalyticsEvent('download', resourceId);
  };

  const searchOpen = searchModalOpen;
  const setSearchOpen = setSearchModalOpen;

  const searchResults = {
    resources: searchQuery.trim()
      ? resources.filter(
          (r) =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [],
    articles: searchQuery.trim()
      ? articles.filter(
          (a) =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [],
  };

  const bookmarks = ['res-1', 'res-4', 'res-7'];

  const handleSetActiveTab = (tab: ActiveTab) => {
    triggerLoading(350);
    setActiveTab(tab);
    if (tab !== 'resource-detail') {
      setSelectedResourceSlug(null);
    }
    if (tab !== 'article-detail') {
      setSelectedArticleSlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const cleanPath = getPathForTab(tab, selectedResourceSlug, selectedArticleSlug);
      window.history.pushState({}, '', cleanPath);
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab: handleSetActiveTab,
        isLoading,
        triggerLoading,
        resources,
        articles,
        products,
        categories,
        affiliateLinks,
        analytics,
        settings,
        selectedResourceSlug,
        setSelectedResourceSlug,
        selectedArticleSlug,
        setSelectedArticleSlug,
        activeCategoryFilter,
        activeTypeFilter,
        searchQuery,
        searchModalOpen,
        searchOpen,
        setSearchOpen,
        searchResults,
        bookmarks,
        theme,
        toggleTheme,
        setSearchQuery,
        setSearchModalOpen,
        setCategoryFilter,
        setTypeFilter,
        navigateToResource,
        navigateToArticle,
        addResource,
        updateResource,
        deleteResource,
        addArticle,
        updateArticle,
        deleteArticle,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        incrementAffiliateClick,
        recordResourceDownload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

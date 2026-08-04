import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { ResourceCard } from './components/Resources/ResourceCard';
import { ResourceDetail } from './components/Resources/ResourceDetail';
import { ArticleCard } from './components/Articles/ArticleCard';
import { ArticleDetail } from './components/Articles/ArticleDetail';
import { ProductCatalog } from './components/Products/ProductCatalog';
import { AIWorkspace } from './components/AIWorkspace/AIWorkspace';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { SitemapViewer } from './components/SEO/SitemapViewer';
import { SchemaMarkup } from './components/SEO/SchemaMarkup';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { AboutUs } from './components/Legal/AboutUs';
import { CookieConsent } from './components/Legal/CookieConsent';
import { updateMetaTags } from './utils/seo';
import { NewsletterCTA } from './components/Monetization/NewsletterCTA';
import { AffiliateBox } from './components/Monetization/AffiliateBox';
import { AdPlaceholder } from './components/Monetization/AdPlaceholder';
import { PremiumBanner } from './components/Monetization/PremiumBanner';
import { SkeletonGrid } from './components/Common/Skeletons';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Search,
  Layers,
  Calculator,
  FileText,
  ShoppingBag,
  Bot,
  TrendingUp,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';

export function App() {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    triggerLoading,
    resources,
    articles,
    affiliateLinks,
    selectedResourceSlug,
    selectedArticleSlug,
    setSearchOpen,
    categories,
  } = useApp();

  const [resourceCategoryFilter, setResourceCategoryFilter] = useState('all');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');

  const handleCategoryFilterChange = (catId: string) => {
    setResourceCategoryFilter(catId);
    triggerLoading(300);
  };

  const handleTypeFilterChange = (type: string) => {
    setResourceTypeFilter(type);
    triggerLoading(300);
  };

  // Find active resource or article if selected
  const activeResource = resources.find((r) => r.slug === selectedResourceSlug);
  const activeArticle = articles.find((a) => a.slug === selectedArticleSlug);

  // Filter resources
  const filteredResources = resources.filter((res) => {
    if (resourceCategoryFilter !== 'all' && res.category !== resourceCategoryFilter) return false;
    if (resourceTypeFilter !== 'all' && res.type !== resourceTypeFilter) return false;
    return true;
  });

  React.useEffect(() => {
    if (activeTab === 'home') {
      updateMetaTags({
        title: 'ResourceHub | AI SaaS Tools & Digital Resource Directory',
        description: 'Explore 50+ SaaS calculators, prompt generators, Notion operating systems, and developer playbooks.',
      });
    } else if (activeTab === 'resources') {
      updateMetaTags({
        title: 'Interactive SaaS Toolkits & Calculators Directory - ResourceHub',
        description: 'Access 50+ interactive financial forecasters, prompt generators, Notion operating systems, and developer checklists.',
      });
    } else if (activeTab === 'articles') {
      updateMetaTags({
        title: 'SaaS Growth Playbooks & Educational Guides - ResourceHub',
        description: 'In-depth articles covering churn reduction, financial unit economics, cold outreach, and AI prompt engineering.',
      });
    } else if (activeTab === 'products') {
      updateMetaTags({
        title: 'Digital Products Store & Founder Toolkits - ResourceHub',
        description: 'Download production-ready Notion operating systems, financial spreadsheets, and prompt libraries.',
      });
    } else if (activeTab === 'ai-workspace') {
      updateMetaTags({
        title: 'AI Prompt Engineering Studio - ResourceHub',
        description: 'Test, optimize, and generate AI prompts for Gemini, GPT-4, and Claude models.',
      });
    } else if (activeTab === 'privacy') {
      updateMetaTags({
        title: 'Privacy Policy & GDPR Data Rights - ResourceHub',
        description: 'Learn how ResourceHub respects your privacy, handles cookies, and complies with Google AdSense data requirements.',
      });
    } else if (activeTab === 'terms') {
      updateMetaTags({
        title: 'Terms of Service & User Agreement - ResourceHub',
        description: 'Read the official Terms of Service, user licensing, and legal disclaimers for using ResourceHub.',
      });
    } else if (activeTab === 'about') {
      updateMetaTags({
        title: 'About ResourceHub - Platform Mission & Editorial Standards',
        description: 'Learn about ResourceHub, our team, open-value mission, and quality standards for SaaS tools.',
      });
    } else if (activeTab === 'sitemap') {
      updateMetaTags({
        title: 'XML Sitemap & Route Inspector - ResourceHub',
        description: 'Inspect canonical site structure, JSON-LD schemas, and indexable endpoints for Google Search Console.',
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden max-w-full w-full">
      {/* Dynamic JSON-LD Structured Data Schema Markup */}
      <SchemaMarkup />

      {/* Navigation Header */}
      <Header />

      {/* Global Modals */}
      <GlobalSearchModal />
      <AuthModal />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Render Selected Detail View First */}
        {selectedResourceSlug && activeResource ? (
          <ResourceDetail resource={activeResource} />
        ) : selectedArticleSlug && activeArticle ? (
          <ArticleDetail article={activeArticle} />
        ) : activeTab === 'resources' ? (
          /* Resources Directory Tab */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 pb-16"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                  Interactive Toolkit Directory
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  50+ SaaS Calculators, Prompts & Notion Systems
                </h1>
                <p className="text-sm text-zinc-400 max-w-2xl">
                  Explore our full library of interactive financial forecasters, engineered AI recipes, and downloadable checklists.
                </p>
              </div>

              <button
                onClick={() => triggerLoading(400)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-indigo-500 transition-all self-start md:self-auto shrink-0"
                title="Simulate Data Refresh"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Reload Directory</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleCategoryFilterChange('all')}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                    resourceCategoryFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryFilterChange(cat.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                      resourceCategoryFilter === cat.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <select
                value={resourceTypeFilter}
                onChange={(e) => handleTypeFilterChange(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="all">Filter by Type (All)</option>
                <option value="calculator">Calculators</option>
                <option value="ai-tool">AI Tools</option>
                <option value="template">Templates</option>
                <option value="checklist">Checklists</option>
              </select>
            </div>

            {/* Resources Grid or Skeleton Screen */}
            {isLoading ? (
              <SkeletonGrid type="resource" count={6} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map((res) => (
                  <ResourceCard key={res.id} resource={res} />
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : activeTab === 'articles' ? (
          /* Articles Hub Tab */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 pb-16"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Growth Teardowns & Guides</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Educational Guides & SaaS Playbooks
                </h1>
                <p className="text-sm text-zinc-400 max-w-2xl">
                  In-depth articles covering churn reduction, financial unit economics, cold outreach, and AI prompt engineering.
                </p>
              </div>

              <button
                onClick={() => triggerLoading(400)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-pink-500 transition-all self-start md:self-auto shrink-0"
                title="Reload Articles Feed"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-pink-400 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Reload Feed</span>
              </button>
            </div>

            {/* Articles Grid or Skeleton Screen */}
            {isLoading ? (
              <SkeletonGrid type="article" count={6} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {articles.map((art) => (
                  <ArticleCard key={art.id} article={art} />
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : activeTab === 'products' ? (
          /* Digital Products Tab */
          <ProductCatalog />
        ) : activeTab === 'ai-workspace' ? (
          /* AI Workspace Tab */
          <AIWorkspace />
        ) : activeTab === 'sitemap' ? (
          /* Sitemap Inspector Tab */
          <SitemapViewer />
        ) : activeTab === 'admin' ? (
          /* Admin Panel Tab */
          <AdminDashboard />
        ) : activeTab === 'privacy' ? (
          /* Privacy Policy View */
          <PrivacyPolicy />
        ) : activeTab === 'terms' ? (
          /* Terms of Service View */
          <TermsOfService />
        ) : activeTab === 'about' ? (
          /* About Us View */
          <AboutUs />
        ) : (
          /* Default Home View */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-16 pb-16"
          >
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 via-zinc-900 to-zinc-950 p-5 sm:p-14 text-center space-y-6 shadow-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20 max-w-full">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">AI-Powered Value-First Resource Platform</span>
              </div>

              <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight break-words">
                Solve Everyday Tech & Business Problems with <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Free AI Tools</span>
              </h1>

              <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                Production-ready SaaS calculators, prompt generators, Notion operating systems, and downloadable financial models. Always open value before anything else.
              </p>

              {/* Instant Search Bar */}
              <div
                onClick={() => setSearchOpen(true)}
                className="max-w-xl mx-auto flex items-center justify-between gap-2 rounded-2xl border border-zinc-700 bg-zinc-900/90 p-2.5 sm:p-3 shadow-xl hover:border-indigo-500/60 transition-all cursor-pointer w-full"
              >
                <div className="flex items-center gap-2.5 pl-1.5 text-zinc-400 text-xs sm:text-sm min-w-0 flex-1">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
                  <span className="truncate">Search "SaaS MRR", "Notion", "Cold Email"...</span>
                </div>
                <button className="rounded-xl bg-indigo-600 px-3 sm:px-4 py-2 text-xs font-bold text-white shadow shrink-0">
                  Search Tools
                </button>
              </div>

              {/* Metric stats bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto border-t border-zinc-800/80 text-xs">
                <div>
                  <strong className="text-lg sm:text-xl font-bold text-white block">50+</strong>
                  <span className="text-zinc-500">Interactive Tools</span>
                </div>
                <div>
                  <strong className="text-lg sm:text-xl font-bold text-white block">14,000+</strong>
                  <span className="text-zinc-500">Active Founders</span>
                </div>
                <div>
                  <strong className="text-lg sm:text-xl font-bold text-white block">Gemini 3.6</strong>
                  <span className="text-zinc-500">AI Logic Engine</span>
                </div>
                <div>
                  <strong className="text-lg sm:text-xl font-bold text-white block">100%</strong>
                  <span className="text-zinc-500">Open Value Access</span>
                </div>
              </div>
            </div>

            {/* Ad Leaderboard Placeholder */}
            <AdPlaceholder format="leaderboard" />

            {/* Featured Interactive Tools */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Handpicked Directory</span>
                  <h2 className="text-2xl font-bold text-white">Popular Interactive Tools & Calculators</h2>
                </div>
                <button
                  onClick={() => setActiveTab('resources')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  <span>View All 50+ Tools</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {isLoading ? (
                <SkeletonGrid type="resource" count={3} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.slice(0, 3).map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}
            </div>

            {/* Premium Upgrade Banner */}
            <PremiumBanner onUpgrade={() => setActiveTab('products')} />

            {/* Affiliate Recommended Partner */}
            {affiliateLinks.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Verified Partner Tool</span>
                <AffiliateBox affiliate={affiliateLinks[0]} />
              </div>
            )}

            {/* Growth Teardown Articles */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Educational Guides</span>
                  <h2 className="text-2xl font-bold text-white">Deep-Dive SaaS & AI Growth Teardowns</h2>
                </div>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300"
                >
                  <span>Explore All Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {isLoading ? (
                <SkeletonGrid type="article" count={3} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.slice(0, 3).map((art) => (
                    <ArticleCard key={art.id} article={art} />
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter Subscription CTA */}
            <NewsletterCTA />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky GDPR & AdSense Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

export default App;

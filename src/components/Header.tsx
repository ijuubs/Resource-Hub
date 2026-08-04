import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Common/Logo';
import {
  Sparkles,
  Search,
  Bookmark,
  Menu,
  X,
  Layers,
  FileText,
  ShoppingBag,
  Bot,
  Globe,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setSearchOpen, bookmarks } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources Directory', icon: <Layers className="w-4 h-4" /> },
    { id: 'articles', label: 'Articles & Guides', icon: <FileText className="w-4 h-4" /> },
    { id: 'products', label: 'Digital Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ai-workspace', label: 'AI Workspace', icon: <Bot className="w-4 h-4" /> },
    { id: 'sitemap', label: 'SEO Sitemap', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 overflow-hidden">
          {/* Logo */}
          <Logo size="md" compactOnMobile onClick={() => setActiveTab('home')} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.id === 'sitemap') {
                return (
                  <a
                    key={link.id}
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id as any)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    activeTab === link.id
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-2.5 sm:px-3 py-1.5 text-xs text-zinc-400 hover:border-zinc-700 hover:text-white transition-all shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                ⌘K
              </kbd>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => setActiveTab('resources')}
              className="relative rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 text-zinc-400 hover:text-white transition-all shrink-0"
              title="Saved Resources"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 p-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              if (link.id === 'sitemap') {
                return (
                  <a
                    key={link.id}
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 rounded-xl p-3 text-xs font-semibold text-left transition-all text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-semibold text-left transition-all ${
                    activeTab === link.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-zinc-900 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-zinc-400">
            <button
              onClick={() => {
                setActiveTab('about');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:text-white hover:border-zinc-700"
            >
              About Us
            </button>
            <button
              onClick={() => {
                setActiveTab('privacy');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:text-white hover:border-zinc-700"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => {
                setActiveTab('terms');
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:text-white hover:border-zinc-700"
            >
              Terms of Use
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

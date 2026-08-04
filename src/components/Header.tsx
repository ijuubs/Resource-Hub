import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Common/Logo';
import {
  Sparkles,
  Search,
  Bookmark,
  User,
  Shield,
  Menu,
  X,
  Layers,
  FileText,
  ShoppingBag,
  Bot,
  LayoutDashboard,
  Globe,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setSearchOpen, bookmarks } = useApp();
  const { currentUser, role, setLoginModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources Directory', icon: <Layers className="w-4 h-4" /> },
    { id: 'articles', label: 'Articles & Guides', icon: <FileText className="w-4 h-4" /> },
    { id: 'products', label: 'Digital Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'ai-workspace', label: 'AI Workspace', icon: <Bot className="w-4 h-4" /> },
    { id: 'sitemap', label: 'SEO Sitemap', icon: <Globe className="w-4 h-4" /> },
  ];

  if (role === 'admin' || role === 'superadmin' || role === 'editor') {
    navLinks.push({ id: 'admin', label: 'Admin Panel', icon: <LayoutDashboard className="w-4 h-4" /> });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 overflow-hidden">
          {/* Logo */}
          <Logo size="md" compactOnMobile onClick={() => setActiveTab('home')} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
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
            ))}
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

            {/* Role Badge & Auth */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-950/30 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/40 transition-all shrink-0"
              title={`Logged in as ${role}`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span className="capitalize hidden sm:inline">{role}</span>
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
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 p-4 space-y-2">
          {navLinks.map((link) => (
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
          ))}
        </div>
      )}
    </header>
  );
};

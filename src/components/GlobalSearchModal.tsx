import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Sparkles, Calculator, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, searchResults, navigateToResource, navigateToArticle, setActiveTab } = useApp();

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 pt-16 sm:pt-24 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-4">
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3 flex-1 pr-4">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search 50+ AI tools, calculators, templates, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-base text-white placeholder-zinc-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tags Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs text-zinc-400 font-mono">
          <span className="text-zinc-500">Popular:</span>
          {['MRR Calculator', 'SaaS Churn', 'Notion Template', 'Cold Email', 'SEO Guide'].map((term, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(term)}
              className="rounded-lg bg-zinc-900 px-2.5 py-1 text-zinc-300 hover:bg-zinc-800 hover:text-white whitespace-nowrap border border-zinc-800"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="space-y-4 max-h-96 overflow-y-auto pt-2">
          {searchResults.resources.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Tools & Resources ({searchResults.resources.length})
              </span>
              <div className="space-y-1.5">
                {searchResults.resources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigateToResource(res.slug);
                    }}
                    className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 hover:border-indigo-500/50 hover:bg-zinc-900 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 font-bold text-xs uppercase">
                        {res.type.slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{res.title}</h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{res.shortSummary}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.articles.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                Articles & Guides ({searchResults.articles.length})
              </span>
              <div className="space-y-1.5">
                {searchResults.articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigateToArticle(art.slug);
                    }}
                    className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 hover:border-pink-500/50 hover:bg-zinc-900 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-pink-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{art.title}</h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{art.metaDescription}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.resources.length === 0 && searchResults.articles.length === 0 && (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No matching resources or articles found for "{searchQuery}". Try searching "Calculator", "Prompt", or "SEO".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

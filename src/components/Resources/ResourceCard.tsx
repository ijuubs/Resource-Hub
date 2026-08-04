import React from 'react';
import { Resource } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Bookmark, Star, Download, Eye, Sparkles, Calculator, LayoutTemplate, Briefcase, TrendingUp } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, className = '' }) => {
  const { navigateToResource } = useApp();
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(resource.id);

  const typeIcons: Record<string, React.ReactNode> = {
    'ai-tool': <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    calculator: <Calculator className="w-3.5 h-3.5 text-emerald-400" />,
    template: <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />,
    guide: <Briefcase className="w-3.5 h-3.5 text-pink-400" />,
    download: <Download className="w-3.5 h-3.5 text-amber-400" />,
    checklist: <TrendingUp className="w-3.5 h-3.5 text-teal-400" />,
  };

  return (
    <div
      onClick={() => navigateToResource(resource.slug)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer ${className}`}
    >
      {/* Thumbnail Header */}
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
        <img
          src={resource.featuredImage}
          alt={resource.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-zinc-200 border border-zinc-700/60">
            {typeIcons[resource.type] || <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="capitalize">{resource.type.replace('-', ' ')}</span>
          </span>
          {resource.isPremium && (
            <span className="rounded-md bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-zinc-950">
              PRO
            </span>
          )}
        </div>

        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(resource.id);
          }}
          className={`absolute top-2.5 right-2.5 rounded-full p-2 backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Bottom meta stats */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-zinc-300 font-mono">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {resource.rating} ({resource.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-zinc-400" />
            {resource.viewsCount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between space-y-3">
        <div>
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {resource.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {resource.shortSummary}
          </p>
        </div>

        {/* Tags footer */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-400 font-mono">
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform">
            Try Tool →
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Resource } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bookmark,
  Star,
  Download,
  Eye,
  Sparkles,
  Calculator,
  LayoutTemplate,
  Briefcase,
  TrendingUp,
  Share2,
  Check,
  ArrowRight,
} from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, className = '' }) => {
  const { navigateToResource } = useApp();
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(resource.id);

  const [copied, setCopied] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  // Framer motion drag setup
  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [-120, 0], [1, 0]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/?resource=${resource.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCardClick = () => {
    // Only navigate if not actively finishing a swipe drag
    if (!isSwiping) {
      navigateToResource(resource.slug);
    }
  };

  const typeIcons: Record<string, React.ReactNode> = {
    'ai-tool': <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    calculator: <Calculator className="w-3.5 h-3.5 text-emerald-400" />,
    template: <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />,
    guide: <Briefcase className="w-3.5 h-3.5 text-pink-400" />,
    download: <Download className="w-3.5 h-3.5 text-amber-400" />,
    checklist: <TrendingUp className="w-3.5 h-3.5 text-teal-400" />,
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-zinc-950/80 p-0.5 ${className}`}>
      {/* Background Swipe Actions (Revealed when card is dragged left) */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-y-0 right-0 flex items-center justify-end gap-2 px-4 bg-gradient-to-l from-indigo-950 via-zinc-900 to-transparent rounded-r-2xl border border-indigo-500/30 z-0"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(resource.id);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-transform active:scale-95 ${
            bookmarked
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
              : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Save to Library'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
          <span className="text-[9px] font-bold mt-1">{bookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-transform active:scale-95"
          title="Share Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span className="text-[9px] font-bold mt-1">{copied ? 'Copied' : 'Share'}</span>
        </button>
      </motion.div>

      {/* Swipeable Foreground Card */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -130, right: 0 }}
        dragElastic={0.08}
        onDragStart={() => setIsSwiping(true)}
        onDragEnd={(_, info) => {
          // Reset swipe guard after drag finishes
          setTimeout(() => setIsSwiping(false), 150);
          if (info.offset.x > -20) {
            x.set(0);
          }
        }}
        onClick={handleCardClick}
        className="relative z-10 flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer touch-pan-y"
      >
        {/* Thumbnail Header */}
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
          <img
            src={resource.featuredImage}
            alt={resource.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
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

          {/* Desktop / Direct Bookmark Toggle */}
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
            aria-label="Bookmark resource"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>

          {/* Swipe hint on touch devices */}
          <div className="absolute top-2.5 right-12 hidden sm:group-hover:flex items-center gap-1 rounded-full bg-zinc-900/80 backdrop-blur-md px-2 py-1 text-[9px] font-mono text-zinc-400 border border-zinc-800">
            <span>Swipe ← for actions</span>
          </div>

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
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform">
              <span>Try Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

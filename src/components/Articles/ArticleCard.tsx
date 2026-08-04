import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Article } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Clock, ArrowRight, Share2, Check, Bookmark } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  const { navigateToArticle } = useApp();
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(article.id);

  const [copied, setCopied] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  // Framer Motion drag values
  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [-120, 0], [1, 0]);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/?article=${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCardClick = () => {
    if (!isSwiping) {
      navigateToArticle(article.slug);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-zinc-950/80 p-0.5 ${className}`}>
      {/* Background Swipe Actions (Revealed when dragged left) */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-y-0 right-0 flex items-center justify-end gap-2 px-4 bg-gradient-to-l from-indigo-950 via-zinc-900 to-transparent rounded-r-2xl border border-indigo-500/30 z-0"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(article.id);
          }}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-transform active:scale-95 ${
            bookmarked
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40'
              : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Save Guide'}
        >
          <Bookmark className="w-4 h-4 fill-current" />
          <span className="text-[9px] font-bold mt-1">{bookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white border border-zinc-700 transition-transform active:scale-95"
          title="Share Guide"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          <span className="text-[9px] font-bold mt-1">{copied ? 'Copied' : 'Share'}</span>
        </button>
      </motion.div>

      {/* Foreground Card */}
      <motion.div
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -130, right: 0 }}
        dragElastic={0.08}
        onDragStart={() => setIsSwiping(true)}
        onDragEnd={(_, info) => {
          setTimeout(() => setIsSwiping(false), 150);
          if (info.offset.x > -20) {
            x.set(0);
          }
        }}
        onClick={handleCardClick}
        className="relative z-10 flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer touch-pan-y"
      >
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2.5 left-2.5 rounded-md bg-zinc-900/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-indigo-400 uppercase tracking-wider border border-zinc-700/60">
            {article.category}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(article.id);
            }}
            className={`absolute top-2.5 right-2.5 rounded-full p-2 backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            aria-label="Bookmark article"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                {article.readingTimeMinutes} min read
              </span>
              <span>•</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>

            <h3 className="text-base font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h3>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {article.metaDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-[11px] text-zinc-400 truncate max-w-[120px]">{article.author.name}</span>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

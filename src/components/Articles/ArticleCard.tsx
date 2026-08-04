import React from 'react';
import { Article } from '../../types';
import { useApp } from '../../context/AppContext';
import { Clock, ArrowRight, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  const { navigateToArticle } = useApp();

  return (
    <div
      onClick={() => navigateToArticle(article.slug)}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer ${className}`}
    >
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 rounded-md bg-zinc-900/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono text-indigo-400 uppercase tracking-wider border border-zinc-700/60">
          {article.category}
        </div>
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
    </div>
  );
};

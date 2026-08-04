import React, { useEffect } from 'react';
import { Article } from '../../types';
import { useApp } from '../../context/AppContext';
import { updateMetaTags } from '../../utils/seo';
import { ResourceCard } from '../Resources/ResourceCard';
import { SchemaVisualizer } from '../SEO/SchemaVisualizer';
import { NewsletterCTA } from '../Monetization/NewsletterCTA';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, BookOpen, Check } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
  const { setActiveTab, resources } = useApp();

  useEffect(() => {
    updateMetaTags({
      title: article.title,
      description: article.metaDescription,
      canonicalUrl: `${window.location.origin}/?article=${article.slug}`,
      ogType: 'article',
      ogImage: article.featuredImage,
      keywords: [article.category, ...article.tags],
    });
  }, [article]);

  // Find linked resources
  const linkedResources = resources.filter((r) => article.relatedResourceIds.includes(r.id));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => setActiveTab('articles')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Articles & Guides</span>
      </button>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 border border-indigo-500/20 uppercase">
            {article.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTimeMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-zinc-300 leading-relaxed font-normal">
          {article.metaDescription}
        </p>

        {/* Author box */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
            <div>
              <h4 className="text-sm font-bold text-white">{article.author.name}</h4>
              <p className="text-xs text-zinc-400">{article.author.role}</p>
            </div>
          </div>

          <span className="text-xs text-zinc-500 font-mono">
            Updated: {new Date(article.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="space-y-6 text-zinc-200 leading-relaxed text-base">
        {article.contentBlocks.map((block) => {
          if (block.type === 'heading') {
            return (
              <h2 key={block.id} className="text-2xl font-bold text-white tracking-tight pt-4">
                {block.content}
              </h2>
            );
          }
          if (block.type === 'callout') {
            return (
              <div key={block.id} className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-5 text-sm text-indigo-200 font-medium">
                {block.content}
              </div>
            );
          }
          return (
            <p key={block.id} className="text-zinc-300">
              {block.content}
            </p>
          );
        })}
      </div>

      {/* Linked Resources Widget */}
      {linkedResources.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Interactive Tools Mentioned in this Article
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {linkedResources.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Lead Magnet */}
      <NewsletterCTA className="my-8" />

      {/* SEO Article Schema Visualizer */}
      <SchemaVisualizer
        itemType="Article"
        data={{
          headline: article.title,
          description: article.metaDescription,
          author: { "@type": "Person", name: article.author.name },
          publisher: { "@type": "Organization", name: "ResourceHub" },
          datePublished: article.createdAt,
          dateModified: article.updatedAt,
        }}
      />
    </div>
  );
};

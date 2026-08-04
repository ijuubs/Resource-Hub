import React from 'react';
import { motion } from 'motion/react';

export const ResourceCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-4 animate-shimmer">
      {/* Thumbnail Header Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800/60">
        <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
          <div className="h-6 w-24 rounded-md bg-zinc-700/60" />
          <div className="h-5 w-10 rounded-md bg-zinc-700/40" />
        </div>
        <div className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-zinc-700/60" />
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between">
          <div className="h-4 w-20 rounded bg-zinc-700/50" />
          <div className="h-4 w-16 rounded bg-zinc-700/50" />
        </div>
      </div>

      {/* Card Content Skeleton */}
      <div className="flex flex-1 flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Title */}
          <div className="h-5 w-4/5 rounded-md bg-zinc-800" />
          {/* Summary lines */}
          <div className="h-3.5 w-full rounded bg-zinc-800/60" />
          <div className="h-3.5 w-2/3 rounded bg-zinc-800/60" />
        </div>

        {/* Tags & CTA Footer Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80">
          <div className="flex gap-1.5">
            <div className="h-4 w-12 rounded-md bg-zinc-800" />
            <div className="h-4 w-16 rounded-md bg-zinc-800" />
          </div>
          <div className="h-4 w-20 rounded-md bg-indigo-900/40" />
        </div>
      </div>
    </div>
  );
};

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4 animate-shimmer">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800/60">
        <div className="absolute top-2.5 left-2.5 h-5 w-20 rounded-md bg-zinc-700/60" />
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Time & Date Meta */}
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-16 rounded bg-zinc-800" />
            <div className="h-3.5 w-20 rounded bg-zinc-800" />
          </div>
          {/* Title */}
          <div className="h-5 w-11/12 rounded-md bg-zinc-800" />
          <div className="h-5 w-3/4 rounded-md bg-zinc-800" />
          {/* Description */}
          <div className="h-3.5 w-full rounded bg-zinc-800/60" />
          <div className="h-3.5 w-4/5 rounded bg-zinc-800/60" />
        </div>

        {/* Author & Footer */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-zinc-800" />
            <div className="h-3.5 w-24 rounded bg-zinc-800" />
          </div>
          <div className="h-4 w-20 rounded bg-indigo-900/40" />
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-4 animate-shimmer">
      {/* Feature Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-800/60">
        <div className="absolute top-2 right-2 h-6 w-14 rounded-full bg-zinc-700/60" />
        <div className="absolute top-2 left-2 h-5 w-16 rounded-md bg-zinc-700/60" />
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Title */}
          <div className="h-5 w-4/5 rounded-md bg-zinc-800" />
          {/* Description */}
          <div className="h-3.5 w-full rounded bg-zinc-800/60" />
          <div className="h-3.5 w-3/4 rounded bg-zinc-800/60" />

          {/* Features bullet list skeletons */}
          <div className="space-y-1.5 py-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-900/40" />
              <div className="h-3 w-40 rounded bg-zinc-800/50" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-900/40" />
              <div className="h-3 w-48 rounded bg-zinc-800/50" />
            </div>
          </div>
        </div>

        {/* Price & Button Footer */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-6 w-16 rounded bg-zinc-800" />
            <div className="h-3 w-20 rounded bg-zinc-800/60" />
          </div>
          <div className="h-8 w-28 rounded-lg bg-indigo-600/40" />
        </div>
      </div>
    </div>
  );
};

export const ResourceDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-shimmer max-w-5xl mx-auto py-6">
      <div className="h-8 w-32 rounded-xl bg-zinc-800" />

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-zinc-800/60" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-3/4 rounded-xl bg-zinc-800" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-zinc-800/60" />
            <div className="h-4 w-full rounded bg-zinc-800/60" />
            <div className="h-4 w-2/3 rounded bg-zinc-800/60" />
          </div>

          <div className="h-64 w-full rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4">
            <div className="h-6 w-40 rounded bg-zinc-800" />
            <div className="h-32 w-full rounded-xl bg-zinc-800/40" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-48 w-full rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-3">
            <div className="h-6 w-32 rounded bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-800/60" />
            <div className="h-10 w-full rounded-xl bg-indigo-600/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SkeletonGridProps {
  type: 'resource' | 'article' | 'product';
  count?: number;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ type, count = 6 }) => {
  const items = Array.from({ length: count });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((_, index) => (
        <div key={index}>
          {type === 'resource' && <ResourceCardSkeleton />}
          {type === 'article' && <ArticleCardSkeleton />}
          {type === 'product' && <ProductCardSkeleton />}
        </div>
      ))}
    </motion.div>
  );
};

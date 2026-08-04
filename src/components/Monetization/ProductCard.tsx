import React from 'react';
import { DigitalProduct } from '../../types';
import { ShoppingCart, Star, Download, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: DigitalProduct;
  onSelect: (product: DigitalProduct) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, className = '' }) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer ${className}`}
    >
      {/* Featured Badge */}
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-zinc-950">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-amber-400 border border-amber-500/20">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>

        <div className="absolute top-2 left-2 rounded-md bg-indigo-600/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white">
          {product.format}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2">{product.shortDescription}</p>

          <div className="py-2 space-y-1">
            {product.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-white">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-xs text-zinc-500 line-through">${product.compareAtPrice}</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500">{product.salesCount} purchases</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all hover:bg-indigo-500 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Get Bundle</span>
          </button>
        </div>
      </div>
    </div>
  );
};

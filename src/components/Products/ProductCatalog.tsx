import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalProduct } from '../../types';
import { ProductCard } from '../Monetization/ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { ShoppingBag, Sparkles, ShieldCheck, Download } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-zinc-950 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Digital Products Store</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production-Ready Founders & Developers Toolkits
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Download plug-and-play Notion operating systems, financial spreadsheets, cold email templates, and AI prompt libraries built to save 100+ hours.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} onSelect={setSelectedProduct} />
        ))}
      </div>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

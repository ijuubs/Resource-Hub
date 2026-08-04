import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DigitalProduct } from '../../types';
import { ProductCard } from '../Monetization/ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { SkeletonGrid } from '../Common/Skeletons';
import { motion } from 'motion/react';
import { ShoppingBag, Sparkles, ShieldCheck, Download, RefreshCw } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, isLoading, triggerLoading } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pb-16"
    >
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-zinc-950 p-8 sm:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

          <button
            onClick={() => triggerLoading(400)}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-indigo-500 transition-all shrink-0"
            title="Refresh Products Catalog"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Reload Store</span>
          </button>
        </div>
      </div>

      {/* Grid or Skeleton Loader */}
      {isLoading ? (
        <SkeletonGrid type="product" count={6} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} onSelect={setSelectedProduct} />
          ))}
        </motion.div>
      )}

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </motion.div>
  );
};

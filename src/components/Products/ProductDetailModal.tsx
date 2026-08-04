import React, { useState } from 'react';
import { DigitalProduct } from '../../types';
import { X, Download, CheckCircle, ShieldCheck, ShoppingCart, Star, FileText, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: DigitalProduct | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  if (!product) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPurchased(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!purchased ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-5">
              <img
                src={product.featuredImage}
                alt={product.title}
                className="w-full sm:w-48 aspect-video sm:aspect-square object-cover rounded-2xl border border-zinc-800"
              />
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-mono uppercase text-indigo-400 border border-indigo-500/20">
                    {product.format} Bundle
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{product.fileSize}</span>
                </div>
                <h2 className="text-xl font-bold text-white leading-tight">{product.title}</h2>
                <div className="flex items-center gap-2 text-xs text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <strong className="text-white">{product.rating}</strong>
                  <span className="text-zinc-500">({product.salesCount} purchases)</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-black text-white">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-zinc-500 line-through">${product.compareAtPrice}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <h3 className="font-bold text-white text-sm">What's Included in this Pack:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 rounded-lg bg-zinc-900 p-2.5 border border-zinc-800">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-200">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant Download Form */}
            <form onSubmit={handleCheckout} className="space-y-3 pt-3 border-t border-zinc-800">
              <label className="text-xs font-semibold text-zinc-300">Enter Email to Receive Direct Download Link</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{loading ? 'Processing...' : `Get Pack ($${product.price})`}</span>
                </button>
              </div>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Instant delivery. Includes lifetime version updates & commercial usage license.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Purchase Confirmed!</h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto">
              Your download link for <strong>{product.title}</strong> has been generated and sent to <strong>{email}</strong>.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  alert(`Downloading ${product.title} (${product.format} file)...`);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-xs font-bold text-zinc-950 shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download {product.format} Package Now ({product.fileSize})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

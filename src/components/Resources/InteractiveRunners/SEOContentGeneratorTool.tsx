import React, { useState } from 'react';
import { Search, Eye, Sparkles, Copy, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

interface SEOContentGeneratorToolProps {
  initialConfig?: Record<string, any>;
}

export const SEOContentGeneratorTool: React.FC<SEOContentGeneratorToolProps> = ({ initialConfig }) => {
  const [primaryKeyword, setPrimaryKeyword] = useState<string>(initialConfig?.keyword || 'SaaS Financial Calculator');
  const [pageTitle, setPageTitle] = useState<string>(
    initialConfig?.title || 'Free SaaS MRR & Revenue Growth Calculator (2026 Interactive Tool)'
  );
  const [metaDescription, setMetaDescription] = useState<string>(
    initialConfig?.description ||
      'Calculate Monthly Recurring Revenue (MRR), ARR, and subscriber churn rates instantly. Download free Excel templates and forecast SaaS financial unit economics.'
  );
  const [contentBody, setContentBody] = useState<string>(
    initialConfig?.body ||
      'Planning your SaaS startup growth requires understanding core SaaS financial metrics. Monthly Recurring Revenue (MRR) is the foundation of any subscription business model. By evaluating MRR, net customer churn rate, customer acquisition cost (CAC), and customer lifetime value (LTV), founders can make data-driven financial decisions.'
  );

  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  // Character Counts & Checks
  const titleCharCount = pageTitle.length;
  const descCharCount = metaDescription.length;

  const isTitleOptimal = titleCharCount >= 45 && titleCharCount <= 60;
  const isDescOptimal = descCharCount >= 135 && descCharCount <= 160;

  // Word count & Keyword Density calculation
  const wordsArray = contentBody
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = wordsArray.length;

  // Primary keyword occurrences
  const cleanKeyword = primaryKeyword.trim().toLowerCase();
  const keywordOccurrences = cleanKeyword
    ? wordsArray.filter((w) => cleanKeyword.includes(w)).length
    : 0;
  const keywordDensity = wordCount > 0 ? ((keywordOccurrences / wordCount) * 100).toFixed(1) : '0.0';

  const generatedHtmlTags = `<title>${pageTitle}</title>\n<meta name="description" content="${metaDescription}" />`;

  const handleCopyTags = () => {
    navigator.clipboard.writeText(generatedHtmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col space-y-0">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/30">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">SEO SERP Simulator & Content Optimizer</h3>
            <p className="text-xs text-zinc-400">Preview Google Search Snippets, Title Lengths & Keyword Density</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setDevicePreview('desktop')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
              devicePreview === 'desktop'
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}
          >
            Desktop SERP
          </button>
          <button
            onClick={() => setDevicePreview('mobile')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
              devicePreview === 'mobile'
                ? 'bg-pink-600 text-white border-pink-500'
                : 'bg-zinc-800 text-zinc-700'
            }`}
          >
            Mobile SERP
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Inputs */}
        <div className="space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80">
          <h4 className="text-xs font-mono uppercase tracking-wider text-pink-400 font-semibold border-b border-zinc-800 pb-2">
            SEO Meta Input Fields
          </h4>

          {/* Primary Keyword */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Target Keyword / Phrase</label>
            <input
              type="text"
              value={primaryKeyword}
              onChange={(e) => setPrimaryKeyword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              placeholder="e.g., SaaS MRR calculator"
            />
          </div>

          {/* Title Tag */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-300">SEO Meta Title</span>
              <span className={`font-mono ${isTitleOptimal ? 'text-emerald-400' : titleCharCount > 60 ? 'text-rose-400' : 'text-amber-400'}`}>
                {titleCharCount} / 60 Chars
              </span>
            </div>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium"
            />
            {titleCharCount > 60 && (
              <p className="text-[11px] text-rose-400">⚠️ Title exceeds 60 characters and will be truncated with (...) on Google.</p>
            )}
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-300">Meta Description</span>
              <span className={`font-mono ${isDescOptimal ? 'text-emerald-400' : descCharCount > 160 ? 'text-rose-400' : 'text-amber-400'}`}>
                {descCharCount} / 160 Chars
              </span>
            </div>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/50 leading-relaxed"
            />
          </div>

          {/* Body Text Analysis */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-300">Article Content Sample</span>
              <span className="font-mono text-zinc-400">{wordCount} Words</span>
            </div>
            <textarea
              rows={4}
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/50 leading-relaxed font-sans"
            />
          </div>
        </div>

        {/* Live SERP Preview & Metrics */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-pink-400" />
              Live Google SERP Snippet Preview ({devicePreview})
            </h4>

            {/* Google SERP Card Visual Mock */}
            <div
              className={`rounded-xl border border-zinc-700 bg-[#202124] p-4 text-left shadow-lg space-y-1.5 font-sans ${
                devicePreview === 'mobile' ? 'max-w-sm mx-auto border-pink-500/40' : 'w-full'
              }`}
            >
              {/* Site Favicon + URL Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] text-[#bdc1c6]">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                  RH
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[#e8eaed] font-medium text-[13px]">ResourceHub</span>
                  <span className="text-[#bdc1c6] text-[11px] truncate">https://resourcehub.dev › resources › saas-mrr-calculator</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#8ab4f8] text-[18px] hover:underline leading-snug font-normal cursor-pointer pt-0.5 line-clamp-1">
                {pageTitle || 'Title Placeholder'}
              </h3>

              {/* Description */}
              <p className="text-[#bdc1c6] text-[13px] leading-relaxed line-clamp-2">
                <span className="text-[#e8eaed] font-semibold">Aug 2026 — </span>
                {metaDescription || 'Meta description placeholder.'}
              </p>
            </div>
          </div>

          {/* SEO Health Scorecard */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Keyword Density</span>
              <p className="text-lg font-bold font-mono text-pink-400">{keywordDensity}%</p>
              <span className="text-[10px] text-zinc-500">{keywordOccurrences} Term Occurrences</span>
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Title Tag Status</span>
              <p className={`text-sm font-bold font-mono ${isTitleOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isTitleOptimal ? 'Optimal (45-60)' : 'Needs Adjustment'}
              </p>
              <span className="text-[10px] text-zinc-500">{titleCharCount} Chars</span>
            </div>
          </div>

          {/* Generated Code Snippet */}
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-pink-400 font-semibold">Generated HTML Meta Tags</span>
              <button
                onClick={handleCopyTags}
                className="inline-flex items-center gap-1 text-zinc-300 hover:text-white font-mono bg-zinc-900 px-2.5 py-1 rounded border border-zinc-700"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied HTML!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="bg-zinc-900/90 p-3 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto">
              {generatedHtmlTags}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

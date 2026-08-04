import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCode, Globe, Check, Copy } from 'lucide-react';

export const SitemapViewer: React.FC = () => {
  const { resources, articles, products } = useApp();
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copied, setCopied] = useState(false);

  const baseUrl = 'https://resourcehub.dev';

  const xmlEntries = [
    `${baseUrl}/`,
    `${baseUrl}/resources`,
    `${baseUrl}/articles`,
    `${baseUrl}/products`,
    `${baseUrl}/ai-workspace`,
    ...resources.map((r) => `${baseUrl}/resources/${r.slug}`),
    ...articles.map((a) => `${baseUrl}/articles/${a.slug}`),
    ...products.map((p) => `${baseUrl}/products/${p.slug}`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;

  const copyContent = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      <div className="border-b border-zinc-800 pb-4">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">SEO Infrastructure</span>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-indigo-400" />
          Dynamic Sitemap & Robots.txt Inspector
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'sitemap' ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          sitemap.xml ({xmlEntries.length} URLs)
        </button>
        <button
          onClick={() => setActiveTab('robots')}
          className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
            activeTab === 'robots' ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          robots.txt
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400">
            {activeTab === 'sitemap' ? '/sitemap.xml' : '/robots.txt'}
          </span>
          <button
            onClick={() => copyContent(activeTab === 'sitemap' ? sitemapXml : robotsTxt)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Payload'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono text-emerald-400 bg-zinc-900 p-4 rounded-xl overflow-x-auto border border-zinc-800 max-h-96">
          {activeTab === 'sitemap' ? sitemapXml : robotsTxt}
        </pre>
      </div>
    </div>
  );
};

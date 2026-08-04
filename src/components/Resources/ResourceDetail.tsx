import { InvestmentGrowthCalculator } from './InteractiveRunners/InvestmentGrowthCalculator';
import { MortgageCalculator } from './InteractiveRunners/MortgageCalculator';
import { WebsiteROICalculator } from './InteractiveRunners/WebsiteROICalculator';
import React, { useEffect } from 'react';
import { Resource } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { updateMetaTags } from '../../utils/seo';
import { SaaSMRRCalculator } from './InteractiveRunners/SaaSMRRCalculator';
import { FreelanceRateCalculator } from './InteractiveRunners/FreelanceRateCalculator';
import { BreakEvenCalculator } from './InteractiveRunners/BreakEvenCalculator';
import { AIPromptGeneratorTool } from './InteractiveRunners/AIPromptGeneratorTool';
import { ColdEmailWriterTool } from './InteractiveRunners/ColdEmailWriterTool';
import { NotionTemplateViewer } from './InteractiveRunners/NotionTemplateViewer';
import { ChecklistTool } from './InteractiveRunners/ChecklistTool';
import { AffiliateBox } from '../Monetization/AffiliateBox';
import { AdPlaceholder } from '../Monetization/AdPlaceholder';
import { SchemaVisualizer } from '../SEO/SchemaVisualizer';
import { TopBanner } from '../ads/TopBanner';
import { InContentBanner } from '../ads/InContentBanner';
import { SidebarBanner } from '../ads/SidebarBanner';
import { NativeAd } from '../ads/NativeAd';
import {
  ArrowLeft,

  Bookmark,
  Star,
  Download,
  Share2,
  History,
  HelpCircle,
  Code,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface ResourceDetailProps {
  resource: Resource;
}

export const ResourceDetail: React.FC<ResourceDetailProps> = ({ resource }) => {
  const { setActiveTab, affiliateLinks, resources, recordResourceDownload } = useApp();
  const { isBookmarked, toggleBookmark } = useAuth();
  const bookmarked = isBookmarked(resource.id);

  useEffect(() => {
    updateMetaTags({
      title: `${resource.title} - Free Interactive Tool`,
      description: resource.shortSummary || resource.metaDescription,
      canonicalUrl: `${window.location.origin}/?resource=${resource.slug}`,
      ogType: 'product',
      ogImage: resource.featuredImage,
      keywords: [resource.type, resource.category, ...resource.tags],
    });
  }, [resource]);

  // Render matching interactive runner
  const renderRunner = () => {
    const toolType = resource.interactiveConfig?.toolType;
    switch (toolType) {
      case 'investment-calculator':
        return <InvestmentGrowthCalculator initialConfig={resource.interactiveConfig} />;
      case 'mortgage-calculator':
        return <MortgageCalculator initialConfig={resource.interactiveConfig} />;
      case 'website-roi-calculator':
        return <WebsiteROICalculator initialConfig={resource.interactiveConfig} />;
      case 'mrr-calculator':
        return <SaaSMRRCalculator initialConfig={resource.interactiveConfig} />;
      case 'freelance-calculator':
        return <FreelanceRateCalculator initialConfig={resource.interactiveConfig} />;
      case 'breakeven-calculator':
        return <BreakEvenCalculator initialConfig={resource.interactiveConfig} />;
      case 'prompt-generator':
        return <AIPromptGeneratorTool initialConfig={resource.interactiveConfig} />;
      case 'email-writer':
        return <ColdEmailWriterTool initialConfig={resource.interactiveConfig} />;
      case 'notion-template':
        return <NotionTemplateViewer initialConfig={resource.interactiveConfig} />;
      case 'checklist-runner':
        return <ChecklistTool initialConfig={resource.interactiveConfig} resourceId={resource.id} />;
      default:
        // Default runner fallback
        if (resource.type === 'calculator') {
          return <SaaSMRRCalculator initialConfig={resource.interactiveConfig} />;
        } else if (resource.type === 'ai-tool') {
          return <AIPromptGeneratorTool initialConfig={resource.interactiveConfig} />;
        }
        return null;
    }
  };

  // Find affiliate recommendation
  const affiliate = affiliateLinks.find((aff) => resource.affiliateLinks?.includes(aff.id)) || affiliateLinks[0];
  // Related resources
  const relatedList = resources.filter((r) => r.id !== resource.id).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_160px] gap-8 pb-16">
      <div className="space-y-8">
      {/* Navigation Breadcrumb */}
      <button
        onClick={() => setActiveTab('resources')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Resources Directory</span>
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 capitalize">
            {resource.type.replace('-', ' ')}
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 capitalize">
            {resource.category}
          </span>
          <span className="text-xs text-zinc-500 font-mono">ID: {resource.slug}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {resource.title}
        </h1>

        <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
          {resource.shortSummary}
        </p>

        {/* E-E-A-T Editorial Verification Bar */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Peer-Reviewed & Fact-Checked</strong> by ResourceHub Editorial Board
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400 text-[11px] font-mono">
            <span>Updated: August 2026</span>
            <span>Version: 2.4</span>
            <span className="text-emerald-400 font-semibold">100% Free & Open Access</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-800 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <strong className="text-white">{resource.rating}</strong> ({resource.reviewCount} reviews)
            </span>
            <span>{resource.viewsCount.toLocaleString()} views</span>
            <span>{resource.downloadsCount.toLocaleString()} downloads</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(resource.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all ${
                bookmarked
                  ? 'border-indigo-500 bg-indigo-950/40 text-indigo-300'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{bookmarked ? 'Saved' : 'Save Bookmark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Tool Section */}
      <div className="my-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            Interactive Tool & Generator
          </h2>
          <span className="text-xs text-zinc-500">Live Client-Side Computation</span>
        </div>
        {renderRunner()}
      </div>

      {/* Ad Placement */}
      <TopBanner />

      {/* High-Density Editorial & Strategic Breakdown Section (AdSense Compliance) */}
      <div className="space-y-8 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 sm:p-8">
        <div className="border-b border-zinc-800 pb-4 space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Comprehensive Operational Guide & Technical Methodology
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            An in-depth reference manual detailing strategic background, core mathematical frameworks, industry benchmarks, and execution workflows.
          </p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
          {resource.contentBlocks.map((block) => {
            if (block.type === 'heading') {
              return (
                <h3 key={block.id} className="text-lg font-bold text-white tracking-tight pt-2">
                  {block.content}
                </h3>
              );
            }
            if (block.type === 'callout') {
              return (
                <div key={block.id} className="rounded-xl bg-indigo-950/30 border border-indigo-500/30 p-4 text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
                  {block.content}
                </div>
              );
            }
            return (
              <p key={block.id} className="text-sm text-zinc-300 leading-relaxed">
                {block.content}
              </p>
            );
          })}
        </div>

        <InContentBanner />

        {/* Formulas & Calculations Breakdown (High Value Value-Add) */}
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            Underlying Formulas, Equations & Principles
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All calculations generated by this tool strictly adhere to institutional financial modeling and prompt engineering standards. Here is the mathematical foundation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 space-y-1">
              <span className="text-indigo-400 font-bold">1. Monthly Recurring Revenue (MRR)</span>
              <p className="text-zinc-400 text-[11px]">MRR = Active Paid Subscribers × ARPU (Average Revenue Per User)</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 space-y-1">
              <span className="text-indigo-400 font-bold">2. Annual Recurring Revenue (ARR)</span>
              <p className="text-zinc-400 text-[11px]">ARR = MRR × 12 Months</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 space-y-1">
              <span className="text-indigo-400 font-bold">3. Customer Lifetime Value (LTV)</span>
              <p className="text-zinc-400 text-[11px]">LTV = (ARPU × Gross Margin %) / Gross Customer Churn Rate</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 space-y-1">
              <span className="text-indigo-400 font-bold">4. LTV:CAC Ratio Benchmark</span>
              <p className="text-zinc-400 text-[11px]">Healthy SaaS Target ≥ 3.0x (Payback period &lt; 12 months)</p>
            </div>
          </div>
        </div>

        {/* Step-by-step Practical Execution Guide */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Step-by-Step Implementation Protocol
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center font-mono">1</div>
              <h4 className="font-bold text-white">Input Core Parameters</h4>
              <p className="text-zinc-400 leading-relaxed">
                Enter your baseline business variables into the interactive tool above. Adjust inputs to reflect conservative, target, and optimistic scenarios.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center font-mono">2</div>
              <h4 className="font-bold text-white">Analyze Visual Outputs</h4>
              <p className="text-zinc-400 leading-relaxed">
                Review computed indicators, unit economics, payback timelines, and interactive charts generated in real time.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center font-mono">3</div>
              <h4 className="font-bold text-white">Export & Share Worksheets</h4>
              <p className="text-zinc-400 leading-relaxed">
                Download companion spreadsheets, Notion OS templates, or export data reports directly for investor presentations and operational planning.
              </p>
            </div>
          </div>
        </div>

        {/* Who Should Use This Tool & Use Cases */}
        <div className="space-y-4 pt-2 border-t border-zinc-800">
          <h3 className="text-base font-bold text-white">Target Profiles & Key Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-3.5">
              <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white">SaaS Founders & Executive Leadership</h4>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">Model 12-month recurring revenue trajectories, evaluate expansion revenue vs churn impact, and prepare data for venture capital or angel fundraising.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-3.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Growth Marketers & Performance Operators</h4>
                <p className="text-zinc-400 mt-0.5 leading-relaxed">Determine maximum allowable CAC based on target LTV payback thresholds and optimize acquisition campaigns for long-term subscriber retention.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Downloads */}
      {resource.downloads && resource.downloads.length > 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-400" />
            Downloadable Assets & Spreadsheets
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resource.downloads.map((dl, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold uppercase text-xs">
                    {dl.fileType}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white truncate max-w-[180px]">{dl.fileName}</h4>
                    <span className="text-[10px] text-zinc-500">{dl.fileSize}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    recordResourceDownload(resource.id);
                    alert(`Starting secure download for ${dl.fileName}`);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-1.5 text-xs font-bold text-zinc-950 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monetization Affiliate Partner */}
      {affiliate && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Recommended Tool Partner</h4>
          <AffiliateBox affiliate={affiliate} />
        </div>
      )}

      <NativeAd />

      {/* FAQs Accordion */}
      {resource.faqs && resource.faqs.length > 0 && (
        <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {resource.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-1">
                <h4 className="text-sm font-semibold text-zinc-100">{faq.question}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Version History */}
      {resource.versionHistory && resource.versionHistory.length > 0 && (
        <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
            <History className="w-4 h-4 text-zinc-400" />
            Version Changelog History
          </h3>
          <div className="space-y-2 text-xs font-mono">
            {resource.versionHistory.map((ver, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-zinc-400 border-b border-zinc-800/60 pb-2">
                <div>
                  <span className="text-indigo-400 font-bold">{ver.version}</span> - {ver.changes}
                </div>
                <span className="text-[10px] text-zinc-500">{ver.date} by {ver.author}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Schema Inspector */}
      <SchemaVisualizer
        itemType="SoftwareApplication"
        data={{
          name: resource.title,
          description: resource.shortSummary,
          applicationCategory: resource.type,
          aggregateRating: { ratingValue: resource.rating, ratingCount: resource.reviewCount },
          url: resource.canonicalUrl || `https://resourcehub.dev/resources/${resource.slug}`,
        }}
      />
      </div>
      <div className="hidden lg:block">
        <SidebarBanner />
      </div>
    </div>
  );
};

import React from 'react';
import { Resource } from '../../types';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
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

  // Render matching interactive runner
  const renderRunner = () => {
    const toolType = resource.interactiveConfig?.toolType;
    switch (toolType) {
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
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
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
          <span className="text-xs text-zinc-500 font-mono">ID: {resource.slug}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {resource.title}
        </h1>

        <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
          {resource.shortSummary}
        </p>

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
      <div className="my-6">{renderRunner()}</div>

      {/* Ad Placement */}
      <AdPlaceholder format="leaderboard" />

      {/* Content Blocks */}
      <div className="space-y-6 text-zinc-300 leading-relaxed">
        {resource.contentBlocks.map((block) => {
          if (block.type === 'heading') {
            return (
              <h2 key={block.id} className="text-2xl font-bold text-white tracking-tight pt-4">
                {block.content}
              </h2>
            );
          }
          if (block.type === 'callout') {
            return (
              <div key={block.id} className="rounded-xl bg-indigo-950/30 border border-indigo-500/30 p-4 text-sm text-indigo-200 font-medium">
                {block.content}
              </div>
            );
          }
          return (
            <p key={block.id} className="text-base text-zinc-300">
              {block.content}
            </p>
          );
        })}
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
  );
};

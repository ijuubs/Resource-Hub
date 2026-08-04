import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateAIContent } from '../../services/api';
import { Sparkles, Bot, CheckCircle2, Copy, Check, Play, FileText, Send, Share2, Layers, Search, AlertCircle } from 'lucide-react';

type AIModule = 'resource' | 'article' | 'seo' | 'email' | 'social' | 'product' | 'prompt' | 'grammar';

export const AIWorkspace: React.FC = () => {
  const { addResource, addArticle, setActiveTab } = useApp();
  const [activeModule, setActiveModule] = useState<AIModule>('resource');
  const [promptInput, setPromptInput] = useState(
    'SaaS Churn Reduction Guide: How early stage founders can cut monthly churn from 5% to 2% using automated onboarding emails.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [publishedSuccess, setPublishedSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const modules: { id: AIModule; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'resource', label: 'Resource Generator', icon: <Layers className="w-4 h-4" />, desc: 'Generate complete Resource Specs, FAQs, and content blocks' },
    { id: 'article', label: 'Article & Guide Writer', icon: <FileText className="w-4 h-4" />, desc: 'Write comprehensive SEO guides & teardowns' },
    { id: 'seo', label: 'SEO Optimizer', icon: <Search className="w-4 h-4" />, desc: 'Optimize titles, meta tags, and semantic keywords' },
    { id: 'email', label: 'Email Campaign Generator', icon: <Send className="w-4 h-4" />, desc: 'Draft 3-step B2B cold emails or newsletter dispatches' },
    { id: 'social', label: 'Social Post Pack', icon: <Share2 className="w-4 h-4" />, desc: 'Generate X/Twitter threads & LinkedIn posts' },
    { id: 'product', label: 'Digital Product Copy', icon: <Sparkles className="w-4 h-4" />, desc: 'Write product sales copy & feature bullet points' },
    { id: 'prompt', label: 'Prompt Formula Builder', icon: <Bot className="w-4 h-4" />, desc: 'Draft engineered prompts with parameter controls' },
    { id: 'grammar', label: 'Grammar & Tone Checker', icon: <CheckCircle2 className="w-4 h-4" />, desc: 'Proofread text for conciseness and clarity' },
  ];

  const handleGenerate = async () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);
    setPublishedSuccess(null);

    const res = await generateAIContent({
      moduleType: activeModule,
      prompt: promptInput,
    });

    setIsGenerating(false);

    if (res.success && res.content) {
      setGeneratedContent(res.content);
    } else {
      setError(res.error || 'Gemini API call returned an error. Make sure GEMINI_API_KEY is configured.');
    }
  };

  const handleApproveAndPublish = () => {
    if (!generatedContent) return;

    if (activeModule === 'article') {
      const slugTitle = promptInput.slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newArt = addArticle({
        title: promptInput.slice(0, 70),
        slug: slugTitle,
        metaDescription: `AI-generated guide covering ${promptInput}`,
        category: 'finance-growth',
        contentBlocks: [
          { id: '1', type: 'heading', level: 2, content: 'Executive Overview' },
          { id: '2', type: 'paragraph', content: generatedContent.slice(0, 400) },
          { id: '3', type: 'callout', content: 'Verified and Human-Approved by ResourceHub Editor.' },
        ],
        status: 'published',
      });
      setPublishedSuccess(`Published Article "${newArt.title}" successfully to Articles Hub!`);
    } else {
      const slugTitle = promptInput.slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newRes = addResource({
        title: promptInput.slice(0, 70),
        slug: slugTitle,
        type: 'ai-tool',
        category: 'ai-tools',
        shortSummary: generatedContent.slice(0, 180),
        contentBlocks: [
          { id: '1', type: 'paragraph', content: generatedContent },
        ],
        status: 'published',
      });
      setPublishedSuccess(`Published Resource "${newRes.title}" successfully to Resource Directory!`);
    }
  };

  const copyContent = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-zinc-900 to-zinc-950 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Studio Generator Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Content & Tool Generator Workspace
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Powered by <strong>Google Gemini 3.6 Flash</strong>. Generate resources, SEO guides, email sequences, and prompts with mandatory human approval before publishing.
          </p>
        </div>
      </div>

      {/* Module Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all ${
              activeModule === mod.id
                ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-lg shadow-indigo-500/10'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeModule === mod.id ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
              {mod.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{mod.label}</h4>
              <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{mod.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="w-4 h-4" /> Gemini Prompt Input — {modules.find((m) => m.id === activeModule)?.label}
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Model: gemini-3.6-flash</span>
        </div>

        <textarea
          rows={4}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Describe what you want to generate in detail..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
        />

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !promptInput.trim()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isGenerating ? 'Gemini AI is Reasoning & Generating...' : 'Generate with Gemini 3.6 Flash'}</span>
        </button>

        {error && (
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Generated AI Output */}
      {generatedContent && (
        <div className="space-y-4 rounded-2xl border border-indigo-500/40 bg-zinc-950 p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pending Human Approval
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyContent}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>

              <button
                onClick={handleApproveAndPublish}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 text-xs font-bold text-zinc-950 shadow"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Publish Live</span>
              </button>
            </div>
          </div>

          {publishedSuccess && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs font-semibold text-emerald-300 flex items-center justify-between">
              <span>{publishedSuccess}</span>
              <button
                onClick={() => setActiveTab(activeModule === 'article' ? 'articles' : 'resources')}
                className="underline text-emerald-400 hover:text-white"
              >
                View Live →
              </button>
            </div>
          )}

          <div className="rounded-xl bg-zinc-900 p-5 text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-mono border border-zinc-800 max-h-96 overflow-y-auto">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
};

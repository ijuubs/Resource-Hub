import React, { useState } from 'react';
import { generateAIContent } from '../../../services/api';
import { Mail, Sparkles, Send, Copy, Check, RefreshCcw } from 'lucide-react';

interface ColdEmailWriterToolProps {
  initialConfig?: Record<string, any>;
}

export const ColdEmailWriterTool: React.FC<ColdEmailWriterToolProps> = ({ initialConfig }) => {
  const [targetAudience, setTargetAudience] = useState(
    initialConfig?.defaultState?.targetAudience || 'Marketing Directors at Mid-Market E-commerce Brands'
  );
  const [productDescription, setProductDescription] = useState(
    initialConfig?.defaultState?.productDescription || 'An AI creative testing engine that reduces Facebook CAC by 35%.'
  );
  const [tone, setTone] = useState(initialConfig?.defaultState?.tone || 'professional-friendly');

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput(null);

    const prompt = `Write a 3-part B2B Cold Email Sequence for the following target audience and product:
Target Audience: ${targetAudience}
Product / Value Proposition: ${productDescription}
Desired Tone: ${tone}

Requirements:
Email 1: Hook + Problem + Brief Case Study + Soft Call to Action (< 100 words)
Email 2 (3 days later): 1-sentence value bump + short video/case study link idea
Email 3 (7 days later): Quick breakup email

Provide subject lines for each email.`;

    const res = await generateAIContent({
      moduleType: 'email',
      prompt,
    });

    setLoading(false);
    if (res.success && res.content) {
      setOutput(res.content);
    } else {
      setOutput('Unable to connect to Gemini API backend. Ensure GEMINI_API_KEY is configured in server secrets.');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Outreach AI</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            B2B Cold Email Sequence Generator
          </h3>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Target Audience / Persona</label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Product / Offer Core Value Prop</label>
          <textarea
            rows={2}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Tone of Voice</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
          >
            <option value="professional-friendly">Professional & Conversational</option>
            <option value="direct-punchy">Direct & Concise (under 60 words)</option>
            <option value="executive">C-Level / Executive</option>
            <option value="casual-humorous">Casual & Lighthearted</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'Gemini AI is Writing Email Sequence...' : 'Generate 3-Step Cold Sequence'}</span>
        </button>
      </div>

      {output && (
        <div className="rounded-xl bg-zinc-900 border border-indigo-500/30 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold text-emerald-400">Generated Email Campaign</span>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Sequence!' : 'Copy All Emails'}</span>
            </button>
          </div>
          <div className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans bg-zinc-950 p-4 rounded-lg border border-zinc-800/80">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

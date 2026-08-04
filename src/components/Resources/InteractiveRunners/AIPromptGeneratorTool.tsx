import React, { useState } from 'react';
import { generateAIContent } from '../../../services/api';
import { Sparkles, Copy, Check, Terminal, Play, Bot } from 'lucide-react';

interface AIPromptGeneratorToolProps {
  initialConfig?: Record<string, any>;
}

export const AIPromptGeneratorTool: React.FC<AIPromptGeneratorToolProps> = ({ initialConfig }) => {
  const templates = initialConfig?.promptTemplates || [
    {
      title: 'SaaS Value Proposition Generator',
      prompt: 'Act as a world-class SaaS brand strategist. Generate 5 unique value propositions for a product with the following details: [PRODUCT_NAME], solving [PROBLEM], targeting [AUDIENCE]. Return structured output with sub-headline, elevator pitch, and key differentiators.',
    },
    {
      title: 'SEO Article Outline & Keyword Strategy',
      prompt: 'Generate an SEO-optimized article outline for the topic [TOPIC]. Include target intent, H2/H3 headings, estimated word count per section, semantic LSI keywords, and 3 FAQ questions with Schema-ready answers.',
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [customInput, setCustomInput] = useState('Product: ResourceHub SaaS. Problem: Scattered growth templates. Audience: Early-stage tech founders.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAI = async () => {
    setIsGenerating(true);
    setError(null);
    setAiOutput(null);

    const fullPrompt = `${selectedTemplate.prompt}\n\nContext & Specific Input:\n${customInput}`;

    const res = await generateAIContent({
      moduleType: 'prompt',
      prompt: fullPrompt,
    });

    setIsGenerating(false);

    if (res.success && res.content) {
      setAiOutput(res.content);
    } else {
      setError(res.error || 'Failed to generate response from Gemini AI. Please check server configuration.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-indigo-500/30 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">Gemini 3.6 AI Tool</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            AI Prompt Recipe Tester
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 border border-indigo-500/20">
          <Bot className="w-3.5 h-3.5" /> Gemini 3.6 Flash
        </span>
      </div>

      {/* Preset Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300">Select Prompt Formula</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {templates.map((tpl: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedTemplate(tpl)}
              className={`rounded-xl border p-3 text-left transition-all text-xs font-medium ${
                selectedTemplate.title === tpl.title
                  ? 'border-indigo-500 bg-indigo-950/40 text-white shadow-md'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              {tpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* System Prompt Formula View */}
      <div className="rounded-xl bg-zinc-900 p-4 border border-zinc-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono text-indigo-300">Base System Prompt Template:</span>
          <button
            onClick={() => copyToClipboard(selectedTemplate.prompt)}
            className="flex items-center gap-1 text-zinc-400 hover:text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Base Prompt</span>
          </button>
        </div>
        <p className="text-xs font-mono text-zinc-300 bg-zinc-950 p-3 rounded-lg border border-zinc-800/80 leading-relaxed">
          {selectedTemplate.prompt}
        </p>
      </div>

      {/* User Input Variables */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-zinc-300">Custom Input Parameters</label>
        <textarea
          rows={3}
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Provide product details or specific domain context..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <button
        onClick={handleRunAI}
        disabled={isGenerating}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:from-indigo-500 hover:to-violet-500 active:scale-95 disabled:opacity-50"
      >
        <Play className="w-4 h-4 fill-white" />
        <span>{isGenerating ? 'Gemini AI is Reasoning & Generating...' : 'Run Live Gemini 3.6 Prompt'}</span>
      </button>

      {error && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Generated AI Output */}
      {aiOutput && (
        <div className="rounded-xl bg-zinc-900 border border-indigo-500/40 p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Gemini AI Generated Output
            </span>
            <button
              onClick={() => copyToClipboard(aiOutput)}
              className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Result</span>
            </button>
          </div>
          <div className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans bg-zinc-950 p-4 rounded-lg border border-zinc-800/80 max-h-96 overflow-y-auto">
            {aiOutput}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, LayoutTemplate, Layers, CheckSquare, Sparkles } from 'lucide-react';

interface NotionTemplateViewerProps {
  initialConfig?: Record<string, any>;
}

export const NotionTemplateViewer: React.FC<NotionTemplateViewerProps> = ({ initialConfig }) => {
  const notionUrl = initialConfig?.defaultState?.notionUrl || 'https://notion.so/templates/startup-os-resourcehub-2026';
  const templateName = initialConfig?.defaultState?.templateName || 'Startup OS Notion Workspace';
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(notionUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Notion Workspace</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-400" />
            {templateName}
          </h3>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
            N
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Interactive Workspace Duplicate Link</h4>
            <p className="text-xs text-zinc-400">Click below to duplicate this workspace directly into your Notion account.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 text-xs">
            <span className="text-zinc-500 block text-[10px]">Pre-built DBs</span>
            <span className="font-bold text-white">8 Databases</span>
          </div>
          <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 text-xs">
            <span className="text-zinc-500 block text-[10px]">Views Included</span>
            <span className="font-bold text-white">Kanban, Table, Timeline</span>
          </div>
          <div className="rounded-lg bg-zinc-950 p-3 border border-zinc-800 text-xs">
            <span className="text-zinc-500 block text-[10px]">Notion AI Ready</span>
            <span className="font-bold text-emerald-400">✓ Fully Compatible</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs font-bold text-white shadow-lg transition-all active:scale-95"
          >
            <span>Duplicate Template to Notion</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={copyUrl}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-750 px-5 py-3 text-xs font-semibold text-zinc-200 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Link' : 'Copy Direct Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

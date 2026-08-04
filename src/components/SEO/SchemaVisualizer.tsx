import React, { useState } from 'react';
import { Code, Copy, Check, Eye } from 'lucide-react';

interface SchemaVisualizerProps {
  itemType: 'SoftwareApplication' | 'Article' | 'Product' | 'FAQPage' | 'Organization';
  data: Record<string, any>;
  className?: string;
}

export const SchemaVisualizer: React.FC<SchemaVisualizerProps> = ({ itemType, data, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": itemType,
    ...data,
  };

  const jsonString = JSON.stringify(jsonLd, null, 2);

  const copySchema = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-950 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
          <Code className="w-4 h-4" />
          <span>JSON-LD Schema Markup ({itemType})</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{open ? 'Hide Schema' : 'Inspect JSON-LD'}</span>
        </button>
      </div>

      {open && (
        <div className="mt-3 space-y-2 pt-3 border-t border-zinc-800">
          <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>Valid Schema.org Payload</span>
            <button onClick={copySchema} className="flex items-center gap-1 hover:text-white">
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Payload'}</span>
            </button>
          </div>
          <pre className="text-[11px] font-mono text-emerald-400 bg-zinc-900 p-3 rounded-lg overflow-x-auto border border-zinc-800">
            {jsonString}
          </pre>
        </div>
      )}
    </div>
  );
};

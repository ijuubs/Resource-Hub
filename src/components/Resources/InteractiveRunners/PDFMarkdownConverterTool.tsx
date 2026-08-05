import React, { useState } from 'react';
import { FileCode, Printer, Download, Copy, CheckCircle2, Eye, Sparkles, BookOpen, Layers } from 'lucide-react';

interface PDFMarkdownConverterToolProps {
  initialConfig?: Record<string, any>;
}

export const PDFMarkdownConverterTool: React.FC<PDFMarkdownConverterToolProps> = ({ initialConfig }) => {
  const [docTitle, setDocTitle] = useState<string>(initialConfig?.title || 'SaaS Master Service Agreement & Terms of Service');
  const [docSubtitle, setDocSubtitle] = useState<string>(initialConfig?.subtitle || 'Standard Enterprise Customer Contract');
  const [authorName, setAuthorName] = useState<string>(initialConfig?.author || 'Acme Cloud Legal Department');
  const [docDate, setDocDate] = useState<string>('August 2026');

  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [accentColor, setAccentColor] = useState<string>('#2563eb'); // Blue default

  const [markdownBody, setMarkdownBody] = useState<string>(
    initialConfig?.body ||
`## 1. Scope of Services
This Agreement governs Customer's subscription and access to the SaaS Cloud Platform provided by Company.

### 1.1 Service Level Agreement (SLA)
Company guarantees a 99.9% monthly Uptime Commitment for core API infrastructure. Scheduled maintenance windows will be communicated 48 hours in advance.

## 2. Customer Responsibilities
Customer shall maintain confidential login credentials and comply with all applicable data privacy and security regulations.

- **Data Ownership:** Customer retains all rights and intellectual property in uploaded customer data.
- **Payment Terms:** Subscriptions are billed monthly in advance via credit card or ACH wire transfer.
- **Termination:** Either party may terminate this agreement with 30 days written notice.

## 3. Confidentiality & Security
Both parties agree to protect proprietary technical information and handle personal data in accordance with SOC-2 Type II standards.`
  );

  const [copied, setCopied] = useState(false);

  // Preset templates handler
  const loadTemplate = (type: string) => {
    if (type === 'proposal') {
      setDocTitle('Enterprise Software Development Proposal');
      setDocSubtitle('Prepared for Nexus Cloud Systems');
      setAuthorName('Acme Digital Consultancy');
      setMarkdownBody(
`## Executive Summary
Acme Consultancy proposes building a modern full-stack SaaS platform utilizing React, Node.js, and Cloud Infrastructure.

### Proposed Milestones & Timeline
1. **Discovery & Wireframing:** Weeks 1–2
2. **Core API & Database Setup:** Weeks 3–5
3. **Frontend Dashboard UI:** Weeks 6–8
4. **Security Audit & Launch:** Weeks 9–10

### Financial Investment
- Development Services: $25,000
- Cloud Hosting Setup: $2,500
- Total Project Fee: $27,500`
      );
    } else if (type === 'notes') {
      setDocTitle('Executive Product Strategy Meeting Notes');
      setDocSubtitle('Quarterly Roadmap & Revenue Alignment');
      setAuthorName('Product Operations Team');
      setMarkdownBody(
`## Meeting Agenda & Key Decisions
Discussion on Q3 SaaS growth goals, new interactive tool launches, and ad revenue optimization.

### Action Items
- [ ] Launch CAC & LTV unit economics calculator on resource hub
- [ ] Optimize sticky footer ad unit viewability for mobile users
- [ ] Publish 3 new programmatic SEO guides targeting organic search keywords

### Target Metrics for Q3
- **Monthly Organic Pageviews:** 150,000+
- **Domain Authority (DR):** 55+
- **AdSense & Affiliate Revenue:** $8,500/mo`
      );
    }
  };

  // Word & Reading Time stats
  const words = markdownBody.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handlePrintPDF = () => {
    window.print();
  };

  const embedCode = `<iframe src="${window.location.origin}/?resource=markdown-document-pdf-converter" width="100%" height="700" frameborder="0"></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple Markdown Parser to formatted HTML
  const renderMarkdownPreview = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="text-lg font-bold mt-5 mb-2 pb-1 border-b"
            style={{ color: accentColor, borderColor: '#e4e4e7' }}
          >
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-zinc-900 mt-4 mb-1">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-zinc-700 my-1 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs text-zinc-800 my-1.5 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col space-y-0">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Free Markdown to PDF & Document Printer</h3>
            <p className="text-xs text-zinc-400">Convert Markdown Notes into Clean Styled Printable PDF Documents</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintPDF}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Export / Print PDF</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Input Controls (Left) */}
        <div className="lg:col-span-5 space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80 max-h-[800px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
              Document Setup & Markdown
            </h4>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-400">Presets:</span>
              <button
                onClick={() => loadTemplate('proposal')}
                className="text-[10px] text-blue-400 hover:underline px-1"
              >
                Proposal
              </button>
              <button
                onClick={() => loadTemplate('notes')}
                className="text-[10px] text-blue-400 hover:underline px-1"
              >
                Meeting Notes
              </button>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Document Title</label>
            <input
              type="text"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Subtitle / Category</label>
              <input
                type="text"
                value={docSubtitle}
                onChange={(e) => setDocSubtitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2.5 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Author / Entity</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2.5 py-1.5 text-xs"
              />
            </div>
          </div>

          {/* Styling Options */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Font Family</label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-2 py-1.5 text-xs"
              >
                <option value="sans">Clean Sans-Serif</option>
                <option value="serif">Editorial Serif</option>
                <option value="mono">Technical Monospace</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300">Primary Accent</label>
              <div className="flex items-center gap-1.5 pt-1">
                {['#2563eb', '#059669', '#7c3aed', '#dc2626', '#0f172a'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      accentColor === color ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Markdown Text Area */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Markdown Content Body</span>
              <span className="font-mono text-zinc-400">{wordCount} Words ({readTimeMinutes} min read)</span>
            </div>
            <textarea
              rows={12}
              value={markdownBody}
              onChange={(e) => setMarkdownBody(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg p-3 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        {/* Live Formatted Paper Preview (Right) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-mono">Printable Paper Document Sheet Preview</span>
            <button
              onClick={handlePrintPDF}
              className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Export PDF
            </button>
          </div>

          {/* Document Sheet */}
          <div
            id="printable-markdown-doc"
            className={`bg-white text-zinc-900 rounded-lg p-8 shadow-2xl min-h-[680px] flex flex-col justify-between border border-zinc-200 ${
              fontFamily === 'serif' ? 'font-serif' : fontFamily === 'mono' ? 'font-mono' : 'font-sans'
            }`}
          >
            <div className="space-y-4">
              {/* Header Title */}
              <div className="border-b pb-5" style={{ borderColor: accentColor }}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{docSubtitle}</span>
                <h1 className="text-xl font-bold mt-1 text-zinc-900 leading-tight">{docTitle}</h1>
                <div className="flex items-center justify-between text-xs text-zinc-500 mt-2">
                  <span>Author: {authorName}</span>
                  <span>Date: {docDate}</span>
                </div>
              </div>

              {/* Rendered Body */}
              <div className="prose prose-sm max-w-none pt-2">{renderMarkdownPreview(markdownBody)}</div>
            </div>

            {/* Document Footer */}
            <div className="border-t pt-4 mt-8 flex justify-between text-[10px] text-zinc-400" style={{ borderColor: '#e4e4e7' }}>
              <span>Generated with ResourceHub Free PDF Tool</span>
              <span>Page 1 of 1</span>
            </div>
          </div>

          {/* Embed Snippet */}
          <div className="flex items-center justify-between bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-medium">Embed this Markdown to PDF Converter on your website</span>
            <button
              onClick={handleCopyEmbed}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shrink-0"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML Code!' : 'Copy Embed Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

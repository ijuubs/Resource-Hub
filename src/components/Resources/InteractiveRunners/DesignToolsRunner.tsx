import React, { useState } from 'react';
import {
  Palette,
  Eye,
  CheckCircle2,
  Copy,
  Image as ImageIcon,
  Share2,
  Sparkles,
  Download,
  AlertTriangle,
  Layers,
  Sliders,
  Maximize2
} from 'lucide-react';

interface DesignToolsRunnerProps {
  toolType: 'wcag-color-contrast-tool' | 'image-compressor-converter' | 'opengraph-card-generator';
  initialConfig?: Record<string, any>;
}

export const DesignToolsRunner: React.FC<DesignToolsRunnerProps> = ({ toolType, initialConfig }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 1. WCAG Color Contrast & Color Converter State ---
  const [fgColor, setFgColor] = useState<string>(initialConfig?.fg || '#ffffff');
  const [bgColor, setBgColor] = useState<string>(initialConfig?.bg || '#0f172a');
  const [colorBlindFilter, setColorBlindFilter] = useState<'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia'>('normal');

  // Helper for luminance & contrast ratio
  const hexToRgb = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (fg: string, bg: string) => {
    try {
      const rgb1 = hexToRgb(fg);
      const rgb2 = hexToRgb(bg);
      const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
      const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      return Number(ratio.toFixed(2));
    } catch {
      return 1;
    }
  };

  const contrast = getContrastRatio(fgColor, bgColor);
  const passAA = contrast >= 4.5;
  const passAAA = contrast >= 7.0;

  // --- 2. OpenGraph Social Card Generator State ---
  const [ogTitle, setOgTitle] = useState<string>(initialConfig?.title || 'The SaaS Growth Engine & Resource Hub');
  const [ogDescription, setOgDescription] = useState<string>(
    initialConfig?.desc || 'Free interactive tools, calculators, and SEO playbooks for startup founders.'
  );
  const [ogCategory, setOgCategory] = useState<string>('SEO & GROWTH PLAYBOOK');
  const [ogTheme, setOgTheme] = useState<string>('#4f46e5'); // Indigo default

  // --- 3. Image Compressor / Converter State ---
  const [imgQuality, setImgQuality] = useState<number>(80);
  const [targetFormat, setTargetFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [sampleOriginalSize, setSampleOriginalSize] = useState<number>(1850); // KB
  const sampleCompressedSize = Math.round(sampleOriginalSize * (imgQuality / 100) * (targetFormat === 'webp' ? 0.45 : 0.8));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white capitalize">{toolType.replace(/-/g, ' ')}</h3>
            <p className="text-xs text-zinc-400">Professional UI/UX Design & Frontend Utility</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* --- 1. WCAG COLOR CONTRAST & CONVERTER --- */}
        {toolType === 'wcag-color-contrast-tool' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color Pickers */}
              <div className="space-y-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
                <h4 className="text-xs font-mono uppercase text-indigo-400 font-semibold">Color Selection & Formats</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Text Color (FG)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Background Color (BG)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-2.5 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span>RGB FG:</span>
                    <span className="text-white">rgb({hexToRgb(fgColor).r}, {hexToRgb(fgColor).g}, {hexToRgb(fgColor).b})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RGB BG:</span>
                    <span className="text-white">rgb({hexToRgb(bgColor).r}, {hexToRgb(bgColor).g}, {hexToRgb(bgColor).b})</span>
                  </div>
                </div>
              </div>

              {/* Contrast Results */}
              <div className="space-y-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase text-indigo-400 font-semibold mb-2">WCAG Compliance Score</h4>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-white font-mono">{contrast}:1</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${passAA ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                      {passAA ? 'WCAG Pass' : 'WCAG Fail'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-lg border ${passAA ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' : 'bg-rose-950/40 border-rose-800/80 text-rose-300'}`}>
                    <span className="block font-bold">AA Normal Text (4.5:1)</span>
                    <span>{passAA ? 'Passed' : 'Failed'}</span>
                  </div>
                  <div className={`p-3 rounded-lg border ${passAAA ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300' : 'bg-rose-950/40 border-rose-800/80 text-rose-300'}`}>
                    <span className="block font-bold">AAA Enhanced (7.0:1)</span>
                    <span>{passAAA ? 'Passed' : 'Failed'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Visual Card Preview */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-300">Live Typography Preview</span>
              <div
                className="p-8 rounded-xl border border-zinc-700 transition-all shadow-xl"
                style={{ backgroundColor: bgColor, color: fgColor }}
              >
                <h2 className="text-2xl font-extrabold mb-2">Sample Heading Text</h2>
                <p className="text-sm leading-relaxed max-w-xl">
                  This preview renders your chosen foreground and background color combinations in real-time to verify readable typography contrast under WCAG 2.1 accessibility guidelines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- 2. OPENGRAPH CARD GENERATOR --- */}
        {toolType === 'opengraph-card-generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 bg-zinc-950 p-5 rounded-xl border border-zinc-800">
              <h4 className="text-xs font-mono uppercase text-indigo-400 font-semibold">Social Card Metadata</h4>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Category Tag</label>
                <input
                  type="text"
                  value={ogCategory}
                  onChange={(e) => setOgCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-1.5 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Brand Accent Color</label>
                <div className="flex gap-2">
                  {['#4f46e5', '#059669', '#dc2626', '#d97706', '#2563eb'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setOgTheme(c)}
                      className={`w-6 h-6 rounded-full border-2 ${ogTheme === c ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-semibold text-zinc-300">Generated OpenGraph Image (1200x630 Ratio)</span>
              <div
                className="w-full aspect-[1200/630] rounded-xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: '#09090b', borderLeft: `6px solid ${ogTheme}` }}
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 inline-block">
                    {ogCategory}
                  </span>
                  <h1 className="text-2xl font-extrabold text-white leading-tight max-w-xl mt-2">
                    {ogTitle}
                  </h1>
                  <p className="text-xs text-zinc-400 line-clamp-2 max-w-lg mt-1">
                    {ogDescription}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-500 border-t border-zinc-800/80 pt-4">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> ResourceHub.io
                  </span>
                  <span className="font-mono">1200 x 630 px</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. IMAGE COMPRESSOR & CONVERTER --- */}
        {toolType === 'image-compressor-converter' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 space-y-5">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold">Web Compression & Format Settings</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Format</label>
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 py-2 text-xs font-mono"
                  >
                    <option value="webp">WEBP (Next-Gen High Compression)</option>
                    <option value="png">PNG (Lossless Transparency)</option>
                    <option value="jpeg">JPEG (Standard Photo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Quality ({imgQuality}%)</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={imgQuality}
                    onChange={(e) => setImgQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-800 text-center text-xs">
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">Original Estimated Size</span>
                  <span className="text-lg font-bold font-mono text-zinc-300">{sampleOriginalSize} KB</span>
                </div>

                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <span className="text-zinc-500 block">Compressed Output Size</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    {sampleCompressedSize} KB ({Math.round((1 - sampleCompressedSize / sampleOriginalSize) * 100)}% Savings)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

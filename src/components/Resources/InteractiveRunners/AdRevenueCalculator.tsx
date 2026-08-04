import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';
import { DollarSign, Eye, MousePointerClick, TrendingUp, Copy, CheckCircle2, RefreshCw } from 'lucide-react';

interface AdRevenueCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const AdRevenueCalculator: React.FC<AdRevenueCalculatorProps> = ({ initialConfig }) => {
  const [pageviews, setPageviews] = useState<number>(initialConfig?.pageviews || 100000);
  const [adUnitsPerPage, setAdUnitsPerPage] = useState<number>(initialConfig?.adUnits || 3);
  const [cpm, setCpm] = useState<number>(initialConfig?.cpm || 3.50);
  const [ctr, setCtr] = useState<number>(initialConfig?.ctr || 1.8);
  const [cpc, setCpc] = useState<number>(initialConfig?.cpc || 0.45);

  const [copied, setCopied] = useState(false);

  // Calculations
  const totalImpressions = pageviews * adUnitsPerPage;
  
  // 1. CPM-based Earnings = (Total Impressions / 1000) * CPM
  const monthlyEarningsCPM = (totalImpressions / 1000) * cpm;

  // 2. CPC-based Earnings = Total Impressions * (CTR / 100) * CPC
  const clicksCount = Math.round(totalImpressions * (ctr / 100));
  const monthlyEarningsCPC = clicksCount * cpc;

  // Blended / Selected Earnings
  const monthlyEarnings = Math.round((monthlyEarningsCPM + monthlyEarningsCPC) / 2);
  const dailyEarnings = (monthlyEarnings / 30).toFixed(2);
  const annualEarnings = monthlyEarnings * 12;
  const pageviewRPM = pageviews > 0 ? ((monthlyEarnings / pageviews) * 1000).toFixed(2) : '0.00';

  // Projection Scale Chart
  const scaleLevels = [10000, 50000, 100000, 250000, 500000, 1000000];
  const chartData = scaleLevels.map((pv) => {
    const imps = pv * adUnitsPerPage;
    const revCPM = (imps / 1000) * cpm;
    const revCPC = imps * (ctr / 100) * cpc;
    const totalEst = Math.round((revCPM + revCPC) / 2);
    return {
      traffic: pv >= 1000000 ? `${pv / 1000000}M` : `${pv / 1000}k`,
      MonthlyRevenue: totalEst,
    };
  });

  const embedCode = `<iframe src="${window.location.origin}/?resource=adsense-ad-revenue-calculator" width="100%" height="650" frameborder="0"></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col space-y-0">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">AdSense & CPM Ad Revenue Calculator</h3>
            <p className="text-xs text-zinc-400">Estimate Website Ad Earnings based on Pageviews, CPM, CTR & CPC</p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 bg-zinc-800 text-emerald-300 rounded-full border border-zinc-700">
          Digital Publishing
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80">
          <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold border-b border-zinc-800 pb-2">
            Traffic & Ad Metrics
          </h4>

          {/* Pageviews */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Monthly Pageviews</span>
              <span className="font-mono text-emerald-400">{pageviews.toLocaleString()}</span>
            </label>
            <input
              type="number"
              value={pageviews}
              onChange={(e) => setPageviews(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
            />
          </div>

          {/* Ad Units Per Page */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Ad Banners Per Page</span>
              <span className="font-mono text-indigo-400">{adUnitsPerPage} Units</span>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={adUnitsPerPage}
              onChange={(e) => setAdUnitsPerPage(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* eCPM */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Average eCPM ($ / 1k Imps)</span>
              <span className="font-mono text-emerald-400">${cpm.toFixed(2)}</span>
            </label>
            <input
              type="number"
              step="0.25"
              value={cpm}
              onChange={(e) => setCpm(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
            />
          </div>

          {/* CTR */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Click-Through Rate CTR (%)</span>
              <span className="font-mono text-amber-400">{ctr}%</span>
            </label>
            <input
              type="range"
              min="0.2"
              max="8"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* CPC */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Cost Per Click CPC ($)</span>
              <span className="font-mono text-emerald-400">${cpc.toFixed(2)}</span>
            </label>
            <input
              type="number"
              step="0.05"
              value={cpc}
              onChange={(e) => setCpc(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono"
            />
          </div>
        </div>

        {/* Output & Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
              <span className="text-[11px] font-mono text-emerald-300 uppercase">Est. Monthly Earnings</span>
              <p className="text-xl font-bold font-mono text-emerald-400">${monthlyEarnings.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-400">${dailyEarnings} / day</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Est. Annual Earnings</span>
              <p className="text-xl font-bold font-mono text-white">${annualEarnings.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">Projected Run Rate</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Pageview RPM</span>
              <p className="text-xl font-bold font-mono text-indigo-400">${pageviewRPM}</p>
              <span className="text-[10px] text-zinc-500">Per 1,000 Visitors</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Ad Impressions</span>
              <p className="text-xl font-bold font-mono text-amber-400">{totalImpressions.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">{clicksCount.toLocaleString()} Monthly Clicks</span>
            </div>
          </div>

          {/* Scaling Projections Chart */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white tracking-wide">Revenue Growth Projection by Traffic Volume</h4>
              <span className="text-[11px] font-mono text-emerald-400">At ${cpm} CPM</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="traffic" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="MonthlyRevenue" fill="#10b981" name="Est. Monthly Revenue ($)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Embed snippet */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-medium">Embed this free Ad Revenue Estimator on your website</span>
            <button
              onClick={handleCopyEmbed}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shrink-0"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML Code!' : 'Copy Embed Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

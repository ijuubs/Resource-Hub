import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Clock, Copy, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface CACAndLTVCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const CACAndLTVCalculator: React.FC<CACAndLTVCalculatorProps> = ({ initialConfig }) => {
  const [salesMarketingSpend, setSalesMarketingSpend] = useState<number>(initialConfig?.spend || 15000);
  const [newCustomers, setNewCustomers] = useState<number>(initialConfig?.customers || 120);
  const [arpu, setArpu] = useState<number>(initialConfig?.arpu || 99); // Average Revenue Per User / Month
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(initialConfig?.grossMargin || 80);
  const [monthlyChurnPercent, setMonthlyChurnPercent] = useState<number>(initialConfig?.churn || 3.5);

  const [copied, setCopied] = useState(false);

  // Calculations
  // 1. CAC = Total Spend / New Customers
  const cac = newCustomers > 0 ? Math.round(salesMarketingSpend / newCustomers) : 0;

  // 2. Average Lifespan (Months) = 100 / Monthly Churn
  const avgLifespanMonths = monthlyChurnPercent > 0 ? 100 / monthlyChurnPercent : 0;

  // 3. Customer Lifetime Value (LTV) = ARPU * Lifespan * Gross Margin %
  const ltvGross = arpu * avgLifespanMonths;
  const ltvNet = ltvGross * (grossMarginPercent / 100);

  // 4. LTV:CAC Ratio
  const ltvCacRatio = cac > 0 ? ltvNet / cac : 0;

  // 5. CAC Payback Period (Months) = CAC / (ARPU * Gross Margin %)
  const monthlyGrossProfitPerUser = arpu * (grossMarginPercent / 100);
  const paybackMonths = monthlyGrossProfitPerUser > 0 ? cac / monthlyGrossProfitPerUser : 0;

  // Chart Data: Cumulative Profit over 36 Months per customer
  const forecastData = Array.from({ length: 25 }, (_, i) => {
    const month = i;
    const grossRev = month * arpu * (grossMarginPercent / 100);
    const netProfit = grossRev - cac;
    return {
      month: `M${month}`,
      CumulativeProfit: Math.round(netProfit),
      CACCost: -cac,
    };
  });

  const ratioColor = ltvCacRatio >= 3 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' : ltvCacRatio >= 1.5 ? 'text-amber-400 border-amber-500/30 bg-amber-950/40' : 'text-rose-400 border-rose-500/30 bg-rose-950/40';

  const embedCode = `<iframe src="${window.location.origin}/?resource=cac-ltv-ratio-calculator" width="100%" height="650" frameborder="0"></iframe>`;

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
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">CAC & LTV Unit Economics Calculator</h3>
            <p className="text-xs text-zinc-400">Calculate Payback Period, LTV:CAC Ratio, and Customer Lifespan</p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 bg-zinc-800 text-indigo-300 rounded-full border border-zinc-700">
          Financial Unit Economics
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80">
          <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold border-b border-zinc-800 pb-2">
            Model Parameters
          </h4>

          {/* Spend */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Sales & Marketing Spend ($)</span>
              <span className="font-mono text-indigo-400">${salesMarketingSpend.toLocaleString()}</span>
            </label>
            <input
              type="number"
              value={salesMarketingSpend}
              onChange={(e) => setSalesMarketingSpend(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono"
            />
          </div>

          {/* New Customers */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>New Customers Acquired</span>
              <span className="font-mono text-indigo-400">{newCustomers.toLocaleString()}</span>
            </label>
            <input
              type="number"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Math.max(1, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono"
            />
          </div>

          {/* ARPU */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Monthly ARPU ($ / User)</span>
              <span className="font-mono text-emerald-400">${arpu}</span>
            </label>
            <input
              type="number"
              value={arpu}
              onChange={(e) => setArpu(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono"
            />
          </div>

          {/* Gross Margin */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Gross Margin (%)</span>
              <span className="font-mono text-indigo-400">{grossMarginPercent}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={grossMarginPercent}
              onChange={(e) => setGrossMarginPercent(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Monthly Churn */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Monthly Churn Rate (%)</span>
              <span className="font-mono text-amber-400">{monthlyChurnPercent}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={monthlyChurnPercent}
              onChange={(e) => setMonthlyChurnPercent(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>

        {/* Output & Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metrics Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">CAC (Cost)</span>
              <p className="text-xl font-bold font-mono text-white">${cac.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">Per Customer</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Net LTV</span>
              <p className="text-xl font-bold font-mono text-emerald-400">${Math.round(ltvNet).toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">{avgLifespanMonths.toFixed(1)} Mo. Lifespan</span>
            </div>

            <div className={`p-4 rounded-xl border space-y-1 ${ratioColor}`}>
              <span className="text-[11px] font-mono uppercase opacity-80">LTV : CAC Ratio</span>
              <p className="text-xl font-bold font-mono">{ltvCacRatio.toFixed(2)}x</p>
              <span className="text-[10px] opacity-80">{ltvCacRatio >= 3 ? 'Healthy Benchmark' : 'Below Target'}</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Payback Period</span>
              <p className="text-xl font-bold font-mono text-amber-400">{paybackMonths.toFixed(1)} Mo.</p>
              <span className="text-[10px] text-zinc-500">To Break Even</span>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white tracking-wide">Customer Profitability Trajectory (Months 0–24)</h4>
              <span className="text-[11px] font-mono text-emerald-400">Payback Month: M{Math.ceil(paybackMonths)}</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                  <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `$${v}`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="CumulativeProfit" fill="#6366f1" name="Cumulative Net Profit ($)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Embed Code widget */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-medium">Want to embed this calculator on your SaaS blog or site?</span>
            <button
              onClick={handleCopyEmbed}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shrink-0"
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

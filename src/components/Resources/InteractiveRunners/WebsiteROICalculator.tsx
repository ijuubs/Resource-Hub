import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Legend } from 'recharts';
import { MousePointerClick, Users, DollarSign, Target, Code, Copy, CheckCircle2 } from 'lucide-react';

interface WebsiteROICalculatorProps {
  initialConfig?: Record<string, any>;
}

export const WebsiteROICalculator: React.FC<WebsiteROICalculatorProps> = ({ initialConfig }) => {
  const [monthlyVisitors, setMonthlyVisitors] = useState(initialConfig?.defaultState?.monthlyVisitors || initialConfig?.monthlyVisitors || 10000);
  const [currentConvRate, setCurrentConvRate] = useState(initialConfig?.defaultState?.currentConvRate || initialConfig?.currentConvRate || 1.5);
  const [targetConvRate, setTargetConvRate] = useState(initialConfig?.defaultState?.targetConvRate || initialConfig?.targetConvRate || 2.5);
  const [aov, setAov] = useState(initialConfig?.defaultState?.aov || initialConfig?.aov || 100);
  const [copied, setCopied] = useState(false);

  const currentConversions = Math.round((monthlyVisitors * currentConvRate) / 100);
  const currentRevenue = currentConversions * aov;

  const targetConversions = Math.round((monthlyVisitors * targetConvRate) / 100);
  const targetRevenue = targetConversions * aov;

  const additionalRevenue = targetRevenue - currentRevenue;

  const chartData = [
    {
      name: 'Current',
      Revenue: currentRevenue,
      Conversions: currentConversions,
    },
    {
      name: 'Target (Optimized)',
      Revenue: targetRevenue,
      Conversions: targetConversions,
    }
  ];

  const embedCode = `<iframe src="https://yourdomain.com/embed/website-roi-calculator" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Header */}
      <div className="bg-zinc-950 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Website CRO & ROI Calculator</h3>
        </div>
        <div className="text-xs font-semibold px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full">
          Interactive Tool
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Monthly Traffic (Visitors)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Users className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Current Conversion Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Target className="w-4 h-4 text-zinc-500" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={currentConvRate}
                  onChange={(e) => setCurrentConvRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Target Conversion Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Target className="w-4 h-4 text-purple-500" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={targetConvRate}
                  onChange={(e) => setTargetConvRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Average Order Value ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50 space-y-4">
            <div>
              <div className="text-zinc-400 text-sm font-medium mb-1">Potential Added Revenue/mo</div>
              <div className="text-3xl font-bold text-white tracking-tight">
                +${Math.round(additionalRevenue).toLocaleString()}
              </div>
            </div>
            <div className="h-px bg-zinc-700/50 w-full" />
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Current Rev.</div>
                  <div className="text-zinc-300 font-semibold">${Math.round(currentRevenue).toLocaleString()}</div>
               </div>
               <div>
                  <div className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">Target Rev.</div>
                  <div className="text-purple-400 font-semibold">${Math.round(targetRevenue).toLocaleString()}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Chart & Embed */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1000)}k`} width={60} />
                <RechartsTooltip
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#e4e4e7' }}
                  formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, 'Revenue']}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
                <Bar dataKey="Revenue" fill="#a855f7" radius={[4, 4, 0, 0]} maxBarSize={100} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              Embed this calculator on your site
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Show your clients the value of Conversion Rate Optimization (CRO). Copy the code below to embed.
            </p>
            <div className="flex gap-2 items-center bg-zinc-950 border border-zinc-800 rounded-md p-1 pl-3">
              <code className="text-xs text-purple-400/80 truncate flex-1">{embedCode}</code>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

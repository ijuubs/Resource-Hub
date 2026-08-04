import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Target, Code, Copy, CheckCircle2 } from 'lucide-react';

interface InvestmentGrowthCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const InvestmentGrowthCalculator: React.FC<InvestmentGrowthCalculatorProps> = ({ initialConfig }) => {
  const [initialPrincipal, setInitialPrincipal] = useState(initialConfig?.defaultState?.initialPrincipal || initialConfig?.initialPrincipal || 10000);
  const [monthlyContribution, setMonthlyContribution] = useState(initialConfig?.defaultState?.monthlyContribution || initialConfig?.monthlyContribution || 500);
  const [years, setYears] = useState(initialConfig?.defaultState?.years || initialConfig?.years || 15);
  const [returnRate, setReturnRate] = useState(initialConfig?.defaultState?.returnRate || initialConfig?.returnRate || 8);
  const [copied, setCopied] = useState(false);

  const chartData = useMemo(() => {
    let currentPrincipal = initialPrincipal;
    const data = [];
    let totalInvested = initialPrincipal;

    data.push({
      year: 0,
      Balance: Math.round(currentPrincipal),
      Invested: Math.round(totalInvested),
      Interest: 0,
    });

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        currentPrincipal += monthlyContribution;
        totalInvested += monthlyContribution;
        // Compounding monthly
        currentPrincipal *= (1 + (returnRate / 100) / 12);
      }
      data.push({
        year: y,
        Balance: Math.round(currentPrincipal),
        Invested: Math.round(totalInvested),
        Interest: Math.round(currentPrincipal - totalInvested),
      });
    }
    return data;
  }, [initialPrincipal, monthlyContribution, years, returnRate]);

  const finalBalance = chartData[chartData.length - 1]?.Balance || 0;
  const finalInvested = chartData[chartData.length - 1]?.Invested || 0;
  const finalInterest = chartData[chartData.length - 1]?.Interest || 0;

  const embedCode = `<iframe src="https://yourdomain.com/embed/investment-calculator" width="100%" height="600" frameborder="0"></iframe>`;

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
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Compound Interest Calculator</h3>
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
                Initial Investment
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={initialPrincipal}
                  onChange={(e) => setInitialPrincipal(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Monthly Contribution
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Years to Grow
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Estimated Annual Return (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Target className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50 space-y-4">
            <div>
              <div className="text-zinc-400 text-sm font-medium mb-1">Total Future Value</div>
              <div className="text-3xl font-bold text-white tracking-tight">
                ${finalBalance.toLocaleString()}
              </div>
            </div>
            <div className="h-px bg-zinc-700/50 w-full" />
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Invested</div>
                  <div className="text-zinc-200 font-semibold">${finalInvested.toLocaleString()}</div>
               </div>
               <div>
                  <div className="text-emerald-500/80 text-xs font-semibold uppercase tracking-wider mb-1">Total Interest</div>
                  <div className="text-emerald-400 font-semibold">${finalInterest.toLocaleString()}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Chart & Embed */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="year" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `Yr ${val}`} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val / 1000)}k`} width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#e4e4e7' }}
                  labelStyle={{ color: '#a1a1aa', marginBottom: '4px' }}
                  formatter={(value: any) => [`$${Number(value || 0).toLocaleString()}`, undefined]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
                <Area type="monotone" dataKey="Balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                <Area type="monotone" dataKey="Invested" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInvested)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-emerald-400" />
              Embed this calculator on your site
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Help your readers plan their financial future. Copy the code below to embed this tool on your blog or website.
            </p>
            <div className="flex gap-2 items-center bg-zinc-950 border border-zinc-800 rounded-md p-1 pl-3">
              <code className="text-xs text-emerald-400/80 truncate flex-1">{embedCode}</code>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DollarSign, TrendingUp, Users, RefreshCw, BarChart2, Info } from 'lucide-react';

interface SaaSMRRCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const SaaSMRRCalculator: React.FC<SaaSMRRCalculatorProps> = ({ initialConfig }) => {
  const [startingCustomers, setStartingCustomers] = useState(
    initialConfig?.startingCustomers || 250
  );
  const [arpu, setArpu] = useState(initialConfig?.arpu || 79);
  const [monthlyChurnPct, setMonthlyChurnPct] = useState(initialConfig?.monthlyChurnPct || 3.5);
  const [newCustomersPerMonth, setNewCustomersPerMonth] = useState(
    initialConfig?.newCustomersPerMonth || 35
  );
  const [expansionPct, setExpansionPct] = useState(initialConfig?.expansionPct || 1.5);
  const [cac, setCac] = useState(initialConfig?.cac || 320);

  // Computed projections for 12 months
  const monthsData = [];
  let currentCust = startingCustomers;
  let currentMRR = startingCustomers * arpu;

  for (let m = 1; m <= 12; m++) {
    const churnedCust = Math.round(currentCust * (monthlyChurnPct / 100));
    const netNewCust = newCustomersPerMonth - churnedCust;
    currentCust = Math.max(0, currentCust + netNewCust);

    // Expansion MRR
    const expansionMRR = currentMRR * (expansionPct / 100);
    const churnedMRR = currentMRR * (monthlyChurnPct / 100);
    const newMRR = newCustomersPerMonth * arpu;

    currentMRR = Math.max(0, currentMRR + newMRR + expansionMRR - churnedMRR);

    monthsData.push({
      month: `M${m}`,
      MRR: Math.round(currentMRR),
      ARR: Math.round(currentMRR * 12),
      Customers: currentCust,
    });
  }

  const currentMonthMRR = startingCustomers * arpu;
  const year1EndMRR = monthsData[11].MRR;
  const year1EndARR = monthsData[11].ARR;
  const ltv = Math.round((arpu * 0.8) / (monthlyChurnPct / 100 || 0.01));
  const ltvCacRatio = (ltv / (cac || 1)).toFixed(1);
  const netRetentionRate = (100 - monthlyChurnPct + expansionPct).toFixed(1);

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Interactive Tool</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            SaaS MRR, ARR & Churn Forecaster
          </h3>
        </div>
        <button
          onClick={() => {
            setStartingCustomers(250);
            setArpu(79);
            setMonthlyChurnPct(3.5);
            setNewCustomersPerMonth(35);
            setExpansionPct(1.5);
            setCac(320);
          }}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Starting Customers</span>
            <span className="font-mono text-indigo-400">{startingCustomers}</span>
          </label>
          <input
            type="range"
            min="10"
            max="2000"
            step="10"
            value={startingCustomers}
            onChange={(e) => setStartingCustomers(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>ARPU (Avg Revenue/User)</span>
            <span className="font-mono text-emerald-400">${arpu}/mo</span>
          </label>
          <input
            type="range"
            min="10"
            max="500"
            step="5"
            value={arpu}
            onChange={(e) => setArpu(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>New Cust / Month</span>
            <span className="font-mono text-indigo-400">{newCustomersPerMonth}</span>
          </label>
          <input
            type="range"
            min="1"
            max="200"
            step="1"
            value={newCustomersPerMonth}
            onChange={(e) => setNewCustomersPerMonth(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Monthly Churn %</span>
            <span className="font-mono text-rose-400">{monthlyChurnPct}%</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="15"
            step="0.5"
            value={monthlyChurnPct}
            onChange={(e) => setMonthlyChurnPct(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Expansion Revenue %</span>
            <span className="font-mono text-amber-400">{expansionPct}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={expansionPct}
            onChange={(e) => setExpansionPct(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Customer Acquisition Cost (CAC)</span>
            <span className="font-mono text-cyan-400">${cac}</span>
          </label>
          <input
            type="range"
            min="50"
            max="2000"
            step="25"
            value={cac}
            onChange={(e) => setCac(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* KPI Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div className="rounded-xl bg-zinc-900 p-4 border border-zinc-800">
          <span className="text-[11px] text-zinc-400">Current MRR</span>
          <p className="text-xl font-bold text-white">${currentMonthMRR.toLocaleString()}</p>
          <span className="text-[10px] text-zinc-500">ARR: ${(currentMonthMRR * 12).toLocaleString()}</span>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4 border border-zinc-800">
          <span className="text-[11px] text-zinc-400">12-Month Projected MRR</span>
          <p className="text-xl font-bold text-emerald-400">${year1EndMRR.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-500/80">Projected ARR: ${year1EndARR.toLocaleString()}</span>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4 border border-zinc-800">
          <span className="text-[11px] text-zinc-400">Estimated LTV</span>
          <p className="text-xl font-bold text-indigo-400">${ltv.toLocaleString()}</p>
          <span className="text-[10px] text-indigo-500/80">Net Retention: {netRetentionRate}%</span>
        </div>

        <div className="rounded-xl bg-zinc-900 p-4 border border-zinc-800">
          <span className="text-[11px] text-zinc-400">LTV : CAC Ratio</span>
          <p className={`text-xl font-bold ${Number(ltvCacRatio) >= 3 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {ltvCacRatio}x
          </p>
          <span className="text-[10px] text-zinc-500">
            {Number(ltvCacRatio) >= 3 ? '✓ Healthy Benchmark' : '⚠️ Below 3.0x Target'}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">12-Month MRR Growth Curve</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthsData}>
              <defs>
                <linearGradient id="mrrColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
              <YAxis stroke="#71717a" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '8px' }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'MRR']}
              />
              <Area type="monotone" dataKey="MRR" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#mrrColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

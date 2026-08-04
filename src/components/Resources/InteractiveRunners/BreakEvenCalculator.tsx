import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Calculator, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

interface BreakEvenCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const BreakEvenCalculator: React.FC<BreakEvenCalculatorProps> = ({ initialConfig }) => {
  const [fixedCosts, setFixedCosts] = useState(initialConfig?.fixedCosts || 8500);
  const [pricePerUnit, setPricePerUnit] = useState(initialConfig?.pricePerUnit || 149);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(initialConfig?.variableCostPerUnit || 35);

  const contributionMargin = Math.max(1, pricePerUnit - variableCostPerUnit);
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const marginPct = ((contributionMargin / pricePerUnit) * 100).toFixed(1);

  // Generate chart data up to 2x break-even volume
  const maxUnits = Math.max(20, breakEvenUnits * 2);
  const step = Math.max(1, Math.floor(maxUnits / 10));
  const chartData = [];

  for (let u = 0; u <= maxUnits; u += step) {
    const totalCost = fixedCosts + u * variableCostPerUnit;
    const totalRevenue = u * pricePerUnit;
    chartData.push({
      units: u,
      TotalCost: totalCost,
      Revenue: totalRevenue,
      Profit: totalRevenue - totalCost,
    });
  }

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Financial Engine</span>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          Break-Even & Unit Margin Analyzer
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Monthly Fixed Costs</span>
            <span className="font-mono text-amber-400">${fixedCosts.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Price / Unit (or Subscription)</span>
            <span className="font-mono text-emerald-400">${pricePerUnit}</span>
          </label>
          <input
            type="range"
            min="10"
            max="1000"
            step="5"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Variable Cost / Unit</span>
            <span className="font-mono text-rose-400">${variableCostPerUnit}</span>
          </label>
          <input
            type="range"
            min="0"
            max="500"
            step="5"
            value={variableCostPerUnit}
            onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>

      {/* KPI Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4">
          <span className="text-xs text-cyan-300 font-medium">Break-Even Sales Volume</span>
          <p className="text-3xl font-black text-white mt-1">{breakEvenUnits.toLocaleString()} <span className="text-sm font-normal text-zinc-400">units/mo</span></p>
          <p className="text-[11px] text-zinc-400 mt-1">Requires ${breakEvenRevenue.toLocaleString()} monthly revenue.</p>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
          <span className="text-xs text-emerald-300 font-medium">Contribution Margin / Unit</span>
          <p className="text-3xl font-black text-white mt-1">${contributionMargin}</p>
          <p className="text-[11px] text-zinc-400 mt-1">Gross Unit Margin: {marginPct}%</p>
        </div>

        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
          <span className="text-xs text-indigo-300 font-medium">Monthly Revenue at 2x Volume</span>
          <p className="text-3xl font-black text-white mt-1">${(breakEvenRevenue * 2).toLocaleString()}</p>
          <p className="text-[11px] text-emerald-400 mt-1">Net Monthly Profit: +${(fixedCosts).toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Break-Even Chart (Cost vs Revenue)</h4>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="units" stroke="#71717a" fontSize={12} label={{ value: 'Units Sold', position: 'insideBottom', offset: -5, fill: '#71717a' }} />
              <YAxis stroke="#71717a" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '8px' }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`]}
              />
              <Legend />
              <Line type="monotone" dataKey="TotalCost" stroke="#f43f5e" strokeWidth={2} name="Total Cost ($)" />
              <Line type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={2} name="Total Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

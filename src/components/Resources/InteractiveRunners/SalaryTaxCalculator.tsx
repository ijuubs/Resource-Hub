import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { DollarSign, ShieldCheck, Briefcase, Calculator, Copy, CheckCircle2 } from 'lucide-react';

interface SalaryTaxCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const SalaryTaxCalculator: React.FC<SalaryTaxCalculatorProps> = ({ initialConfig }) => {
  const [grossAnnual, setGrossAnnual] = useState<number>(initialConfig?.grossAnnual || 95000);
  const [employmentType, setEmploymentType] = useState<'w2' | '1099'>(initialConfig?.type || 'w2');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>(initialConfig?.status || 'single');
  const [stateTaxRate, setStateTaxRate] = useState<number>(initialConfig?.stateTax || 5.0);
  const [preTaxDeductionsMonthly, setPreTaxDeductionsMonthly] = useState<number>(initialConfig?.preTax || 500); // 401k / Health

  const [copied, setCopied] = useState(false);

  // Calculations
  const annualPreTax = preTaxDeductionsMonthly * 12;
  const taxableGross = Math.max(0, grossAnnual - annualPreTax);

  // Standard deduction approximate
  const standardDeduction = filingStatus === 'single' ? 14600 : 29200;
  const taxableIncome = Math.max(0, taxableGross - standardDeduction);

  // Progressive Federal Income Tax approximation (2025/2026 brackets)
  let fedTax = 0;
  if (filingStatus === 'single') {
    if (taxableIncome > 100000) fedTax = 17400 + (taxableIncome - 100000) * 0.24;
    else if (taxableIncome > 47150) fedTax = 5426 + (taxableIncome - 47150) * 0.22;
    else if (taxableIncome > 11600) fedTax = 1160 + (taxableIncome - 1160) * 0.12;
    else fedTax = taxableIncome * 0.10;
  } else {
    if (taxableIncome > 200000) fedTax = 34800 + (taxableIncome - 200000) * 0.24;
    else if (taxableIncome > 94300) fedTax = 10852 + (taxableIncome - 94300) * 0.22;
    else if (taxableIncome > 23200) fedTax = 2320 + (taxableIncome - 2320) * 0.12;
    else fedTax = taxableIncome * 0.10;
  }

  // FICA / Self-Employment Tax
  const ficaRate = employmentType === 'w2' ? 0.0765 : 0.153;
  const ficaTax = taxableGross * ficaRate;

  // State Tax
  const stateTax = taxableGross * (stateTaxRate / 100);

  // Total Taxes & Net Pay
  const totalTaxes = Math.round(fedTax + ficaTax + stateTax);
  const netTakeHomeAnnual = Math.max(0, Math.round(grossAnnual - totalTaxes - annualPreTax));
  const netTakeHomeMonthly = Math.round(netTakeHomeAnnual / 12);
  const netTakeHomeBiWeekly = Math.round(netTakeHomeAnnual / 26);

  const effectiveTaxRate = grossAnnual > 0 ? ((totalTaxes / grossAnnual) * 100).toFixed(1) : '0.0';

  const pieData = [
    { name: 'Net Take-Home Pay', value: netTakeHomeAnnual, color: '#10b981' },
    { name: 'Federal Income Tax', value: Math.round(fedTax), color: '#6366f1' },
    { name: 'FICA / SE Tax', value: Math.round(ficaTax), color: '#f59e0b' },
    { name: 'State Income Tax', value: Math.round(stateTax), color: '#ec4899' },
    { name: 'Pre-Tax 401(k)/HSA', value: Math.round(annualPreTax), color: '#8b5cf6' },
  ];

  const embedCode = `<iframe src="${window.location.origin}/?resource=salary-take-home-pay-calculator" width="100%" height="650" frameborder="0"></iframe>`;

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
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Salary Take-Home Pay & Tax Estimator</h3>
            <p className="text-xs text-zinc-400">Calculate Gross-to-Net Salary, W2 vs 1099 Taxes, FICA & Take-Home Pay</p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-xs font-mono font-semibold px-3 py-1 bg-zinc-800 text-blue-300 rounded-full border border-zinc-700">
          Personal Finance & Tax
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-5 bg-zinc-950/60 p-5 rounded-xl border border-zinc-800/80">
          <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold border-b border-zinc-800 pb-2">
            Salary & Filing Setup
          </h4>

          {/* Gross Salary */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Gross Annual Salary ($)</span>
              <span className="font-mono text-emerald-400">${grossAnnual.toLocaleString()}</span>
            </label>
            <input
              type="number"
              step="1000"
              value={grossAnnual}
              onChange={(e) => setGrossAnnual(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
            />
          </div>

          {/* W2 vs 1099 Toggle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Employment Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEmploymentType('w2')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  employmentType === 'w2'
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                W2 Employee
              </button>
              <button
                type="button"
                onClick={() => setEmploymentType('1099')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  employmentType === '1099'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                1099 Contractor
              </button>
            </div>
          </div>

          {/* Filing Status */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-zinc-300">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as any)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>

          {/* State Tax */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>State Tax Rate (%)</span>
              <span className="font-mono text-blue-400">{stateTaxRate}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="13"
              step="0.25"
              value={stateTaxRate}
              onChange={(e) => setStateTaxRate(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <span className="text-[10px] text-zinc-500">Set 0% for TX, FL, WA, NV, TN, AK, SD, WY</span>
          </div>

          {/* Pre-tax 401k/HSA */}
          <div className="space-y-1.5">
            <label className="flex justify-between text-xs font-semibold text-zinc-300">
              <span>Pre-Tax Deductions ($ / Mo.)</span>
              <span className="font-mono text-purple-400">${preTaxDeductionsMonthly}</span>
            </label>
            <input
              type="number"
              step="50"
              value={preTaxDeductionsMonthly}
              onChange={(e) => setPreTaxDeductionsMonthly(Math.max(0, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 font-mono"
            />
          </div>
        </div>

        {/* Output & Chart Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-1">
              <span className="text-[11px] font-mono text-emerald-300 uppercase">Monthly Net Pay</span>
              <p className="text-xl font-bold font-mono text-emerald-400">${netTakeHomeMonthly.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-400">After All Taxes</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Bi-Weekly Paycheck</span>
              <p className="text-xl font-bold font-mono text-white">${netTakeHomeBiWeekly.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">26 Pay Periods</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Effective Tax Rate</span>
              <p className="text-xl font-bold font-mono text-amber-400">{effectiveTaxRate}%</p>
              <span className="text-[10px] text-zinc-500">Fed + State + FICA</span>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Annual Net Pay</span>
              <p className="text-xl font-bold font-mono text-emerald-400">${netTakeHomeAnnual.toLocaleString()}</p>
              <span className="text-[10px] text-zinc-500">Total Take-Home</span>
            </div>
          </div>

          {/* Tax Breakdown Pie Chart */}
          <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white tracking-wide">Gross Income Distribution Breakdown</h4>
              <span className="text-[11px] font-mono text-zinc-400">Total Tax: ${totalTaxes.toLocaleString()}</span>
            </div>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: number) => `$${val.toLocaleString()}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Embed Snippet */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/80 p-3.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-medium">Embed this Salary & Take-Home Pay Estimator on your blog</span>
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

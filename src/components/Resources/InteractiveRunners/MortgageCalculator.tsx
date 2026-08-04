import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Home, DollarSign, Calendar, Percent, Code, Copy, CheckCircle2 } from 'lucide-react';

interface MortgageCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ initialConfig }) => {
  const [homePrice, setHomePrice] = useState(initialConfig?.defaultState?.homePrice || initialConfig?.homePrice || 400000);
  const [downPaymentPct, setDownPaymentPct] = useState(initialConfig?.defaultState?.downPaymentPct || initialConfig?.downPaymentPct || 20);
  const [loanTerm, setLoanTerm] = useState(initialConfig?.defaultState?.loanTerm || initialConfig?.loanTerm || 30);
  const [interestRate, setInterestRate] = useState(initialConfig?.defaultState?.interestRate || initialConfig?.interestRate || 6.5);
  const [copied, setCopied] = useState(false);

  const downPaymentAmt = (homePrice * downPaymentPct) / 100;
  const loanAmount = homePrice - downPaymentAmt;

  const { monthlyPayment, totalInterest, totalPayment } = useMemo(() => {
    const p = loanAmount;
    const r = (interestRate / 100) / 12;
    const n = loanTerm * 12;

    if (r === 0) {
      return {
        monthlyPayment: p / n,
        totalInterest: 0,
        totalPayment: p,
      };
    }

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    return { monthlyPayment, totalInterest, totalPayment };
  }, [loanAmount, loanTerm, interestRate]);

  const chartData = [
    { name: 'Principal', value: loanAmount, color: '#3b82f6' },
    { name: 'Total Interest', value: totalInterest, color: '#f59e0b' },
  ];

  const embedCode = `<iframe src="https://yourdomain.com/embed/mortgage-calculator" width="100%" height="600" frameborder="0"></iframe>`;

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
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
            <Home className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Mortgage Payoff Calculator</h3>
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
                Home Price
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="flex justify-between text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                <span>Down Payment (%)</span>
                <span className="text-zinc-500">${downPaymentAmt.toLocaleString()}</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Percent className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Loan Term (Years)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Calendar className="w-4 h-4" />
                </div>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium appearance-none"
                >
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Interest Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Percent className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-5 border border-zinc-700/50 space-y-4">
            <div>
              <div className="text-zinc-400 text-sm font-medium mb-1">Monthly Payment (P&I)</div>
              <div className="text-3xl font-bold text-white tracking-tight">
                ${Math.round(monthlyPayment).toLocaleString()}
              </div>
            </div>
            <div className="h-px bg-zinc-700/50 w-full" />
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Loan Amount</div>
                  <div className="text-blue-400 font-semibold">${Math.round(loanAmount).toLocaleString()}</div>
               </div>
               <div>
                  <div className="text-amber-500/80 text-xs font-semibold uppercase tracking-wider mb-1">Total Interest</div>
                  <div className="text-amber-400 font-semibold">${Math.round(totalInterest).toLocaleString()}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Chart & Embed */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-zinc-950 p-6 rounded-xl border border-zinc-800 flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value: any) => `$${Math.round(Number(value || 0)).toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              Embed this calculator on your site
            </h4>
            <p className="text-xs text-zinc-400 mb-3">
              Help your visitors estimate their monthly mortgage payments. Copy the code below to embed.
            </p>
            <div className="flex gap-2 items-center bg-zinc-950 border border-zinc-800 rounded-md p-1 pl-3">
              <code className="text-xs text-blue-400/80 truncate flex-1">{embedCode}</code>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded transition-colors"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

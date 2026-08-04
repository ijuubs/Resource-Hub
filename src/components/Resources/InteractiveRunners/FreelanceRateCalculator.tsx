import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Clock, Award, ShieldCheck } from 'lucide-react';

interface FreelanceRateCalculatorProps {
  initialConfig?: Record<string, any>;
}

export const FreelanceRateCalculator: React.FC<FreelanceRateCalculatorProps> = ({ initialConfig }) => {
  const [targetIncome, setTargetIncome] = useState(initialConfig?.targetIncome || 120000);
  const [annualExpenses, setAnnualExpenses] = useState(initialConfig?.annualExpenses || 18000);
  const [taxRatePct, setTaxRatePct] = useState(initialConfig?.taxRatePct || 28);
  const [vacationWeeks, setVacationWeeks] = useState(initialConfig?.vacationWeeks || 4);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState(initialConfig?.billableHoursPerWeek || 25);

  // Calculations
  const workingWeeks = Math.max(1, 52 - vacationWeeks);
  const totalAnnualBillableHours = workingWeeks * billableHoursPerWeek;

  // Total gross required before tax
  // Gross = (Target Net Income + Expenses) / (1 - taxRate)
  const requiredGrossRevenue = Math.round((targetIncome + annualExpenses) / (1 - taxRatePct / 100));
  const hourlyRate = Math.round(requiredGrossRevenue / totalAnnualBillableHours);
  const dayRate = Math.round(hourlyRate * (billableHoursPerWeek / 5));
  const monthlyRetainer = Math.round(requiredGrossRevenue / 12);

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4">
        <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">Pricing Tool</span>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-pink-400" />
          Freelance Rate & Value Pricing Engine
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Target Annual Net Income</span>
            <span className="font-mono text-emerald-400">${targetIncome.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="30000"
            max="300000"
            step="5000"
            value={targetIncome}
            onChange={(e) => setTargetIncome(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Annual Business Expenses (Software, Health, Hardware)</span>
            <span className="font-mono text-rose-400">${annualExpenses.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="2000"
            max="60000"
            step="1000"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Estimated Self-Employment Tax %</span>
            <span className="font-mono text-amber-400">{taxRatePct}%</span>
          </label>
          <input
            type="range"
            min="10"
            max="45"
            step="1"
            value={taxRatePct}
            onChange={(e) => setTaxRatePct(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Vacation & Sick Weeks / Year</span>
            <span className="font-mono text-indigo-400">{vacationWeeks} weeks</span>
          </label>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={vacationWeeks}
            onChange={(e) => setVacationWeeks(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span>Billable Hours / Week (Excluding Admin & Prospecting)</span>
            <span className="font-mono text-cyan-400">{billableHoursPerWeek} hrs/wk</span>
          </label>
          <input
            type="range"
            min="10"
            max="40"
            step="1"
            value={billableHoursPerWeek}
            onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Recommended Rates Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-4">
          <span className="text-xs text-indigo-300 font-medium">Minimum Hourly Rate</span>
          <p className="text-3xl font-black text-white mt-1">${hourlyRate}<span className="text-sm font-normal text-zinc-400">/hr</span></p>
          <p className="text-[11px] text-zinc-400 mt-1">Covers gross revenue target across {totalAnnualBillableHours} billable hours.</p>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4">
          <span className="text-xs text-emerald-300 font-medium">Standard Day Rate</span>
          <p className="text-3xl font-black text-white mt-1">${dayRate}<span className="text-sm font-normal text-zinc-400">/day</span></p>
          <p className="text-[11px] text-zinc-400 mt-1">Based on a 5-hour billable day focused output.</p>
        </div>

        <div className="rounded-xl border border-violet-500/30 bg-violet-950/30 p-4">
          <span className="text-xs text-violet-300 font-medium">Target Monthly Retainer</span>
          <p className="text-3xl font-black text-white mt-1">${monthlyRetainer}<span className="text-sm font-normal text-zinc-400">/mo</span></p>
          <p className="text-[11px] text-zinc-400 mt-1">Requires {Math.round(totalAnnualBillableHours / 12)} billable hours per month.</p>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900/80 p-4 border border-zinc-800 text-xs text-zinc-300 space-y-1">
        <div className="flex items-center justify-between font-mono">
          <span>Required Gross Revenue:</span>
          <span className="font-bold text-emerald-400">${requiredGrossRevenue.toLocaleString()}/yr</span>
        </div>
        <div className="flex items-center justify-between font-mono">
          <span>Taxes Saved ({taxRatePct}%):</span>
          <span className="font-bold text-amber-400">${Math.round(requiredGrossRevenue * (taxRatePct / 100)).toLocaleString()}/yr</span>
        </div>
      </div>
    </div>
  );
};

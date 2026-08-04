import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Check, RefreshCw, Trophy } from 'lucide-react';

interface ChecklistToolProps {
  initialConfig?: Record<string, any>;
  resourceId?: string;
}

export const ChecklistTool: React.FC<ChecklistToolProps> = ({ initialConfig, resourceId = 'checklist' }) => {
  const defaultItems = initialConfig?.checklistItems || [
    { id: 'c1', text: 'Configure custom domain & SSL certificate', category: 'Infrastructure' },
    { id: 'c2', text: 'Set up Google Search Console & XML sitemap', category: 'SEO' },
    { id: 'c3', text: 'Verify Open Graph images & Twitter Cards', category: 'SEO' },
    { id: 'c4', text: 'Test Stripe / payment webhooks in production mode', category: 'Payments' },
    { id: 'c5', text: 'Add Terms of Service and Privacy Policy pages', category: 'Legal' },
    { id: 'c6', text: 'Verify email delivery & SPF/DKIM records', category: 'Email' },
    { id: 'c7', text: 'Audit security headers (Content-Security-Policy, CORS)', category: 'Security' },
    { id: 'c8', text: 'Prepare Product Hunt gallery images & maker comment', category: 'Marketing' },
  ];

  const storageKey = `checklist_state_${resourceId}`;
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedIds));
    } catch {}
  }, [checkedIds, storageKey]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const progressPct = Math.round((checkedIds.length / defaultItems.length) * 100);

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Interactive Checklist</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-400" />
            Pre-Flight Checklist & Progress Tracker
          </h3>
        </div>
        <button
          onClick={() => setCheckedIds([])}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-300">Completion Status</span>
          <span className="font-mono text-emerald-400 font-bold">{progressPct}% ({checkedIds.length}/{defaultItems.length})</span>
        </div>
        <div className="h-3 w-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {progressPct === 100 && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-center gap-3 text-emerald-300 text-xs font-medium">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Congratulations! All pre-flight checklist steps completed. Your app is production ready!</span>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-2">
        {defaultItems.map((item: any) => {
          const isDone = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                isDone
                  ? 'border-emerald-500/30 bg-emerald-950/20 text-zinc-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                  isDone ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-600'
                }`}>
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className={`text-xs font-medium ${isDone ? 'line-through text-zinc-500' : ''}`}>
                  {item.text}
                </span>
              </div>
              {item.category && (
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                  {item.category}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

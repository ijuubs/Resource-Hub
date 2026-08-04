import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import {
  LayoutDashboard,
  Layers,
  FileText,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Download,
  Settings,
  ShieldAlert,
  Search,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { role, setRole } = useAuth();
  const {
    resources,
    articles,
    products,
    subscribers,
    settings,
    updateSettings,
    addResource,
    addArticle,
    deleteResource,
    deleteArticle,
    analytics,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'resources' | 'articles' | 'products' | 'subscribers' | 'settings'
  >('overview');

  const [newResTitle, setNewResTitle] = useState('');
  const [newResType, setNewResType] = useState<any>('calculator');
  const [newResSummary, setNewResSummary] = useState('');

  // Analytics data for Recharts
  const revenueData = [
    { month: 'Jan', DigitalProducts: 2400, Affiliates: 1800, Premium: 1200 },
    { month: 'Feb', DigitalProducts: 3100, Affiliates: 2200, Premium: 1500 },
    { month: 'Mar', DigitalProducts: 4200, Affiliates: 2900, Premium: 2100 },
    { month: 'Apr', DigitalProducts: 5600, Affiliates: 3800, Premium: 2800 },
    { month: 'May', DigitalProducts: 7800, Affiliates: 4500, Premium: 3900 },
    { month: 'Jun', DigitalProducts: 9400, Affiliates: 5400, Premium: 4800 },
  ];

  if (role !== 'admin' && role !== 'superadmin' && role !== 'editor') {
    return (
      <div className="max-w-xl mx-auto my-12 rounded-3xl border border-rose-500/30 bg-rose-950/20 p-8 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Admin Access Restricted</h2>
        <p className="text-xs text-zinc-300">
          Your current role is set to <strong>{role.toUpperCase()}</strong>. Switch your role using the RBAC switcher below or in the top navigation bar.
        </p>
        <div className="flex justify-center gap-2 pt-2">
          <button
            onClick={() => setRole('admin')}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white shadow"
          >
            Switch to Admin Role
          </button>
        </div>
      </div>
    );
  }

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle) return;
    const slug = newResTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addResource({
      title: newResTitle,
      slug,
      type: newResType,
      category: 'saas-finance',
      shortSummary: newResSummary || 'Newly drafted interactive resource tool.',
      contentBlocks: [{ id: '1', type: 'paragraph', content: 'Detailed resource body specifications.' }],
      status: 'published',
    });
    setNewResTitle('');
    setNewResSummary('');
    alert('Resource created and published to production catalog!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Control Panel</span>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            ResourceHub Admin & Revenue Engine
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            Active Role: <strong className="text-emerald-400 uppercase">{role}</strong>
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-white focus:outline-none"
          >
            <option value="guest">Role: Guest</option>
            <option value="user">Role: User</option>
            <option value="editor">Role: Editor</option>
            <option value="admin">Role: Admin</option>
            <option value="superadmin">Role: Super Admin</option>
          </select>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Analytics Overview', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'resources', label: `Resources (${resources.length})`, icon: <Layers className="w-4 h-4" /> },
          { id: 'articles', label: `Articles (${articles.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'products', label: `Products (${products.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'settings', label: 'Monetization Settings', icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <span className="text-xs text-zinc-400 font-mono">Total Monthly Views</span>
              <p className="text-2xl font-black text-white mt-1">{analytics.totalViews.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-400 font-mono">+18.4% vs last month</span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <span className="text-xs text-zinc-400 font-mono">Resource Downloads</span>
              <p className="text-2xl font-black text-white mt-1">{analytics.totalDownloads.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-400 font-mono">+24.1% conversion rate</span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <span className="text-xs text-zinc-400 font-mono">Newsletter Subscribers</span>
              <p className="text-2xl font-black text-white mt-1">{analytics.subscribersCount.toLocaleString()}</p>
              <span className="text-[10px] text-indigo-400 font-mono">Weekly open rate: 42.8%</span>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <span className="text-xs text-zinc-400 font-mono">Gross Monthly Revenue</span>
              <p className="text-2xl font-black text-emerald-400 mt-1">${analytics.grossRevenue.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-500/80 font-mono">Affiliates + Bundles + Ads</span>
            </div>
          </div>

          {/* Revenue Breakdown Chart */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              6-Month Multi-Stream Revenue Breakdown ($)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${v}`} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '8px' }} />
                  <Bar dataKey="DigitalProducts" fill="#6366f1" name="Digital Bundles ($)" />
                  <Bar dataKey="Affiliates" fill="#10b981" name="Affiliate Revenue ($)" />
                  <Bar dataKey="Premium" fill="#f59e0b" name="PRO Membership ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Resources CRUD Tab */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Create Resource Form */}
          <form onSubmit={handleCreateResource} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Quick Add Resource Tool
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Resource Title (e.g. SaaS Pricing Matrix)..."
                value={newResTitle}
                onChange={(e) => setNewResTitle(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
              <select
                value={newResType}
                onChange={(e) => setNewResType(e.target.value)}
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white focus:outline-none"
              >
                <option value="calculator">Calculator Tool</option>
                <option value="ai-tool">AI Recipe Tool</option>
                <option value="template">Notion Template</option>
                <option value="guide">Guide</option>
                <option value="checklist">Checklist</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow"
              >
                Publish Resource
              </button>
            </div>
          </form>

          {/* Resources Table */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900 text-zinc-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-4">Title & Slug</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-zinc-900/60">
                    <td className="p-4 font-semibold text-white">
                      {res.title}
                      <span className="block text-[10px] text-zinc-500 font-mono">/{res.slug}</span>
                    </td>
                    <td className="p-4">
                      <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-mono capitalize">
                        {res.type}
                      </span>
                    </td>
                    <td className="p-4 text-amber-400">★ {res.rating}</td>
                    <td className="p-4 font-mono">{res.viewsCount.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteResource(res.id)}
                        className="rounded p-1.5 text-rose-400 hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Articles CRUD Tab */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900 text-zinc-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-4">Article Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Reading Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-zinc-900/60">
                    <td className="p-4 font-semibold text-white">
                      {art.title}
                      <span className="block text-[10px] text-zinc-500 font-mono">By {art.author.name}</span>
                    </td>
                    <td className="p-4 font-mono uppercase text-[10px] text-indigo-400">{art.category}</td>
                    <td className="p-4 font-mono">{art.readingTimeMinutes} mins</td>
                    <td className="p-4">
                      <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                        {art.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteArticle(art.id)}
                        className="rounded p-1.5 text-rose-400 hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Email Marketing Audience</h3>
            <button
              onClick={() => {
                const csv = subscribers.map((s) => `${s.email},${s.source},${s.subscribedAt}`).join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'resourcehub_subscribers.csv';
                a.click();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900 text-zinc-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Source Channel</th>
                  <th className="p-4">Subscribed Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-zinc-900/60">
                    <td className="p-4 font-mono text-white">{sub.email}</td>
                    <td className="p-4 font-mono text-indigo-400">{sub.source}</td>
                    <td className="p-4 text-zinc-400">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                    <td className="p-4 text-emerald-400">✓ Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monetization Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-base font-bold text-white">Monetization & Ad Controls</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Display Ad Units</h4>
                <p className="text-xs text-zinc-400">Toggle Google AdSense & Direct Banner placeholders.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.monetization.enableAds}
                onChange={(e) =>
                  updateSettings({
                    monetization: { ...settings.monetization, enableAds: e.target.checked },
                  })
                }
                className="w-5 h-5 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Affiliate Partner Links</h4>
                <p className="text-xs text-zinc-400">Enable affiliate banners & verified recommendations.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.monetization.enableAffiliates}
                onChange={(e) =>
                  updateSettings({
                    monetization: { ...settings.monetization, enableAffiliates: e.target.checked },
                  })
                }
                className="w-5 h-5 accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <div>
                <h4 className="text-sm font-semibold text-white">Digital Product Downloads</h4>
                <p className="text-xs text-zinc-400">Enable paid Notion bundles & digital downloads.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.monetization.enableDigitalProducts}
                onChange={(e) =>
                  updateSettings({
                    monetization: { ...settings.monetization, enableDigitalProducts: e.target.checked },
                  })
                }
                className="w-5 h-5 accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

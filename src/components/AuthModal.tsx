import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, LogIn, Shield, Check, Lock, UserCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { loginModalOpen, setLoginModalOpen, currentUser, role, setRole, loginWithGoogle, loginWithEmail, logout } = useAuth();
  const [emailInput, setEmailInput] = useState('');

  if (!loginModalOpen) return null;

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'guest', label: 'Guest', desc: 'Browse resources, calculators, and articles' },
    { id: 'user', label: 'Registered User', desc: 'Save bookmarks and track downloads' },
    { id: 'editor', label: 'Editor', desc: 'Draft and edit resources & articles' },
    { id: 'admin', label: 'Admin', desc: 'Manage users, content, analytics & ads' },
    { id: 'superadmin', label: 'Super Admin', desc: 'Full platform access & settings control' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-6">
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Firebase Auth & RBAC Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white">Sign In to ResourceHub</h2>
          <p className="text-xs text-zinc-400">Access your saved tools, download history, and AI Workspace.</p>
        </div>

        {/* Account Quick Role Switcher */}
        <div className="space-y-2 pt-2 border-t border-zinc-800">
          <label className="text-xs font-semibold text-zinc-300">Quick Test Role Switcher (RBAC):</label>
          <div className="space-y-1.5">
            {rolesList.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`w-full flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition-all ${
                  role === r.id
                    ? 'border-indigo-500 bg-indigo-950/50 text-white font-bold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span>{r.label}</span>
                    {role === r.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-normal">{r.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Google & Email Login */}
        <div className="space-y-3 pt-2">
          <button
            onClick={loginWithGoogle}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 px-4 py-3 text-xs font-bold text-white transition-all"
          >
            <span>Continue with Google</span>
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (emailInput) loginWithEmail(emailInput);
            }}
            className="space-y-2"
          >
            <input
              type="email"
              placeholder="Or enter email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition-all"
            >
              <span>Sign In with Email</span>
            </button>
          </form>
        </div>

        {currentUser && (
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
            <span>Signed in as: <strong>{currentUser.email}</strong></span>
            <button onClick={logout} className="text-rose-400 hover:underline">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

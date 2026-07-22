import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { ShieldAlert, UserCheck, Lock, ChevronRight, Sparkles } from 'lucide-react';

const roles = [
  { id: 'Station Master', label: 'Station Master', desc: 'Terminal Crowd Control & Train Logistics', icon: '🚉' },
  { id: 'Railway Police', label: 'Railway Police (RPF)', desc: 'Ground Crowd Enforcement & Perimeter Security', icon: '👮‍♂️' },
  { id: 'Medical Team', label: 'Medical Team', desc: 'Emergency Triage & Victim Evacuation', icon: '🚑' },
  { id: 'Emergency Commander', label: 'Emergency Commander', desc: 'Multi-Agency Crisis Command', icon: '⚡' },
  { id: 'Administrator', label: 'Administrator', desc: 'Cisco Smart City IoT & System Config', icon: '⚙️' },
];

const LoginPage = () => {
  const { handleLogin } = useSimulation();
  const [selectedRole, setSelectedRole] = useState('Station Master');
  const [username, setUsername] = useState('station.master@ir.gov.in');

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(selectedRole);
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Animated Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-xl bg-[#0b132b]/85 backdrop-blur-2xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-8 z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30 mb-2">
            <ShieldAlert className="w-9 h-9 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-100">
              CrowdShield AI
            </h1>
            <p className="text-sm font-semibold text-cyan-400 mt-1">
              AI Railway Crowd Intelligence Platform
            </p>
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-mx-auto">
            Cisco Smart City & Indian Railways Emergency Decision Support System
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Role Selection Grid */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Select Command Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {roles.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      setSelectedRole(r.id);
                      setUsername(`${r.id.toLowerCase().replace(/\s+/g, '.')}&#64;ir.gov.in`);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/60 shadow-lg shadow-cyan-950'
                        : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {r.label}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{r.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dummy Credentials Field */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Official ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Password</label>
              <input
                type="password"
                value="••••••••••••"
                readOnly
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2 transition transform active:scale-98"
          >
            <span>Access Command Center</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Secured by Cisco Edge Security & JWT Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

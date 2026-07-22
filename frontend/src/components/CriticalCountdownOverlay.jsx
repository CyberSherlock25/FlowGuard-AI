import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Siren, AlertTriangle, Video, CheckCircle2, ShieldAlert, ArrowRight, Lock, Unlock, Droplets, Volume2 } from 'lucide-react';

const CriticalCountdownOverlay = () => {
  const { scenario, countdown, setWebexModalOpen, setScenario, setRiskScore } = useSimulation();

  if (scenario !== 'CRITICAL') return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0b132b] rounded-3xl border-2 border-rose-500 shadow-2xl shadow-rose-500/40 p-6 md:p-8 space-y-6 relative overflow-hidden glow-red">
        {/* Top Warning Banner */}
        <div className="flex items-center justify-between border-b border-rose-900/60 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-500 animate-bounce">
              <Siren className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-rose-500 tracking-widest flex items-center space-x-2">
                <span>CRITICAL EMERGENCY ALERT</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">CRITICAL CROWD CRUSH DETECTED</h2>
            </div>
          </div>

          {/* 30-Second Countdown Counter */}
          <div className="flex flex-col items-end">
            <div className="text-xs text-rose-400 font-semibold uppercase">Auto-Mitigation Active</div>
            <div className="text-4xl font-black text-rose-500 tracking-tighter animate-pulse">
              00:{countdown < 10 ? `0${countdown}` : countdown}
            </div>
          </div>
        </div>

        {/* Real-time Automated Protocol Checklist */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Automated AI Interventions Triggered</span>
            <span className="text-cyan-400 font-normal text-[11px]">11 Operations In Progress</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 bg-rose-950/40 p-2.5 rounded-xl border border-rose-800/60 text-rose-200">
              <Lock className="w-4 h-4 text-rose-400 shrink-0" />
              <span>✔ Inbound Entry Gates Stopped</span>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 text-emerald-200">
              <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>✔ Emergency Exit B Opened Wide</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>✔ One-Way Stair Divider Activated</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>✔ Passenger Flow Redirected</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-950/40 p-2.5 rounded-xl border border-blue-800/60 text-blue-200">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
              <span>✔ Railway Police Dispatched</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-950/40 p-2.5 rounded-xl border border-blue-800/60 text-blue-200">
              <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
              <span>✔ Medical Response Dispatched</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-slate-200">
              <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>✔ Cooling Mist Activated</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-slate-200">
              <Volume2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>✔ Emergency Announcements Active</span>
            </div>
          </div>
        </div>

        {/* Cisco Webex Action & Manual Override */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setWebexModalOpen(true)}
            className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 flex items-center justify-center space-x-2 transition"
          >
            <Video className="w-5 h-5" />
            <span>Join Cisco Webex Incident Room</span>
          </button>

          <button
            onClick={() => {
              setScenario('RECOVERY');
              setRiskScore(22);
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
          >
            Skip to Recovery Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriticalCountdownOverlay;

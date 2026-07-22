import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Clock, ShieldAlert, Bot, CheckCircle2, AlertTriangle, Zap, Radio, Sparkles } from 'lucide-react';

const IncidentTimelinePage = () => {
  const { timelineLogs } = useSimulation();

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live Station Incident Audit Log & Timeline</h2>
            <p className="text-xs text-slate-400">Dynamic Synchronized Event Stream of Automated AI Triggers & Operator Actions</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{timelineLogs.length} Real-Time Logs Synced</span>
        </div>
      </div>

      {/* Dynamic Log Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="space-y-3">
          {timelineLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                log.severity === 'CRITICAL'
                  ? 'bg-rose-950/30 border-rose-800/80 glow-red'
                  : log.severity === 'WARNING'
                  ? 'bg-amber-950/30 border-amber-800/80 glow-yellow'
                  : log.severity === 'SUCCESS'
                  ? 'bg-emerald-950/20 border-emerald-800/60'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  log.severity === 'CRITICAL'
                    ? 'bg-rose-500 text-white animate-bounce'
                    : log.severity === 'WARNING'
                    ? 'bg-amber-500 text-slate-950'
                    : log.severity === 'SUCCESS'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                }`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100 text-sm">{log.event}</span>
                    <span className="text-xs text-cyan-400 font-mono">[{log.time}]</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">{log.desc}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs shrink-0">
                <span className="text-slate-400">Actor: <span className="text-slate-200 font-semibold">{log.actor}</span></span>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-bold uppercase">
                  {log.cat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentTimelinePage;

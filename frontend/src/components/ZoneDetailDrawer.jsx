import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { X, Users, Gauge, Activity, AlertTriangle, ArrowRight, ShieldAlert, Lock, Unlock } from 'lucide-react';

const ZoneDetailDrawer = () => {
  const { selectedZone, setSelectedZone } = useSimulation();

  if (!selectedZone) return null;

  const getStatusBadge = (color) => {
    switch (color) {
      case 'GREEN':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">NORMAL (GREEN)</span>;
      case 'YELLOW':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold">WARNING (YELLOW)</span>;
      case 'RED':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold animate-pulse">CRITICAL (RED)</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0b132b]/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs text-cyan-400 font-semibold tracking-wider uppercase">{selectedZone.code} • {selectedZone.type}</div>
            <h2 className="text-xl font-bold text-slate-100">{selectedZone.name}</h2>
          </div>
          <button
            onClick={() => setSelectedZone(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge & Risk */}
        <div className="flex items-center justify-between bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          <div>
            <div className="text-xs text-slate-400">Current Risk Index</div>
            <div className="text-2xl font-black text-slate-100">{selectedZone.riskScore}%</div>
          </div>
          {getStatusBadge(selectedZone.statusColor)}
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-card p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Current Crowd</span>
            </div>
            <div className="text-xl font-bold text-slate-100">
              {selectedZone.currentCrowd} <span className="text-xs text-slate-400 font-normal">/ {selectedZone.maxCapacity}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  selectedZone.densityPercentage > 80 ? 'bg-rose-500' : selectedZone.densityPercentage > 50 ? 'bg-amber-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min(selectedZone.densityPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="glass-card p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Gauge className="w-4 h-4 text-rose-400" />
              <span>Pressure Index</span>
            </div>
            <div className="text-xl font-bold text-slate-100">
              {selectedZone.pressurePsi} <span className="text-xs text-slate-400 font-normal">PSI</span>
            </div>
            <p className="text-[10px] text-slate-400">Safety Threshold: 4.0 PSI</p>
          </div>

          <div className="glass-card p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Walking Velocity</span>
            </div>
            <div className="text-xl font-bold text-slate-100">
              {selectedZone.avgSpeedMs} <span className="text-xs text-slate-400 font-normal">m/s</span>
            </div>
            <p className="text-[10px] text-slate-400">Optimal: 1.2 - 1.6 m/s</p>
          </div>

          <div className="glass-card p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Capacity Load</span>
            </div>
            <div className="text-xl font-bold text-cyan-300">
              {selectedZone.densityPercentage}%
            </div>
            <p className="text-[10px] text-slate-400">Calculated by AI Vision</p>
          </div>
        </div>

        {/* AI Prediction & Action */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-cyan-400" />
              <span>AI CROWD PREDICTION</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "{selectedZone.aiPrediction}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60 space-y-2">
            <div className="flex items-center space-x-2 text-blue-300 font-bold text-xs">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              <span>SUGGESTED DISPATCH ACTION</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedZone.suggestedAction}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Manual Overrides */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <div className="text-xs text-slate-400 font-semibold mb-2">Zone Intervention Controls</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => alert(`Lock Turnstiles triggered for ${selectedZone.name}`)}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Restrict Inbound</span>
          </button>

          <button
            onClick={() => alert(`Emergency Exit Release triggered for ${selectedZone.name}`)}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-300 text-xs font-semibold border border-cyan-500/50 transition"
          >
            <Unlock className="w-4 h-4 text-cyan-400" />
            <span>Open Clear Passage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoneDetailDrawer;

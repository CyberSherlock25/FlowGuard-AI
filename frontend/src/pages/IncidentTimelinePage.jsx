import React from 'react';
import { Clock, ShieldAlert, Bot, CheckCircle2, AlertTriangle, Zap, Radio } from 'lucide-react';

const timelineLogs = [
  { id: 1, time: '03:21:40 UTC', event: 'AI Prediction Triggered', cat: 'AI_FORECAST', severity: 'WARNING', desc: 'Neural vision model calculated 80% bottleneck probability on FOB North within 4 minutes.', actor: 'CrowdShield AI Engine' },
  { id: 2, time: '03:21:45 UTC', event: 'Station Master Alerted', cat: 'NOTIFICATION', severity: 'INFO', desc: 'Automated dispatch sent visual & audio alert to Station Master terminal.', actor: 'System Core' },
  { id: 3, time: '03:21:50 UTC', event: 'Digital Signboards Updated', cat: 'INTERVENTION', severity: 'INFO', desc: 'Dynamic LED matrix updated to display alternate Escalator 2 route.', actor: 'Cisco IoT Gateway' },
  { id: 4, time: '03:22:00 UTC', event: 'Emergency Exit B Unlocked', cat: 'HARDWARE', severity: 'WARNING', desc: 'Solenoid locks disengaged on Exit B to increase outflow speed to 2.2 m/s.', actor: 'Automated Turnstile System' },
  { id: 5, time: '03:22:10 UTC', event: 'RPF Ground Crew Dispatched', cat: 'DISPATCH', severity: 'CRITICAL', desc: 'RPF Unit 4 deployed to FOB stair base for manual crowd direction.', actor: 'RPF Command Desk' },
  { id: 6, time: '03:22:25 UTC', event: 'Incident Resolved & Recovered', cat: 'RECOVERY', severity: 'SUCCESS', desc: 'Crowd density returned to safe 25% baseline. 0 injuries reported.', actor: 'CrowdShield AI Engine' },
];

const IncidentTimelinePage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Station Incident Audit Log & Timeline</h2>
            <p className="text-xs text-slate-400">Immutable Event Sequence of Automated AI Actions & Operator Interventions</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Real-time Audit Log Active</span>
        </div>
      </div>

      {/* Log Feed */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="space-y-4">
          {timelineLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  log.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : log.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
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
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 text-[10px] font-bold">{log.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncidentTimelinePage;

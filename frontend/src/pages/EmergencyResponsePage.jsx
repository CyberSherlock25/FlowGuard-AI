import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Siren, CheckCircle2, Video, Lock, Unlock, Droplets, Volume2, ShieldAlert, HeartPulse, Clock, Sparkles } from 'lucide-react';

const timelineSteps = [
  { id: 1, stage: 'Prediction', label: 'AI Congestion Forecast', desc: 'Neural vision model identified 80% bottleneck probability on FOB North.', icon: Sparkles },
  { id: 2, stage: 'Alert', label: 'Automated Crisis Alert', desc: 'Station Master & RPF notified via radio and dashboard popups.', icon: Siren },
  { id: 3, stage: 'Police', label: 'RPF Ground Dispatch', desc: 'Railway Police Force deployed to regulate FOB stair entrance.', icon: ShieldAlert },
  { id: 4, stage: 'Medical', label: 'Medical Triage Ready', desc: 'Medical Team Alpha stationed at North Concourse with ambulances.', icon: HeartPulse },
  { id: 5, stage: 'Gate Open', label: 'Emergency Gate B Unlocked', desc: 'Turnstiles reversed to allow fast outbound clearance.', icon: Unlock },
  { id: 6, stage: 'Crowd Redirected', label: 'Dynamic Route Diversion', desc: 'Digital signboards & voice guidance routed crowd to Escalator 2.', icon: Volume2 },
  { id: 7, stage: 'Victims Rescued', label: 'Targeted Victim Evacuation', desc: 'All 12 high-risk passengers safely assisted by ground crew.', icon: CheckCircle2 },
  { id: 8, stage: 'Station Safe', label: 'Operations Stabilized', desc: 'Crowd density returned to normal 22% safe baseline.', icon: CheckCircle2 },
];

const EmergencyResponsePage = () => {
  const { scenario, setWebexModalOpen, manualTriggerEmergency, addTimelineLog } = useSimulation();

  const getActiveStepIndex = () => {
    switch (scenario) {
      case 'SAFE':
        return 1;
      case 'WARNING':
        return 3;
      case 'CRITICAL':
        return 6;
      case 'RECOVERY':
        return 8;
      default:
        return 1;
    }
  };

  const currentActive = getActiveStepIndex();

  const handleAction = (actionName, logMsg) => {
    addTimelineLog(actionName, 'HARDWARE_OVERRIDE', 'CRITICAL', logMsg, 'Operator Action');
    alert(`[EMERGENCY OVERRIDE] ${actionName} Triggered successfully across all synced role dashboards!`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className={`flex items-center justify-between glass-panel p-4 rounded-2xl border transition-all ${
        scenario === 'CRITICAL' ? 'border-rose-500/80 glow-red' : scenario === 'WARNING' ? 'border-amber-500/80 glow-yellow' : 'border-slate-800'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            scenario === 'CRITICAL' ? 'bg-rose-500 text-white animate-bounce' : 'bg-rose-500/20 text-rose-400'
          }`}>
            <Siren className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Emergency Incident Response Command</h2>
            <p className="text-xs text-slate-400">Multi-Agency Cisco Smart City Real-time Incident Coordination Hub</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setWebexModalOpen(true)}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Cisco Webex Room</span>
          </button>

          <button
            onClick={manualTriggerEmergency}
            className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center space-x-1 animate-pulse"
          >
            <Siren className="w-4 h-4" />
            <span>Trigger Red Light Emergency</span>
          </button>
        </div>
      </div>

      {/* Dynamic 8-Stage Timeline */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
            Automated Emergency Response Timeline Progress
          </h3>
          <span className="text-xs font-semibold text-cyan-400">
            Stage {currentActive} of 8 Active Mode: {scenario}
          </span>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx + 1 <= currentActive;
            const isCurrent = idx + 1 === currentActive;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-br from-rose-500/20 to-blue-600/20 border-rose-500/80 shadow-xl shadow-rose-950 scale-102 glow-red'
                    : isCompleted
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isCurrent ? 'bg-rose-500 text-white animate-bounce' : isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isCurrent ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {step.stage}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-100 text-xs">{step.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{step.desc}</p>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{isCompleted ? 'Completed' : 'Pending Trigger'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Hardware Emergency Control Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">Synchronized Station Override Controls</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleAction('Lock Inbound Turnstiles', 'Inbound turnstiles locked remotely by operator.')}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 flex items-center space-x-3 transition text-left"
          >
            <Lock className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">Lock Inbound Turnstiles</div>
              <div className="text-[10px] text-slate-400">Stop concourse congestion</div>
            </div>
          </button>

          <button
            onClick={() => handleAction('Release Emergency Exit B', 'Emergency Exit B gates unlocked remotely.')}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 flex items-center space-x-3 transition text-left"
          >
            <Unlock className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">Release Emergency Exits</div>
              <div className="text-[10px] text-slate-400">Open 100% exit corridors</div>
            </div>
          </button>

          <button
            onClick={() => handleAction('Activate Cooling Mist Spray', 'Cooling mist spray system activated on FOB North.')}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 flex items-center space-x-3 transition text-left"
          >
            <Droplets className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">Activate Cooling Mist</div>
              <div className="text-[10px] text-slate-400">Reduce heat & panic index</div>
            </div>
          </button>

          <button
            onClick={() => handleAction('Broadcast Evacuation PA', 'Emergency evacuation audio broadcasted.')}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 flex items-center space-x-3 transition text-left"
          >
            <Volume2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-slate-200 text-xs">Broadcast Evacuation PA</div>
              <div className="text-[10px] text-slate-400">Play audio voice guidance</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResponsePage;

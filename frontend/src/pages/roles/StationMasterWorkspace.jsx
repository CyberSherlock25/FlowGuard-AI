import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import DigitalTwinCanvas from '../../components/DigitalTwinCanvas';
import ZoneDetailDrawer from '../../components/ZoneDetailDrawer';
import AIAssistantPanel from '../../components/AIAssistantPanel';
import {
  ShieldAlert,
  Radio,
  Lock,
  Unlock,
  Volume2,
  Siren,
  Video,
  FileText,
  Users,
  Train,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

const StationMasterWorkspace = () => {
  const { scenario, riskScore, manualTriggerEmergency, setWebexModalOpen } = useSimulation();
  const [aiOverride, setAiOverride] = useState(false);
  const [announcementPlayed, setAnnouncementPlayed] = useState(false);

  const toggleOverride = () => {
    setAiOverride(!aiOverride);
  };

  const handleBroadcast = () => {
    setAnnouncementPlayed(true);
    setTimeout(() => setAnnouncementPlayed(false), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      <ZoneDetailDrawer />

      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
            <span>MASTER COMMAND CENTER</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">Station Master Executive Workspace</h1>
          <p className="text-xs text-slate-400">Indian Railways Terminal Operations & Automated Crowd Decision Override</p>
        </div>

        {/* Override Toggle & Webex */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleOverride}
            className={`px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center space-x-2 transition ${
              aiOverride
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 glow-yellow'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>{aiOverride ? 'AI Override: MANUAL CONTROL' : 'AI Override: AUTOMATED'}</span>
          </button>

          <button
            onClick={() => setWebexModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>Launch Webex Crisis Room</span>
          </button>
        </div>
      </div>

      {/* Quick Action Command Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Station Master Quick Actions</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          <button
            onClick={() => alert('Emergency Gate B Released Wide Open')}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Unlock className="w-4 h-4 text-cyan-400" />
            <span>Open Exit B</span>
          </button>

          <button
            onClick={() => alert('Inbound Turnstiles Paused')}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Pause Entry</span>
          </button>

          <button
            onClick={handleBroadcast}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center ${
              announcementPlayed ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900/90 border-slate-800 text-emerald-300'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{announcementPlayed ? 'Broadcasting...' : 'Broadcast PA'}</span>
          </button>

          <button
            onClick={manualTriggerEmergency}
            className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800 text-rose-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Evacuate</span>
          </button>

          <button
            onClick={() => alert('RPF Command Notified')}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-blue-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Radio className="w-4 h-4 text-blue-400" />
            <span>Notify RPF</span>
          </button>

          <button
            onClick={() => alert('Medical Command Notified')}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-rose-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Notify Medical</span>
          </button>

          <button
            onClick={() => setWebexModalOpen(true)}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-indigo-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Video className="w-4 h-4 text-indigo-400" />
            <span>Webex Room</span>
          </button>

          <button
            onClick={() => alert('PDF Incident Report Generated')}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Report PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Digital Twin & AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <DigitalTwinCanvas />

          {/* Platform Occupancy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold uppercase">Platform 1 Central</div>
              <div className="text-xl font-bold text-slate-100">{scenario === 'CRITICAL' ? '950' : '420'} / 1000</div>
              <div className="text-[10px] text-cyan-400">CSMT Local: Arriving in 4 Mins</div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold uppercase">Platform 2 Express</div>
              <div className="text-xl font-bold text-slate-100">310 / 1000</div>
              <div className="text-[10px] text-emerald-400">Flow Steady (1.6 m/s)</div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-semibold uppercase">FOB North Bridge</div>
              <div className={`text-xl font-bold ${scenario === 'CRITICAL' ? 'text-rose-400' : scenario === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {scenario === 'CRITICAL' ? '480 (8.9 PSI)' : scenario === 'WARNING' ? '410 (4.8 PSI)' : '180 (1.5 PSI)'}
              </div>
              <div className="text-[10px] text-slate-400">Bottleneck Index</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AIAssistantPanel fullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default StationMasterWorkspace;

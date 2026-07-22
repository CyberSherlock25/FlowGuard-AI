import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import DigitalTwinCanvas from '../../components/DigitalTwinCanvas';
import ZoneDetailDrawer from '../../components/ZoneDetailDrawer';
import {
  ShieldAlert,
  SlidersHorizontal,
  Video,
  FileText,
  Radio,
  Users,
  CheckCircle2,
  AlertTriangle,
  Activity,
  HeartPulse,
  Building,
  Check,
  Siren
} from 'lucide-react';

const CommanderWorkspace = () => {
  const { scenario, riskScore, setWebexModalOpen, manualTriggerEmergency } = useSimulation();
  const [aiApproved, setAiApproved] = useState(true);

  const toggleApproval = () => {
    setAiApproved(!aiApproved);
  };

  return (
    <div className="space-y-6 font-sans">
      <ZoneDetailDrawer />

      {/* Synchronized RED LIGHT Emergency Alert Banner */}
      {scenario === 'CRITICAL' && (
        <div className="p-4 rounded-3xl bg-rose-950/90 border-2 border-rose-500 text-xs font-bold text-rose-200 flex items-center justify-between glow-red animate-pulse shadow-2xl">
          <div className="flex items-center space-x-3">
            <Siren className="w-6 h-6 text-rose-500 animate-bounce" />
            <div>
              <div className="text-rose-400 font-black text-sm uppercase tracking-wider">COMMANDER DIRECTIVE: CRITICAL MULTI-AGENCY INCIDENT ACTIVE</div>
              <p className="text-[11px] text-slate-200 mt-0.5">Physical crowd pressure reached 8.9 PSI. All departmental emergency protocols authorized.</p>
            </div>
          </div>
          <button
            onClick={() => setWebexModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/40 shrink-0"
          >
            Launch Webex Conference
          </button>
        </div>
      )}

      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/30">
            ⚡
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <span>MULTI-AGENCY CRISIS COMMAND</span>
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            </div>
            <h1 className="text-2xl font-black text-slate-100">Emergency Commander Workspace</h1>
            <p className="text-xs text-slate-400">Master Department Oversight, AI Decision Approval & Inter-Agency Coordination</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleApproval}
            className={`px-4 py-2.5 rounded-xl border font-bold text-xs flex items-center space-x-2 transition ${
              aiApproved
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 glow-green'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/50 glow-yellow'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{aiApproved ? 'AI Decision: APPROVED' : 'AI Decision: PENDING REVIEW'}</span>
          </button>

          <button
            onClick={() => setWebexModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>Join Webex Room</span>
          </button>
        </div>
      </div>

      {/* 4 Multi-Department Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Department 1: Station Master Overview */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Station Logistics</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{scenario === 'CRITICAL' ? 'Exit B Open' : 'Normal Flow'}</div>
          <p className="text-[10px] text-slate-400">Platform 1 Capacity: {scenario === 'CRITICAL' ? '95%' : '42%'}</p>
        </div>

        {/* Department 2: Railway Police Oversight */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Police Oversight</span>
            <ShieldAlert className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-300">12 Officers Active</div>
          <p className="text-[10px] text-slate-400">Corridor Base Secured</p>
        </div>

        {/* Department 3: Medical Response Overview */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Medical Triage</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-400">{scenario === 'CRITICAL' ? '2 Critical Triage' : '0 Critical'}</div>
          <p className="text-[10px] text-slate-400">Unit Alpha Ready</p>
        </div>

        {/* Department 4: Overall Risk Index */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Global Risk Index</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-slate-100">{riskScore}% Risk</div>
          <p className="text-[10px] text-slate-400">Cisco Smart City Engine</p>
        </div>
      </div>

      {/* Main Digital Twin & Inter-Agency Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <DigitalTwinCanvas />
        </div>

        {/* Commander Actions & Departmental Status */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm">Commander Directives</h3>

          <div className="space-y-3">
            <button
              onClick={() => alert('PDF Incident Report Generated')}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Generate Full Incident PDF</span>
            </button>

            <button
              onClick={manualTriggerEmergency}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Broadcast Multi-Agency Emergency</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommanderWorkspace;

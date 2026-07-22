import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import ComputerVisionOverlay from '../../components/ComputerVisionOverlay';
import {
  ShieldAlert,
  Radio,
  MapPin,
  Users,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Lock,
  UserCheck,
  Zap,
  ChevronRight,
  Eye,
  Siren
} from 'lucide-react';

const policeUnits = [
  { id: 'RPF-101', name: 'RPF Unit Alpha', location: 'Foot Overbridge North', count: 4, status: 'DEPLOYED', officer: 'Inspector Sharma' },
  { id: 'RPF-102', name: 'RPF Unit Bravo', location: 'Main Concourse Stairs A', count: 3, status: 'EN ROUTE', officer: 'Sub-Inspector Patil' },
  { id: 'RPF-103', name: 'RPF Unit Charlie', location: 'Emergency Exit B', count: 5, status: 'SECURING PERIMETER', officer: 'Head Constable Singh' },
];

const PoliceWorkspace = () => {
  const { scenario } = useSimulation();
  const [taskStatus, setTaskStatus] = useState('Perimeter Security Active');

  const threatLevel = scenario === 'CRITICAL' ? 'HIGH THREAT' : scenario === 'WARNING' ? 'ELEVATED' : 'LOW THREAT';

  return (
    <div className="space-y-6 font-sans">
      {/* Synchronized RED LIGHT Emergency Alert Banner */}
      {scenario === 'CRITICAL' && (
        <div className="p-4 rounded-3xl bg-rose-950/90 border-2 border-rose-500 text-xs font-bold text-rose-200 flex items-center justify-between glow-red animate-pulse shadow-2xl">
          <div className="flex items-center space-x-3">
            <Siren className="w-6 h-6 text-rose-500 animate-bounce" />
            <div>
              <div className="text-rose-400 font-black text-sm uppercase tracking-wider">POLICE DISPATCH: HIGH THREAT RED LIGHT ALERT</div>
              <p className="text-[11px] text-slate-200 mt-0.5">Critical crowd crush detected on FOB North. Deploy all available RPF officers to Exit B corridor.</p>
            </div>
          </div>
          <button
            onClick={() => alert('RPF Perimeter Lock Applied')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/40 shrink-0"
          >
            Lock Inbound Perimeter
          </button>
        </div>
      )}

      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
              <span>RAILWAY POLICE FORCE (RPF)</span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            </div>
            <h1 className="text-2xl font-black text-slate-100">Perimeter Security & Live Station Situation Dashboard</h1>
            <p className="text-xs text-slate-400">Real-time Station Surveillance, Threat Telemetry & Ground Security Deployment</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-xl border text-xs font-black tracking-wide ${
            threatLevel === 'HIGH THREAT'
              ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 glow-red animate-pulse'
              : threatLevel === 'ELEVATED'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 glow-yellow'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
          }`}>
            {threatLevel}
          </div>
        </div>
      </div>

      {/* Police Quick Action Tasks */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Police Operations Dispatch Toolbar</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => { setTaskStatus('Officers Deployed to FOB North'); alert('RPF Officers Deployed to FOB North'); }}
            className="p-3 rounded-xl bg-blue-900/40 hover:bg-blue-800/50 border border-blue-700/60 text-blue-200 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Deploy Officers</span>
          </button>

          <button
            onClick={() => { setTaskStatus('FOB Perimeter Secured'); alert('FOB North Perimeter Secured'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Secure Area</span>
          </button>

          <button
            onClick={() => { setTaskStatus('Human Corridor Active'); alert('Human Corridor Created from FOB to Exit B'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Create Corridor</span>
          </button>

          <button
            onClick={() => { setTaskStatus('Inbound Turnstiles Restricted'); alert('Inbound Turnstiles Restricted'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Restrict Access</span>
          </button>

          <button
            onClick={() => { setTaskStatus('Backup Requested'); alert('Additional RPF Battalion Backup Requested'); }}
            className="p-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800 text-rose-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Request Backup</span>
          </button>

          <button
            onClick={() => { setTaskStatus('Area Cleared & Safe'); alert('FOB Zone Marked Safe'); }}
            className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800 text-emerald-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark Area Safe</span>
          </button>
        </div>
      </div>

      {/* Main Security Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Station Situation & Real CCTV Video Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-200">
                <Camera className="w-4 h-4 text-blue-400" />
                <span>Real-Time CCTV Stream (FOB North - Actual Video Stream)</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">CAM-102 • Live Stream</span>
            </div>

            <ComputerVisionOverlay
              cameraTitle="Camera 02 - Foot Overbridge North"
              peopleCount={scenario === 'CRITICAL' ? 840 : scenario === 'WARNING' ? 620 : 180}
              density={scenario === 'CRITICAL' ? 96.0 : scenario === 'WARNING' ? 82.0 : 36.0}
              psi={scenario === 'CRITICAL' ? 8.9 : scenario === 'WARNING' ? 4.8 : 1.5}
              speed={scenario === 'CRITICAL' ? 0.1 : scenario === 'WARNING' ? 0.4 : 1.2}
              videoSrc="/cctv/cctv3.mp4"
            />
          </div>

          {/* RPF Officer Station Deployment Map */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-100 text-sm">Active RPF Officer Deployments across Station Locations</h3>
            <div className="space-y-2 text-xs">
              {policeUnits.map((unit) => (
                <div key={unit.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-100">{unit.name} ({unit.id})</div>
                      <div className="text-[10px] text-slate-400">{unit.location} • Officer in Charge: {unit.officer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-300">{unit.count} Officers</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{unit.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Real-time Station Situation Telemetry */}
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Real-Time Station Threat Telemetry</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Crowd Flow Resistance</div>
                <div className="font-bold text-slate-100 text-sm">
                  {scenario === 'CRITICAL' ? 'CRITICAL BOTTLENECK' : scenario === 'WARNING' ? 'ELEVATED FLOW PRESSURE' : 'NORMAL FLOW VELOCITY'}
                </div>
                <p className="text-[10px] text-slate-400">Walking speed: {scenario === 'CRITICAL' ? '0.1 m/s' : scenario === 'WARNING' ? '0.4 m/s' : '1.4 m/s'}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Emergency Exit Corridor</div>
                <div className="font-bold text-emerald-400 text-sm">Exit Gate B (Clear Passage)</div>
                <p className="text-[10px] text-slate-400">Security perimeter unlocked for egress</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[10px]">Active RPF Task Pipeline</div>
                <div className="font-bold text-cyan-300 text-sm">{taskStatus}</div>
                <p className="text-[10px] text-slate-400">Updated by RPF Ground Dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceWorkspace;

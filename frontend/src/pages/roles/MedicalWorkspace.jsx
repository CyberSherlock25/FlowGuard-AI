import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { fetchVictims } from '../../services/api';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  AlertCircle,
  Clock,
  MapPin,
  UserCheck,
  Stethoscope,
  PlusCircle,
  Radio,
  Building2,
  Navigation
} from 'lucide-react';

const hospitals = [
  { name: 'KEM Hospital (Parel)', distance: '1.2 km', beds: 14, status: 'AVAILABLE' },
  { name: 'Bombay Hospital (CSMT)', distance: '0.8 km', beds: 8, status: 'AVAILABLE' },
  { name: 'GT Hospital (Fort)', distance: '0.5 km', beds: 22, status: 'AVAILABLE' },
];

const MedicalWorkspace = () => {
  const { scenario } = useSimulation();
  const [victims, setVictims] = useState([]);
  const [actionMessage, setActionMessage] = useState('Medical Standby');

  useEffect(() => {
    fetchVictims().then(data => setVictims(data));
  }, []);

  const criticalCount = scenario === 'CRITICAL' ? 2 : 0;
  const minorCount = scenario === 'CRITICAL' ? 5 : scenario === 'WARNING' ? 3 : 1;
  const safeCount = scenario === 'RECOVERY' ? 12 : 8;

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-500">
            <HeartPulse className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-widest">
              <span>MEDICAL TRIAGE & RESCUE COMMAND</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>
            <h1 className="text-2xl font-black text-slate-100">Station Medical Emergency Dashboard</h1>
            <p className="text-xs text-slate-400">Victim Priority Queue, Ambulance Allocation & Hospital Bed Telemetry</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-1">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>4 Doctors On Duty</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center space-x-1">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>3 Ambulances Ready</span>
          </span>
        </div>
      </div>

      {/* Top 4 Medical KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-rose-500/60 flex items-center justify-between glow-red">
          <div>
            <div className="text-xs text-rose-400 font-bold uppercase">Critical Priority</div>
            <div className="text-3xl font-black text-rose-400 mt-1">{criticalCount}</div>
            <p className="text-[10px] text-slate-400">Immediate Ambulance Transport</p>
          </div>
          <HeartPulse className="w-8 h-8 text-rose-500 animate-bounce" />
        </div>

        <div className="glass-card p-4 rounded-2xl border border-amber-500/40 flex items-center justify-between glow-yellow">
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase">Minor Injury</div>
            <div className="text-3xl font-black text-slate-100 mt-1">{minorCount}</div>
            <p className="text-[10px] text-slate-400">Station Clinic First Aid</p>
          </div>
          <AlertCircle className="w-8 h-8 text-amber-400" />
        </div>

        <div className="glass-card p-4 rounded-2xl border border-emerald-500/40 flex items-center justify-between glow-green">
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase">Safe & Evacuated</div>
            <div className="text-3xl font-black text-slate-100 mt-1">{safeCount}</div>
            <p className="text-[10px] text-slate-400">Zero Casualties</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Emergency Kits</div>
            <div className="text-3xl font-black text-cyan-300 mt-1">12/12</div>
            <p className="text-[10px] text-slate-400">Oxygen & Trauma Supplies</p>
          </div>
          <PlusCircle className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Medical Quick Action Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Medical Quick Action Controls</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          <button
            onClick={() => { setActionMessage('Ambulance Dispatched'); alert('Ambulance 01 Dispatched to FOB North'); }}
            className="p-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800 text-rose-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Navigation className="w-4 h-4 text-rose-400" />
            <span>Dispatch Ambulance</span>
          </button>

          <button
            onClick={() => { setActionMessage('Doctor Assigned to VIC-102'); alert('Doctor Alpha Assigned to VIC-102'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>Assign Doctor</span>
          </button>

          <button
            onClick={() => { setActionMessage('First Aid Treatment Started'); alert('First Aid Administered'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-emerald-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Start Treatment</span>
          </button>

          <button
            onClick={() => { setActionMessage('Victim VIC-101 Marked Safe'); alert('Victim Marked Safe & Discharged'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Mark Victim Safe</span>
          </button>

          <button
            onClick={() => { setActionMessage('Trauma Backup Requested'); alert('Additional Medical Backup Requested'); }}
            className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition text-center"
          >
            <Radio className="w-4 h-4 text-amber-400" />
            <span>Request Backup</span>
          </button>
        </div>
      </div>

      {/* Victim Priority Queue & Hospital Bed Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Victim Priority Queue */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-100 text-sm">AI Victim Priority Triage Queue</h3>
            <span className="text-xs text-cyan-400">Status: {actionMessage}</span>
          </div>

          <div className="space-y-3">
            {victims.map((v) => (
              <div
                key={v.id}
                className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                  v.priority === 'CRITICAL' ? 'bg-rose-950/20 border-rose-800/60 glow-red' : v.priority === 'MINOR' ? 'bg-amber-950/20 border-amber-800/60' : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    v.priority === 'CRITICAL' ? 'bg-rose-500 text-white animate-pulse' : v.priority === 'MINOR' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                  }`}>
                    #{v.suggestedRescueOrder}
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 text-sm">{v.victimCode} ({v.estimatedAge})</div>
                    <div className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{v.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <div className="text-right">
                    <div className="text-slate-400 text-[10px]">Medical ETA</div>
                    <div className="font-bold text-cyan-400">{v.eta}</div>
                  </div>

                  <button
                    onClick={() => alert(`Ambulance dispatched to ${v.victimCode}`)}
                    className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-600/30 flex items-center space-x-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Nearby Hospital Availability */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Nearby Hospital Availability</span>
          </h3>

          <div className="space-y-3 text-xs">
            {hospitals.map((h, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="font-bold text-slate-200">{h.name}</div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>Distance: {h.distance}</span>
                  <span className="text-emerald-400 font-bold">{h.beds} ICU Beds Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalWorkspace;

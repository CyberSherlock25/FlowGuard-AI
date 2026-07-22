import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Smartphone,
  Volume2,
  ShieldAlert,
  Navigation,
  MapPin,
  Clock,
  CheckCircle2,
  Zap,
  HelpCircle
} from 'lucide-react';

const PassengerWorkspace = () => {
  const { scenario } = useSimulation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  const toggleVoiceGuidance = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 4000);
  };

  const handleSos = () => {
    setSosTriggered(true);
    setTimeout(() => setSosTriggered(false), 5000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Smartphone Container Mockup */}
      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-[#090e1f] rounded-[40px] border-4 border-slate-700 shadow-2xl p-5 space-y-5 text-slate-100 relative overflow-hidden">
          {/* Top Notch */}
          <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto -mt-5 mb-2 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-900" />
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Indian Railways Mobile</div>
              <h3 className="font-black text-sm text-slate-100">CrowdShield Passenger Companion</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Emergency Alert Banner */}
          {scenario === 'CRITICAL' ? (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/60 text-xs space-y-1 glow-red animate-pulse">
              <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>EMERGENCY EVACUATION</span>
              </div>
              <p className="text-[11px] text-rose-200">
                Please proceed directly to <strong>Emergency Exit B</strong>. Avoid Foot Overbridge North.
              </p>
            </div>
          ) : scenario === 'WARNING' ? (
            <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/60 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold">
                <Zap className="w-4 h-4" />
                <span>ROUTE NOTICE</span>
              </div>
              <p className="text-[11px] text-amber-200">
                Foot Overbridge North is busy. Please use <strong>Escalator 2</strong>.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>STATION FLOW SAFE</span>
              </div>
              <p className="text-[11px] text-emerald-200">All platforms operating with normal walking speeds.</p>
            </div>
          )}

          {/* Current Location & Route Card */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Location</span>
              <span className="font-bold text-cyan-400">Platform 1 (Central Express)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center space-x-1 text-slate-300">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold">Recommended Safe Route</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Main Concourse → Gate B → Escalator 2 → Platform 1
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">Walking Time</div>
                <div className="font-bold text-slate-100 text-sm flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3.2 Mins</span>
                </div>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px]">Crowd Level</div>
                <div className={`font-bold text-sm ${scenario === 'CRITICAL' ? 'text-rose-400' : scenario === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {scenario === 'CRITICAL' ? 'CRITICAL (95%)' : scenario === 'WARNING' ? 'MODERATE (80%)' : 'LOW (35%)'}
                </div>
              </div>
            </div>
          </div>

          {/* Voice Guidance Button */}
          <button
            onClick={toggleVoiceGuidance}
            className={`w-full py-3 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 transition ${
              isPlayingAudio
                ? 'bg-cyan-500 text-white border-cyan-400 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Playing AI Voice Guidance...' : 'Play Audio Voice Guidance'}</span>
          </button>

          {/* Emergency Exit & Help Point */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">Nearest Exit</div>
              <div className="font-bold text-emerald-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Exit B (40m)</span>
              </div>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">Nearest Help Point</div>
              <div className="font-bold text-cyan-300 flex items-center space-x-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>RPF Kiosk A</span>
              </div>
            </div>
          </div>

          {/* SOS Button */}
          <button
            onClick={handleSos}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center space-x-2 transition transform active:scale-95 ${
              sosTriggered
                ? 'bg-rose-500 text-white animate-bounce shadow-rose-500/50'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span>{sosTriggered ? 'SOS SENT TO RPF OFFICERS!' : 'PRESS SOS EMERGENCY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerWorkspace;

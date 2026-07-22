import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { X, Video, Mic, MicOff, Users, PhoneOff, ShieldAlert, Bot } from 'lucide-react';

const WebexModal = () => {
  const { webexModalOpen, setWebexModalOpen } = useSimulation();

  if (!webexModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#0b132b] rounded-3xl border border-cyan-500/50 shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Header */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base">Cisco Webex Incident Room</h3>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/40">LIVE INCIDENT</span>
              </div>
              <p className="text-xs text-slate-400">Indian Railways Crisis Command Center • Room ID: #CSMT-8842</p>
            </div>
          </div>
          <button
            onClick={() => setWebexModalOpen(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Grid & Chat */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#070b19] overflow-hidden">
          {/* Active Video Feeds (2x2 Grid) */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2 h-full">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-3">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Station Master (CSMT)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-center text-slate-600 font-mono text-xs">Video Feed Connected</div>
              <div className="text-[10px] text-cyan-400 font-semibold">Audio Active</div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-3">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>RPF Inspector Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-center text-slate-600 font-mono text-xs">Video Feed Connected</div>
              <div className="text-[10px] text-cyan-400 font-semibold">Dispatched Ground Crew</div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-3">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Medical Unit Alpha</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-center text-slate-600 font-mono text-xs">Video Feed Connected</div>
              <div className="text-[10px] text-emerald-400 font-semibold">ETA: 1 Min to FOB</div>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-cyan-500/40 relative overflow-hidden flex flex-col justify-between p-3 glow-cisco">
              <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                <span>CrowdShield AI Bot</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="text-center text-cyan-400 text-xs font-medium">Automated Dispatch Active</div>
              <div className="text-[10px] text-slate-400">Real-time Telemetry Engine</div>
            </div>
          </div>

          {/* AI Incident Transcript */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3.5 flex flex-col justify-between text-xs space-y-3">
            <div className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Webex Live AI Notes</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto text-slate-300">
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
                <span className="font-bold text-cyan-400">AI Engine:</span> Turned turnstile gates into entry lock mode. Exit B open.
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
                <span className="font-bold text-slate-200">Station Master:</span> Ground teams on FOB stairs confirm crowd moving towards Exit B.
              </div>
              <div className="bg-slate-800/60 p-2 rounded-xl border border-slate-700/60">
                <span className="font-bold text-emerald-400">Medical Alpha:</span> Stretchers ready at North Concourse.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Call Controls */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">
              <Mic className="w-5 h-5 text-cyan-400" />
            </button>
            <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">
              <Video className="w-5 h-5 text-cyan-400" />
            </button>
          </div>

          <button
            onClick={() => setWebexModalOpen(false)}
            className="py-2.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-rose-600/30"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Leave Webex Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebexModal;

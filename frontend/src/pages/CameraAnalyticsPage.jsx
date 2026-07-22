import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { fetchCameraFeeds } from '../services/api';
import { Camera, Eye, Activity, Gauge, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

const CameraAnalyticsPage = () => {
  const { scenario } = useSimulation();
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchCameraFeeds().then(data => setCameras(data));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live AI Camera Analytics Grid</h2>
            <p className="text-xs text-slate-400">6 High-Definition CCTV Feeds with Computer Vision Overlay & Pressure Index</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>6/6 CCTV Online</span>
          </span>
        </div>
      </div>

      {/* 6 Camera Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam, idx) => {
          let isCritical = scenario === 'CRITICAL';
          let isWarning = scenario === 'WARNING' && (cam.location.includes('FOB') || cam.location.includes('Stairs'));

          let currentDensity = isCritical ? 96.0 : isWarning ? 82.0 : cam.crowdDensity;
          let currentPeople = isCritical ? Math.round(cam.peopleCount * 2.2) : isWarning ? Math.round(cam.peopleCount * 1.6) : cam.peopleCount;
          let currentVelocity = isCritical ? 0.1 : isWarning ? 0.4 : cam.movementVelocity;
          let currentPressure = isCritical ? 8.9 : isWarning ? 4.8 : cam.pressureIndex;

          let aiText = isCritical
            ? 'CRITICAL CROWD CRUSH! Flow velocity locked at 0.1 m/s. Evacuation override triggered.'
            : isWarning
            ? 'Density rising rapidly. Walking velocity reduced to 0.4 m/s. Bottleneck warning.'
            : cam.aiObservation;

          return (
            <div
              key={cam.cameraId || idx}
              className={`rounded-2xl glass-panel border overflow-hidden flex flex-col justify-between transition-all ${
                isCritical
                  ? 'border-rose-500/70 glow-red'
                  : isWarning
                  ? 'border-amber-500/70 glow-yellow'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Camera Video Feed Viewport */}
              <div className="relative aspect-[16/9] bg-[#070b19] scanline p-3 flex flex-col justify-between overflow-hidden">
                {/* Simulated Bounding Box Overlay */}
                <div className={`absolute inset-4 rounded-xl border-2 border-dashed transition-colors ${
                  isCritical ? 'border-rose-500/80 bg-rose-500/10' : isWarning ? 'border-amber-500/80 bg-amber-500/10' : 'border-cyan-500/40 bg-cyan-500/5'
                }`} />

                {/* Top Feed Header */}
                <div className="relative z-10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 font-mono font-bold text-slate-200">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>{cam.cameraId}</span>
                  </div>
                  <div className="bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 font-mono text-[10px] text-cyan-400">
                    2026-07-23 03:22:10 UTC
                  </div>
                </div>

                {/* Simulated People Heatmap Dots inside feed */}
                <div className="relative z-10 flex items-center justify-center h-20">
                  <div className="text-center space-y-1">
                    <Eye className={`w-8 h-8 mx-auto ${isCritical ? 'text-rose-500 animate-bounce' : isWarning ? 'text-amber-500' : 'text-cyan-400'}`} />
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-widest">{cam.location}</div>
                  </div>
                </div>

                {/* Bottom Overlay Status */}
                <div className="relative z-10 flex items-center justify-between text-[11px]">
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    isCritical ? 'bg-rose-500 text-white' : isWarning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? 'CRITICAL (RED)' : isWarning ? 'WARNING (YELLOW)' : 'NORMAL (GREEN)'}
                  </span>
                  <span className="text-slate-400 font-mono">1080p • 60 FPS</span>
                </div>
              </div>

              {/* Camera Analytics Telemetry Panel */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-slate-100 text-sm">{cam.name}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 space-y-0.5">
                    <div className="text-slate-400 text-[10px]">People Count</div>
                    <div className="font-bold text-slate-100 text-base">{currentPeople}</div>
                  </div>

                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 space-y-0.5">
                    <div className="text-slate-400 text-[10px]">Crowd Density</div>
                    <div className={`font-bold text-base ${currentDensity > 80 ? 'text-rose-400' : currentDensity > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {currentDensity}%
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 space-y-0.5">
                    <div className="text-slate-400 text-[10px]">Movement Velocity</div>
                    <div className="font-bold text-slate-100">{currentVelocity} m/s</div>
                  </div>

                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 space-y-0.5">
                    <div className="text-slate-400 text-[10px]">Pressure Index</div>
                    <div className="font-bold text-slate-100">{currentPressure} PSI</div>
                  </div>
                </div>

                {/* AI Observation Badge */}
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{aiText}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CameraAnalyticsPage;

import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { fetchCameraFeeds } from '../services/api';
import ComputerVisionOverlay from '../components/ComputerVisionOverlay';
import { Camera, Eye, Activity, Gauge, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

const videoSources = [
  '/cctv/cctv3.mp4', // Actual Stampede video
  '/cctv/cctv2.mp4', // WhatsApp CCTV feed
  '/cctv/cctv1.mp4', // Sample station video
  '/cctv/cctv3.mp4',
  '/cctv/cctv2.mp4',
  '/cctv/cctv1.mp4'
];

const CameraAnalyticsPage = () => {
  const { scenario } = useSimulation();
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetchCameraFeeds().then(data => setCameras(data));
  }, []);

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live AI CCTV Video Surveillance Center</h2>
            <p className="text-xs text-slate-400">High-Definition Real Station Video Feeds with Sleek YOLOv11 & ByteTrack Bounding Overlays</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>6/6 CCTV HD Video Streams Active</span>
          </span>
        </div>
      </div>

      {/* 6 Live Camera Grid with Clean Single Telemetry Overlay */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((cam, idx) => {
          let isCritical = scenario === 'CRITICAL';
          let isWarning = scenario === 'WARNING' && (cam.location.includes('FOB') || cam.location.includes('Stairs'));

          let currentDensity = isCritical ? 96.0 : isWarning ? 82.0 : cam.crowdDensity;
          let currentPeople = isCritical ? Math.round(cam.peopleCount * 2.2) : isWarning ? Math.round(cam.peopleCount * 1.6) : cam.peopleCount;
          let currentVelocity = isCritical ? 0.1 : isWarning ? 0.4 : cam.movementVelocity;
          let currentPressure = isCritical ? 8.9 : isWarning ? 4.8 : cam.pressureIndex;

          let aiObservation = isCritical
            ? 'CRITICAL CROWD PRESSURE: Lock turnstiles & release Exit B immediately.'
            : isWarning
            ? 'WARNING: Pedestrian walking speed slowed to 0.4 m/s. Re-route flow to Escalator 2.'
            : cam.aiObservation || 'Normal passenger flow. Flow vector steady.';

          return (
            <div
              key={cam.cameraId || idx}
              className={`rounded-2xl glass-panel border overflow-hidden flex flex-col justify-between transition-all ${
                isCritical ? 'border-rose-500/80 glow-red' : isWarning ? 'border-amber-500/80 glow-yellow' : 'border-slate-800'
              }`}
            >
              {/* Computer Vision Video Render Viewport (Contains single, crisp HUD ribbon) */}
              <ComputerVisionOverlay
                cameraTitle={cam.name}
                peopleCount={currentPeople}
                density={currentDensity}
                psi={currentPressure}
                speed={currentVelocity}
                videoSrc={videoSources[idx % videoSources.length]}
              />

              {/* Clean Single Bottom Metadata Ribbon (No Duplicate Metrics) */}
              <div className="p-3.5 space-y-2 bg-slate-950/60 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100">{cam.location} Zone</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isCritical ? 'bg-rose-500 text-white animate-pulse' : isWarning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {isCritical ? 'CRITICAL (98%)' : isWarning ? 'WARNING (80%)' : 'SAFE (15%)'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-start space-x-1.5 bg-slate-900/90 p-2 rounded-xl border border-slate-800/80">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{aiObservation}</span>
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

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, Activity, Gauge, Zap } from 'lucide-react';

const ComputerVisionOverlay = ({
  cameraTitle = 'Camera 01 - Platform 1 Central',
  peopleCount = 420,
  density = 42.0,
  psi = 1.2,
  speed = 1.4,
  videoSrc = '/cctv/cctv1.mp4'
}) => {
  const videoRef = useRef(null);

  // Dynamic sleek YOLO bounding box coordinates
  const [boxes, setBoxes] = useState([
    { id: 'P-101', x: 22, y: 35, w: 14, h: 35, conf: 0.96, label: 'Person #101' },
    { id: 'P-102', x: 42, y: 45, w: 12, h: 32, conf: 0.94, label: 'Person #102' },
    { id: 'P-103', x: 62, y: 30, w: 15, h: 38, conf: 0.98, label: 'Person #103' },
    { id: 'P-104', x: 78, y: 50, w: 13, h: 32, conf: 0.91, label: 'Person #104' },
    { id: 'P-105', x: 48, y: 65, w: 14, h: 30, conf: 0.95, label: 'Person #105' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prev) =>
        prev.map((b) => ({
          ...b,
          x: Math.max(12, Math.min(82, b.x + (Math.random() * 2.5 - 1.25))),
          y: Math.max(18, Math.min(72, b.y + (Math.random() * 2.5 - 1.25))),
          conf: Math.min(0.99, Math.max(0.90, b.conf + (Math.random() * 0.02 - 0.01)))
        }))
      );
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] bg-[#02050e] rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col justify-between p-3 select-none font-sans group">
      {/* 100% Bright, Crisp, High-Definition HTML5 Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-slate-950/85 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-100 text-xs font-bold backdrop-blur-md shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>{cameraTitle}</span>
        </div>

        <div className="flex items-center space-x-2 text-[11px]">
          <span className="bg-cyan-950/90 text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-700/60 font-mono font-bold backdrop-blur-md">
            YOLOv11 Live
          </span>
          <span className="bg-emerald-950/90 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-700/60 font-mono font-bold backdrop-blur-md">
            ByteTrack
          </span>
        </div>
      </div>

      {/* Sleek Neon Bounding Boxes Overlaid on Video */}
      <div className="relative z-10 w-full h-full pointer-events-none my-1">
        {boxes.map((b) => (
          <div
            key={b.id}
            className="absolute border-2 border-cyan-400 bg-cyan-500/10 rounded transition-all duration-200 shadow-md shadow-cyan-500/30"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
          >
            {/* Box Header Label */}
            <div className="bg-slate-950/90 border border-cyan-400 text-cyan-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded -mt-3.5 self-start inline-block shadow">
              {b.id} {(b.conf * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Telemetry HUD Ribbon (Below video area to keep main video 100% visible) */}
      <div className="relative z-10 grid grid-cols-4 gap-2 text-[11px] bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-slate-200 backdrop-blur-md font-mono">
        <div>
          <span className="text-slate-400">Count: </span>
          <span className="font-bold text-white">{peopleCount}</span>
        </div>

        <div>
          <span className="text-slate-400">Density: </span>
          <span className={`font-bold ${density > 80 ? 'text-rose-400' : density > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {density}%
          </span>
        </div>

        <div>
          <span className="text-slate-400">Pressure: </span>
          <span className="font-bold text-cyan-300">{psi} PSI</span>
        </div>

        <div>
          <span className="text-slate-400">Speed: </span>
          <span className="font-bold text-amber-300">{speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionOverlay;

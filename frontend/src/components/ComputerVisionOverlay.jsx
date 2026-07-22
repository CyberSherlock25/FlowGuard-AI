import React, { useState, useEffect } from 'react';
import { Camera, Eye, Activity, Gauge, Zap, ChevronRight, Layers } from 'lucide-react';

const ComputerVisionOverlay = ({
  cameraTitle = 'Camera 01 - Platform 1 Central',
  peopleCount = 420,
  density = 42.0,
  psi = 1.2,
  speed = 1.4
}) => {
  // Simulated YOLO bounding box nodes updating every frame
  const [boxes, setBoxes] = useState([
    { id: 'P-101', x: 15, y: 30, w: 12, h: 28, conf: 0.96, dir: '→' },
    { id: 'P-102', x: 35, y: 45, w: 10, h: 25, conf: 0.94, dir: '→' },
    { id: 'P-103', x: 55, y: 25, w: 14, h: 30, conf: 0.98, dir: '←' },
    { id: 'P-104', x: 75, y: 50, w: 11, h: 26, conf: 0.91, dir: '→' },
    { id: 'P-105', x: 45, y: 65, w: 13, h: 29, conf: 0.95, dir: '↓' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prev) =>
        prev.map((b) => ({
          ...b,
          x: (b.x + (Math.random() * 2 - 1)) % 85,
          y: (b.y + (Math.random() * 2 - 1)) % 75,
          conf: Math.min(0.99, Math.max(0.88, b.conf + (Math.random() * 0.02 - 0.01)))
        }))
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] bg-[#050814] rounded-2xl border border-slate-800 overflow-hidden scanline shadow-2xl flex flex-col justify-between p-4 font-mono select-none">
      {/* Background Simulated Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="cvGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00bceb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cvGrid)" />
      </svg>

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="font-bold">{cameraTitle}</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-cyan-400">
          <span className="bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800">
            YOLOv11 TensorRT Active
          </span>
          <span className="bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 font-bold text-emerald-400">
            ByteTrack Online
          </span>
        </div>
      </div>

      {/* Dynamic YOLO Person Bounding Boxes Render */}
      <div className="relative w-full h-full pointer-events-none my-2">
        {boxes.map((b) => (
          <div
            key={b.id}
            className="absolute border-2 border-cyan-400/90 bg-cyan-500/10 rounded transition-all duration-300 flex flex-col justify-between p-1"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
          >
            {/* Box Header Label */}
            <div className="bg-cyan-500 text-slate-950 text-[9px] font-black px-1 rounded-xs -mt-3 self-start shadow">
              {b.id} {(b.conf * 100).toFixed(0)}% {b.dir}
            </div>

            {/* Motion Vector Arrow */}
            <div className="text-[10px] text-cyan-300 font-bold self-end animate-pulse">
              {b.dir}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Frame Telemetry HUD Bar */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-slate-200">
        <div>
          <span className="text-slate-400">Count: </span>
          <span className="font-bold text-white">{peopleCount} Persons</span>
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
          <span className="text-slate-400">Velocity: </span>
          <span className="font-bold text-amber-300">{speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default ComputerVisionOverlay;

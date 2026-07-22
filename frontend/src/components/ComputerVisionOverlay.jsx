import React, { useState, useEffect, useRef } from 'react';
import { Camera, Eye, Activity, Gauge, Zap, ChevronRight, Layers } from 'lucide-react';

const ComputerVisionOverlay = ({
  cameraTitle = 'Camera 01 - Platform 1 Central',
  peopleCount = 420,
  density = 42.0,
  psi = 1.2,
  speed = 1.4,
  videoSrc = '/cctv/cctv1.mp4'
}) => {
  const videoRef = useRef(null);

  // Simulated YOLO bounding box nodes updating every frame over video
  const [boxes, setBoxes] = useState([
    { id: 'P-101', x: 18, y: 32, w: 14, h: 32, conf: 0.96, dir: '→' },
    { id: 'P-102', x: 38, y: 48, w: 12, h: 28, conf: 0.94, dir: '→' },
    { id: 'P-103', x: 58, y: 28, w: 15, h: 34, conf: 0.98, dir: '←' },
    { id: 'P-104', x: 78, y: 52, w: 13, h: 30, conf: 0.91, dir: '→' },
    { id: 'P-105', x: 48, y: 68, w: 14, h: 32, conf: 0.95, dir: '↓' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prev) =>
        prev.map((b) => ({
          ...b,
          x: Math.max(10, Math.min(80, b.x + (Math.random() * 3 - 1.5))),
          y: Math.max(15, Math.min(75, b.y + (Math.random() * 3 - 1.5))),
          conf: Math.min(0.99, Math.max(0.88, b.conf + (Math.random() * 0.02 - 0.01)))
        }))
      );
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] bg-[#050814] rounded-2xl border border-slate-800 overflow-hidden scanline shadow-2xl flex flex-col justify-between p-4 font-mono select-none">
      {/* HTML5 Video Element playing actual CCTV Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none"
      />

      {/* Simulated CV Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0">
        <defs>
          <pattern id={`cvGrid_${cameraTitle.replace(/\s+/g, '_')}`} width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00bceb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cvGrid_${cameraTitle.replace(/\s+/g, '_')})`} />
      </svg>

      {/* Top Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-200 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="font-bold">{cameraTitle}</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-cyan-400">
          <span className="bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
            YOLOv11 TensorRT Active
          </span>
          <span className="bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 font-bold text-emerald-400 backdrop-blur-md">
            ByteTrack Live Feed
          </span>
        </div>
      </div>

      {/* Dynamic YOLO Person Bounding Boxes Overlaid on Video */}
      <div className="relative z-10 w-full h-full pointer-events-none my-2">
        {boxes.map((b) => (
          <div
            key={b.id}
            className="absolute border-2 border-cyan-400/90 bg-cyan-500/15 rounded-md transition-all duration-200 flex flex-col justify-between p-1 shadow-lg shadow-cyan-500/20"
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
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-slate-200 backdrop-blur-md">
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

import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Info, AlertTriangle, ShieldCheck, Zap, Activity, Play, Pause, FastForward, Eye, Layers } from 'lucide-react';

const DigitalTwinCanvas = ({ onSelectZone }) => {
  const { scenario, riskScore, setSelectedZone, isSimulating, startSimulationSequence, setScenario, setRiskScore } = useSimulation();

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particle paths across station layout
    const initialParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: 50 + Math.random() * 700,
      y: 80 + Math.random() * 320,
      speed: (0.8 + Math.random() * 1.5) * simSpeed,
      direction: Math.random() > 0.5 ? 1 : -1
    }));
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speed * p.direction;
          if (newX > 750 || newX < 50) p.direction *= -1;
          return { ...p, x: newX };
        })
      );
    }, 50 / simSpeed);

    return () => clearInterval(interval);
  }, [simSpeed]);

  const getZoneFill = (zoneCode) => {
    if (scenario === 'CRITICAL') {
      return 'fill-rose-500/35 stroke-rose-500 glow-red animate-pulse';
    }
    if (scenario === 'WARNING' && (zoneCode === 'FOB-NORTH' || zoneCode === 'STAIRS-01')) {
      return 'fill-amber-500/35 stroke-amber-500 glow-yellow animate-pulse';
    }
    return showHeatmap
      ? 'fill-emerald-500/25 stroke-emerald-500/60 hover:fill-cyan-500/35 hover:stroke-cyan-400'
      : 'fill-slate-900/60 stroke-slate-700 hover:fill-slate-800';
  };

  const handleZoneClick = (code, name, type, defaultCrowd, maxCap, psi, speedVal) => {
    let currentScenarioRisk = riskScore;
    let color = scenario === 'CRITICAL' ? 'RED' : scenario === 'WARNING' ? 'YELLOW' : 'GREEN';

    const zoneObj = {
      code,
      name,
      type,
      currentCrowd: scenario === 'CRITICAL' ? Math.round(maxCap * 0.95) : defaultCrowd,
      maxCapacity: maxCap,
      densityPercentage: scenario === 'CRITICAL' ? 95 : scenario === 'WARNING' ? 82 : 42,
      pressurePsi: scenario === 'CRITICAL' ? 8.9 : scenario === 'WARNING' ? 4.8 : psi,
      avgSpeedMs: scenario === 'CRITICAL' ? 0.1 : scenario === 'WARNING' ? 0.4 : speedVal,
      riskScore: currentScenarioRisk,
      statusColor: color,
      aiPrediction: scenario === 'CRITICAL'
        ? 'CRITICAL STAMPEDE RISK! Evacuation required immediately.'
        : scenario === 'WARNING'
        ? 'High bottleneck prediction in 4 minutes.'
        : 'Station operating normally with smooth flow.',
      suggestedAction: scenario === 'CRITICAL'
        ? 'Stop entry gates, open emergency exit B, activate one-way stair divider.'
        : scenario === 'WARNING'
        ? 'Deploy staff, update signboards, slow passenger entry.'
        : 'Continuous monitoring.'
    };
    setSelectedZone(zoneObj);
    if (onSelectZone) onSelectZone(zoneObj);
  };

  return (
    <div className="relative w-full rounded-2xl glass-panel p-4 border border-slate-800 overflow-hidden flex flex-col justify-between font-sans">
      {/* Header Controls & Interactive Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wide text-slate-100 uppercase">
            Interactive 3D Railway Terminal Digital Twin
          </span>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="flex items-center space-x-2 text-[11px]">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded-lg border font-semibold flex items-center space-x-1 transition ${
              showHeatmap ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Heatmap {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSimSpeed(simSpeed === 1 ? 2 : simSpeed === 2 ? 4 : 1)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center space-x-1 hover:border-slate-700"
          >
            <FastForward className="w-3 h-3 text-cyan-400" />
            <span>{simSpeed}x Speed</span>
          </button>
        </div>
      </div>

      {/* SVG Interactive Multi-Level Map */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#070c1e] rounded-xl border border-slate-800/90 p-2 overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 450" className="w-full h-full select-none">
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="twinGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            {/* Flow Vector Marker Arrow */}
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00bceb" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#twinGrid)" />

          {/* Railway Tracks */}
          <rect x="50" y="160" width="700" height="18" fill="#1e293b" rx="2" />
          <line x1="50" y1="169" x2="750" y2="169" stroke="#00bceb" strokeDasharray="6 6" opacity="0.6" />
          <rect x="50" y="350" width="700" height="18" fill="#1e293b" rx="2" />
          <line x1="50" y1="359" x2="750" y2="359" stroke="#00bceb" strokeDasharray="6 6" opacity="0.6" />

          {/* Flow Direction Vectors (Visual Navigation Lines) */}
          <path d="M 120 50 Q 200 50 250 120" stroke="#00bceb" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow)" opacity="0.5" />
          <path d="M 400 350 L 400 70" stroke="#00bceb" strokeWidth="1.5" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow)" opacity="0.5" />
          <path d="M 400 50 L 680 50" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#arrow)" opacity="0.8" />

          {/* Platform 1 */}
          <g onClick={() => handleZoneClick('PLAT-01', 'Platform 1 - Central Terminal', 'PLATFORM', 420, 1000, 1.2, 1.4)} className="cursor-pointer">
            <rect x="50" y="100" width="700" height="50" rx="6" className={`transition-all duration-500 ${getZoneFill('PLAT-01')}`} strokeWidth="1.5" />
            <text x="70" y="130" fill="#e2e8f0" fontSize="13" fontWeight="bold">PLATFORM 1 (Central Express)</text>
          </g>

          {/* Platform 2 */}
          <g onClick={() => handleZoneClick('PLAT-02', 'Platform 2 - Suburban Line', 'PLATFORM', 310, 1000, 0.9, 1.6)} className="cursor-pointer">
            <rect x="50" y="290" width="700" height="50" rx="6" className={`transition-all duration-500 ${getZoneFill('PLAT-02')}`} strokeWidth="1.5" />
            <text x="70" y="320" fill="#e2e8f0" fontSize="13" fontWeight="bold">PLATFORM 2 (Suburban Local)</text>
          </g>

          {/* Foot Overbridge (FOB North) */}
          <g onClick={() => handleZoneClick('FOB-NORTH', 'Foot Overbridge North', 'FOB', 180, 500, 1.5, 1.2)} className="cursor-pointer">
            <rect x="340" y="40" width="120" height="330" rx="8" className={`transition-all duration-500 ${getZoneFill('FOB-NORTH')}`} strokeWidth="2" />
            <text x="350" y="210" fill="#ffffff" fontSize="12" fontWeight="bold" transform="rotate(-90 350,210)">FOOT OVERBRIDGE (FOB NORTH)</text>
          </g>

          {/* Stairs A */}
          <g onClick={() => handleZoneClick('STAIRS-01', 'Concourse Stairs A', 'STAIRS', 140, 300, 2.1, 1.1)} className="cursor-pointer">
            <rect x="230" y="105" width="80" height="40" rx="4" className={`transition-all duration-500 ${getZoneFill('STAIRS-01')}`} strokeWidth="1.5" />
            <text x="240" y="130" fill="#cbd5e1" fontSize="11" fontWeight="bold">STAIRS A</text>
          </g>

          {/* Escalator North */}
          <g onClick={() => handleZoneClick('ESCALATOR-01', 'Main Escalator North', 'ESCALATOR', 95, 200, 1.8, 0.8)} className="cursor-pointer">
            <rect x="480" y="105" width="80" height="40" rx="4" className={`transition-all duration-500 ${getZoneFill('ESCALATOR-01')}`} strokeWidth="1.5" />
            <text x="490" y="130" fill="#cbd5e1" fontSize="11" fontWeight="bold">ESCALATOR 1</text>
          </g>

          {/* Ticket Concourse */}
          <g onClick={() => handleZoneClick('TICKET-HALL', 'Main Ticket Concourse', 'TICKET_COUNTER', 540, 1200, 1.1, 1.3)} className="cursor-pointer">
            <rect x="50" y="20" width="260" height="60" rx="6" className={`transition-all duration-500 ${getZoneFill('TICKET-HALL')}`} strokeWidth="1.5" />
            <text x="70" y="55" fill="#cbd5e1" fontSize="12" fontWeight="bold">TICKET CONCOURSE & COUNTERS</text>
          </g>

          {/* Entry Gate A */}
          <g onClick={() => handleZoneClick('GATE-ENTRY', 'Main Entry Gate A', 'ENTRY', 220, 600, 1.0, 1.5)} className="cursor-pointer">
            <rect x="490" y="20" width="120" height="60" rx="6" className={`transition-all duration-500 ${getZoneFill('GATE-ENTRY')}`} strokeWidth="1.5" />
            <text x="500" y="55" fill="#cbd5e1" fontSize="12" fontWeight="bold">MAIN ENTRY GATE A</text>
          </g>

          {/* Emergency Exit B */}
          <g onClick={() => handleZoneClick('GATE-EXIT', 'Emergency Exit B', 'EXIT', 80, 400, 0.5, 1.8)} className="cursor-pointer">
            <rect x="630" y="20" width="120" height="60" rx="6" className={`transition-all duration-500 ${getZoneFill('GATE-EXIT')}`} strokeWidth="1.5" />
            <text x="640" y="55" fill="#10b981" fontSize="11" fontWeight="bold">EMERGENCY EXIT B</text>
          </g>

          {/* Animated Passenger Particles */}
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={scenario === 'CRITICAL' ? 3.5 : 2.5}
              fill={scenario === 'CRITICAL' ? '#ef4444' : scenario === 'WARNING' ? '#f59e0b' : '#00e5ff'}
              opacity={0.85}
            />
          ))}
        </svg>

        {/* Hover Hint */}
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-300 flex items-center space-x-1.5 bg-slate-950/85 px-3 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any zone to open real-time telemetry drawer & gate override controls.</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinCanvas;

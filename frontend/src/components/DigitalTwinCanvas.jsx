import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Info, AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';

const DigitalTwinCanvas = ({ onSelectZone }) => {
  const { scenario, riskScore, setSelectedZone } = useSimulation();

  // Particle positions for animated passenger flow simulation
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particle paths across station layout
    const initialParticles = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: 50 + Math.random() * 700,
      y: 80 + Math.random() * 320,
      speed: 0.8 + Math.random() * 1.5,
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
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getZoneFill = (zoneCode) => {
    if (scenario === 'CRITICAL') {
      return 'fill-rose-500/30 stroke-rose-500/80 glow-red animate-pulse';
    }
    if (scenario === 'WARNING' && (zoneCode === 'FOB-NORTH' || zoneCode === 'STAIRS-01')) {
      return 'fill-amber-500/30 stroke-amber-500/80 glow-yellow animate-pulse';
    }
    return 'fill-emerald-500/20 stroke-emerald-500/50 hover:fill-cyan-500/30 hover:stroke-cyan-400';
  };

  const handleZoneClick = (code, name, type, defaultCrowd, maxCap, psi, speed) => {
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
      avgSpeedMs: scenario === 'CRITICAL' ? 0.1 : scenario === 'WARNING' ? 0.4 : speed,
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
    <div className="relative w-full rounded-2xl glass-panel p-4 border border-slate-800 overflow-hidden flex flex-col justify-between">
      {/* Header controls & legend */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wide text-slate-200 uppercase">
            3D Railway Station Digital Twin (Multi-Level Terminal)
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Normal (&lt;50%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Warning (50-80%)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Critical (&gt;80%)</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Map */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-[#0b132b]/90 rounded-xl border border-slate-800/80 p-2">
        <svg viewBox="0 0 800 450" className="w-full h-full select-none">
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Railway Tracks */}
          <rect x="50" y="160" width="700" height="18" fill="#1e293b" rx="2" />
          <line x1="50" y1="169" x2="750" y2="169" stroke="#00bceb" strokeDasharray="6 6" opacity="0.6" />
          <rect x="50" y="350" width="700" height="18" fill="#1e293b" rx="2" />
          <line x1="50" y1="359" x2="750" y2="359" stroke="#00bceb" strokeDasharray="6 6" opacity="0.6" />

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
        <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 flex items-center space-x-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any zone (Platforms, FOB, Stairs, Gates) to inspect AI analytics & manual controls.</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinCanvas;

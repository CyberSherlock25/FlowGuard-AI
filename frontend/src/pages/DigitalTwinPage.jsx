import React from 'react';
import DigitalTwinCanvas from '../components/DigitalTwinCanvas';
import ZoneDetailDrawer from '../components/ZoneDetailDrawer';
import { useSimulation } from '../context/SimulationContext';
import { Box, Layers, Filter, Eye, Activity } from 'lucide-react';

const DigitalTwinPage = () => {
  const { scenario, selectedZone } = useSimulation();

  return (
    <div className="space-y-6">
      <ZoneDetailDrawer />

      {/* Header Info */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Interactive Station Digital Twin</h2>
            <p className="text-xs text-slate-400">Multi-Level Railway Terminal Real-time Simulation Engine</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>3 Levels Loaded</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Live Flow Vectors Active</span>
          </div>
        </div>
      </div>

      {/* Main Digital Twin Canvas */}
      <DigitalTwinCanvas />

      {/* Zone Analytics Cards Grid below Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Platform 1 Capacity</div>
          <div className="text-2xl font-black text-slate-100">{scenario === 'CRITICAL' ? '950' : '420'} / 1000</div>
          <p className="text-[11px] text-slate-400">Central Express Line</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Foot Overbridge (FOB)</div>
          <div className={`text-2xl font-black ${scenario === 'CRITICAL' ? 'text-rose-400' : scenario === 'WARNING' ? 'text-amber-400' : 'text-emerald-400'}`}>
            {scenario === 'CRITICAL' ? '480 (PSI: 8.9)' : scenario === 'WARNING' ? '410 (PSI: 4.8)' : '180 (PSI: 1.5)'}
          </div>
          <p className="text-[11px] text-slate-400">North Pedestrian Bridge</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Concourse Stairs A</div>
          <div className={`text-2xl font-black ${scenario === 'CRITICAL' ? 'text-rose-400' : scenario === 'WARNING' ? 'text-amber-400' : 'text-slate-100'}`}>
            {scenario === 'CRITICAL' ? '280 (0.1 m/s)' : scenario === 'WARNING' ? '240 (0.4 m/s)' : '140 (1.1 m/s)'}
          </div>
          <p className="text-[11px] text-slate-400">Main Transfer Stairs</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold uppercase">Emergency Exit Gate B</div>
          <div className="text-2xl font-black text-emerald-400">{scenario === 'CRITICAL' ? 'OPEN (2.2 m/s)' : 'STANDBY'}</div>
          <p className="text-[11px] text-slate-400">Evacuation Clearance Corridor</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwinPage;

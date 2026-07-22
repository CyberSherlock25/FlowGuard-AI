import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import DigitalTwinCanvas from '../components/DigitalTwinCanvas';
import ZoneDetailDrawer from '../components/ZoneDetailDrawer';
import AIAssistantPanel from '../components/AIAssistantPanel';
import {
  Users,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Siren,
  CloudSun,
  Train,
  Camera,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const DashboardPage = () => {
  const { dashboardData, scenario, riskScore, setActiveTab } = useSimulation();

  const totalPassengers = dashboardData?.totalPassengers || (scenario === 'CRITICAL' ? 4250 : scenario === 'WARNING' ? 3120 : 1985);
  const avgDensity = scenario === 'CRITICAL' ? 95 : scenario === 'WARNING' ? 82 : 42;
  const livesProtected = dashboardData?.livesProtected || 1420;
  const responseTime = dashboardData?.responseTimeSec || 1.4;

  const getCardBorder = () => {
    if (scenario === 'CRITICAL') return 'border-rose-500/50 glow-red';
    if (scenario === 'WARNING') return 'border-amber-500/50 glow-yellow';
    return 'border-slate-800';
  };

  return (
    <div className="space-y-6">
      <ZoneDetailDrawer />

      {/* Top Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Card 1: Total Passengers */}
        <div className={`glass-card p-3.5 rounded-2xl border transition-all ${getCardBorder()}`}>
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Passengers</span>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1">{totalPassengers}</div>
          <div className="text-[10px] text-cyan-400 flex items-center space-x-1 mt-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>Terminal Active</span>
          </div>
        </div>

        {/* Card 2: Current Density */}
        <div className={`glass-card p-3.5 rounded-2xl border transition-all ${getCardBorder()}`}>
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Avg Density</span>
          </div>
          <div className="text-xl font-bold text-slate-100 mt-1">{avgDensity}%</div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full ${avgDensity > 80 ? 'bg-rose-500' : avgDensity > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
              style={{ width: `${avgDensity}%` }}
            />
          </div>
        </div>

        {/* Card 3: Prediction Accuracy */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>AI Accuracy</span>
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1">99.4%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Verified Model</div>
        </div>

        {/* Card 4: Lives Protected */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Lives Protected</span>
          </div>
          <div className="text-xl font-bold text-cyan-300 mt-1">{livesProtected}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Zero Casualties</div>
        </div>

        {/* Card 5: Response Time */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Response Time</span>
          </div>
          <div className="text-xl font-bold text-indigo-300 mt-1">{responseTime}s</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cisco IoT Mesh</div>
        </div>

        {/* Card 6: Emergency Teams */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Siren className="w-4 h-4 text-rose-400" />
            <span>Ground Teams</span>
          </div>
          <div className="text-sm font-bold text-slate-200 mt-1 truncate">RPF & Medical</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Ready On Standby</div>
        </div>

        {/* Card 7: Weather */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <CloudSun className="w-4 h-4 text-amber-300" />
            <span>Weather</span>
          </div>
          <div className="text-sm font-bold text-slate-100 mt-1">31°C • Humid</div>
          <div className="text-[10px] text-slate-400 mt-0.5">CSMT Terminal</div>
        </div>

        {/* Card 8: Train Delay Status */}
        <div className="glass-card p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2 text-slate-400 text-xs">
            <Train className="w-4 h-4 text-cyan-400" />
            <span>Local Train</span>
          </div>
          <div className="text-xs font-bold text-emerald-400 mt-1 truncate">CSMT Local: On Time</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Arr: 4 Mins</div>
        </div>
      </div>

      {/* Main Grid: Digital Twin (2/3 width) + AI Assistant Panel (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Center Digital Twin View */}
        <div className="lg:col-span-2 space-y-4">
          <DigitalTwinCanvas />

          {/* Quick Live Cameras Strip Preview */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Live AI CCTV Feeds Preview
                </span>
              </div>
              <button
                onClick={() => setActiveTab('cameras')}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>View All 6 Cameras</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 space-y-1 relative">
                <div className="text-[11px] font-bold text-slate-200">CAM-101 (Platform 1)</div>
                <div className="text-xs text-cyan-400">Count: 420 • 42%</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">Flow steady</div>
              </div>

              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 space-y-1 relative">
                <div className="text-[11px] font-bold text-slate-200">CAM-102 (FOB North)</div>
                <div className={`text-xs ${scenario === 'CRITICAL' ? 'text-rose-400 font-bold' : scenario === 'WARNING' ? 'text-amber-400 font-bold' : 'text-cyan-400'}`}>
                  Count: {scenario === 'CRITICAL' ? 840 : scenario === 'WARNING' ? 620 : 180} • {scenario === 'CRITICAL' ? '96%' : scenario === 'WARNING' ? '82%' : '36%'}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">
                  {scenario === 'CRITICAL' ? 'CRITICAL BOTTLENECK' : scenario === 'WARNING' ? 'Speed decreasing' : 'Normal flow'}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-2.5 space-y-1 relative">
                <div className="text-[11px] font-bold text-slate-200">CAM-104 (Exit Gate B)</div>
                <div className="text-xs text-emerald-400">Count: 80 • 20%</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">Exits clear</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Always-Visible AI Assistant Panel */}
        <div className="lg:col-span-1">
          <AIAssistantPanel fullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

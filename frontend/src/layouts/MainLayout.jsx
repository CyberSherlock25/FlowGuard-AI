import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  LayoutDashboard,
  Box,
  Camera,
  Bot,
  HeartPulse,
  Siren,
  Clock,
  Smartphone,
  BarChart3,
  Settings,
  Play,
  ShieldAlert,
  LogOut,
  ChevronRight,
  Radio,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import CriticalCountdownOverlay from '../components/CriticalCountdownOverlay';
import WebexModal from '../components/WebexModal';
import AIChatDrawer from '../components/AIChatDrawer';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'digital-twin', label: 'Digital Twin', icon: Box },
  { id: 'cameras', label: 'Camera Analytics', icon: Camera },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
  { id: 'victim-rescue', label: 'Victim Rescue', icon: HeartPulse },
  { id: 'emergency', label: 'Emergency Response', icon: Siren },
  { id: 'timeline', label: 'Incident Timeline', icon: Clock },
  { id: 'passenger', label: 'Passenger View', icon: Smartphone },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const availableRoles = [
  'Station Master',
  'Railway Police',
  'Medical Team',
  'Emergency Commander',
  'Passenger'
];

const MainLayout = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    scenario,
    riskScore,
    userRole,
    handleLogin,
    handleLogout,
    isSimulating,
    startSimulationSequence,
    manualTriggerEmergency
  } = useSimulation();

  const [aiChatOpen, setAiChatOpen] = useState(false);

  const getScenarioBadgeClass = () => {
    switch (scenario) {
      case 'SAFE':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 glow-green';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40 glow-yellow animate-pulse';
      case 'CRITICAL':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40 glow-red animate-bounce';
      case 'RECOVERY':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 glow-cisco';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans relative overflow-hidden">
      <CriticalCountdownOverlay />
      <WebexModal />
      <AIChatDrawer isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

      {/* Top Header Bar */}
      <header className="h-16 bg-[#0b132b]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                CrowdShield AI
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                Cisco Smart City
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">AI Railway Crowd Intelligence & Emergency Response Platform</p>
          </div>
        </div>

        {/* Center Simulation Controller Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={startSimulationSequence}
            disabled={isSimulating}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all transform active:scale-95 shadow-lg ${
              isSimulating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 animate-pulse'
            }`}
          >
            <Play className={`w-4 h-4 ${isSimulating ? 'animate-spin' : 'fill-current'}`} />
            <span>{isSimulating ? 'Simulation Running...' : 'Start Live Simulation'}</span>
          </button>

          <button
            onClick={manualTriggerEmergency}
            className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 text-xs font-semibold transition"
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-ping" />
            <span>Manual Emergency</span>
          </button>
        </div>

        {/* Right Status & Role Switcher */}
        <div className="flex items-center space-x-3">
          {/* Scenario Badge */}
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1.5 ${getScenarioBadgeClass()}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>{scenario} ({riskScore}% Risk)</span>
          </div>

          {/* Interactive Role Switcher Selector */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1">
            <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={userRole || 'Station Master'}
              onChange={(e) => {
                handleLogin(e.target.value);
                setActiveTab('dashboard');
              }}
              className="bg-transparent text-xs text-slate-200 font-bold focus:outline-none cursor-pointer py-0.5"
            >
              {availableRoles.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-slate-100">
                  Role: {r}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#0b132b]/80 backdrop-blur-lg border-r border-slate-800/80 flex flex-col justify-between p-3 hidden md:flex z-20 shrink-0">
          <nav className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Command Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-950'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </nav>

          {/* Ask Gemini AI Trigger Button */}
          <div className="p-3 bg-gradient-to-br from-slate-900 to-cyan-950/40 rounded-2xl border border-cyan-500/30 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Gemini AI Assistant</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">Ask Gemini AI questions about crowd telemetry or emergency guidance.</p>
            <button
              onClick={() => setAiChatOpen(true)}
              className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/20 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Gemini AI</span>
            </button>
          </div>
        </aside>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 md:pb-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

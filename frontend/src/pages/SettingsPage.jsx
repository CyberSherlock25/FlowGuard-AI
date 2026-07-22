import React, { useState } from 'react';
import { Settings, Shield, Sliders, Server, Bell, Key, Radio, Save } from 'lucide-react';

const SettingsPage = () => {
  const [warningThreshold, setWarningThreshold] = useState(75);
  const [criticalThreshold, setCriticalThreshold] = useState(90);
  const [ciscoMeshActive, setCiscoMeshActive] = useState(true);
  const [webexIntegration, setWebexIntegration] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">System Configuration & Integrations</h2>
            <p className="text-xs text-slate-400">Cisco Smart City IoT Gateways & AI Risk Threshold Tuning</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="py-2 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Settings Saved!' : 'Save Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sensor Threshold Sliders */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>AI Risk Sensitivity Thresholds</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Warning Density Limit</span>
                <span className="text-amber-400">{warningThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                value={warningThreshold}
                onChange={(e) => setWarningThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-semibold mb-1">
                <span>Critical Evacuation Trigger</span>
                <span className="text-rose-400">{criticalThreshold}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="99"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Cisco Integration Switches */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Cisco Smart City Platform Integration</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <div className="font-bold text-slate-200">Cisco Meraki Vision Mesh Telemetry</div>
                <div className="text-[10px] text-slate-400">124 active IoT cameras & edge node sync</div>
              </div>
              <input
                type="checkbox"
                checked={ciscoMeshActive}
                onChange={(e) => setCiscoMeshActive(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer">
              <div>
                <div className="font-bold text-slate-200">Auto Cisco Webex Incident Room Creation</div>
                <div className="text-[10px] text-slate-400">Spin up Webex room automatically during Scenario 3</div>
              </div>
              <input
                type="checkbox"
                checked={webexIntegration}
                onChange={(e) => setWebexIntegration(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

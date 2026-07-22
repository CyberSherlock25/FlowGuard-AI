import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bot, CheckCircle2, Clock, ShieldCheck, AlertCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

const AIAssistantPanel = ({ fullPage = false }) => {
  const { scenario, riskScore, setWebexModalOpen } = useSimulation();

  // Interactive Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Deploy RPF ground staff to FOB North staircase', checked: true },
    { id: 2, text: 'Inspect Camera 03 live scanline feed', checked: true },
    { id: 3, text: 'Prepare Station Medical Clinic emergency responders', checked: false },
    { id: 4, text: 'Authorize public announcement audio alert', checked: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const getContent = () => {
    switch (scenario) {
      case 'SAFE':
        return {
          situation: 'Station operating normally. Passenger flow across Platform 1, Platform 2, and Foot Overbridges is steady with low physical crowd pressure.',
          prediction: 'Expected arrival of CSMT Fast Local in 4 minutes may cause mild platform surge, but density will remain safely under 50%.',
          recommendedAction: 'Maintain automated continuous monitoring and display platform departure details on digital signboards.',
          actionsTaken: [
            'Automated crowd counting active across 6 CCTV cameras.',
            'Entry turnstiles operating at normal speed.',
            'Station public announcement system broadcasting standard departure updates.'
          ],
          resolutionTime: '0 Mins (Normal Operations)'
        };
      case 'WARNING':
        return {
          situation: 'Crowd density on Foot Overbridge North and Stairs A has reached 80%. Walking speed is slowing down to 0.4 meters per second.',
          prediction: 'High risk of a severe bottleneck on Stairs A within the next 3 to 4 minutes if incoming platform entry is not regulated.',
          recommendedAction: 'Update digital signboards, direct passengers to Escalator 1, notify Station Master, and open Emergency Exit B.',
          actionsTaken: [
            'Digital signboards updated to show alternate FOB route.',
            'Station Master notified via automated radio link.',
            'Emergency Exit B gates unlocked remotely.'
          ],
          resolutionTime: '3.5 Minutes (With Operator Action)'
        };
      case 'CRITICAL':
        return {
          situation: 'CRITICAL CROWD PRESSURE DETECTED on Foot Overbridge and Concourse Stairs A. Physical pressure index has exceeded safe limits (8.9 PSI).',
          prediction: 'Immediate risk of crowd crush or stampede if movement remains blocked for more than 30 seconds.',
          recommendedAction: 'Immediately stop entry turnstiles, open all emergency exit gates, dispatch Railway Police & Medical Team Alpha, and activate cooling mist spray.',
          actionsTaken: [
            'Main entry turnstiles automatically locked inbound.',
            'All emergency exit gates released wide open.',
            'Railway Police Force (RPF) and Medical Unit 1 dispatched to zone.',
            'Cisco Webex Emergency Incident Room initiated.'
          ],
          resolutionTime: '1.2 Minutes (Emergency Protocols Active)'
        };
      case 'RECOVERY':
        return {
          situation: 'Crowd congestion successfully cleared. Pedestrian movement across Foot Overbridges and Platforms has returned to normal speeds (1.5 m/s).',
          prediction: 'Station risk score stabilized at 22%. Platform 1 clear for incoming trains.',
          recommendedAction: 'Reopen main entry turnstiles gradually and return emergency responders to standard standby positions.',
          actionsTaken: [
            'All 12 high-risk passengers safely guided away from bottleneck.',
            'Emergency exits returned to standard monitoring mode.',
            'Final Incident Report submitted to Central Operations.'
          ],
          resolutionTime: 'Fully Recovered'
        };
      default:
        return {};
    }
  };

  const info = getContent();

  return (
    <div className={`rounded-2xl glass-panel border border-slate-800 p-5 space-y-5 flex flex-col ${fullPage ? 'h-full' : ''}`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">AI Crowd Decision Assistant</h3>
            <p className="text-[11px] text-slate-400">Plain Natural Language Incident Advisor</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
          <Clock className="w-3 h-3" />
          <span>Res: {info.resolutionTime}</span>
        </div>
      </div>

      {/* Current Situation */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Situation</div>
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
          {info.situation}
        </div>
      </div>

      {/* AI Prediction */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>AI Forecast</span>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
          {info.prediction}
        </div>
      </div>

      {/* Recommended Action */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Recommended Action</span>
        </div>
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-xs text-cyan-200 leading-relaxed font-medium">
          {info.recommendedAction}
        </div>
      </div>

      {/* Actions Already Taken */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Actions System Has Automated</span>
        </div>
        <ul className="space-y-1.5 text-xs text-slate-300">
          {info.actionsTaken?.map((action, idx) => (
            <li key={idx} className="flex items-start space-x-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Operator Checklist */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider">Operator Action Checklist</span>
          <span className="text-[11px] text-cyan-400">
            {checklist.filter(c => c.checked).length} of {checklist.length} Completed
          </span>
        </div>
        <div className="space-y-1.5">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex items-center space-x-2.5 p-2 rounded-xl border text-xs cursor-pointer transition ${
                item.checked
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300 line-through opacity-80'
                  : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
                className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>{item.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Webex Quick Trigger Button if CRITICAL */}
      {scenario === 'CRITICAL' && (
        <button
          onClick={() => setWebexModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 animate-bounce"
        >
          <Bot className="w-4 h-4" />
          <span>Launch Cisco Webex Incident Room</span>
        </button>
      )}
    </div>
  );
};

export default AIAssistantPanel;

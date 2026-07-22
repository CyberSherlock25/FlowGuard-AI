import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bot, CheckCircle2, Clock, ShieldCheck, AlertCircle, ArrowRight, Zap, Sparkles } from 'lucide-react';

const AIAssistantPanel = ({ fullPage = false }) => {
  const { scenario, riskScore, setWebexModalOpen, geminiAnalysis } = useSimulation();

  // Interactive Checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Deploy RPF ground staff to FOB North staircase', checked: true },
    { id: 2, text: 'Inspect Camera 02 live CCTV video feed', checked: true },
    { id: 3, text: 'Prepare Station Medical Clinic emergency responders', checked: false },
    { id: 4, text: 'Authorize public announcement audio alert', checked: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const getContent = () => {
    // If Google Gemini backend response is present, use it!
    if (geminiAnalysis && geminiAnalysis.situationSummary) {
      return {
        situation: geminiAnalysis.situationSummary,
        prediction: geminiAnalysis.riskExplanation || 'Elevated crowd density forecast on FOB North.',
        recommendedAction: geminiAnalysis.operatorRecommendation || 'Redirect passengers via Escalator 2.',
        actionsTaken: [
          geminiAnalysis.policeInstructions || 'RPF patrol active on FOB North.',
          geminiAnalysis.passengerAnnouncement || 'Digital signboards updated.',
          geminiAnalysis.medicalInstructions || 'Medical Unit 1 on standby.'
        ],
        resolutionTime: scenario === 'CRITICAL' ? '1.2 Minutes' : scenario === 'WARNING' ? '3.5 Minutes' : '0 Mins'
      };
    }

    // Static fallback if backend loading
    return {
      situation: scenario === 'CRITICAL' ? 'CRITICAL STAMPEDE HAZARD: Physical pressure (8.9 PSI) on FOB North.' : scenario === 'WARNING' ? 'CONGESTION WARNING: Density at 80% on FOB North stairs.' : 'Station operating normally with smooth crowd flow.',
      prediction: scenario === 'CRITICAL' ? 'Immediate risk of crowd crush within 30 seconds.' : scenario === 'WARNING' ? 'High bottleneck risk in 4 minutes.' : 'Normal flow forecast for next 15 minutes.',
      recommendedAction: scenario === 'CRITICAL' ? 'Stop turnstiles, open Exit B, dispatch RPF & Medical.' : scenario === 'WARNING' ? 'Update digital signboards to redirect flow to Escalator 2.' : 'Continue video surveillance.',
      actionsTaken: [
        'Automated crowd counting active across 6 CCTV video feeds.',
        'Gemini AI API connected to Spring Boot backend.',
        'Cisco Smart Mesh telemetry synced.'
      ],
      resolutionTime: scenario === 'CRITICAL' ? '1.2 Minutes' : scenario === 'WARNING' ? '3.5 Minutes' : '0 Mins'
    };
  };

  const info = getContent();

  return (
    <div className={`rounded-2xl glass-panel border border-slate-800 p-5 space-y-5 flex flex-col font-sans ${fullPage ? 'h-full' : ''}`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1 text-slate-100 font-bold text-sm">
              <span>Google Gemini AI Decision Engine</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-[11px] text-slate-400">Spring Boot REST Connected Telemetry</p>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
          <Clock className="w-3 h-3" />
          <span>Res: {info.resolutionTime}</span>
        </div>
      </div>

      {/* Situation Summary */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Gemini Situation Summary</div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
          {info.situation}
        </div>
      </div>

      {/* AI Risk Explanation */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>AI Risk Prediction</span>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
          {info.prediction}
        </div>
      </div>

      {/* Recommended Action */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Gemini Recommended Action</span>
        </div>
        <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 text-xs text-cyan-200 leading-relaxed font-bold">
          {info.recommendedAction}
        </div>
      </div>

      {/* Actions Already Taken */}
      <div className="space-y-1.5">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Automated System Operations</span>
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
    </div>
  );
};

export default AIAssistantPanel;

import React from 'react';
import AIAssistantPanel from '../components/AIAssistantPanel';
import { Bot, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';

const AIAssistantPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">AI Crowd Decision Assistant</h2>
            <p className="text-xs text-slate-400">Natural Language Enterprise Crowd Intelligence & Emergency Guidance</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>No Technical Jargon • Plain Actionable Language</span>
        </div>
      </div>

      {/* Dedicated Assistant Panel */}
      <div className="max-w-4xl mx-auto">
        <AIAssistantPanel fullPage={true} />
      </div>
    </div>
  );
};

export default AIAssistantPage;

import React from 'react';
import { Video, Cpu, Layers, Eye, Activity, TrendingUp, Sparkles, Zap, ChevronRight, ShieldCheck } from 'lucide-react';

const pipelineStages = [
  { id: 1, name: 'Video Feed', tech: 'CCTV 1080p60 Stream', icon: Video, color: 'text-slate-200 bg-slate-800' },
  { id: 2, name: 'YOLOv11 Detection', tech: 'TensorRT Person Model', icon: Cpu, color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800' },
  { id: 3, name: 'ByteTrack / DeepSORT', tech: 'Multi-Object Tracking', icon: Layers, color: 'text-blue-400 bg-blue-950/60 border-blue-800' },
  { id: 4, name: 'Crowd Counting', tech: 'Density Map Extractor', icon: Eye, color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800' },
  { id: 5, name: 'Optical Flow', tech: 'Motion Vectors (Lucas-Kanade)', icon: Activity, color: 'text-purple-400 bg-purple-950/60 border-purple-800' },
  { id: 6, name: 'Density & Pressure', tech: 'PSI Threshold Model', icon: TrendingUp, color: 'text-amber-400 bg-amber-950/60 border-amber-800' },
  { id: 7, name: 'Risk Prediction', tech: 'Neural Bottleneck Engine', icon: Zap, color: 'text-rose-400 bg-rose-950/60 border-rose-800' },
  { id: 8, name: 'Google Gemini AI', tech: 'Structured Reasoning JSON', icon: Sparkles, color: 'text-cyan-300 bg-cyan-900/60 border-cyan-700' },
  { id: 9, name: 'Recommendation Engine', tech: 'Role Action Dispatcher', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' },
];

const CVPipelineInspector = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-sm">Computer Vision & AI Inference Pipeline Architecture</h3>
        </div>
        <span className="text-xs font-mono text-cyan-400">9-Stage Latency: 4.2ms</span>
      </div>

      {/* Pipeline Stage Cards Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {pipelineStages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 text-xs transition hover:scale-102 ${stage.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono opacity-80">0{stage.id}</span>
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <div className="font-bold text-[11px] leading-tight">{stage.name}</div>
                <div className="text-[9px] opacity-70 mt-0.5 line-clamp-1">{stage.tech}</div>
              </div>

              {idx < pipelineStages.length - 1 && (
                <div className="text-center text-[10px] opacity-40 hidden lg:block">→</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CVPipelineInspector;

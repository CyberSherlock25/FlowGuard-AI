import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

const densityHourlyData = [
  { hour: '06:00 AM', density: 25, accuracy: 98.8, responseTime: 1.8 },
  { hour: '07:00 AM', density: 45, accuracy: 99.1, responseTime: 1.6 },
  { hour: '08:00 AM', density: 82, accuracy: 99.5, responseTime: 1.4 },
  { hour: '09:00 AM', density: 94, accuracy: 99.6, responseTime: 1.2 },
  { hour: '10:00 AM', density: 65, accuracy: 99.4, responseTime: 1.3 },
  { hour: '11:00 AM', density: 38, accuracy: 99.2, responseTime: 1.5 },
  { hour: '12:00 PM', density: 30, accuracy: 99.0, responseTime: 1.7 },
  { hour: '05:00 PM', density: 88, accuracy: 99.5, responseTime: 1.3 },
  { hour: '06:00 PM', density: 96, accuracy: 99.7, responseTime: 1.1 },
  { hour: '07:00 PM', density: 72, accuracy: 99.3, responseTime: 1.4 },
];

const incidentsMonthlyData = [
  { month: 'Jan', prevented: 32, lives: 890 },
  { month: 'Feb', prevented: 28, lives: 760 },
  { month: 'Mar', prevented: 41, lives: 1120 },
  { month: 'Apr', prevented: 38, lives: 980 },
  { month: 'May', prevented: 45, lives: 1310 },
  { month: 'Jun', prevented: 52, lives: 1420 },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">AI Platform Analytics & Safety Reports</h2>
            <p className="text-xs text-slate-400">Cisco Smart City & Indian Railways Performance Telemetry</p>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold">Prediction Accuracy</div>
          <div className="text-2xl font-black text-emerald-400">99.4%</div>
          <p className="text-[11px] text-slate-400">AI Neural Model Confidence</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold">Incidents Prevented</div>
          <div className="text-2xl font-black text-cyan-300">48</div>
          <p className="text-[11px] text-slate-400">This Month</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold">Lives Protected</div>
          <div className="text-2xl font-black text-slate-100">1,420</div>
          <p className="text-[11px] text-slate-400">Zero Casualties Sustained</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400 font-semibold">Average Response Time</div>
          <div className="text-2xl font-black text-indigo-400">1.4s</div>
          <p className="text-[11px] text-slate-400">Cisco IoT Mesh Telemetry</p>
        </div>
      </div>

      {/* Chart 1: Hourly Crowd Density vs Peak Hours */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">Station Peak Hours & Crowd Density Profile</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={densityHourlyData}>
              <defs>
                <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00bceb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00bceb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#0b132b', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="density" stroke="#00bceb" strokeWidth={2} fillOpacity={1} fill="url(#colorDensity)" name="Crowd Density %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2 & 3: Incidents Prevented & Response Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm">Monthly Incidents Prevented & Lives Protected</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentsMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0b132b', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="prevented" fill="#10b981" radius={[6, 6, 0, 0]} name="Incidents Prevented" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm">AI Prediction Accuracy & Latency (Seconds)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityHourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 3]} />
                <Tooltip contentStyle={{ backgroundColor: '#0b132b', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="responseTime" stroke="#a855f7" strokeWidth={2.5} name="Response Time (s)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

import React, { useState, useEffect } from 'react';
import { fetchVictims } from '../services/api';
import { useSimulation } from '../context/SimulationContext';
import { HeartPulse, ShieldCheck, AlertCircle, Clock, MapPin, Navigation, User, Activity, Search, Download } from 'lucide-react';

const VictimRescuePage = () => {
  const { scenario } = useSimulation();
  const [victims, setVictims] = useState([]);
  const [filterPriority, setFilterPriority] = useState('ALL'); // ALL, CRITICAL, MINOR, SAFE
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVictims().then(data => setVictims(data));
  }, []);

  const safeCount = scenario === 'RECOVERY' ? 12 : 8;
  const minorCount = scenario === 'CRITICAL' ? 5 : scenario === 'WARNING' ? 3 : 1;
  const criticalCount = scenario === 'CRITICAL' ? 2 : 0;

  const filteredVictims = victims.filter((v) => {
    const matchesPriority = filterPriority === 'ALL' || v.priority === filterPriority;
    const matchesSearch = v.victimCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.estimatedAge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const exportMedicalCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,VictimCode,Age,Location,Status,MedicalTeam,ETA,Priority\n";
    victims.forEach((v) => {
      csvContent += `${v.victimCode},"${v.estimatedAge}","${v.location}",${v.movementStatus},"${v.nearestMedicalTeam}",${v.eta},${v.priority}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Victim_Triage_List_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Victim Rescue Command Center</h2>
            <p className="text-xs text-slate-400">AI Computer Vision Triage & Automated Medical Priority Dispatch</p>
          </div>
        </div>

        <button
          onClick={exportMedicalCsv}
          className="py-2 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-cyan-300 font-bold text-xs flex items-center space-x-2 transition"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Triage CSV</span>
        </button>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Safe / Rescued */}
        <div
          onClick={() => setFilterPriority(filterPriority === 'SAFE' ? 'ALL' : 'SAFE')}
          className={`glass-card p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
            filterPriority === 'SAFE' ? 'border-emerald-500 bg-emerald-950/30 glow-green' : 'border-emerald-500/40'
          }`}
        >
          <div>
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Safe & Evacuated</div>
            <div className="text-3xl font-black text-slate-100 mt-1">{safeCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">Guided to Clear Concourse</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>

        {/* Minor Injury */}
        <div
          onClick={() => setFilterPriority(filterPriority === 'MINOR' ? 'ALL' : 'MINOR')}
          className={`glass-card p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
            filterPriority === 'MINOR' ? 'border-amber-500 bg-amber-950/30 glow-yellow' : 'border-amber-500/40'
          }`}
        >
          <div>
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Minor Triage Priority</div>
            <div className="text-3xl font-black text-slate-100 mt-1">{minorCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">First Aid Team Attending</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertCircle className="w-7 h-7" />
          </div>
        </div>

        {/* Critical Priority */}
        <div
          onClick={() => setFilterPriority(filterPriority === 'CRITICAL' ? 'ALL' : 'CRITICAL')}
          className={`glass-card p-5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
            filterPriority === 'CRITICAL' ? 'border-rose-500 bg-rose-950/30 glow-red' : 'border-rose-500/60'
          }`}
        >
          <div>
            <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">Critical Immediate Rescue</div>
            <div className="text-3xl font-black text-rose-400 mt-1">{criticalCount}</div>
            <p className="text-[11px] text-slate-400 mt-1">Medical Unit Alpha Dispatched</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-500 animate-bounce">
            <HeartPulse className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search victim code or location..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['ALL', 'CRITICAL', 'MINOR', 'SAFE'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-xl border font-bold text-[11px] transition ${
                filterPriority === p ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60' : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Victim Table / Cards List */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm">AI Suggested Rescue Order & Medical Route</h3>
          <span className="text-xs text-cyan-400">Showing {filteredVictims.length} Patients</span>
        </div>

        <div className="space-y-3">
          {filteredVictims.map((v, idx) => (
            <div
              key={v.id || idx}
              className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition ${
                v.priority === 'CRITICAL'
                  ? 'bg-rose-950/20 border-rose-800/60 glow-red'
                  : v.priority === 'MINOR'
                  ? 'bg-amber-950/20 border-amber-800/60'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  v.priority === 'CRITICAL' ? 'bg-rose-500 text-white animate-pulse' : v.priority === 'MINOR' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}>
                  #{v.suggestedRescueOrder}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100 text-sm">{v.victimCode}</span>
                    <span className="text-xs text-slate-400">({v.estimatedAge})</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{v.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      <span>Status: {v.movementStatus}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-xs w-full md:w-auto justify-between md:justify-end border-t md:border-0 border-slate-800 pt-2 md:pt-0">
                <div>
                  <div className="text-slate-400 text-[10px]">Nearest Medical Unit</div>
                  <div className="font-semibold text-slate-200">{v.nearestMedicalTeam}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[10px]">Estimated Medical ETA</div>
                  <div className="font-bold text-cyan-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{v.eta}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Medical Team dispatched to ${v.victimCode} at ${v.location}`)}
                  className="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 flex items-center space-x-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Dispatch Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VictimRescuePage;

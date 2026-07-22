import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchDashboardData, startLiveSimulation as apiStartSimulation, triggerEmergency as apiTriggerEmergency } from '../services/api';

const SimulationContext = createContext(null);

export const SimulationProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('crowdshield_role') || 'Station Master');
  const [token, setToken] = useState(localStorage.getItem('crowdshield_token') || null);
  const [scenario, setScenario] = useState('SAFE'); // SAFE, WARNING, CRITICAL, RECOVERY
  const [riskScore, setRiskScore] = useState(15);
  const [isSimulating, setIsSimulating] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [selectedZone, setSelectedZone] = useState(null);
  const [webexModalOpen, setWebexModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [geminiAnalysis, setGeminiAnalysis] = useState(null);

  // Dynamic Audit Timeline Logs
  const [timelineLogs, setTimelineLogs] = useState([
    { id: 1, time: '04:30:10 UTC', event: 'Station Flow Baseline Initialized', cat: 'SYSTEM', severity: 'INFO', desc: 'Crowd density optimal at 15%. All 6 CCTV video feeds online.', actor: 'CrowdShield Core' },
    { id: 2, time: '04:30:25 UTC', event: 'Google Gemini AI Telemetry Connected', cat: 'GEMINI_AI', severity: 'INFO', desc: 'Spring Boot backend Gemini decision engine actively generating predictions.', actor: 'Gemini AI' }
  ]);

  // Load live data & Gemini AI analysis
  const loadData = useCallback(async () => {
    const data = await fetchDashboardData();
    setDashboardData(data);
    try {
      const gRes = await axios.get('/api/ai/analyze');
      setGeminiAnalysis(gRes.data);
    } catch (err) {
      setGeminiAnalysis({
        situationSummary: 'Station operating normally. Flow steady.',
        operatorRecommendation: 'Continue standard video surveillance.'
      });
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTimelineLog = (event, cat, severity, desc, actor) => {
    const time = new Date().toISOString().substring(11, 19) + ' UTC';
    setTimelineLogs(prev => [
      { id: Date.now(), time, event, cat, severity, desc, actor },
      ...prev
    ]);
  };

  // Automated 4-Stage Simulation Sequence
  const startSimulationSequence = async () => {
    setIsSimulating(true);

    // Stage 1: SAFE (Immediately)
    setScenario('SAFE');
    setRiskScore(15);
    addTimelineLog('Simulation Started', 'SIMULATION', 'INFO', 'User initiated live 4-stage crowd simulation sequence.', userRole || 'Operator');
    apiStartSimulation();

    // Stage 2: WARNING (after 4.5 seconds)
    setTimeout(() => {
      setScenario('WARNING');
      setRiskScore(80);
      addTimelineLog('Congestion Warning Triggered', 'AI_PREDICTION', 'WARNING', 'YOLO vision model & Gemini AI identified 80% density surge on FOB North.', 'Gemini AI');
    }, 4500);

    // Stage 3: CRITICAL (after 10 seconds)
    setTimeout(() => {
      setScenario('CRITICAL');
      setRiskScore(98);
      setCountdown(30);
      addTimelineLog('CRITICAL EMERGENCY ACTIVATED', 'EMERGENCY_DISPATCH', 'CRITICAL', 'Turnstiles auto-locked. Exit B opened. Police & Medical dispatched.', 'System Auto-Dispatcher');
    }, 10000);

    // Stage 4: RECOVERY MODE (after 25 seconds)
    setTimeout(() => {
      setScenario('RECOVERY');
      setRiskScore(22);
      setIsSimulating(false);
      addTimelineLog('Incident Resolved & Recovered', 'RECOVERY', 'SUCCESS', 'Station crowd density returned to safe 22% baseline. 0 casualties sustained.', 'CrowdShield Core');
      loadData();
    }, 25000);
  };

  // Countdown effect during CRITICAL
  useEffect(() => {
    let interval = null;
    if (scenario === 'CRITICAL' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [scenario, countdown]);

  const handleLogin = (role) => {
    setUserRole(role);
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock_${role.toLowerCase().replace(/\s+/g, '_')}_token`;
    setToken(mockJwt);
    localStorage.setItem('crowdshield_role', role);
    localStorage.setItem('crowdshield_token', mockJwt);
  };

  const handleLogout = () => {
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('crowdshield_role');
    localStorage.removeItem('crowdshield_token');
  };

  const manualTriggerEmergency = async () => {
    setScenario('CRITICAL');
    setRiskScore(98);
    setCountdown(30);
    addTimelineLog('Manual Emergency Broadcasted', 'MANUAL_OVERRIDE', 'CRITICAL', `${userRole} manually broadcasted critical emergency to all role dashboards.`, userRole || 'Operator');
    await apiTriggerEmergency();
  };

  return (
    <SimulationContext.Provider
      value={{
        userRole,
        token,
        handleLogin,
        handleLogout,
        scenario,
        setScenario,
        riskScore,
        setRiskScore,
        isSimulating,
        startSimulationSequence,
        countdown,
        selectedZone,
        setSelectedZone,
        webexModalOpen,
        setWebexModalOpen,
        activeTab,
        setActiveTab,
        dashboardData,
        geminiAnalysis,
        loadData,
        manualTriggerEmergency,
        timelineLogs,
        addTimelineLog
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

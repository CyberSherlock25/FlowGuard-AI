import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, digital-twin, cameras, ai-assistant, victim-rescue, emergency, timeline, passenger, reports, settings
  const [dashboardData, setDashboardData] = useState(null);

  // Audio alert effect simulation flag
  const [audioAlertTriggered, setAudioAlertTriggered] = useState(false);

  // Load initial data
  const loadData = useCallback(async () => {
    const data = await fetchDashboardData();
    setDashboardData(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Simulation State Machine Runner
  const startSimulationSequence = async () => {
    setIsSimulating(true);
    setAudioAlertTriggered(false);

    // Stage 1: SAFE (Immediately)
    setScenario('SAFE');
    setRiskScore(15);
    apiStartSimulation();

    // Stage 2: WARNING (after 4.5 seconds)
    setTimeout(() => {
      setScenario('WARNING');
      setRiskScore(80);
    }, 4500);

    // Stage 3: CRITICAL (after 10 seconds)
    setTimeout(() => {
      setScenario('CRITICAL');
      setRiskScore(98);
      setAudioAlertTriggered(true);
      setCountdown(30);
    }, 10000);

    // Stage 4: RECOVERY MODE (after 25 seconds)
    setTimeout(() => {
      setScenario('RECOVERY');
      setRiskScore(22);
      setIsSimulating(false);
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
    setAudioAlertTriggered(true);
    setCountdown(30);
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
        loadData,
        manualTriggerEmergency,
        audioAlertTriggered
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

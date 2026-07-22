import React from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import CameraAnalyticsPage from './pages/CameraAnalyticsPage';
import AIAssistantPage from './pages/AIAssistantPage';
import VictimRescuePage from './pages/VictimRescuePage';
import EmergencyResponsePage from './pages/EmergencyResponsePage';
import IncidentTimelinePage from './pages/IncidentTimelinePage';
import PassengerViewPage from './pages/PassengerViewPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const AppContent = () => {
  const { token, activeTab } = useSimulation();

  if (!token) {
    return <LoginPage />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'digital-twin':
        return <DigitalTwinPage />;
      case 'cameras':
        return <CameraAnalyticsPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'victim-rescue':
        return <VictimRescuePage />;
      case 'emergency':
        return <EmergencyResponsePage />;
      case 'timeline':
        return <IncidentTimelinePage />;
      case 'passenger':
        return <PassengerViewPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return <MainLayout>{renderTabContent()}</MainLayout>;
};

function App() {
  return (
    <SimulationProvider>
      <AppContent />
    </SimulationProvider>
  );
}

export default App;

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

// Role Workspaces
import StationMasterWorkspace from './pages/roles/StationMasterWorkspace';
import PoliceWorkspace from './pages/roles/PoliceWorkspace';
import MedicalWorkspace from './pages/roles/MedicalWorkspace';
import CommanderWorkspace from './pages/roles/CommanderWorkspace';
import PassengerWorkspace from './pages/roles/PassengerWorkspace';

const AppContent = () => {
  const { token, userRole, activeTab } = useSimulation();

  if (!token) {
    return <LoginPage />;
  }

  const renderRoleDashboard = () => {
    switch (userRole) {
      case 'Station Master':
        return <StationMasterWorkspace />;
      case 'Railway Police':
        return <PoliceWorkspace />;
      case 'Medical Team':
        return <MedicalWorkspace />;
      case 'Emergency Commander':
        return <CommanderWorkspace />;
      case 'Passenger':
        return <PassengerWorkspace />;
      default:
        return <DashboardPage />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderRoleDashboard();
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
        return renderRoleDashboard();
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

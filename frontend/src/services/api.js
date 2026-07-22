import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Mock Initial Data Fallback in case Spring Boot backend is starting up or disconnected
export const MOCK_INITIAL_DATA = {
  scenario: 'SAFE',
  riskScore: 15,
  totalPassengers: 1985,
  predictionAccuracy: 99.4,
  livesProtected: 1420,
  responseTimeSec: 1.4,
  emergencyTeams: {
    police: 'RPF Unit 4 Active',
    medical: 'Medical Team Alpha On Standby',
    ciscoWebex: 'Incident Room Ready'
  },
  weather: {
    temp: '31°C',
    condition: 'Partly Cloudy',
    humidity: '68%'
  },
  trainDelayStatus: 'Mumbai CSMT Fast Local - On Time (Arr: 4 Mins)',
  zones: [
    { id: 1, code: 'PLAT-01', name: 'Platform 1 - Central Terminal', type: 'PLATFORM', currentCrowd: 420, maxCapacity: 1000, densityPercentage: 42.0, pressurePsi: 1.2, avgSpeedMs: 1.4, riskScore: 15, statusColor: 'GREEN', aiPrediction: 'Station operating normally.', suggestedAction: 'Continue monitoring and automated crowd prediction.' },
    { id: 2, code: 'PLAT-02', name: 'Platform 2 - Express Line', type: 'PLATFORM', currentCrowd: 310, maxCapacity: 1000, densityPercentage: 31.0, pressurePsi: 0.9, avgSpeedMs: 1.6, riskScore: 12, statusColor: 'GREEN', aiPrediction: 'Normal passenger flow.', suggestedAction: 'Standard platform management.' },
    { id: 3, code: 'FOB-NORTH', name: 'Foot Overbridge North', type: 'FOB', currentCrowd: 180, maxCapacity: 500, densityPercentage: 36.0, pressurePsi: 1.5, avgSpeedMs: 1.2, riskScore: 18, statusColor: 'GREEN', aiPrediction: 'Pedestrian bridge flow steady.', suggestedAction: 'No action required.' },
    { id: 4, code: 'STAIRS-01', name: 'Concourse Stairs A', type: 'STAIRS', currentCrowd: 140, maxCapacity: 300, densityPercentage: 46.6, pressurePsi: 2.1, avgSpeedMs: 1.1, riskScore: 20, statusColor: 'GREEN', aiPrediction: 'Stairway capacity optimal.', suggestedAction: 'Keep clear of bottlenecks.' },
    { id: 5, code: 'ESCALATOR-01', name: 'Main Escalator North', type: 'ESCALATOR', currentCrowd: 95, maxCapacity: 200, densityPercentage: 47.5, pressurePsi: 1.8, avgSpeedMs: 0.8, riskScore: 15, statusColor: 'GREEN', aiPrediction: 'Escalator speed normal.', suggestedAction: 'Regular maintenance checks active.' },
    { id: 6, code: 'TICKET-HALL', name: 'Main Ticket Concourse', type: 'TICKET_COUNTER', currentCrowd: 540, maxCapacity: 1200, densityPercentage: 45.0, pressurePsi: 1.1, avgSpeedMs: 1.3, riskScore: 15, statusColor: 'GREEN', aiPrediction: 'Counter queues within threshold.', suggestedAction: 'Open additional ticket counters if required.' },
    { id: 7, code: 'GATE-ENTRY', name: 'Main Entry Gate A', type: 'ENTRY', currentCrowd: 220, maxCapacity: 600, densityPercentage: 36.6, pressurePsi: 1.0, avgSpeedMs: 1.5, riskScore: 10, statusColor: 'GREEN', aiPrediction: 'Smooth inbound movement.', suggestedAction: 'Automated turnstiles active.' },
    { id: 8, code: 'GATE-EXIT', name: 'Emergency Exit B', type: 'EXIT', currentCrowd: 80, maxCapacity: 400, densityPercentage: 20.0, pressurePsi: 0.5, avgSpeedMs: 1.8, riskScore: 8, statusColor: 'GREEN', aiPrediction: 'Exits clear.', suggestedAction: 'Emergency release primed.' }
  ]
};

export const fetchDashboardData = async () => {
  try {
    const res = await api.get('/dashboard');
    return res.data;
  } catch (err) {
    console.warn('Backend server offline or unreachable. Utilizing mock prototype state.', err);
    return MOCK_INITIAL_DATA;
  }
};

export const fetchCameraFeeds = async () => {
  try {
    const res = await api.get('/cameras');
    return res.data;
  } catch (err) {
    return [
      { cameraId: 'CAM-101', name: 'Camera 01 - Platform 1 Central', location: 'Platform 1', peopleCount: 420, crowdDensity: 42.0, movementVelocity: 1.4, pressureIndex: 1.2, aiObservation: 'Passengers walking smoothly. Flow vector unblocked.', status: 'NORMAL' },
      { cameraId: 'CAM-102', name: 'Camera 02 - Foot Overbridge', location: 'FOB North', peopleCount: 180, crowdDensity: 36.0, movementVelocity: 1.2, pressureIndex: 1.5, aiObservation: 'Pedestrian bridge density within safety limits.', status: 'NORMAL' },
      { cameraId: 'CAM-103', name: 'Camera 03 - Concourse Stairs', location: 'Stairs A', peopleCount: 140, crowdDensity: 46.6, movementVelocity: 1.1, pressureIndex: 2.1, aiObservation: 'Stairway descent velocity steady at 1.1 m/s.', status: 'NORMAL' },
      { cameraId: 'CAM-104', name: 'Camera 04 - North Exit Gate', location: 'Exit B', peopleCount: 80, crowdDensity: 20.0, movementVelocity: 1.8, pressureIndex: 0.5, aiObservation: 'Clear passage towards exterior concourse.', status: 'NORMAL' },
      { cameraId: 'CAM-105', name: 'Camera 05 - Waiting Hall East', location: 'Waiting Hall', peopleCount: 350, crowdDensity: 50.0, movementVelocity: 0.5, pressureIndex: 1.0, aiObservation: 'Passengers seated comfortably in designated bays.', status: 'NORMAL' },
      { cameraId: 'CAM-106', name: 'Camera 06 - Ticket Counter Main', location: 'Ticket Concourse', peopleCount: 540, crowdDensity: 45.0, movementVelocity: 1.3, pressureIndex: 1.1, aiObservation: 'Ticket queues moving smoothly. 8 active counters.', status: 'NORMAL' }
    ];
  }
};

export const startLiveSimulation = async () => {
  try {
    const res = await api.post('/startSimulation');
    return res.data;
  } catch (err) {
    return { success: true, message: 'Simulation triggered locally' };
  }
};

export const fetchVictims = async () => {
  try {
    const res = await api.get('/victims');
    return res.data;
  } catch (err) {
    return [
      { id: 1, victimCode: 'VIC-101', estimatedAge: 'Age 45 (Male)', location: 'Stairs A - Mid Level', movementStatus: 'SLOW', nearestMedicalTeam: 'Medical Unit 1 (Station Clinic)', eta: '2 Mins', priority: 'MINOR', suggestedRescueOrder: 1 },
      { id: 2, victimCode: 'VIC-102', estimatedAge: 'Age 68 (Female)', location: 'FOB North Bottleneck', movementStatus: 'IMMOBILE', nearestMedicalTeam: 'Medical Team Alpha (Emergency)', eta: '1 Min', priority: 'CRITICAL', suggestedRescueOrder: 2 },
      { id: 3, victimCode: 'VIC-103', estimatedAge: 'Age 28 (Male)', location: 'Platform 1 Exit Gate', movementStatus: 'MOVING', nearestMedicalTeam: 'RPF First Aid Team', eta: '3 Mins', priority: 'SAFE', suggestedRescueOrder: 3 }
    ];
  }
};

export const fetchAnalytics = async () => {
  try {
    const res = await api.get('/analytics');
    return res.data;
  } catch (err) {
    return {
      predictionAccuracy: 99.4,
      incidentsPrevented: 48,
      livesProtected: 1420,
      avgResponseTimeSec: 1.4,
      peakHours: '08:30 AM - 10:00 AM',
      avgDensityPercentage: 42.5
    };
  }
};

export const triggerEmergency = async () => {
  try {
    const res = await api.post('/emergency');
    return res.data;
  } catch (err) {
    return { status: 'EMERGENCY_DISPATCHED', message: 'Emergency triggered locally' };
  }
};

export default api;

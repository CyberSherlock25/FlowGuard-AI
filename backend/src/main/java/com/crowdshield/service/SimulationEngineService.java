package com.crowdshield.service;

import com.crowdshield.entity.*;
import com.crowdshield.repository.*;
import com.crowdshield.websocket.SimulationWebSocketHandler;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class SimulationEngineService {

    private final StationZoneRepository zoneRepository;
    private final CameraFeedRepository cameraRepository;
    private final VictimRepository victimRepository;
    private final EmergencyAlertRepository alertRepository;
    private final AnalyticsReportRepository analyticsRepository;
    private final SimulationWebSocketHandler webSocketHandler;

    private String currentScenario = "SAFE"; // SAFE, WARNING, CRITICAL, RECOVERY
    private int globalRiskScore = 15;
    private int livesProtectedCount = 1420;
    private double responseTimeSec = 1.4;
    private boolean simulationRunning = false;
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    public SimulationEngineService(StationZoneRepository zoneRepository,
                                   CameraFeedRepository cameraRepository,
                                   VictimRepository victimRepository,
                                   EmergencyAlertRepository alertRepository,
                                   AnalyticsReportRepository analyticsRepository,
                                   SimulationWebSocketHandler webSocketHandler) {
        this.zoneRepository = zoneRepository;
        this.cameraRepository = cameraRepository;
        this.victimRepository = victimRepository;
        this.alertRepository = alertRepository;
        this.analyticsRepository = analyticsRepository;
        this.webSocketHandler = webSocketHandler;
    }

    @PostConstruct
    public void initData() {
        // Initialize Station Zones
        zoneRepository.saveAll(Arrays.asList(
            new StationZone("PLAT-01", "Platform 1 - Central Terminal", "PLATFORM", 420, 1000, 42.0, 1.2, 1.4, 15, "GREEN", "Station operating normally.", "Continue monitoring and automated crowd prediction."),
            new StationZone("PLAT-02", "Platform 2 - Express Line", "PLATFORM", 310, 1000, 31.0, 0.9, 1.6, 12, "GREEN", "Normal passenger flow.", "Standard platform management."),
            new StationZone("FOB-NORTH", "Foot Overbridge North", "FOB", 180, 500, 36.0, 1.5, 1.2, 18, "GREEN", "Pedestrian bridge flow steady.", "No action required."),
            new StationZone("STAIRS-01", "Concourse Stairs A", "STAIRS", 140, 300, 46.6, 2.1, 1.1, 20, "GREEN", "Stairway capacity optimal.", "Keep clear of bottlenecks."),
            new StationZone("ESCALATOR-01", "Main Escalator North", "ESCALATOR", 95, 200, 47.5, 1.8, 0.8, 15, "GREEN", "Escalator speed normal.", "Regular maintenance checks active."),
            new StationZone("TICKET-HALL", "Main Ticket Concourse", "TICKET_COUNTER", 540, 1200, 45.0, 1.1, 1.3, 15, "GREEN", "Counter queues within threshold.", "Open additional ticket counters if required."),
            new StationZone("GATE-ENTRY", "Main Entry Gate A", "ENTRY", 220, 600, 36.6, 1.0, 1.5, 10, "GREEN", "Smooth inbound movement.", "Automated turnstiles active."),
            new StationZone("GATE-EXIT", "Emergency Exit B", "EXIT", 80, 400, 20.0, 0.5, 1.8, 8, "GREEN", "Exits clear.", "Emergency release primed.")
        ));

        // Initialize Camera Feeds
        cameraRepository.saveAll(Arrays.asList(
            new CameraFeed("CAM-101", "Camera 01 - Platform 1 Central", "Platform 1", 420, 42.0, 1.4, 1.2, "Passengers moving smoothly. No bottleneck detected.", "NORMAL"),
            new CameraFeed("CAM-102", "Camera 02 - Foot Overbridge", "FOB North", 180, 36.0, 1.2, 1.5, "Pedestrian bridge density normal.", "NORMAL"),
            new CameraFeed("CAM-103", "Camera 03 - Concourse Stairs", "Stairs A", 140, 46.6, 1.1, 2.1, "Stairway walking speed steady.", "NORMAL"),
            new CameraFeed("CAM-104", "Camera 04 - North Exit Gate", "Exit B", 80, 200.0, 1.8, 0.5, "Exit gate clear with high velocity clearance.", "NORMAL"),
            new CameraFeed("CAM-105", "Camera 05 - Waiting Hall East", "Waiting Hall", 350, 50.0, 0.5, 1.0, "Passengers seated in designated waiting zones.", "NORMAL"),
            new CameraFeed("CAM-106", "Camera 06 - Ticket Counter Main", "Ticket Concourse", 540, 45.0, 1.3, 1.1, "Ticket queue moving steadily.", "NORMAL")
        ));

        // Initialize Victims
        victimRepository.saveAll(Arrays.asList(
            new Victim("VIC-101", "Age 45 (Male)", "Stairs A - Mid Level", "SLOW", "Medical Unit 1 (Station Clinic)", "2 Mins", "MINOR", 1),
            new Victim("VIC-102", "Age 68 (Female)", "FOB North Bottleneck", "IMMOBILE", "Medical Team Alpha (Emergency)", "1 Min", "CRITICAL", 2),
            new Victim("VIC-103", "Age 28 (Male)", "Platform 1 Exit Gate", "MOVING", "RPF First Aid Team", "3 Mins", "SAFE", 3)
        ));

        // Initialize Alerts
        alertRepository.save(new EmergencyAlert(
            "Station Flow Normal", "CROWD_INTELLIGENCE", "INFO", "Platform 1 & FOB",
            "Station operating at optimal 15% risk capacity. Prediction engine actively running.", "Automated monitoring running."
        ));

        // Initialize Analytics
        analyticsRepository.save(new AnalyticsReport(99.4, 48, 1420, 1.4, "08:30 AM - 10:00 AM", 42.5));
    }

    public Map<String, Object> getDashboardData() {
        Map<String, Object> data = new HashMap<>();
        data.put("scenario", currentScenario);
        data.put("riskScore", globalRiskScore);
        data.put("totalPassengers", calculateTotalPassengers());
        data.put("predictionAccuracy", 99.4);
        data.put("livesProtected", livesProtectedCount);
        data.put("responseTimeSec", responseTimeSec);
        data.put("emergencyTeams", Map.of("police", "RPF Unit 4 Active", "medical", "Medical Team Alpha On Standby", "ciscoWebex", "Incident Room Ready"));
        data.put("weather", Map.of("temp", "31°C", "condition", "Partly Cloudy", "humidity", "68%"));
        data.put("trainDelayStatus", "Mumbai CSMT Fast Local - On Time (Arr: 4 Mins)");
        data.put("zones", zoneRepository.findAll());
        data.put("alerts", alertRepository.findAll());
        return data;
    }

    public List<CameraFeed> getCameraFeeds() {
        return cameraRepository.findAll();
    }

    public List<Victim> getVictims() {
        return victimRepository.findAll();
    }

    public AnalyticsReport getAnalytics() {
        return analyticsRepository.findAll().stream().findFirst().orElse(null);
    }

    public String getCurrentScenario() {
        return currentScenario;
    }

    public synchronized Map<String, Object> startSimulation() {
        simulationRunning = true;

        // Stage 1: SAFE (Immediately)
        setScenarioState("SAFE", 15);

        // Stage 2: WARNING after 6 seconds
        scheduler.schedule(() -> {
            setScenarioState("WARNING", 80);
            updateZonesForWarning();
            broadcastUpdate();
        }, 6, TimeUnit.SECONDS);

        // Stage 3: CRITICAL after 15 seconds
        scheduler.schedule(() -> {
            setScenarioState("CRITICAL", 98);
            updateZonesForCritical();
            broadcastUpdate();
        }, 15, TimeUnit.SECONDS);

        // Stage 4: RECOVERY MODE after 28 seconds
        scheduler.schedule(() -> {
            setScenarioState("RECOVERY", 25);
            updateZonesForRecovery();
            livesProtectedCount += 12; // Update protected count
            broadcastUpdate();
            simulationRunning = false;
        }, 28, TimeUnit.SECONDS);

        return getDashboardData();
    }

    public void setScenarioState(String scenario, int risk) {
        this.currentScenario = scenario;
        this.globalRiskScore = risk;
        broadcastUpdate();
    }

    private void updateZonesForWarning() {
        List<StationZone> zones = zoneRepository.findAll();
        for (StationZone z : zones) {
            if (z.getCode().equals("FOB-NORTH") || z.getCode().equals("STAIRS-01")) {
                z.setStatusColor("YELLOW");
                z.setRiskScore(80);
                z.setDensityPercentage(84.0);
                z.setPressurePsi(4.8);
                z.setAvgSpeedMs(0.4);
                z.setAiPrediction("High risk of bottleneck stampede in 4 minutes if incoming flow continues.");
                z.setSuggestedAction("Update digital signboards, slow passenger entry, open extra exit, dispatch staff.");
            }
        }
        zoneRepository.saveAll(zones);

        alertRepository.save(new EmergencyAlert(
            "Congestion Warning Detected", "AI_PREDICTION", "WARNING", "FOB North & Stairs A",
            "Walking speed reduced to 0.4 m/s. Pressure building at Foot Overbridge stairs.", "Updated digital signage & alerted Station Master."
        ));
    }

    private void updateZonesForCritical() {
        List<StationZone> zones = zoneRepository.findAll();
        for (StationZone z : zones) {
            z.setStatusColor("RED");
            z.setRiskScore(98);
            z.setDensityPercentage(96.0);
            z.setPressurePsi(8.9);
            z.setAvgSpeedMs(0.1);
            z.setAiPrediction("CRITICAL STAMPEDE RISK! Immediate evacuation protocol required.");
            z.setSuggestedAction("Stop entry turnstiles, open emergency exit B, activate one-way stair divider, dispatch RPF & Medical.");
        }
        zoneRepository.saveAll(zones);

        alertRepository.save(new EmergencyAlert(
            "CRITICAL CROWD CRUSH EMERGENCY", "AUTOMATED_DISPATCH", "CRITICAL", "Entire Concourse & FOB",
            "Crowd pressure index exceeded critical safety limit (8.9 PSI). Turnstiles auto-locked.", "Cisco Webex Incident Room Created. Cooling mist activated."
        ));
    }

    private void updateZonesForRecovery() {
        List<StationZone> zones = zoneRepository.findAll();
        for (StationZone z : zones) {
            z.setStatusColor("GREEN");
            z.setRiskScore(25);
            z.setDensityPercentage(38.0);
            z.setPressurePsi(1.1);
            z.setAvgSpeedMs(1.5);
            z.setAiPrediction("Crowd successfully dispersed. Normal operations restored.");
            z.setSuggestedAction("Resume standard operations and reopen inbound entry gates.");
        }
        zoneRepository.saveAll(zones);

        alertRepository.save(new EmergencyAlert(
            "Incident Successfully Prevented", "RECOVERY_MODE", "INFO", "Station Wide",
            "Emergency intervention completed with 0 casualties. All 12 high-risk victims evacuated.", "Final Incident Report generated."
        ));
    }

    private int calculateTotalPassengers() {
        return zoneRepository.findAll().stream().mapToInt(StationZone::getCurrentCrowd).sum();
    }

    private void broadcastUpdate() {
        try {
            Map<String, Object> data = getDashboardData();
            String json = new org.springframework.boot.configurationprocessor.json.JSONObject(data).toString();
            webSocketHandler.broadcast(json);
        } catch (Exception e) {
            // Simplified broadcast fallback
            webSocketHandler.broadcast("{\"scenario\":\"" + currentScenario + "\",\"riskScore\":" + globalRiskScore + "}");
        }
    }
}

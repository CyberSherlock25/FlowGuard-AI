package com.crowdshield.controller;

import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AlertController {

    private final SimulationEngineService simulationService;

    public AlertController(SimulationEngineService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/alerts")
    public ResponseEntity<Object> getAlerts() {
        Map<String, Object> data = simulationService.getDashboardData();
        return ResponseEntity.ok(data.get("alerts"));
    }

    @PostMapping("/emergency")
    public ResponseEntity<Map<String, Object>> triggerManualEmergency(@RequestBody(required = false) Map<String, Object> body) {
        simulationService.setScenarioState("CRITICAL", 98);
        return ResponseEntity.ok(Map.of(
            "status", "EMERGENCY_DISPATCHED",
            "message", "Cisco Webex Incident Room initialized. RPF & Medical Dispatched.",
            "timestamp", System.currentTimeMillis()
        ));
    }
}

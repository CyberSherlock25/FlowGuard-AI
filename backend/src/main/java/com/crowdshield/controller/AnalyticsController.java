package com.crowdshield.controller;

import com.crowdshield.entity.AnalyticsReport;
import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final SimulationEngineService simulationService;

    public AnalyticsController(SimulationEngineService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping
    public ResponseEntity<AnalyticsReport> getAnalytics() {
        return ResponseEntity.ok(simulationService.getAnalytics());
    }
}

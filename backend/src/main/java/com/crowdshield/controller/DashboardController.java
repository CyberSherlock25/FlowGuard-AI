package com.crowdshield.controller;

import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final SimulationEngineService simulationService;

    public DashboardController(SimulationEngineService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(simulationService.getDashboardData());
    }
}

package com.crowdshield.controller;

import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScenarioController {

    private final SimulationEngineService simulationService;

    public ScenarioController(SimulationEngineService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/scenarios")
    public ResponseEntity<Map<String, String>> getCurrentScenario() {
        return ResponseEntity.ok(Map.of("scenario", simulationService.getCurrentScenario()));
    }

    @PostMapping("/startSimulation")
    public ResponseEntity<Map<String, Object>> startSimulation() {
        return ResponseEntity.ok(simulationService.startSimulation());
    }
}

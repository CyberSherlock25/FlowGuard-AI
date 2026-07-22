package com.crowdshield.controller;

import com.crowdshield.entity.Victim;
import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/victims")
@CrossOrigin(origins = "*")
public class VictimController {

    private final SimulationEngineService simulationService;

    public VictimController(SimulationEngineService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping
    public ResponseEntity<List<Victim>> getVictims() {
        return ResponseEntity.ok(simulationService.getVictims());
    }
}

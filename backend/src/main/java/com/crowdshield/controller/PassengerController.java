package com.crowdshield.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/passengerRoute")
@CrossOrigin(origins = "*")
public class PassengerController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPassengerRoute(@RequestParam(defaultValue = "GATE_A") String origin,
                                                                 @RequestParam(defaultValue = "PLATFORM_1") String destination) {
        return ResponseEntity.ok(Map.of(
            "origin", origin,
            "destination", destination,
            "recommendedRoute", "North Concourse -> Gate B -> Escalator 2 -> Platform 1",
            "avoidZones", java.util.List.of("Foot Overbridge North (Congested)", "Stairs A (High Density)"),
            "estimatedWalkingTime", "3.2 Mins",
            "crowdStatus", "SAFE_MODERATE",
            "voiceGuidanceText", "Please proceed to Gate B Exit. Escalator 2 has clear movement with 2 minutes walking time.",
            "nearestEmergencyExit", "Emergency Exit B (40 meters)"
        ));
    }
}

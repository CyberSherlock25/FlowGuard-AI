package com.crowdshield.controller;

import com.crowdshield.service.GeminiAiService;
import com.crowdshield.service.SimulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class GeminiAiController {

    private final GeminiAiService geminiAiService;
    private final SimulationEngineService simulationEngineService;

    public GeminiAiController(GeminiAiService geminiAiService, SimulationEngineService simulationEngineService) {
        this.geminiAiService = geminiAiService;
        this.simulationEngineService = simulationEngineService;
    }

    @GetMapping("/analyze")
    public ResponseEntity<Map<String, Object>> getLiveAnalysis() {
        String scenario = simulationEngineService.getCurrentScenario();
        Map<String, Object> dash = simulationEngineService.getDashboardData();
        int risk = (int) dash.getOrDefault("riskScore", 15);
        int count = (int) dash.getOrDefault("totalPassengers", 1985);

        return ResponseEntity.ok(geminiAiService.generateScenarioAnalysis(scenario, risk, count, 4.8));
    }

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chatWithAi(@RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "What is the current station status?");
        String scenario = simulationEngineService.getCurrentScenario();
        Map<String, Object> dash = simulationEngineService.getDashboardData();
        int risk = (int) dash.getOrDefault("riskScore", 15);

        return ResponseEntity.ok(geminiAiService.answerOperatorQuestion(question, scenario, risk));
    }
}

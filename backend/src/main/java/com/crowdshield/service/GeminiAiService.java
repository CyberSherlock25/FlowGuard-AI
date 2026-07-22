package com.crowdshield.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class GeminiAiService {

    @Value("${gemini.api.key:MOCK_KEY}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Generate structured AI insights using Google Gemini API or intelligent mock fallback
     */
    public Map<String, Object> generateScenarioAnalysis(String scenario, int riskScore, int peopleCount, double pressurePsi) {
        if (geminiApiKey != null && !geminiApiKey.equals("MOCK_KEY") && !geminiApiKey.isBlank()) {
            try {
                return callGoogleGeminiApi(scenario, riskScore, peopleCount, pressurePsi);
            } catch (Exception e) {
                System.err.println("Gemini API call failed, falling back to local recommendation engine: " + e.getMessage());
            }
        }
        return generateMockGeminiAnalysis(scenario, riskScore, peopleCount, pressurePsi);
    }

    /**
     * Conversational operator AI Chat endpoint
     */
    public Map<String, String> answerOperatorQuestion(String question, String currentScenario, int riskScore) {
        String answer;
        String qLower = question.toLowerCase();

        if (qLower.contains("platform 2") || qLower.contains("dangerous")) {
            answer = "Platform 2 is experiencing elevated arrival density (78% capacity) due to the delayed CSMT Fast Local. The narrow Staircase A bottleneck creates high pressure (4.8 PSI). Recommended action: Divert passengers via Escalator 2.";
        } else if (qLower.contains("cause") || qLower.contains("congestion")) {
            answer = "The primary cause is two overlapping suburban train arrivals within 90 seconds, leading to a peak inflow rate of 140 passengers/minute at Foot Overbridge North.";
        } else if (qLower.contains("first") || qLower.contains("do first") || qLower.contains("action")) {
            answer = "1st Priority: Re-route inbound turnstiles to Exit B. 2nd Priority: Deploy 4 RPF officers to FOB North stairhead. 3rd Priority: Broadcast voice guidance to Escalator 2.";
        } else if (qLower.contains("affected") || qLower.contains("passengers")) {
            answer = "Approximately 420 passengers on Platform 1 and 610 passengers on FOB North are currently within the high-density impact zone.";
        } else if (qLower.contains("officers") || qLower.contains("police")) {
            answer = "Minimum 6 RPF officers required: 4 at FOB North staircase base and 2 at Emergency Exit B to maintain a clear human corridor.";
        } else if (qLower.contains("recovery") || qLower.contains("how long")) {
            answer = "With automated gate overrides active, crowd pressure is estimated to normalize to baseline (<30%) in 3.5 minutes.";
        } else {
            answer = "CrowdShield AI telemetry indicates station risk is currently at " + riskScore + "% (" + currentScenario + " Mode). All automated safety protocols are operating as configured.";
        }

        return Map.of("question", question, "answer", answer, "timestamp", String.valueOf(System.currentTimeMillis()));
    }

    private Map<String, Object> callGoogleGeminiApi(String scenario, int riskScore, int peopleCount, double pressurePsi) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey;

        String promptText = String.format(
            "You are CrowdShield AI, an expert Smart City decision support system for Indian Railways. Analyze this live station data: Scenario=%s, RiskScore=%d%%, PeopleCount=%d, Pressure=%.1f PSI. Provide a JSON response with keys: situationSummary, riskExplanation, operatorRecommendation, passengerAnnouncement, policeInstructions, medicalInstructions, lessonsLearned.",
            scenario, riskScore, peopleCount, pressurePsi
        );

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", promptText)))
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
        return Map.of("geminiResponse", response.getBody(), "status", "SUCCESS");
    }

    private Map<String, Object> generateMockGeminiAnalysis(String scenario, int riskScore, int peopleCount, double pressurePsi) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("scenario", scenario);
        result.put("riskScore", riskScore);

        if ("CRITICAL".equalsIgnoreCase(scenario)) {
            result.put("situationSummary", "CRITICAL STAMPEDE HAZARD: Severe crowd pressure (8.9 PSI) detected on Foot Overbridge North and Concourse Stairs A.");
            result.put("riskExplanation", "Inbound queue rate exceeds clearance capacity by 210%. Physical compression exceeds safety limits.");
            result.put("operatorRecommendation", "IMMEDIATELY STOP inbound turnstiles, open Emergency Exit B wide, and trigger cooling mist spray.");
            result.put("passengerAnnouncement", "ATTENTION PASSENGERS: Please move towards Emergency Exit B. Do NOT use Foot Overbridge North.");
            result.put("policeInstructions", "Deploy RPF Unit 4 to form human corridor from FOB base to Exit B.");
            result.put("medicalInstructions", "Dispatch Medical Team Alpha to FOB North base with stretcher and oxygen kit.");
            result.put("recoverySuggestions", "Gradually reopen turnstiles at 25% capacity once pressure drops below 3.0 PSI.");
            result.put("lessonsLearned", "Adjust suburban arrival staggering by 3 minutes to avoid simultaneous platform surge.");
        } else if ("WARNING".equalsIgnoreCase(scenario)) {
            result.put("situationSummary", "CONGESTION WARNING: Density at 80% on FOB North stairs. Walking speed slowed to 0.4 m/s.");
            result.put("riskExplanation", "Slow pedestrian velocity creates potential 4-minute bottleneck if incoming flow continues.");
            result.put("operatorRecommendation", "Update digital signboards to redirect flow to Escalator 2 and notify Station Master.");
            result.put("passengerAnnouncement", "NOTICE: Please use Escalator 2 for faster exit. Foot Overbridge North is experiencing high volume.");
            result.put("policeInstructions", "Position 3 RPF officers at FOB entrance to regulate inflow speed.");
            result.put("medicalInstructions", "Medical Unit 1 on standby at Station Clinic.");
            result.put("recoverySuggestions", "Maintain dynamic signage until walking velocity recovers to >1.2 m/s.");
            result.put("lessonsLearned", "Increase LED signboard brightness during peak morning hours.");
        } else {
            result.put("situationSummary", "NORMAL OPERATIONS: Station crowd density at 15%. All platforms and exit corridors clear.");
            result.put("riskExplanation", "Passenger movement velocity optimal at 1.4 m/s. Pressure levels normal (1.2 PSI).");
            result.put("operatorRecommendation", "Continue standard automated camera monitoring and routine train announcements.");
            result.put("passengerAnnouncement", "Welcome to Mumbai CSMT. All platforms and exits are operating normally.");
            result.put("policeInstructions", "Routine security patrol across Platform 1 & 2.");
            result.put("medicalInstructions", "Standard clinic operations on standby.");
            result.put("recoverySuggestions", "Baseline metrics steady.");
            result.put("lessonsLearned", "System running optimally.");
        }

        return result;
    }
}

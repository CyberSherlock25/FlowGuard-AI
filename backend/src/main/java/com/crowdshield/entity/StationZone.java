package com.crowdshield.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "station_zones")
public class StationZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String name;
    private String type; // PLATFORM, FOB, STAIRS, ESCALATOR, TICKET_COUNTER, ENTRY, EXIT
    private int currentCrowd;
    private int maxCapacity;
    private double densityPercentage;
    private double pressurePsi;
    private double avgSpeedMs;
    private int riskScore; // 0-100
    private String statusColor; // GREEN, YELLOW, RED
    private String aiPrediction;
    private String suggestedAction;

    public StationZone() {}

    public StationZone(String code, String name, String type, int currentCrowd, int maxCapacity,
                       double densityPercentage, double pressurePsi, double avgSpeedMs,
                       int riskScore, String statusColor, String aiPrediction, String suggestedAction) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.currentCrowd = currentCrowd;
        this.maxCapacity = maxCapacity;
        this.densityPercentage = densityPercentage;
        this.pressurePsi = pressurePsi;
        this.avgSpeedMs = avgSpeedMs;
        this.riskScore = riskScore;
        this.statusColor = statusColor;
        this.aiPrediction = aiPrediction;
        this.suggestedAction = suggestedAction;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getCurrentCrowd() { return currentCrowd; }
    public void setCurrentCrowd(int currentCrowd) { this.currentCrowd = currentCrowd; }

    public int getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(int maxCapacity) { this.maxCapacity = maxCapacity; }

    public double getDensityPercentage() { return densityPercentage; }
    public void setDensityPercentage(double densityPercentage) { this.densityPercentage = densityPercentage; }

    public double getPressurePsi() { return pressurePsi; }
    public void setPressurePsi(double pressurePsi) { this.pressurePsi = pressurePsi; }

    public double getAvgSpeedMs() { return avgSpeedMs; }
    public void setAvgSpeedMs(double avgSpeedMs) { this.avgSpeedMs = avgSpeedMs; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getStatusColor() { return statusColor; }
    public void setStatusColor(String statusColor) { this.statusColor = statusColor; }

    public String getAiPrediction() { return aiPrediction; }
    public void setAiPrediction(String aiPrediction) { this.aiPrediction = aiPrediction; }

    public String getSuggestedAction() { return suggestedAction; }
    public void setSuggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; }
}

package com.crowdshield.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "analytics_reports")
public class AnalyticsReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double predictionAccuracy;
    private int incidentsPrevented;
    private int livesProtected;
    private double avgResponseTimeSec;
    private String peakHours;
    private double avgDensityPercentage;

    public AnalyticsReport() {}

    public AnalyticsReport(double predictionAccuracy, int incidentsPrevented, int livesProtected,
                           double avgResponseTimeSec, String peakHours, double avgDensityPercentage) {
        this.predictionAccuracy = predictionAccuracy;
        this.incidentsPrevented = incidentsPrevented;
        this.livesProtected = livesProtected;
        this.avgResponseTimeSec = avgResponseTimeSec;
        this.peakHours = peakHours;
        this.avgDensityPercentage = avgDensityPercentage;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getPredictionAccuracy() { return predictionAccuracy; }
    public void setPredictionAccuracy(double predictionAccuracy) { this.predictionAccuracy = predictionAccuracy; }

    public int getIncidentsPrevented() { return incidentsPrevented; }
    public void setIncidentsPrevented(int incidentsPrevented) { this.incidentsPrevented = incidentsPrevented; }

    public int getLivesProtected() { return livesProtected; }
    public void setLivesProtected(int livesProtected) { this.livesProtected = livesProtected; }

    public double getAvgResponseTimeSec() { return avgResponseTimeSec; }
    public void setAvgResponseTimeSec(double avgResponseTimeSec) { this.avgResponseTimeSec = avgResponseTimeSec; }

    public String getPeakHours() { return peakHours; }
    public void setPeakHours(String peakHours) { this.peakHours = peakHours; }

    public double getAvgDensityPercentage() { return avgDensityPercentage; }
    public void setAvgDensityPercentage(double avgDensityPercentage) { this.avgDensityPercentage = avgDensityPercentage; }
}

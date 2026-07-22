package com.crowdshield.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "victims")
public class Victim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String victimCode;
    private String estimatedAge;
    private String location;
    private String movementStatus; // IMMOBILE, SLOW, MOVING
    private String nearestMedicalTeam;
    private String eta;
    private String priority; // CRITICAL, MINOR, SAFE
    private int suggestedRescueOrder;

    public Victim() {}

    public Victim(String victimCode, String estimatedAge, String location, String movementStatus,
                  String nearestMedicalTeam, String eta, String priority, int suggestedRescueOrder) {
        this.victimCode = victimCode;
        this.estimatedAge = estimatedAge;
        this.location = location;
        this.movementStatus = movementStatus;
        this.nearestMedicalTeam = nearestMedicalTeam;
        this.eta = eta;
        this.priority = priority;
        this.suggestedRescueOrder = suggestedRescueOrder;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getVictimCode() { return victimCode; }
    public void setVictimCode(String victimCode) { this.victimCode = victimCode; }

    public String getEstimatedAge() { return estimatedAge; }
    public void setEstimatedAge(String estimatedAge) { this.estimatedAge = estimatedAge; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMovementStatus() { return movementStatus; }
    public void setMovementStatus(String movementStatus) { this.movementStatus = movementStatus; }

    public String getNearestMedicalTeam() { return nearestMedicalTeam; }
    public void setNearestMedicalTeam(String nearestMedicalTeam) { this.nearestMedicalTeam = nearestMedicalTeam; }

    public String getEta() { return eta; }
    public void setEta(String eta) { this.eta = eta; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public int getSuggestedRescueOrder() { return suggestedRescueOrder; }
    public void setSuggestedRescueOrder(int suggestedRescueOrder) { this.suggestedRescueOrder = suggestedRescueOrder; }
}

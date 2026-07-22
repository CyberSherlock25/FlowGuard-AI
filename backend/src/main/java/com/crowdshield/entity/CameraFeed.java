package com.crowdshield.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "camera_feeds")
public class CameraFeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cameraId;
    private String name;
    private String location;
    private int peopleCount;
    private double crowdDensity;
    private double movementVelocity;
    private double pressureIndex;
    private String aiObservation;
    private String status; // NORMAL, WARNING, CRITICAL

    public CameraFeed() {}

    public CameraFeed(String cameraId, String name, String location, int peopleCount,
                      double crowdDensity, double movementVelocity, double pressureIndex,
                      String aiObservation, String status) {
        this.cameraId = cameraId;
        this.name = name;
        this.location = location;
        this.peopleCount = peopleCount;
        this.crowdDensity = crowdDensity;
        this.movementVelocity = movementVelocity;
        this.pressureIndex = pressureIndex;
        this.aiObservation = aiObservation;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCameraId() { return cameraId; }
    public void setCameraId(String cameraId) { this.cameraId = cameraId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getPeopleCount() { return peopleCount; }
    public void setPeopleCount(int peopleCount) { this.peopleCount = peopleCount; }

    public double getCrowdDensity() { return crowdDensity; }
    public void setCrowdDensity(double crowdDensity) { this.crowdDensity = crowdDensity; }

    public double getMovementVelocity() { return movementVelocity; }
    public void setMovementVelocity(double movementVelocity) { this.movementVelocity = movementVelocity; }

    public double getPressureIndex() { return pressureIndex; }
    public void setPressureIndex(double pressureIndex) { this.pressureIndex = pressureIndex; }

    public String getAiObservation() { return aiObservation; }
    public void setAiObservation(String aiObservation) { this.aiObservation = aiObservation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

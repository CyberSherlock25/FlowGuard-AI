package com.crowdshield.repository;

import com.crowdshield.entity.CameraFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CameraFeedRepository extends JpaRepository<CameraFeed, Long> {
    Optional<CameraFeed> findByCameraId(String cameraId);
}

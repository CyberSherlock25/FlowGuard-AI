package com.crowdshield.repository;

import com.crowdshield.entity.StationZone;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StationZoneRepository extends JpaRepository<StationZone, Long> {
    Optional<StationZone> findByCode(String code);
}

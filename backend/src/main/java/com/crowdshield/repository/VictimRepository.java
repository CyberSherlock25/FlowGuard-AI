package com.crowdshield.repository;

import com.crowdshield.entity.Victim;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VictimRepository extends JpaRepository<Victim, Long> {
    List<Victim> findByPriority(String priority);
}

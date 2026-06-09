package co.edu.sena.repository;

import co.edu.sena.domain.ScheduleVersion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ScheduleVersion entity.
 */
@Repository
public interface ScheduleVersionRepository extends MongoRepository<ScheduleVersion, String> {}

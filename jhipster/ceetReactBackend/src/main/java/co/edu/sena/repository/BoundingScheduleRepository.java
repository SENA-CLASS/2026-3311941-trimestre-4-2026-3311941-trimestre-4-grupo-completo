package co.edu.sena.repository;

import co.edu.sena.domain.BoundingSchedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BoundingSchedule entity.
 */
@Repository
public interface BoundingScheduleRepository extends MongoRepository<BoundingSchedule, String> {}

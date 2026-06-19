package co.edu.sena.repository;

import co.edu.sena.domain.TrainingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TrainingStatus entity.
 */
@Repository
public interface TrainingStatusRepository extends MongoRepository<TrainingStatus, String> {}

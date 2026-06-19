package co.edu.sena.repository;

import co.edu.sena.domain.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Assessment entity.
 */
@Repository
public interface AssessmentRepository extends MongoRepository<Assessment, String> {}

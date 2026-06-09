package co.edu.sena.repository;

import co.edu.sena.domain.LearningResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LearningResult entity.
 */
@Repository
public interface LearningResultRepository extends MongoRepository<LearningResult, String> {}

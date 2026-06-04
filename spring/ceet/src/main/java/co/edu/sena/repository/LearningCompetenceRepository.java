package co.edu.sena.repository;

import co.edu.sena.domain.LearningCompetence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LearningCompetence entity.
 */
@Repository
public interface LearningCompetenceRepository extends MongoRepository<LearningCompetence, String> {}

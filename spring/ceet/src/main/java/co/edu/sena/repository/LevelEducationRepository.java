package co.edu.sena.repository;

import co.edu.sena.domain.LevelEducation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the LevelEducation entity.
 */
@Repository
public interface LevelEducationRepository extends MongoRepository<LevelEducation, String> {}

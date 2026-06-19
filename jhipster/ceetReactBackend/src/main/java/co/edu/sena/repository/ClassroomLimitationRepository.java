package co.edu.sena.repository;

import co.edu.sena.domain.ClassroomLimitation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ClassroomLimitation entity.
 */
@Repository
public interface ClassroomLimitationRepository extends MongoRepository<ClassroomLimitation, String> {}

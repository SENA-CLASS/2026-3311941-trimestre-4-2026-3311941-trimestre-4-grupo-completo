package co.edu.sena.repository;

import co.edu.sena.domain.WorkingDayCourse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the WorkingDayCourse entity.
 */
@Repository
public interface WorkingDayCourseRepository extends MongoRepository<WorkingDayCourse, String> {}

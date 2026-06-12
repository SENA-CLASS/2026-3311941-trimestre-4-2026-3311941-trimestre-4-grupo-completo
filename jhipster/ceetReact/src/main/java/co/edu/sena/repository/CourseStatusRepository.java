package co.edu.sena.repository;

import co.edu.sena.domain.CourseStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CourseStatus entity.
 */
@Repository
public interface CourseStatusRepository extends MongoRepository<CourseStatus, String> {}

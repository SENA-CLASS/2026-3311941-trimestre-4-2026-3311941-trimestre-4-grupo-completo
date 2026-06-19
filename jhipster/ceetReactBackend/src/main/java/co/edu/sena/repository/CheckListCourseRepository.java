package co.edu.sena.repository;

import co.edu.sena.domain.CheckListCourse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CheckListCourse entity.
 */
@Repository
public interface CheckListCourseRepository extends MongoRepository<CheckListCourse, String> {}

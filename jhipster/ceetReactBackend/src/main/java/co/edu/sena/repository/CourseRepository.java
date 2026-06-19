package co.edu.sena.repository;

import co.edu.sena.domain.Course;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Course entity.
 */
@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    @Query("{}")
    Page<Course> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Course> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Course> findOneWithEagerRelationships(String id);
}

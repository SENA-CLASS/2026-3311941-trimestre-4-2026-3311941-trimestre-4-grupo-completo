package co.edu.sena.repository;

import co.edu.sena.domain.AreaInstructor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the AreaInstructor entity.
 */
@Repository
public interface AreaInstructorRepository extends MongoRepository<AreaInstructor, String> {
    @Query("{}")
    Page<AreaInstructor> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<AreaInstructor> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<AreaInstructor> findOneWithEagerRelationships(String id);
}

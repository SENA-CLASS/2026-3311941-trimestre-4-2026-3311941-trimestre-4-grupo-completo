package co.edu.sena.repository;

import co.edu.sena.domain.CoursePlanning;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CoursePlanning entity.
 */
@Repository
public interface CoursePlanningRepository extends MongoRepository<CoursePlanning, String> {
    @Query("{}")
    Page<CoursePlanning> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CoursePlanning> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CoursePlanning> findOneWithEagerRelationships(String id);
}

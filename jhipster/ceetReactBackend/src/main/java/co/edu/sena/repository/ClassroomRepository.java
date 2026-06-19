package co.edu.sena.repository;

import co.edu.sena.domain.Classroom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Classroom entity.
 */
@Repository
public interface ClassroomRepository extends MongoRepository<Classroom, String> {
    @Query("{}")
    Page<Classroom> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Classroom> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Classroom> findOneWithEagerRelationships(String id);
}

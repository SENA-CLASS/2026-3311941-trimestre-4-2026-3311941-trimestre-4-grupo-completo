package co.edu.sena.repository;

import co.edu.sena.domain.TrainingProgram;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the TrainingProgram entity.
 */
@Repository
public interface TrainingProgramRepository extends MongoRepository<TrainingProgram, String> {
    @Query("{}")
    Page<TrainingProgram> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<TrainingProgram> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<TrainingProgram> findOneWithEagerRelationships(String id);
}

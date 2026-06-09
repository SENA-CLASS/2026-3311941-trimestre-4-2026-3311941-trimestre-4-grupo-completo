package co.edu.sena.repository;

import co.edu.sena.domain.QuarterSchedule;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the QuarterSchedule entity.
 */
@Repository
public interface QuarterScheduleRepository extends MongoRepository<QuarterSchedule, String> {
    @Query("{}")
    Page<QuarterSchedule> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<QuarterSchedule> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<QuarterSchedule> findOneWithEagerRelationships(String id);
}

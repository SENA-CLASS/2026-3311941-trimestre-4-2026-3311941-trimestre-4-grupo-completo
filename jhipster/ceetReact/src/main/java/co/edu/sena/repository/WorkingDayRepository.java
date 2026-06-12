package co.edu.sena.repository;

import co.edu.sena.domain.WorkingDay;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the WorkingDay entity.
 */
@Repository
public interface WorkingDayRepository extends MongoRepository<WorkingDay, String> {
    @Query("{}")
    Page<WorkingDay> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<WorkingDay> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<WorkingDay> findOneWithEagerRelationships(String id);
}

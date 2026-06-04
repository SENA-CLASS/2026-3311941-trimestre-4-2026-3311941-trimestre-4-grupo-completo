package co.edu.sena.repository;

import co.edu.sena.domain.Schedule;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Schedule entity.
 */
@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, String> {
    @Query("{}")
    Page<Schedule> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Schedule> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Schedule> findOneWithEagerRelationships(String id);
}

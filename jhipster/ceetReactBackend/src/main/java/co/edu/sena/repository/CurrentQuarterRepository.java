package co.edu.sena.repository;

import co.edu.sena.domain.CurrentQuarter;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CurrentQuarter entity.
 */
@Repository
public interface CurrentQuarterRepository extends MongoRepository<CurrentQuarter, String> {
    @Query("{}")
    Page<CurrentQuarter> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CurrentQuarter> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CurrentQuarter> findOneWithEagerRelationships(String id);
}

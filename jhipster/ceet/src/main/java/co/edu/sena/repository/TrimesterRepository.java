package co.edu.sena.repository;

import co.edu.sena.domain.Trimester;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Trimester entity.
 */
@Repository
public interface TrimesterRepository extends MongoRepository<Trimester, String> {
    @Query("{}")
    Page<Trimester> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Trimester> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Trimester> findOneWithEagerRelationships(String id);
}

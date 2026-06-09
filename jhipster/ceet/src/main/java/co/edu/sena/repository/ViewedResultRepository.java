package co.edu.sena.repository;

import co.edu.sena.domain.ViewedResult;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ViewedResult entity.
 */
@Repository
public interface ViewedResultRepository extends MongoRepository<ViewedResult, String> {
    @Query("{}")
    Page<ViewedResult> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<ViewedResult> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<ViewedResult> findOneWithEagerRelationships(String id);
}

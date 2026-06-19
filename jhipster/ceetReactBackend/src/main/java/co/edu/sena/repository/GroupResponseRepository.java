package co.edu.sena.repository;

import co.edu.sena.domain.GroupResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the GroupResponse entity.
 */
@Repository
public interface GroupResponseRepository extends MongoRepository<GroupResponse, String> {
    @Query("{}")
    Page<GroupResponse> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<GroupResponse> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<GroupResponse> findOneWithEagerRelationships(String id);
}

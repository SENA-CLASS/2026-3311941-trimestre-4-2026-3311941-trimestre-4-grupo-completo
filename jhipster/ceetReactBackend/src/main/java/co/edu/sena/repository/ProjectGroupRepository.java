package co.edu.sena.repository;

import co.edu.sena.domain.ProjectGroup;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ProjectGroup entity.
 */
@Repository
public interface ProjectGroupRepository extends MongoRepository<ProjectGroup, String> {
    @Query("{}")
    Page<ProjectGroup> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<ProjectGroup> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<ProjectGroup> findOneWithEagerRelationships(String id);
}

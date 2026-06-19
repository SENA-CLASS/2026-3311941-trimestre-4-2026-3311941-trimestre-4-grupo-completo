package co.edu.sena.repository;

import co.edu.sena.domain.CourseTrimester;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CourseTrimester entity.
 */
@Repository
public interface CourseTrimesterRepository extends MongoRepository<CourseTrimester, String> {
    @Query("{}")
    Page<CourseTrimester> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CourseTrimester> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CourseTrimester> findOneWithEagerRelationships(String id);
}

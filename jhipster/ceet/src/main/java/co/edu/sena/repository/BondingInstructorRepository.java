package co.edu.sena.repository;

import co.edu.sena.domain.BondingInstructor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BondingInstructor entity.
 */
@Repository
public interface BondingInstructorRepository extends MongoRepository<BondingInstructor, String> {
    @Query("{}")
    Page<BondingInstructor> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<BondingInstructor> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<BondingInstructor> findOneWithEagerRelationships(String id);
}

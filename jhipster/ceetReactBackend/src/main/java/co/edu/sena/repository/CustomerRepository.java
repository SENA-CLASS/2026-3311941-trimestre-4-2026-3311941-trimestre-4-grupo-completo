package co.edu.sena.repository;

import co.edu.sena.domain.Customer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Customer entity.
 */
@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {
    @Query("{}")
    Page<Customer> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Customer> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Customer> findOneWithEagerRelationships(String id);
}

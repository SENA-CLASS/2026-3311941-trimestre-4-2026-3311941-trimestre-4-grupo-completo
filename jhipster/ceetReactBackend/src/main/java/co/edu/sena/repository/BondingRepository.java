package co.edu.sena.repository;

import co.edu.sena.domain.Bonding;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Bonding entity.
 */
@Repository
public interface BondingRepository extends MongoRepository<Bonding, String> {}

package co.edu.sena.repository;

import co.edu.sena.domain.BondingCompetence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the BondingCompetence entity.
 */
@Repository
public interface BondingCompetenceRepository extends MongoRepository<BondingCompetence, String> {}

package co.edu.sena.repository;

import co.edu.sena.domain.Campus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Campus entity.
 */
@Repository
public interface CampusRepository extends MongoRepository<Campus, String> {}

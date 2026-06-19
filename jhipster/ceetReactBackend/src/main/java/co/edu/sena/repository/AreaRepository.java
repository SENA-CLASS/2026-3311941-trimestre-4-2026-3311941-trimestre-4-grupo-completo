package co.edu.sena.repository;

import co.edu.sena.domain.Area;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Area entity.
 */
@Repository
public interface AreaRepository extends MongoRepository<Area, String> {}

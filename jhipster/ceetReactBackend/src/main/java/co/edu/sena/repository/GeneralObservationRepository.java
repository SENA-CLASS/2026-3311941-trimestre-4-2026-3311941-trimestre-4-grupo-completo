package co.edu.sena.repository;

import co.edu.sena.domain.GeneralObservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the GeneralObservation entity.
 */
@Repository
public interface GeneralObservationRepository extends MongoRepository<GeneralObservation, String> {}

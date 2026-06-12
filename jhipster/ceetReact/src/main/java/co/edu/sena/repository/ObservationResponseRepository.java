package co.edu.sena.repository;

import co.edu.sena.domain.ObservationResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ObservationResponse entity.
 */
@Repository
public interface ObservationResponseRepository extends MongoRepository<ObservationResponse, String> {}

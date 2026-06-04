package co.edu.sena.repository;

import co.edu.sena.domain.Modality;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Modality entity.
 */
@Repository
public interface ModalityRepository extends MongoRepository<Modality, String> {}

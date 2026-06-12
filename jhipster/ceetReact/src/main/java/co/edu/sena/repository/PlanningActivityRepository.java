package co.edu.sena.repository;

import co.edu.sena.domain.PlanningActivity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the PlanningActivity entity.
 */
@Repository
public interface PlanningActivityRepository extends MongoRepository<PlanningActivity, String> {}

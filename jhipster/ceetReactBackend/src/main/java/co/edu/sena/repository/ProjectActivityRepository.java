package co.edu.sena.repository;

import co.edu.sena.domain.ProjectActivity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ProjectActivity entity.
 */
@Repository
public interface ProjectActivityRepository extends MongoRepository<ProjectActivity, String> {}

package co.edu.sena.repository;

import co.edu.sena.domain.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Project entity.
 */
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {}

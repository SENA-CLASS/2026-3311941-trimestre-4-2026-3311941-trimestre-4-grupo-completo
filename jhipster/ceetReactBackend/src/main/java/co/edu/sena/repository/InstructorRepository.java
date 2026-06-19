package co.edu.sena.repository;

import co.edu.sena.domain.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Instructor entity.
 */
@Repository
public interface InstructorRepository extends MongoRepository<Instructor, String> {}

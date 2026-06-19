package co.edu.sena.repository;

import co.edu.sena.domain.InstructorWorkingDay;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the InstructorWorkingDay entity.
 */
@Repository
public interface InstructorWorkingDayRepository extends MongoRepository<InstructorWorkingDay, String> {}

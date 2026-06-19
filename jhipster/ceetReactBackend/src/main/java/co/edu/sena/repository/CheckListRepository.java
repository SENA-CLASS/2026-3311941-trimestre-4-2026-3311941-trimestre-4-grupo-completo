package co.edu.sena.repository;

import co.edu.sena.domain.CheckList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the CheckList entity.
 */
@Repository
public interface CheckListRepository extends MongoRepository<CheckList, String> {}

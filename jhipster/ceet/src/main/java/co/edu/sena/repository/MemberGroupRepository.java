package co.edu.sena.repository;

import co.edu.sena.domain.MemberGroup;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the MemberGroup entity.
 */
@Repository
public interface MemberGroupRepository extends MongoRepository<MemberGroup, String> {}

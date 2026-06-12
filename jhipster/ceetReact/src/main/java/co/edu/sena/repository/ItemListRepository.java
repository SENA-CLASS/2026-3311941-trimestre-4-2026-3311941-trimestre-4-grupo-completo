package co.edu.sena.repository;

import co.edu.sena.domain.ItemList;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the ItemList entity.
 */
@Repository
public interface ItemListRepository extends MongoRepository<ItemList, String> {
    @Query("{}")
    Page<ItemList> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<ItemList> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<ItemList> findOneWithEagerRelationships(String id);
}

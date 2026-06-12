package co.edu.sena.service;

import co.edu.sena.service.dto.ItemListDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ItemList}.
 */
public interface ItemListService {
    /**
     * Save a itemList.
     *
     * @param itemListDTO the entity to save.
     * @return the persisted entity.
     */
    ItemListDTO save(ItemListDTO itemListDTO);

    /**
     * Updates a itemList.
     *
     * @param itemListDTO the entity to update.
     * @return the persisted entity.
     */
    ItemListDTO update(ItemListDTO itemListDTO);

    /**
     * Partially updates a itemList.
     *
     * @param itemListDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ItemListDTO> partialUpdate(ItemListDTO itemListDTO);

    /**
     * Get all the itemLists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemListDTO> findAll(Pageable pageable);

    /**
     * Get all the itemLists with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ItemListDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" itemList.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ItemListDTO> findOne(String id);

    /**
     * Delete the "id" itemList.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

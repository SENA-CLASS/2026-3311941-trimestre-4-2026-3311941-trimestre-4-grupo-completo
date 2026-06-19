package co.edu.sena.service;

import co.edu.sena.service.dto.TrimesterDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.Trimester}.
 */
public interface TrimesterService {
    /**
     * Save a trimester.
     *
     * @param trimesterDTO the entity to save.
     * @return the persisted entity.
     */
    TrimesterDTO save(TrimesterDTO trimesterDTO);

    /**
     * Updates a trimester.
     *
     * @param trimesterDTO the entity to update.
     * @return the persisted entity.
     */
    TrimesterDTO update(TrimesterDTO trimesterDTO);

    /**
     * Partially updates a trimester.
     *
     * @param trimesterDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<TrimesterDTO> partialUpdate(TrimesterDTO trimesterDTO);

    /**
     * Get all the trimesters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrimesterDTO> findAll(Pageable pageable);

    /**
     * Get all the trimesters with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TrimesterDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" trimester.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrimesterDTO> findOne(String id);

    /**
     * Delete the "id" trimester.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

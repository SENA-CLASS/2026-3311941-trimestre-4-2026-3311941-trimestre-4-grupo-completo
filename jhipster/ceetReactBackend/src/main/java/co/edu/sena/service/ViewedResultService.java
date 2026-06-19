package co.edu.sena.service;

import co.edu.sena.service.dto.ViewedResultDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ViewedResult}.
 */
public interface ViewedResultService {
    /**
     * Save a viewedResult.
     *
     * @param viewedResultDTO the entity to save.
     * @return the persisted entity.
     */
    ViewedResultDTO save(ViewedResultDTO viewedResultDTO);

    /**
     * Updates a viewedResult.
     *
     * @param viewedResultDTO the entity to update.
     * @return the persisted entity.
     */
    ViewedResultDTO update(ViewedResultDTO viewedResultDTO);

    /**
     * Partially updates a viewedResult.
     *
     * @param viewedResultDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ViewedResultDTO> partialUpdate(ViewedResultDTO viewedResultDTO);

    /**
     * Get all the viewedResults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ViewedResultDTO> findAll(Pageable pageable);

    /**
     * Get all the viewedResults with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ViewedResultDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" viewedResult.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ViewedResultDTO> findOne(String id);

    /**
     * Delete the "id" viewedResult.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

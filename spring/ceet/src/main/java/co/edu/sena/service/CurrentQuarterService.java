package co.edu.sena.service;

import co.edu.sena.service.dto.CurrentQuarterDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.CurrentQuarter}.
 */
public interface CurrentQuarterService {
    /**
     * Save a currentQuarter.
     *
     * @param currentQuarterDTO the entity to save.
     * @return the persisted entity.
     */
    CurrentQuarterDTO save(CurrentQuarterDTO currentQuarterDTO);

    /**
     * Updates a currentQuarter.
     *
     * @param currentQuarterDTO the entity to update.
     * @return the persisted entity.
     */
    CurrentQuarterDTO update(CurrentQuarterDTO currentQuarterDTO);

    /**
     * Partially updates a currentQuarter.
     *
     * @param currentQuarterDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CurrentQuarterDTO> partialUpdate(CurrentQuarterDTO currentQuarterDTO);

    /**
     * Get all the currentQuarters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CurrentQuarterDTO> findAll(Pageable pageable);

    /**
     * Get all the currentQuarters with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CurrentQuarterDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" currentQuarter.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CurrentQuarterDTO> findOne(String id);

    /**
     * Delete the "id" currentQuarter.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

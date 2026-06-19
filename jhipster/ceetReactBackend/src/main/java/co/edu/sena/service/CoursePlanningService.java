package co.edu.sena.service;

import co.edu.sena.service.dto.CoursePlanningDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.CoursePlanning}.
 */
public interface CoursePlanningService {
    /**
     * Save a coursePlanning.
     *
     * @param coursePlanningDTO the entity to save.
     * @return the persisted entity.
     */
    CoursePlanningDTO save(CoursePlanningDTO coursePlanningDTO);

    /**
     * Updates a coursePlanning.
     *
     * @param coursePlanningDTO the entity to update.
     * @return the persisted entity.
     */
    CoursePlanningDTO update(CoursePlanningDTO coursePlanningDTO);

    /**
     * Partially updates a coursePlanning.
     *
     * @param coursePlanningDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CoursePlanningDTO> partialUpdate(CoursePlanningDTO coursePlanningDTO);

    /**
     * Get all the coursePlannings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CoursePlanningDTO> findAll(Pageable pageable);

    /**
     * Get all the coursePlannings with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CoursePlanningDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" coursePlanning.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CoursePlanningDTO> findOne(String id);

    /**
     * Delete the "id" coursePlanning.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

package co.edu.sena.service;

import co.edu.sena.service.dto.PlanningActivityDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.PlanningActivity}.
 */
public interface PlanningActivityService {
    /**
     * Save a planningActivity.
     *
     * @param planningActivityDTO the entity to save.
     * @return the persisted entity.
     */
    PlanningActivityDTO save(PlanningActivityDTO planningActivityDTO);

    /**
     * Updates a planningActivity.
     *
     * @param planningActivityDTO the entity to update.
     * @return the persisted entity.
     */
    PlanningActivityDTO update(PlanningActivityDTO planningActivityDTO);

    /**
     * Partially updates a planningActivity.
     *
     * @param planningActivityDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PlanningActivityDTO> partialUpdate(PlanningActivityDTO planningActivityDTO);

    /**
     * Get all the planningActivities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PlanningActivityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" planningActivity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlanningActivityDTO> findOne(String id);

    /**
     * Delete the "id" planningActivity.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

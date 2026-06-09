package co.edu.sena.service;

import co.edu.sena.service.dto.WorkingDayDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.WorkingDay}.
 */
public interface WorkingDayService {
    /**
     * Save a workingDay.
     *
     * @param workingDayDTO the entity to save.
     * @return the persisted entity.
     */
    WorkingDayDTO save(WorkingDayDTO workingDayDTO);

    /**
     * Updates a workingDay.
     *
     * @param workingDayDTO the entity to update.
     * @return the persisted entity.
     */
    WorkingDayDTO update(WorkingDayDTO workingDayDTO);

    /**
     * Partially updates a workingDay.
     *
     * @param workingDayDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WorkingDayDTO> partialUpdate(WorkingDayDTO workingDayDTO);

    /**
     * Get all the workingDays.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WorkingDayDTO> findAll(Pageable pageable);

    /**
     * Get all the workingDays with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WorkingDayDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" workingDay.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WorkingDayDTO> findOne(String id);

    /**
     * Delete the "id" workingDay.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

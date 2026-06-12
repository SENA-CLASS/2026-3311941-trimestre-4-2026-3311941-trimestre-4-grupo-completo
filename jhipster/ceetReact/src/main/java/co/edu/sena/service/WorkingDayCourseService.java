package co.edu.sena.service;

import co.edu.sena.service.dto.WorkingDayCourseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.WorkingDayCourse}.
 */
public interface WorkingDayCourseService {
    /**
     * Save a workingDayCourse.
     *
     * @param workingDayCourseDTO the entity to save.
     * @return the persisted entity.
     */
    WorkingDayCourseDTO save(WorkingDayCourseDTO workingDayCourseDTO);

    /**
     * Updates a workingDayCourse.
     *
     * @param workingDayCourseDTO the entity to update.
     * @return the persisted entity.
     */
    WorkingDayCourseDTO update(WorkingDayCourseDTO workingDayCourseDTO);

    /**
     * Partially updates a workingDayCourse.
     *
     * @param workingDayCourseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WorkingDayCourseDTO> partialUpdate(WorkingDayCourseDTO workingDayCourseDTO);

    /**
     * Get all the workingDayCourses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WorkingDayCourseDTO> findAll(Pageable pageable);

    /**
     * Get the "id" workingDayCourse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WorkingDayCourseDTO> findOne(String id);

    /**
     * Delete the "id" workingDayCourse.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

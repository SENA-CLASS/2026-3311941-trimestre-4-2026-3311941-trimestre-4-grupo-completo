package co.edu.sena.service;

import co.edu.sena.service.dto.CheckListCourseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.CheckListCourse}.
 */
public interface CheckListCourseService {
    /**
     * Save a checkListCourse.
     *
     * @param checkListCourseDTO the entity to save.
     * @return the persisted entity.
     */
    CheckListCourseDTO save(CheckListCourseDTO checkListCourseDTO);

    /**
     * Updates a checkListCourse.
     *
     * @param checkListCourseDTO the entity to update.
     * @return the persisted entity.
     */
    CheckListCourseDTO update(CheckListCourseDTO checkListCourseDTO);

    /**
     * Partially updates a checkListCourse.
     *
     * @param checkListCourseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CheckListCourseDTO> partialUpdate(CheckListCourseDTO checkListCourseDTO);

    /**
     * Get all the checkListCourses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CheckListCourseDTO> findAll(Pageable pageable);

    /**
     * Get the "id" checkListCourse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CheckListCourseDTO> findOne(String id);

    /**
     * Delete the "id" checkListCourse.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

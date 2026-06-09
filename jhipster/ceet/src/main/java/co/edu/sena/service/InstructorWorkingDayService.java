package co.edu.sena.service;

import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.InstructorWorkingDay}.
 */
public interface InstructorWorkingDayService {
    /**
     * Save a instructorWorkingDay.
     *
     * @param instructorWorkingDayDTO the entity to save.
     * @return the persisted entity.
     */
    InstructorWorkingDayDTO save(InstructorWorkingDayDTO instructorWorkingDayDTO);

    /**
     * Updates a instructorWorkingDay.
     *
     * @param instructorWorkingDayDTO the entity to update.
     * @return the persisted entity.
     */
    InstructorWorkingDayDTO update(InstructorWorkingDayDTO instructorWorkingDayDTO);

    /**
     * Partially updates a instructorWorkingDay.
     *
     * @param instructorWorkingDayDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InstructorWorkingDayDTO> partialUpdate(InstructorWorkingDayDTO instructorWorkingDayDTO);

    /**
     * Get all the instructorWorkingDays.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InstructorWorkingDayDTO> findAll(Pageable pageable);

    /**
     * Get the "id" instructorWorkingDay.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InstructorWorkingDayDTO> findOne(String id);

    /**
     * Delete the "id" instructorWorkingDay.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

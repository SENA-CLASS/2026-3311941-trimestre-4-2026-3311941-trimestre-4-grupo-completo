package co.edu.sena.service;

import co.edu.sena.service.dto.ClassroomLimitationDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ClassroomLimitation}.
 */
public interface ClassroomLimitationService {
    /**
     * Save a classroomLimitation.
     *
     * @param classroomLimitationDTO the entity to save.
     * @return the persisted entity.
     */
    ClassroomLimitationDTO save(ClassroomLimitationDTO classroomLimitationDTO);

    /**
     * Updates a classroomLimitation.
     *
     * @param classroomLimitationDTO the entity to update.
     * @return the persisted entity.
     */
    ClassroomLimitationDTO update(ClassroomLimitationDTO classroomLimitationDTO);

    /**
     * Partially updates a classroomLimitation.
     *
     * @param classroomLimitationDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ClassroomLimitationDTO> partialUpdate(ClassroomLimitationDTO classroomLimitationDTO);

    /**
     * Get all the classroomLimitations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ClassroomLimitationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" classroomLimitation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ClassroomLimitationDTO> findOne(String id);

    /**
     * Delete the "id" classroomLimitation.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

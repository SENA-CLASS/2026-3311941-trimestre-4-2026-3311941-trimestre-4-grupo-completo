package co.edu.sena.service;

import co.edu.sena.service.dto.AreaInstructorDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.AreaInstructor}.
 */
public interface AreaInstructorService {
    /**
     * Save a areaInstructor.
     *
     * @param areaInstructorDTO the entity to save.
     * @return the persisted entity.
     */
    AreaInstructorDTO save(AreaInstructorDTO areaInstructorDTO);

    /**
     * Updates a areaInstructor.
     *
     * @param areaInstructorDTO the entity to update.
     * @return the persisted entity.
     */
    AreaInstructorDTO update(AreaInstructorDTO areaInstructorDTO);

    /**
     * Partially updates a areaInstructor.
     *
     * @param areaInstructorDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AreaInstructorDTO> partialUpdate(AreaInstructorDTO areaInstructorDTO);

    /**
     * Get all the areaInstructors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AreaInstructorDTO> findAll(Pageable pageable);

    /**
     * Get all the areaInstructors with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AreaInstructorDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" areaInstructor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AreaInstructorDTO> findOne(String id);

    /**
     * Delete the "id" areaInstructor.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

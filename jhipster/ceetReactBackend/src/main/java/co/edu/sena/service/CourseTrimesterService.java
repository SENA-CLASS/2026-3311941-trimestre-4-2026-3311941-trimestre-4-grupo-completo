package co.edu.sena.service;

import co.edu.sena.service.dto.CourseTrimesterDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.CourseTrimester}.
 */
public interface CourseTrimesterService {
    /**
     * Save a courseTrimester.
     *
     * @param courseTrimesterDTO the entity to save.
     * @return the persisted entity.
     */
    CourseTrimesterDTO save(CourseTrimesterDTO courseTrimesterDTO);

    /**
     * Updates a courseTrimester.
     *
     * @param courseTrimesterDTO the entity to update.
     * @return the persisted entity.
     */
    CourseTrimesterDTO update(CourseTrimesterDTO courseTrimesterDTO);

    /**
     * Partially updates a courseTrimester.
     *
     * @param courseTrimesterDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CourseTrimesterDTO> partialUpdate(CourseTrimesterDTO courseTrimesterDTO);

    /**
     * Get all the courseTrimesters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseTrimesterDTO> findAll(Pageable pageable);

    /**
     * Get all the courseTrimesters with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CourseTrimesterDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" courseTrimester.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CourseTrimesterDTO> findOne(String id);

    /**
     * Delete the "id" courseTrimester.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

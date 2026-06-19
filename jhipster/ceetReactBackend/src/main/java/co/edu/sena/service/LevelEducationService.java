package co.edu.sena.service;

import co.edu.sena.service.dto.LevelEducationDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.LevelEducation}.
 */
public interface LevelEducationService {
    /**
     * Save a levelEducation.
     *
     * @param levelEducationDTO the entity to save.
     * @return the persisted entity.
     */
    LevelEducationDTO save(LevelEducationDTO levelEducationDTO);

    /**
     * Updates a levelEducation.
     *
     * @param levelEducationDTO the entity to update.
     * @return the persisted entity.
     */
    LevelEducationDTO update(LevelEducationDTO levelEducationDTO);

    /**
     * Partially updates a levelEducation.
     *
     * @param levelEducationDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LevelEducationDTO> partialUpdate(LevelEducationDTO levelEducationDTO);

    /**
     * Get all the levelEducations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LevelEducationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" levelEducation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LevelEducationDTO> findOne(String id);

    /**
     * Delete the "id" levelEducation.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

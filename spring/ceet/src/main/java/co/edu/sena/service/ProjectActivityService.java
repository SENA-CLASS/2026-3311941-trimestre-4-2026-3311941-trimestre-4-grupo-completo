package co.edu.sena.service;

import co.edu.sena.service.dto.ProjectActivityDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ProjectActivity}.
 */
public interface ProjectActivityService {
    /**
     * Save a projectActivity.
     *
     * @param projectActivityDTO the entity to save.
     * @return the persisted entity.
     */
    ProjectActivityDTO save(ProjectActivityDTO projectActivityDTO);

    /**
     * Updates a projectActivity.
     *
     * @param projectActivityDTO the entity to update.
     * @return the persisted entity.
     */
    ProjectActivityDTO update(ProjectActivityDTO projectActivityDTO);

    /**
     * Partially updates a projectActivity.
     *
     * @param projectActivityDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProjectActivityDTO> partialUpdate(ProjectActivityDTO projectActivityDTO);

    /**
     * Get all the projectActivities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectActivityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" projectActivity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectActivityDTO> findOne(String id);

    /**
     * Delete the "id" projectActivity.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

package co.edu.sena.service;

import co.edu.sena.service.dto.ProjectPhaseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ProjectPhase}.
 */
public interface ProjectPhaseService {
    /**
     * Save a projectPhase.
     *
     * @param projectPhaseDTO the entity to save.
     * @return the persisted entity.
     */
    ProjectPhaseDTO save(ProjectPhaseDTO projectPhaseDTO);

    /**
     * Updates a projectPhase.
     *
     * @param projectPhaseDTO the entity to update.
     * @return the persisted entity.
     */
    ProjectPhaseDTO update(ProjectPhaseDTO projectPhaseDTO);

    /**
     * Partially updates a projectPhase.
     *
     * @param projectPhaseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProjectPhaseDTO> partialUpdate(ProjectPhaseDTO projectPhaseDTO);

    /**
     * Get all the projectPhases.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectPhaseDTO> findAll(Pageable pageable);

    /**
     * Get all the projectPhases with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectPhaseDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" projectPhase.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectPhaseDTO> findOne(String id);

    /**
     * Delete the "id" projectPhase.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

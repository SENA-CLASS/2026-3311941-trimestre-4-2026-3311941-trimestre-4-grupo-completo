package co.edu.sena.service;

import co.edu.sena.service.dto.ProjectGroupDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ProjectGroup}.
 */
public interface ProjectGroupService {
    /**
     * Save a projectGroup.
     *
     * @param projectGroupDTO the entity to save.
     * @return the persisted entity.
     */
    ProjectGroupDTO save(ProjectGroupDTO projectGroupDTO);

    /**
     * Updates a projectGroup.
     *
     * @param projectGroupDTO the entity to update.
     * @return the persisted entity.
     */
    ProjectGroupDTO update(ProjectGroupDTO projectGroupDTO);

    /**
     * Partially updates a projectGroup.
     *
     * @param projectGroupDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProjectGroupDTO> partialUpdate(ProjectGroupDTO projectGroupDTO);

    /**
     * Get all the projectGroups.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectGroupDTO> findAll(Pageable pageable);

    /**
     * Get all the projectGroups with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectGroupDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" projectGroup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectGroupDTO> findOne(String id);

    /**
     * Delete the "id" projectGroup.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

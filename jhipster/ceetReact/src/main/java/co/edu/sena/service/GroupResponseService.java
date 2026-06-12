package co.edu.sena.service;

import co.edu.sena.service.dto.GroupResponseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.GroupResponse}.
 */
public interface GroupResponseService {
    /**
     * Save a groupResponse.
     *
     * @param groupResponseDTO the entity to save.
     * @return the persisted entity.
     */
    GroupResponseDTO save(GroupResponseDTO groupResponseDTO);

    /**
     * Updates a groupResponse.
     *
     * @param groupResponseDTO the entity to update.
     * @return the persisted entity.
     */
    GroupResponseDTO update(GroupResponseDTO groupResponseDTO);

    /**
     * Partially updates a groupResponse.
     *
     * @param groupResponseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GroupResponseDTO> partialUpdate(GroupResponseDTO groupResponseDTO);

    /**
     * Get all the groupResponses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GroupResponseDTO> findAll(Pageable pageable);

    /**
     * Get all the groupResponses with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GroupResponseDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" groupResponse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GroupResponseDTO> findOne(String id);

    /**
     * Delete the "id" groupResponse.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

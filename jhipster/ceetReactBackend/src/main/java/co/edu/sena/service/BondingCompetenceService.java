package co.edu.sena.service;

import co.edu.sena.service.dto.BondingCompetenceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.BondingCompetence}.
 */
public interface BondingCompetenceService {
    /**
     * Save a bondingCompetence.
     *
     * @param bondingCompetenceDTO the entity to save.
     * @return the persisted entity.
     */
    BondingCompetenceDTO save(BondingCompetenceDTO bondingCompetenceDTO);

    /**
     * Updates a bondingCompetence.
     *
     * @param bondingCompetenceDTO the entity to update.
     * @return the persisted entity.
     */
    BondingCompetenceDTO update(BondingCompetenceDTO bondingCompetenceDTO);

    /**
     * Partially updates a bondingCompetence.
     *
     * @param bondingCompetenceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BondingCompetenceDTO> partialUpdate(BondingCompetenceDTO bondingCompetenceDTO);

    /**
     * Get all the bondingCompetences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BondingCompetenceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bondingCompetence.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BondingCompetenceDTO> findOne(String id);

    /**
     * Delete the "id" bondingCompetence.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

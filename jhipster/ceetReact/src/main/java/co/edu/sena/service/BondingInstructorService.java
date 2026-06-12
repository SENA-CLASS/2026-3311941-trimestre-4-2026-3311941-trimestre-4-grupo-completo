package co.edu.sena.service;

import co.edu.sena.service.dto.BondingInstructorDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.BondingInstructor}.
 */
public interface BondingInstructorService {
    /**
     * Save a bondingInstructor.
     *
     * @param bondingInstructorDTO the entity to save.
     * @return the persisted entity.
     */
    BondingInstructorDTO save(BondingInstructorDTO bondingInstructorDTO);

    /**
     * Updates a bondingInstructor.
     *
     * @param bondingInstructorDTO the entity to update.
     * @return the persisted entity.
     */
    BondingInstructorDTO update(BondingInstructorDTO bondingInstructorDTO);

    /**
     * Partially updates a bondingInstructor.
     *
     * @param bondingInstructorDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BondingInstructorDTO> partialUpdate(BondingInstructorDTO bondingInstructorDTO);

    /**
     * Get all the bondingInstructors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BondingInstructorDTO> findAll(Pageable pageable);

    /**
     * Get all the bondingInstructors with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BondingInstructorDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" bondingInstructor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BondingInstructorDTO> findOne(String id);

    /**
     * Delete the "id" bondingInstructor.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

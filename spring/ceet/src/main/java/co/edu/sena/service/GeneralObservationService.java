package co.edu.sena.service;

import co.edu.sena.service.dto.GeneralObservationDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.GeneralObservation}.
 */
public interface GeneralObservationService {
    /**
     * Save a generalObservation.
     *
     * @param generalObservationDTO the entity to save.
     * @return the persisted entity.
     */
    GeneralObservationDTO save(GeneralObservationDTO generalObservationDTO);

    /**
     * Updates a generalObservation.
     *
     * @param generalObservationDTO the entity to update.
     * @return the persisted entity.
     */
    GeneralObservationDTO update(GeneralObservationDTO generalObservationDTO);

    /**
     * Partially updates a generalObservation.
     *
     * @param generalObservationDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<GeneralObservationDTO> partialUpdate(GeneralObservationDTO generalObservationDTO);

    /**
     * Get all the generalObservations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<GeneralObservationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" generalObservation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GeneralObservationDTO> findOne(String id);

    /**
     * Delete the "id" generalObservation.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

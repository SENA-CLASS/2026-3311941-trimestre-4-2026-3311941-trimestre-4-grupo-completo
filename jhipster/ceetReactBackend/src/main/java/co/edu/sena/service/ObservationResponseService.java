package co.edu.sena.service;

import co.edu.sena.service.dto.ObservationResponseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.ObservationResponse}.
 */
public interface ObservationResponseService {
    /**
     * Save a observationResponse.
     *
     * @param observationResponseDTO the entity to save.
     * @return the persisted entity.
     */
    ObservationResponseDTO save(ObservationResponseDTO observationResponseDTO);

    /**
     * Updates a observationResponse.
     *
     * @param observationResponseDTO the entity to update.
     * @return the persisted entity.
     */
    ObservationResponseDTO update(ObservationResponseDTO observationResponseDTO);

    /**
     * Partially updates a observationResponse.
     *
     * @param observationResponseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ObservationResponseDTO> partialUpdate(ObservationResponseDTO observationResponseDTO);

    /**
     * Get all the observationResponses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ObservationResponseDTO> findAll(Pageable pageable);

    /**
     * Get the "id" observationResponse.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ObservationResponseDTO> findOne(String id);

    /**
     * Delete the "id" observationResponse.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

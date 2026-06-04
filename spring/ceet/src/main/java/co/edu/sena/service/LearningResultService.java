package co.edu.sena.service;

import co.edu.sena.service.dto.LearningResultDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.LearningResult}.
 */
public interface LearningResultService {
    /**
     * Save a learningResult.
     *
     * @param learningResultDTO the entity to save.
     * @return the persisted entity.
     */
    LearningResultDTO save(LearningResultDTO learningResultDTO);

    /**
     * Updates a learningResult.
     *
     * @param learningResultDTO the entity to update.
     * @return the persisted entity.
     */
    LearningResultDTO update(LearningResultDTO learningResultDTO);

    /**
     * Partially updates a learningResult.
     *
     * @param learningResultDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LearningResultDTO> partialUpdate(LearningResultDTO learningResultDTO);

    /**
     * Get all the learningResults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LearningResultDTO> findAll(Pageable pageable);

    /**
     * Get the "id" learningResult.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LearningResultDTO> findOne(String id);

    /**
     * Delete the "id" learningResult.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

package co.edu.sena.service;

import co.edu.sena.service.dto.LearningCompetenceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.LearningCompetence}.
 */
public interface LearningCompetenceService {
    /**
     * Save a learningCompetence.
     *
     * @param learningCompetenceDTO the entity to save.
     * @return the persisted entity.
     */
    LearningCompetenceDTO save(LearningCompetenceDTO learningCompetenceDTO);

    /**
     * Updates a learningCompetence.
     *
     * @param learningCompetenceDTO the entity to update.
     * @return the persisted entity.
     */
    LearningCompetenceDTO update(LearningCompetenceDTO learningCompetenceDTO);

    /**
     * Partially updates a learningCompetence.
     *
     * @param learningCompetenceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LearningCompetenceDTO> partialUpdate(LearningCompetenceDTO learningCompetenceDTO);

    /**
     * Get all the learningCompetences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LearningCompetenceDTO> findAll(Pageable pageable);

    /**
     * Get the "id" learningCompetence.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LearningCompetenceDTO> findOne(String id);

    /**
     * Delete the "id" learningCompetence.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

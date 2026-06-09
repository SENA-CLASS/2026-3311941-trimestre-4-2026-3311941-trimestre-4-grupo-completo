package co.edu.sena.service;

import co.edu.sena.service.dto.QuarterScheduleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.QuarterSchedule}.
 */
public interface QuarterScheduleService {
    /**
     * Save a quarterSchedule.
     *
     * @param quarterScheduleDTO the entity to save.
     * @return the persisted entity.
     */
    QuarterScheduleDTO save(QuarterScheduleDTO quarterScheduleDTO);

    /**
     * Updates a quarterSchedule.
     *
     * @param quarterScheduleDTO the entity to update.
     * @return the persisted entity.
     */
    QuarterScheduleDTO update(QuarterScheduleDTO quarterScheduleDTO);

    /**
     * Partially updates a quarterSchedule.
     *
     * @param quarterScheduleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<QuarterScheduleDTO> partialUpdate(QuarterScheduleDTO quarterScheduleDTO);

    /**
     * Get all the quarterSchedules.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuarterScheduleDTO> findAll(Pageable pageable);

    /**
     * Get all the quarterSchedules with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuarterScheduleDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" quarterSchedule.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuarterScheduleDTO> findOne(String id);

    /**
     * Delete the "id" quarterSchedule.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

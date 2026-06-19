package co.edu.sena.service;

import co.edu.sena.service.dto.CheckListDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link co.edu.sena.domain.CheckList}.
 */
public interface CheckListService {
    /**
     * Save a checkList.
     *
     * @param checkListDTO the entity to save.
     * @return the persisted entity.
     */
    CheckListDTO save(CheckListDTO checkListDTO);

    /**
     * Updates a checkList.
     *
     * @param checkListDTO the entity to update.
     * @return the persisted entity.
     */
    CheckListDTO update(CheckListDTO checkListDTO);

    /**
     * Partially updates a checkList.
     *
     * @param checkListDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CheckListDTO> partialUpdate(CheckListDTO checkListDTO);

    /**
     * Get all the checkLists.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CheckListDTO> findAll(Pageable pageable);

    /**
     * Get the "id" checkList.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CheckListDTO> findOne(String id);

    /**
     * Delete the "id" checkList.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}

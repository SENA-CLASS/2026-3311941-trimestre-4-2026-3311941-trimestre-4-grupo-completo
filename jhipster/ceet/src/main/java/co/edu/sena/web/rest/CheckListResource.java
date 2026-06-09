package co.edu.sena.web.rest;

import co.edu.sena.repository.CheckListRepository;
import co.edu.sena.service.CheckListService;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link co.edu.sena.domain.CheckList}.
 */
@RestController
@RequestMapping("/api/check-lists")
public class CheckListResource {

    private static final Logger LOG = LoggerFactory.getLogger(CheckListResource.class);

    private static final String ENTITY_NAME = "checkList";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final CheckListService checkListService;

    private final CheckListRepository checkListRepository;

    public CheckListResource(CheckListService checkListService, CheckListRepository checkListRepository) {
        this.checkListService = checkListService;
        this.checkListRepository = checkListRepository;
    }

    /**
     * {@code POST  /check-lists} : Create a new checkList.
     *
     * @param checkListDTO the checkListDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new checkListDTO, or with status {@code 400 (Bad Request)} if the checkList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CheckListDTO> createCheckList(@Valid @RequestBody CheckListDTO checkListDTO) throws URISyntaxException {
        LOG.debug("REST request to save CheckList : {}", checkListDTO);
        if (checkListDTO.getId() != null) {
            throw new BadRequestAlertException("A new checkList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        checkListDTO = checkListService.save(checkListDTO);
        return ResponseEntity.created(new URI("/api/check-lists/" + checkListDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, checkListDTO.getId()))
            .body(checkListDTO);
    }

    /**
     * {@code PUT  /check-lists/:id} : Updates an existing checkList.
     *
     * @param id the id of the checkListDTO to save.
     * @param checkListDTO the checkListDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated checkListDTO,
     * or with status {@code 400 (Bad Request)} if the checkListDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the checkListDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CheckListDTO> updateCheckList(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CheckListDTO checkListDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CheckList : {}, {}", id, checkListDTO);
        if (checkListDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, checkListDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!checkListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        checkListDTO = checkListService.update(checkListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, checkListDTO.getId()))
            .body(checkListDTO);
    }

    /**
     * {@code PATCH  /check-lists/:id} : Partial updates given fields of an existing checkList, field will ignore if it is null
     *
     * @param id the id of the checkListDTO to save.
     * @param checkListDTO the checkListDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated checkListDTO,
     * or with status {@code 400 (Bad Request)} if the checkListDTO is not valid,
     * or with status {@code 404 (Not Found)} if the checkListDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the checkListDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CheckListDTO> partialUpdateCheckList(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CheckListDTO checkListDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CheckList partially : {}, {}", id, checkListDTO);
        if (checkListDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, checkListDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!checkListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CheckListDTO> result = checkListService.partialUpdate(checkListDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, checkListDTO.getId())
        );
    }

    /**
     * {@code GET  /check-lists} : get all the Check Lists.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Check Lists in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CheckListDTO>> getAllCheckLists(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of CheckLists");
        Page<CheckListDTO> page = checkListService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /check-lists/:id} : get the "id" checkList.
     *
     * @param id the id of the checkListDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the checkListDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CheckListDTO> getCheckList(@PathVariable("id") String id) {
        LOG.debug("REST request to get CheckList : {}", id);
        Optional<CheckListDTO> checkListDTO = checkListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(checkListDTO);
    }

    /**
     * {@code DELETE  /check-lists/:id} : delete the "id" checkList.
     *
     * @param id the id of the checkListDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCheckList(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CheckList : {}", id);
        checkListService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

package co.edu.sena.web.rest;

import co.edu.sena.repository.WorkingDayRepository;
import co.edu.sena.service.WorkingDayService;
import co.edu.sena.service.dto.WorkingDayDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.WorkingDay}.
 */
@RestController
@RequestMapping("/api/working-days")
public class WorkingDayResource {

    private static final Logger LOG = LoggerFactory.getLogger(WorkingDayResource.class);

    private static final String ENTITY_NAME = "workingDay";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final WorkingDayService workingDayService;

    private final WorkingDayRepository workingDayRepository;

    public WorkingDayResource(WorkingDayService workingDayService, WorkingDayRepository workingDayRepository) {
        this.workingDayService = workingDayService;
        this.workingDayRepository = workingDayRepository;
    }

    /**
     * {@code POST  /working-days} : Create a new workingDay.
     *
     * @param workingDayDTO the workingDayDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workingDayDTO, or with status {@code 400 (Bad Request)} if the workingDay has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WorkingDayDTO> createWorkingDay(@Valid @RequestBody WorkingDayDTO workingDayDTO) throws URISyntaxException {
        LOG.debug("REST request to save WorkingDay : {}", workingDayDTO);
        if (workingDayDTO.getId() != null) {
            throw new BadRequestAlertException("A new workingDay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        workingDayDTO = workingDayService.save(workingDayDTO);
        return ResponseEntity.created(new URI("/api/working-days/" + workingDayDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, workingDayDTO.getId()))
            .body(workingDayDTO);
    }

    /**
     * {@code PUT  /working-days/:id} : Updates an existing workingDay.
     *
     * @param id the id of the workingDayDTO to save.
     * @param workingDayDTO the workingDayDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workingDayDTO,
     * or with status {@code 400 (Bad Request)} if the workingDayDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workingDayDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WorkingDayDTO> updateWorkingDay(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody WorkingDayDTO workingDayDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update WorkingDay : {}, {}", id, workingDayDTO);
        if (workingDayDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workingDayDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workingDayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        workingDayDTO = workingDayService.update(workingDayDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workingDayDTO.getId()))
            .body(workingDayDTO);
    }

    /**
     * {@code PATCH  /working-days/:id} : Partial updates given fields of an existing workingDay, field will ignore if it is null
     *
     * @param id the id of the workingDayDTO to save.
     * @param workingDayDTO the workingDayDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workingDayDTO,
     * or with status {@code 400 (Bad Request)} if the workingDayDTO is not valid,
     * or with status {@code 404 (Not Found)} if the workingDayDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the workingDayDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WorkingDayDTO> partialUpdateWorkingDay(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody WorkingDayDTO workingDayDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update WorkingDay partially : {}, {}", id, workingDayDTO);
        if (workingDayDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workingDayDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workingDayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WorkingDayDTO> result = workingDayService.partialUpdate(workingDayDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workingDayDTO.getId())
        );
    }

    /**
     * {@code GET  /working-days} : get all the Working Days.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Working Days in body.
     */
    @GetMapping("")
    public ResponseEntity<List<WorkingDayDTO>> getAllWorkingDays(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of WorkingDays");
        Page<WorkingDayDTO> page;
        if (eagerload) {
            page = workingDayService.findAllWithEagerRelationships(pageable);
        } else {
            page = workingDayService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /working-days/:id} : get the "id" workingDay.
     *
     * @param id the id of the workingDayDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workingDayDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WorkingDayDTO> getWorkingDay(@PathVariable("id") String id) {
        LOG.debug("REST request to get WorkingDay : {}", id);
        Optional<WorkingDayDTO> workingDayDTO = workingDayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(workingDayDTO);
    }

    /**
     * {@code DELETE  /working-days/:id} : delete the "id" workingDay.
     *
     * @param id the id of the workingDayDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkingDay(@PathVariable("id") String id) {
        LOG.debug("REST request to delete WorkingDay : {}", id);
        workingDayService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

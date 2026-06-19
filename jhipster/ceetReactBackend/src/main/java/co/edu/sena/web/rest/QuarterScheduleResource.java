package co.edu.sena.web.rest;

import co.edu.sena.repository.QuarterScheduleRepository;
import co.edu.sena.service.QuarterScheduleService;
import co.edu.sena.service.dto.QuarterScheduleDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.QuarterSchedule}.
 */
@RestController
@RequestMapping("/api/quarter-schedules")
public class QuarterScheduleResource {

    private static final Logger LOG = LoggerFactory.getLogger(QuarterScheduleResource.class);

    private static final String ENTITY_NAME = "quarterSchedule";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final QuarterScheduleService quarterScheduleService;

    private final QuarterScheduleRepository quarterScheduleRepository;

    public QuarterScheduleResource(QuarterScheduleService quarterScheduleService, QuarterScheduleRepository quarterScheduleRepository) {
        this.quarterScheduleService = quarterScheduleService;
        this.quarterScheduleRepository = quarterScheduleRepository;
    }

    /**
     * {@code POST  /quarter-schedules} : Create a new quarterSchedule.
     *
     * @param quarterScheduleDTO the quarterScheduleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quarterScheduleDTO, or with status {@code 400 (Bad Request)} if the quarterSchedule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuarterScheduleDTO> createQuarterSchedule(@Valid @RequestBody QuarterScheduleDTO quarterScheduleDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save QuarterSchedule : {}", quarterScheduleDTO);
        if (quarterScheduleDTO.getId() != null) {
            throw new BadRequestAlertException("A new quarterSchedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        quarterScheduleDTO = quarterScheduleService.save(quarterScheduleDTO);
        return ResponseEntity.created(new URI("/api/quarter-schedules/" + quarterScheduleDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, quarterScheduleDTO.getId()))
            .body(quarterScheduleDTO);
    }

    /**
     * {@code PUT  /quarter-schedules/:id} : Updates an existing quarterSchedule.
     *
     * @param id the id of the quarterScheduleDTO to save.
     * @param quarterScheduleDTO the quarterScheduleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quarterScheduleDTO,
     * or with status {@code 400 (Bad Request)} if the quarterScheduleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quarterScheduleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuarterScheduleDTO> updateQuarterSchedule(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody QuarterScheduleDTO quarterScheduleDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update QuarterSchedule : {}, {}", id, quarterScheduleDTO);
        if (quarterScheduleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quarterScheduleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quarterScheduleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        quarterScheduleDTO = quarterScheduleService.update(quarterScheduleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quarterScheduleDTO.getId()))
            .body(quarterScheduleDTO);
    }

    /**
     * {@code PATCH  /quarter-schedules/:id} : Partial updates given fields of an existing quarterSchedule, field will ignore if it is null
     *
     * @param id the id of the quarterScheduleDTO to save.
     * @param quarterScheduleDTO the quarterScheduleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quarterScheduleDTO,
     * or with status {@code 400 (Bad Request)} if the quarterScheduleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the quarterScheduleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the quarterScheduleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuarterScheduleDTO> partialUpdateQuarterSchedule(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody QuarterScheduleDTO quarterScheduleDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update QuarterSchedule partially : {}, {}", id, quarterScheduleDTO);
        if (quarterScheduleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quarterScheduleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quarterScheduleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuarterScheduleDTO> result = quarterScheduleService.partialUpdate(quarterScheduleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quarterScheduleDTO.getId())
        );
    }

    /**
     * {@code GET  /quarter-schedules} : get all the Quarter Schedules.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Quarter Schedules in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuarterScheduleDTO>> getAllQuarterSchedules(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of QuarterSchedules");
        Page<QuarterScheduleDTO> page;
        if (eagerload) {
            page = quarterScheduleService.findAllWithEagerRelationships(pageable);
        } else {
            page = quarterScheduleService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quarter-schedules/:id} : get the "id" quarterSchedule.
     *
     * @param id the id of the quarterScheduleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quarterScheduleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuarterScheduleDTO> getQuarterSchedule(@PathVariable("id") String id) {
        LOG.debug("REST request to get QuarterSchedule : {}", id);
        Optional<QuarterScheduleDTO> quarterScheduleDTO = quarterScheduleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quarterScheduleDTO);
    }

    /**
     * {@code DELETE  /quarter-schedules/:id} : delete the "id" quarterSchedule.
     *
     * @param id the id of the quarterScheduleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuarterSchedule(@PathVariable("id") String id) {
        LOG.debug("REST request to delete QuarterSchedule : {}", id);
        quarterScheduleService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

package co.edu.sena.web.rest;

import co.edu.sena.repository.PlanningActivityRepository;
import co.edu.sena.service.PlanningActivityService;
import co.edu.sena.service.dto.PlanningActivityDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.PlanningActivity}.
 */
@RestController
@RequestMapping("/api/planning-activities")
public class PlanningActivityResource {

    private static final Logger LOG = LoggerFactory.getLogger(PlanningActivityResource.class);

    private static final String ENTITY_NAME = "planningActivity";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final PlanningActivityService planningActivityService;

    private final PlanningActivityRepository planningActivityRepository;

    public PlanningActivityResource(
        PlanningActivityService planningActivityService,
        PlanningActivityRepository planningActivityRepository
    ) {
        this.planningActivityService = planningActivityService;
        this.planningActivityRepository = planningActivityRepository;
    }

    /**
     * {@code POST  /planning-activities} : Create a new planningActivity.
     *
     * @param planningActivityDTO the planningActivityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planningActivityDTO, or with status {@code 400 (Bad Request)} if the planningActivity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<PlanningActivityDTO> createPlanningActivity(@Valid @RequestBody PlanningActivityDTO planningActivityDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save PlanningActivity : {}", planningActivityDTO);
        if (planningActivityDTO.getId() != null) {
            throw new BadRequestAlertException("A new planningActivity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        planningActivityDTO = planningActivityService.save(planningActivityDTO);
        return ResponseEntity.created(new URI("/api/planning-activities/" + planningActivityDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, planningActivityDTO.getId()))
            .body(planningActivityDTO);
    }

    /**
     * {@code PUT  /planning-activities/:id} : Updates an existing planningActivity.
     *
     * @param id the id of the planningActivityDTO to save.
     * @param planningActivityDTO the planningActivityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planningActivityDTO,
     * or with status {@code 400 (Bad Request)} if the planningActivityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planningActivityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<PlanningActivityDTO> updatePlanningActivity(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody PlanningActivityDTO planningActivityDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update PlanningActivity : {}, {}", id, planningActivityDTO);
        if (planningActivityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planningActivityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planningActivityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        planningActivityDTO = planningActivityService.update(planningActivityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planningActivityDTO.getId()))
            .body(planningActivityDTO);
    }

    /**
     * {@code PATCH  /planning-activities/:id} : Partial updates given fields of an existing planningActivity, field will ignore if it is null
     *
     * @param id the id of the planningActivityDTO to save.
     * @param planningActivityDTO the planningActivityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planningActivityDTO,
     * or with status {@code 400 (Bad Request)} if the planningActivityDTO is not valid,
     * or with status {@code 404 (Not Found)} if the planningActivityDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the planningActivityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanningActivityDTO> partialUpdatePlanningActivity(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody PlanningActivityDTO planningActivityDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update PlanningActivity partially : {}, {}", id, planningActivityDTO);
        if (planningActivityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planningActivityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planningActivityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanningActivityDTO> result = planningActivityService.partialUpdate(planningActivityDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planningActivityDTO.getId())
        );
    }

    /**
     * {@code GET  /planning-activities} : get all the Planning Activities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Planning Activities in body.
     */
    @GetMapping("")
    public ResponseEntity<List<PlanningActivityDTO>> getAllPlanningActivities(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of PlanningActivities");
        Page<PlanningActivityDTO> page = planningActivityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /planning-activities/:id} : get the "id" planningActivity.
     *
     * @param id the id of the planningActivityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planningActivityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<PlanningActivityDTO> getPlanningActivity(@PathVariable("id") String id) {
        LOG.debug("REST request to get PlanningActivity : {}", id);
        Optional<PlanningActivityDTO> planningActivityDTO = planningActivityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(planningActivityDTO);
    }

    /**
     * {@code DELETE  /planning-activities/:id} : delete the "id" planningActivity.
     *
     * @param id the id of the planningActivityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanningActivity(@PathVariable("id") String id) {
        LOG.debug("REST request to delete PlanningActivity : {}", id);
        planningActivityService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

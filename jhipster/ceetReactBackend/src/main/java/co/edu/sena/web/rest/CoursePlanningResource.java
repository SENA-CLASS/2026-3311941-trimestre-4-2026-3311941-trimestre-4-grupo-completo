package co.edu.sena.web.rest;

import co.edu.sena.repository.CoursePlanningRepository;
import co.edu.sena.service.CoursePlanningService;
import co.edu.sena.service.dto.CoursePlanningDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.CoursePlanning}.
 */
@RestController
@RequestMapping("/api/course-plannings")
public class CoursePlanningResource {

    private static final Logger LOG = LoggerFactory.getLogger(CoursePlanningResource.class);

    private static final String ENTITY_NAME = "coursePlanning";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final CoursePlanningService coursePlanningService;

    private final CoursePlanningRepository coursePlanningRepository;

    public CoursePlanningResource(CoursePlanningService coursePlanningService, CoursePlanningRepository coursePlanningRepository) {
        this.coursePlanningService = coursePlanningService;
        this.coursePlanningRepository = coursePlanningRepository;
    }

    /**
     * {@code POST  /course-plannings} : Create a new coursePlanning.
     *
     * @param coursePlanningDTO the coursePlanningDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new coursePlanningDTO, or with status {@code 400 (Bad Request)} if the coursePlanning has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CoursePlanningDTO> createCoursePlanning(@Valid @RequestBody CoursePlanningDTO coursePlanningDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CoursePlanning : {}", coursePlanningDTO);
        if (coursePlanningDTO.getId() != null) {
            throw new BadRequestAlertException("A new coursePlanning cannot already have an ID", ENTITY_NAME, "idexists");
        }
        coursePlanningDTO = coursePlanningService.save(coursePlanningDTO);
        return ResponseEntity.created(new URI("/api/course-plannings/" + coursePlanningDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, coursePlanningDTO.getId()))
            .body(coursePlanningDTO);
    }

    /**
     * {@code PUT  /course-plannings/:id} : Updates an existing coursePlanning.
     *
     * @param id the id of the coursePlanningDTO to save.
     * @param coursePlanningDTO the coursePlanningDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coursePlanningDTO,
     * or with status {@code 400 (Bad Request)} if the coursePlanningDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the coursePlanningDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CoursePlanningDTO> updateCoursePlanning(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CoursePlanningDTO coursePlanningDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CoursePlanning : {}, {}", id, coursePlanningDTO);
        if (coursePlanningDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, coursePlanningDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!coursePlanningRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        coursePlanningDTO = coursePlanningService.update(coursePlanningDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coursePlanningDTO.getId()))
            .body(coursePlanningDTO);
    }

    /**
     * {@code PATCH  /course-plannings/:id} : Partial updates given fields of an existing coursePlanning, field will ignore if it is null
     *
     * @param id the id of the coursePlanningDTO to save.
     * @param coursePlanningDTO the coursePlanningDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated coursePlanningDTO,
     * or with status {@code 400 (Bad Request)} if the coursePlanningDTO is not valid,
     * or with status {@code 404 (Not Found)} if the coursePlanningDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the coursePlanningDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CoursePlanningDTO> partialUpdateCoursePlanning(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CoursePlanningDTO coursePlanningDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CoursePlanning partially : {}, {}", id, coursePlanningDTO);
        if (coursePlanningDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, coursePlanningDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!coursePlanningRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CoursePlanningDTO> result = coursePlanningService.partialUpdate(coursePlanningDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, coursePlanningDTO.getId())
        );
    }

    /**
     * {@code GET  /course-plannings} : get all the Course Plannings.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Course Plannings in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CoursePlanningDTO>> getAllCoursePlannings(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of CoursePlannings");
        Page<CoursePlanningDTO> page;
        if (eagerload) {
            page = coursePlanningService.findAllWithEagerRelationships(pageable);
        } else {
            page = coursePlanningService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /course-plannings/:id} : get the "id" coursePlanning.
     *
     * @param id the id of the coursePlanningDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the coursePlanningDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CoursePlanningDTO> getCoursePlanning(@PathVariable("id") String id) {
        LOG.debug("REST request to get CoursePlanning : {}", id);
        Optional<CoursePlanningDTO> coursePlanningDTO = coursePlanningService.findOne(id);
        return ResponseUtil.wrapOrNotFound(coursePlanningDTO);
    }

    /**
     * {@code DELETE  /course-plannings/:id} : delete the "id" coursePlanning.
     *
     * @param id the id of the coursePlanningDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoursePlanning(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CoursePlanning : {}", id);
        coursePlanningService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

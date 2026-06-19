package co.edu.sena.web.rest;

import co.edu.sena.repository.WorkingDayCourseRepository;
import co.edu.sena.service.WorkingDayCourseService;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.WorkingDayCourse}.
 */
@RestController
@RequestMapping("/api/working-day-courses")
public class WorkingDayCourseResource {

    private static final Logger LOG = LoggerFactory.getLogger(WorkingDayCourseResource.class);

    private static final String ENTITY_NAME = "workingDayCourse";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final WorkingDayCourseService workingDayCourseService;

    private final WorkingDayCourseRepository workingDayCourseRepository;

    public WorkingDayCourseResource(
        WorkingDayCourseService workingDayCourseService,
        WorkingDayCourseRepository workingDayCourseRepository
    ) {
        this.workingDayCourseService = workingDayCourseService;
        this.workingDayCourseRepository = workingDayCourseRepository;
    }

    /**
     * {@code POST  /working-day-courses} : Create a new workingDayCourse.
     *
     * @param workingDayCourseDTO the workingDayCourseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new workingDayCourseDTO, or with status {@code 400 (Bad Request)} if the workingDayCourse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WorkingDayCourseDTO> createWorkingDayCourse(@Valid @RequestBody WorkingDayCourseDTO workingDayCourseDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save WorkingDayCourse : {}", workingDayCourseDTO);
        if (workingDayCourseDTO.getId() != null) {
            throw new BadRequestAlertException("A new workingDayCourse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        workingDayCourseDTO = workingDayCourseService.save(workingDayCourseDTO);
        return ResponseEntity.created(new URI("/api/working-day-courses/" + workingDayCourseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, workingDayCourseDTO.getId()))
            .body(workingDayCourseDTO);
    }

    /**
     * {@code PUT  /working-day-courses/:id} : Updates an existing workingDayCourse.
     *
     * @param id the id of the workingDayCourseDTO to save.
     * @param workingDayCourseDTO the workingDayCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workingDayCourseDTO,
     * or with status {@code 400 (Bad Request)} if the workingDayCourseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the workingDayCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WorkingDayCourseDTO> updateWorkingDayCourse(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody WorkingDayCourseDTO workingDayCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update WorkingDayCourse : {}, {}", id, workingDayCourseDTO);
        if (workingDayCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workingDayCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workingDayCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        workingDayCourseDTO = workingDayCourseService.update(workingDayCourseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workingDayCourseDTO.getId()))
            .body(workingDayCourseDTO);
    }

    /**
     * {@code PATCH  /working-day-courses/:id} : Partial updates given fields of an existing workingDayCourse, field will ignore if it is null
     *
     * @param id the id of the workingDayCourseDTO to save.
     * @param workingDayCourseDTO the workingDayCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated workingDayCourseDTO,
     * or with status {@code 400 (Bad Request)} if the workingDayCourseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the workingDayCourseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the workingDayCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WorkingDayCourseDTO> partialUpdateWorkingDayCourse(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody WorkingDayCourseDTO workingDayCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update WorkingDayCourse partially : {}, {}", id, workingDayCourseDTO);
        if (workingDayCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, workingDayCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!workingDayCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WorkingDayCourseDTO> result = workingDayCourseService.partialUpdate(workingDayCourseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, workingDayCourseDTO.getId())
        );
    }

    /**
     * {@code GET  /working-day-courses} : get all the Working Day Courses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Working Day Courses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<WorkingDayCourseDTO>> getAllWorkingDayCourses(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of WorkingDayCourses");
        Page<WorkingDayCourseDTO> page = workingDayCourseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /working-day-courses/:id} : get the "id" workingDayCourse.
     *
     * @param id the id of the workingDayCourseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the workingDayCourseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WorkingDayCourseDTO> getWorkingDayCourse(@PathVariable("id") String id) {
        LOG.debug("REST request to get WorkingDayCourse : {}", id);
        Optional<WorkingDayCourseDTO> workingDayCourseDTO = workingDayCourseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(workingDayCourseDTO);
    }

    /**
     * {@code DELETE  /working-day-courses/:id} : delete the "id" workingDayCourse.
     *
     * @param id the id of the workingDayCourseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkingDayCourse(@PathVariable("id") String id) {
        LOG.debug("REST request to delete WorkingDayCourse : {}", id);
        workingDayCourseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

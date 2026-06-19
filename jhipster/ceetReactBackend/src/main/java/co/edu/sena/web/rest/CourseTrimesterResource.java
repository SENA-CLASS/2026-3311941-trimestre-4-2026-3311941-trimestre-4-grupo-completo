package co.edu.sena.web.rest;

import co.edu.sena.repository.CourseTrimesterRepository;
import co.edu.sena.service.CourseTrimesterService;
import co.edu.sena.service.dto.CourseTrimesterDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.CourseTrimester}.
 */
@RestController
@RequestMapping("/api/course-trimesters")
public class CourseTrimesterResource {

    private static final Logger LOG = LoggerFactory.getLogger(CourseTrimesterResource.class);

    private static final String ENTITY_NAME = "courseTrimester";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final CourseTrimesterService courseTrimesterService;

    private final CourseTrimesterRepository courseTrimesterRepository;

    public CourseTrimesterResource(CourseTrimesterService courseTrimesterService, CourseTrimesterRepository courseTrimesterRepository) {
        this.courseTrimesterService = courseTrimesterService;
        this.courseTrimesterRepository = courseTrimesterRepository;
    }

    /**
     * {@code POST  /course-trimesters} : Create a new courseTrimester.
     *
     * @param courseTrimesterDTO the courseTrimesterDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courseTrimesterDTO, or with status {@code 400 (Bad Request)} if the courseTrimester has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CourseTrimesterDTO> createCourseTrimester(@Valid @RequestBody CourseTrimesterDTO courseTrimesterDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CourseTrimester : {}", courseTrimesterDTO);
        if (courseTrimesterDTO.getId() != null) {
            throw new BadRequestAlertException("A new courseTrimester cannot already have an ID", ENTITY_NAME, "idexists");
        }
        courseTrimesterDTO = courseTrimesterService.save(courseTrimesterDTO);
        return ResponseEntity.created(new URI("/api/course-trimesters/" + courseTrimesterDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, courseTrimesterDTO.getId()))
            .body(courseTrimesterDTO);
    }

    /**
     * {@code PUT  /course-trimesters/:id} : Updates an existing courseTrimester.
     *
     * @param id the id of the courseTrimesterDTO to save.
     * @param courseTrimesterDTO the courseTrimesterDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseTrimesterDTO,
     * or with status {@code 400 (Bad Request)} if the courseTrimesterDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courseTrimesterDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourseTrimesterDTO> updateCourseTrimester(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CourseTrimesterDTO courseTrimesterDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CourseTrimester : {}, {}", id, courseTrimesterDTO);
        if (courseTrimesterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseTrimesterDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseTrimesterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        courseTrimesterDTO = courseTrimesterService.update(courseTrimesterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseTrimesterDTO.getId()))
            .body(courseTrimesterDTO);
    }

    /**
     * {@code PATCH  /course-trimesters/:id} : Partial updates given fields of an existing courseTrimester, field will ignore if it is null
     *
     * @param id the id of the courseTrimesterDTO to save.
     * @param courseTrimesterDTO the courseTrimesterDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseTrimesterDTO,
     * or with status {@code 400 (Bad Request)} if the courseTrimesterDTO is not valid,
     * or with status {@code 404 (Not Found)} if the courseTrimesterDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the courseTrimesterDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CourseTrimesterDTO> partialUpdateCourseTrimester(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CourseTrimesterDTO courseTrimesterDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CourseTrimester partially : {}, {}", id, courseTrimesterDTO);
        if (courseTrimesterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseTrimesterDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseTrimesterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CourseTrimesterDTO> result = courseTrimesterService.partialUpdate(courseTrimesterDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseTrimesterDTO.getId())
        );
    }

    /**
     * {@code GET  /course-trimesters} : get all the Course Trimesters.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Course Trimesters in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CourseTrimesterDTO>> getAllCourseTrimesters(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of CourseTrimesters");
        Page<CourseTrimesterDTO> page;
        if (eagerload) {
            page = courseTrimesterService.findAllWithEagerRelationships(pageable);
        } else {
            page = courseTrimesterService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /course-trimesters/:id} : get the "id" courseTrimester.
     *
     * @param id the id of the courseTrimesterDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courseTrimesterDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourseTrimesterDTO> getCourseTrimester(@PathVariable("id") String id) {
        LOG.debug("REST request to get CourseTrimester : {}", id);
        Optional<CourseTrimesterDTO> courseTrimesterDTO = courseTrimesterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courseTrimesterDTO);
    }

    /**
     * {@code DELETE  /course-trimesters/:id} : delete the "id" courseTrimester.
     *
     * @param id the id of the courseTrimesterDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourseTrimester(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CourseTrimester : {}", id);
        courseTrimesterService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

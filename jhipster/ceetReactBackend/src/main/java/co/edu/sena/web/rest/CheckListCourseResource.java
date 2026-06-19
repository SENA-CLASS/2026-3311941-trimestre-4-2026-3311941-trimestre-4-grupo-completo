package co.edu.sena.web.rest;

import co.edu.sena.repository.CheckListCourseRepository;
import co.edu.sena.service.CheckListCourseService;
import co.edu.sena.service.dto.CheckListCourseDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.CheckListCourse}.
 */
@RestController
@RequestMapping("/api/check-list-courses")
public class CheckListCourseResource {

    private static final Logger LOG = LoggerFactory.getLogger(CheckListCourseResource.class);

    private static final String ENTITY_NAME = "checkListCourse";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final CheckListCourseService checkListCourseService;

    private final CheckListCourseRepository checkListCourseRepository;

    public CheckListCourseResource(CheckListCourseService checkListCourseService, CheckListCourseRepository checkListCourseRepository) {
        this.checkListCourseService = checkListCourseService;
        this.checkListCourseRepository = checkListCourseRepository;
    }

    /**
     * {@code POST  /check-list-courses} : Create a new checkListCourse.
     *
     * @param checkListCourseDTO the checkListCourseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new checkListCourseDTO, or with status {@code 400 (Bad Request)} if the checkListCourse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CheckListCourseDTO> createCheckListCourse(@Valid @RequestBody CheckListCourseDTO checkListCourseDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CheckListCourse : {}", checkListCourseDTO);
        if (checkListCourseDTO.getId() != null) {
            throw new BadRequestAlertException("A new checkListCourse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        checkListCourseDTO = checkListCourseService.save(checkListCourseDTO);
        return ResponseEntity.created(new URI("/api/check-list-courses/" + checkListCourseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, checkListCourseDTO.getId()))
            .body(checkListCourseDTO);
    }

    /**
     * {@code PUT  /check-list-courses/:id} : Updates an existing checkListCourse.
     *
     * @param id the id of the checkListCourseDTO to save.
     * @param checkListCourseDTO the checkListCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated checkListCourseDTO,
     * or with status {@code 400 (Bad Request)} if the checkListCourseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the checkListCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CheckListCourseDTO> updateCheckListCourse(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CheckListCourseDTO checkListCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CheckListCourse : {}, {}", id, checkListCourseDTO);
        if (checkListCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, checkListCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!checkListCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        checkListCourseDTO = checkListCourseService.update(checkListCourseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, checkListCourseDTO.getId()))
            .body(checkListCourseDTO);
    }

    /**
     * {@code PATCH  /check-list-courses/:id} : Partial updates given fields of an existing checkListCourse, field will ignore if it is null
     *
     * @param id the id of the checkListCourseDTO to save.
     * @param checkListCourseDTO the checkListCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated checkListCourseDTO,
     * or with status {@code 400 (Bad Request)} if the checkListCourseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the checkListCourseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the checkListCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CheckListCourseDTO> partialUpdateCheckListCourse(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CheckListCourseDTO checkListCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CheckListCourse partially : {}, {}", id, checkListCourseDTO);
        if (checkListCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, checkListCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!checkListCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CheckListCourseDTO> result = checkListCourseService.partialUpdate(checkListCourseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, checkListCourseDTO.getId())
        );
    }

    /**
     * {@code GET  /check-list-courses} : get all the Check List Courses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Check List Courses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CheckListCourseDTO>> getAllCheckListCourses(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of CheckListCourses");
        Page<CheckListCourseDTO> page = checkListCourseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /check-list-courses/:id} : get the "id" checkListCourse.
     *
     * @param id the id of the checkListCourseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the checkListCourseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CheckListCourseDTO> getCheckListCourse(@PathVariable("id") String id) {
        LOG.debug("REST request to get CheckListCourse : {}", id);
        Optional<CheckListCourseDTO> checkListCourseDTO = checkListCourseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(checkListCourseDTO);
    }

    /**
     * {@code DELETE  /check-list-courses/:id} : delete the "id" checkListCourse.
     *
     * @param id the id of the checkListCourseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCheckListCourse(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CheckListCourse : {}", id);
        checkListCourseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

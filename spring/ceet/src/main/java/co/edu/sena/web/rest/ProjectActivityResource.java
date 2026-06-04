package co.edu.sena.web.rest;

import co.edu.sena.repository.ProjectActivityRepository;
import co.edu.sena.service.ProjectActivityService;
import co.edu.sena.service.dto.ProjectActivityDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ProjectActivity}.
 */
@RestController
@RequestMapping("/api/project-activities")
public class ProjectActivityResource {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectActivityResource.class);

    private static final String ENTITY_NAME = "projectActivity";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final ProjectActivityService projectActivityService;

    private final ProjectActivityRepository projectActivityRepository;

    public ProjectActivityResource(ProjectActivityService projectActivityService, ProjectActivityRepository projectActivityRepository) {
        this.projectActivityService = projectActivityService;
        this.projectActivityRepository = projectActivityRepository;
    }

    /**
     * {@code POST  /project-activities} : Create a new projectActivity.
     *
     * @param projectActivityDTO the projectActivityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectActivityDTO, or with status {@code 400 (Bad Request)} if the projectActivity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ProjectActivityDTO> createProjectActivity(@Valid @RequestBody ProjectActivityDTO projectActivityDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save ProjectActivity : {}", projectActivityDTO);
        if (projectActivityDTO.getId() != null) {
            throw new BadRequestAlertException("A new projectActivity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        projectActivityDTO = projectActivityService.save(projectActivityDTO);
        return ResponseEntity.created(new URI("/api/project-activities/" + projectActivityDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, projectActivityDTO.getId()))
            .body(projectActivityDTO);
    }

    /**
     * {@code PUT  /project-activities/:id} : Updates an existing projectActivity.
     *
     * @param id the id of the projectActivityDTO to save.
     * @param projectActivityDTO the projectActivityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectActivityDTO,
     * or with status {@code 400 (Bad Request)} if the projectActivityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectActivityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProjectActivityDTO> updateProjectActivity(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ProjectActivityDTO projectActivityDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ProjectActivity : {}, {}", id, projectActivityDTO);
        if (projectActivityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectActivityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectActivityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        projectActivityDTO = projectActivityService.update(projectActivityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectActivityDTO.getId()))
            .body(projectActivityDTO);
    }

    /**
     * {@code PATCH  /project-activities/:id} : Partial updates given fields of an existing projectActivity, field will ignore if it is null
     *
     * @param id the id of the projectActivityDTO to save.
     * @param projectActivityDTO the projectActivityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectActivityDTO,
     * or with status {@code 400 (Bad Request)} if the projectActivityDTO is not valid,
     * or with status {@code 404 (Not Found)} if the projectActivityDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the projectActivityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProjectActivityDTO> partialUpdateProjectActivity(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ProjectActivityDTO projectActivityDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ProjectActivity partially : {}, {}", id, projectActivityDTO);
        if (projectActivityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectActivityDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectActivityRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProjectActivityDTO> result = projectActivityService.partialUpdate(projectActivityDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectActivityDTO.getId())
        );
    }

    /**
     * {@code GET  /project-activities} : get all the Project Activities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Project Activities in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ProjectActivityDTO>> getAllProjectActivities(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of ProjectActivities");
        Page<ProjectActivityDTO> page = projectActivityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-activities/:id} : get the "id" projectActivity.
     *
     * @param id the id of the projectActivityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectActivityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectActivityDTO> getProjectActivity(@PathVariable("id") String id) {
        LOG.debug("REST request to get ProjectActivity : {}", id);
        Optional<ProjectActivityDTO> projectActivityDTO = projectActivityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectActivityDTO);
    }

    /**
     * {@code DELETE  /project-activities/:id} : delete the "id" projectActivity.
     *
     * @param id the id of the projectActivityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectActivity(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ProjectActivity : {}", id);
        projectActivityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

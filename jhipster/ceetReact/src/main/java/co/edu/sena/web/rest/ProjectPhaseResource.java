package co.edu.sena.web.rest;

import co.edu.sena.repository.ProjectPhaseRepository;
import co.edu.sena.service.ProjectPhaseService;
import co.edu.sena.service.dto.ProjectPhaseDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ProjectPhase}.
 */
@RestController
@RequestMapping("/api/project-phases")
public class ProjectPhaseResource {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectPhaseResource.class);

    private static final String ENTITY_NAME = "projectPhase";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final ProjectPhaseService projectPhaseService;

    private final ProjectPhaseRepository projectPhaseRepository;

    public ProjectPhaseResource(ProjectPhaseService projectPhaseService, ProjectPhaseRepository projectPhaseRepository) {
        this.projectPhaseService = projectPhaseService;
        this.projectPhaseRepository = projectPhaseRepository;
    }

    /**
     * {@code POST  /project-phases} : Create a new projectPhase.
     *
     * @param projectPhaseDTO the projectPhaseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectPhaseDTO, or with status {@code 400 (Bad Request)} if the projectPhase has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ProjectPhaseDTO> createProjectPhase(@Valid @RequestBody ProjectPhaseDTO projectPhaseDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save ProjectPhase : {}", projectPhaseDTO);
        if (projectPhaseDTO.getId() != null) {
            throw new BadRequestAlertException("A new projectPhase cannot already have an ID", ENTITY_NAME, "idexists");
        }
        projectPhaseDTO = projectPhaseService.save(projectPhaseDTO);
        return ResponseEntity.created(new URI("/api/project-phases/" + projectPhaseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, projectPhaseDTO.getId()))
            .body(projectPhaseDTO);
    }

    /**
     * {@code PUT  /project-phases/:id} : Updates an existing projectPhase.
     *
     * @param id the id of the projectPhaseDTO to save.
     * @param projectPhaseDTO the projectPhaseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectPhaseDTO,
     * or with status {@code 400 (Bad Request)} if the projectPhaseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectPhaseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProjectPhaseDTO> updateProjectPhase(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ProjectPhaseDTO projectPhaseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ProjectPhase : {}, {}", id, projectPhaseDTO);
        if (projectPhaseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectPhaseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectPhaseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        projectPhaseDTO = projectPhaseService.update(projectPhaseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectPhaseDTO.getId()))
            .body(projectPhaseDTO);
    }

    /**
     * {@code PATCH  /project-phases/:id} : Partial updates given fields of an existing projectPhase, field will ignore if it is null
     *
     * @param id the id of the projectPhaseDTO to save.
     * @param projectPhaseDTO the projectPhaseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectPhaseDTO,
     * or with status {@code 400 (Bad Request)} if the projectPhaseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the projectPhaseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the projectPhaseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProjectPhaseDTO> partialUpdateProjectPhase(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ProjectPhaseDTO projectPhaseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ProjectPhase partially : {}, {}", id, projectPhaseDTO);
        if (projectPhaseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectPhaseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectPhaseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProjectPhaseDTO> result = projectPhaseService.partialUpdate(projectPhaseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectPhaseDTO.getId())
        );
    }

    /**
     * {@code GET  /project-phases} : get all the Project Phases.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Project Phases in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ProjectPhaseDTO>> getAllProjectPhases(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of ProjectPhases");
        Page<ProjectPhaseDTO> page;
        if (eagerload) {
            page = projectPhaseService.findAllWithEagerRelationships(pageable);
        } else {
            page = projectPhaseService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-phases/:id} : get the "id" projectPhase.
     *
     * @param id the id of the projectPhaseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectPhaseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectPhaseDTO> getProjectPhase(@PathVariable("id") String id) {
        LOG.debug("REST request to get ProjectPhase : {}", id);
        Optional<ProjectPhaseDTO> projectPhaseDTO = projectPhaseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectPhaseDTO);
    }

    /**
     * {@code DELETE  /project-phases/:id} : delete the "id" projectPhase.
     *
     * @param id the id of the projectPhaseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectPhase(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ProjectPhase : {}", id);
        projectPhaseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

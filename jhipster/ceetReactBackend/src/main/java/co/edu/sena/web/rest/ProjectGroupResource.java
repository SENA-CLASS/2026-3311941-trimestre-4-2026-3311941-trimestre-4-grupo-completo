package co.edu.sena.web.rest;

import co.edu.sena.repository.ProjectGroupRepository;
import co.edu.sena.service.ProjectGroupService;
import co.edu.sena.service.dto.ProjectGroupDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ProjectGroup}.
 */
@RestController
@RequestMapping("/api/project-groups")
public class ProjectGroupResource {

    private static final Logger LOG = LoggerFactory.getLogger(ProjectGroupResource.class);

    private static final String ENTITY_NAME = "projectGroup";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final ProjectGroupService projectGroupService;

    private final ProjectGroupRepository projectGroupRepository;

    public ProjectGroupResource(ProjectGroupService projectGroupService, ProjectGroupRepository projectGroupRepository) {
        this.projectGroupService = projectGroupService;
        this.projectGroupRepository = projectGroupRepository;
    }

    /**
     * {@code POST  /project-groups} : Create a new projectGroup.
     *
     * @param projectGroupDTO the projectGroupDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectGroupDTO, or with status {@code 400 (Bad Request)} if the projectGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ProjectGroupDTO> createProjectGroup(@Valid @RequestBody ProjectGroupDTO projectGroupDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save ProjectGroup : {}", projectGroupDTO);
        if (projectGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new projectGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        projectGroupDTO = projectGroupService.save(projectGroupDTO);
        return ResponseEntity.created(new URI("/api/project-groups/" + projectGroupDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, projectGroupDTO.getId()))
            .body(projectGroupDTO);
    }

    /**
     * {@code PUT  /project-groups/:id} : Updates an existing projectGroup.
     *
     * @param id the id of the projectGroupDTO to save.
     * @param projectGroupDTO the projectGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectGroupDTO,
     * or with status {@code 400 (Bad Request)} if the projectGroupDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProjectGroupDTO> updateProjectGroup(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ProjectGroupDTO projectGroupDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ProjectGroup : {}, {}", id, projectGroupDTO);
        if (projectGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        projectGroupDTO = projectGroupService.update(projectGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectGroupDTO.getId()))
            .body(projectGroupDTO);
    }

    /**
     * {@code PATCH  /project-groups/:id} : Partial updates given fields of an existing projectGroup, field will ignore if it is null
     *
     * @param id the id of the projectGroupDTO to save.
     * @param projectGroupDTO the projectGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectGroupDTO,
     * or with status {@code 400 (Bad Request)} if the projectGroupDTO is not valid,
     * or with status {@code 404 (Not Found)} if the projectGroupDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the projectGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProjectGroupDTO> partialUpdateProjectGroup(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ProjectGroupDTO projectGroupDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ProjectGroup partially : {}, {}", id, projectGroupDTO);
        if (projectGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, projectGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProjectGroupDTO> result = projectGroupService.partialUpdate(projectGroupDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectGroupDTO.getId())
        );
    }

    /**
     * {@code GET  /project-groups} : get all the Project Groups.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Project Groups in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ProjectGroupDTO>> getAllProjectGroups(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of ProjectGroups");
        Page<ProjectGroupDTO> page;
        if (eagerload) {
            page = projectGroupService.findAllWithEagerRelationships(pageable);
        } else {
            page = projectGroupService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-groups/:id} : get the "id" projectGroup.
     *
     * @param id the id of the projectGroupDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectGroupDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectGroupDTO> getProjectGroup(@PathVariable("id") String id) {
        LOG.debug("REST request to get ProjectGroup : {}", id);
        Optional<ProjectGroupDTO> projectGroupDTO = projectGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectGroupDTO);
    }

    /**
     * {@code DELETE  /project-groups/:id} : delete the "id" projectGroup.
     *
     * @param id the id of the projectGroupDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjectGroup(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ProjectGroup : {}", id);
        projectGroupService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

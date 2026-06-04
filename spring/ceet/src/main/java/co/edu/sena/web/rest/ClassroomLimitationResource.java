package co.edu.sena.web.rest;

import co.edu.sena.repository.ClassroomLimitationRepository;
import co.edu.sena.service.ClassroomLimitationService;
import co.edu.sena.service.dto.ClassroomLimitationDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ClassroomLimitation}.
 */
@RestController
@RequestMapping("/api/classroom-limitations")
public class ClassroomLimitationResource {

    private static final Logger LOG = LoggerFactory.getLogger(ClassroomLimitationResource.class);

    private static final String ENTITY_NAME = "classroomLimitation";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final ClassroomLimitationService classroomLimitationService;

    private final ClassroomLimitationRepository classroomLimitationRepository;

    public ClassroomLimitationResource(
        ClassroomLimitationService classroomLimitationService,
        ClassroomLimitationRepository classroomLimitationRepository
    ) {
        this.classroomLimitationService = classroomLimitationService;
        this.classroomLimitationRepository = classroomLimitationRepository;
    }

    /**
     * {@code POST  /classroom-limitations} : Create a new classroomLimitation.
     *
     * @param classroomLimitationDTO the classroomLimitationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new classroomLimitationDTO, or with status {@code 400 (Bad Request)} if the classroomLimitation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ClassroomLimitationDTO> createClassroomLimitation(
        @Valid @RequestBody ClassroomLimitationDTO classroomLimitationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save ClassroomLimitation : {}", classroomLimitationDTO);
        if (classroomLimitationDTO.getId() != null) {
            throw new BadRequestAlertException("A new classroomLimitation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        classroomLimitationDTO = classroomLimitationService.save(classroomLimitationDTO);
        return ResponseEntity.created(new URI("/api/classroom-limitations/" + classroomLimitationDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, classroomLimitationDTO.getId()))
            .body(classroomLimitationDTO);
    }

    /**
     * {@code PUT  /classroom-limitations/:id} : Updates an existing classroomLimitation.
     *
     * @param id the id of the classroomLimitationDTO to save.
     * @param classroomLimitationDTO the classroomLimitationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated classroomLimitationDTO,
     * or with status {@code 400 (Bad Request)} if the classroomLimitationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the classroomLimitationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ClassroomLimitationDTO> updateClassroomLimitation(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ClassroomLimitationDTO classroomLimitationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ClassroomLimitation : {}, {}", id, classroomLimitationDTO);
        if (classroomLimitationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, classroomLimitationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!classroomLimitationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        classroomLimitationDTO = classroomLimitationService.update(classroomLimitationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, classroomLimitationDTO.getId()))
            .body(classroomLimitationDTO);
    }

    /**
     * {@code PATCH  /classroom-limitations/:id} : Partial updates given fields of an existing classroomLimitation, field will ignore if it is null
     *
     * @param id the id of the classroomLimitationDTO to save.
     * @param classroomLimitationDTO the classroomLimitationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated classroomLimitationDTO,
     * or with status {@code 400 (Bad Request)} if the classroomLimitationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the classroomLimitationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the classroomLimitationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ClassroomLimitationDTO> partialUpdateClassroomLimitation(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ClassroomLimitationDTO classroomLimitationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ClassroomLimitation partially : {}, {}", id, classroomLimitationDTO);
        if (classroomLimitationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, classroomLimitationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!classroomLimitationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ClassroomLimitationDTO> result = classroomLimitationService.partialUpdate(classroomLimitationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, classroomLimitationDTO.getId())
        );
    }

    /**
     * {@code GET  /classroom-limitations} : get all the Classroom Limitations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Classroom Limitations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ClassroomLimitationDTO>> getAllClassroomLimitations(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of ClassroomLimitations");
        Page<ClassroomLimitationDTO> page = classroomLimitationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /classroom-limitations/:id} : get the "id" classroomLimitation.
     *
     * @param id the id of the classroomLimitationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the classroomLimitationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClassroomLimitationDTO> getClassroomLimitation(@PathVariable("id") String id) {
        LOG.debug("REST request to get ClassroomLimitation : {}", id);
        Optional<ClassroomLimitationDTO> classroomLimitationDTO = classroomLimitationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(classroomLimitationDTO);
    }

    /**
     * {@code DELETE  /classroom-limitations/:id} : delete the "id" classroomLimitation.
     *
     * @param id the id of the classroomLimitationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassroomLimitation(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ClassroomLimitation : {}", id);
        classroomLimitationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

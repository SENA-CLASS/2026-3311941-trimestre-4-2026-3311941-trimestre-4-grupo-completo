package co.edu.sena.web.rest;

import co.edu.sena.repository.LevelEducationRepository;
import co.edu.sena.service.LevelEducationService;
import co.edu.sena.service.dto.LevelEducationDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.LevelEducation}.
 */
@RestController
@RequestMapping("/api/level-educations")
public class LevelEducationResource {

    private static final Logger LOG = LoggerFactory.getLogger(LevelEducationResource.class);

    private static final String ENTITY_NAME = "levelEducation";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final LevelEducationService levelEducationService;

    private final LevelEducationRepository levelEducationRepository;

    public LevelEducationResource(LevelEducationService levelEducationService, LevelEducationRepository levelEducationRepository) {
        this.levelEducationService = levelEducationService;
        this.levelEducationRepository = levelEducationRepository;
    }

    /**
     * {@code POST  /level-educations} : Create a new levelEducation.
     *
     * @param levelEducationDTO the levelEducationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new levelEducationDTO, or with status {@code 400 (Bad Request)} if the levelEducation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LevelEducationDTO> createLevelEducation(@Valid @RequestBody LevelEducationDTO levelEducationDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save LevelEducation : {}", levelEducationDTO);
        if (levelEducationDTO.getId() != null) {
            throw new BadRequestAlertException("A new levelEducation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        levelEducationDTO = levelEducationService.save(levelEducationDTO);
        return ResponseEntity.created(new URI("/api/level-educations/" + levelEducationDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, levelEducationDTO.getId()))
            .body(levelEducationDTO);
    }

    /**
     * {@code PUT  /level-educations/:id} : Updates an existing levelEducation.
     *
     * @param id the id of the levelEducationDTO to save.
     * @param levelEducationDTO the levelEducationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated levelEducationDTO,
     * or with status {@code 400 (Bad Request)} if the levelEducationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the levelEducationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LevelEducationDTO> updateLevelEducation(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody LevelEducationDTO levelEducationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LevelEducation : {}, {}", id, levelEducationDTO);
        if (levelEducationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, levelEducationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!levelEducationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        levelEducationDTO = levelEducationService.update(levelEducationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, levelEducationDTO.getId()))
            .body(levelEducationDTO);
    }

    /**
     * {@code PATCH  /level-educations/:id} : Partial updates given fields of an existing levelEducation, field will ignore if it is null
     *
     * @param id the id of the levelEducationDTO to save.
     * @param levelEducationDTO the levelEducationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated levelEducationDTO,
     * or with status {@code 400 (Bad Request)} if the levelEducationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the levelEducationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the levelEducationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LevelEducationDTO> partialUpdateLevelEducation(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody LevelEducationDTO levelEducationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LevelEducation partially : {}, {}", id, levelEducationDTO);
        if (levelEducationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, levelEducationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!levelEducationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LevelEducationDTO> result = levelEducationService.partialUpdate(levelEducationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, levelEducationDTO.getId())
        );
    }

    /**
     * {@code GET  /level-educations} : get all the Level Educations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Level Educations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LevelEducationDTO>> getAllLevelEducations(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of LevelEducations");
        Page<LevelEducationDTO> page = levelEducationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /level-educations/:id} : get the "id" levelEducation.
     *
     * @param id the id of the levelEducationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the levelEducationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LevelEducationDTO> getLevelEducation(@PathVariable("id") String id) {
        LOG.debug("REST request to get LevelEducation : {}", id);
        Optional<LevelEducationDTO> levelEducationDTO = levelEducationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelEducationDTO);
    }

    /**
     * {@code DELETE  /level-educations/:id} : delete the "id" levelEducation.
     *
     * @param id the id of the levelEducationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLevelEducation(@PathVariable("id") String id) {
        LOG.debug("REST request to delete LevelEducation : {}", id);
        levelEducationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

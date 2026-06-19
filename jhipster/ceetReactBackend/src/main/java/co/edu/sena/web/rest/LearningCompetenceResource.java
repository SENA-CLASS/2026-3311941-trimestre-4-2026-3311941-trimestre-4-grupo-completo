package co.edu.sena.web.rest;

import co.edu.sena.repository.LearningCompetenceRepository;
import co.edu.sena.service.LearningCompetenceService;
import co.edu.sena.service.dto.LearningCompetenceDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.LearningCompetence}.
 */
@RestController
@RequestMapping("/api/learning-competences")
public class LearningCompetenceResource {

    private static final Logger LOG = LoggerFactory.getLogger(LearningCompetenceResource.class);

    private static final String ENTITY_NAME = "learningCompetence";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final LearningCompetenceService learningCompetenceService;

    private final LearningCompetenceRepository learningCompetenceRepository;

    public LearningCompetenceResource(
        LearningCompetenceService learningCompetenceService,
        LearningCompetenceRepository learningCompetenceRepository
    ) {
        this.learningCompetenceService = learningCompetenceService;
        this.learningCompetenceRepository = learningCompetenceRepository;
    }

    /**
     * {@code POST  /learning-competences} : Create a new learningCompetence.
     *
     * @param learningCompetenceDTO the learningCompetenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningCompetenceDTO, or with status {@code 400 (Bad Request)} if the learningCompetence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LearningCompetenceDTO> createLearningCompetence(@Valid @RequestBody LearningCompetenceDTO learningCompetenceDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save LearningCompetence : {}", learningCompetenceDTO);
        if (learningCompetenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningCompetence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        learningCompetenceDTO = learningCompetenceService.save(learningCompetenceDTO);
        return ResponseEntity.created(new URI("/api/learning-competences/" + learningCompetenceDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, learningCompetenceDTO.getId()))
            .body(learningCompetenceDTO);
    }

    /**
     * {@code PUT  /learning-competences/:id} : Updates an existing learningCompetence.
     *
     * @param id the id of the learningCompetenceDTO to save.
     * @param learningCompetenceDTO the learningCompetenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningCompetenceDTO,
     * or with status {@code 400 (Bad Request)} if the learningCompetenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningCompetenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LearningCompetenceDTO> updateLearningCompetence(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody LearningCompetenceDTO learningCompetenceDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LearningCompetence : {}, {}", id, learningCompetenceDTO);
        if (learningCompetenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningCompetenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningCompetenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        learningCompetenceDTO = learningCompetenceService.update(learningCompetenceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningCompetenceDTO.getId()))
            .body(learningCompetenceDTO);
    }

    /**
     * {@code PATCH  /learning-competences/:id} : Partial updates given fields of an existing learningCompetence, field will ignore if it is null
     *
     * @param id the id of the learningCompetenceDTO to save.
     * @param learningCompetenceDTO the learningCompetenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningCompetenceDTO,
     * or with status {@code 400 (Bad Request)} if the learningCompetenceDTO is not valid,
     * or with status {@code 404 (Not Found)} if the learningCompetenceDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the learningCompetenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LearningCompetenceDTO> partialUpdateLearningCompetence(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody LearningCompetenceDTO learningCompetenceDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LearningCompetence partially : {}, {}", id, learningCompetenceDTO);
        if (learningCompetenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningCompetenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningCompetenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LearningCompetenceDTO> result = learningCompetenceService.partialUpdate(learningCompetenceDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningCompetenceDTO.getId())
        );
    }

    /**
     * {@code GET  /learning-competences} : get all the Learning Competences.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Learning Competences in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LearningCompetenceDTO>> getAllLearningCompetences(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of LearningCompetences");
        Page<LearningCompetenceDTO> page = learningCompetenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /learning-competences/:id} : get the "id" learningCompetence.
     *
     * @param id the id of the learningCompetenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningCompetenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LearningCompetenceDTO> getLearningCompetence(@PathVariable("id") String id) {
        LOG.debug("REST request to get LearningCompetence : {}", id);
        Optional<LearningCompetenceDTO> learningCompetenceDTO = learningCompetenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningCompetenceDTO);
    }

    /**
     * {@code DELETE  /learning-competences/:id} : delete the "id" learningCompetence.
     *
     * @param id the id of the learningCompetenceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningCompetence(@PathVariable("id") String id) {
        LOG.debug("REST request to delete LearningCompetence : {}", id);
        learningCompetenceService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

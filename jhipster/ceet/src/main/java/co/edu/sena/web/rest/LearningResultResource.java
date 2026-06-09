package co.edu.sena.web.rest;

import co.edu.sena.repository.LearningResultRepository;
import co.edu.sena.service.LearningResultService;
import co.edu.sena.service.dto.LearningResultDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.LearningResult}.
 */
@RestController
@RequestMapping("/api/learning-results")
public class LearningResultResource {

    private static final Logger LOG = LoggerFactory.getLogger(LearningResultResource.class);

    private static final String ENTITY_NAME = "learningResult";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final LearningResultService learningResultService;

    private final LearningResultRepository learningResultRepository;

    public LearningResultResource(LearningResultService learningResultService, LearningResultRepository learningResultRepository) {
        this.learningResultService = learningResultService;
        this.learningResultRepository = learningResultRepository;
    }

    /**
     * {@code POST  /learning-results} : Create a new learningResult.
     *
     * @param learningResultDTO the learningResultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningResultDTO, or with status {@code 400 (Bad Request)} if the learningResult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LearningResultDTO> createLearningResult(@Valid @RequestBody LearningResultDTO learningResultDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save LearningResult : {}", learningResultDTO);
        if (learningResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        learningResultDTO = learningResultService.save(learningResultDTO);
        return ResponseEntity.created(new URI("/api/learning-results/" + learningResultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, learningResultDTO.getId()))
            .body(learningResultDTO);
    }

    /**
     * {@code PUT  /learning-results/:id} : Updates an existing learningResult.
     *
     * @param id the id of the learningResultDTO to save.
     * @param learningResultDTO the learningResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningResultDTO,
     * or with status {@code 400 (Bad Request)} if the learningResultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LearningResultDTO> updateLearningResult(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody LearningResultDTO learningResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LearningResult : {}, {}", id, learningResultDTO);
        if (learningResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        learningResultDTO = learningResultService.update(learningResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningResultDTO.getId()))
            .body(learningResultDTO);
    }

    /**
     * {@code PATCH  /learning-results/:id} : Partial updates given fields of an existing learningResult, field will ignore if it is null
     *
     * @param id the id of the learningResultDTO to save.
     * @param learningResultDTO the learningResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningResultDTO,
     * or with status {@code 400 (Bad Request)} if the learningResultDTO is not valid,
     * or with status {@code 404 (Not Found)} if the learningResultDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the learningResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LearningResultDTO> partialUpdateLearningResult(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody LearningResultDTO learningResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LearningResult partially : {}, {}", id, learningResultDTO);
        if (learningResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LearningResultDTO> result = learningResultService.partialUpdate(learningResultDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningResultDTO.getId())
        );
    }

    /**
     * {@code GET  /learning-results} : get all the Learning Results.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Learning Results in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LearningResultDTO>> getAllLearningResults(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of LearningResults");
        Page<LearningResultDTO> page = learningResultService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /learning-results/:id} : get the "id" learningResult.
     *
     * @param id the id of the learningResultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningResultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LearningResultDTO> getLearningResult(@PathVariable("id") String id) {
        LOG.debug("REST request to get LearningResult : {}", id);
        Optional<LearningResultDTO> learningResultDTO = learningResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningResultDTO);
    }

    /**
     * {@code DELETE  /learning-results/:id} : delete the "id" learningResult.
     *
     * @param id the id of the learningResultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningResult(@PathVariable("id") String id) {
        LOG.debug("REST request to delete LearningResult : {}", id);
        learningResultService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

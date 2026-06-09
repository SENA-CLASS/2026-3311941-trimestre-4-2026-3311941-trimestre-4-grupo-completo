package co.edu.sena.web.rest;

import co.edu.sena.repository.CurrentQuarterRepository;
import co.edu.sena.service.CurrentQuarterService;
import co.edu.sena.service.dto.CurrentQuarterDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.CurrentQuarter}.
 */
@RestController
@RequestMapping("/api/current-quarters")
public class CurrentQuarterResource {

    private static final Logger LOG = LoggerFactory.getLogger(CurrentQuarterResource.class);

    private static final String ENTITY_NAME = "currentQuarter";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final CurrentQuarterService currentQuarterService;

    private final CurrentQuarterRepository currentQuarterRepository;

    public CurrentQuarterResource(CurrentQuarterService currentQuarterService, CurrentQuarterRepository currentQuarterRepository) {
        this.currentQuarterService = currentQuarterService;
        this.currentQuarterRepository = currentQuarterRepository;
    }

    /**
     * {@code POST  /current-quarters} : Create a new currentQuarter.
     *
     * @param currentQuarterDTO the currentQuarterDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new currentQuarterDTO, or with status {@code 400 (Bad Request)} if the currentQuarter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CurrentQuarterDTO> createCurrentQuarter(@Valid @RequestBody CurrentQuarterDTO currentQuarterDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CurrentQuarter : {}", currentQuarterDTO);
        if (currentQuarterDTO.getId() != null) {
            throw new BadRequestAlertException("A new currentQuarter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        currentQuarterDTO = currentQuarterService.save(currentQuarterDTO);
        return ResponseEntity.created(new URI("/api/current-quarters/" + currentQuarterDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, currentQuarterDTO.getId()))
            .body(currentQuarterDTO);
    }

    /**
     * {@code PUT  /current-quarters/:id} : Updates an existing currentQuarter.
     *
     * @param id the id of the currentQuarterDTO to save.
     * @param currentQuarterDTO the currentQuarterDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated currentQuarterDTO,
     * or with status {@code 400 (Bad Request)} if the currentQuarterDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the currentQuarterDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CurrentQuarterDTO> updateCurrentQuarter(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody CurrentQuarterDTO currentQuarterDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CurrentQuarter : {}, {}", id, currentQuarterDTO);
        if (currentQuarterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, currentQuarterDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!currentQuarterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        currentQuarterDTO = currentQuarterService.update(currentQuarterDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, currentQuarterDTO.getId()))
            .body(currentQuarterDTO);
    }

    /**
     * {@code PATCH  /current-quarters/:id} : Partial updates given fields of an existing currentQuarter, field will ignore if it is null
     *
     * @param id the id of the currentQuarterDTO to save.
     * @param currentQuarterDTO the currentQuarterDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated currentQuarterDTO,
     * or with status {@code 400 (Bad Request)} if the currentQuarterDTO is not valid,
     * or with status {@code 404 (Not Found)} if the currentQuarterDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the currentQuarterDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CurrentQuarterDTO> partialUpdateCurrentQuarter(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody CurrentQuarterDTO currentQuarterDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CurrentQuarter partially : {}, {}", id, currentQuarterDTO);
        if (currentQuarterDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, currentQuarterDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!currentQuarterRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CurrentQuarterDTO> result = currentQuarterService.partialUpdate(currentQuarterDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, currentQuarterDTO.getId())
        );
    }

    /**
     * {@code GET  /current-quarters} : get all the Current Quarters.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Current Quarters in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CurrentQuarterDTO>> getAllCurrentQuarters(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of CurrentQuarters");
        Page<CurrentQuarterDTO> page;
        if (eagerload) {
            page = currentQuarterService.findAllWithEagerRelationships(pageable);
        } else {
            page = currentQuarterService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /current-quarters/:id} : get the "id" currentQuarter.
     *
     * @param id the id of the currentQuarterDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the currentQuarterDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CurrentQuarterDTO> getCurrentQuarter(@PathVariable("id") String id) {
        LOG.debug("REST request to get CurrentQuarter : {}", id);
        Optional<CurrentQuarterDTO> currentQuarterDTO = currentQuarterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(currentQuarterDTO);
    }

    /**
     * {@code DELETE  /current-quarters/:id} : delete the "id" currentQuarter.
     *
     * @param id the id of the currentQuarterDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurrentQuarter(@PathVariable("id") String id) {
        LOG.debug("REST request to delete CurrentQuarter : {}", id);
        currentQuarterService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

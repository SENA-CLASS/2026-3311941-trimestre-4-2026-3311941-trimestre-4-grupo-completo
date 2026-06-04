package co.edu.sena.web.rest;

import co.edu.sena.repository.ViewedResultRepository;
import co.edu.sena.service.ViewedResultService;
import co.edu.sena.service.dto.ViewedResultDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ViewedResult}.
 */
@RestController
@RequestMapping("/api/viewed-results")
public class ViewedResultResource {

    private static final Logger LOG = LoggerFactory.getLogger(ViewedResultResource.class);

    private static final String ENTITY_NAME = "viewedResult";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final ViewedResultService viewedResultService;

    private final ViewedResultRepository viewedResultRepository;

    public ViewedResultResource(ViewedResultService viewedResultService, ViewedResultRepository viewedResultRepository) {
        this.viewedResultService = viewedResultService;
        this.viewedResultRepository = viewedResultRepository;
    }

    /**
     * {@code POST  /viewed-results} : Create a new viewedResult.
     *
     * @param viewedResultDTO the viewedResultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new viewedResultDTO, or with status {@code 400 (Bad Request)} if the viewedResult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ViewedResultDTO> createViewedResult(@Valid @RequestBody ViewedResultDTO viewedResultDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save ViewedResult : {}", viewedResultDTO);
        if (viewedResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new viewedResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        viewedResultDTO = viewedResultService.save(viewedResultDTO);
        return ResponseEntity.created(new URI("/api/viewed-results/" + viewedResultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, viewedResultDTO.getId()))
            .body(viewedResultDTO);
    }

    /**
     * {@code PUT  /viewed-results/:id} : Updates an existing viewedResult.
     *
     * @param id the id of the viewedResultDTO to save.
     * @param viewedResultDTO the viewedResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated viewedResultDTO,
     * or with status {@code 400 (Bad Request)} if the viewedResultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the viewedResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ViewedResultDTO> updateViewedResult(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ViewedResultDTO viewedResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ViewedResult : {}, {}", id, viewedResultDTO);
        if (viewedResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, viewedResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!viewedResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        viewedResultDTO = viewedResultService.update(viewedResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, viewedResultDTO.getId()))
            .body(viewedResultDTO);
    }

    /**
     * {@code PATCH  /viewed-results/:id} : Partial updates given fields of an existing viewedResult, field will ignore if it is null
     *
     * @param id the id of the viewedResultDTO to save.
     * @param viewedResultDTO the viewedResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated viewedResultDTO,
     * or with status {@code 400 (Bad Request)} if the viewedResultDTO is not valid,
     * or with status {@code 404 (Not Found)} if the viewedResultDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the viewedResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ViewedResultDTO> partialUpdateViewedResult(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ViewedResultDTO viewedResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ViewedResult partially : {}, {}", id, viewedResultDTO);
        if (viewedResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, viewedResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!viewedResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ViewedResultDTO> result = viewedResultService.partialUpdate(viewedResultDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, viewedResultDTO.getId())
        );
    }

    /**
     * {@code GET  /viewed-results} : get all the Viewed Results.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Viewed Results in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ViewedResultDTO>> getAllViewedResults(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of ViewedResults");
        Page<ViewedResultDTO> page;
        if (eagerload) {
            page = viewedResultService.findAllWithEagerRelationships(pageable);
        } else {
            page = viewedResultService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /viewed-results/:id} : get the "id" viewedResult.
     *
     * @param id the id of the viewedResultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the viewedResultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ViewedResultDTO> getViewedResult(@PathVariable("id") String id) {
        LOG.debug("REST request to get ViewedResult : {}", id);
        Optional<ViewedResultDTO> viewedResultDTO = viewedResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(viewedResultDTO);
    }

    /**
     * {@code DELETE  /viewed-results/:id} : delete the "id" viewedResult.
     *
     * @param id the id of the viewedResultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteViewedResult(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ViewedResult : {}", id);
        viewedResultService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

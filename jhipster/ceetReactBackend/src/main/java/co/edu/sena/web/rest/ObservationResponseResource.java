package co.edu.sena.web.rest;

import co.edu.sena.repository.ObservationResponseRepository;
import co.edu.sena.service.ObservationResponseService;
import co.edu.sena.service.dto.ObservationResponseDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ObservationResponse}.
 */
@RestController
@RequestMapping("/api/observation-responses")
public class ObservationResponseResource {

    private static final Logger LOG = LoggerFactory.getLogger(ObservationResponseResource.class);

    private static final String ENTITY_NAME = "observationResponse";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final ObservationResponseService observationResponseService;

    private final ObservationResponseRepository observationResponseRepository;

    public ObservationResponseResource(
        ObservationResponseService observationResponseService,
        ObservationResponseRepository observationResponseRepository
    ) {
        this.observationResponseService = observationResponseService;
        this.observationResponseRepository = observationResponseRepository;
    }

    /**
     * {@code POST  /observation-responses} : Create a new observationResponse.
     *
     * @param observationResponseDTO the observationResponseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new observationResponseDTO, or with status {@code 400 (Bad Request)} if the observationResponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ObservationResponseDTO> createObservationResponse(
        @Valid @RequestBody ObservationResponseDTO observationResponseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save ObservationResponse : {}", observationResponseDTO);
        if (observationResponseDTO.getId() != null) {
            throw new BadRequestAlertException("A new observationResponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        observationResponseDTO = observationResponseService.save(observationResponseDTO);
        return ResponseEntity.created(new URI("/api/observation-responses/" + observationResponseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, observationResponseDTO.getId()))
            .body(observationResponseDTO);
    }

    /**
     * {@code PUT  /observation-responses/:id} : Updates an existing observationResponse.
     *
     * @param id the id of the observationResponseDTO to save.
     * @param observationResponseDTO the observationResponseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated observationResponseDTO,
     * or with status {@code 400 (Bad Request)} if the observationResponseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the observationResponseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ObservationResponseDTO> updateObservationResponse(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ObservationResponseDTO observationResponseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ObservationResponse : {}, {}", id, observationResponseDTO);
        if (observationResponseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, observationResponseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!observationResponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        observationResponseDTO = observationResponseService.update(observationResponseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, observationResponseDTO.getId()))
            .body(observationResponseDTO);
    }

    /**
     * {@code PATCH  /observation-responses/:id} : Partial updates given fields of an existing observationResponse, field will ignore if it is null
     *
     * @param id the id of the observationResponseDTO to save.
     * @param observationResponseDTO the observationResponseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated observationResponseDTO,
     * or with status {@code 400 (Bad Request)} if the observationResponseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the observationResponseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the observationResponseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ObservationResponseDTO> partialUpdateObservationResponse(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ObservationResponseDTO observationResponseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ObservationResponse partially : {}, {}", id, observationResponseDTO);
        if (observationResponseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, observationResponseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!observationResponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ObservationResponseDTO> result = observationResponseService.partialUpdate(observationResponseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, observationResponseDTO.getId())
        );
    }

    /**
     * {@code GET  /observation-responses} : get all the Observation Responses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Observation Responses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ObservationResponseDTO>> getAllObservationResponses(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of ObservationResponses");
        Page<ObservationResponseDTO> page = observationResponseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /observation-responses/:id} : get the "id" observationResponse.
     *
     * @param id the id of the observationResponseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the observationResponseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ObservationResponseDTO> getObservationResponse(@PathVariable("id") String id) {
        LOG.debug("REST request to get ObservationResponse : {}", id);
        Optional<ObservationResponseDTO> observationResponseDTO = observationResponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(observationResponseDTO);
    }

    /**
     * {@code DELETE  /observation-responses/:id} : delete the "id" observationResponse.
     *
     * @param id the id of the observationResponseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObservationResponse(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ObservationResponse : {}", id);
        observationResponseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

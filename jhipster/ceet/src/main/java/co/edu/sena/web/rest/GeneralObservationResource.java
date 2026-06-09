package co.edu.sena.web.rest;

import co.edu.sena.repository.GeneralObservationRepository;
import co.edu.sena.service.GeneralObservationService;
import co.edu.sena.service.dto.GeneralObservationDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.GeneralObservation}.
 */
@RestController
@RequestMapping("/api/general-observations")
public class GeneralObservationResource {

    private static final Logger LOG = LoggerFactory.getLogger(GeneralObservationResource.class);

    private static final String ENTITY_NAME = "generalObservation";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final GeneralObservationService generalObservationService;

    private final GeneralObservationRepository generalObservationRepository;

    public GeneralObservationResource(
        GeneralObservationService generalObservationService,
        GeneralObservationRepository generalObservationRepository
    ) {
        this.generalObservationService = generalObservationService;
        this.generalObservationRepository = generalObservationRepository;
    }

    /**
     * {@code POST  /general-observations} : Create a new generalObservation.
     *
     * @param generalObservationDTO the generalObservationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new generalObservationDTO, or with status {@code 400 (Bad Request)} if the generalObservation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GeneralObservationDTO> createGeneralObservation(@Valid @RequestBody GeneralObservationDTO generalObservationDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save GeneralObservation : {}", generalObservationDTO);
        if (generalObservationDTO.getId() != null) {
            throw new BadRequestAlertException("A new generalObservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        generalObservationDTO = generalObservationService.save(generalObservationDTO);
        return ResponseEntity.created(new URI("/api/general-observations/" + generalObservationDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, generalObservationDTO.getId()))
            .body(generalObservationDTO);
    }

    /**
     * {@code PUT  /general-observations/:id} : Updates an existing generalObservation.
     *
     * @param id the id of the generalObservationDTO to save.
     * @param generalObservationDTO the generalObservationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated generalObservationDTO,
     * or with status {@code 400 (Bad Request)} if the generalObservationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the generalObservationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GeneralObservationDTO> updateGeneralObservation(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody GeneralObservationDTO generalObservationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update GeneralObservation : {}, {}", id, generalObservationDTO);
        if (generalObservationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, generalObservationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!generalObservationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        generalObservationDTO = generalObservationService.update(generalObservationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, generalObservationDTO.getId()))
            .body(generalObservationDTO);
    }

    /**
     * {@code PATCH  /general-observations/:id} : Partial updates given fields of an existing generalObservation, field will ignore if it is null
     *
     * @param id the id of the generalObservationDTO to save.
     * @param generalObservationDTO the generalObservationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated generalObservationDTO,
     * or with status {@code 400 (Bad Request)} if the generalObservationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the generalObservationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the generalObservationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GeneralObservationDTO> partialUpdateGeneralObservation(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody GeneralObservationDTO generalObservationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update GeneralObservation partially : {}, {}", id, generalObservationDTO);
        if (generalObservationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, generalObservationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!generalObservationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GeneralObservationDTO> result = generalObservationService.partialUpdate(generalObservationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, generalObservationDTO.getId())
        );
    }

    /**
     * {@code GET  /general-observations} : get all the General Observations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of General Observations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<GeneralObservationDTO>> getAllGeneralObservations(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of GeneralObservations");
        Page<GeneralObservationDTO> page = generalObservationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /general-observations/:id} : get the "id" generalObservation.
     *
     * @param id the id of the generalObservationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the generalObservationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GeneralObservationDTO> getGeneralObservation(@PathVariable("id") String id) {
        LOG.debug("REST request to get GeneralObservation : {}", id);
        Optional<GeneralObservationDTO> generalObservationDTO = generalObservationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(generalObservationDTO);
    }

    /**
     * {@code DELETE  /general-observations/:id} : delete the "id" generalObservation.
     *
     * @param id the id of the generalObservationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGeneralObservation(@PathVariable("id") String id) {
        LOG.debug("REST request to delete GeneralObservation : {}", id);
        generalObservationService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

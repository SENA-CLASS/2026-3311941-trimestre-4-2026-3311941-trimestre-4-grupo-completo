package co.edu.sena.web.rest;

import co.edu.sena.repository.BondingCompetenceRepository;
import co.edu.sena.service.BondingCompetenceService;
import co.edu.sena.service.dto.BondingCompetenceDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.BondingCompetence}.
 */
@RestController
@RequestMapping("/api/bonding-competences")
public class BondingCompetenceResource {

    private static final Logger LOG = LoggerFactory.getLogger(BondingCompetenceResource.class);

    private static final String ENTITY_NAME = "bondingCompetence";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final BondingCompetenceService bondingCompetenceService;

    private final BondingCompetenceRepository bondingCompetenceRepository;

    public BondingCompetenceResource(
        BondingCompetenceService bondingCompetenceService,
        BondingCompetenceRepository bondingCompetenceRepository
    ) {
        this.bondingCompetenceService = bondingCompetenceService;
        this.bondingCompetenceRepository = bondingCompetenceRepository;
    }

    /**
     * {@code POST  /bonding-competences} : Create a new bondingCompetence.
     *
     * @param bondingCompetenceDTO the bondingCompetenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bondingCompetenceDTO, or with status {@code 400 (Bad Request)} if the bondingCompetence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BondingCompetenceDTO> createBondingCompetence(@Valid @RequestBody BondingCompetenceDTO bondingCompetenceDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save BondingCompetence : {}", bondingCompetenceDTO);
        if (bondingCompetenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new bondingCompetence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bondingCompetenceDTO = bondingCompetenceService.save(bondingCompetenceDTO);
        return ResponseEntity.created(new URI("/api/bonding-competences/" + bondingCompetenceDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, bondingCompetenceDTO.getId()))
            .body(bondingCompetenceDTO);
    }

    /**
     * {@code PUT  /bonding-competences/:id} : Updates an existing bondingCompetence.
     *
     * @param id the id of the bondingCompetenceDTO to save.
     * @param bondingCompetenceDTO the bondingCompetenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bondingCompetenceDTO,
     * or with status {@code 400 (Bad Request)} if the bondingCompetenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bondingCompetenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BondingCompetenceDTO> updateBondingCompetence(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody BondingCompetenceDTO bondingCompetenceDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update BondingCompetence : {}, {}", id, bondingCompetenceDTO);
        if (bondingCompetenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bondingCompetenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bondingCompetenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        bondingCompetenceDTO = bondingCompetenceService.update(bondingCompetenceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bondingCompetenceDTO.getId()))
            .body(bondingCompetenceDTO);
    }

    /**
     * {@code PATCH  /bonding-competences/:id} : Partial updates given fields of an existing bondingCompetence, field will ignore if it is null
     *
     * @param id the id of the bondingCompetenceDTO to save.
     * @param bondingCompetenceDTO the bondingCompetenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bondingCompetenceDTO,
     * or with status {@code 400 (Bad Request)} if the bondingCompetenceDTO is not valid,
     * or with status {@code 404 (Not Found)} if the bondingCompetenceDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the bondingCompetenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BondingCompetenceDTO> partialUpdateBondingCompetence(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody BondingCompetenceDTO bondingCompetenceDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update BondingCompetence partially : {}, {}", id, bondingCompetenceDTO);
        if (bondingCompetenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bondingCompetenceDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bondingCompetenceRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BondingCompetenceDTO> result = bondingCompetenceService.partialUpdate(bondingCompetenceDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bondingCompetenceDTO.getId())
        );
    }

    /**
     * {@code GET  /bonding-competences} : get all the Bonding Competences.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Bonding Competences in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BondingCompetenceDTO>> getAllBondingCompetences(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of BondingCompetences");
        Page<BondingCompetenceDTO> page = bondingCompetenceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bonding-competences/:id} : get the "id" bondingCompetence.
     *
     * @param id the id of the bondingCompetenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bondingCompetenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BondingCompetenceDTO> getBondingCompetence(@PathVariable("id") String id) {
        LOG.debug("REST request to get BondingCompetence : {}", id);
        Optional<BondingCompetenceDTO> bondingCompetenceDTO = bondingCompetenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bondingCompetenceDTO);
    }

    /**
     * {@code DELETE  /bonding-competences/:id} : delete the "id" bondingCompetence.
     *
     * @param id the id of the bondingCompetenceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBondingCompetence(@PathVariable("id") String id) {
        LOG.debug("REST request to delete BondingCompetence : {}", id);
        bondingCompetenceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

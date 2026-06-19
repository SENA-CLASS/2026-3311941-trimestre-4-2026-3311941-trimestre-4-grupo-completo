package co.edu.sena.web.rest;

import co.edu.sena.repository.BondingInstructorRepository;
import co.edu.sena.service.BondingInstructorService;
import co.edu.sena.service.dto.BondingInstructorDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.BondingInstructor}.
 */
@RestController
@RequestMapping("/api/bonding-instructors")
public class BondingInstructorResource {

    private static final Logger LOG = LoggerFactory.getLogger(BondingInstructorResource.class);

    private static final String ENTITY_NAME = "bondingInstructor";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final BondingInstructorService bondingInstructorService;

    private final BondingInstructorRepository bondingInstructorRepository;

    public BondingInstructorResource(
        BondingInstructorService bondingInstructorService,
        BondingInstructorRepository bondingInstructorRepository
    ) {
        this.bondingInstructorService = bondingInstructorService;
        this.bondingInstructorRepository = bondingInstructorRepository;
    }

    /**
     * {@code POST  /bonding-instructors} : Create a new bondingInstructor.
     *
     * @param bondingInstructorDTO the bondingInstructorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bondingInstructorDTO, or with status {@code 400 (Bad Request)} if the bondingInstructor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BondingInstructorDTO> createBondingInstructor(@Valid @RequestBody BondingInstructorDTO bondingInstructorDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save BondingInstructor : {}", bondingInstructorDTO);
        if (bondingInstructorDTO.getId() != null) {
            throw new BadRequestAlertException("A new bondingInstructor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bondingInstructorDTO = bondingInstructorService.save(bondingInstructorDTO);
        return ResponseEntity.created(new URI("/api/bonding-instructors/" + bondingInstructorDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, bondingInstructorDTO.getId()))
            .body(bondingInstructorDTO);
    }

    /**
     * {@code PUT  /bonding-instructors/:id} : Updates an existing bondingInstructor.
     *
     * @param id the id of the bondingInstructorDTO to save.
     * @param bondingInstructorDTO the bondingInstructorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bondingInstructorDTO,
     * or with status {@code 400 (Bad Request)} if the bondingInstructorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bondingInstructorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BondingInstructorDTO> updateBondingInstructor(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody BondingInstructorDTO bondingInstructorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update BondingInstructor : {}, {}", id, bondingInstructorDTO);
        if (bondingInstructorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bondingInstructorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bondingInstructorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        bondingInstructorDTO = bondingInstructorService.update(bondingInstructorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bondingInstructorDTO.getId()))
            .body(bondingInstructorDTO);
    }

    /**
     * {@code PATCH  /bonding-instructors/:id} : Partial updates given fields of an existing bondingInstructor, field will ignore if it is null
     *
     * @param id the id of the bondingInstructorDTO to save.
     * @param bondingInstructorDTO the bondingInstructorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bondingInstructorDTO,
     * or with status {@code 400 (Bad Request)} if the bondingInstructorDTO is not valid,
     * or with status {@code 404 (Not Found)} if the bondingInstructorDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the bondingInstructorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BondingInstructorDTO> partialUpdateBondingInstructor(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody BondingInstructorDTO bondingInstructorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update BondingInstructor partially : {}, {}", id, bondingInstructorDTO);
        if (bondingInstructorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bondingInstructorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bondingInstructorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BondingInstructorDTO> result = bondingInstructorService.partialUpdate(bondingInstructorDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bondingInstructorDTO.getId())
        );
    }

    /**
     * {@code GET  /bonding-instructors} : get all the Bonding Instructors.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Bonding Instructors in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BondingInstructorDTO>> getAllBondingInstructors(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of BondingInstructors");
        Page<BondingInstructorDTO> page;
        if (eagerload) {
            page = bondingInstructorService.findAllWithEagerRelationships(pageable);
        } else {
            page = bondingInstructorService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bonding-instructors/:id} : get the "id" bondingInstructor.
     *
     * @param id the id of the bondingInstructorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bondingInstructorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BondingInstructorDTO> getBondingInstructor(@PathVariable("id") String id) {
        LOG.debug("REST request to get BondingInstructor : {}", id);
        Optional<BondingInstructorDTO> bondingInstructorDTO = bondingInstructorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bondingInstructorDTO);
    }

    /**
     * {@code DELETE  /bonding-instructors/:id} : delete the "id" bondingInstructor.
     *
     * @param id the id of the bondingInstructorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBondingInstructor(@PathVariable("id") String id) {
        LOG.debug("REST request to delete BondingInstructor : {}", id);
        bondingInstructorService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

package co.edu.sena.web.rest;

import co.edu.sena.repository.AreaInstructorRepository;
import co.edu.sena.service.AreaInstructorService;
import co.edu.sena.service.dto.AreaInstructorDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.AreaInstructor}.
 */
@RestController
@RequestMapping("/api/area-instructors")
public class AreaInstructorResource {

    private static final Logger LOG = LoggerFactory.getLogger(AreaInstructorResource.class);

    private static final String ENTITY_NAME = "areaInstructor";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final AreaInstructorService areaInstructorService;

    private final AreaInstructorRepository areaInstructorRepository;

    public AreaInstructorResource(AreaInstructorService areaInstructorService, AreaInstructorRepository areaInstructorRepository) {
        this.areaInstructorService = areaInstructorService;
        this.areaInstructorRepository = areaInstructorRepository;
    }

    /**
     * {@code POST  /area-instructors} : Create a new areaInstructor.
     *
     * @param areaInstructorDTO the areaInstructorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new areaInstructorDTO, or with status {@code 400 (Bad Request)} if the areaInstructor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AreaInstructorDTO> createAreaInstructor(@Valid @RequestBody AreaInstructorDTO areaInstructorDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save AreaInstructor : {}", areaInstructorDTO);
        if (areaInstructorDTO.getId() != null) {
            throw new BadRequestAlertException("A new areaInstructor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        areaInstructorDTO = areaInstructorService.save(areaInstructorDTO);
        return ResponseEntity.created(new URI("/api/area-instructors/" + areaInstructorDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, areaInstructorDTO.getId()))
            .body(areaInstructorDTO);
    }

    /**
     * {@code PUT  /area-instructors/:id} : Updates an existing areaInstructor.
     *
     * @param id the id of the areaInstructorDTO to save.
     * @param areaInstructorDTO the areaInstructorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated areaInstructorDTO,
     * or with status {@code 400 (Bad Request)} if the areaInstructorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the areaInstructorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AreaInstructorDTO> updateAreaInstructor(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody AreaInstructorDTO areaInstructorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update AreaInstructor : {}, {}", id, areaInstructorDTO);
        if (areaInstructorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, areaInstructorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!areaInstructorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        areaInstructorDTO = areaInstructorService.update(areaInstructorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, areaInstructorDTO.getId()))
            .body(areaInstructorDTO);
    }

    /**
     * {@code PATCH  /area-instructors/:id} : Partial updates given fields of an existing areaInstructor, field will ignore if it is null
     *
     * @param id the id of the areaInstructorDTO to save.
     * @param areaInstructorDTO the areaInstructorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated areaInstructorDTO,
     * or with status {@code 400 (Bad Request)} if the areaInstructorDTO is not valid,
     * or with status {@code 404 (Not Found)} if the areaInstructorDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the areaInstructorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AreaInstructorDTO> partialUpdateAreaInstructor(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody AreaInstructorDTO areaInstructorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update AreaInstructor partially : {}, {}", id, areaInstructorDTO);
        if (areaInstructorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, areaInstructorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!areaInstructorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AreaInstructorDTO> result = areaInstructorService.partialUpdate(areaInstructorDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, areaInstructorDTO.getId())
        );
    }

    /**
     * {@code GET  /area-instructors} : get all the Area Instructors.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Area Instructors in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AreaInstructorDTO>> getAllAreaInstructors(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of AreaInstructors");
        Page<AreaInstructorDTO> page;
        if (eagerload) {
            page = areaInstructorService.findAllWithEagerRelationships(pageable);
        } else {
            page = areaInstructorService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /area-instructors/:id} : get the "id" areaInstructor.
     *
     * @param id the id of the areaInstructorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the areaInstructorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AreaInstructorDTO> getAreaInstructor(@PathVariable("id") String id) {
        LOG.debug("REST request to get AreaInstructor : {}", id);
        Optional<AreaInstructorDTO> areaInstructorDTO = areaInstructorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(areaInstructorDTO);
    }

    /**
     * {@code DELETE  /area-instructors/:id} : delete the "id" areaInstructor.
     *
     * @param id the id of the areaInstructorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAreaInstructor(@PathVariable("id") String id) {
        LOG.debug("REST request to delete AreaInstructor : {}", id);
        areaInstructorService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

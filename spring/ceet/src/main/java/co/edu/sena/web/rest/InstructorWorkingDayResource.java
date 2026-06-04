package co.edu.sena.web.rest;

import co.edu.sena.repository.InstructorWorkingDayRepository;
import co.edu.sena.service.InstructorWorkingDayService;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.InstructorWorkingDay}.
 */
@RestController
@RequestMapping("/api/instructor-working-days")
public class InstructorWorkingDayResource {

    private static final Logger LOG = LoggerFactory.getLogger(InstructorWorkingDayResource.class);

    private static final String ENTITY_NAME = "instructorWorkingDay";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final InstructorWorkingDayService instructorWorkingDayService;

    private final InstructorWorkingDayRepository instructorWorkingDayRepository;

    public InstructorWorkingDayResource(
        InstructorWorkingDayService instructorWorkingDayService,
        InstructorWorkingDayRepository instructorWorkingDayRepository
    ) {
        this.instructorWorkingDayService = instructorWorkingDayService;
        this.instructorWorkingDayRepository = instructorWorkingDayRepository;
    }

    /**
     * {@code POST  /instructor-working-days} : Create a new instructorWorkingDay.
     *
     * @param instructorWorkingDayDTO the instructorWorkingDayDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new instructorWorkingDayDTO, or with status {@code 400 (Bad Request)} if the instructorWorkingDay has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<InstructorWorkingDayDTO> createInstructorWorkingDay(
        @Valid @RequestBody InstructorWorkingDayDTO instructorWorkingDayDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save InstructorWorkingDay : {}", instructorWorkingDayDTO);
        if (instructorWorkingDayDTO.getId() != null) {
            throw new BadRequestAlertException("A new instructorWorkingDay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        instructorWorkingDayDTO = instructorWorkingDayService.save(instructorWorkingDayDTO);
        return ResponseEntity.created(new URI("/api/instructor-working-days/" + instructorWorkingDayDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, instructorWorkingDayDTO.getId()))
            .body(instructorWorkingDayDTO);
    }

    /**
     * {@code PUT  /instructor-working-days/:id} : Updates an existing instructorWorkingDay.
     *
     * @param id the id of the instructorWorkingDayDTO to save.
     * @param instructorWorkingDayDTO the instructorWorkingDayDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instructorWorkingDayDTO,
     * or with status {@code 400 (Bad Request)} if the instructorWorkingDayDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the instructorWorkingDayDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<InstructorWorkingDayDTO> updateInstructorWorkingDay(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody InstructorWorkingDayDTO instructorWorkingDayDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update InstructorWorkingDay : {}, {}", id, instructorWorkingDayDTO);
        if (instructorWorkingDayDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, instructorWorkingDayDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!instructorWorkingDayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        instructorWorkingDayDTO = instructorWorkingDayService.update(instructorWorkingDayDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, instructorWorkingDayDTO.getId()))
            .body(instructorWorkingDayDTO);
    }

    /**
     * {@code PATCH  /instructor-working-days/:id} : Partial updates given fields of an existing instructorWorkingDay, field will ignore if it is null
     *
     * @param id the id of the instructorWorkingDayDTO to save.
     * @param instructorWorkingDayDTO the instructorWorkingDayDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instructorWorkingDayDTO,
     * or with status {@code 400 (Bad Request)} if the instructorWorkingDayDTO is not valid,
     * or with status {@code 404 (Not Found)} if the instructorWorkingDayDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the instructorWorkingDayDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InstructorWorkingDayDTO> partialUpdateInstructorWorkingDay(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody InstructorWorkingDayDTO instructorWorkingDayDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update InstructorWorkingDay partially : {}, {}", id, instructorWorkingDayDTO);
        if (instructorWorkingDayDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, instructorWorkingDayDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!instructorWorkingDayRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InstructorWorkingDayDTO> result = instructorWorkingDayService.partialUpdate(instructorWorkingDayDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, instructorWorkingDayDTO.getId())
        );
    }

    /**
     * {@code GET  /instructor-working-days} : get all the Instructor Working Days.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Instructor Working Days in body.
     */
    @GetMapping("")
    public ResponseEntity<List<InstructorWorkingDayDTO>> getAllInstructorWorkingDays(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of InstructorWorkingDays");
        Page<InstructorWorkingDayDTO> page = instructorWorkingDayService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /instructor-working-days/:id} : get the "id" instructorWorkingDay.
     *
     * @param id the id of the instructorWorkingDayDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the instructorWorkingDayDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<InstructorWorkingDayDTO> getInstructorWorkingDay(@PathVariable("id") String id) {
        LOG.debug("REST request to get InstructorWorkingDay : {}", id);
        Optional<InstructorWorkingDayDTO> instructorWorkingDayDTO = instructorWorkingDayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(instructorWorkingDayDTO);
    }

    /**
     * {@code DELETE  /instructor-working-days/:id} : delete the "id" instructorWorkingDay.
     *
     * @param id the id of the instructorWorkingDayDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructorWorkingDay(@PathVariable("id") String id) {
        LOG.debug("REST request to delete InstructorWorkingDay : {}", id);
        instructorWorkingDayService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

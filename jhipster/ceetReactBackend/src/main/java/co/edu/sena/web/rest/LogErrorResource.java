package co.edu.sena.web.rest;

import co.edu.sena.repository.LogErrorRepository;
import co.edu.sena.service.LogErrorService;
import co.edu.sena.service.dto.LogErrorDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.LogError}.
 */
@RestController
@RequestMapping("/api/log-errors")
public class LogErrorResource {

    private static final Logger LOG = LoggerFactory.getLogger(LogErrorResource.class);

    private static final String ENTITY_NAME = "logError";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final LogErrorService logErrorService;

    private final LogErrorRepository logErrorRepository;

    public LogErrorResource(LogErrorService logErrorService, LogErrorRepository logErrorRepository) {
        this.logErrorService = logErrorService;
        this.logErrorRepository = logErrorRepository;
    }

    /**
     * {@code POST  /log-errors} : Create a new logError.
     *
     * @param logErrorDTO the logErrorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logErrorDTO, or with status {@code 400 (Bad Request)} if the logError has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LogErrorDTO> createLogError(@Valid @RequestBody LogErrorDTO logErrorDTO) throws URISyntaxException {
        LOG.debug("REST request to save LogError : {}", logErrorDTO);
        if (logErrorDTO.getId() != null) {
            throw new BadRequestAlertException("A new logError cannot already have an ID", ENTITY_NAME, "idexists");
        }
        logErrorDTO = logErrorService.save(logErrorDTO);
        return ResponseEntity.created(new URI("/api/log-errors/" + logErrorDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, logErrorDTO.getId()))
            .body(logErrorDTO);
    }

    /**
     * {@code PUT  /log-errors/:id} : Updates an existing logError.
     *
     * @param id the id of the logErrorDTO to save.
     * @param logErrorDTO the logErrorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logErrorDTO,
     * or with status {@code 400 (Bad Request)} if the logErrorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logErrorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LogErrorDTO> updateLogError(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody LogErrorDTO logErrorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LogError : {}, {}", id, logErrorDTO);
        if (logErrorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logErrorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logErrorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        logErrorDTO = logErrorService.update(logErrorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logErrorDTO.getId()))
            .body(logErrorDTO);
    }

    /**
     * {@code PATCH  /log-errors/:id} : Partial updates given fields of an existing logError, field will ignore if it is null
     *
     * @param id the id of the logErrorDTO to save.
     * @param logErrorDTO the logErrorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logErrorDTO,
     * or with status {@code 400 (Bad Request)} if the logErrorDTO is not valid,
     * or with status {@code 404 (Not Found)} if the logErrorDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the logErrorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LogErrorDTO> partialUpdateLogError(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody LogErrorDTO logErrorDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LogError partially : {}, {}", id, logErrorDTO);
        if (logErrorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logErrorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logErrorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LogErrorDTO> result = logErrorService.partialUpdate(logErrorDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logErrorDTO.getId())
        );
    }

    /**
     * {@code GET  /log-errors} : get all the Log Errors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Log Errors in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LogErrorDTO>> getAllLogErrors(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of LogErrors");
        Page<LogErrorDTO> page = logErrorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /log-errors/:id} : get the "id" logError.
     *
     * @param id the id of the logErrorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logErrorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LogErrorDTO> getLogError(@PathVariable("id") String id) {
        LOG.debug("REST request to get LogError : {}", id);
        Optional<LogErrorDTO> logErrorDTO = logErrorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(logErrorDTO);
    }

    /**
     * {@code DELETE  /log-errors/:id} : delete the "id" logError.
     *
     * @param id the id of the logErrorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogError(@PathVariable("id") String id) {
        LOG.debug("REST request to delete LogError : {}", id);
        logErrorService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

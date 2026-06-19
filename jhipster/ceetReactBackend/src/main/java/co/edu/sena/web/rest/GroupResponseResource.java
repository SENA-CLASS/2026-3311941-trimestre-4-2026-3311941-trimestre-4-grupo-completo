package co.edu.sena.web.rest;

import co.edu.sena.repository.GroupResponseRepository;
import co.edu.sena.service.GroupResponseService;
import co.edu.sena.service.dto.GroupResponseDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.GroupResponse}.
 */
@RestController
@RequestMapping("/api/group-responses")
public class GroupResponseResource {

    private static final Logger LOG = LoggerFactory.getLogger(GroupResponseResource.class);

    private static final String ENTITY_NAME = "groupResponse";

    @Value("${jhipster.clientApp.name:ceet2}")
    private String applicationName;

    private final GroupResponseService groupResponseService;

    private final GroupResponseRepository groupResponseRepository;

    public GroupResponseResource(GroupResponseService groupResponseService, GroupResponseRepository groupResponseRepository) {
        this.groupResponseService = groupResponseService;
        this.groupResponseRepository = groupResponseRepository;
    }

    /**
     * {@code POST  /group-responses} : Create a new groupResponse.
     *
     * @param groupResponseDTO the groupResponseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new groupResponseDTO, or with status {@code 400 (Bad Request)} if the groupResponse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<GroupResponseDTO> createGroupResponse(@Valid @RequestBody GroupResponseDTO groupResponseDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save GroupResponse : {}", groupResponseDTO);
        if (groupResponseDTO.getId() != null) {
            throw new BadRequestAlertException("A new groupResponse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        groupResponseDTO = groupResponseService.save(groupResponseDTO);
        return ResponseEntity.created(new URI("/api/group-responses/" + groupResponseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, groupResponseDTO.getId()))
            .body(groupResponseDTO);
    }

    /**
     * {@code PUT  /group-responses/:id} : Updates an existing groupResponse.
     *
     * @param id the id of the groupResponseDTO to save.
     * @param groupResponseDTO the groupResponseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupResponseDTO,
     * or with status {@code 400 (Bad Request)} if the groupResponseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the groupResponseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<GroupResponseDTO> updateGroupResponse(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody GroupResponseDTO groupResponseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update GroupResponse : {}, {}", id, groupResponseDTO);
        if (groupResponseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, groupResponseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!groupResponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        groupResponseDTO = groupResponseService.update(groupResponseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupResponseDTO.getId()))
            .body(groupResponseDTO);
    }

    /**
     * {@code PATCH  /group-responses/:id} : Partial updates given fields of an existing groupResponse, field will ignore if it is null
     *
     * @param id the id of the groupResponseDTO to save.
     * @param groupResponseDTO the groupResponseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupResponseDTO,
     * or with status {@code 400 (Bad Request)} if the groupResponseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the groupResponseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the groupResponseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GroupResponseDTO> partialUpdateGroupResponse(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody GroupResponseDTO groupResponseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update GroupResponse partially : {}, {}", id, groupResponseDTO);
        if (groupResponseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, groupResponseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!groupResponseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GroupResponseDTO> result = groupResponseService.partialUpdate(groupResponseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupResponseDTO.getId())
        );
    }

    /**
     * {@code GET  /group-responses} : get all the Group Responses.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Group Responses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<GroupResponseDTO>> getAllGroupResponses(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of GroupResponses");
        Page<GroupResponseDTO> page;
        if (eagerload) {
            page = groupResponseService.findAllWithEagerRelationships(pageable);
        } else {
            page = groupResponseService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /group-responses/:id} : get the "id" groupResponse.
     *
     * @param id the id of the groupResponseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the groupResponseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<GroupResponseDTO> getGroupResponse(@PathVariable("id") String id) {
        LOG.debug("REST request to get GroupResponse : {}", id);
        Optional<GroupResponseDTO> groupResponseDTO = groupResponseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(groupResponseDTO);
    }

    /**
     * {@code DELETE  /group-responses/:id} : delete the "id" groupResponse.
     *
     * @param id the id of the groupResponseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroupResponse(@PathVariable("id") String id) {
        LOG.debug("REST request to delete GroupResponse : {}", id);
        groupResponseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id))
            .build();
    }
}

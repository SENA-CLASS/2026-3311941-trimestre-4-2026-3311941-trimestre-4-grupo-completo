package co.edu.sena.web.rest;

import co.edu.sena.repository.ItemListRepository;
import co.edu.sena.service.ItemListService;
import co.edu.sena.service.dto.ItemListDTO;
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
 * REST controller for managing {@link co.edu.sena.domain.ItemList}.
 */
@RestController
@RequestMapping("/api/item-lists")
public class ItemListResource {

    private static final Logger LOG = LoggerFactory.getLogger(ItemListResource.class);

    private static final String ENTITY_NAME = "itemList";

    @Value("${jhipster.clientApp.name:ceet}")
    private String applicationName;

    private final ItemListService itemListService;

    private final ItemListRepository itemListRepository;

    public ItemListResource(ItemListService itemListService, ItemListRepository itemListRepository) {
        this.itemListService = itemListService;
        this.itemListRepository = itemListRepository;
    }

    /**
     * {@code POST  /item-lists} : Create a new itemList.
     *
     * @param itemListDTO the itemListDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemListDTO, or with status {@code 400 (Bad Request)} if the itemList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ItemListDTO> createItemList(@Valid @RequestBody ItemListDTO itemListDTO) throws URISyntaxException {
        LOG.debug("REST request to save ItemList : {}", itemListDTO);
        if (itemListDTO.getId() != null) {
            throw new BadRequestAlertException("A new itemList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        itemListDTO = itemListService.save(itemListDTO);
        return ResponseEntity.created(new URI("/api/item-lists/" + itemListDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, itemListDTO.getId()))
            .body(itemListDTO);
    }

    /**
     * {@code PUT  /item-lists/:id} : Updates an existing itemList.
     *
     * @param id the id of the itemListDTO to save.
     * @param itemListDTO the itemListDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemListDTO,
     * or with status {@code 400 (Bad Request)} if the itemListDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemListDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ItemListDTO> updateItemList(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody ItemListDTO itemListDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ItemList : {}, {}", id, itemListDTO);
        if (itemListDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemListDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        itemListDTO = itemListService.update(itemListDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemListDTO.getId()))
            .body(itemListDTO);
    }

    /**
     * {@code PATCH  /item-lists/:id} : Partial updates given fields of an existing itemList, field will ignore if it is null
     *
     * @param id the id of the itemListDTO to save.
     * @param itemListDTO the itemListDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemListDTO,
     * or with status {@code 400 (Bad Request)} if the itemListDTO is not valid,
     * or with status {@code 404 (Not Found)} if the itemListDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the itemListDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ItemListDTO> partialUpdateItemList(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody ItemListDTO itemListDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ItemList partially : {}, {}", id, itemListDTO);
        if (itemListDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, itemListDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!itemListRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ItemListDTO> result = itemListService.partialUpdate(itemListDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemListDTO.getId())
        );
    }

    /**
     * {@code GET  /item-lists} : get all the Item Lists.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Item Lists in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ItemListDTO>> getAllItemLists(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        LOG.debug("REST request to get a page of ItemLists");
        Page<ItemListDTO> page;
        if (eagerload) {
            page = itemListService.findAllWithEagerRelationships(pageable);
        } else {
            page = itemListService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /item-lists/:id} : get the "id" itemList.
     *
     * @param id the id of the itemListDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemListDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ItemListDTO> getItemList(@PathVariable("id") String id) {
        LOG.debug("REST request to get ItemList : {}", id);
        Optional<ItemListDTO> itemListDTO = itemListService.findOne(id);
        return ResponseUtil.wrapOrNotFound(itemListDTO);
    }

    /**
     * {@code DELETE  /item-lists/:id} : delete the "id" itemList.
     *
     * @param id the id of the itemListDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItemList(@PathVariable("id") String id) {
        LOG.debug("REST request to delete ItemList : {}", id);
        itemListService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

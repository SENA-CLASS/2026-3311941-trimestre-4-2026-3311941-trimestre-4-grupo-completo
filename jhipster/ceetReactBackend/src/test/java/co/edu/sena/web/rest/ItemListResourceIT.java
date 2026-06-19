package co.edu.sena.web.rest;

import static co.edu.sena.domain.ItemListAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.ItemList;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.repository.ItemListRepository;
import co.edu.sena.service.ItemListService;
import co.edu.sena.service.dto.ItemListDTO;
import co.edu.sena.service.mapper.ItemListMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link ItemListResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ItemListResourceIT {

    private static final Integer DEFAULT_ITEM_NUMBER = 1;
    private static final Integer UPDATED_ITEM_NUMBER = 2;

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/item-lists";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ItemListRepository itemListRepository;

    @Mock
    private ItemListRepository itemListRepositoryMock;

    @Autowired
    private ItemListMapper itemListMapper;

    @Mock
    private ItemListService itemListServiceMock;

    @Autowired
    private MockMvc restItemListMockMvc;

    private ItemList itemList;

    private ItemList insertedItemList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemList createEntity() {
        ItemList itemList = new ItemList().itemNumber(DEFAULT_ITEM_NUMBER).question(DEFAULT_QUESTION);
        // Add required entity
        CheckList checkList;
        checkList = CheckListResourceIT.createEntity();
        checkList.setId("fixed-id-for-tests");
        itemList.setCheckList(checkList);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createEntity();
        learningResult.setId("fixed-id-for-tests");
        itemList.setLearningResult(learningResult);
        return itemList;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemList createUpdatedEntity() {
        ItemList updatedItemList = new ItemList().itemNumber(UPDATED_ITEM_NUMBER).question(UPDATED_QUESTION);
        // Add required entity
        CheckList checkList;
        checkList = CheckListResourceIT.createUpdatedEntity();
        checkList.setId("fixed-id-for-tests");
        updatedItemList.setCheckList(checkList);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createUpdatedEntity();
        learningResult.setId("fixed-id-for-tests");
        updatedItemList.setLearningResult(learningResult);
        return updatedItemList;
    }

    @BeforeEach
    void initTest() {
        itemList = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedItemList != null) {
            itemListRepository.delete(insertedItemList);
            insertedItemList = null;
        }
    }

    @Test
    void createItemList() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);
        var returnedItemListDTO = om.readValue(
            restItemListMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemListDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ItemListDTO.class
        );

        // Validate the ItemList in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedItemList = itemListMapper.toEntity(returnedItemListDTO);
        assertItemListUpdatableFieldsEquals(returnedItemList, getPersistedItemList(returnedItemList));

        insertedItemList = returnedItemList;
    }

    @Test
    void createItemListWithExistingId() throws Exception {
        // Create the ItemList with an existing ID
        itemList.setId("existing_id");
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkItemNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        itemList.setItemNumber(null);

        // Create the ItemList, which fails.
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        restItemListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemListDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkQuestionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        itemList.setQuestion(null);

        // Create the ItemList, which fails.
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        restItemListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemListDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllItemLists() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        // Get all the itemListList
        restItemListMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemList.getId())))
            .andExpect(jsonPath("$.[*].itemNumber").value(hasItem(DEFAULT_ITEM_NUMBER)))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllItemListsWithEagerRelationshipsIsEnabled() throws Exception {
        when(itemListServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restItemListMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(itemListServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllItemListsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(itemListServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restItemListMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(itemListRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getItemList() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        // Get the itemList
        restItemListMockMvc
            .perform(get(ENTITY_API_URL_ID, itemList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemList.getId()))
            .andExpect(jsonPath("$.itemNumber").value(DEFAULT_ITEM_NUMBER))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION));
    }

    @Test
    void getNonExistingItemList() throws Exception {
        // Get the itemList
        restItemListMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingItemList() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemList
        ItemList updatedItemList = itemListRepository.findById(itemList.getId()).orElseThrow();
        updatedItemList.itemNumber(UPDATED_ITEM_NUMBER).question(UPDATED_QUESTION);
        ItemListDTO itemListDTO = itemListMapper.toDto(updatedItemList);

        restItemListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemListDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemListDTO))
            )
            .andExpect(status().isOk());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedItemListToMatchAllProperties(updatedItemList);
    }

    @Test
    void putNonExistingItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, itemListDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(itemListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(itemListDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateItemListWithPatch() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemList using partial update
        ItemList partialUpdatedItemList = new ItemList();
        partialUpdatedItemList.setId(itemList.getId());

        restItemListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedItemList))
            )
            .andExpect(status().isOk());

        // Validate the ItemList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertItemListUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedItemList, itemList), getPersistedItemList(itemList));
    }

    @Test
    void fullUpdateItemListWithPatch() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the itemList using partial update
        ItemList partialUpdatedItemList = new ItemList();
        partialUpdatedItemList.setId(itemList.getId());

        partialUpdatedItemList.itemNumber(UPDATED_ITEM_NUMBER).question(UPDATED_QUESTION);

        restItemListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedItemList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedItemList))
            )
            .andExpect(status().isOk());

        // Validate the ItemList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertItemListUpdatableFieldsEquals(partialUpdatedItemList, getPersistedItemList(partialUpdatedItemList));
    }

    @Test
    void patchNonExistingItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, itemListDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(itemListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(itemListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamItemList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        itemList.setId(UUID.randomUUID().toString());

        // Create the ItemList
        ItemListDTO itemListDTO = itemListMapper.toDto(itemList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restItemListMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(itemListDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ItemList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteItemList() throws Exception {
        // Initialize the database
        insertedItemList = itemListRepository.save(itemList);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the itemList
        restItemListMockMvc
            .perform(delete(ENTITY_API_URL_ID, itemList.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return itemListRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected ItemList getPersistedItemList(ItemList itemList) {
        return itemListRepository.findById(itemList.getId()).orElseThrow();
    }

    protected void assertPersistedItemListToMatchAllProperties(ItemList expectedItemList) {
        assertItemListAllPropertiesEquals(expectedItemList, getPersistedItemList(expectedItemList));
    }

    protected void assertPersistedItemListToMatchUpdatableProperties(ItemList expectedItemList) {
        assertItemListAllUpdatablePropertiesEquals(expectedItemList, getPersistedItemList(expectedItemList));
    }
}

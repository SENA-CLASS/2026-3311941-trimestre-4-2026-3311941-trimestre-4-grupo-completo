package co.edu.sena.web.rest;

import static co.edu.sena.domain.CheckListAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CheckListRepository;
import co.edu.sena.service.dto.CheckListDTO;
import co.edu.sena.service.mapper.CheckListMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link CheckListResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CheckListResourceIT {

    private static final String DEFAULT_LIST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LIST_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_LIST_STATE = State.ACTIVE;
    private static final State UPDATED_LIST_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/check-lists";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CheckListRepository checkListRepository;

    @Autowired
    private CheckListMapper checkListMapper;

    @Autowired
    private MockMvc restCheckListMockMvc;

    private CheckList checkList;

    private CheckList insertedCheckList;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckList createEntity() {
        CheckList checkList = new CheckList().listName(DEFAULT_LIST_NAME).listState(DEFAULT_LIST_STATE);
        // Add required entity
        TrainingProgram trainingProgram;
        trainingProgram = TrainingProgramResourceIT.createEntity();
        trainingProgram.setId("fixed-id-for-tests");
        checkList.setTrainingProgram(trainingProgram);
        return checkList;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckList createUpdatedEntity() {
        CheckList updatedCheckList = new CheckList().listName(UPDATED_LIST_NAME).listState(UPDATED_LIST_STATE);
        // Add required entity
        TrainingProgram trainingProgram;
        trainingProgram = TrainingProgramResourceIT.createUpdatedEntity();
        trainingProgram.setId("fixed-id-for-tests");
        updatedCheckList.setTrainingProgram(trainingProgram);
        return updatedCheckList;
    }

    @BeforeEach
    void initTest() {
        checkList = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCheckList != null) {
            checkListRepository.delete(insertedCheckList);
            insertedCheckList = null;
        }
    }

    @Test
    void createCheckList() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);
        var returnedCheckListDTO = om.readValue(
            restCheckListMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CheckListDTO.class
        );

        // Validate the CheckList in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCheckList = checkListMapper.toEntity(returnedCheckListDTO);
        assertCheckListUpdatableFieldsEquals(returnedCheckList, getPersistedCheckList(returnedCheckList));

        insertedCheckList = returnedCheckList;
    }

    @Test
    void createCheckListWithExistingId() throws Exception {
        // Create the CheckList with an existing ID
        checkList.setId("existing_id");
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkListNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        checkList.setListName(null);

        // Create the CheckList, which fails.
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        restCheckListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkListStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        checkList.setListState(null);

        // Create the CheckList, which fails.
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        restCheckListMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCheckLists() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        // Get all the checkListList
        restCheckListMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkList.getId())))
            .andExpect(jsonPath("$.[*].listName").value(hasItem(DEFAULT_LIST_NAME)))
            .andExpect(jsonPath("$.[*].listState").value(hasItem(DEFAULT_LIST_STATE.toString())));
    }

    @Test
    void getCheckList() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        // Get the checkList
        restCheckListMockMvc
            .perform(get(ENTITY_API_URL_ID, checkList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(checkList.getId()))
            .andExpect(jsonPath("$.listName").value(DEFAULT_LIST_NAME))
            .andExpect(jsonPath("$.listState").value(DEFAULT_LIST_STATE.toString()));
    }

    @Test
    void getNonExistingCheckList() throws Exception {
        // Get the checkList
        restCheckListMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCheckList() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkList
        CheckList updatedCheckList = checkListRepository.findById(checkList.getId()).orElseThrow();
        updatedCheckList.listName(UPDATED_LIST_NAME).listState(UPDATED_LIST_STATE);
        CheckListDTO checkListDTO = checkListMapper.toDto(updatedCheckList);

        restCheckListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, checkListDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListDTO))
            )
            .andExpect(status().isOk());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCheckListToMatchAllProperties(updatedCheckList);
    }

    @Test
    void putNonExistingCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, checkListDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCheckListWithPatch() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkList using partial update
        CheckList partialUpdatedCheckList = new CheckList();
        partialUpdatedCheckList.setId(checkList.getId());

        partialUpdatedCheckList.listName(UPDATED_LIST_NAME).listState(UPDATED_LIST_STATE);

        restCheckListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCheckList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCheckList))
            )
            .andExpect(status().isOk());

        // Validate the CheckList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCheckListUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCheckList, checkList),
            getPersistedCheckList(checkList)
        );
    }

    @Test
    void fullUpdateCheckListWithPatch() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkList using partial update
        CheckList partialUpdatedCheckList = new CheckList();
        partialUpdatedCheckList.setId(checkList.getId());

        partialUpdatedCheckList.listName(UPDATED_LIST_NAME).listState(UPDATED_LIST_STATE);

        restCheckListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCheckList.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCheckList))
            )
            .andExpect(status().isOk());

        // Validate the CheckList in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCheckListUpdatableFieldsEquals(partialUpdatedCheckList, getPersistedCheckList(partialUpdatedCheckList));
    }

    @Test
    void patchNonExistingCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, checkListDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(checkListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(checkListDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCheckList() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkList.setId(UUID.randomUUID().toString());

        // Create the CheckList
        CheckListDTO checkListDTO = checkListMapper.toDto(checkList);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(checkListDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CheckList in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCheckList() throws Exception {
        // Initialize the database
        insertedCheckList = checkListRepository.save(checkList);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the checkList
        restCheckListMockMvc
            .perform(delete(ENTITY_API_URL_ID, checkList.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return checkListRepository.count();
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

    protected CheckList getPersistedCheckList(CheckList checkList) {
        return checkListRepository.findById(checkList.getId()).orElseThrow();
    }

    protected void assertPersistedCheckListToMatchAllProperties(CheckList expectedCheckList) {
        assertCheckListAllPropertiesEquals(expectedCheckList, getPersistedCheckList(expectedCheckList));
    }

    protected void assertPersistedCheckListToMatchUpdatableProperties(CheckList expectedCheckList) {
        assertCheckListAllUpdatablePropertiesEquals(expectedCheckList, getPersistedCheckList(expectedCheckList));
    }
}

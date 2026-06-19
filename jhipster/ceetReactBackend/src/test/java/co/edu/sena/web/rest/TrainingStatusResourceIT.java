package co.edu.sena.web.rest;

import static co.edu.sena.domain.TrainingStatusAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.TrainingStatus;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.TrainingStatusRepository;
import co.edu.sena.service.dto.TrainingStatusDTO;
import co.edu.sena.service.mapper.TrainingStatusMapper;
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
 * Integration tests for the {@link TrainingStatusResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TrainingStatusResourceIT {

    private static final String DEFAULT_STATUS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_STATUS_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_TRAINING = State.ACTIVE;
    private static final State UPDATED_STATE_TRAINING = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/training-statuses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TrainingStatusRepository trainingStatusRepository;

    @Autowired
    private TrainingStatusMapper trainingStatusMapper;

    @Autowired
    private MockMvc restTrainingStatusMockMvc;

    private TrainingStatus trainingStatus;

    private TrainingStatus insertedTrainingStatus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingStatus createEntity() {
        return new TrainingStatus().statusName(DEFAULT_STATUS_NAME).stateTraining(DEFAULT_STATE_TRAINING);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingStatus createUpdatedEntity() {
        return new TrainingStatus().statusName(UPDATED_STATUS_NAME).stateTraining(UPDATED_STATE_TRAINING);
    }

    @BeforeEach
    void initTest() {
        trainingStatus = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedTrainingStatus != null) {
            trainingStatusRepository.delete(insertedTrainingStatus);
            insertedTrainingStatus = null;
        }
    }

    @Test
    void createTrainingStatus() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);
        var returnedTrainingStatusDTO = om.readValue(
            restTrainingStatusMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingStatusDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TrainingStatusDTO.class
        );

        // Validate the TrainingStatus in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTrainingStatus = trainingStatusMapper.toEntity(returnedTrainingStatusDTO);
        assertTrainingStatusUpdatableFieldsEquals(returnedTrainingStatus, getPersistedTrainingStatus(returnedTrainingStatus));

        insertedTrainingStatus = returnedTrainingStatus;
    }

    @Test
    void createTrainingStatusWithExistingId() throws Exception {
        // Create the TrainingStatus with an existing ID
        trainingStatus.setId("existing_id");
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkStatusNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingStatus.setStatusName(null);

        // Create the TrainingStatus, which fails.
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        restTrainingStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingStatusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStateTrainingIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingStatus.setStateTraining(null);

        // Create the TrainingStatus, which fails.
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        restTrainingStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingStatusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllTrainingStatuses() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        // Get all the trainingStatusList
        restTrainingStatusMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingStatus.getId())))
            .andExpect(jsonPath("$.[*].statusName").value(hasItem(DEFAULT_STATUS_NAME)))
            .andExpect(jsonPath("$.[*].stateTraining").value(hasItem(DEFAULT_STATE_TRAINING.toString())));
    }

    @Test
    void getTrainingStatus() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        // Get the trainingStatus
        restTrainingStatusMockMvc
            .perform(get(ENTITY_API_URL_ID, trainingStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trainingStatus.getId()))
            .andExpect(jsonPath("$.statusName").value(DEFAULT_STATUS_NAME))
            .andExpect(jsonPath("$.stateTraining").value(DEFAULT_STATE_TRAINING.toString()));
    }

    @Test
    void getNonExistingTrainingStatus() throws Exception {
        // Get the trainingStatus
        restTrainingStatusMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingTrainingStatus() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingStatus
        TrainingStatus updatedTrainingStatus = trainingStatusRepository.findById(trainingStatus.getId()).orElseThrow();
        updatedTrainingStatus.statusName(UPDATED_STATUS_NAME).stateTraining(UPDATED_STATE_TRAINING);
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(updatedTrainingStatus);

        restTrainingStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trainingStatusDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingStatusDTO))
            )
            .andExpect(status().isOk());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTrainingStatusToMatchAllProperties(updatedTrainingStatus);
    }

    @Test
    void putNonExistingTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trainingStatusDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingStatusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTrainingStatusWithPatch() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingStatus using partial update
        TrainingStatus partialUpdatedTrainingStatus = new TrainingStatus();
        partialUpdatedTrainingStatus.setId(trainingStatus.getId());

        restTrainingStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrainingStatus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTrainingStatus))
            )
            .andExpect(status().isOk());

        // Validate the TrainingStatus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTrainingStatusUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTrainingStatus, trainingStatus),
            getPersistedTrainingStatus(trainingStatus)
        );
    }

    @Test
    void fullUpdateTrainingStatusWithPatch() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingStatus using partial update
        TrainingStatus partialUpdatedTrainingStatus = new TrainingStatus();
        partialUpdatedTrainingStatus.setId(trainingStatus.getId());

        partialUpdatedTrainingStatus.statusName(UPDATED_STATUS_NAME).stateTraining(UPDATED_STATE_TRAINING);

        restTrainingStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrainingStatus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTrainingStatus))
            )
            .andExpect(status().isOk());

        // Validate the TrainingStatus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTrainingStatusUpdatableFieldsEquals(partialUpdatedTrainingStatus, getPersistedTrainingStatus(partialUpdatedTrainingStatus));
    }

    @Test
    void patchNonExistingTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, trainingStatusDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(trainingStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(trainingStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTrainingStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingStatus.setId(UUID.randomUUID().toString());

        // Create the TrainingStatus
        TrainingStatusDTO trainingStatusDTO = trainingStatusMapper.toDto(trainingStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingStatusMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(trainingStatusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TrainingStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTrainingStatus() throws Exception {
        // Initialize the database
        insertedTrainingStatus = trainingStatusRepository.save(trainingStatus);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the trainingStatus
        restTrainingStatusMockMvc
            .perform(delete(ENTITY_API_URL_ID, trainingStatus.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return trainingStatusRepository.count();
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

    protected TrainingStatus getPersistedTrainingStatus(TrainingStatus trainingStatus) {
        return trainingStatusRepository.findById(trainingStatus.getId()).orElseThrow();
    }

    protected void assertPersistedTrainingStatusToMatchAllProperties(TrainingStatus expectedTrainingStatus) {
        assertTrainingStatusAllPropertiesEquals(expectedTrainingStatus, getPersistedTrainingStatus(expectedTrainingStatus));
    }

    protected void assertPersistedTrainingStatusToMatchUpdatableProperties(TrainingStatus expectedTrainingStatus) {
        assertTrainingStatusAllUpdatablePropertiesEquals(expectedTrainingStatus, getPersistedTrainingStatus(expectedTrainingStatus));
    }
}

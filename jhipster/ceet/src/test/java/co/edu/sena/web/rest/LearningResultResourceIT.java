package co.edu.sena.web.rest;

import static co.edu.sena.domain.LearningResultAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.repository.LearningResultRepository;
import co.edu.sena.service.dto.LearningResultDTO;
import co.edu.sena.service.mapper.LearningResultMapper;
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
 * Integration tests for the {@link LearningResultResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LearningResultResourceIT {

    private static final String DEFAULT_RESULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_RESULT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DENOMINATION = "AAAAAAAAAA";
    private static final String UPDATED_DENOMINATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/learning-results";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LearningResultRepository learningResultRepository;

    @Autowired
    private LearningResultMapper learningResultMapper;

    @Autowired
    private MockMvc restLearningResultMockMvc;

    private LearningResult learningResult;

    private LearningResult insertedLearningResult;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningResult createEntity() {
        LearningResult learningResult = new LearningResult().resultCode(DEFAULT_RESULT_CODE).denomination(DEFAULT_DENOMINATION);
        // Add required entity
        LearningCompetence learningCompetence;
        learningCompetence = LearningCompetenceResourceIT.createEntity();
        learningCompetence.setId("fixed-id-for-tests");
        learningResult.setLearningCompetence(learningCompetence);
        return learningResult;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningResult createUpdatedEntity() {
        LearningResult updatedLearningResult = new LearningResult().resultCode(UPDATED_RESULT_CODE).denomination(UPDATED_DENOMINATION);
        // Add required entity
        LearningCompetence learningCompetence;
        learningCompetence = LearningCompetenceResourceIT.createUpdatedEntity();
        learningCompetence.setId("fixed-id-for-tests");
        updatedLearningResult.setLearningCompetence(learningCompetence);
        return updatedLearningResult;
    }

    @BeforeEach
    void initTest() {
        learningResult = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLearningResult != null) {
            learningResultRepository.delete(insertedLearningResult);
            insertedLearningResult = null;
        }
    }

    @Test
    void createLearningResult() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);
        var returnedLearningResultDTO = om.readValue(
            restLearningResultMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningResultDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LearningResultDTO.class
        );

        // Validate the LearningResult in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLearningResult = learningResultMapper.toEntity(returnedLearningResultDTO);
        assertLearningResultUpdatableFieldsEquals(returnedLearningResult, getPersistedLearningResult(returnedLearningResult));

        insertedLearningResult = returnedLearningResult;
    }

    @Test
    void createLearningResultWithExistingId() throws Exception {
        // Create the LearningResult with an existing ID
        learningResult.setId("existing_id");
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLearningResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningResultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkResultCodeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        learningResult.setResultCode(null);

        // Create the LearningResult, which fails.
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        restLearningResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningResultDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDenominationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        learningResult.setDenomination(null);

        // Create the LearningResult, which fails.
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        restLearningResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningResultDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLearningResults() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        // Get all the learningResultList
        restLearningResultMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(learningResult.getId())))
            .andExpect(jsonPath("$.[*].resultCode").value(hasItem(DEFAULT_RESULT_CODE)))
            .andExpect(jsonPath("$.[*].denomination").value(hasItem(DEFAULT_DENOMINATION)));
    }

    @Test
    void getLearningResult() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        // Get the learningResult
        restLearningResultMockMvc
            .perform(get(ENTITY_API_URL_ID, learningResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(learningResult.getId()))
            .andExpect(jsonPath("$.resultCode").value(DEFAULT_RESULT_CODE))
            .andExpect(jsonPath("$.denomination").value(DEFAULT_DENOMINATION));
    }

    @Test
    void getNonExistingLearningResult() throws Exception {
        // Get the learningResult
        restLearningResultMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLearningResult() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningResult
        LearningResult updatedLearningResult = learningResultRepository.findById(learningResult.getId()).orElseThrow();
        updatedLearningResult.resultCode(UPDATED_RESULT_CODE).denomination(UPDATED_DENOMINATION);
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(updatedLearningResult);

        restLearningResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, learningResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningResultDTO))
            )
            .andExpect(status().isOk());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLearningResultToMatchAllProperties(updatedLearningResult);
    }

    @Test
    void putNonExistingLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, learningResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLearningResultWithPatch() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningResult using partial update
        LearningResult partialUpdatedLearningResult = new LearningResult();
        partialUpdatedLearningResult.setId(learningResult.getId());

        restLearningResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLearningResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLearningResult))
            )
            .andExpect(status().isOk());

        // Validate the LearningResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLearningResultUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLearningResult, learningResult),
            getPersistedLearningResult(learningResult)
        );
    }

    @Test
    void fullUpdateLearningResultWithPatch() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningResult using partial update
        LearningResult partialUpdatedLearningResult = new LearningResult();
        partialUpdatedLearningResult.setId(learningResult.getId());

        partialUpdatedLearningResult.resultCode(UPDATED_RESULT_CODE).denomination(UPDATED_DENOMINATION);

        restLearningResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLearningResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLearningResult))
            )
            .andExpect(status().isOk());

        // Validate the LearningResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLearningResultUpdatableFieldsEquals(partialUpdatedLearningResult, getPersistedLearningResult(partialUpdatedLearningResult));
    }

    @Test
    void patchNonExistingLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, learningResultDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(learningResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(learningResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLearningResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningResult.setId(UUID.randomUUID().toString());

        // Create the LearningResult
        LearningResultDTO learningResultDTO = learningResultMapper.toDto(learningResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningResultMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(learningResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LearningResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLearningResult() throws Exception {
        // Initialize the database
        insertedLearningResult = learningResultRepository.save(learningResult);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the learningResult
        restLearningResultMockMvc
            .perform(delete(ENTITY_API_URL_ID, learningResult.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return learningResultRepository.count();
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

    protected LearningResult getPersistedLearningResult(LearningResult learningResult) {
        return learningResultRepository.findById(learningResult.getId()).orElseThrow();
    }

    protected void assertPersistedLearningResultToMatchAllProperties(LearningResult expectedLearningResult) {
        assertLearningResultAllPropertiesEquals(expectedLearningResult, getPersistedLearningResult(expectedLearningResult));
    }

    protected void assertPersistedLearningResultToMatchUpdatableProperties(LearningResult expectedLearningResult) {
        assertLearningResultAllUpdatablePropertiesEquals(expectedLearningResult, getPersistedLearningResult(expectedLearningResult));
    }
}

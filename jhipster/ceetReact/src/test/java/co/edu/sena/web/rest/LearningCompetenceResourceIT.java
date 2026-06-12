package co.edu.sena.web.rest;

import static co.edu.sena.domain.LearningCompetenceAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.repository.LearningCompetenceRepository;
import co.edu.sena.service.dto.LearningCompetenceDTO;
import co.edu.sena.service.mapper.LearningCompetenceMapper;
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
 * Integration tests for the {@link LearningCompetenceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LearningCompetenceResourceIT {

    private static final String DEFAULT_COMPETENCE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COMPETENCE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_COMPETITION_DENOMINATION = "AAAAAAAAAA";
    private static final String UPDATED_COMPETITION_DENOMINATION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/learning-competences";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LearningCompetenceRepository learningCompetenceRepository;

    @Autowired
    private LearningCompetenceMapper learningCompetenceMapper;

    @Autowired
    private MockMvc restLearningCompetenceMockMvc;

    private LearningCompetence learningCompetence;

    private LearningCompetence insertedLearningCompetence;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningCompetence createEntity() {
        LearningCompetence learningCompetence = new LearningCompetence()
            .competenceCode(DEFAULT_COMPETENCE_CODE)
            .competitionDenomination(DEFAULT_COMPETITION_DENOMINATION);
        // Add required entity
        TrainingProgram trainingProgram;
        trainingProgram = TrainingProgramResourceIT.createEntity();
        trainingProgram.setId("fixed-id-for-tests");
        learningCompetence.setTrainingProgram(trainingProgram);
        return learningCompetence;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LearningCompetence createUpdatedEntity() {
        LearningCompetence updatedLearningCompetence = new LearningCompetence()
            .competenceCode(UPDATED_COMPETENCE_CODE)
            .competitionDenomination(UPDATED_COMPETITION_DENOMINATION);
        // Add required entity
        TrainingProgram trainingProgram;
        trainingProgram = TrainingProgramResourceIT.createUpdatedEntity();
        trainingProgram.setId("fixed-id-for-tests");
        updatedLearningCompetence.setTrainingProgram(trainingProgram);
        return updatedLearningCompetence;
    }

    @BeforeEach
    void initTest() {
        learningCompetence = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLearningCompetence != null) {
            learningCompetenceRepository.delete(insertedLearningCompetence);
            insertedLearningCompetence = null;
        }
    }

    @Test
    void createLearningCompetence() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);
        var returnedLearningCompetenceDTO = om.readValue(
            restLearningCompetenceMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningCompetenceDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LearningCompetenceDTO.class
        );

        // Validate the LearningCompetence in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLearningCompetence = learningCompetenceMapper.toEntity(returnedLearningCompetenceDTO);
        assertLearningCompetenceUpdatableFieldsEquals(
            returnedLearningCompetence,
            getPersistedLearningCompetence(returnedLearningCompetence)
        );

        insertedLearningCompetence = returnedLearningCompetence;
    }

    @Test
    void createLearningCompetenceWithExistingId() throws Exception {
        // Create the LearningCompetence with an existing ID
        learningCompetence.setId("existing_id");
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLearningCompetenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningCompetenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkCompetenceCodeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        learningCompetence.setCompetenceCode(null);

        // Create the LearningCompetence, which fails.
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        restLearningCompetenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningCompetenceDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkCompetitionDenominationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        learningCompetence.setCompetitionDenomination(null);

        // Create the LearningCompetence, which fails.
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        restLearningCompetenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningCompetenceDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLearningCompetences() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        // Get all the learningCompetenceList
        restLearningCompetenceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(learningCompetence.getId())))
            .andExpect(jsonPath("$.[*].competenceCode").value(hasItem(DEFAULT_COMPETENCE_CODE)))
            .andExpect(jsonPath("$.[*].competitionDenomination").value(hasItem(DEFAULT_COMPETITION_DENOMINATION)));
    }

    @Test
    void getLearningCompetence() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        // Get the learningCompetence
        restLearningCompetenceMockMvc
            .perform(get(ENTITY_API_URL_ID, learningCompetence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(learningCompetence.getId()))
            .andExpect(jsonPath("$.competenceCode").value(DEFAULT_COMPETENCE_CODE))
            .andExpect(jsonPath("$.competitionDenomination").value(DEFAULT_COMPETITION_DENOMINATION));
    }

    @Test
    void getNonExistingLearningCompetence() throws Exception {
        // Get the learningCompetence
        restLearningCompetenceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLearningCompetence() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningCompetence
        LearningCompetence updatedLearningCompetence = learningCompetenceRepository.findById(learningCompetence.getId()).orElseThrow();
        updatedLearningCompetence.competenceCode(UPDATED_COMPETENCE_CODE).competitionDenomination(UPDATED_COMPETITION_DENOMINATION);
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(updatedLearningCompetence);

        restLearningCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, learningCompetenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningCompetenceDTO))
            )
            .andExpect(status().isOk());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLearningCompetenceToMatchAllProperties(updatedLearningCompetence);
    }

    @Test
    void putNonExistingLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, learningCompetenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(learningCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(learningCompetenceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLearningCompetenceWithPatch() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningCompetence using partial update
        LearningCompetence partialUpdatedLearningCompetence = new LearningCompetence();
        partialUpdatedLearningCompetence.setId(learningCompetence.getId());

        partialUpdatedLearningCompetence.competitionDenomination(UPDATED_COMPETITION_DENOMINATION);

        restLearningCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLearningCompetence.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLearningCompetence))
            )
            .andExpect(status().isOk());

        // Validate the LearningCompetence in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLearningCompetenceUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLearningCompetence, learningCompetence),
            getPersistedLearningCompetence(learningCompetence)
        );
    }

    @Test
    void fullUpdateLearningCompetenceWithPatch() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the learningCompetence using partial update
        LearningCompetence partialUpdatedLearningCompetence = new LearningCompetence();
        partialUpdatedLearningCompetence.setId(learningCompetence.getId());

        partialUpdatedLearningCompetence.competenceCode(UPDATED_COMPETENCE_CODE).competitionDenomination(UPDATED_COMPETITION_DENOMINATION);

        restLearningCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLearningCompetence.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLearningCompetence))
            )
            .andExpect(status().isOk());

        // Validate the LearningCompetence in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLearningCompetenceUpdatableFieldsEquals(
            partialUpdatedLearningCompetence,
            getPersistedLearningCompetence(partialUpdatedLearningCompetence)
        );
    }

    @Test
    void patchNonExistingLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, learningCompetenceDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(learningCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(learningCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLearningCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        learningCompetence.setId(UUID.randomUUID().toString());

        // Create the LearningCompetence
        LearningCompetenceDTO learningCompetenceDTO = learningCompetenceMapper.toDto(learningCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLearningCompetenceMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(learningCompetenceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LearningCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLearningCompetence() throws Exception {
        // Initialize the database
        insertedLearningCompetence = learningCompetenceRepository.save(learningCompetence);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the learningCompetence
        restLearningCompetenceMockMvc
            .perform(delete(ENTITY_API_URL_ID, learningCompetence.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return learningCompetenceRepository.count();
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

    protected LearningCompetence getPersistedLearningCompetence(LearningCompetence learningCompetence) {
        return learningCompetenceRepository.findById(learningCompetence.getId()).orElseThrow();
    }

    protected void assertPersistedLearningCompetenceToMatchAllProperties(LearningCompetence expectedLearningCompetence) {
        assertLearningCompetenceAllPropertiesEquals(expectedLearningCompetence, getPersistedLearningCompetence(expectedLearningCompetence));
    }

    protected void assertPersistedLearningCompetenceToMatchUpdatableProperties(LearningCompetence expectedLearningCompetence) {
        assertLearningCompetenceAllUpdatablePropertiesEquals(
            expectedLearningCompetence,
            getPersistedLearningCompetence(expectedLearningCompetence)
        );
    }
}

package co.edu.sena.web.rest;

import static co.edu.sena.domain.AssessmentAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Assessment;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.AssessmentRepository;
import co.edu.sena.service.dto.AssessmentDTO;
import co.edu.sena.service.mapper.AssessmentMapper;
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
 * Integration tests for the {@link AssessmentResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AssessmentResourceIT {

    private static final String DEFAULT_ASSESSMENT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_ASSESSMENT_TYPE = "BBBBBBBBBB";

    private static final State DEFAULT_ASSESSMENT_STATE = State.ACTIVE;
    private static final State UPDATED_ASSESSMENT_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/assessments";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AssessmentMapper assessmentMapper;

    @Autowired
    private MockMvc restAssessmentMockMvc;

    private Assessment assessment;

    private Assessment insertedAssessment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assessment createEntity() {
        return new Assessment().assessmentType(DEFAULT_ASSESSMENT_TYPE).assessmentState(DEFAULT_ASSESSMENT_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Assessment createUpdatedEntity() {
        return new Assessment().assessmentType(UPDATED_ASSESSMENT_TYPE).assessmentState(UPDATED_ASSESSMENT_STATE);
    }

    @BeforeEach
    void initTest() {
        assessment = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedAssessment != null) {
            assessmentRepository.delete(insertedAssessment);
            insertedAssessment = null;
        }
    }

    @Test
    void createAssessment() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);
        var returnedAssessmentDTO = om.readValue(
            restAssessmentMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assessmentDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AssessmentDTO.class
        );

        // Validate the Assessment in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAssessment = assessmentMapper.toEntity(returnedAssessmentDTO);
        assertAssessmentUpdatableFieldsEquals(returnedAssessment, getPersistedAssessment(returnedAssessment));

        insertedAssessment = returnedAssessment;
    }

    @Test
    void createAssessmentWithExistingId() throws Exception {
        // Create the Assessment with an existing ID
        assessment.setId("existing_id");
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssessmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assessmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkAssessmentTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        assessment.setAssessmentType(null);

        // Create the Assessment, which fails.
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        restAssessmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assessmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkAssessmentStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        assessment.setAssessmentState(null);

        // Create the Assessment, which fails.
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        restAssessmentMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assessmentDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllAssessments() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        // Get all the assessmentList
        restAssessmentMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assessment.getId())))
            .andExpect(jsonPath("$.[*].assessmentType").value(hasItem(DEFAULT_ASSESSMENT_TYPE)))
            .andExpect(jsonPath("$.[*].assessmentState").value(hasItem(DEFAULT_ASSESSMENT_STATE.toString())));
    }

    @Test
    void getAssessment() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        // Get the assessment
        restAssessmentMockMvc
            .perform(get(ENTITY_API_URL_ID, assessment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(assessment.getId()))
            .andExpect(jsonPath("$.assessmentType").value(DEFAULT_ASSESSMENT_TYPE))
            .andExpect(jsonPath("$.assessmentState").value(DEFAULT_ASSESSMENT_STATE.toString()));
    }

    @Test
    void getNonExistingAssessment() throws Exception {
        // Get the assessment
        restAssessmentMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingAssessment() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assessment
        Assessment updatedAssessment = assessmentRepository.findById(assessment.getId()).orElseThrow();
        updatedAssessment.assessmentType(UPDATED_ASSESSMENT_TYPE).assessmentState(UPDATED_ASSESSMENT_STATE);
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(updatedAssessment);

        restAssessmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assessmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assessmentDTO))
            )
            .andExpect(status().isOk());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAssessmentToMatchAllProperties(updatedAssessment);
    }

    @Test
    void putNonExistingAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, assessmentDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assessmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(assessmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(assessmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateAssessmentWithPatch() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assessment using partial update
        Assessment partialUpdatedAssessment = new Assessment();
        partialUpdatedAssessment.setId(assessment.getId());

        partialUpdatedAssessment.assessmentType(UPDATED_ASSESSMENT_TYPE).assessmentState(UPDATED_ASSESSMENT_STATE);

        restAssessmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssessment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssessment))
            )
            .andExpect(status().isOk());

        // Validate the Assessment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssessmentUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAssessment, assessment),
            getPersistedAssessment(assessment)
        );
    }

    @Test
    void fullUpdateAssessmentWithPatch() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the assessment using partial update
        Assessment partialUpdatedAssessment = new Assessment();
        partialUpdatedAssessment.setId(assessment.getId());

        partialUpdatedAssessment.assessmentType(UPDATED_ASSESSMENT_TYPE).assessmentState(UPDATED_ASSESSMENT_STATE);

        restAssessmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAssessment.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAssessment))
            )
            .andExpect(status().isOk());

        // Validate the Assessment in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAssessmentUpdatableFieldsEquals(partialUpdatedAssessment, getPersistedAssessment(partialUpdatedAssessment));
    }

    @Test
    void patchNonExistingAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, assessmentDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assessmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(assessmentDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamAssessment() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        assessment.setId(UUID.randomUUID().toString());

        // Create the Assessment
        AssessmentDTO assessmentDTO = assessmentMapper.toDto(assessment);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAssessmentMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(assessmentDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Assessment in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteAssessment() throws Exception {
        // Initialize the database
        insertedAssessment = assessmentRepository.save(assessment);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the assessment
        restAssessmentMockMvc
            .perform(delete(ENTITY_API_URL_ID, assessment.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return assessmentRepository.count();
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

    protected Assessment getPersistedAssessment(Assessment assessment) {
        return assessmentRepository.findById(assessment.getId()).orElseThrow();
    }

    protected void assertPersistedAssessmentToMatchAllProperties(Assessment expectedAssessment) {
        assertAssessmentAllPropertiesEquals(expectedAssessment, getPersistedAssessment(expectedAssessment));
    }

    protected void assertPersistedAssessmentToMatchUpdatableProperties(Assessment expectedAssessment) {
        assertAssessmentAllUpdatablePropertiesEquals(expectedAssessment, getPersistedAssessment(expectedAssessment));
    }
}

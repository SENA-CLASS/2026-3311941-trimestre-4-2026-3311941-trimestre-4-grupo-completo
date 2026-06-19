package co.edu.sena.web.rest;

import static co.edu.sena.domain.ProjectActivityAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.ProjectActivity;
import co.edu.sena.domain.ProjectPhase;
import co.edu.sena.repository.ProjectActivityRepository;
import co.edu.sena.service.dto.ProjectActivityDTO;
import co.edu.sena.service.mapper.ProjectActivityMapper;
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
 * Integration tests for the {@link ProjectActivityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ProjectActivityResourceIT {

    private static final Integer DEFAULT_ACTIVITY_NUMBER = 1;
    private static final Integer UPDATED_ACTIVITY_NUMBER = 2;

    private static final String DEFAULT_ACTIVITY_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITY_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_ACTIVITY_STATE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_ACTIVITY_STATE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/project-activities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ProjectActivityRepository projectActivityRepository;

    @Autowired
    private ProjectActivityMapper projectActivityMapper;

    @Autowired
    private MockMvc restProjectActivityMockMvc;

    private ProjectActivity projectActivity;

    private ProjectActivity insertedProjectActivity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectActivity createEntity() {
        ProjectActivity projectActivity = new ProjectActivity()
            .activityNumber(DEFAULT_ACTIVITY_NUMBER)
            .activityDescription(DEFAULT_ACTIVITY_DESCRIPTION)
            .projectActivityState(DEFAULT_PROJECT_ACTIVITY_STATE);
        // Add required entity
        ProjectPhase projectPhase;
        projectPhase = ProjectPhaseResourceIT.createEntity();
        projectPhase.setId("fixed-id-for-tests");
        projectActivity.setProjectPhase(projectPhase);
        return projectActivity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectActivity createUpdatedEntity() {
        ProjectActivity updatedProjectActivity = new ProjectActivity()
            .activityNumber(UPDATED_ACTIVITY_NUMBER)
            .activityDescription(UPDATED_ACTIVITY_DESCRIPTION)
            .projectActivityState(UPDATED_PROJECT_ACTIVITY_STATE);
        // Add required entity
        ProjectPhase projectPhase;
        projectPhase = ProjectPhaseResourceIT.createUpdatedEntity();
        projectPhase.setId("fixed-id-for-tests");
        updatedProjectActivity.setProjectPhase(projectPhase);
        return updatedProjectActivity;
    }

    @BeforeEach
    void initTest() {
        projectActivity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedProjectActivity != null) {
            projectActivityRepository.delete(insertedProjectActivity);
            insertedProjectActivity = null;
        }
    }

    @Test
    void createProjectActivity() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);
        var returnedProjectActivityDTO = om.readValue(
            restProjectActivityMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ProjectActivityDTO.class
        );

        // Validate the ProjectActivity in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedProjectActivity = projectActivityMapper.toEntity(returnedProjectActivityDTO);
        assertProjectActivityUpdatableFieldsEquals(returnedProjectActivity, getPersistedProjectActivity(returnedProjectActivity));

        insertedProjectActivity = returnedProjectActivity;
    }

    @Test
    void createProjectActivityWithExistingId() throws Exception {
        // Create the ProjectActivity with an existing ID
        projectActivity.setId("existing_id");
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectActivityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkActivityNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectActivity.setActivityNumber(null);

        // Create the ProjectActivity, which fails.
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        restProjectActivityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkActivityDescriptionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectActivity.setActivityDescription(null);

        // Create the ProjectActivity, which fails.
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        restProjectActivityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProjectActivityStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectActivity.setProjectActivityState(null);

        // Create the ProjectActivity, which fails.
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        restProjectActivityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllProjectActivities() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        // Get all the projectActivityList
        restProjectActivityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectActivity.getId())))
            .andExpect(jsonPath("$.[*].activityNumber").value(hasItem(DEFAULT_ACTIVITY_NUMBER)))
            .andExpect(jsonPath("$.[*].activityDescription").value(hasItem(DEFAULT_ACTIVITY_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].projectActivityState").value(hasItem(DEFAULT_PROJECT_ACTIVITY_STATE)));
    }

    @Test
    void getProjectActivity() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        // Get the projectActivity
        restProjectActivityMockMvc
            .perform(get(ENTITY_API_URL_ID, projectActivity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectActivity.getId()))
            .andExpect(jsonPath("$.activityNumber").value(DEFAULT_ACTIVITY_NUMBER))
            .andExpect(jsonPath("$.activityDescription").value(DEFAULT_ACTIVITY_DESCRIPTION))
            .andExpect(jsonPath("$.projectActivityState").value(DEFAULT_PROJECT_ACTIVITY_STATE));
    }

    @Test
    void getNonExistingProjectActivity() throws Exception {
        // Get the projectActivity
        restProjectActivityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingProjectActivity() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectActivity
        ProjectActivity updatedProjectActivity = projectActivityRepository.findById(projectActivity.getId()).orElseThrow();
        updatedProjectActivity
            .activityNumber(UPDATED_ACTIVITY_NUMBER)
            .activityDescription(UPDATED_ACTIVITY_DESCRIPTION)
            .projectActivityState(UPDATED_PROJECT_ACTIVITY_STATE);
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(updatedProjectActivity);

        restProjectActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectActivityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectActivityDTO))
            )
            .andExpect(status().isOk());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedProjectActivityToMatchAllProperties(updatedProjectActivity);
    }

    @Test
    void putNonExistingProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectActivityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProjectActivityWithPatch() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectActivity using partial update
        ProjectActivity partialUpdatedProjectActivity = new ProjectActivity();
        partialUpdatedProjectActivity.setId(projectActivity.getId());

        partialUpdatedProjectActivity.activityDescription(UPDATED_ACTIVITY_DESCRIPTION);

        restProjectActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectActivity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectActivity))
            )
            .andExpect(status().isOk());

        // Validate the ProjectActivity in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectActivityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedProjectActivity, projectActivity),
            getPersistedProjectActivity(projectActivity)
        );
    }

    @Test
    void fullUpdateProjectActivityWithPatch() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectActivity using partial update
        ProjectActivity partialUpdatedProjectActivity = new ProjectActivity();
        partialUpdatedProjectActivity.setId(projectActivity.getId());

        partialUpdatedProjectActivity
            .activityNumber(UPDATED_ACTIVITY_NUMBER)
            .activityDescription(UPDATED_ACTIVITY_DESCRIPTION)
            .projectActivityState(UPDATED_PROJECT_ACTIVITY_STATE);

        restProjectActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectActivity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectActivity))
            )
            .andExpect(status().isOk());

        // Validate the ProjectActivity in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectActivityUpdatableFieldsEquals(
            partialUpdatedProjectActivity,
            getPersistedProjectActivity(partialUpdatedProjectActivity)
        );
    }

    @Test
    void patchNonExistingProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projectActivityDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProjectActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectActivity.setId(UUID.randomUUID().toString());

        // Create the ProjectActivity
        ProjectActivityDTO projectActivityDTO = projectActivityMapper.toDto(projectActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectActivityMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(projectActivityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProjectActivity() throws Exception {
        // Initialize the database
        insertedProjectActivity = projectActivityRepository.save(projectActivity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the projectActivity
        restProjectActivityMockMvc
            .perform(delete(ENTITY_API_URL_ID, projectActivity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return projectActivityRepository.count();
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

    protected ProjectActivity getPersistedProjectActivity(ProjectActivity projectActivity) {
        return projectActivityRepository.findById(projectActivity.getId()).orElseThrow();
    }

    protected void assertPersistedProjectActivityToMatchAllProperties(ProjectActivity expectedProjectActivity) {
        assertProjectActivityAllPropertiesEquals(expectedProjectActivity, getPersistedProjectActivity(expectedProjectActivity));
    }

    protected void assertPersistedProjectActivityToMatchUpdatableProperties(ProjectActivity expectedProjectActivity) {
        assertProjectActivityAllUpdatablePropertiesEquals(expectedProjectActivity, getPersistedProjectActivity(expectedProjectActivity));
    }
}

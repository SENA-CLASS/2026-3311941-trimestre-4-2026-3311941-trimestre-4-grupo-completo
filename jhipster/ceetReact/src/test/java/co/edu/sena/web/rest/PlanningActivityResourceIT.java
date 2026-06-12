package co.edu.sena.web.rest;

import static co.edu.sena.domain.PlanningActivityAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.PlanningActivity;
import co.edu.sena.domain.ProjectActivity;
import co.edu.sena.domain.QuarterSchedule;
import co.edu.sena.repository.PlanningActivityRepository;
import co.edu.sena.service.dto.PlanningActivityDTO;
import co.edu.sena.service.mapper.PlanningActivityMapper;
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
 * Integration tests for the {@link PlanningActivityResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanningActivityResourceIT {

    private static final String ENTITY_API_URL = "/api/planning-activities";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PlanningActivityRepository planningActivityRepository;

    @Autowired
    private PlanningActivityMapper planningActivityMapper;

    @Autowired
    private MockMvc restPlanningActivityMockMvc;

    private PlanningActivity planningActivity;

    private PlanningActivity insertedPlanningActivity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanningActivity createEntity() {
        PlanningActivity planningActivity = new PlanningActivity();
        // Add required entity
        QuarterSchedule quarterSchedule;
        quarterSchedule = QuarterScheduleResourceIT.createEntity();
        quarterSchedule.setId("fixed-id-for-tests");
        planningActivity.setQuarterSchedule(quarterSchedule);
        // Add required entity
        ProjectActivity projectActivity;
        projectActivity = ProjectActivityResourceIT.createEntity();
        projectActivity.setId("fixed-id-for-tests");
        planningActivity.setProjectActivity(projectActivity);
        return planningActivity;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanningActivity createUpdatedEntity() {
        PlanningActivity updatedPlanningActivity = new PlanningActivity();
        // Add required entity
        QuarterSchedule quarterSchedule;
        quarterSchedule = QuarterScheduleResourceIT.createUpdatedEntity();
        quarterSchedule.setId("fixed-id-for-tests");
        updatedPlanningActivity.setQuarterSchedule(quarterSchedule);
        // Add required entity
        ProjectActivity projectActivity;
        projectActivity = ProjectActivityResourceIT.createUpdatedEntity();
        projectActivity.setId("fixed-id-for-tests");
        updatedPlanningActivity.setProjectActivity(projectActivity);
        return updatedPlanningActivity;
    }

    @BeforeEach
    void initTest() {
        planningActivity = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPlanningActivity != null) {
            planningActivityRepository.delete(insertedPlanningActivity);
            insertedPlanningActivity = null;
        }
    }

    @Test
    void createPlanningActivity() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);
        var returnedPlanningActivityDTO = om.readValue(
            restPlanningActivityMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningActivityDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            PlanningActivityDTO.class
        );

        // Validate the PlanningActivity in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedPlanningActivity = planningActivityMapper.toEntity(returnedPlanningActivityDTO);
        assertPlanningActivityUpdatableFieldsEquals(returnedPlanningActivity, getPersistedPlanningActivity(returnedPlanningActivity));

        insertedPlanningActivity = returnedPlanningActivity;
    }

    @Test
    void createPlanningActivityWithExistingId() throws Exception {
        // Create the PlanningActivity with an existing ID
        planningActivity.setId("existing_id");
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanningActivityMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningActivityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllPlanningActivities() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        // Get all the planningActivityList
        restPlanningActivityMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planningActivity.getId())));
    }

    @Test
    void getPlanningActivity() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        // Get the planningActivity
        restPlanningActivityMockMvc
            .perform(get(ENTITY_API_URL_ID, planningActivity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planningActivity.getId()));
    }

    @Test
    void getNonExistingPlanningActivity() throws Exception {
        // Get the planningActivity
        restPlanningActivityMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingPlanningActivity() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planningActivity
        PlanningActivity updatedPlanningActivity = planningActivityRepository.findById(planningActivity.getId()).orElseThrow();
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(updatedPlanningActivity);

        restPlanningActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planningActivityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningActivityDTO))
            )
            .andExpect(status().isOk());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPlanningActivityToMatchAllProperties(updatedPlanningActivity);
    }

    @Test
    void putNonExistingPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planningActivityDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningActivityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePlanningActivityWithPatch() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planningActivity using partial update
        PlanningActivity partialUpdatedPlanningActivity = new PlanningActivity();
        partialUpdatedPlanningActivity.setId(planningActivity.getId());

        restPlanningActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanningActivity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlanningActivity))
            )
            .andExpect(status().isOk());

        // Validate the PlanningActivity in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlanningActivityUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedPlanningActivity, planningActivity),
            getPersistedPlanningActivity(planningActivity)
        );
    }

    @Test
    void fullUpdatePlanningActivityWithPatch() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planningActivity using partial update
        PlanningActivity partialUpdatedPlanningActivity = new PlanningActivity();
        partialUpdatedPlanningActivity.setId(planningActivity.getId());

        restPlanningActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanningActivity.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlanningActivity))
            )
            .andExpect(status().isOk());

        // Validate the PlanningActivity in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlanningActivityUpdatableFieldsEquals(
            partialUpdatedPlanningActivity,
            getPersistedPlanningActivity(partialUpdatedPlanningActivity)
        );
    }

    @Test
    void patchNonExistingPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planningActivityDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(planningActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(planningActivityDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPlanningActivity() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planningActivity.setId(UUID.randomUUID().toString());

        // Create the PlanningActivity
        PlanningActivityDTO planningActivityDTO = planningActivityMapper.toDto(planningActivity);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningActivityMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(planningActivityDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanningActivity in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePlanningActivity() throws Exception {
        // Initialize the database
        insertedPlanningActivity = planningActivityRepository.save(planningActivity);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the planningActivity
        restPlanningActivityMockMvc
            .perform(delete(ENTITY_API_URL_ID, planningActivity.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return planningActivityRepository.count();
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

    protected PlanningActivity getPersistedPlanningActivity(PlanningActivity planningActivity) {
        return planningActivityRepository.findById(planningActivity.getId()).orElseThrow();
    }

    protected void assertPersistedPlanningActivityToMatchAllProperties(PlanningActivity expectedPlanningActivity) {
        assertPlanningActivityAllPropertiesEquals(expectedPlanningActivity, getPersistedPlanningActivity(expectedPlanningActivity));
    }

    protected void assertPersistedPlanningActivityToMatchUpdatableProperties(PlanningActivity expectedPlanningActivity) {
        assertPlanningActivityAllUpdatablePropertiesEquals(
            expectedPlanningActivity,
            getPersistedPlanningActivity(expectedPlanningActivity)
        );
    }
}

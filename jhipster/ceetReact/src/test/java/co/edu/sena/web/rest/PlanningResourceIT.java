package co.edu.sena.web.rest;

import static co.edu.sena.domain.PlanningAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.PlanningRepository;
import co.edu.sena.service.dto.PlanningDTO;
import co.edu.sena.service.mapper.PlanningMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link PlanningResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanningResourceIT {

    private static final String DEFAULT_PLANNING_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PLANNING_CODE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_PLANNING_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PLANNING_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final State DEFAULT_PLANNING_STATE = State.ACTIVE;
    private static final State UPDATED_PLANNING_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/plannings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private PlanningRepository planningRepository;

    @Autowired
    private PlanningMapper planningMapper;

    @Autowired
    private MockMvc restPlanningMockMvc;

    private Planning planning;

    private Planning insertedPlanning;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planning createEntity() {
        return new Planning().planningCode(DEFAULT_PLANNING_CODE).planningDate(DEFAULT_PLANNING_DATE).planningState(DEFAULT_PLANNING_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Planning createUpdatedEntity() {
        return new Planning().planningCode(UPDATED_PLANNING_CODE).planningDate(UPDATED_PLANNING_DATE).planningState(UPDATED_PLANNING_STATE);
    }

    @BeforeEach
    void initTest() {
        planning = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedPlanning != null) {
            planningRepository.delete(insertedPlanning);
            insertedPlanning = null;
        }
    }

    @Test
    void createPlanning() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);
        var returnedPlanningDTO = om.readValue(
            restPlanningMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            PlanningDTO.class
        );

        // Validate the Planning in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedPlanning = planningMapper.toEntity(returnedPlanningDTO);
        assertPlanningUpdatableFieldsEquals(returnedPlanning, getPersistedPlanning(returnedPlanning));

        insertedPlanning = returnedPlanning;
    }

    @Test
    void createPlanningWithExistingId() throws Exception {
        // Create the Planning with an existing ID
        planning.setId("existing_id");
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkPlanningCodeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        planning.setPlanningCode(null);

        // Create the Planning, which fails.
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        restPlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkPlanningDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        planning.setPlanningDate(null);

        // Create the Planning, which fails.
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        restPlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkPlanningStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        planning.setPlanningState(null);

        // Create the Planning, which fails.
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        restPlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllPlannings() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        // Get all the planningList
        restPlanningMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planning.getId())))
            .andExpect(jsonPath("$.[*].planningCode").value(hasItem(DEFAULT_PLANNING_CODE)))
            .andExpect(jsonPath("$.[*].planningDate").value(hasItem(sameInstant(DEFAULT_PLANNING_DATE))))
            .andExpect(jsonPath("$.[*].planningState").value(hasItem(DEFAULT_PLANNING_STATE.toString())));
    }

    @Test
    void getPlanning() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        // Get the planning
        restPlanningMockMvc
            .perform(get(ENTITY_API_URL_ID, planning.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planning.getId()))
            .andExpect(jsonPath("$.planningCode").value(DEFAULT_PLANNING_CODE))
            .andExpect(jsonPath("$.planningDate").value(sameInstant(DEFAULT_PLANNING_DATE)))
            .andExpect(jsonPath("$.planningState").value(DEFAULT_PLANNING_STATE.toString()));
    }

    @Test
    void getNonExistingPlanning() throws Exception {
        // Get the planning
        restPlanningMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingPlanning() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planning
        Planning updatedPlanning = planningRepository.findById(planning.getId()).orElseThrow();
        updatedPlanning.planningCode(UPDATED_PLANNING_CODE).planningDate(UPDATED_PLANNING_DATE).planningState(UPDATED_PLANNING_STATE);
        PlanningDTO planningDTO = planningMapper.toDto(updatedPlanning);

        restPlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planningDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningDTO))
            )
            .andExpect(status().isOk());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedPlanningToMatchAllProperties(updatedPlanning);
    }

    @Test
    void putNonExistingPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planningDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(planningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePlanningWithPatch() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planning using partial update
        Planning partialUpdatedPlanning = new Planning();
        partialUpdatedPlanning.setId(planning.getId());

        restPlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanning.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlanning))
            )
            .andExpect(status().isOk());

        // Validate the Planning in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlanningUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedPlanning, planning), getPersistedPlanning(planning));
    }

    @Test
    void fullUpdatePlanningWithPatch() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the planning using partial update
        Planning partialUpdatedPlanning = new Planning();
        partialUpdatedPlanning.setId(planning.getId());

        partialUpdatedPlanning
            .planningCode(UPDATED_PLANNING_CODE)
            .planningDate(UPDATED_PLANNING_DATE)
            .planningState(UPDATED_PLANNING_STATE);

        restPlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanning.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedPlanning))
            )
            .andExpect(status().isOk());

        // Validate the Planning in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPlanningUpdatableFieldsEquals(partialUpdatedPlanning, getPersistedPlanning(partialUpdatedPlanning));
    }

    @Test
    void patchNonExistingPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planningDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(planningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(planningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        planning.setId(UUID.randomUUID().toString());

        // Create the Planning
        PlanningDTO planningDTO = planningMapper.toDto(planning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanningMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(planningDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Planning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePlanning() throws Exception {
        // Initialize the database
        insertedPlanning = planningRepository.save(planning);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the planning
        restPlanningMockMvc
            .perform(delete(ENTITY_API_URL_ID, planning.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return planningRepository.count();
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

    protected Planning getPersistedPlanning(Planning planning) {
        return planningRepository.findById(planning.getId()).orElseThrow();
    }

    protected void assertPersistedPlanningToMatchAllProperties(Planning expectedPlanning) {
        assertPlanningAllPropertiesEquals(expectedPlanning, getPersistedPlanning(expectedPlanning));
    }

    protected void assertPersistedPlanningToMatchUpdatableProperties(Planning expectedPlanning) {
        assertPlanningAllUpdatablePropertiesEquals(expectedPlanning, getPersistedPlanning(expectedPlanning));
    }
}

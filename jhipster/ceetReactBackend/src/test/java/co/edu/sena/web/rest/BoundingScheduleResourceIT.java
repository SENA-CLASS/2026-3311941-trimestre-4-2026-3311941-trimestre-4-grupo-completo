package co.edu.sena.web.rest;

import static co.edu.sena.domain.BoundingScheduleAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.BoundingSchedule;
import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.repository.BoundingScheduleRepository;
import co.edu.sena.service.dto.BoundingScheduleDTO;
import co.edu.sena.service.mapper.BoundingScheduleMapper;
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
 * Integration tests for the {@link BoundingScheduleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BoundingScheduleResourceIT {

    private static final String ENTITY_API_URL = "/api/bounding-schedules";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BoundingScheduleRepository boundingScheduleRepository;

    @Autowired
    private BoundingScheduleMapper boundingScheduleMapper;

    @Autowired
    private MockMvc restBoundingScheduleMockMvc;

    private BoundingSchedule boundingSchedule;

    private BoundingSchedule insertedBoundingSchedule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BoundingSchedule createEntity() {
        BoundingSchedule boundingSchedule = new BoundingSchedule();
        // Add required entity
        BondingInstructor bondingInstructor;
        bondingInstructor = BondingInstructorResourceIT.createEntity();
        bondingInstructor.setId("fixed-id-for-tests");
        boundingSchedule.setBondingInstructor(bondingInstructor);
        // Add required entity
        InstructorWorkingDay instructorWorkingDay;
        instructorWorkingDay = InstructorWorkingDayResourceIT.createEntity();
        instructorWorkingDay.setId("fixed-id-for-tests");
        boundingSchedule.setInstructorWorkingDay(instructorWorkingDay);
        return boundingSchedule;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BoundingSchedule createUpdatedEntity() {
        BoundingSchedule updatedBoundingSchedule = new BoundingSchedule();
        // Add required entity
        BondingInstructor bondingInstructor;
        bondingInstructor = BondingInstructorResourceIT.createUpdatedEntity();
        bondingInstructor.setId("fixed-id-for-tests");
        updatedBoundingSchedule.setBondingInstructor(bondingInstructor);
        // Add required entity
        InstructorWorkingDay instructorWorkingDay;
        instructorWorkingDay = InstructorWorkingDayResourceIT.createUpdatedEntity();
        instructorWorkingDay.setId("fixed-id-for-tests");
        updatedBoundingSchedule.setInstructorWorkingDay(instructorWorkingDay);
        return updatedBoundingSchedule;
    }

    @BeforeEach
    void initTest() {
        boundingSchedule = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedBoundingSchedule != null) {
            boundingScheduleRepository.delete(insertedBoundingSchedule);
            insertedBoundingSchedule = null;
        }
    }

    @Test
    void createBoundingSchedule() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);
        var returnedBoundingScheduleDTO = om.readValue(
            restBoundingScheduleMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(boundingScheduleDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BoundingScheduleDTO.class
        );

        // Validate the BoundingSchedule in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBoundingSchedule = boundingScheduleMapper.toEntity(returnedBoundingScheduleDTO);
        assertBoundingScheduleUpdatableFieldsEquals(returnedBoundingSchedule, getPersistedBoundingSchedule(returnedBoundingSchedule));

        insertedBoundingSchedule = returnedBoundingSchedule;
    }

    @Test
    void createBoundingScheduleWithExistingId() throws Exception {
        // Create the BoundingSchedule with an existing ID
        boundingSchedule.setId("existing_id");
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoundingScheduleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(boundingScheduleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllBoundingSchedules() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        // Get all the boundingScheduleList
        restBoundingScheduleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(boundingSchedule.getId())));
    }

    @Test
    void getBoundingSchedule() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        // Get the boundingSchedule
        restBoundingScheduleMockMvc
            .perform(get(ENTITY_API_URL_ID, boundingSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(boundingSchedule.getId()));
    }

    @Test
    void getNonExistingBoundingSchedule() throws Exception {
        // Get the boundingSchedule
        restBoundingScheduleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBoundingSchedule() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the boundingSchedule
        BoundingSchedule updatedBoundingSchedule = boundingScheduleRepository.findById(boundingSchedule.getId()).orElseThrow();
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(updatedBoundingSchedule);

        restBoundingScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, boundingScheduleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(boundingScheduleDTO))
            )
            .andExpect(status().isOk());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBoundingScheduleToMatchAllProperties(updatedBoundingSchedule);
    }

    @Test
    void putNonExistingBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, boundingScheduleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(boundingScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(boundingScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(boundingScheduleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBoundingScheduleWithPatch() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the boundingSchedule using partial update
        BoundingSchedule partialUpdatedBoundingSchedule = new BoundingSchedule();
        partialUpdatedBoundingSchedule.setId(boundingSchedule.getId());

        restBoundingScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBoundingSchedule.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBoundingSchedule))
            )
            .andExpect(status().isOk());

        // Validate the BoundingSchedule in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBoundingScheduleUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedBoundingSchedule, boundingSchedule),
            getPersistedBoundingSchedule(boundingSchedule)
        );
    }

    @Test
    void fullUpdateBoundingScheduleWithPatch() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the boundingSchedule using partial update
        BoundingSchedule partialUpdatedBoundingSchedule = new BoundingSchedule();
        partialUpdatedBoundingSchedule.setId(boundingSchedule.getId());

        restBoundingScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBoundingSchedule.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBoundingSchedule))
            )
            .andExpect(status().isOk());

        // Validate the BoundingSchedule in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBoundingScheduleUpdatableFieldsEquals(
            partialUpdatedBoundingSchedule,
            getPersistedBoundingSchedule(partialUpdatedBoundingSchedule)
        );
    }

    @Test
    void patchNonExistingBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, boundingScheduleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(boundingScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(boundingScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBoundingSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        boundingSchedule.setId(UUID.randomUUID().toString());

        // Create the BoundingSchedule
        BoundingScheduleDTO boundingScheduleDTO = boundingScheduleMapper.toDto(boundingSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBoundingScheduleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(boundingScheduleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BoundingSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBoundingSchedule() throws Exception {
        // Initialize the database
        insertedBoundingSchedule = boundingScheduleRepository.save(boundingSchedule);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the boundingSchedule
        restBoundingScheduleMockMvc
            .perform(delete(ENTITY_API_URL_ID, boundingSchedule.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return boundingScheduleRepository.count();
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

    protected BoundingSchedule getPersistedBoundingSchedule(BoundingSchedule boundingSchedule) {
        return boundingScheduleRepository.findById(boundingSchedule.getId()).orElseThrow();
    }

    protected void assertPersistedBoundingScheduleToMatchAllProperties(BoundingSchedule expectedBoundingSchedule) {
        assertBoundingScheduleAllPropertiesEquals(expectedBoundingSchedule, getPersistedBoundingSchedule(expectedBoundingSchedule));
    }

    protected void assertPersistedBoundingScheduleToMatchUpdatableProperties(BoundingSchedule expectedBoundingSchedule) {
        assertBoundingScheduleAllUpdatablePropertiesEquals(
            expectedBoundingSchedule,
            getPersistedBoundingSchedule(expectedBoundingSchedule)
        );
    }
}

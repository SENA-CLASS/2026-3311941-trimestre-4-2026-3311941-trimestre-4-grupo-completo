package co.edu.sena.web.rest;

import static co.edu.sena.domain.InstructorWorkingDayAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.InstructorWorkingDayRepository;
import co.edu.sena.service.dto.InstructorWorkingDayDTO;
import co.edu.sena.service.mapper.InstructorWorkingDayMapper;
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
 * Integration tests for the {@link InstructorWorkingDayResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InstructorWorkingDayResourceIT {

    private static final String DEFAULT_NAME_WORKING_DAY = "AAAAAAAAAA";
    private static final String UPDATED_NAME_WORKING_DAY = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION_WORKING_DAY = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION_WORKING_DAY = "BBBBBBBBBB";

    private static final State DEFAULT_WORKING_DAY_STATE = State.ACTIVE;
    private static final State UPDATED_WORKING_DAY_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/instructor-working-days";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private InstructorWorkingDayRepository instructorWorkingDayRepository;

    @Autowired
    private InstructorWorkingDayMapper instructorWorkingDayMapper;

    @Autowired
    private MockMvc restInstructorWorkingDayMockMvc;

    private InstructorWorkingDay instructorWorkingDay;

    private InstructorWorkingDay insertedInstructorWorkingDay;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InstructorWorkingDay createEntity() {
        return new InstructorWorkingDay()
            .nameWorkingDay(DEFAULT_NAME_WORKING_DAY)
            .descriptionWorkingDay(DEFAULT_DESCRIPTION_WORKING_DAY)
            .workingDayState(DEFAULT_WORKING_DAY_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InstructorWorkingDay createUpdatedEntity() {
        return new InstructorWorkingDay()
            .nameWorkingDay(UPDATED_NAME_WORKING_DAY)
            .descriptionWorkingDay(UPDATED_DESCRIPTION_WORKING_DAY)
            .workingDayState(UPDATED_WORKING_DAY_STATE);
    }

    @BeforeEach
    void initTest() {
        instructorWorkingDay = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedInstructorWorkingDay != null) {
            instructorWorkingDayRepository.delete(insertedInstructorWorkingDay);
            insertedInstructorWorkingDay = null;
        }
    }

    @Test
    void createInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);
        var returnedInstructorWorkingDayDTO = om.readValue(
            restInstructorWorkingDayMockMvc
                .perform(
                    post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO))
                )
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            InstructorWorkingDayDTO.class
        );

        // Validate the InstructorWorkingDay in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedInstructorWorkingDay = instructorWorkingDayMapper.toEntity(returnedInstructorWorkingDayDTO);
        assertInstructorWorkingDayUpdatableFieldsEquals(
            returnedInstructorWorkingDay,
            getPersistedInstructorWorkingDay(returnedInstructorWorkingDay)
        );

        insertedInstructorWorkingDay = returnedInstructorWorkingDay;
    }

    @Test
    void createInstructorWorkingDayWithExistingId() throws Exception {
        // Create the InstructorWorkingDay with an existing ID
        instructorWorkingDay.setId("existing_id");
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstructorWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameWorkingDayIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        instructorWorkingDay.setNameWorkingDay(null);

        // Create the InstructorWorkingDay, which fails.
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        restInstructorWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionWorkingDayIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        instructorWorkingDay.setDescriptionWorkingDay(null);

        // Create the InstructorWorkingDay, which fails.
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        restInstructorWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkWorkingDayStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        instructorWorkingDay.setWorkingDayState(null);

        // Create the InstructorWorkingDay, which fails.
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        restInstructorWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllInstructorWorkingDays() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        // Get all the instructorWorkingDayList
        restInstructorWorkingDayMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instructorWorkingDay.getId())))
            .andExpect(jsonPath("$.[*].nameWorkingDay").value(hasItem(DEFAULT_NAME_WORKING_DAY)))
            .andExpect(jsonPath("$.[*].descriptionWorkingDay").value(hasItem(DEFAULT_DESCRIPTION_WORKING_DAY)))
            .andExpect(jsonPath("$.[*].workingDayState").value(hasItem(DEFAULT_WORKING_DAY_STATE.toString())));
    }

    @Test
    void getInstructorWorkingDay() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        // Get the instructorWorkingDay
        restInstructorWorkingDayMockMvc
            .perform(get(ENTITY_API_URL_ID, instructorWorkingDay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instructorWorkingDay.getId()))
            .andExpect(jsonPath("$.nameWorkingDay").value(DEFAULT_NAME_WORKING_DAY))
            .andExpect(jsonPath("$.descriptionWorkingDay").value(DEFAULT_DESCRIPTION_WORKING_DAY))
            .andExpect(jsonPath("$.workingDayState").value(DEFAULT_WORKING_DAY_STATE.toString()));
    }

    @Test
    void getNonExistingInstructorWorkingDay() throws Exception {
        // Get the instructorWorkingDay
        restInstructorWorkingDayMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingInstructorWorkingDay() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructorWorkingDay
        InstructorWorkingDay updatedInstructorWorkingDay = instructorWorkingDayRepository
            .findById(instructorWorkingDay.getId())
            .orElseThrow();
        updatedInstructorWorkingDay
            .nameWorkingDay(UPDATED_NAME_WORKING_DAY)
            .descriptionWorkingDay(UPDATED_DESCRIPTION_WORKING_DAY)
            .workingDayState(UPDATED_WORKING_DAY_STATE);
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(updatedInstructorWorkingDay);

        restInstructorWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, instructorWorkingDayDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isOk());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedInstructorWorkingDayToMatchAllProperties(updatedInstructorWorkingDay);
    }

    @Test
    void putNonExistingInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, instructorWorkingDayDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorWorkingDayDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateInstructorWorkingDayWithPatch() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructorWorkingDay using partial update
        InstructorWorkingDay partialUpdatedInstructorWorkingDay = new InstructorWorkingDay();
        partialUpdatedInstructorWorkingDay.setId(instructorWorkingDay.getId());

        partialUpdatedInstructorWorkingDay.workingDayState(UPDATED_WORKING_DAY_STATE);

        restInstructorWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstructorWorkingDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstructorWorkingDay))
            )
            .andExpect(status().isOk());

        // Validate the InstructorWorkingDay in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstructorWorkingDayUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedInstructorWorkingDay, instructorWorkingDay),
            getPersistedInstructorWorkingDay(instructorWorkingDay)
        );
    }

    @Test
    void fullUpdateInstructorWorkingDayWithPatch() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructorWorkingDay using partial update
        InstructorWorkingDay partialUpdatedInstructorWorkingDay = new InstructorWorkingDay();
        partialUpdatedInstructorWorkingDay.setId(instructorWorkingDay.getId());

        partialUpdatedInstructorWorkingDay
            .nameWorkingDay(UPDATED_NAME_WORKING_DAY)
            .descriptionWorkingDay(UPDATED_DESCRIPTION_WORKING_DAY)
            .workingDayState(UPDATED_WORKING_DAY_STATE);

        restInstructorWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstructorWorkingDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstructorWorkingDay))
            )
            .andExpect(status().isOk());

        // Validate the InstructorWorkingDay in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstructorWorkingDayUpdatableFieldsEquals(
            partialUpdatedInstructorWorkingDay,
            getPersistedInstructorWorkingDay(partialUpdatedInstructorWorkingDay)
        );
    }

    @Test
    void patchNonExistingInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, instructorWorkingDayDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamInstructorWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructorWorkingDay.setId(UUID.randomUUID().toString());

        // Create the InstructorWorkingDay
        InstructorWorkingDayDTO instructorWorkingDayDTO = instructorWorkingDayMapper.toDto(instructorWorkingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(instructorWorkingDayDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the InstructorWorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteInstructorWorkingDay() throws Exception {
        // Initialize the database
        insertedInstructorWorkingDay = instructorWorkingDayRepository.save(instructorWorkingDay);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the instructorWorkingDay
        restInstructorWorkingDayMockMvc
            .perform(delete(ENTITY_API_URL_ID, instructorWorkingDay.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return instructorWorkingDayRepository.count();
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

    protected InstructorWorkingDay getPersistedInstructorWorkingDay(InstructorWorkingDay instructorWorkingDay) {
        return instructorWorkingDayRepository.findById(instructorWorkingDay.getId()).orElseThrow();
    }

    protected void assertPersistedInstructorWorkingDayToMatchAllProperties(InstructorWorkingDay expectedInstructorWorkingDay) {
        assertInstructorWorkingDayAllPropertiesEquals(
            expectedInstructorWorkingDay,
            getPersistedInstructorWorkingDay(expectedInstructorWorkingDay)
        );
    }

    protected void assertPersistedInstructorWorkingDayToMatchUpdatableProperties(InstructorWorkingDay expectedInstructorWorkingDay) {
        assertInstructorWorkingDayAllUpdatablePropertiesEquals(
            expectedInstructorWorkingDay,
            getPersistedInstructorWorkingDay(expectedInstructorWorkingDay)
        );
    }
}

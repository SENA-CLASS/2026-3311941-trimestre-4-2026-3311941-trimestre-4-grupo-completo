package co.edu.sena.web.rest;

import static co.edu.sena.domain.WorkingDayAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Day;
import co.edu.sena.domain.InstructorWorkingDay;
import co.edu.sena.domain.WorkingDay;
import co.edu.sena.repository.WorkingDayRepository;
import co.edu.sena.service.WorkingDayService;
import co.edu.sena.service.dto.WorkingDayDTO;
import co.edu.sena.service.mapper.WorkingDayMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.ArrayList;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link WorkingDayResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class WorkingDayResourceIT {

    private static final Duration DEFAULT_START_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_START_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_END_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_END_TIME = Duration.ofHours(12);

    private static final String ENTITY_API_URL = "/api/working-days";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WorkingDayRepository workingDayRepository;

    @Mock
    private WorkingDayRepository workingDayRepositoryMock;

    @Autowired
    private WorkingDayMapper workingDayMapper;

    @Mock
    private WorkingDayService workingDayServiceMock;

    @Autowired
    private MockMvc restWorkingDayMockMvc;

    private WorkingDay workingDay;

    private WorkingDay insertedWorkingDay;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingDay createEntity() {
        WorkingDay workingDay = new WorkingDay().startTime(DEFAULT_START_TIME).endTime(DEFAULT_END_TIME);
        // Add required entity
        InstructorWorkingDay instructorWorkingDay;
        instructorWorkingDay = InstructorWorkingDayResourceIT.createEntity();
        instructorWorkingDay.setId("fixed-id-for-tests");
        workingDay.setInstructorWorkingDay(instructorWorkingDay);
        // Add required entity
        Day day;
        day = DayResourceIT.createEntity();
        day.setId("fixed-id-for-tests");
        workingDay.setDay(day);
        return workingDay;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingDay createUpdatedEntity() {
        WorkingDay updatedWorkingDay = new WorkingDay().startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);
        // Add required entity
        InstructorWorkingDay instructorWorkingDay;
        instructorWorkingDay = InstructorWorkingDayResourceIT.createUpdatedEntity();
        instructorWorkingDay.setId("fixed-id-for-tests");
        updatedWorkingDay.setInstructorWorkingDay(instructorWorkingDay);
        // Add required entity
        Day day;
        day = DayResourceIT.createUpdatedEntity();
        day.setId("fixed-id-for-tests");
        updatedWorkingDay.setDay(day);
        return updatedWorkingDay;
    }

    @BeforeEach
    void initTest() {
        workingDay = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedWorkingDay != null) {
            workingDayRepository.delete(insertedWorkingDay);
            insertedWorkingDay = null;
        }
    }

    @Test
    void createWorkingDay() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);
        var returnedWorkingDayDTO = om.readValue(
            restWorkingDayMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WorkingDayDTO.class
        );

        // Validate the WorkingDay in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWorkingDay = workingDayMapper.toEntity(returnedWorkingDayDTO);
        assertWorkingDayUpdatableFieldsEquals(returnedWorkingDay, getPersistedWorkingDay(returnedWorkingDay));

        insertedWorkingDay = returnedWorkingDay;
    }

    @Test
    void createWorkingDayWithExistingId() throws Exception {
        // Create the WorkingDay with an existing ID
        workingDay.setId("existing_id");
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkStartTimeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDay.setStartTime(null);

        // Create the WorkingDay, which fails.
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        restWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEndTimeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDay.setEndTime(null);

        // Create the WorkingDay, which fails.
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        restWorkingDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllWorkingDays() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        // Get all the workingDayList
        restWorkingDayMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workingDay.getId())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWorkingDaysWithEagerRelationshipsIsEnabled() throws Exception {
        when(workingDayServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWorkingDayMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(workingDayServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWorkingDaysWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(workingDayServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restWorkingDayMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(workingDayRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getWorkingDay() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        // Get the workingDay
        restWorkingDayMockMvc
            .perform(get(ENTITY_API_URL_ID, workingDay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(workingDay.getId()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()));
    }

    @Test
    void getNonExistingWorkingDay() throws Exception {
        // Get the workingDay
        restWorkingDayMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingWorkingDay() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDay
        WorkingDay updatedWorkingDay = workingDayRepository.findById(workingDay.getId()).orElseThrow();
        updatedWorkingDay.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(updatedWorkingDay);

        restWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workingDayDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayDTO))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWorkingDayToMatchAllProperties(updatedWorkingDay);
    }

    @Test
    void putNonExistingWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workingDayDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWorkingDayWithPatch() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDay using partial update
        WorkingDay partialUpdatedWorkingDay = new WorkingDay();
        partialUpdatedWorkingDay.setId(workingDay.getId());

        restWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkingDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWorkingDay))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDay in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWorkingDayUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedWorkingDay, workingDay),
            getPersistedWorkingDay(workingDay)
        );
    }

    @Test
    void fullUpdateWorkingDayWithPatch() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDay using partial update
        WorkingDay partialUpdatedWorkingDay = new WorkingDay();
        partialUpdatedWorkingDay.setId(workingDay.getId());

        partialUpdatedWorkingDay.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);

        restWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkingDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWorkingDay))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDay in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWorkingDayUpdatableFieldsEquals(partialUpdatedWorkingDay, getPersistedWorkingDay(partialUpdatedWorkingDay));
    }

    @Test
    void patchNonExistingWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, workingDayDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(workingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(workingDayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWorkingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDay.setId(UUID.randomUUID().toString());

        // Create the WorkingDay
        WorkingDayDTO workingDayDTO = workingDayMapper.toDto(workingDay);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(workingDayDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WorkingDay in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWorkingDay() throws Exception {
        // Initialize the database
        insertedWorkingDay = workingDayRepository.save(workingDay);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the workingDay
        restWorkingDayMockMvc
            .perform(delete(ENTITY_API_URL_ID, workingDay.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return workingDayRepository.count();
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

    protected WorkingDay getPersistedWorkingDay(WorkingDay workingDay) {
        return workingDayRepository.findById(workingDay.getId()).orElseThrow();
    }

    protected void assertPersistedWorkingDayToMatchAllProperties(WorkingDay expectedWorkingDay) {
        assertWorkingDayAllPropertiesEquals(expectedWorkingDay, getPersistedWorkingDay(expectedWorkingDay));
    }

    protected void assertPersistedWorkingDayToMatchUpdatableProperties(WorkingDay expectedWorkingDay) {
        assertWorkingDayAllUpdatablePropertiesEquals(expectedWorkingDay, getPersistedWorkingDay(expectedWorkingDay));
    }
}

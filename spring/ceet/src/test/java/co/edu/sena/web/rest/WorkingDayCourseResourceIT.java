package co.edu.sena.web.rest;

import static co.edu.sena.domain.WorkingDayCourseAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.WorkingDayCourse;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.WorkingDayCourseRepository;
import co.edu.sena.service.dto.WorkingDayCourseDTO;
import co.edu.sena.service.mapper.WorkingDayCourseMapper;
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
 * Integration tests for the {@link WorkingDayCourseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WorkingDayCourseResourceIT {

    private static final String DEFAULT_WORKING_DAY_ACRONYM = "AAAAAAAAAA";
    private static final String UPDATED_WORKING_DAY_ACRONYM = "BBBBBBBBBB";

    private static final String DEFAULT_WORKING_DAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_WORKING_DAY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_WORKING_DAY = State.ACTIVE;
    private static final State UPDATED_STATE_WORKING_DAY = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/working-day-courses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WorkingDayCourseRepository workingDayCourseRepository;

    @Autowired
    private WorkingDayCourseMapper workingDayCourseMapper;

    @Autowired
    private MockMvc restWorkingDayCourseMockMvc;

    private WorkingDayCourse workingDayCourse;

    private WorkingDayCourse insertedWorkingDayCourse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingDayCourse createEntity() {
        return new WorkingDayCourse()
            .workingDayAcronym(DEFAULT_WORKING_DAY_ACRONYM)
            .workingDayName(DEFAULT_WORKING_DAY_NAME)
            .description(DEFAULT_DESCRIPTION)
            .imageUrl(DEFAULT_IMAGE_URL)
            .stateWorkingDay(DEFAULT_STATE_WORKING_DAY);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WorkingDayCourse createUpdatedEntity() {
        return new WorkingDayCourse()
            .workingDayAcronym(UPDATED_WORKING_DAY_ACRONYM)
            .workingDayName(UPDATED_WORKING_DAY_NAME)
            .description(UPDATED_DESCRIPTION)
            .imageUrl(UPDATED_IMAGE_URL)
            .stateWorkingDay(UPDATED_STATE_WORKING_DAY);
    }

    @BeforeEach
    void initTest() {
        workingDayCourse = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedWorkingDayCourse != null) {
            workingDayCourseRepository.delete(insertedWorkingDayCourse);
            insertedWorkingDayCourse = null;
        }
    }

    @Test
    void createWorkingDayCourse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);
        var returnedWorkingDayCourseDTO = om.readValue(
            restWorkingDayCourseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WorkingDayCourseDTO.class
        );

        // Validate the WorkingDayCourse in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWorkingDayCourse = workingDayCourseMapper.toEntity(returnedWorkingDayCourseDTO);
        assertWorkingDayCourseUpdatableFieldsEquals(returnedWorkingDayCourse, getPersistedWorkingDayCourse(returnedWorkingDayCourse));

        insertedWorkingDayCourse = returnedWorkingDayCourse;
    }

    @Test
    void createWorkingDayCourseWithExistingId() throws Exception {
        // Create the WorkingDayCourse with an existing ID
        workingDayCourse.setId("existing_id");
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkingDayCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkWorkingDayAcronymIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDayCourse.setWorkingDayAcronym(null);

        // Create the WorkingDayCourse, which fails.
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        restWorkingDayCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkWorkingDayNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDayCourse.setWorkingDayName(null);

        // Create the WorkingDayCourse, which fails.
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        restWorkingDayCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDayCourse.setDescription(null);

        // Create the WorkingDayCourse, which fails.
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        restWorkingDayCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStateWorkingDayIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        workingDayCourse.setStateWorkingDay(null);

        // Create the WorkingDayCourse, which fails.
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        restWorkingDayCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllWorkingDayCourses() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        // Get all the workingDayCourseList
        restWorkingDayCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workingDayCourse.getId())))
            .andExpect(jsonPath("$.[*].workingDayAcronym").value(hasItem(DEFAULT_WORKING_DAY_ACRONYM)))
            .andExpect(jsonPath("$.[*].workingDayName").value(hasItem(DEFAULT_WORKING_DAY_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].stateWorkingDay").value(hasItem(DEFAULT_STATE_WORKING_DAY.toString())));
    }

    @Test
    void getWorkingDayCourse() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        // Get the workingDayCourse
        restWorkingDayCourseMockMvc
            .perform(get(ENTITY_API_URL_ID, workingDayCourse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(workingDayCourse.getId()))
            .andExpect(jsonPath("$.workingDayAcronym").value(DEFAULT_WORKING_DAY_ACRONYM))
            .andExpect(jsonPath("$.workingDayName").value(DEFAULT_WORKING_DAY_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.stateWorkingDay").value(DEFAULT_STATE_WORKING_DAY.toString()));
    }

    @Test
    void getNonExistingWorkingDayCourse() throws Exception {
        // Get the workingDayCourse
        restWorkingDayCourseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingWorkingDayCourse() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDayCourse
        WorkingDayCourse updatedWorkingDayCourse = workingDayCourseRepository.findById(workingDayCourse.getId()).orElseThrow();
        updatedWorkingDayCourse
            .workingDayAcronym(UPDATED_WORKING_DAY_ACRONYM)
            .workingDayName(UPDATED_WORKING_DAY_NAME)
            .description(UPDATED_DESCRIPTION)
            .imageUrl(UPDATED_IMAGE_URL)
            .stateWorkingDay(UPDATED_STATE_WORKING_DAY);
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(updatedWorkingDayCourse);

        restWorkingDayCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workingDayCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayCourseDTO))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWorkingDayCourseToMatchAllProperties(updatedWorkingDayCourse);
    }

    @Test
    void putNonExistingWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workingDayCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(workingDayCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWorkingDayCourseWithPatch() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDayCourse using partial update
        WorkingDayCourse partialUpdatedWorkingDayCourse = new WorkingDayCourse();
        partialUpdatedWorkingDayCourse.setId(workingDayCourse.getId());

        partialUpdatedWorkingDayCourse
            .workingDayAcronym(UPDATED_WORKING_DAY_ACRONYM)
            .workingDayName(UPDATED_WORKING_DAY_NAME)
            .description(UPDATED_DESCRIPTION);

        restWorkingDayCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkingDayCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWorkingDayCourse))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDayCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWorkingDayCourseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedWorkingDayCourse, workingDayCourse),
            getPersistedWorkingDayCourse(workingDayCourse)
        );
    }

    @Test
    void fullUpdateWorkingDayCourseWithPatch() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the workingDayCourse using partial update
        WorkingDayCourse partialUpdatedWorkingDayCourse = new WorkingDayCourse();
        partialUpdatedWorkingDayCourse.setId(workingDayCourse.getId());

        partialUpdatedWorkingDayCourse
            .workingDayAcronym(UPDATED_WORKING_DAY_ACRONYM)
            .workingDayName(UPDATED_WORKING_DAY_NAME)
            .description(UPDATED_DESCRIPTION)
            .imageUrl(UPDATED_IMAGE_URL)
            .stateWorkingDay(UPDATED_STATE_WORKING_DAY);

        restWorkingDayCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkingDayCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWorkingDayCourse))
            )
            .andExpect(status().isOk());

        // Validate the WorkingDayCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWorkingDayCourseUpdatableFieldsEquals(
            partialUpdatedWorkingDayCourse,
            getPersistedWorkingDayCourse(partialUpdatedWorkingDayCourse)
        );
    }

    @Test
    void patchNonExistingWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, workingDayCourseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(workingDayCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(workingDayCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWorkingDayCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        workingDayCourse.setId(UUID.randomUUID().toString());

        // Create the WorkingDayCourse
        WorkingDayCourseDTO workingDayCourseDTO = workingDayCourseMapper.toDto(workingDayCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkingDayCourseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(workingDayCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WorkingDayCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWorkingDayCourse() throws Exception {
        // Initialize the database
        insertedWorkingDayCourse = workingDayCourseRepository.save(workingDayCourse);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the workingDayCourse
        restWorkingDayCourseMockMvc
            .perform(delete(ENTITY_API_URL_ID, workingDayCourse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return workingDayCourseRepository.count();
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

    protected WorkingDayCourse getPersistedWorkingDayCourse(WorkingDayCourse workingDayCourse) {
        return workingDayCourseRepository.findById(workingDayCourse.getId()).orElseThrow();
    }

    protected void assertPersistedWorkingDayCourseToMatchAllProperties(WorkingDayCourse expectedWorkingDayCourse) {
        assertWorkingDayCourseAllPropertiesEquals(expectedWorkingDayCourse, getPersistedWorkingDayCourse(expectedWorkingDayCourse));
    }

    protected void assertPersistedWorkingDayCourseToMatchUpdatableProperties(WorkingDayCourse expectedWorkingDayCourse) {
        assertWorkingDayCourseAllUpdatablePropertiesEquals(
            expectedWorkingDayCourse,
            getPersistedWorkingDayCourse(expectedWorkingDayCourse)
        );
    }
}

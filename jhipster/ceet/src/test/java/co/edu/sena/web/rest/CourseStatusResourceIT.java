package co.edu.sena.web.rest;

import static co.edu.sena.domain.CourseStatusAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CourseStatus;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CourseStatusRepository;
import co.edu.sena.service.dto.CourseStatusDTO;
import co.edu.sena.service.mapper.CourseStatusMapper;
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
 * Integration tests for the {@link CourseStatusResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CourseStatusResourceIT {

    private static final String DEFAULT_NAME_COURSE_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_NAME_COURSE_STATUS = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_COURSE = State.ACTIVE;
    private static final State UPDATED_STATE_COURSE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/course-statuses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourseStatusRepository courseStatusRepository;

    @Autowired
    private CourseStatusMapper courseStatusMapper;

    @Autowired
    private MockMvc restCourseStatusMockMvc;

    private CourseStatus courseStatus;

    private CourseStatus insertedCourseStatus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseStatus createEntity() {
        return new CourseStatus().nameCourseStatus(DEFAULT_NAME_COURSE_STATUS).stateCourse(DEFAULT_STATE_COURSE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseStatus createUpdatedEntity() {
        return new CourseStatus().nameCourseStatus(UPDATED_NAME_COURSE_STATUS).stateCourse(UPDATED_STATE_COURSE);
    }

    @BeforeEach
    void initTest() {
        courseStatus = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCourseStatus != null) {
            courseStatusRepository.delete(insertedCourseStatus);
            insertedCourseStatus = null;
        }
    }

    @Test
    void createCourseStatus() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);
        var returnedCourseStatusDTO = om.readValue(
            restCourseStatusMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseStatusDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourseStatusDTO.class
        );

        // Validate the CourseStatus in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCourseStatus = courseStatusMapper.toEntity(returnedCourseStatusDTO);
        assertCourseStatusUpdatableFieldsEquals(returnedCourseStatus, getPersistedCourseStatus(returnedCourseStatus));

        insertedCourseStatus = returnedCourseStatus;
    }

    @Test
    void createCourseStatusWithExistingId() throws Exception {
        // Create the CourseStatus with an existing ID
        courseStatus.setId("existing_id");
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameCourseStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        courseStatus.setNameCourseStatus(null);

        // Create the CourseStatus, which fails.
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        restCourseStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseStatusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStateCourseIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        courseStatus.setStateCourse(null);

        // Create the CourseStatus, which fails.
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        restCourseStatusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseStatusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCourseStatuses() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        // Get all the courseStatusList
        restCourseStatusMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseStatus.getId())))
            .andExpect(jsonPath("$.[*].nameCourseStatus").value(hasItem(DEFAULT_NAME_COURSE_STATUS)))
            .andExpect(jsonPath("$.[*].stateCourse").value(hasItem(DEFAULT_STATE_COURSE.toString())));
    }

    @Test
    void getCourseStatus() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        // Get the courseStatus
        restCourseStatusMockMvc
            .perform(get(ENTITY_API_URL_ID, courseStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courseStatus.getId()))
            .andExpect(jsonPath("$.nameCourseStatus").value(DEFAULT_NAME_COURSE_STATUS))
            .andExpect(jsonPath("$.stateCourse").value(DEFAULT_STATE_COURSE.toString()));
    }

    @Test
    void getNonExistingCourseStatus() throws Exception {
        // Get the courseStatus
        restCourseStatusMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCourseStatus() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseStatus
        CourseStatus updatedCourseStatus = courseStatusRepository.findById(courseStatus.getId()).orElseThrow();
        updatedCourseStatus.nameCourseStatus(UPDATED_NAME_COURSE_STATUS).stateCourse(UPDATED_STATE_COURSE);
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(updatedCourseStatus);

        restCourseStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseStatusDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseStatusDTO))
            )
            .andExpect(status().isOk());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourseStatusToMatchAllProperties(updatedCourseStatus);
    }

    @Test
    void putNonExistingCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseStatusDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseStatusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCourseStatusWithPatch() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseStatus using partial update
        CourseStatus partialUpdatedCourseStatus = new CourseStatus();
        partialUpdatedCourseStatus.setId(courseStatus.getId());

        partialUpdatedCourseStatus.stateCourse(UPDATED_STATE_COURSE);

        restCourseStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseStatus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseStatus))
            )
            .andExpect(status().isOk());

        // Validate the CourseStatus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseStatusUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourseStatus, courseStatus),
            getPersistedCourseStatus(courseStatus)
        );
    }

    @Test
    void fullUpdateCourseStatusWithPatch() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseStatus using partial update
        CourseStatus partialUpdatedCourseStatus = new CourseStatus();
        partialUpdatedCourseStatus.setId(courseStatus.getId());

        partialUpdatedCourseStatus.nameCourseStatus(UPDATED_NAME_COURSE_STATUS).stateCourse(UPDATED_STATE_COURSE);

        restCourseStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseStatus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseStatus))
            )
            .andExpect(status().isOk());

        // Validate the CourseStatus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseStatusUpdatableFieldsEquals(partialUpdatedCourseStatus, getPersistedCourseStatus(partialUpdatedCourseStatus));
    }

    @Test
    void patchNonExistingCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courseStatusDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseStatusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCourseStatus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseStatus.setId(UUID.randomUUID().toString());

        // Create the CourseStatus
        CourseStatusDTO courseStatusDTO = courseStatusMapper.toDto(courseStatus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseStatusMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courseStatusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseStatus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCourseStatus() throws Exception {
        // Initialize the database
        insertedCourseStatus = courseStatusRepository.save(courseStatus);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the courseStatus
        restCourseStatusMockMvc
            .perform(delete(ENTITY_API_URL_ID, courseStatus.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courseStatusRepository.count();
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

    protected CourseStatus getPersistedCourseStatus(CourseStatus courseStatus) {
        return courseStatusRepository.findById(courseStatus.getId()).orElseThrow();
    }

    protected void assertPersistedCourseStatusToMatchAllProperties(CourseStatus expectedCourseStatus) {
        assertCourseStatusAllPropertiesEquals(expectedCourseStatus, getPersistedCourseStatus(expectedCourseStatus));
    }

    protected void assertPersistedCourseStatusToMatchUpdatableProperties(CourseStatus expectedCourseStatus) {
        assertCourseStatusAllUpdatablePropertiesEquals(expectedCourseStatus, getPersistedCourseStatus(expectedCourseStatus));
    }
}

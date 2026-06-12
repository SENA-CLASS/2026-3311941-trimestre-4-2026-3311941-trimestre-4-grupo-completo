package co.edu.sena.web.rest;

import static co.edu.sena.domain.CheckListCourseAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CheckList;
import co.edu.sena.domain.CheckListCourse;
import co.edu.sena.domain.Course;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CheckListCourseRepository;
import co.edu.sena.service.dto.CheckListCourseDTO;
import co.edu.sena.service.mapper.CheckListCourseMapper;
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
 * Integration tests for the {@link CheckListCourseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CheckListCourseResourceIT {

    private static final State DEFAULT_CHECK_LIST_STATE = State.ACTIVE;
    private static final State UPDATED_CHECK_LIST_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/check-list-courses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CheckListCourseRepository checkListCourseRepository;

    @Autowired
    private CheckListCourseMapper checkListCourseMapper;

    @Autowired
    private MockMvc restCheckListCourseMockMvc;

    private CheckListCourse checkListCourse;

    private CheckListCourse insertedCheckListCourse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckListCourse createEntity() {
        CheckListCourse checkListCourse = new CheckListCourse().checkListState(DEFAULT_CHECK_LIST_STATE);
        // Add required entity
        Course course;
        course = CourseResourceIT.createEntity();
        course.setId("fixed-id-for-tests");
        checkListCourse.setCourse(course);
        // Add required entity
        CheckList checkList;
        checkList = CheckListResourceIT.createEntity();
        checkList.setId("fixed-id-for-tests");
        checkListCourse.setCheckList(checkList);
        return checkListCourse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CheckListCourse createUpdatedEntity() {
        CheckListCourse updatedCheckListCourse = new CheckListCourse().checkListState(UPDATED_CHECK_LIST_STATE);
        // Add required entity
        Course course;
        course = CourseResourceIT.createUpdatedEntity();
        course.setId("fixed-id-for-tests");
        updatedCheckListCourse.setCourse(course);
        // Add required entity
        CheckList checkList;
        checkList = CheckListResourceIT.createUpdatedEntity();
        checkList.setId("fixed-id-for-tests");
        updatedCheckListCourse.setCheckList(checkList);
        return updatedCheckListCourse;
    }

    @BeforeEach
    void initTest() {
        checkListCourse = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCheckListCourse != null) {
            checkListCourseRepository.delete(insertedCheckListCourse);
            insertedCheckListCourse = null;
        }
    }

    @Test
    void createCheckListCourse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);
        var returnedCheckListCourseDTO = om.readValue(
            restCheckListCourseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListCourseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CheckListCourseDTO.class
        );

        // Validate the CheckListCourse in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCheckListCourse = checkListCourseMapper.toEntity(returnedCheckListCourseDTO);
        assertCheckListCourseUpdatableFieldsEquals(returnedCheckListCourse, getPersistedCheckListCourse(returnedCheckListCourse));

        insertedCheckListCourse = returnedCheckListCourse;
    }

    @Test
    void createCheckListCourseWithExistingId() throws Exception {
        // Create the CheckListCourse with an existing ID
        checkListCourse.setId("existing_id");
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCheckListCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListCourseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkCheckListStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        checkListCourse.setCheckListState(null);

        // Create the CheckListCourse, which fails.
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        restCheckListCourseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListCourseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCheckListCourses() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        // Get all the checkListCourseList
        restCheckListCourseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(checkListCourse.getId())))
            .andExpect(jsonPath("$.[*].checkListState").value(hasItem(DEFAULT_CHECK_LIST_STATE.toString())));
    }

    @Test
    void getCheckListCourse() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        // Get the checkListCourse
        restCheckListCourseMockMvc
            .perform(get(ENTITY_API_URL_ID, checkListCourse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(checkListCourse.getId()))
            .andExpect(jsonPath("$.checkListState").value(DEFAULT_CHECK_LIST_STATE.toString()));
    }

    @Test
    void getNonExistingCheckListCourse() throws Exception {
        // Get the checkListCourse
        restCheckListCourseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCheckListCourse() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkListCourse
        CheckListCourse updatedCheckListCourse = checkListCourseRepository.findById(checkListCourse.getId()).orElseThrow();
        updatedCheckListCourse.checkListState(UPDATED_CHECK_LIST_STATE);
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(updatedCheckListCourse);

        restCheckListCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, checkListCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListCourseDTO))
            )
            .andExpect(status().isOk());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCheckListCourseToMatchAllProperties(updatedCheckListCourse);
    }

    @Test
    void putNonExistingCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, checkListCourseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(checkListCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(checkListCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCheckListCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkListCourse using partial update
        CheckListCourse partialUpdatedCheckListCourse = new CheckListCourse();
        partialUpdatedCheckListCourse.setId(checkListCourse.getId());

        restCheckListCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCheckListCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCheckListCourse))
            )
            .andExpect(status().isOk());

        // Validate the CheckListCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCheckListCourseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCheckListCourse, checkListCourse),
            getPersistedCheckListCourse(checkListCourse)
        );
    }

    @Test
    void fullUpdateCheckListCourseWithPatch() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the checkListCourse using partial update
        CheckListCourse partialUpdatedCheckListCourse = new CheckListCourse();
        partialUpdatedCheckListCourse.setId(checkListCourse.getId());

        partialUpdatedCheckListCourse.checkListState(UPDATED_CHECK_LIST_STATE);

        restCheckListCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCheckListCourse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCheckListCourse))
            )
            .andExpect(status().isOk());

        // Validate the CheckListCourse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCheckListCourseUpdatableFieldsEquals(
            partialUpdatedCheckListCourse,
            getPersistedCheckListCourse(partialUpdatedCheckListCourse)
        );
    }

    @Test
    void patchNonExistingCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, checkListCourseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(checkListCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(checkListCourseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCheckListCourse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        checkListCourse.setId(UUID.randomUUID().toString());

        // Create the CheckListCourse
        CheckListCourseDTO checkListCourseDTO = checkListCourseMapper.toDto(checkListCourse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCheckListCourseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(checkListCourseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CheckListCourse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCheckListCourse() throws Exception {
        // Initialize the database
        insertedCheckListCourse = checkListCourseRepository.save(checkListCourse);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the checkListCourse
        restCheckListCourseMockMvc
            .perform(delete(ENTITY_API_URL_ID, checkListCourse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return checkListCourseRepository.count();
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

    protected CheckListCourse getPersistedCheckListCourse(CheckListCourse checkListCourse) {
        return checkListCourseRepository.findById(checkListCourse.getId()).orElseThrow();
    }

    protected void assertPersistedCheckListCourseToMatchAllProperties(CheckListCourse expectedCheckListCourse) {
        assertCheckListCourseAllPropertiesEquals(expectedCheckListCourse, getPersistedCheckListCourse(expectedCheckListCourse));
    }

    protected void assertPersistedCheckListCourseToMatchUpdatableProperties(CheckListCourse expectedCheckListCourse) {
        assertCheckListCourseAllUpdatablePropertiesEquals(expectedCheckListCourse, getPersistedCheckListCourse(expectedCheckListCourse));
    }
}

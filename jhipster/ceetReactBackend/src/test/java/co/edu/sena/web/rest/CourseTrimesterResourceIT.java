package co.edu.sena.web.rest;

import static co.edu.sena.domain.CourseTrimesterAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Course;
import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.domain.Trimester;
import co.edu.sena.repository.CourseTrimesterRepository;
import co.edu.sena.service.CourseTrimesterService;
import co.edu.sena.service.dto.CourseTrimesterDTO;
import co.edu.sena.service.mapper.CourseTrimesterMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * Integration tests for the {@link CourseTrimesterResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CourseTrimesterResourceIT {

    private static final String ENTITY_API_URL = "/api/course-trimesters";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CourseTrimesterRepository courseTrimesterRepository;

    @Mock
    private CourseTrimesterRepository courseTrimesterRepositoryMock;

    @Autowired
    private CourseTrimesterMapper courseTrimesterMapper;

    @Mock
    private CourseTrimesterService courseTrimesterServiceMock;

    @Autowired
    private MockMvc restCourseTrimesterMockMvc;

    private CourseTrimester courseTrimester;

    private CourseTrimester insertedCourseTrimester;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseTrimester createEntity() {
        CourseTrimester courseTrimester = new CourseTrimester();
        // Add required entity
        Course course;
        course = CourseResourceIT.createEntity();
        course.setId("fixed-id-for-tests");
        courseTrimester.setCourse(course);
        // Add required entity
        Trimester trimester;
        trimester = TrimesterResourceIT.createEntity();
        trimester.setId("fixed-id-for-tests");
        courseTrimester.setTrimester(trimester);
        return courseTrimester;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CourseTrimester createUpdatedEntity() {
        CourseTrimester updatedCourseTrimester = new CourseTrimester();
        // Add required entity
        Course course;
        course = CourseResourceIT.createUpdatedEntity();
        course.setId("fixed-id-for-tests");
        updatedCourseTrimester.setCourse(course);
        // Add required entity
        Trimester trimester;
        trimester = TrimesterResourceIT.createUpdatedEntity();
        trimester.setId("fixed-id-for-tests");
        updatedCourseTrimester.setTrimester(trimester);
        return updatedCourseTrimester;
    }

    @BeforeEach
    void initTest() {
        courseTrimester = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCourseTrimester != null) {
            courseTrimesterRepository.delete(insertedCourseTrimester);
            insertedCourseTrimester = null;
        }
    }

    @Test
    void createCourseTrimester() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);
        var returnedCourseTrimesterDTO = om.readValue(
            restCourseTrimesterMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseTrimesterDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CourseTrimesterDTO.class
        );

        // Validate the CourseTrimester in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCourseTrimester = courseTrimesterMapper.toEntity(returnedCourseTrimesterDTO);
        assertCourseTrimesterUpdatableFieldsEquals(returnedCourseTrimester, getPersistedCourseTrimester(returnedCourseTrimester));

        insertedCourseTrimester = returnedCourseTrimester;
    }

    @Test
    void createCourseTrimesterWithExistingId() throws Exception {
        // Create the CourseTrimester with an existing ID
        courseTrimester.setId("existing_id");
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourseTrimesterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseTrimesterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllCourseTrimesters() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        // Get all the courseTrimesterList
        restCourseTrimesterMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courseTrimester.getId())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCourseTrimestersWithEagerRelationshipsIsEnabled() throws Exception {
        when(courseTrimesterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCourseTrimesterMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(courseTrimesterServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCourseTrimestersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(courseTrimesterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCourseTrimesterMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(courseTrimesterRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getCourseTrimester() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        // Get the courseTrimester
        restCourseTrimesterMockMvc
            .perform(get(ENTITY_API_URL_ID, courseTrimester.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(courseTrimester.getId()));
    }

    @Test
    void getNonExistingCourseTrimester() throws Exception {
        // Get the courseTrimester
        restCourseTrimesterMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCourseTrimester() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseTrimester
        CourseTrimester updatedCourseTrimester = courseTrimesterRepository.findById(courseTrimester.getId()).orElseThrow();
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(updatedCourseTrimester);

        restCourseTrimesterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseTrimesterDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseTrimesterDTO))
            )
            .andExpect(status().isOk());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCourseTrimesterToMatchAllProperties(updatedCourseTrimester);
    }

    @Test
    void putNonExistingCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, courseTrimesterDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseTrimesterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(courseTrimesterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(courseTrimesterDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCourseTrimesterWithPatch() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseTrimester using partial update
        CourseTrimester partialUpdatedCourseTrimester = new CourseTrimester();
        partialUpdatedCourseTrimester.setId(courseTrimester.getId());

        restCourseTrimesterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseTrimester.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseTrimester))
            )
            .andExpect(status().isOk());

        // Validate the CourseTrimester in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseTrimesterUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCourseTrimester, courseTrimester),
            getPersistedCourseTrimester(courseTrimester)
        );
    }

    @Test
    void fullUpdateCourseTrimesterWithPatch() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the courseTrimester using partial update
        CourseTrimester partialUpdatedCourseTrimester = new CourseTrimester();
        partialUpdatedCourseTrimester.setId(courseTrimester.getId());

        restCourseTrimesterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCourseTrimester.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCourseTrimester))
            )
            .andExpect(status().isOk());

        // Validate the CourseTrimester in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCourseTrimesterUpdatableFieldsEquals(
            partialUpdatedCourseTrimester,
            getPersistedCourseTrimester(partialUpdatedCourseTrimester)
        );
    }

    @Test
    void patchNonExistingCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, courseTrimesterDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseTrimesterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(courseTrimesterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCourseTrimester() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        courseTrimester.setId(UUID.randomUUID().toString());

        // Create the CourseTrimester
        CourseTrimesterDTO courseTrimesterDTO = courseTrimesterMapper.toDto(courseTrimester);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCourseTrimesterMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(courseTrimesterDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CourseTrimester in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCourseTrimester() throws Exception {
        // Initialize the database
        insertedCourseTrimester = courseTrimesterRepository.save(courseTrimester);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the courseTrimester
        restCourseTrimesterMockMvc
            .perform(delete(ENTITY_API_URL_ID, courseTrimester.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return courseTrimesterRepository.count();
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

    protected CourseTrimester getPersistedCourseTrimester(CourseTrimester courseTrimester) {
        return courseTrimesterRepository.findById(courseTrimester.getId()).orElseThrow();
    }

    protected void assertPersistedCourseTrimesterToMatchAllProperties(CourseTrimester expectedCourseTrimester) {
        assertCourseTrimesterAllPropertiesEquals(expectedCourseTrimester, getPersistedCourseTrimester(expectedCourseTrimester));
    }

    protected void assertPersistedCourseTrimesterToMatchUpdatableProperties(CourseTrimester expectedCourseTrimester) {
        assertCourseTrimesterAllUpdatablePropertiesEquals(expectedCourseTrimester, getPersistedCourseTrimester(expectedCourseTrimester));
    }
}

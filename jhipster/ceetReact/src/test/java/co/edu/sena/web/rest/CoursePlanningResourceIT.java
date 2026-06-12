package co.edu.sena.web.rest;

import static co.edu.sena.domain.CoursePlanningAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Course;
import co.edu.sena.domain.CoursePlanning;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CoursePlanningRepository;
import co.edu.sena.service.CoursePlanningService;
import co.edu.sena.service.dto.CoursePlanningDTO;
import co.edu.sena.service.mapper.CoursePlanningMapper;
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
 * Integration tests for the {@link CoursePlanningResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CoursePlanningResourceIT {

    private static final State DEFAULT_STATE_COURSE_PLANNING = State.ACTIVE;
    private static final State UPDATED_STATE_COURSE_PLANNING = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/course-plannings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CoursePlanningRepository coursePlanningRepository;

    @Mock
    private CoursePlanningRepository coursePlanningRepositoryMock;

    @Autowired
    private CoursePlanningMapper coursePlanningMapper;

    @Mock
    private CoursePlanningService coursePlanningServiceMock;

    @Autowired
    private MockMvc restCoursePlanningMockMvc;

    private CoursePlanning coursePlanning;

    private CoursePlanning insertedCoursePlanning;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoursePlanning createEntity() {
        CoursePlanning coursePlanning = new CoursePlanning().stateCoursePlanning(DEFAULT_STATE_COURSE_PLANNING);
        // Add required entity
        Course course;
        course = CourseResourceIT.createEntity();
        course.setId("fixed-id-for-tests");
        coursePlanning.setCourse(course);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createEntity();
        planning.setId("fixed-id-for-tests");
        coursePlanning.setPlanning(planning);
        return coursePlanning;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CoursePlanning createUpdatedEntity() {
        CoursePlanning updatedCoursePlanning = new CoursePlanning().stateCoursePlanning(UPDATED_STATE_COURSE_PLANNING);
        // Add required entity
        Course course;
        course = CourseResourceIT.createUpdatedEntity();
        course.setId("fixed-id-for-tests");
        updatedCoursePlanning.setCourse(course);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createUpdatedEntity();
        planning.setId("fixed-id-for-tests");
        updatedCoursePlanning.setPlanning(planning);
        return updatedCoursePlanning;
    }

    @BeforeEach
    void initTest() {
        coursePlanning = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCoursePlanning != null) {
            coursePlanningRepository.delete(insertedCoursePlanning);
            insertedCoursePlanning = null;
        }
    }

    @Test
    void createCoursePlanning() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);
        var returnedCoursePlanningDTO = om.readValue(
            restCoursePlanningMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coursePlanningDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CoursePlanningDTO.class
        );

        // Validate the CoursePlanning in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCoursePlanning = coursePlanningMapper.toEntity(returnedCoursePlanningDTO);
        assertCoursePlanningUpdatableFieldsEquals(returnedCoursePlanning, getPersistedCoursePlanning(returnedCoursePlanning));

        insertedCoursePlanning = returnedCoursePlanning;
    }

    @Test
    void createCoursePlanningWithExistingId() throws Exception {
        // Create the CoursePlanning with an existing ID
        coursePlanning.setId("existing_id");
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoursePlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coursePlanningDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkStateCoursePlanningIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        coursePlanning.setStateCoursePlanning(null);

        // Create the CoursePlanning, which fails.
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        restCoursePlanningMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coursePlanningDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCoursePlannings() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        // Get all the coursePlanningList
        restCoursePlanningMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coursePlanning.getId())))
            .andExpect(jsonPath("$.[*].stateCoursePlanning").value(hasItem(DEFAULT_STATE_COURSE_PLANNING.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCoursePlanningsWithEagerRelationshipsIsEnabled() throws Exception {
        when(coursePlanningServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCoursePlanningMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(coursePlanningServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCoursePlanningsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(coursePlanningServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCoursePlanningMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(coursePlanningRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getCoursePlanning() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        // Get the coursePlanning
        restCoursePlanningMockMvc
            .perform(get(ENTITY_API_URL_ID, coursePlanning.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(coursePlanning.getId()))
            .andExpect(jsonPath("$.stateCoursePlanning").value(DEFAULT_STATE_COURSE_PLANNING.toString()));
    }

    @Test
    void getNonExistingCoursePlanning() throws Exception {
        // Get the coursePlanning
        restCoursePlanningMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCoursePlanning() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coursePlanning
        CoursePlanning updatedCoursePlanning = coursePlanningRepository.findById(coursePlanning.getId()).orElseThrow();
        updatedCoursePlanning.stateCoursePlanning(UPDATED_STATE_COURSE_PLANNING);
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(updatedCoursePlanning);

        restCoursePlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, coursePlanningDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(coursePlanningDTO))
            )
            .andExpect(status().isOk());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCoursePlanningToMatchAllProperties(updatedCoursePlanning);
    }

    @Test
    void putNonExistingCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, coursePlanningDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(coursePlanningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(coursePlanningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(coursePlanningDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCoursePlanningWithPatch() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coursePlanning using partial update
        CoursePlanning partialUpdatedCoursePlanning = new CoursePlanning();
        partialUpdatedCoursePlanning.setId(coursePlanning.getId());

        restCoursePlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoursePlanning.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCoursePlanning))
            )
            .andExpect(status().isOk());

        // Validate the CoursePlanning in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCoursePlanningUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCoursePlanning, coursePlanning),
            getPersistedCoursePlanning(coursePlanning)
        );
    }

    @Test
    void fullUpdateCoursePlanningWithPatch() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the coursePlanning using partial update
        CoursePlanning partialUpdatedCoursePlanning = new CoursePlanning();
        partialUpdatedCoursePlanning.setId(coursePlanning.getId());

        partialUpdatedCoursePlanning.stateCoursePlanning(UPDATED_STATE_COURSE_PLANNING);

        restCoursePlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCoursePlanning.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCoursePlanning))
            )
            .andExpect(status().isOk());

        // Validate the CoursePlanning in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCoursePlanningUpdatableFieldsEquals(partialUpdatedCoursePlanning, getPersistedCoursePlanning(partialUpdatedCoursePlanning));
    }

    @Test
    void patchNonExistingCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, coursePlanningDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(coursePlanningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(coursePlanningDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCoursePlanning() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        coursePlanning.setId(UUID.randomUUID().toString());

        // Create the CoursePlanning
        CoursePlanningDTO coursePlanningDTO = coursePlanningMapper.toDto(coursePlanning);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCoursePlanningMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(coursePlanningDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CoursePlanning in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCoursePlanning() throws Exception {
        // Initialize the database
        insertedCoursePlanning = coursePlanningRepository.save(coursePlanning);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the coursePlanning
        restCoursePlanningMockMvc
            .perform(delete(ENTITY_API_URL_ID, coursePlanning.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return coursePlanningRepository.count();
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

    protected CoursePlanning getPersistedCoursePlanning(CoursePlanning coursePlanning) {
        return coursePlanningRepository.findById(coursePlanning.getId()).orElseThrow();
    }

    protected void assertPersistedCoursePlanningToMatchAllProperties(CoursePlanning expectedCoursePlanning) {
        assertCoursePlanningAllPropertiesEquals(expectedCoursePlanning, getPersistedCoursePlanning(expectedCoursePlanning));
    }

    protected void assertPersistedCoursePlanningToMatchUpdatableProperties(CoursePlanning expectedCoursePlanning) {
        assertCoursePlanningAllUpdatablePropertiesEquals(expectedCoursePlanning, getPersistedCoursePlanning(expectedCoursePlanning));
    }
}

package co.edu.sena.web.rest;

import static co.edu.sena.domain.ClassroomAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Campus;
import co.edu.sena.domain.Classroom;
import co.edu.sena.domain.ClassroomType;
import co.edu.sena.domain.enumeration.Limitation;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.ClassroomRepository;
import co.edu.sena.service.ClassroomService;
import co.edu.sena.service.dto.ClassroomDTO;
import co.edu.sena.service.mapper.ClassroomMapper;
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
 * Integration tests for the {@link ClassroomResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ClassroomResourceIT {

    private static final String DEFAULT_CLASSROOM_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CLASSROOM_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_CLASSROOM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_CLASSROOM_DESCRIPTION = "BBBBBBBBBB";

    private static final State DEFAULT_CLASSROOM_STATE = State.ACTIVE;
    private static final State UPDATED_CLASSROOM_STATE = State.INACTIVE;

    private static final Limitation DEFAULT_LIMITATION = Limitation.WITH_LIMITATION;
    private static final Limitation UPDATED_LIMITATION = Limitation.WITHOUT_LIMITATION;

    private static final String ENTITY_API_URL = "/api/classrooms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ClassroomRepository classroomRepository;

    @Mock
    private ClassroomRepository classroomRepositoryMock;

    @Autowired
    private ClassroomMapper classroomMapper;

    @Mock
    private ClassroomService classroomServiceMock;

    @Autowired
    private MockMvc restClassroomMockMvc;

    private Classroom classroom;

    private Classroom insertedClassroom;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Classroom createEntity() {
        Classroom classroom = new Classroom()
            .classroomNumber(DEFAULT_CLASSROOM_NUMBER)
            .classroomDescription(DEFAULT_CLASSROOM_DESCRIPTION)
            .classroomState(DEFAULT_CLASSROOM_STATE)
            .limitation(DEFAULT_LIMITATION);
        // Add required entity
        ClassroomType classroomType;
        classroomType = ClassroomTypeResourceIT.createEntity();
        classroomType.setId("fixed-id-for-tests");
        classroom.setClassroomType(classroomType);
        // Add required entity
        Campus campus;
        campus = CampusResourceIT.createEntity();
        campus.setId("fixed-id-for-tests");
        classroom.setCampus(campus);
        return classroom;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Classroom createUpdatedEntity() {
        Classroom updatedClassroom = new Classroom()
            .classroomNumber(UPDATED_CLASSROOM_NUMBER)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE)
            .limitation(UPDATED_LIMITATION);
        // Add required entity
        ClassroomType classroomType;
        classroomType = ClassroomTypeResourceIT.createUpdatedEntity();
        classroomType.setId("fixed-id-for-tests");
        updatedClassroom.setClassroomType(classroomType);
        // Add required entity
        Campus campus;
        campus = CampusResourceIT.createUpdatedEntity();
        campus.setId("fixed-id-for-tests");
        updatedClassroom.setCampus(campus);
        return updatedClassroom;
    }

    @BeforeEach
    void initTest() {
        classroom = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedClassroom != null) {
            classroomRepository.delete(insertedClassroom);
            insertedClassroom = null;
        }
    }

    @Test
    void createClassroom() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);
        var returnedClassroomDTO = om.readValue(
            restClassroomMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ClassroomDTO.class
        );

        // Validate the Classroom in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedClassroom = classroomMapper.toEntity(returnedClassroomDTO);
        assertClassroomUpdatableFieldsEquals(returnedClassroom, getPersistedClassroom(returnedClassroom));

        insertedClassroom = returnedClassroom;
    }

    @Test
    void createClassroomWithExistingId() throws Exception {
        // Create the Classroom with an existing ID
        classroom.setId("existing_id");
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkClassroomNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroom.setClassroomNumber(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        restClassroomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkClassroomDescriptionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroom.setClassroomDescription(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        restClassroomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkClassroomStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroom.setClassroomState(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        restClassroomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkLimitationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroom.setLimitation(null);

        // Create the Classroom, which fails.
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        restClassroomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllClassrooms() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        // Get all the classroomList
        restClassroomMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroom.getId())))
            .andExpect(jsonPath("$.[*].classroomNumber").value(hasItem(DEFAULT_CLASSROOM_NUMBER)))
            .andExpect(jsonPath("$.[*].classroomDescription").value(hasItem(DEFAULT_CLASSROOM_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].classroomState").value(hasItem(DEFAULT_CLASSROOM_STATE.toString())))
            .andExpect(jsonPath("$.[*].limitation").value(hasItem(DEFAULT_LIMITATION.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllClassroomsWithEagerRelationshipsIsEnabled() throws Exception {
        when(classroomServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restClassroomMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(classroomServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllClassroomsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(classroomServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restClassroomMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(classroomRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getClassroom() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        // Get the classroom
        restClassroomMockMvc
            .perform(get(ENTITY_API_URL_ID, classroom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(classroom.getId()))
            .andExpect(jsonPath("$.classroomNumber").value(DEFAULT_CLASSROOM_NUMBER))
            .andExpect(jsonPath("$.classroomDescription").value(DEFAULT_CLASSROOM_DESCRIPTION))
            .andExpect(jsonPath("$.classroomState").value(DEFAULT_CLASSROOM_STATE.toString()))
            .andExpect(jsonPath("$.limitation").value(DEFAULT_LIMITATION.toString()));
    }

    @Test
    void getNonExistingClassroom() throws Exception {
        // Get the classroom
        restClassroomMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingClassroom() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroom
        Classroom updatedClassroom = classroomRepository.findById(classroom.getId()).orElseThrow();
        updatedClassroom
            .classroomNumber(UPDATED_CLASSROOM_NUMBER)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE)
            .limitation(UPDATED_LIMITATION);
        ClassroomDTO classroomDTO = classroomMapper.toDto(updatedClassroom);

        restClassroomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomDTO))
            )
            .andExpect(status().isOk());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedClassroomToMatchAllProperties(updatedClassroom);
    }

    @Test
    void putNonExistingClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateClassroomWithPatch() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroom using partial update
        Classroom partialUpdatedClassroom = new Classroom();
        partialUpdatedClassroom.setId(classroom.getId());

        partialUpdatedClassroom.limitation(UPDATED_LIMITATION);

        restClassroomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroom.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroom))
            )
            .andExpect(status().isOk());

        // Validate the Classroom in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedClassroom, classroom),
            getPersistedClassroom(classroom)
        );
    }

    @Test
    void fullUpdateClassroomWithPatch() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroom using partial update
        Classroom partialUpdatedClassroom = new Classroom();
        partialUpdatedClassroom.setId(classroom.getId());

        partialUpdatedClassroom
            .classroomNumber(UPDATED_CLASSROOM_NUMBER)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE)
            .limitation(UPDATED_LIMITATION);

        restClassroomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroom.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroom))
            )
            .andExpect(status().isOk());

        // Validate the Classroom in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomUpdatableFieldsEquals(partialUpdatedClassroom, getPersistedClassroom(partialUpdatedClassroom));
    }

    @Test
    void patchNonExistingClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, classroomDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamClassroom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroom.setId(UUID.randomUUID().toString());

        // Create the Classroom
        ClassroomDTO classroomDTO = classroomMapper.toDto(classroom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(classroomDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Classroom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteClassroom() throws Exception {
        // Initialize the database
        insertedClassroom = classroomRepository.save(classroom);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the classroom
        restClassroomMockMvc
            .perform(delete(ENTITY_API_URL_ID, classroom.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return classroomRepository.count();
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

    protected Classroom getPersistedClassroom(Classroom classroom) {
        return classroomRepository.findById(classroom.getId()).orElseThrow();
    }

    protected void assertPersistedClassroomToMatchAllProperties(Classroom expectedClassroom) {
        assertClassroomAllPropertiesEquals(expectedClassroom, getPersistedClassroom(expectedClassroom));
    }

    protected void assertPersistedClassroomToMatchUpdatableProperties(Classroom expectedClassroom) {
        assertClassroomAllUpdatablePropertiesEquals(expectedClassroom, getPersistedClassroom(expectedClassroom));
    }
}

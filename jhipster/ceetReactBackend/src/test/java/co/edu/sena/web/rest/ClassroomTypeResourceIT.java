package co.edu.sena.web.rest;

import static co.edu.sena.domain.ClassroomTypeAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.ClassroomType;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.ClassroomTypeRepository;
import co.edu.sena.service.dto.ClassroomTypeDTO;
import co.edu.sena.service.mapper.ClassroomTypeMapper;
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
 * Integration tests for the {@link ClassroomTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClassroomTypeResourceIT {

    private static final String DEFAULT_TYPE_CLASSROOM = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_CLASSROOM = "BBBBBBBBBB";

    private static final String DEFAULT_CLASSROOM_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_CLASSROOM_DESCRIPTION = "BBBBBBBBBB";

    private static final State DEFAULT_CLASSROOM_STATE = State.ACTIVE;
    private static final State UPDATED_CLASSROOM_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/classroom-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ClassroomTypeRepository classroomTypeRepository;

    @Autowired
    private ClassroomTypeMapper classroomTypeMapper;

    @Autowired
    private MockMvc restClassroomTypeMockMvc;

    private ClassroomType classroomType;

    private ClassroomType insertedClassroomType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClassroomType createEntity() {
        return new ClassroomType()
            .typeClassroom(DEFAULT_TYPE_CLASSROOM)
            .classroomDescription(DEFAULT_CLASSROOM_DESCRIPTION)
            .classroomState(DEFAULT_CLASSROOM_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClassroomType createUpdatedEntity() {
        return new ClassroomType()
            .typeClassroom(UPDATED_TYPE_CLASSROOM)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE);
    }

    @BeforeEach
    void initTest() {
        classroomType = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedClassroomType != null) {
            classroomTypeRepository.delete(insertedClassroomType);
            insertedClassroomType = null;
        }
    }

    @Test
    void createClassroomType() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);
        var returnedClassroomTypeDTO = om.readValue(
            restClassroomTypeMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ClassroomTypeDTO.class
        );

        // Validate the ClassroomType in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedClassroomType = classroomTypeMapper.toEntity(returnedClassroomTypeDTO);
        assertClassroomTypeUpdatableFieldsEquals(returnedClassroomType, getPersistedClassroomType(returnedClassroomType));

        insertedClassroomType = returnedClassroomType;
    }

    @Test
    void createClassroomTypeWithExistingId() throws Exception {
        // Create the ClassroomType with an existing ID
        classroomType.setId("existing_id");
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTypeClassroomIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroomType.setTypeClassroom(null);

        // Create the ClassroomType, which fails.
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        restClassroomTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkClassroomDescriptionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroomType.setClassroomDescription(null);

        // Create the ClassroomType, which fails.
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        restClassroomTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkClassroomStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        classroomType.setClassroomState(null);

        // Create the ClassroomType, which fails.
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        restClassroomTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllClassroomTypes() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        // Get all the classroomTypeList
        restClassroomTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroomType.getId())))
            .andExpect(jsonPath("$.[*].typeClassroom").value(hasItem(DEFAULT_TYPE_CLASSROOM)))
            .andExpect(jsonPath("$.[*].classroomDescription").value(hasItem(DEFAULT_CLASSROOM_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].classroomState").value(hasItem(DEFAULT_CLASSROOM_STATE.toString())));
    }

    @Test
    void getClassroomType() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        // Get the classroomType
        restClassroomTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, classroomType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(classroomType.getId()))
            .andExpect(jsonPath("$.typeClassroom").value(DEFAULT_TYPE_CLASSROOM))
            .andExpect(jsonPath("$.classroomDescription").value(DEFAULT_CLASSROOM_DESCRIPTION))
            .andExpect(jsonPath("$.classroomState").value(DEFAULT_CLASSROOM_STATE.toString()));
    }

    @Test
    void getNonExistingClassroomType() throws Exception {
        // Get the classroomType
        restClassroomTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingClassroomType() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomType
        ClassroomType updatedClassroomType = classroomTypeRepository.findById(classroomType.getId()).orElseThrow();
        updatedClassroomType
            .typeClassroom(UPDATED_TYPE_CLASSROOM)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE);
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(updatedClassroomType);

        restClassroomTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedClassroomTypeToMatchAllProperties(updatedClassroomType);
    }

    @Test
    void putNonExistingClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateClassroomTypeWithPatch() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomType using partial update
        ClassroomType partialUpdatedClassroomType = new ClassroomType();
        partialUpdatedClassroomType.setId(classroomType.getId());

        partialUpdatedClassroomType.classroomDescription(UPDATED_CLASSROOM_DESCRIPTION);

        restClassroomTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroomType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroomType))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomTypeUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedClassroomType, classroomType),
            getPersistedClassroomType(classroomType)
        );
    }

    @Test
    void fullUpdateClassroomTypeWithPatch() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomType using partial update
        ClassroomType partialUpdatedClassroomType = new ClassroomType();
        partialUpdatedClassroomType.setId(classroomType.getId());

        partialUpdatedClassroomType
            .typeClassroom(UPDATED_TYPE_CLASSROOM)
            .classroomDescription(UPDATED_CLASSROOM_DESCRIPTION)
            .classroomState(UPDATED_CLASSROOM_STATE);

        restClassroomTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroomType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroomType))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomTypeUpdatableFieldsEquals(partialUpdatedClassroomType, getPersistedClassroomType(partialUpdatedClassroomType));
    }

    @Test
    void patchNonExistingClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, classroomTypeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamClassroomType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomType.setId(UUID.randomUUID().toString());

        // Create the ClassroomType
        ClassroomTypeDTO classroomTypeDTO = classroomTypeMapper.toDto(classroomType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomTypeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(classroomTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClassroomType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteClassroomType() throws Exception {
        // Initialize the database
        insertedClassroomType = classroomTypeRepository.save(classroomType);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the classroomType
        restClassroomTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, classroomType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return classroomTypeRepository.count();
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

    protected ClassroomType getPersistedClassroomType(ClassroomType classroomType) {
        return classroomTypeRepository.findById(classroomType.getId()).orElseThrow();
    }

    protected void assertPersistedClassroomTypeToMatchAllProperties(ClassroomType expectedClassroomType) {
        assertClassroomTypeAllPropertiesEquals(expectedClassroomType, getPersistedClassroomType(expectedClassroomType));
    }

    protected void assertPersistedClassroomTypeToMatchUpdatableProperties(ClassroomType expectedClassroomType) {
        assertClassroomTypeAllUpdatablePropertiesEquals(expectedClassroomType, getPersistedClassroomType(expectedClassroomType));
    }
}

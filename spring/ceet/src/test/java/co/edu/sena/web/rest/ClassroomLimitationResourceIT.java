package co.edu.sena.web.rest;

import static co.edu.sena.domain.ClassroomLimitationAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Classroom;
import co.edu.sena.domain.ClassroomLimitation;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.repository.ClassroomLimitationRepository;
import co.edu.sena.service.dto.ClassroomLimitationDTO;
import co.edu.sena.service.mapper.ClassroomLimitationMapper;
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
 * Integration tests for the {@link ClassroomLimitationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClassroomLimitationResourceIT {

    private static final String ENTITY_API_URL = "/api/classroom-limitations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ClassroomLimitationRepository classroomLimitationRepository;

    @Autowired
    private ClassroomLimitationMapper classroomLimitationMapper;

    @Autowired
    private MockMvc restClassroomLimitationMockMvc;

    private ClassroomLimitation classroomLimitation;

    private ClassroomLimitation insertedClassroomLimitation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClassroomLimitation createEntity() {
        ClassroomLimitation classroomLimitation = new ClassroomLimitation();
        // Add required entity
        Classroom classroom;
        classroom = ClassroomResourceIT.createEntity();
        classroom.setId("fixed-id-for-tests");
        classroomLimitation.setClassroom(classroom);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createEntity();
        learningResult.setId("fixed-id-for-tests");
        classroomLimitation.setLearningResult(learningResult);
        return classroomLimitation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClassroomLimitation createUpdatedEntity() {
        ClassroomLimitation updatedClassroomLimitation = new ClassroomLimitation();
        // Add required entity
        Classroom classroom;
        classroom = ClassroomResourceIT.createUpdatedEntity();
        classroom.setId("fixed-id-for-tests");
        updatedClassroomLimitation.setClassroom(classroom);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createUpdatedEntity();
        learningResult.setId("fixed-id-for-tests");
        updatedClassroomLimitation.setLearningResult(learningResult);
        return updatedClassroomLimitation;
    }

    @BeforeEach
    void initTest() {
        classroomLimitation = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedClassroomLimitation != null) {
            classroomLimitationRepository.delete(insertedClassroomLimitation);
            insertedClassroomLimitation = null;
        }
    }

    @Test
    void createClassroomLimitation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);
        var returnedClassroomLimitationDTO = om.readValue(
            restClassroomLimitationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomLimitationDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ClassroomLimitationDTO.class
        );

        // Validate the ClassroomLimitation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedClassroomLimitation = classroomLimitationMapper.toEntity(returnedClassroomLimitationDTO);
        assertClassroomLimitationUpdatableFieldsEquals(
            returnedClassroomLimitation,
            getPersistedClassroomLimitation(returnedClassroomLimitation)
        );

        insertedClassroomLimitation = returnedClassroomLimitation;
    }

    @Test
    void createClassroomLimitationWithExistingId() throws Exception {
        // Create the ClassroomLimitation with an existing ID
        classroomLimitation.setId("existing_id");
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClassroomLimitationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomLimitationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllClassroomLimitations() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        // Get all the classroomLimitationList
        restClassroomLimitationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(classroomLimitation.getId())));
    }

    @Test
    void getClassroomLimitation() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        // Get the classroomLimitation
        restClassroomLimitationMockMvc
            .perform(get(ENTITY_API_URL_ID, classroomLimitation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(classroomLimitation.getId()));
    }

    @Test
    void getNonExistingClassroomLimitation() throws Exception {
        // Get the classroomLimitation
        restClassroomLimitationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingClassroomLimitation() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomLimitation
        ClassroomLimitation updatedClassroomLimitation = classroomLimitationRepository.findById(classroomLimitation.getId()).orElseThrow();
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(updatedClassroomLimitation);

        restClassroomLimitationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomLimitationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedClassroomLimitationToMatchAllProperties(updatedClassroomLimitation);
    }

    @Test
    void putNonExistingClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, classroomLimitationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(classroomLimitationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateClassroomLimitationWithPatch() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomLimitation using partial update
        ClassroomLimitation partialUpdatedClassroomLimitation = new ClassroomLimitation();
        partialUpdatedClassroomLimitation.setId(classroomLimitation.getId());

        restClassroomLimitationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroomLimitation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroomLimitation))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomLimitation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomLimitationUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedClassroomLimitation, classroomLimitation),
            getPersistedClassroomLimitation(classroomLimitation)
        );
    }

    @Test
    void fullUpdateClassroomLimitationWithPatch() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the classroomLimitation using partial update
        ClassroomLimitation partialUpdatedClassroomLimitation = new ClassroomLimitation();
        partialUpdatedClassroomLimitation.setId(classroomLimitation.getId());

        restClassroomLimitationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClassroomLimitation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedClassroomLimitation))
            )
            .andExpect(status().isOk());

        // Validate the ClassroomLimitation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertClassroomLimitationUpdatableFieldsEquals(
            partialUpdatedClassroomLimitation,
            getPersistedClassroomLimitation(partialUpdatedClassroomLimitation)
        );
    }

    @Test
    void patchNonExistingClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, classroomLimitationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamClassroomLimitation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        classroomLimitation.setId(UUID.randomUUID().toString());

        // Create the ClassroomLimitation
        ClassroomLimitationDTO classroomLimitationDTO = classroomLimitationMapper.toDto(classroomLimitation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClassroomLimitationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(classroomLimitationDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClassroomLimitation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteClassroomLimitation() throws Exception {
        // Initialize the database
        insertedClassroomLimitation = classroomLimitationRepository.save(classroomLimitation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the classroomLimitation
        restClassroomLimitationMockMvc
            .perform(delete(ENTITY_API_URL_ID, classroomLimitation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return classroomLimitationRepository.count();
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

    protected ClassroomLimitation getPersistedClassroomLimitation(ClassroomLimitation classroomLimitation) {
        return classroomLimitationRepository.findById(classroomLimitation.getId()).orElseThrow();
    }

    protected void assertPersistedClassroomLimitationToMatchAllProperties(ClassroomLimitation expectedClassroomLimitation) {
        assertClassroomLimitationAllPropertiesEquals(
            expectedClassroomLimitation,
            getPersistedClassroomLimitation(expectedClassroomLimitation)
        );
    }

    protected void assertPersistedClassroomLimitationToMatchUpdatableProperties(ClassroomLimitation expectedClassroomLimitation) {
        assertClassroomLimitationAllUpdatablePropertiesEquals(
            expectedClassroomLimitation,
            getPersistedClassroomLimitation(expectedClassroomLimitation)
        );
    }
}

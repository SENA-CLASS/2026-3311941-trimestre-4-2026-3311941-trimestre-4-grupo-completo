package co.edu.sena.web.rest;

import static co.edu.sena.domain.InstructorAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.Instructor;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.InstructorRepository;
import co.edu.sena.service.dto.InstructorDTO;
import co.edu.sena.service.mapper.InstructorMapper;
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
 * Integration tests for the {@link InstructorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class InstructorResourceIT {

    private static final State DEFAULT_INSTRUCTOR_STATE = State.ACTIVE;
    private static final State UPDATED_INSTRUCTOR_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/instructors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private InstructorMapper instructorMapper;

    @Autowired
    private MockMvc restInstructorMockMvc;

    private Instructor instructor;

    private Instructor insertedInstructor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instructor createEntity() {
        Instructor instructor = new Instructor().instructorState(DEFAULT_INSTRUCTOR_STATE);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        instructor.setCustomer(customer);
        return instructor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Instructor createUpdatedEntity() {
        Instructor updatedInstructor = new Instructor().instructorState(UPDATED_INSTRUCTOR_STATE);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedInstructor.setCustomer(customer);
        return updatedInstructor;
    }

    @BeforeEach
    void initTest() {
        instructor = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedInstructor != null) {
            instructorRepository.delete(insertedInstructor);
            insertedInstructor = null;
        }
    }

    @Test
    void createInstructor() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);
        var returnedInstructorDTO = om.readValue(
            restInstructorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            InstructorDTO.class
        );

        // Validate the Instructor in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedInstructor = instructorMapper.toEntity(returnedInstructorDTO);
        assertInstructorUpdatableFieldsEquals(returnedInstructor, getPersistedInstructor(returnedInstructor));

        insertedInstructor = returnedInstructor;
    }

    @Test
    void createInstructorWithExistingId() throws Exception {
        // Create the Instructor with an existing ID
        instructor.setId("existing_id");
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkInstructorStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        instructor.setInstructorState(null);

        // Create the Instructor, which fails.
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        restInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllInstructors() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        // Get all the instructorList
        restInstructorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instructor.getId())))
            .andExpect(jsonPath("$.[*].instructorState").value(hasItem(DEFAULT_INSTRUCTOR_STATE.toString())));
    }

    @Test
    void getInstructor() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        // Get the instructor
        restInstructorMockMvc
            .perform(get(ENTITY_API_URL_ID, instructor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(instructor.getId()))
            .andExpect(jsonPath("$.instructorState").value(DEFAULT_INSTRUCTOR_STATE.toString()));
    }

    @Test
    void getNonExistingInstructor() throws Exception {
        // Get the instructor
        restInstructorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingInstructor() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructor
        Instructor updatedInstructor = instructorRepository.findById(instructor.getId()).orElseThrow();
        updatedInstructor.instructorState(UPDATED_INSTRUCTOR_STATE);
        InstructorDTO instructorDTO = instructorMapper.toDto(updatedInstructor);

        restInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, instructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorDTO))
            )
            .andExpect(status().isOk());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedInstructorToMatchAllProperties(updatedInstructor);
    }

    @Test
    void putNonExistingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, instructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(instructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(instructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructor using partial update
        Instructor partialUpdatedInstructor = new Instructor();
        partialUpdatedInstructor.setId(instructor.getId());

        partialUpdatedInstructor.instructorState(UPDATED_INSTRUCTOR_STATE);

        restInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstructor))
            )
            .andExpect(status().isOk());

        // Validate the Instructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstructorUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedInstructor, instructor),
            getPersistedInstructor(instructor)
        );
    }

    @Test
    void fullUpdateInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the instructor using partial update
        Instructor partialUpdatedInstructor = new Instructor();
        partialUpdatedInstructor.setId(instructor.getId());

        partialUpdatedInstructor.instructorState(UPDATED_INSTRUCTOR_STATE);

        restInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedInstructor))
            )
            .andExpect(status().isOk());

        // Validate the Instructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertInstructorUpdatableFieldsEquals(partialUpdatedInstructor, getPersistedInstructor(partialUpdatedInstructor));
    }

    @Test
    void patchNonExistingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, instructorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(instructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        instructor.setId(UUID.randomUUID().toString());

        // Create the Instructor
        InstructorDTO instructorDTO = instructorMapper.toDto(instructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInstructorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(instructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Instructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteInstructor() throws Exception {
        // Initialize the database
        insertedInstructor = instructorRepository.save(instructor);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the instructor
        restInstructorMockMvc
            .perform(delete(ENTITY_API_URL_ID, instructor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return instructorRepository.count();
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

    protected Instructor getPersistedInstructor(Instructor instructor) {
        return instructorRepository.findById(instructor.getId()).orElseThrow();
    }

    protected void assertPersistedInstructorToMatchAllProperties(Instructor expectedInstructor) {
        assertInstructorAllPropertiesEquals(expectedInstructor, getPersistedInstructor(expectedInstructor));
    }

    protected void assertPersistedInstructorToMatchUpdatableProperties(Instructor expectedInstructor) {
        assertInstructorAllUpdatablePropertiesEquals(expectedInstructor, getPersistedInstructor(expectedInstructor));
    }
}

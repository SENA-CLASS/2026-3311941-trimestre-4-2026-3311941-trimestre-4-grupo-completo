package co.edu.sena.web.rest;

import static co.edu.sena.domain.AreaInstructorAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Area;
import co.edu.sena.domain.AreaInstructor;
import co.edu.sena.domain.Instructor;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.AreaInstructorRepository;
import co.edu.sena.service.AreaInstructorService;
import co.edu.sena.service.dto.AreaInstructorDTO;
import co.edu.sena.service.mapper.AreaInstructorMapper;
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
 * Integration tests for the {@link AreaInstructorResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class AreaInstructorResourceIT {

    private static final State DEFAULT_AREA_INSTRUCTOR_STATE = State.ACTIVE;
    private static final State UPDATED_AREA_INSTRUCTOR_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/area-instructors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AreaInstructorRepository areaInstructorRepository;

    @Mock
    private AreaInstructorRepository areaInstructorRepositoryMock;

    @Autowired
    private AreaInstructorMapper areaInstructorMapper;

    @Mock
    private AreaInstructorService areaInstructorServiceMock;

    @Autowired
    private MockMvc restAreaInstructorMockMvc;

    private AreaInstructor areaInstructor;

    private AreaInstructor insertedAreaInstructor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaInstructor createEntity() {
        AreaInstructor areaInstructor = new AreaInstructor().areaInstructorState(DEFAULT_AREA_INSTRUCTOR_STATE);
        // Add required entity
        Area area;
        area = AreaResourceIT.createEntity();
        area.setId("fixed-id-for-tests");
        areaInstructor.setArea(area);
        // Add required entity
        Instructor instructor;
        instructor = InstructorResourceIT.createEntity();
        instructor.setId("fixed-id-for-tests");
        areaInstructor.setInstructor(instructor);
        return areaInstructor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AreaInstructor createUpdatedEntity() {
        AreaInstructor updatedAreaInstructor = new AreaInstructor().areaInstructorState(UPDATED_AREA_INSTRUCTOR_STATE);
        // Add required entity
        Area area;
        area = AreaResourceIT.createUpdatedEntity();
        area.setId("fixed-id-for-tests");
        updatedAreaInstructor.setArea(area);
        // Add required entity
        Instructor instructor;
        instructor = InstructorResourceIT.createUpdatedEntity();
        instructor.setId("fixed-id-for-tests");
        updatedAreaInstructor.setInstructor(instructor);
        return updatedAreaInstructor;
    }

    @BeforeEach
    void initTest() {
        areaInstructor = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedAreaInstructor != null) {
            areaInstructorRepository.delete(insertedAreaInstructor);
            insertedAreaInstructor = null;
        }
    }

    @Test
    void createAreaInstructor() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);
        var returnedAreaInstructorDTO = om.readValue(
            restAreaInstructorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaInstructorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AreaInstructorDTO.class
        );

        // Validate the AreaInstructor in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAreaInstructor = areaInstructorMapper.toEntity(returnedAreaInstructorDTO);
        assertAreaInstructorUpdatableFieldsEquals(returnedAreaInstructor, getPersistedAreaInstructor(returnedAreaInstructor));

        insertedAreaInstructor = returnedAreaInstructor;
    }

    @Test
    void createAreaInstructorWithExistingId() throws Exception {
        // Create the AreaInstructor with an existing ID
        areaInstructor.setId("existing_id");
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaInstructorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkAreaInstructorStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        areaInstructor.setAreaInstructorState(null);

        // Create the AreaInstructor, which fails.
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        restAreaInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaInstructorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllAreaInstructors() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        // Get all the areaInstructorList
        restAreaInstructorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(areaInstructor.getId())))
            .andExpect(jsonPath("$.[*].areaInstructorState").value(hasItem(DEFAULT_AREA_INSTRUCTOR_STATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAreaInstructorsWithEagerRelationshipsIsEnabled() throws Exception {
        when(areaInstructorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAreaInstructorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(areaInstructorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAreaInstructorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(areaInstructorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAreaInstructorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(areaInstructorRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getAreaInstructor() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        // Get the areaInstructor
        restAreaInstructorMockMvc
            .perform(get(ENTITY_API_URL_ID, areaInstructor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(areaInstructor.getId()))
            .andExpect(jsonPath("$.areaInstructorState").value(DEFAULT_AREA_INSTRUCTOR_STATE.toString()));
    }

    @Test
    void getNonExistingAreaInstructor() throws Exception {
        // Get the areaInstructor
        restAreaInstructorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingAreaInstructor() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the areaInstructor
        AreaInstructor updatedAreaInstructor = areaInstructorRepository.findById(areaInstructor.getId()).orElseThrow();
        updatedAreaInstructor.areaInstructorState(UPDATED_AREA_INSTRUCTOR_STATE);
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(updatedAreaInstructor);

        restAreaInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, areaInstructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(areaInstructorDTO))
            )
            .andExpect(status().isOk());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAreaInstructorToMatchAllProperties(updatedAreaInstructor);
    }

    @Test
    void putNonExistingAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, areaInstructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(areaInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(areaInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaInstructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateAreaInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the areaInstructor using partial update
        AreaInstructor partialUpdatedAreaInstructor = new AreaInstructor();
        partialUpdatedAreaInstructor.setId(areaInstructor.getId());

        restAreaInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAreaInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAreaInstructor))
            )
            .andExpect(status().isOk());

        // Validate the AreaInstructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAreaInstructorUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAreaInstructor, areaInstructor),
            getPersistedAreaInstructor(areaInstructor)
        );
    }

    @Test
    void fullUpdateAreaInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the areaInstructor using partial update
        AreaInstructor partialUpdatedAreaInstructor = new AreaInstructor();
        partialUpdatedAreaInstructor.setId(areaInstructor.getId());

        partialUpdatedAreaInstructor.areaInstructorState(UPDATED_AREA_INSTRUCTOR_STATE);

        restAreaInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAreaInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAreaInstructor))
            )
            .andExpect(status().isOk());

        // Validate the AreaInstructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAreaInstructorUpdatableFieldsEquals(partialUpdatedAreaInstructor, getPersistedAreaInstructor(partialUpdatedAreaInstructor));
    }

    @Test
    void patchNonExistingAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, areaInstructorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(areaInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(areaInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamAreaInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        areaInstructor.setId(UUID.randomUUID().toString());

        // Create the AreaInstructor
        AreaInstructorDTO areaInstructorDTO = areaInstructorMapper.toDto(areaInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaInstructorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(areaInstructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AreaInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteAreaInstructor() throws Exception {
        // Initialize the database
        insertedAreaInstructor = areaInstructorRepository.save(areaInstructor);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the areaInstructor
        restAreaInstructorMockMvc
            .perform(delete(ENTITY_API_URL_ID, areaInstructor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return areaInstructorRepository.count();
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

    protected AreaInstructor getPersistedAreaInstructor(AreaInstructor areaInstructor) {
        return areaInstructorRepository.findById(areaInstructor.getId()).orElseThrow();
    }

    protected void assertPersistedAreaInstructorToMatchAllProperties(AreaInstructor expectedAreaInstructor) {
        assertAreaInstructorAllPropertiesEquals(expectedAreaInstructor, getPersistedAreaInstructor(expectedAreaInstructor));
    }

    protected void assertPersistedAreaInstructorToMatchUpdatableProperties(AreaInstructor expectedAreaInstructor) {
        assertAreaInstructorAllUpdatablePropertiesEquals(expectedAreaInstructor, getPersistedAreaInstructor(expectedAreaInstructor));
    }
}

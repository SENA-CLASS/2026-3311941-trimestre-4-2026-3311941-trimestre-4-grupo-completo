package co.edu.sena.web.rest;

import static co.edu.sena.domain.BondingInstructorAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Bonding;
import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.Instructor;
import co.edu.sena.domain.Year;
import co.edu.sena.repository.BondingInstructorRepository;
import co.edu.sena.service.BondingInstructorService;
import co.edu.sena.service.dto.BondingInstructorDTO;
import co.edu.sena.service.mapper.BondingInstructorMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link BondingInstructorResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BondingInstructorResourceIT {

    private static final LocalDate DEFAULT_START_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/bonding-instructors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BondingInstructorRepository bondingInstructorRepository;

    @Mock
    private BondingInstructorRepository bondingInstructorRepositoryMock;

    @Autowired
    private BondingInstructorMapper bondingInstructorMapper;

    @Mock
    private BondingInstructorService bondingInstructorServiceMock;

    @Autowired
    private MockMvc restBondingInstructorMockMvc;

    private BondingInstructor bondingInstructor;

    private BondingInstructor insertedBondingInstructor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BondingInstructor createEntity() {
        BondingInstructor bondingInstructor = new BondingInstructor().startTime(DEFAULT_START_TIME).endTime(DEFAULT_END_TIME);
        // Add required entity
        Year year;
        year = YearResourceIT.createEntity();
        year.setId("fixed-id-for-tests");
        bondingInstructor.setYear(year);
        // Add required entity
        Instructor instructor;
        instructor = InstructorResourceIT.createEntity();
        instructor.setId("fixed-id-for-tests");
        bondingInstructor.setInstructor(instructor);
        // Add required entity
        Bonding bonding;
        bonding = BondingResourceIT.createEntity();
        bonding.setId("fixed-id-for-tests");
        bondingInstructor.setBonding(bonding);
        return bondingInstructor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BondingInstructor createUpdatedEntity() {
        BondingInstructor updatedBondingInstructor = new BondingInstructor().startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);
        // Add required entity
        Year year;
        year = YearResourceIT.createUpdatedEntity();
        year.setId("fixed-id-for-tests");
        updatedBondingInstructor.setYear(year);
        // Add required entity
        Instructor instructor;
        instructor = InstructorResourceIT.createUpdatedEntity();
        instructor.setId("fixed-id-for-tests");
        updatedBondingInstructor.setInstructor(instructor);
        // Add required entity
        Bonding bonding;
        bonding = BondingResourceIT.createUpdatedEntity();
        bonding.setId("fixed-id-for-tests");
        updatedBondingInstructor.setBonding(bonding);
        return updatedBondingInstructor;
    }

    @BeforeEach
    void initTest() {
        bondingInstructor = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedBondingInstructor != null) {
            bondingInstructorRepository.delete(insertedBondingInstructor);
            insertedBondingInstructor = null;
        }
    }

    @Test
    void createBondingInstructor() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);
        var returnedBondingInstructorDTO = om.readValue(
            restBondingInstructorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingInstructorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BondingInstructorDTO.class
        );

        // Validate the BondingInstructor in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBondingInstructor = bondingInstructorMapper.toEntity(returnedBondingInstructorDTO);
        assertBondingInstructorUpdatableFieldsEquals(returnedBondingInstructor, getPersistedBondingInstructor(returnedBondingInstructor));

        insertedBondingInstructor = returnedBondingInstructor;
    }

    @Test
    void createBondingInstructorWithExistingId() throws Exception {
        // Create the BondingInstructor with an existing ID
        bondingInstructor.setId("existing_id");
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBondingInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingInstructorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkStartTimeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bondingInstructor.setStartTime(null);

        // Create the BondingInstructor, which fails.
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        restBondingInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingInstructorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEndTimeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bondingInstructor.setEndTime(null);

        // Create the BondingInstructor, which fails.
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        restBondingInstructorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingInstructorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllBondingInstructors() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        // Get all the bondingInstructorList
        restBondingInstructorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bondingInstructor.getId())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBondingInstructorsWithEagerRelationshipsIsEnabled() throws Exception {
        when(bondingInstructorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBondingInstructorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(bondingInstructorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBondingInstructorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(bondingInstructorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBondingInstructorMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(bondingInstructorRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getBondingInstructor() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        // Get the bondingInstructor
        restBondingInstructorMockMvc
            .perform(get(ENTITY_API_URL_ID, bondingInstructor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bondingInstructor.getId()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()));
    }

    @Test
    void getNonExistingBondingInstructor() throws Exception {
        // Get the bondingInstructor
        restBondingInstructorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBondingInstructor() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingInstructor
        BondingInstructor updatedBondingInstructor = bondingInstructorRepository.findById(bondingInstructor.getId()).orElseThrow();
        updatedBondingInstructor.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(updatedBondingInstructor);

        restBondingInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingInstructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingInstructorDTO))
            )
            .andExpect(status().isOk());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBondingInstructorToMatchAllProperties(updatedBondingInstructor);
    }

    @Test
    void putNonExistingBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingInstructorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingInstructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBondingInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingInstructor using partial update
        BondingInstructor partialUpdatedBondingInstructor = new BondingInstructor();
        partialUpdatedBondingInstructor.setId(bondingInstructor.getId());

        restBondingInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBondingInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBondingInstructor))
            )
            .andExpect(status().isOk());

        // Validate the BondingInstructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingInstructorUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedBondingInstructor, bondingInstructor),
            getPersistedBondingInstructor(bondingInstructor)
        );
    }

    @Test
    void fullUpdateBondingInstructorWithPatch() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingInstructor using partial update
        BondingInstructor partialUpdatedBondingInstructor = new BondingInstructor();
        partialUpdatedBondingInstructor.setId(bondingInstructor.getId());

        partialUpdatedBondingInstructor.startTime(UPDATED_START_TIME).endTime(UPDATED_END_TIME);

        restBondingInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBondingInstructor.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBondingInstructor))
            )
            .andExpect(status().isOk());

        // Validate the BondingInstructor in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingInstructorUpdatableFieldsEquals(
            partialUpdatedBondingInstructor,
            getPersistedBondingInstructor(partialUpdatedBondingInstructor)
        );
    }

    @Test
    void patchNonExistingBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bondingInstructorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingInstructorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBondingInstructor() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingInstructor.setId(UUID.randomUUID().toString());

        // Create the BondingInstructor
        BondingInstructorDTO bondingInstructorDTO = bondingInstructorMapper.toDto(bondingInstructor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingInstructorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bondingInstructorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BondingInstructor in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBondingInstructor() throws Exception {
        // Initialize the database
        insertedBondingInstructor = bondingInstructorRepository.save(bondingInstructor);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bondingInstructor
        restBondingInstructorMockMvc
            .perform(delete(ENTITY_API_URL_ID, bondingInstructor.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bondingInstructorRepository.count();
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

    protected BondingInstructor getPersistedBondingInstructor(BondingInstructor bondingInstructor) {
        return bondingInstructorRepository.findById(bondingInstructor.getId()).orElseThrow();
    }

    protected void assertPersistedBondingInstructorToMatchAllProperties(BondingInstructor expectedBondingInstructor) {
        assertBondingInstructorAllPropertiesEquals(expectedBondingInstructor, getPersistedBondingInstructor(expectedBondingInstructor));
    }

    protected void assertPersistedBondingInstructorToMatchUpdatableProperties(BondingInstructor expectedBondingInstructor) {
        assertBondingInstructorAllUpdatablePropertiesEquals(
            expectedBondingInstructor,
            getPersistedBondingInstructor(expectedBondingInstructor)
        );
    }
}

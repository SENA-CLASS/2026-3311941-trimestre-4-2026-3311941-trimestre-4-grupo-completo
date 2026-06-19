package co.edu.sena.web.rest;

import static co.edu.sena.domain.TrainingProgramAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.LevelEducation;
import co.edu.sena.domain.TrainingProgram;
import co.edu.sena.domain.enumeration.StateProgram;
import co.edu.sena.repository.TrainingProgramRepository;
import co.edu.sena.service.TrainingProgramService;
import co.edu.sena.service.dto.TrainingProgramDTO;
import co.edu.sena.service.mapper.TrainingProgramMapper;
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
 * Integration tests for the {@link TrainingProgramResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class TrainingProgramResourceIT {

    private static final String DEFAULT_PROGRAM_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAM_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAM_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAM_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAM_INITIALS = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAM_INITIALS = "BBBBBBBBBB";

    private static final StateProgram DEFAULT_PROGRAM_STATE = StateProgram.EXECUTION;
    private static final StateProgram UPDATED_PROGRAM_STATE = StateProgram.DISCONTINUED;

    private static final String ENTITY_API_URL = "/api/training-programs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TrainingProgramRepository trainingProgramRepository;

    @Mock
    private TrainingProgramRepository trainingProgramRepositoryMock;

    @Autowired
    private TrainingProgramMapper trainingProgramMapper;

    @Mock
    private TrainingProgramService trainingProgramServiceMock;

    @Autowired
    private MockMvc restTrainingProgramMockMvc;

    private TrainingProgram trainingProgram;

    private TrainingProgram insertedTrainingProgram;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingProgram createEntity() {
        TrainingProgram trainingProgram = new TrainingProgram()
            .programCode(DEFAULT_PROGRAM_CODE)
            .programVersion(DEFAULT_PROGRAM_VERSION)
            .programName(DEFAULT_PROGRAM_NAME)
            .programInitials(DEFAULT_PROGRAM_INITIALS)
            .programState(DEFAULT_PROGRAM_STATE);
        // Add required entity
        LevelEducation levelEducation;
        levelEducation = LevelEducationResourceIT.createEntity();
        levelEducation.setId("fixed-id-for-tests");
        trainingProgram.setLevelEducation(levelEducation);
        return trainingProgram;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TrainingProgram createUpdatedEntity() {
        TrainingProgram updatedTrainingProgram = new TrainingProgram()
            .programCode(UPDATED_PROGRAM_CODE)
            .programVersion(UPDATED_PROGRAM_VERSION)
            .programName(UPDATED_PROGRAM_NAME)
            .programInitials(UPDATED_PROGRAM_INITIALS)
            .programState(UPDATED_PROGRAM_STATE);
        // Add required entity
        LevelEducation levelEducation;
        levelEducation = LevelEducationResourceIT.createUpdatedEntity();
        levelEducation.setId("fixed-id-for-tests");
        updatedTrainingProgram.setLevelEducation(levelEducation);
        return updatedTrainingProgram;
    }

    @BeforeEach
    void initTest() {
        trainingProgram = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedTrainingProgram != null) {
            trainingProgramRepository.delete(insertedTrainingProgram);
            insertedTrainingProgram = null;
        }
    }

    @Test
    void createTrainingProgram() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);
        var returnedTrainingProgramDTO = om.readValue(
            restTrainingProgramMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TrainingProgramDTO.class
        );

        // Validate the TrainingProgram in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTrainingProgram = trainingProgramMapper.toEntity(returnedTrainingProgramDTO);
        assertTrainingProgramUpdatableFieldsEquals(returnedTrainingProgram, getPersistedTrainingProgram(returnedTrainingProgram));

        insertedTrainingProgram = returnedTrainingProgram;
    }

    @Test
    void createTrainingProgramWithExistingId() throws Exception {
        // Create the TrainingProgram with an existing ID
        trainingProgram.setId("existing_id");
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkProgramCodeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingProgram.setProgramCode(null);

        // Create the TrainingProgram, which fails.
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProgramVersionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingProgram.setProgramVersion(null);

        // Create the TrainingProgram, which fails.
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProgramNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingProgram.setProgramName(null);

        // Create the TrainingProgram, which fails.
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProgramInitialsIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingProgram.setProgramInitials(null);

        // Create the TrainingProgram, which fails.
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProgramStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        trainingProgram.setProgramState(null);

        // Create the TrainingProgram, which fails.
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        restTrainingProgramMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllTrainingPrograms() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        // Get all the trainingProgramList
        restTrainingProgramMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingProgram.getId())))
            .andExpect(jsonPath("$.[*].programCode").value(hasItem(DEFAULT_PROGRAM_CODE)))
            .andExpect(jsonPath("$.[*].programVersion").value(hasItem(DEFAULT_PROGRAM_VERSION)))
            .andExpect(jsonPath("$.[*].programName").value(hasItem(DEFAULT_PROGRAM_NAME)))
            .andExpect(jsonPath("$.[*].programInitials").value(hasItem(DEFAULT_PROGRAM_INITIALS)))
            .andExpect(jsonPath("$.[*].programState").value(hasItem(DEFAULT_PROGRAM_STATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTrainingProgramsWithEagerRelationshipsIsEnabled() throws Exception {
        when(trainingProgramServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingProgramMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(trainingProgramServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllTrainingProgramsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(trainingProgramServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restTrainingProgramMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(trainingProgramRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getTrainingProgram() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        // Get the trainingProgram
        restTrainingProgramMockMvc
            .perform(get(ENTITY_API_URL_ID, trainingProgram.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trainingProgram.getId()))
            .andExpect(jsonPath("$.programCode").value(DEFAULT_PROGRAM_CODE))
            .andExpect(jsonPath("$.programVersion").value(DEFAULT_PROGRAM_VERSION))
            .andExpect(jsonPath("$.programName").value(DEFAULT_PROGRAM_NAME))
            .andExpect(jsonPath("$.programInitials").value(DEFAULT_PROGRAM_INITIALS))
            .andExpect(jsonPath("$.programState").value(DEFAULT_PROGRAM_STATE.toString()));
    }

    @Test
    void getNonExistingTrainingProgram() throws Exception {
        // Get the trainingProgram
        restTrainingProgramMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingTrainingProgram() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingProgram
        TrainingProgram updatedTrainingProgram = trainingProgramRepository.findById(trainingProgram.getId()).orElseThrow();
        updatedTrainingProgram
            .programCode(UPDATED_PROGRAM_CODE)
            .programVersion(UPDATED_PROGRAM_VERSION)
            .programName(UPDATED_PROGRAM_NAME)
            .programInitials(UPDATED_PROGRAM_INITIALS)
            .programState(UPDATED_PROGRAM_STATE);
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(updatedTrainingProgram);

        restTrainingProgramMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trainingProgramDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingProgramDTO))
            )
            .andExpect(status().isOk());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTrainingProgramToMatchAllProperties(updatedTrainingProgram);
    }

    @Test
    void putNonExistingTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trainingProgramDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingProgramDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(trainingProgramDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateTrainingProgramWithPatch() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingProgram using partial update
        TrainingProgram partialUpdatedTrainingProgram = new TrainingProgram();
        partialUpdatedTrainingProgram.setId(trainingProgram.getId());

        partialUpdatedTrainingProgram
            .programCode(UPDATED_PROGRAM_CODE)
            .programVersion(UPDATED_PROGRAM_VERSION)
            .programInitials(UPDATED_PROGRAM_INITIALS)
            .programState(UPDATED_PROGRAM_STATE);

        restTrainingProgramMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrainingProgram.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTrainingProgram))
            )
            .andExpect(status().isOk());

        // Validate the TrainingProgram in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTrainingProgramUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTrainingProgram, trainingProgram),
            getPersistedTrainingProgram(trainingProgram)
        );
    }

    @Test
    void fullUpdateTrainingProgramWithPatch() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the trainingProgram using partial update
        TrainingProgram partialUpdatedTrainingProgram = new TrainingProgram();
        partialUpdatedTrainingProgram.setId(trainingProgram.getId());

        partialUpdatedTrainingProgram
            .programCode(UPDATED_PROGRAM_CODE)
            .programVersion(UPDATED_PROGRAM_VERSION)
            .programName(UPDATED_PROGRAM_NAME)
            .programInitials(UPDATED_PROGRAM_INITIALS)
            .programState(UPDATED_PROGRAM_STATE);

        restTrainingProgramMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrainingProgram.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTrainingProgram))
            )
            .andExpect(status().isOk());

        // Validate the TrainingProgram in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTrainingProgramUpdatableFieldsEquals(
            partialUpdatedTrainingProgram,
            getPersistedTrainingProgram(partialUpdatedTrainingProgram)
        );
    }

    @Test
    void patchNonExistingTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, trainingProgramDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(trainingProgramDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(trainingProgramDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamTrainingProgram() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        trainingProgram.setId(UUID.randomUUID().toString());

        // Create the TrainingProgram
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toDto(trainingProgram);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrainingProgramMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(trainingProgramDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the TrainingProgram in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteTrainingProgram() throws Exception {
        // Initialize the database
        insertedTrainingProgram = trainingProgramRepository.save(trainingProgram);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the trainingProgram
        restTrainingProgramMockMvc
            .perform(delete(ENTITY_API_URL_ID, trainingProgram.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return trainingProgramRepository.count();
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

    protected TrainingProgram getPersistedTrainingProgram(TrainingProgram trainingProgram) {
        return trainingProgramRepository.findById(trainingProgram.getId()).orElseThrow();
    }

    protected void assertPersistedTrainingProgramToMatchAllProperties(TrainingProgram expectedTrainingProgram) {
        assertTrainingProgramAllPropertiesEquals(expectedTrainingProgram, getPersistedTrainingProgram(expectedTrainingProgram));
    }

    protected void assertPersistedTrainingProgramToMatchUpdatableProperties(TrainingProgram expectedTrainingProgram) {
        assertTrainingProgramAllUpdatablePropertiesEquals(expectedTrainingProgram, getPersistedTrainingProgram(expectedTrainingProgram));
    }
}

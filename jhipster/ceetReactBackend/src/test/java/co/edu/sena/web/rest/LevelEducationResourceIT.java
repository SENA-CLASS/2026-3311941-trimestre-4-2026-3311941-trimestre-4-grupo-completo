package co.edu.sena.web.rest;

import static co.edu.sena.domain.LevelEducationAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.LevelEducation;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.LevelEducationRepository;
import co.edu.sena.service.dto.LevelEducationDTO;
import co.edu.sena.service.mapper.LevelEducationMapper;
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
 * Integration tests for the {@link LevelEducationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LevelEducationResourceIT {

    private static final String DEFAULT_LEVEL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_LEVEL_EDUCATION = State.ACTIVE;
    private static final State UPDATED_STATE_LEVEL_EDUCATION = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/level-educations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LevelEducationRepository levelEducationRepository;

    @Autowired
    private LevelEducationMapper levelEducationMapper;

    @Autowired
    private MockMvc restLevelEducationMockMvc;

    private LevelEducation levelEducation;

    private LevelEducation insertedLevelEducation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LevelEducation createEntity() {
        return new LevelEducation().levelName(DEFAULT_LEVEL_NAME).stateLevelEducation(DEFAULT_STATE_LEVEL_EDUCATION);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LevelEducation createUpdatedEntity() {
        return new LevelEducation().levelName(UPDATED_LEVEL_NAME).stateLevelEducation(UPDATED_STATE_LEVEL_EDUCATION);
    }

    @BeforeEach
    void initTest() {
        levelEducation = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLevelEducation != null) {
            levelEducationRepository.delete(insertedLevelEducation);
            insertedLevelEducation = null;
        }
    }

    @Test
    void createLevelEducation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);
        var returnedLevelEducationDTO = om.readValue(
            restLevelEducationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelEducationDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LevelEducationDTO.class
        );

        // Validate the LevelEducation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLevelEducation = levelEducationMapper.toEntity(returnedLevelEducationDTO);
        assertLevelEducationUpdatableFieldsEquals(returnedLevelEducation, getPersistedLevelEducation(returnedLevelEducation));

        insertedLevelEducation = returnedLevelEducation;
    }

    @Test
    void createLevelEducationWithExistingId() throws Exception {
        // Create the LevelEducation with an existing ID
        levelEducation.setId("existing_id");
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelEducationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelEducationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkLevelNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        levelEducation.setLevelName(null);

        // Create the LevelEducation, which fails.
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        restLevelEducationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelEducationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStateLevelEducationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        levelEducation.setStateLevelEducation(null);

        // Create the LevelEducation, which fails.
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        restLevelEducationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelEducationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLevelEducations() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        // Get all the levelEducationList
        restLevelEducationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelEducation.getId())))
            .andExpect(jsonPath("$.[*].levelName").value(hasItem(DEFAULT_LEVEL_NAME)))
            .andExpect(jsonPath("$.[*].stateLevelEducation").value(hasItem(DEFAULT_STATE_LEVEL_EDUCATION.toString())));
    }

    @Test
    void getLevelEducation() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        // Get the levelEducation
        restLevelEducationMockMvc
            .perform(get(ENTITY_API_URL_ID, levelEducation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(levelEducation.getId()))
            .andExpect(jsonPath("$.levelName").value(DEFAULT_LEVEL_NAME))
            .andExpect(jsonPath("$.stateLevelEducation").value(DEFAULT_STATE_LEVEL_EDUCATION.toString()));
    }

    @Test
    void getNonExistingLevelEducation() throws Exception {
        // Get the levelEducation
        restLevelEducationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLevelEducation() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the levelEducation
        LevelEducation updatedLevelEducation = levelEducationRepository.findById(levelEducation.getId()).orElseThrow();
        updatedLevelEducation.levelName(UPDATED_LEVEL_NAME).stateLevelEducation(UPDATED_STATE_LEVEL_EDUCATION);
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(updatedLevelEducation);

        restLevelEducationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, levelEducationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(levelEducationDTO))
            )
            .andExpect(status().isOk());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLevelEducationToMatchAllProperties(updatedLevelEducation);
    }

    @Test
    void putNonExistingLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, levelEducationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(levelEducationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(levelEducationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(levelEducationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLevelEducationWithPatch() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the levelEducation using partial update
        LevelEducation partialUpdatedLevelEducation = new LevelEducation();
        partialUpdatedLevelEducation.setId(levelEducation.getId());

        partialUpdatedLevelEducation.stateLevelEducation(UPDATED_STATE_LEVEL_EDUCATION);

        restLevelEducationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLevelEducation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLevelEducation))
            )
            .andExpect(status().isOk());

        // Validate the LevelEducation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLevelEducationUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLevelEducation, levelEducation),
            getPersistedLevelEducation(levelEducation)
        );
    }

    @Test
    void fullUpdateLevelEducationWithPatch() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the levelEducation using partial update
        LevelEducation partialUpdatedLevelEducation = new LevelEducation();
        partialUpdatedLevelEducation.setId(levelEducation.getId());

        partialUpdatedLevelEducation.levelName(UPDATED_LEVEL_NAME).stateLevelEducation(UPDATED_STATE_LEVEL_EDUCATION);

        restLevelEducationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLevelEducation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLevelEducation))
            )
            .andExpect(status().isOk());

        // Validate the LevelEducation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLevelEducationUpdatableFieldsEquals(partialUpdatedLevelEducation, getPersistedLevelEducation(partialUpdatedLevelEducation));
    }

    @Test
    void patchNonExistingLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, levelEducationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(levelEducationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(levelEducationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLevelEducation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        levelEducation.setId(UUID.randomUUID().toString());

        // Create the LevelEducation
        LevelEducationDTO levelEducationDTO = levelEducationMapper.toDto(levelEducation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLevelEducationMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(levelEducationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LevelEducation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLevelEducation() throws Exception {
        // Initialize the database
        insertedLevelEducation = levelEducationRepository.save(levelEducation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the levelEducation
        restLevelEducationMockMvc
            .perform(delete(ENTITY_API_URL_ID, levelEducation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return levelEducationRepository.count();
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

    protected LevelEducation getPersistedLevelEducation(LevelEducation levelEducation) {
        return levelEducationRepository.findById(levelEducation.getId()).orElseThrow();
    }

    protected void assertPersistedLevelEducationToMatchAllProperties(LevelEducation expectedLevelEducation) {
        assertLevelEducationAllPropertiesEquals(expectedLevelEducation, getPersistedLevelEducation(expectedLevelEducation));
    }

    protected void assertPersistedLevelEducationToMatchUpdatableProperties(LevelEducation expectedLevelEducation) {
        assertLevelEducationAllUpdatablePropertiesEquals(expectedLevelEducation, getPersistedLevelEducation(expectedLevelEducation));
    }
}

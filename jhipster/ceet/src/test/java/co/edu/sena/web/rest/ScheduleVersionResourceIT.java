package co.edu.sena.web.rest;

import static co.edu.sena.domain.ScheduleVersionAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CurrentQuarter;
import co.edu.sena.domain.ScheduleVersion;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.ScheduleVersionRepository;
import co.edu.sena.service.dto.ScheduleVersionDTO;
import co.edu.sena.service.mapper.ScheduleVersionMapper;
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
 * Integration tests for the {@link ScheduleVersionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ScheduleVersionResourceIT {

    private static final String DEFAULT_VERSION_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_NUMBER = "BBBBBBBBBB";

    private static final State DEFAULT_VERSION_STATE = State.ACTIVE;
    private static final State UPDATED_VERSION_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/schedule-versions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ScheduleVersionRepository scheduleVersionRepository;

    @Autowired
    private ScheduleVersionMapper scheduleVersionMapper;

    @Autowired
    private MockMvc restScheduleVersionMockMvc;

    private ScheduleVersion scheduleVersion;

    private ScheduleVersion insertedScheduleVersion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ScheduleVersion createEntity() {
        ScheduleVersion scheduleVersion = new ScheduleVersion().versionNumber(DEFAULT_VERSION_NUMBER).versionState(DEFAULT_VERSION_STATE);
        // Add required entity
        CurrentQuarter currentQuarter;
        currentQuarter = CurrentQuarterResourceIT.createEntity();
        currentQuarter.setId("fixed-id-for-tests");
        scheduleVersion.setCurrentQuarter(currentQuarter);
        return scheduleVersion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ScheduleVersion createUpdatedEntity() {
        ScheduleVersion updatedScheduleVersion = new ScheduleVersion()
            .versionNumber(UPDATED_VERSION_NUMBER)
            .versionState(UPDATED_VERSION_STATE);
        // Add required entity
        CurrentQuarter currentQuarter;
        currentQuarter = CurrentQuarterResourceIT.createUpdatedEntity();
        currentQuarter.setId("fixed-id-for-tests");
        updatedScheduleVersion.setCurrentQuarter(currentQuarter);
        return updatedScheduleVersion;
    }

    @BeforeEach
    void initTest() {
        scheduleVersion = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedScheduleVersion != null) {
            scheduleVersionRepository.delete(insertedScheduleVersion);
            insertedScheduleVersion = null;
        }
    }

    @Test
    void createScheduleVersion() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);
        var returnedScheduleVersionDTO = om.readValue(
            restScheduleVersionMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(scheduleVersionDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ScheduleVersionDTO.class
        );

        // Validate the ScheduleVersion in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedScheduleVersion = scheduleVersionMapper.toEntity(returnedScheduleVersionDTO);
        assertScheduleVersionUpdatableFieldsEquals(returnedScheduleVersion, getPersistedScheduleVersion(returnedScheduleVersion));

        insertedScheduleVersion = returnedScheduleVersion;
    }

    @Test
    void createScheduleVersionWithExistingId() throws Exception {
        // Create the ScheduleVersion with an existing ID
        scheduleVersion.setId("existing_id");
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restScheduleVersionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(scheduleVersionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkVersionNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        scheduleVersion.setVersionNumber(null);

        // Create the ScheduleVersion, which fails.
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        restScheduleVersionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(scheduleVersionDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkVersionStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        scheduleVersion.setVersionState(null);

        // Create the ScheduleVersion, which fails.
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        restScheduleVersionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(scheduleVersionDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllScheduleVersions() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        // Get all the scheduleVersionList
        restScheduleVersionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scheduleVersion.getId())))
            .andExpect(jsonPath("$.[*].versionNumber").value(hasItem(DEFAULT_VERSION_NUMBER)))
            .andExpect(jsonPath("$.[*].versionState").value(hasItem(DEFAULT_VERSION_STATE.toString())));
    }

    @Test
    void getScheduleVersion() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        // Get the scheduleVersion
        restScheduleVersionMockMvc
            .perform(get(ENTITY_API_URL_ID, scheduleVersion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(scheduleVersion.getId()))
            .andExpect(jsonPath("$.versionNumber").value(DEFAULT_VERSION_NUMBER))
            .andExpect(jsonPath("$.versionState").value(DEFAULT_VERSION_STATE.toString()));
    }

    @Test
    void getNonExistingScheduleVersion() throws Exception {
        // Get the scheduleVersion
        restScheduleVersionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingScheduleVersion() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the scheduleVersion
        ScheduleVersion updatedScheduleVersion = scheduleVersionRepository.findById(scheduleVersion.getId()).orElseThrow();
        updatedScheduleVersion.versionNumber(UPDATED_VERSION_NUMBER).versionState(UPDATED_VERSION_STATE);
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(updatedScheduleVersion);

        restScheduleVersionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, scheduleVersionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(scheduleVersionDTO))
            )
            .andExpect(status().isOk());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedScheduleVersionToMatchAllProperties(updatedScheduleVersion);
    }

    @Test
    void putNonExistingScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, scheduleVersionDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(scheduleVersionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(scheduleVersionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(scheduleVersionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateScheduleVersionWithPatch() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the scheduleVersion using partial update
        ScheduleVersion partialUpdatedScheduleVersion = new ScheduleVersion();
        partialUpdatedScheduleVersion.setId(scheduleVersion.getId());

        partialUpdatedScheduleVersion.versionNumber(UPDATED_VERSION_NUMBER);

        restScheduleVersionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedScheduleVersion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedScheduleVersion))
            )
            .andExpect(status().isOk());

        // Validate the ScheduleVersion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertScheduleVersionUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedScheduleVersion, scheduleVersion),
            getPersistedScheduleVersion(scheduleVersion)
        );
    }

    @Test
    void fullUpdateScheduleVersionWithPatch() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the scheduleVersion using partial update
        ScheduleVersion partialUpdatedScheduleVersion = new ScheduleVersion();
        partialUpdatedScheduleVersion.setId(scheduleVersion.getId());

        partialUpdatedScheduleVersion.versionNumber(UPDATED_VERSION_NUMBER).versionState(UPDATED_VERSION_STATE);

        restScheduleVersionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedScheduleVersion.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedScheduleVersion))
            )
            .andExpect(status().isOk());

        // Validate the ScheduleVersion in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertScheduleVersionUpdatableFieldsEquals(
            partialUpdatedScheduleVersion,
            getPersistedScheduleVersion(partialUpdatedScheduleVersion)
        );
    }

    @Test
    void patchNonExistingScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, scheduleVersionDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(scheduleVersionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(scheduleVersionDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamScheduleVersion() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        scheduleVersion.setId(UUID.randomUUID().toString());

        // Create the ScheduleVersion
        ScheduleVersionDTO scheduleVersionDTO = scheduleVersionMapper.toDto(scheduleVersion);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restScheduleVersionMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(scheduleVersionDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ScheduleVersion in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteScheduleVersion() throws Exception {
        // Initialize the database
        insertedScheduleVersion = scheduleVersionRepository.save(scheduleVersion);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the scheduleVersion
        restScheduleVersionMockMvc
            .perform(delete(ENTITY_API_URL_ID, scheduleVersion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return scheduleVersionRepository.count();
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

    protected ScheduleVersion getPersistedScheduleVersion(ScheduleVersion scheduleVersion) {
        return scheduleVersionRepository.findById(scheduleVersion.getId()).orElseThrow();
    }

    protected void assertPersistedScheduleVersionToMatchAllProperties(ScheduleVersion expectedScheduleVersion) {
        assertScheduleVersionAllPropertiesEquals(expectedScheduleVersion, getPersistedScheduleVersion(expectedScheduleVersion));
    }

    protected void assertPersistedScheduleVersionToMatchUpdatableProperties(ScheduleVersion expectedScheduleVersion) {
        assertScheduleVersionAllUpdatablePropertiesEquals(expectedScheduleVersion, getPersistedScheduleVersion(expectedScheduleVersion));
    }
}

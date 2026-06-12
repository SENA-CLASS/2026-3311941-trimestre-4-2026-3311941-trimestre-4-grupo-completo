package co.edu.sena.web.rest;

import static co.edu.sena.domain.CampusAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Campus;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CampusRepository;
import co.edu.sena.service.dto.CampusDTO;
import co.edu.sena.service.mapper.CampusMapper;
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
 * Integration tests for the {@link CampusResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CampusResourceIT {

    private static final String DEFAULT_CAMPUS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CAMPUS_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CAMPUS_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_CAMPUS_ADDRESS = "BBBBBBBBBB";

    private static final State DEFAULT_CAMPUS_STATE = State.ACTIVE;
    private static final State UPDATED_CAMPUS_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/campuses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private CampusMapper campusMapper;

    @Autowired
    private MockMvc restCampusMockMvc;

    private Campus campus;

    private Campus insertedCampus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Campus createEntity() {
        return new Campus().campusName(DEFAULT_CAMPUS_NAME).campusAddress(DEFAULT_CAMPUS_ADDRESS).campusState(DEFAULT_CAMPUS_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Campus createUpdatedEntity() {
        return new Campus().campusName(UPDATED_CAMPUS_NAME).campusAddress(UPDATED_CAMPUS_ADDRESS).campusState(UPDATED_CAMPUS_STATE);
    }

    @BeforeEach
    void initTest() {
        campus = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCampus != null) {
            campusRepository.delete(insertedCampus);
            insertedCampus = null;
        }
    }

    @Test
    void createCampus() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);
        var returnedCampusDTO = om.readValue(
            restCampusMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CampusDTO.class
        );

        // Validate the Campus in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCampus = campusMapper.toEntity(returnedCampusDTO);
        assertCampusUpdatableFieldsEquals(returnedCampus, getPersistedCampus(returnedCampus));

        insertedCampus = returnedCampus;
    }

    @Test
    void createCampusWithExistingId() throws Exception {
        // Create the Campus with an existing ID
        campus.setId("existing_id");
        CampusDTO campusDTO = campusMapper.toDto(campus);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkCampusNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        campus.setCampusName(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkCampusAddressIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        campus.setCampusAddress(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkCampusStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        campus.setCampusState(null);

        // Create the Campus, which fails.
        CampusDTO campusDTO = campusMapper.toDto(campus);

        restCampusMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCampuses() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        // Get all the campusList
        restCampusMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campus.getId())))
            .andExpect(jsonPath("$.[*].campusName").value(hasItem(DEFAULT_CAMPUS_NAME)))
            .andExpect(jsonPath("$.[*].campusAddress").value(hasItem(DEFAULT_CAMPUS_ADDRESS)))
            .andExpect(jsonPath("$.[*].campusState").value(hasItem(DEFAULT_CAMPUS_STATE.toString())));
    }

    @Test
    void getCampus() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        // Get the campus
        restCampusMockMvc
            .perform(get(ENTITY_API_URL_ID, campus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(campus.getId()))
            .andExpect(jsonPath("$.campusName").value(DEFAULT_CAMPUS_NAME))
            .andExpect(jsonPath("$.campusAddress").value(DEFAULT_CAMPUS_ADDRESS))
            .andExpect(jsonPath("$.campusState").value(DEFAULT_CAMPUS_STATE.toString()));
    }

    @Test
    void getNonExistingCampus() throws Exception {
        // Get the campus
        restCampusMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCampus() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the campus
        Campus updatedCampus = campusRepository.findById(campus.getId()).orElseThrow();
        updatedCampus.campusName(UPDATED_CAMPUS_NAME).campusAddress(UPDATED_CAMPUS_ADDRESS).campusState(UPDATED_CAMPUS_STATE);
        CampusDTO campusDTO = campusMapper.toDto(updatedCampus);

        restCampusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, campusDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO))
            )
            .andExpect(status().isOk());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCampusToMatchAllProperties(updatedCampus);
    }

    @Test
    void putNonExistingCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, campusDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(campusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCampusWithPatch() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the campus using partial update
        Campus partialUpdatedCampus = new Campus();
        partialUpdatedCampus.setId(campus.getId());

        partialUpdatedCampus.campusState(UPDATED_CAMPUS_STATE);

        restCampusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCampus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCampus))
            )
            .andExpect(status().isOk());

        // Validate the Campus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCampusUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedCampus, campus), getPersistedCampus(campus));
    }

    @Test
    void fullUpdateCampusWithPatch() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the campus using partial update
        Campus partialUpdatedCampus = new Campus();
        partialUpdatedCampus.setId(campus.getId());

        partialUpdatedCampus.campusName(UPDATED_CAMPUS_NAME).campusAddress(UPDATED_CAMPUS_ADDRESS).campusState(UPDATED_CAMPUS_STATE);

        restCampusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCampus.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCampus))
            )
            .andExpect(status().isOk());

        // Validate the Campus in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCampusUpdatableFieldsEquals(partialUpdatedCampus, getPersistedCampus(partialUpdatedCampus));
    }

    @Test
    void patchNonExistingCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, campusDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(campusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(campusDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCampus() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        campus.setId(UUID.randomUUID().toString());

        // Create the Campus
        CampusDTO campusDTO = campusMapper.toDto(campus);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCampusMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(campusDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Campus in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCampus() throws Exception {
        // Initialize the database
        insertedCampus = campusRepository.save(campus);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the campus
        restCampusMockMvc
            .perform(delete(ENTITY_API_URL_ID, campus.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return campusRepository.count();
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

    protected Campus getPersistedCampus(Campus campus) {
        return campusRepository.findById(campus.getId()).orElseThrow();
    }

    protected void assertPersistedCampusToMatchAllProperties(Campus expectedCampus) {
        assertCampusAllPropertiesEquals(expectedCampus, getPersistedCampus(expectedCampus));
    }

    protected void assertPersistedCampusToMatchUpdatableProperties(Campus expectedCampus) {
        assertCampusAllUpdatablePropertiesEquals(expectedCampus, getPersistedCampus(expectedCampus));
    }
}

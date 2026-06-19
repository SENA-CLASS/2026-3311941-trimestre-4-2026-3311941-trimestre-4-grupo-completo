package co.edu.sena.web.rest;

import static co.edu.sena.domain.YearAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Year;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.YearRepository;
import co.edu.sena.service.dto.YearDTO;
import co.edu.sena.service.mapper.YearMapper;
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
 * Integration tests for the {@link YearResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class YearResourceIT {

    private static final Integer DEFAULT_YEAR_NUMBER = 1;
    private static final Integer UPDATED_YEAR_NUMBER = 2;

    private static final State DEFAULT_YEAR_STATE = State.ACTIVE;
    private static final State UPDATED_YEAR_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/years";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private YearRepository yearRepository;

    @Autowired
    private YearMapper yearMapper;

    @Autowired
    private MockMvc restYearMockMvc;

    private Year year;

    private Year insertedYear;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Year createEntity() {
        return new Year().yearNumber(DEFAULT_YEAR_NUMBER).yearState(DEFAULT_YEAR_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Year createUpdatedEntity() {
        return new Year().yearNumber(UPDATED_YEAR_NUMBER).yearState(UPDATED_YEAR_STATE);
    }

    @BeforeEach
    void initTest() {
        year = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedYear != null) {
            yearRepository.delete(insertedYear);
            insertedYear = null;
        }
    }

    @Test
    void createYear() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);
        var returnedYearDTO = om.readValue(
            restYearMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            YearDTO.class
        );

        // Validate the Year in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedYear = yearMapper.toEntity(returnedYearDTO);
        assertYearUpdatableFieldsEquals(returnedYear, getPersistedYear(returnedYear));

        insertedYear = returnedYear;
    }

    @Test
    void createYearWithExistingId() throws Exception {
        // Create the Year with an existing ID
        year.setId("existing_id");
        YearDTO yearDTO = yearMapper.toDto(year);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkYearNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        year.setYearNumber(null);

        // Create the Year, which fails.
        YearDTO yearDTO = yearMapper.toDto(year);

        restYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkYearStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        year.setYearState(null);

        // Create the Year, which fails.
        YearDTO yearDTO = yearMapper.toDto(year);

        restYearMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllYears() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        // Get all the yearList
        restYearMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(year.getId())))
            .andExpect(jsonPath("$.[*].yearNumber").value(hasItem(DEFAULT_YEAR_NUMBER)))
            .andExpect(jsonPath("$.[*].yearState").value(hasItem(DEFAULT_YEAR_STATE.toString())));
    }

    @Test
    void getYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        // Get the year
        restYearMockMvc
            .perform(get(ENTITY_API_URL_ID, year.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(year.getId()))
            .andExpect(jsonPath("$.yearNumber").value(DEFAULT_YEAR_NUMBER))
            .andExpect(jsonPath("$.yearState").value(DEFAULT_YEAR_STATE.toString()));
    }

    @Test
    void getNonExistingYear() throws Exception {
        // Get the year
        restYearMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year
        Year updatedYear = yearRepository.findById(year.getId()).orElseThrow();
        updatedYear.yearNumber(UPDATED_YEAR_NUMBER).yearState(UPDATED_YEAR_STATE);
        YearDTO yearDTO = yearMapper.toDto(updatedYear);

        restYearMockMvc
            .perform(put(ENTITY_API_URL_ID, yearDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isOk());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedYearToMatchAllProperties(updatedYear);
    }

    @Test
    void putNonExistingYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(put(ENTITY_API_URL_ID, yearDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(yearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateYearWithPatch() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year using partial update
        Year partialUpdatedYear = new Year();
        partialUpdatedYear.setId(year.getId());

        partialUpdatedYear.yearState(UPDATED_YEAR_STATE);

        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedYear))
            )
            .andExpect(status().isOk());

        // Validate the Year in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertYearUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedYear, year), getPersistedYear(year));
    }

    @Test
    void fullUpdateYearWithPatch() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the year using partial update
        Year partialUpdatedYear = new Year();
        partialUpdatedYear.setId(year.getId());

        partialUpdatedYear.yearNumber(UPDATED_YEAR_NUMBER).yearState(UPDATED_YEAR_STATE);

        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedYear.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedYear))
            )
            .andExpect(status().isOk());

        // Validate the Year in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertYearUpdatableFieldsEquals(partialUpdatedYear, getPersistedYear(partialUpdatedYear));
    }

    @Test
    void patchNonExistingYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, yearDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(yearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(yearDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamYear() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        year.setId(UUID.randomUUID().toString());

        // Create the Year
        YearDTO yearDTO = yearMapper.toDto(year);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restYearMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(yearDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Year in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteYear() throws Exception {
        // Initialize the database
        insertedYear = yearRepository.save(year);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the year
        restYearMockMvc
            .perform(delete(ENTITY_API_URL_ID, year.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return yearRepository.count();
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

    protected Year getPersistedYear(Year year) {
        return yearRepository.findById(year.getId()).orElseThrow();
    }

    protected void assertPersistedYearToMatchAllProperties(Year expectedYear) {
        assertYearAllPropertiesEquals(expectedYear, getPersistedYear(expectedYear));
    }

    protected void assertPersistedYearToMatchUpdatableProperties(Year expectedYear) {
        assertYearAllUpdatablePropertiesEquals(expectedYear, getPersistedYear(expectedYear));
    }
}

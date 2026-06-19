package co.edu.sena.web.rest;

import static co.edu.sena.domain.AreaAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Area;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.AreaRepository;
import co.edu.sena.service.dto.AreaDTO;
import co.edu.sena.service.mapper.AreaMapper;
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
 * Integration tests for the {@link AreaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AreaResourceIT {

    private static final String DEFAULT_AREA_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AREA_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_URL_LOGO = "BBBBBBBBBB";

    private static final State DEFAULT_AREA_STATE = State.ACTIVE;
    private static final State UPDATED_AREA_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/areas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private AreaMapper areaMapper;

    @Autowired
    private MockMvc restAreaMockMvc;

    private Area area;

    private Area insertedArea;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Area createEntity() {
        return new Area().areaName(DEFAULT_AREA_NAME).urlLogo(DEFAULT_URL_LOGO).areaState(DEFAULT_AREA_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Area createUpdatedEntity() {
        return new Area().areaName(UPDATED_AREA_NAME).urlLogo(UPDATED_URL_LOGO).areaState(UPDATED_AREA_STATE);
    }

    @BeforeEach
    void initTest() {
        area = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedArea != null) {
            areaRepository.delete(insertedArea);
            insertedArea = null;
        }
    }

    @Test
    void createArea() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);
        var returnedAreaDTO = om.readValue(
            restAreaMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AreaDTO.class
        );

        // Validate the Area in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedArea = areaMapper.toEntity(returnedAreaDTO);
        assertAreaUpdatableFieldsEquals(returnedArea, getPersistedArea(returnedArea));

        insertedArea = returnedArea;
    }

    @Test
    void createAreaWithExistingId() throws Exception {
        // Create the Area with an existing ID
        area.setId("existing_id");
        AreaDTO areaDTO = areaMapper.toDto(area);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAreaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkAreaNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        area.setAreaName(null);

        // Create the Area, which fails.
        AreaDTO areaDTO = areaMapper.toDto(area);

        restAreaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkAreaStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        area.setAreaState(null);

        // Create the Area, which fails.
        AreaDTO areaDTO = areaMapper.toDto(area);

        restAreaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllAreas() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        // Get all the areaList
        restAreaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(area.getId())))
            .andExpect(jsonPath("$.[*].areaName").value(hasItem(DEFAULT_AREA_NAME)))
            .andExpect(jsonPath("$.[*].urlLogo").value(hasItem(DEFAULT_URL_LOGO)))
            .andExpect(jsonPath("$.[*].areaState").value(hasItem(DEFAULT_AREA_STATE.toString())));
    }

    @Test
    void getArea() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        // Get the area
        restAreaMockMvc
            .perform(get(ENTITY_API_URL_ID, area.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(area.getId()))
            .andExpect(jsonPath("$.areaName").value(DEFAULT_AREA_NAME))
            .andExpect(jsonPath("$.urlLogo").value(DEFAULT_URL_LOGO))
            .andExpect(jsonPath("$.areaState").value(DEFAULT_AREA_STATE.toString()));
    }

    @Test
    void getNonExistingArea() throws Exception {
        // Get the area
        restAreaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingArea() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the area
        Area updatedArea = areaRepository.findById(area.getId()).orElseThrow();
        updatedArea.areaName(UPDATED_AREA_NAME).urlLogo(UPDATED_URL_LOGO).areaState(UPDATED_AREA_STATE);
        AreaDTO areaDTO = areaMapper.toDto(updatedArea);

        restAreaMockMvc
            .perform(put(ENTITY_API_URL_ID, areaDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isOk());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAreaToMatchAllProperties(updatedArea);
    }

    @Test
    void putNonExistingArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(put(ENTITY_API_URL_ID, areaDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(areaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateAreaWithPatch() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the area using partial update
        Area partialUpdatedArea = new Area();
        partialUpdatedArea.setId(area.getId());

        partialUpdatedArea.areaName(UPDATED_AREA_NAME);

        restAreaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArea.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedArea))
            )
            .andExpect(status().isOk());

        // Validate the Area in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAreaUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedArea, area), getPersistedArea(area));
    }

    @Test
    void fullUpdateAreaWithPatch() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the area using partial update
        Area partialUpdatedArea = new Area();
        partialUpdatedArea.setId(area.getId());

        partialUpdatedArea.areaName(UPDATED_AREA_NAME).urlLogo(UPDATED_URL_LOGO).areaState(UPDATED_AREA_STATE);

        restAreaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedArea.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedArea))
            )
            .andExpect(status().isOk());

        // Validate the Area in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAreaUpdatableFieldsEquals(partialUpdatedArea, getPersistedArea(partialUpdatedArea));
    }

    @Test
    void patchNonExistingArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, areaDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(areaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(areaDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamArea() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        area.setId(UUID.randomUUID().toString());

        // Create the Area
        AreaDTO areaDTO = areaMapper.toDto(area);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAreaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(areaDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Area in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteArea() throws Exception {
        // Initialize the database
        insertedArea = areaRepository.save(area);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the area
        restAreaMockMvc
            .perform(delete(ENTITY_API_URL_ID, area.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return areaRepository.count();
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

    protected Area getPersistedArea(Area area) {
        return areaRepository.findById(area.getId()).orElseThrow();
    }

    protected void assertPersistedAreaToMatchAllProperties(Area expectedArea) {
        assertAreaAllPropertiesEquals(expectedArea, getPersistedArea(expectedArea));
    }

    protected void assertPersistedAreaToMatchUpdatableProperties(Area expectedArea) {
        assertAreaAllUpdatablePropertiesEquals(expectedArea, getPersistedArea(expectedArea));
    }
}

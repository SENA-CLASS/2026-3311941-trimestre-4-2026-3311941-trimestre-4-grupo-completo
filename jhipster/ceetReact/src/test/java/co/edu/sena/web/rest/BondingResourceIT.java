package co.edu.sena.web.rest;

import static co.edu.sena.domain.BondingAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Bonding;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.BondingRepository;
import co.edu.sena.service.dto.BondingDTO;
import co.edu.sena.service.mapper.BondingMapper;
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
 * Integration tests for the {@link BondingResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BondingResourceIT {

    private static final String DEFAULT_BONDING_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_BONDING_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_WORKING_HOURS = 1;
    private static final Integer UPDATED_WORKING_HOURS = 2;

    private static final State DEFAULT_BONDING_STATE = State.ACTIVE;
    private static final State UPDATED_BONDING_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/bondings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BondingRepository bondingRepository;

    @Autowired
    private BondingMapper bondingMapper;

    @Autowired
    private MockMvc restBondingMockMvc;

    private Bonding bonding;

    private Bonding insertedBonding;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bonding createEntity() {
        return new Bonding().bondingType(DEFAULT_BONDING_TYPE).workingHours(DEFAULT_WORKING_HOURS).bondingState(DEFAULT_BONDING_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bonding createUpdatedEntity() {
        return new Bonding().bondingType(UPDATED_BONDING_TYPE).workingHours(UPDATED_WORKING_HOURS).bondingState(UPDATED_BONDING_STATE);
    }

    @BeforeEach
    void initTest() {
        bonding = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedBonding != null) {
            bondingRepository.delete(insertedBonding);
            insertedBonding = null;
        }
    }

    @Test
    void createBonding() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);
        var returnedBondingDTO = om.readValue(
            restBondingMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BondingDTO.class
        );

        // Validate the Bonding in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBonding = bondingMapper.toEntity(returnedBondingDTO);
        assertBondingUpdatableFieldsEquals(returnedBonding, getPersistedBonding(returnedBonding));

        insertedBonding = returnedBonding;
    }

    @Test
    void createBondingWithExistingId() throws Exception {
        // Create the Bonding with an existing ID
        bonding.setId("existing_id");
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBondingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkBondingTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bonding.setBondingType(null);

        // Create the Bonding, which fails.
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        restBondingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkWorkingHoursIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bonding.setWorkingHours(null);

        // Create the Bonding, which fails.
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        restBondingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkBondingStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        bonding.setBondingState(null);

        // Create the Bonding, which fails.
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        restBondingMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllBondings() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        // Get all the bondingList
        restBondingMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bonding.getId())))
            .andExpect(jsonPath("$.[*].bondingType").value(hasItem(DEFAULT_BONDING_TYPE)))
            .andExpect(jsonPath("$.[*].workingHours").value(hasItem(DEFAULT_WORKING_HOURS)))
            .andExpect(jsonPath("$.[*].bondingState").value(hasItem(DEFAULT_BONDING_STATE.toString())));
    }

    @Test
    void getBonding() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        // Get the bonding
        restBondingMockMvc
            .perform(get(ENTITY_API_URL_ID, bonding.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bonding.getId()))
            .andExpect(jsonPath("$.bondingType").value(DEFAULT_BONDING_TYPE))
            .andExpect(jsonPath("$.workingHours").value(DEFAULT_WORKING_HOURS))
            .andExpect(jsonPath("$.bondingState").value(DEFAULT_BONDING_STATE.toString()));
    }

    @Test
    void getNonExistingBonding() throws Exception {
        // Get the bonding
        restBondingMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBonding() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bonding
        Bonding updatedBonding = bondingRepository.findById(bonding.getId()).orElseThrow();
        updatedBonding.bondingType(UPDATED_BONDING_TYPE).workingHours(UPDATED_WORKING_HOURS).bondingState(UPDATED_BONDING_STATE);
        BondingDTO bondingDTO = bondingMapper.toDto(updatedBonding);

        restBondingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO))
            )
            .andExpect(status().isOk());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBondingToMatchAllProperties(updatedBonding);
    }

    @Test
    void putNonExistingBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBondingWithPatch() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bonding using partial update
        Bonding partialUpdatedBonding = new Bonding();
        partialUpdatedBonding.setId(bonding.getId());

        restBondingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBonding.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBonding))
            )
            .andExpect(status().isOk());

        // Validate the Bonding in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedBonding, bonding), getPersistedBonding(bonding));
    }

    @Test
    void fullUpdateBondingWithPatch() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bonding using partial update
        Bonding partialUpdatedBonding = new Bonding();
        partialUpdatedBonding.setId(bonding.getId());

        partialUpdatedBonding.bondingType(UPDATED_BONDING_TYPE).workingHours(UPDATED_WORKING_HOURS).bondingState(UPDATED_BONDING_STATE);

        restBondingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBonding.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBonding))
            )
            .andExpect(status().isOk());

        // Validate the Bonding in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingUpdatableFieldsEquals(partialUpdatedBonding, getPersistedBonding(partialUpdatedBonding));
    }

    @Test
    void patchNonExistingBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bondingDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBonding() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bonding.setId(UUID.randomUUID().toString());

        // Create the Bonding
        BondingDTO bondingDTO = bondingMapper.toDto(bonding);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bondingDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Bonding in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBonding() throws Exception {
        // Initialize the database
        insertedBonding = bondingRepository.save(bonding);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bonding
        restBondingMockMvc
            .perform(delete(ENTITY_API_URL_ID, bonding.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bondingRepository.count();
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

    protected Bonding getPersistedBonding(Bonding bonding) {
        return bondingRepository.findById(bonding.getId()).orElseThrow();
    }

    protected void assertPersistedBondingToMatchAllProperties(Bonding expectedBonding) {
        assertBondingAllPropertiesEquals(expectedBonding, getPersistedBonding(expectedBonding));
    }

    protected void assertPersistedBondingToMatchUpdatableProperties(Bonding expectedBonding) {
        assertBondingAllUpdatablePropertiesEquals(expectedBonding, getPersistedBonding(expectedBonding));
    }
}

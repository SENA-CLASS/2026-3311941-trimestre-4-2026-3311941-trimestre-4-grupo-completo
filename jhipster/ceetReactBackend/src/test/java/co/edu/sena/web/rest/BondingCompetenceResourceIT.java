package co.edu.sena.web.rest;

import static co.edu.sena.domain.BondingCompetenceAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.BondingCompetence;
import co.edu.sena.domain.BondingInstructor;
import co.edu.sena.domain.LearningCompetence;
import co.edu.sena.repository.BondingCompetenceRepository;
import co.edu.sena.service.dto.BondingCompetenceDTO;
import co.edu.sena.service.mapper.BondingCompetenceMapper;
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
 * Integration tests for the {@link BondingCompetenceResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BondingCompetenceResourceIT {

    private static final String ENTITY_API_URL = "/api/bonding-competences";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BondingCompetenceRepository bondingCompetenceRepository;

    @Autowired
    private BondingCompetenceMapper bondingCompetenceMapper;

    @Autowired
    private MockMvc restBondingCompetenceMockMvc;

    private BondingCompetence bondingCompetence;

    private BondingCompetence insertedBondingCompetence;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BondingCompetence createEntity() {
        BondingCompetence bondingCompetence = new BondingCompetence();
        // Add required entity
        BondingInstructor bondingInstructor;
        bondingInstructor = BondingInstructorResourceIT.createEntity();
        bondingInstructor.setId("fixed-id-for-tests");
        bondingCompetence.setBondingInstructor(bondingInstructor);
        // Add required entity
        LearningCompetence learningCompetence;
        learningCompetence = LearningCompetenceResourceIT.createEntity();
        learningCompetence.setId("fixed-id-for-tests");
        bondingCompetence.setLearningCompetence(learningCompetence);
        return bondingCompetence;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BondingCompetence createUpdatedEntity() {
        BondingCompetence updatedBondingCompetence = new BondingCompetence();
        // Add required entity
        BondingInstructor bondingInstructor;
        bondingInstructor = BondingInstructorResourceIT.createUpdatedEntity();
        bondingInstructor.setId("fixed-id-for-tests");
        updatedBondingCompetence.setBondingInstructor(bondingInstructor);
        // Add required entity
        LearningCompetence learningCompetence;
        learningCompetence = LearningCompetenceResourceIT.createUpdatedEntity();
        learningCompetence.setId("fixed-id-for-tests");
        updatedBondingCompetence.setLearningCompetence(learningCompetence);
        return updatedBondingCompetence;
    }

    @BeforeEach
    void initTest() {
        bondingCompetence = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedBondingCompetence != null) {
            bondingCompetenceRepository.delete(insertedBondingCompetence);
            insertedBondingCompetence = null;
        }
    }

    @Test
    void createBondingCompetence() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);
        var returnedBondingCompetenceDTO = om.readValue(
            restBondingCompetenceMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingCompetenceDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BondingCompetenceDTO.class
        );

        // Validate the BondingCompetence in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBondingCompetence = bondingCompetenceMapper.toEntity(returnedBondingCompetenceDTO);
        assertBondingCompetenceUpdatableFieldsEquals(returnedBondingCompetence, getPersistedBondingCompetence(returnedBondingCompetence));

        insertedBondingCompetence = returnedBondingCompetence;
    }

    @Test
    void createBondingCompetenceWithExistingId() throws Exception {
        // Create the BondingCompetence with an existing ID
        bondingCompetence.setId("existing_id");
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBondingCompetenceMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingCompetenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllBondingCompetences() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        // Get all the bondingCompetenceList
        restBondingCompetenceMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bondingCompetence.getId())));
    }

    @Test
    void getBondingCompetence() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        // Get the bondingCompetence
        restBondingCompetenceMockMvc
            .perform(get(ENTITY_API_URL_ID, bondingCompetence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bondingCompetence.getId()));
    }

    @Test
    void getNonExistingBondingCompetence() throws Exception {
        // Get the bondingCompetence
        restBondingCompetenceMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingBondingCompetence() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingCompetence
        BondingCompetence updatedBondingCompetence = bondingCompetenceRepository.findById(bondingCompetence.getId()).orElseThrow();
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(updatedBondingCompetence);

        restBondingCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingCompetenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingCompetenceDTO))
            )
            .andExpect(status().isOk());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBondingCompetenceToMatchAllProperties(updatedBondingCompetence);
    }

    @Test
    void putNonExistingBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, bondingCompetenceDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bondingCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bondingCompetenceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateBondingCompetenceWithPatch() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingCompetence using partial update
        BondingCompetence partialUpdatedBondingCompetence = new BondingCompetence();
        partialUpdatedBondingCompetence.setId(bondingCompetence.getId());

        restBondingCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBondingCompetence.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBondingCompetence))
            )
            .andExpect(status().isOk());

        // Validate the BondingCompetence in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingCompetenceUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedBondingCompetence, bondingCompetence),
            getPersistedBondingCompetence(bondingCompetence)
        );
    }

    @Test
    void fullUpdateBondingCompetenceWithPatch() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bondingCompetence using partial update
        BondingCompetence partialUpdatedBondingCompetence = new BondingCompetence();
        partialUpdatedBondingCompetence.setId(bondingCompetence.getId());

        restBondingCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBondingCompetence.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBondingCompetence))
            )
            .andExpect(status().isOk());

        // Validate the BondingCompetence in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBondingCompetenceUpdatableFieldsEquals(
            partialUpdatedBondingCompetence,
            getPersistedBondingCompetence(partialUpdatedBondingCompetence)
        );
    }

    @Test
    void patchNonExistingBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bondingCompetenceDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bondingCompetenceDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamBondingCompetence() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bondingCompetence.setId(UUID.randomUUID().toString());

        // Create the BondingCompetence
        BondingCompetenceDTO bondingCompetenceDTO = bondingCompetenceMapper.toDto(bondingCompetence);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBondingCompetenceMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bondingCompetenceDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the BondingCompetence in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteBondingCompetence() throws Exception {
        // Initialize the database
        insertedBondingCompetence = bondingCompetenceRepository.save(bondingCompetence);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bondingCompetence
        restBondingCompetenceMockMvc
            .perform(delete(ENTITY_API_URL_ID, bondingCompetence.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bondingCompetenceRepository.count();
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

    protected BondingCompetence getPersistedBondingCompetence(BondingCompetence bondingCompetence) {
        return bondingCompetenceRepository.findById(bondingCompetence.getId()).orElseThrow();
    }

    protected void assertPersistedBondingCompetenceToMatchAllProperties(BondingCompetence expectedBondingCompetence) {
        assertBondingCompetenceAllPropertiesEquals(expectedBondingCompetence, getPersistedBondingCompetence(expectedBondingCompetence));
    }

    protected void assertPersistedBondingCompetenceToMatchUpdatableProperties(BondingCompetence expectedBondingCompetence) {
        assertBondingCompetenceAllUpdatablePropertiesEquals(
            expectedBondingCompetence,
            getPersistedBondingCompetence(expectedBondingCompetence)
        );
    }
}

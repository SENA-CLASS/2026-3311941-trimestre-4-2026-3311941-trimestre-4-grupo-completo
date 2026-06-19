package co.edu.sena.web.rest;

import static co.edu.sena.domain.GeneralObservationAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.GeneralObservation;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.repository.GeneralObservationRepository;
import co.edu.sena.service.dto.GeneralObservationDTO;
import co.edu.sena.service.mapper.GeneralObservationMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link GeneralObservationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GeneralObservationResourceIT {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    private static final String DEFAULT_OBSERVATION_GENERAL = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION_GENERAL = "BBBBBBBBBB";

    private static final String DEFAULT_JURY = "AAAAAAAAAA";
    private static final String UPDATED_JURY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_AUDIT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_AUDIT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/general-observations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private GeneralObservationRepository generalObservationRepository;

    @Autowired
    private GeneralObservationMapper generalObservationMapper;

    @Autowired
    private MockMvc restGeneralObservationMockMvc;

    private GeneralObservation generalObservation;

    private GeneralObservation insertedGeneralObservation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeneralObservation createEntity() {
        GeneralObservation generalObservation = new GeneralObservation()
            .number(DEFAULT_NUMBER)
            .observationGeneral(DEFAULT_OBSERVATION_GENERAL)
            .jury(DEFAULT_JURY)
            .dateAudit(DEFAULT_DATE_AUDIT);
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createEntity();
        projectGroup.setId("fixed-id-for-tests");
        generalObservation.setProjectGroup(projectGroup);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        generalObservation.setCustomer(customer);
        return generalObservation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeneralObservation createUpdatedEntity() {
        GeneralObservation updatedGeneralObservation = new GeneralObservation()
            .number(UPDATED_NUMBER)
            .observationGeneral(UPDATED_OBSERVATION_GENERAL)
            .jury(UPDATED_JURY)
            .dateAudit(UPDATED_DATE_AUDIT);
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createUpdatedEntity();
        projectGroup.setId("fixed-id-for-tests");
        updatedGeneralObservation.setProjectGroup(projectGroup);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedGeneralObservation.setCustomer(customer);
        return updatedGeneralObservation;
    }

    @BeforeEach
    void initTest() {
        generalObservation = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedGeneralObservation != null) {
            generalObservationRepository.delete(insertedGeneralObservation);
            insertedGeneralObservation = null;
        }
    }

    @Test
    void createGeneralObservation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);
        var returnedGeneralObservationDTO = om.readValue(
            restGeneralObservationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            GeneralObservationDTO.class
        );

        // Validate the GeneralObservation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedGeneralObservation = generalObservationMapper.toEntity(returnedGeneralObservationDTO);
        assertGeneralObservationUpdatableFieldsEquals(
            returnedGeneralObservation,
            getPersistedGeneralObservation(returnedGeneralObservation)
        );

        insertedGeneralObservation = returnedGeneralObservation;
    }

    @Test
    void createGeneralObservationWithExistingId() throws Exception {
        // Create the GeneralObservation with an existing ID
        generalObservation.setId("existing_id");
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeneralObservationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        generalObservation.setNumber(null);

        // Create the GeneralObservation, which fails.
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        restGeneralObservationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkObservationGeneralIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        generalObservation.setObservationGeneral(null);

        // Create the GeneralObservation, which fails.
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        restGeneralObservationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkJuryIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        generalObservation.setJury(null);

        // Create the GeneralObservation, which fails.
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        restGeneralObservationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDateAuditIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        generalObservation.setDateAudit(null);

        // Create the GeneralObservation, which fails.
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        restGeneralObservationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllGeneralObservations() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        // Get all the generalObservationList
        restGeneralObservationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generalObservation.getId())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)))
            .andExpect(jsonPath("$.[*].observationGeneral").value(hasItem(DEFAULT_OBSERVATION_GENERAL)))
            .andExpect(jsonPath("$.[*].jury").value(hasItem(DEFAULT_JURY)))
            .andExpect(jsonPath("$.[*].dateAudit").value(hasItem(sameInstant(DEFAULT_DATE_AUDIT))));
    }

    @Test
    void getGeneralObservation() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        // Get the generalObservation
        restGeneralObservationMockMvc
            .perform(get(ENTITY_API_URL_ID, generalObservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(generalObservation.getId()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER))
            .andExpect(jsonPath("$.observationGeneral").value(DEFAULT_OBSERVATION_GENERAL))
            .andExpect(jsonPath("$.jury").value(DEFAULT_JURY))
            .andExpect(jsonPath("$.dateAudit").value(sameInstant(DEFAULT_DATE_AUDIT)));
    }

    @Test
    void getNonExistingGeneralObservation() throws Exception {
        // Get the generalObservation
        restGeneralObservationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingGeneralObservation() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the generalObservation
        GeneralObservation updatedGeneralObservation = generalObservationRepository.findById(generalObservation.getId()).orElseThrow();
        updatedGeneralObservation
            .number(UPDATED_NUMBER)
            .observationGeneral(UPDATED_OBSERVATION_GENERAL)
            .jury(UPDATED_JURY)
            .dateAudit(UPDATED_DATE_AUDIT);
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(updatedGeneralObservation);

        restGeneralObservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, generalObservationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(generalObservationDTO))
            )
            .andExpect(status().isOk());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedGeneralObservationToMatchAllProperties(updatedGeneralObservation);
    }

    @Test
    void putNonExistingGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, generalObservationDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(generalObservationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(generalObservationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateGeneralObservationWithPatch() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the generalObservation using partial update
        GeneralObservation partialUpdatedGeneralObservation = new GeneralObservation();
        partialUpdatedGeneralObservation.setId(generalObservation.getId());

        partialUpdatedGeneralObservation.number(UPDATED_NUMBER).observationGeneral(UPDATED_OBSERVATION_GENERAL);

        restGeneralObservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGeneralObservation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGeneralObservation))
            )
            .andExpect(status().isOk());

        // Validate the GeneralObservation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGeneralObservationUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedGeneralObservation, generalObservation),
            getPersistedGeneralObservation(generalObservation)
        );
    }

    @Test
    void fullUpdateGeneralObservationWithPatch() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the generalObservation using partial update
        GeneralObservation partialUpdatedGeneralObservation = new GeneralObservation();
        partialUpdatedGeneralObservation.setId(generalObservation.getId());

        partialUpdatedGeneralObservation
            .number(UPDATED_NUMBER)
            .observationGeneral(UPDATED_OBSERVATION_GENERAL)
            .jury(UPDATED_JURY)
            .dateAudit(UPDATED_DATE_AUDIT);

        restGeneralObservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGeneralObservation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGeneralObservation))
            )
            .andExpect(status().isOk());

        // Validate the GeneralObservation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGeneralObservationUpdatableFieldsEquals(
            partialUpdatedGeneralObservation,
            getPersistedGeneralObservation(partialUpdatedGeneralObservation)
        );
    }

    @Test
    void patchNonExistingGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, generalObservationDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(generalObservationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(generalObservationDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamGeneralObservation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        generalObservation.setId(UUID.randomUUID().toString());

        // Create the GeneralObservation
        GeneralObservationDTO generalObservationDTO = generalObservationMapper.toDto(generalObservation);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGeneralObservationMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(generalObservationDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the GeneralObservation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteGeneralObservation() throws Exception {
        // Initialize the database
        insertedGeneralObservation = generalObservationRepository.save(generalObservation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the generalObservation
        restGeneralObservationMockMvc
            .perform(delete(ENTITY_API_URL_ID, generalObservation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return generalObservationRepository.count();
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

    protected GeneralObservation getPersistedGeneralObservation(GeneralObservation generalObservation) {
        return generalObservationRepository.findById(generalObservation.getId()).orElseThrow();
    }

    protected void assertPersistedGeneralObservationToMatchAllProperties(GeneralObservation expectedGeneralObservation) {
        assertGeneralObservationAllPropertiesEquals(expectedGeneralObservation, getPersistedGeneralObservation(expectedGeneralObservation));
    }

    protected void assertPersistedGeneralObservationToMatchUpdatableProperties(GeneralObservation expectedGeneralObservation) {
        assertGeneralObservationAllUpdatablePropertiesEquals(
            expectedGeneralObservation,
            getPersistedGeneralObservation(expectedGeneralObservation)
        );
    }
}

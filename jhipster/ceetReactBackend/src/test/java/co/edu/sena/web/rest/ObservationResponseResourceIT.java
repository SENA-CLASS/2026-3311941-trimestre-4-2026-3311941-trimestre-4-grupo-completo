package co.edu.sena.web.rest;

import static co.edu.sena.domain.ObservationResponseAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.GroupResponse;
import co.edu.sena.domain.ObservationResponse;
import co.edu.sena.repository.ObservationResponseRepository;
import co.edu.sena.service.dto.ObservationResponseDTO;
import co.edu.sena.service.mapper.ObservationResponseMapper;
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
 * Integration tests for the {@link ObservationResponseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ObservationResponseResourceIT {

    private static final Integer DEFAULT_NUMBER_OBSERVATION = 1;
    private static final Integer UPDATED_NUMBER_OBSERVATION = 2;

    private static final String DEFAULT_OBSEVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSEVATION = "BBBBBBBBBB";

    private static final String DEFAULT_JURIES = "AAAAAAAAAA";
    private static final String UPDATED_JURIES = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_OBSERVATION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_OBSERVATION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/observation-responses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ObservationResponseRepository observationResponseRepository;

    @Autowired
    private ObservationResponseMapper observationResponseMapper;

    @Autowired
    private MockMvc restObservationResponseMockMvc;

    private ObservationResponse observationResponse;

    private ObservationResponse insertedObservationResponse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ObservationResponse createEntity() {
        ObservationResponse observationResponse = new ObservationResponse()
            .numberObservation(DEFAULT_NUMBER_OBSERVATION)
            .obsevation(DEFAULT_OBSEVATION)
            .juries(DEFAULT_JURIES)
            .dateObservation(DEFAULT_DATE_OBSERVATION);
        // Add required entity
        GroupResponse groupResponse;
        groupResponse = GroupResponseResourceIT.createEntity();
        groupResponse.setId("fixed-id-for-tests");
        observationResponse.setGroupResponse(groupResponse);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        observationResponse.setCustomer(customer);
        return observationResponse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ObservationResponse createUpdatedEntity() {
        ObservationResponse updatedObservationResponse = new ObservationResponse()
            .numberObservation(UPDATED_NUMBER_OBSERVATION)
            .obsevation(UPDATED_OBSEVATION)
            .juries(UPDATED_JURIES)
            .dateObservation(UPDATED_DATE_OBSERVATION);
        // Add required entity
        GroupResponse groupResponse;
        groupResponse = GroupResponseResourceIT.createUpdatedEntity();
        groupResponse.setId("fixed-id-for-tests");
        updatedObservationResponse.setGroupResponse(groupResponse);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedObservationResponse.setCustomer(customer);
        return updatedObservationResponse;
    }

    @BeforeEach
    void initTest() {
        observationResponse = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedObservationResponse != null) {
            observationResponseRepository.delete(insertedObservationResponse);
            insertedObservationResponse = null;
        }
    }

    @Test
    void createObservationResponse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);
        var returnedObservationResponseDTO = om.readValue(
            restObservationResponseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ObservationResponseDTO.class
        );

        // Validate the ObservationResponse in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedObservationResponse = observationResponseMapper.toEntity(returnedObservationResponseDTO);
        assertObservationResponseUpdatableFieldsEquals(
            returnedObservationResponse,
            getPersistedObservationResponse(returnedObservationResponse)
        );

        insertedObservationResponse = returnedObservationResponse;
    }

    @Test
    void createObservationResponseWithExistingId() throws Exception {
        // Create the ObservationResponse with an existing ID
        observationResponse.setId("existing_id");
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restObservationResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNumberObservationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        observationResponse.setNumberObservation(null);

        // Create the ObservationResponse, which fails.
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        restObservationResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkObsevationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        observationResponse.setObsevation(null);

        // Create the ObservationResponse, which fails.
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        restObservationResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkJuriesIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        observationResponse.setJuries(null);

        // Create the ObservationResponse, which fails.
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        restObservationResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDateObservationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        observationResponse.setDateObservation(null);

        // Create the ObservationResponse, which fails.
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        restObservationResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllObservationResponses() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        // Get all the observationResponseList
        restObservationResponseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(observationResponse.getId())))
            .andExpect(jsonPath("$.[*].numberObservation").value(hasItem(DEFAULT_NUMBER_OBSERVATION)))
            .andExpect(jsonPath("$.[*].obsevation").value(hasItem(DEFAULT_OBSEVATION)))
            .andExpect(jsonPath("$.[*].juries").value(hasItem(DEFAULT_JURIES)))
            .andExpect(jsonPath("$.[*].dateObservation").value(hasItem(sameInstant(DEFAULT_DATE_OBSERVATION))));
    }

    @Test
    void getObservationResponse() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        // Get the observationResponse
        restObservationResponseMockMvc
            .perform(get(ENTITY_API_URL_ID, observationResponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(observationResponse.getId()))
            .andExpect(jsonPath("$.numberObservation").value(DEFAULT_NUMBER_OBSERVATION))
            .andExpect(jsonPath("$.obsevation").value(DEFAULT_OBSEVATION))
            .andExpect(jsonPath("$.juries").value(DEFAULT_JURIES))
            .andExpect(jsonPath("$.dateObservation").value(sameInstant(DEFAULT_DATE_OBSERVATION)));
    }

    @Test
    void getNonExistingObservationResponse() throws Exception {
        // Get the observationResponse
        restObservationResponseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingObservationResponse() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the observationResponse
        ObservationResponse updatedObservationResponse = observationResponseRepository.findById(observationResponse.getId()).orElseThrow();
        updatedObservationResponse
            .numberObservation(UPDATED_NUMBER_OBSERVATION)
            .obsevation(UPDATED_OBSEVATION)
            .juries(UPDATED_JURIES)
            .dateObservation(UPDATED_DATE_OBSERVATION);
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(updatedObservationResponse);

        restObservationResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, observationResponseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isOk());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedObservationResponseToMatchAllProperties(updatedObservationResponse);
    }

    @Test
    void putNonExistingObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, observationResponseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(observationResponseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateObservationResponseWithPatch() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the observationResponse using partial update
        ObservationResponse partialUpdatedObservationResponse = new ObservationResponse();
        partialUpdatedObservationResponse.setId(observationResponse.getId());

        partialUpdatedObservationResponse
            .numberObservation(UPDATED_NUMBER_OBSERVATION)
            .obsevation(UPDATED_OBSEVATION)
            .juries(UPDATED_JURIES)
            .dateObservation(UPDATED_DATE_OBSERVATION);

        restObservationResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedObservationResponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedObservationResponse))
            )
            .andExpect(status().isOk());

        // Validate the ObservationResponse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertObservationResponseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedObservationResponse, observationResponse),
            getPersistedObservationResponse(observationResponse)
        );
    }

    @Test
    void fullUpdateObservationResponseWithPatch() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the observationResponse using partial update
        ObservationResponse partialUpdatedObservationResponse = new ObservationResponse();
        partialUpdatedObservationResponse.setId(observationResponse.getId());

        partialUpdatedObservationResponse
            .numberObservation(UPDATED_NUMBER_OBSERVATION)
            .obsevation(UPDATED_OBSEVATION)
            .juries(UPDATED_JURIES)
            .dateObservation(UPDATED_DATE_OBSERVATION);

        restObservationResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedObservationResponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedObservationResponse))
            )
            .andExpect(status().isOk());

        // Validate the ObservationResponse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertObservationResponseUpdatableFieldsEquals(
            partialUpdatedObservationResponse,
            getPersistedObservationResponse(partialUpdatedObservationResponse)
        );
    }

    @Test
    void patchNonExistingObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, observationResponseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamObservationResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        observationResponse.setId(UUID.randomUUID().toString());

        // Create the ObservationResponse
        ObservationResponseDTO observationResponseDTO = observationResponseMapper.toDto(observationResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObservationResponseMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(observationResponseDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ObservationResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteObservationResponse() throws Exception {
        // Initialize the database
        insertedObservationResponse = observationResponseRepository.save(observationResponse);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the observationResponse
        restObservationResponseMockMvc
            .perform(delete(ENTITY_API_URL_ID, observationResponse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return observationResponseRepository.count();
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

    protected ObservationResponse getPersistedObservationResponse(ObservationResponse observationResponse) {
        return observationResponseRepository.findById(observationResponse.getId()).orElseThrow();
    }

    protected void assertPersistedObservationResponseToMatchAllProperties(ObservationResponse expectedObservationResponse) {
        assertObservationResponseAllPropertiesEquals(
            expectedObservationResponse,
            getPersistedObservationResponse(expectedObservationResponse)
        );
    }

    protected void assertPersistedObservationResponseToMatchUpdatableProperties(ObservationResponse expectedObservationResponse) {
        assertObservationResponseAllUpdatablePropertiesEquals(
            expectedObservationResponse,
            getPersistedObservationResponse(expectedObservationResponse)
        );
    }
}

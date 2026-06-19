package co.edu.sena.web.rest;

import static co.edu.sena.domain.LogErrorAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.LogError;
import co.edu.sena.repository.LogErrorRepository;
import co.edu.sena.service.dto.LogErrorDTO;
import co.edu.sena.service.mapper.LogErrorMapper;
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
 * Integration tests for the {@link LogErrorResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LogErrorResourceIT {

    private static final String DEFAULT_LEVEL_ERROR = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_ERROR = "BBBBBBBBBB";

    private static final String DEFAULT_LOG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE_ERROR = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE_ERROR = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_ERROR = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_ERROR = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/log-errors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LogErrorRepository logErrorRepository;

    @Autowired
    private LogErrorMapper logErrorMapper;

    @Autowired
    private MockMvc restLogErrorMockMvc;

    private LogError logError;

    private LogError insertedLogError;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogError createEntity() {
        LogError logError = new LogError()
            .levelError(DEFAULT_LEVEL_ERROR)
            .logName(DEFAULT_LOG_NAME)
            .messageError(DEFAULT_MESSAGE_ERROR)
            .dateError(DEFAULT_DATE_ERROR);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        logError.setCustomer(customer);
        return logError;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogError createUpdatedEntity() {
        LogError updatedLogError = new LogError()
            .levelError(UPDATED_LEVEL_ERROR)
            .logName(UPDATED_LOG_NAME)
            .messageError(UPDATED_MESSAGE_ERROR)
            .dateError(UPDATED_DATE_ERROR);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedLogError.setCustomer(customer);
        return updatedLogError;
    }

    @BeforeEach
    void initTest() {
        logError = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLogError != null) {
            logErrorRepository.delete(insertedLogError);
            insertedLogError = null;
        }
    }

    @Test
    void createLogError() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);
        var returnedLogErrorDTO = om.readValue(
            restLogErrorMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LogErrorDTO.class
        );

        // Validate the LogError in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLogError = logErrorMapper.toEntity(returnedLogErrorDTO);
        assertLogErrorUpdatableFieldsEquals(returnedLogError, getPersistedLogError(returnedLogError));

        insertedLogError = returnedLogError;
    }

    @Test
    void createLogErrorWithExistingId() throws Exception {
        // Create the LogError with an existing ID
        logError.setId("existing_id");
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogErrorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkLevelErrorIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logError.setLevelError(null);

        // Create the LogError, which fails.
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        restLogErrorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkLogNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logError.setLogName(null);

        // Create the LogError, which fails.
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        restLogErrorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkMessageErrorIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logError.setMessageError(null);

        // Create the LogError, which fails.
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        restLogErrorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDateErrorIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logError.setDateError(null);

        // Create the LogError, which fails.
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        restLogErrorMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLogErrors() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        // Get all the logErrorList
        restLogErrorMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logError.getId())))
            .andExpect(jsonPath("$.[*].levelError").value(hasItem(DEFAULT_LEVEL_ERROR)))
            .andExpect(jsonPath("$.[*].logName").value(hasItem(DEFAULT_LOG_NAME)))
            .andExpect(jsonPath("$.[*].messageError").value(hasItem(DEFAULT_MESSAGE_ERROR)))
            .andExpect(jsonPath("$.[*].dateError").value(hasItem(sameInstant(DEFAULT_DATE_ERROR))));
    }

    @Test
    void getLogError() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        // Get the logError
        restLogErrorMockMvc
            .perform(get(ENTITY_API_URL_ID, logError.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(logError.getId()))
            .andExpect(jsonPath("$.levelError").value(DEFAULT_LEVEL_ERROR))
            .andExpect(jsonPath("$.logName").value(DEFAULT_LOG_NAME))
            .andExpect(jsonPath("$.messageError").value(DEFAULT_MESSAGE_ERROR))
            .andExpect(jsonPath("$.dateError").value(sameInstant(DEFAULT_DATE_ERROR)));
    }

    @Test
    void getNonExistingLogError() throws Exception {
        // Get the logError
        restLogErrorMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLogError() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logError
        LogError updatedLogError = logErrorRepository.findById(logError.getId()).orElseThrow();
        updatedLogError
            .levelError(UPDATED_LEVEL_ERROR)
            .logName(UPDATED_LOG_NAME)
            .messageError(UPDATED_MESSAGE_ERROR)
            .dateError(UPDATED_DATE_ERROR);
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(updatedLogError);

        restLogErrorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, logErrorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logErrorDTO))
            )
            .andExpect(status().isOk());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLogErrorToMatchAllProperties(updatedLogError);
    }

    @Test
    void putNonExistingLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, logErrorDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logErrorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logErrorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLogErrorWithPatch() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logError using partial update
        LogError partialUpdatedLogError = new LogError();
        partialUpdatedLogError.setId(logError.getId());

        partialUpdatedLogError.logName(UPDATED_LOG_NAME).dateError(UPDATED_DATE_ERROR);

        restLogErrorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogError.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLogError))
            )
            .andExpect(status().isOk());

        // Validate the LogError in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLogErrorUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedLogError, logError), getPersistedLogError(logError));
    }

    @Test
    void fullUpdateLogErrorWithPatch() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logError using partial update
        LogError partialUpdatedLogError = new LogError();
        partialUpdatedLogError.setId(logError.getId());

        partialUpdatedLogError
            .levelError(UPDATED_LEVEL_ERROR)
            .logName(UPDATED_LOG_NAME)
            .messageError(UPDATED_MESSAGE_ERROR)
            .dateError(UPDATED_DATE_ERROR);

        restLogErrorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogError.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLogError))
            )
            .andExpect(status().isOk());

        // Validate the LogError in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLogErrorUpdatableFieldsEquals(partialUpdatedLogError, getPersistedLogError(partialUpdatedLogError));
    }

    @Test
    void patchNonExistingLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, logErrorDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(logErrorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(logErrorDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLogError() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logError.setId(UUID.randomUUID().toString());

        // Create the LogError
        LogErrorDTO logErrorDTO = logErrorMapper.toDto(logError);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogErrorMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(logErrorDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogError in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLogError() throws Exception {
        // Initialize the database
        insertedLogError = logErrorRepository.save(logError);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the logError
        restLogErrorMockMvc
            .perform(delete(ENTITY_API_URL_ID, logError.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return logErrorRepository.count();
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

    protected LogError getPersistedLogError(LogError logError) {
        return logErrorRepository.findById(logError.getId()).orElseThrow();
    }

    protected void assertPersistedLogErrorToMatchAllProperties(LogError expectedLogError) {
        assertLogErrorAllPropertiesEquals(expectedLogError, getPersistedLogError(expectedLogError));
    }

    protected void assertPersistedLogErrorToMatchUpdatableProperties(LogError expectedLogError) {
        assertLogErrorAllUpdatablePropertiesEquals(expectedLogError, getPersistedLogError(expectedLogError));
    }
}

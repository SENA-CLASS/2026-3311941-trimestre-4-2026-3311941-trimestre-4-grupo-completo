package co.edu.sena.web.rest;

import static co.edu.sena.domain.LogAuditAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.LogAudit;
import co.edu.sena.repository.LogAuditRepository;
import co.edu.sena.service.dto.LogAuditDTO;
import co.edu.sena.service.mapper.LogAuditMapper;
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
 * Integration tests for the {@link LogAuditResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LogAuditResourceIT {

    private static final String DEFAULT_LEVEL_AUDIT = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_AUDIT = "BBBBBBBBBB";

    private static final String DEFAULT_LOG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE_AUDIT = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE_AUDIT = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_AUDIT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_AUDIT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/log-audits";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LogAuditRepository logAuditRepository;

    @Autowired
    private LogAuditMapper logAuditMapper;

    @Autowired
    private MockMvc restLogAuditMockMvc;

    private LogAudit logAudit;

    private LogAudit insertedLogAudit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogAudit createEntity() {
        LogAudit logAudit = new LogAudit()
            .levelAudit(DEFAULT_LEVEL_AUDIT)
            .logName(DEFAULT_LOG_NAME)
            .messageAudit(DEFAULT_MESSAGE_AUDIT)
            .dateAudit(DEFAULT_DATE_AUDIT);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        logAudit.setCustomer(customer);
        return logAudit;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LogAudit createUpdatedEntity() {
        LogAudit updatedLogAudit = new LogAudit()
            .levelAudit(UPDATED_LEVEL_AUDIT)
            .logName(UPDATED_LOG_NAME)
            .messageAudit(UPDATED_MESSAGE_AUDIT)
            .dateAudit(UPDATED_DATE_AUDIT);
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedLogAudit.setCustomer(customer);
        return updatedLogAudit;
    }

    @BeforeEach
    void initTest() {
        logAudit = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedLogAudit != null) {
            logAuditRepository.delete(insertedLogAudit);
            insertedLogAudit = null;
        }
    }

    @Test
    void createLogAudit() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);
        var returnedLogAuditDTO = om.readValue(
            restLogAuditMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LogAuditDTO.class
        );

        // Validate the LogAudit in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLogAudit = logAuditMapper.toEntity(returnedLogAuditDTO);
        assertLogAuditUpdatableFieldsEquals(returnedLogAudit, getPersistedLogAudit(returnedLogAudit));

        insertedLogAudit = returnedLogAudit;
    }

    @Test
    void createLogAuditWithExistingId() throws Exception {
        // Create the LogAudit with an existing ID
        logAudit.setId("existing_id");
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogAuditMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkLevelAuditIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logAudit.setLevelAudit(null);

        // Create the LogAudit, which fails.
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        restLogAuditMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkLogNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logAudit.setLogName(null);

        // Create the LogAudit, which fails.
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        restLogAuditMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkMessageAuditIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logAudit.setMessageAudit(null);

        // Create the LogAudit, which fails.
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        restLogAuditMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDateAuditIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        logAudit.setDateAudit(null);

        // Create the LogAudit, which fails.
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        restLogAuditMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllLogAudits() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        // Get all the logAuditList
        restLogAuditMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logAudit.getId())))
            .andExpect(jsonPath("$.[*].levelAudit").value(hasItem(DEFAULT_LEVEL_AUDIT)))
            .andExpect(jsonPath("$.[*].logName").value(hasItem(DEFAULT_LOG_NAME)))
            .andExpect(jsonPath("$.[*].messageAudit").value(hasItem(DEFAULT_MESSAGE_AUDIT)))
            .andExpect(jsonPath("$.[*].dateAudit").value(hasItem(sameInstant(DEFAULT_DATE_AUDIT))));
    }

    @Test
    void getLogAudit() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        // Get the logAudit
        restLogAuditMockMvc
            .perform(get(ENTITY_API_URL_ID, logAudit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(logAudit.getId()))
            .andExpect(jsonPath("$.levelAudit").value(DEFAULT_LEVEL_AUDIT))
            .andExpect(jsonPath("$.logName").value(DEFAULT_LOG_NAME))
            .andExpect(jsonPath("$.messageAudit").value(DEFAULT_MESSAGE_AUDIT))
            .andExpect(jsonPath("$.dateAudit").value(sameInstant(DEFAULT_DATE_AUDIT)));
    }

    @Test
    void getNonExistingLogAudit() throws Exception {
        // Get the logAudit
        restLogAuditMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingLogAudit() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logAudit
        LogAudit updatedLogAudit = logAuditRepository.findById(logAudit.getId()).orElseThrow();
        updatedLogAudit
            .levelAudit(UPDATED_LEVEL_AUDIT)
            .logName(UPDATED_LOG_NAME)
            .messageAudit(UPDATED_MESSAGE_AUDIT)
            .dateAudit(UPDATED_DATE_AUDIT);
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(updatedLogAudit);

        restLogAuditMockMvc
            .perform(
                put(ENTITY_API_URL_ID, logAuditDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logAuditDTO))
            )
            .andExpect(status().isOk());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLogAuditToMatchAllProperties(updatedLogAudit);
    }

    @Test
    void putNonExistingLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(
                put(ENTITY_API_URL_ID, logAuditDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logAuditDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(logAuditDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateLogAuditWithPatch() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logAudit using partial update
        LogAudit partialUpdatedLogAudit = new LogAudit();
        partialUpdatedLogAudit.setId(logAudit.getId());

        partialUpdatedLogAudit.levelAudit(UPDATED_LEVEL_AUDIT).logName(UPDATED_LOG_NAME).messageAudit(UPDATED_MESSAGE_AUDIT);

        restLogAuditMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogAudit.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLogAudit))
            )
            .andExpect(status().isOk());

        // Validate the LogAudit in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLogAuditUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedLogAudit, logAudit), getPersistedLogAudit(logAudit));
    }

    @Test
    void fullUpdateLogAuditWithPatch() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the logAudit using partial update
        LogAudit partialUpdatedLogAudit = new LogAudit();
        partialUpdatedLogAudit.setId(logAudit.getId());

        partialUpdatedLogAudit
            .levelAudit(UPDATED_LEVEL_AUDIT)
            .logName(UPDATED_LOG_NAME)
            .messageAudit(UPDATED_MESSAGE_AUDIT)
            .dateAudit(UPDATED_DATE_AUDIT);

        restLogAuditMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLogAudit.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLogAudit))
            )
            .andExpect(status().isOk());

        // Validate the LogAudit in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLogAuditUpdatableFieldsEquals(partialUpdatedLogAudit, getPersistedLogAudit(partialUpdatedLogAudit));
    }

    @Test
    void patchNonExistingLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, logAuditDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(logAuditDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(logAuditDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamLogAudit() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        logAudit.setId(UUID.randomUUID().toString());

        // Create the LogAudit
        LogAuditDTO logAuditDTO = logAuditMapper.toDto(logAudit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLogAuditMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(logAuditDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LogAudit in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteLogAudit() throws Exception {
        // Initialize the database
        insertedLogAudit = logAuditRepository.save(logAudit);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the logAudit
        restLogAuditMockMvc
            .perform(delete(ENTITY_API_URL_ID, logAudit.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return logAuditRepository.count();
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

    protected LogAudit getPersistedLogAudit(LogAudit logAudit) {
        return logAuditRepository.findById(logAudit.getId()).orElseThrow();
    }

    protected void assertPersistedLogAuditToMatchAllProperties(LogAudit expectedLogAudit) {
        assertLogAuditAllPropertiesEquals(expectedLogAudit, getPersistedLogAudit(expectedLogAudit));
    }

    protected void assertPersistedLogAuditToMatchUpdatableProperties(LogAudit expectedLogAudit) {
        assertLogAuditAllUpdatablePropertiesEquals(expectedLogAudit, getPersistedLogAudit(expectedLogAudit));
    }
}

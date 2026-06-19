package co.edu.sena.web.rest;

import static co.edu.sena.domain.CurrentQuarterAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CurrentQuarter;
import co.edu.sena.domain.Year;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.CurrentQuarterRepository;
import co.edu.sena.service.CurrentQuarterService;
import co.edu.sena.service.dto.CurrentQuarterDTO;
import co.edu.sena.service.mapper.CurrentQuarterMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for the {@link CurrentQuarterResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CurrentQuarterResourceIT {

    private static final Integer DEFAULT_SCHEDULED_QUARTER = 1;
    private static final Integer UPDATED_SCHEDULED_QUARTER = 2;

    private static final LocalDate DEFAULT_START_QUARTER = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_QUARTER = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_QUARTER = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_QUARTER = LocalDate.now(ZoneId.systemDefault());

    private static final State DEFAULT_CURRENT_QUARTER_STATE = State.ACTIVE;
    private static final State UPDATED_CURRENT_QUARTER_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/current-quarters";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private CurrentQuarterRepository currentQuarterRepository;

    @Mock
    private CurrentQuarterRepository currentQuarterRepositoryMock;

    @Autowired
    private CurrentQuarterMapper currentQuarterMapper;

    @Mock
    private CurrentQuarterService currentQuarterServiceMock;

    @Autowired
    private MockMvc restCurrentQuarterMockMvc;

    private CurrentQuarter currentQuarter;

    private CurrentQuarter insertedCurrentQuarter;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CurrentQuarter createEntity() {
        CurrentQuarter currentQuarter = new CurrentQuarter()
            .scheduledQuarter(DEFAULT_SCHEDULED_QUARTER)
            .startQuarter(DEFAULT_START_QUARTER)
            .endQuarter(DEFAULT_END_QUARTER)
            .currentQuarterState(DEFAULT_CURRENT_QUARTER_STATE);
        // Add required entity
        Year year;
        year = YearResourceIT.createEntity();
        year.setId("fixed-id-for-tests");
        currentQuarter.setYear(year);
        return currentQuarter;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CurrentQuarter createUpdatedEntity() {
        CurrentQuarter updatedCurrentQuarter = new CurrentQuarter()
            .scheduledQuarter(UPDATED_SCHEDULED_QUARTER)
            .startQuarter(UPDATED_START_QUARTER)
            .endQuarter(UPDATED_END_QUARTER)
            .currentQuarterState(UPDATED_CURRENT_QUARTER_STATE);
        // Add required entity
        Year year;
        year = YearResourceIT.createUpdatedEntity();
        year.setId("fixed-id-for-tests");
        updatedCurrentQuarter.setYear(year);
        return updatedCurrentQuarter;
    }

    @BeforeEach
    void initTest() {
        currentQuarter = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedCurrentQuarter != null) {
            currentQuarterRepository.delete(insertedCurrentQuarter);
            insertedCurrentQuarter = null;
        }
    }

    @Test
    void createCurrentQuarter() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);
        var returnedCurrentQuarterDTO = om.readValue(
            restCurrentQuarterMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            CurrentQuarterDTO.class
        );

        // Validate the CurrentQuarter in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedCurrentQuarter = currentQuarterMapper.toEntity(returnedCurrentQuarterDTO);
        assertCurrentQuarterUpdatableFieldsEquals(returnedCurrentQuarter, getPersistedCurrentQuarter(returnedCurrentQuarter));

        insertedCurrentQuarter = returnedCurrentQuarter;
    }

    @Test
    void createCurrentQuarterWithExistingId() throws Exception {
        // Create the CurrentQuarter with an existing ID
        currentQuarter.setId("existing_id");
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCurrentQuarterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkScheduledQuarterIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        currentQuarter.setScheduledQuarter(null);

        // Create the CurrentQuarter, which fails.
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        restCurrentQuarterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStartQuarterIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        currentQuarter.setStartQuarter(null);

        // Create the CurrentQuarter, which fails.
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        restCurrentQuarterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEndQuarterIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        currentQuarter.setEndQuarter(null);

        // Create the CurrentQuarter, which fails.
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        restCurrentQuarterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkCurrentQuarterStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        currentQuarter.setCurrentQuarterState(null);

        // Create the CurrentQuarter, which fails.
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        restCurrentQuarterMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllCurrentQuarters() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        // Get all the currentQuarterList
        restCurrentQuarterMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currentQuarter.getId())))
            .andExpect(jsonPath("$.[*].scheduledQuarter").value(hasItem(DEFAULT_SCHEDULED_QUARTER)))
            .andExpect(jsonPath("$.[*].startQuarter").value(hasItem(DEFAULT_START_QUARTER.toString())))
            .andExpect(jsonPath("$.[*].endQuarter").value(hasItem(DEFAULT_END_QUARTER.toString())))
            .andExpect(jsonPath("$.[*].currentQuarterState").value(hasItem(DEFAULT_CURRENT_QUARTER_STATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCurrentQuartersWithEagerRelationshipsIsEnabled() throws Exception {
        when(currentQuarterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCurrentQuarterMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(currentQuarterServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCurrentQuartersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(currentQuarterServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCurrentQuarterMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(currentQuarterRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getCurrentQuarter() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        // Get the currentQuarter
        restCurrentQuarterMockMvc
            .perform(get(ENTITY_API_URL_ID, currentQuarter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(currentQuarter.getId()))
            .andExpect(jsonPath("$.scheduledQuarter").value(DEFAULT_SCHEDULED_QUARTER))
            .andExpect(jsonPath("$.startQuarter").value(DEFAULT_START_QUARTER.toString()))
            .andExpect(jsonPath("$.endQuarter").value(DEFAULT_END_QUARTER.toString()))
            .andExpect(jsonPath("$.currentQuarterState").value(DEFAULT_CURRENT_QUARTER_STATE.toString()));
    }

    @Test
    void getNonExistingCurrentQuarter() throws Exception {
        // Get the currentQuarter
        restCurrentQuarterMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingCurrentQuarter() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the currentQuarter
        CurrentQuarter updatedCurrentQuarter = currentQuarterRepository.findById(currentQuarter.getId()).orElseThrow();
        updatedCurrentQuarter
            .scheduledQuarter(UPDATED_SCHEDULED_QUARTER)
            .startQuarter(UPDATED_START_QUARTER)
            .endQuarter(UPDATED_END_QUARTER)
            .currentQuarterState(UPDATED_CURRENT_QUARTER_STATE);
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(updatedCurrentQuarter);

        restCurrentQuarterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, currentQuarterDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(currentQuarterDTO))
            )
            .andExpect(status().isOk());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedCurrentQuarterToMatchAllProperties(updatedCurrentQuarter);
    }

    @Test
    void putNonExistingCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, currentQuarterDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(currentQuarterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(currentQuarterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCurrentQuarterWithPatch() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the currentQuarter using partial update
        CurrentQuarter partialUpdatedCurrentQuarter = new CurrentQuarter();
        partialUpdatedCurrentQuarter.setId(currentQuarter.getId());

        partialUpdatedCurrentQuarter.scheduledQuarter(UPDATED_SCHEDULED_QUARTER).endQuarter(UPDATED_END_QUARTER);

        restCurrentQuarterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCurrentQuarter.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCurrentQuarter))
            )
            .andExpect(status().isOk());

        // Validate the CurrentQuarter in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCurrentQuarterUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedCurrentQuarter, currentQuarter),
            getPersistedCurrentQuarter(currentQuarter)
        );
    }

    @Test
    void fullUpdateCurrentQuarterWithPatch() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the currentQuarter using partial update
        CurrentQuarter partialUpdatedCurrentQuarter = new CurrentQuarter();
        partialUpdatedCurrentQuarter.setId(currentQuarter.getId());

        partialUpdatedCurrentQuarter
            .scheduledQuarter(UPDATED_SCHEDULED_QUARTER)
            .startQuarter(UPDATED_START_QUARTER)
            .endQuarter(UPDATED_END_QUARTER)
            .currentQuarterState(UPDATED_CURRENT_QUARTER_STATE);

        restCurrentQuarterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCurrentQuarter.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedCurrentQuarter))
            )
            .andExpect(status().isOk());

        // Validate the CurrentQuarter in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertCurrentQuarterUpdatableFieldsEquals(partialUpdatedCurrentQuarter, getPersistedCurrentQuarter(partialUpdatedCurrentQuarter));
    }

    @Test
    void patchNonExistingCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, currentQuarterDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(currentQuarterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(currentQuarterDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCurrentQuarter() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        currentQuarter.setId(UUID.randomUUID().toString());

        // Create the CurrentQuarter
        CurrentQuarterDTO currentQuarterDTO = currentQuarterMapper.toDto(currentQuarter);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCurrentQuarterMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(currentQuarterDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the CurrentQuarter in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCurrentQuarter() throws Exception {
        // Initialize the database
        insertedCurrentQuarter = currentQuarterRepository.save(currentQuarter);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the currentQuarter
        restCurrentQuarterMockMvc
            .perform(delete(ENTITY_API_URL_ID, currentQuarter.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return currentQuarterRepository.count();
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

    protected CurrentQuarter getPersistedCurrentQuarter(CurrentQuarter currentQuarter) {
        return currentQuarterRepository.findById(currentQuarter.getId()).orElseThrow();
    }

    protected void assertPersistedCurrentQuarterToMatchAllProperties(CurrentQuarter expectedCurrentQuarter) {
        assertCurrentQuarterAllPropertiesEquals(expectedCurrentQuarter, getPersistedCurrentQuarter(expectedCurrentQuarter));
    }

    protected void assertPersistedCurrentQuarterToMatchUpdatableProperties(CurrentQuarter expectedCurrentQuarter) {
        assertCurrentQuarterAllUpdatablePropertiesEquals(expectedCurrentQuarter, getPersistedCurrentQuarter(expectedCurrentQuarter));
    }
}

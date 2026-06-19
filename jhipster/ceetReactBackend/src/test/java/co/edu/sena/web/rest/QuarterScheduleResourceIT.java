package co.edu.sena.web.rest;

import static co.edu.sena.domain.QuarterScheduleAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.QuarterSchedule;
import co.edu.sena.domain.Trimester;
import co.edu.sena.repository.QuarterScheduleRepository;
import co.edu.sena.service.QuarterScheduleService;
import co.edu.sena.service.dto.QuarterScheduleDTO;
import co.edu.sena.service.mapper.QuarterScheduleMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * Integration tests for the {@link QuarterScheduleResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class QuarterScheduleResourceIT {

    private static final String ENTITY_API_URL = "/api/quarter-schedules";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private QuarterScheduleRepository quarterScheduleRepository;

    @Mock
    private QuarterScheduleRepository quarterScheduleRepositoryMock;

    @Autowired
    private QuarterScheduleMapper quarterScheduleMapper;

    @Mock
    private QuarterScheduleService quarterScheduleServiceMock;

    @Autowired
    private MockMvc restQuarterScheduleMockMvc;

    private QuarterSchedule quarterSchedule;

    private QuarterSchedule insertedQuarterSchedule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuarterSchedule createEntity() {
        QuarterSchedule quarterSchedule = new QuarterSchedule();
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createEntity();
        learningResult.setId("fixed-id-for-tests");
        quarterSchedule.setLearningResult(learningResult);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createEntity();
        planning.setId("fixed-id-for-tests");
        quarterSchedule.setPlanning(planning);
        // Add required entity
        Trimester trimester;
        trimester = TrimesterResourceIT.createEntity();
        trimester.setId("fixed-id-for-tests");
        quarterSchedule.setTrimester(trimester);
        return quarterSchedule;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuarterSchedule createUpdatedEntity() {
        QuarterSchedule updatedQuarterSchedule = new QuarterSchedule();
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createUpdatedEntity();
        learningResult.setId("fixed-id-for-tests");
        updatedQuarterSchedule.setLearningResult(learningResult);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createUpdatedEntity();
        planning.setId("fixed-id-for-tests");
        updatedQuarterSchedule.setPlanning(planning);
        // Add required entity
        Trimester trimester;
        trimester = TrimesterResourceIT.createUpdatedEntity();
        trimester.setId("fixed-id-for-tests");
        updatedQuarterSchedule.setTrimester(trimester);
        return updatedQuarterSchedule;
    }

    @BeforeEach
    void initTest() {
        quarterSchedule = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedQuarterSchedule != null) {
            quarterScheduleRepository.delete(insertedQuarterSchedule);
            insertedQuarterSchedule = null;
        }
    }

    @Test
    void createQuarterSchedule() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);
        var returnedQuarterScheduleDTO = om.readValue(
            restQuarterScheduleMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quarterScheduleDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            QuarterScheduleDTO.class
        );

        // Validate the QuarterSchedule in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedQuarterSchedule = quarterScheduleMapper.toEntity(returnedQuarterScheduleDTO);
        assertQuarterScheduleUpdatableFieldsEquals(returnedQuarterSchedule, getPersistedQuarterSchedule(returnedQuarterSchedule));

        insertedQuarterSchedule = returnedQuarterSchedule;
    }

    @Test
    void createQuarterScheduleWithExistingId() throws Exception {
        // Create the QuarterSchedule with an existing ID
        quarterSchedule.setId("existing_id");
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuarterScheduleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quarterScheduleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllQuarterSchedules() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        // Get all the quarterScheduleList
        restQuarterScheduleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quarterSchedule.getId())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuarterSchedulesWithEagerRelationshipsIsEnabled() throws Exception {
        when(quarterScheduleServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuarterScheduleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(quarterScheduleServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllQuarterSchedulesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(quarterScheduleServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restQuarterScheduleMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(quarterScheduleRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getQuarterSchedule() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        // Get the quarterSchedule
        restQuarterScheduleMockMvc
            .perform(get(ENTITY_API_URL_ID, quarterSchedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(quarterSchedule.getId()));
    }

    @Test
    void getNonExistingQuarterSchedule() throws Exception {
        // Get the quarterSchedule
        restQuarterScheduleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingQuarterSchedule() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quarterSchedule
        QuarterSchedule updatedQuarterSchedule = quarterScheduleRepository.findById(quarterSchedule.getId()).orElseThrow();
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(updatedQuarterSchedule);

        restQuarterScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quarterScheduleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quarterScheduleDTO))
            )
            .andExpect(status().isOk());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedQuarterScheduleToMatchAllProperties(updatedQuarterSchedule);
    }

    @Test
    void putNonExistingQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, quarterScheduleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quarterScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(quarterScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(quarterScheduleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateQuarterScheduleWithPatch() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quarterSchedule using partial update
        QuarterSchedule partialUpdatedQuarterSchedule = new QuarterSchedule();
        partialUpdatedQuarterSchedule.setId(quarterSchedule.getId());

        restQuarterScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuarterSchedule.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuarterSchedule))
            )
            .andExpect(status().isOk());

        // Validate the QuarterSchedule in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuarterScheduleUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedQuarterSchedule, quarterSchedule),
            getPersistedQuarterSchedule(quarterSchedule)
        );
    }

    @Test
    void fullUpdateQuarterScheduleWithPatch() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the quarterSchedule using partial update
        QuarterSchedule partialUpdatedQuarterSchedule = new QuarterSchedule();
        partialUpdatedQuarterSchedule.setId(quarterSchedule.getId());

        restQuarterScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedQuarterSchedule.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedQuarterSchedule))
            )
            .andExpect(status().isOk());

        // Validate the QuarterSchedule in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertQuarterScheduleUpdatableFieldsEquals(
            partialUpdatedQuarterSchedule,
            getPersistedQuarterSchedule(partialUpdatedQuarterSchedule)
        );
    }

    @Test
    void patchNonExistingQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, quarterScheduleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quarterScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(quarterScheduleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamQuarterSchedule() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        quarterSchedule.setId(UUID.randomUUID().toString());

        // Create the QuarterSchedule
        QuarterScheduleDTO quarterScheduleDTO = quarterScheduleMapper.toDto(quarterSchedule);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restQuarterScheduleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(quarterScheduleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the QuarterSchedule in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteQuarterSchedule() throws Exception {
        // Initialize the database
        insertedQuarterSchedule = quarterScheduleRepository.save(quarterSchedule);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the quarterSchedule
        restQuarterScheduleMockMvc
            .perform(delete(ENTITY_API_URL_ID, quarterSchedule.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return quarterScheduleRepository.count();
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

    protected QuarterSchedule getPersistedQuarterSchedule(QuarterSchedule quarterSchedule) {
        return quarterScheduleRepository.findById(quarterSchedule.getId()).orElseThrow();
    }

    protected void assertPersistedQuarterScheduleToMatchAllProperties(QuarterSchedule expectedQuarterSchedule) {
        assertQuarterScheduleAllPropertiesEquals(expectedQuarterSchedule, getPersistedQuarterSchedule(expectedQuarterSchedule));
    }

    protected void assertPersistedQuarterScheduleToMatchUpdatableProperties(QuarterSchedule expectedQuarterSchedule) {
        assertQuarterScheduleAllUpdatablePropertiesEquals(expectedQuarterSchedule, getPersistedQuarterSchedule(expectedQuarterSchedule));
    }
}

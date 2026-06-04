package co.edu.sena.web.rest;

import static co.edu.sena.domain.ViewedResultAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.CourseTrimester;
import co.edu.sena.domain.LearningResult;
import co.edu.sena.domain.Planning;
import co.edu.sena.domain.ViewedResult;
import co.edu.sena.repository.ViewedResultRepository;
import co.edu.sena.service.ViewedResultService;
import co.edu.sena.service.dto.ViewedResultDTO;
import co.edu.sena.service.mapper.ViewedResultMapper;
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
 * Integration tests for the {@link ViewedResultResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ViewedResultResourceIT {

    private static final String ENTITY_API_URL = "/api/viewed-results";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ViewedResultRepository viewedResultRepository;

    @Mock
    private ViewedResultRepository viewedResultRepositoryMock;

    @Autowired
    private ViewedResultMapper viewedResultMapper;

    @Mock
    private ViewedResultService viewedResultServiceMock;

    @Autowired
    private MockMvc restViewedResultMockMvc;

    private ViewedResult viewedResult;

    private ViewedResult insertedViewedResult;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ViewedResult createEntity() {
        ViewedResult viewedResult = new ViewedResult();
        // Add required entity
        CourseTrimester courseTrimester;
        courseTrimester = CourseTrimesterResourceIT.createEntity();
        courseTrimester.setId("fixed-id-for-tests");
        viewedResult.setCourseTrimester(courseTrimester);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createEntity();
        planning.setId("fixed-id-for-tests");
        viewedResult.setPlanning(planning);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createEntity();
        learningResult.setId("fixed-id-for-tests");
        viewedResult.setLearningResult(learningResult);
        return viewedResult;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ViewedResult createUpdatedEntity() {
        ViewedResult updatedViewedResult = new ViewedResult();
        // Add required entity
        CourseTrimester courseTrimester;
        courseTrimester = CourseTrimesterResourceIT.createUpdatedEntity();
        courseTrimester.setId("fixed-id-for-tests");
        updatedViewedResult.setCourseTrimester(courseTrimester);
        // Add required entity
        Planning planning;
        planning = PlanningResourceIT.createUpdatedEntity();
        planning.setId("fixed-id-for-tests");
        updatedViewedResult.setPlanning(planning);
        // Add required entity
        LearningResult learningResult;
        learningResult = LearningResultResourceIT.createUpdatedEntity();
        learningResult.setId("fixed-id-for-tests");
        updatedViewedResult.setLearningResult(learningResult);
        return updatedViewedResult;
    }

    @BeforeEach
    void initTest() {
        viewedResult = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedViewedResult != null) {
            viewedResultRepository.delete(insertedViewedResult);
            insertedViewedResult = null;
        }
    }

    @Test
    void createViewedResult() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);
        var returnedViewedResultDTO = om.readValue(
            restViewedResultMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(viewedResultDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ViewedResultDTO.class
        );

        // Validate the ViewedResult in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedViewedResult = viewedResultMapper.toEntity(returnedViewedResultDTO);
        assertViewedResultUpdatableFieldsEquals(returnedViewedResult, getPersistedViewedResult(returnedViewedResult));

        insertedViewedResult = returnedViewedResult;
    }

    @Test
    void createViewedResultWithExistingId() throws Exception {
        // Create the ViewedResult with an existing ID
        viewedResult.setId("existing_id");
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restViewedResultMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(viewedResultDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllViewedResults() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        // Get all the viewedResultList
        restViewedResultMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(viewedResult.getId())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllViewedResultsWithEagerRelationshipsIsEnabled() throws Exception {
        when(viewedResultServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restViewedResultMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(viewedResultServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllViewedResultsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(viewedResultServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restViewedResultMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(viewedResultRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getViewedResult() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        // Get the viewedResult
        restViewedResultMockMvc
            .perform(get(ENTITY_API_URL_ID, viewedResult.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(viewedResult.getId()));
    }

    @Test
    void getNonExistingViewedResult() throws Exception {
        // Get the viewedResult
        restViewedResultMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingViewedResult() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the viewedResult
        ViewedResult updatedViewedResult = viewedResultRepository.findById(viewedResult.getId()).orElseThrow();
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(updatedViewedResult);

        restViewedResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, viewedResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(viewedResultDTO))
            )
            .andExpect(status().isOk());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedViewedResultToMatchAllProperties(updatedViewedResult);
    }

    @Test
    void putNonExistingViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, viewedResultDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(viewedResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(viewedResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(viewedResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateViewedResultWithPatch() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the viewedResult using partial update
        ViewedResult partialUpdatedViewedResult = new ViewedResult();
        partialUpdatedViewedResult.setId(viewedResult.getId());

        restViewedResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedViewedResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedViewedResult))
            )
            .andExpect(status().isOk());

        // Validate the ViewedResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertViewedResultUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedViewedResult, viewedResult),
            getPersistedViewedResult(viewedResult)
        );
    }

    @Test
    void fullUpdateViewedResultWithPatch() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the viewedResult using partial update
        ViewedResult partialUpdatedViewedResult = new ViewedResult();
        partialUpdatedViewedResult.setId(viewedResult.getId());

        restViewedResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedViewedResult.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedViewedResult))
            )
            .andExpect(status().isOk());

        // Validate the ViewedResult in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertViewedResultUpdatableFieldsEquals(partialUpdatedViewedResult, getPersistedViewedResult(partialUpdatedViewedResult));
    }

    @Test
    void patchNonExistingViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, viewedResultDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(viewedResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(viewedResultDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamViewedResult() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        viewedResult.setId(UUID.randomUUID().toString());

        // Create the ViewedResult
        ViewedResultDTO viewedResultDTO = viewedResultMapper.toDto(viewedResult);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restViewedResultMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(viewedResultDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ViewedResult in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteViewedResult() throws Exception {
        // Initialize the database
        insertedViewedResult = viewedResultRepository.save(viewedResult);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the viewedResult
        restViewedResultMockMvc
            .perform(delete(ENTITY_API_URL_ID, viewedResult.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return viewedResultRepository.count();
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

    protected ViewedResult getPersistedViewedResult(ViewedResult viewedResult) {
        return viewedResultRepository.findById(viewedResult.getId()).orElseThrow();
    }

    protected void assertPersistedViewedResultToMatchAllProperties(ViewedResult expectedViewedResult) {
        assertViewedResultAllPropertiesEquals(expectedViewedResult, getPersistedViewedResult(expectedViewedResult));
    }

    protected void assertPersistedViewedResultToMatchUpdatableProperties(ViewedResult expectedViewedResult) {
        assertViewedResultAllUpdatablePropertiesEquals(expectedViewedResult, getPersistedViewedResult(expectedViewedResult));
    }
}

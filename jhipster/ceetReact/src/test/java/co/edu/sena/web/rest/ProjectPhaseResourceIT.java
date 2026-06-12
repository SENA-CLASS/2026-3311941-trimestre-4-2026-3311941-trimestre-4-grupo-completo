package co.edu.sena.web.rest;

import static co.edu.sena.domain.ProjectPhaseAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Project;
import co.edu.sena.domain.ProjectPhase;
import co.edu.sena.repository.ProjectPhaseRepository;
import co.edu.sena.service.ProjectPhaseService;
import co.edu.sena.service.dto.ProjectPhaseDTO;
import co.edu.sena.service.mapper.ProjectPhaseMapper;
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
 * Integration tests for the {@link ProjectPhaseResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ProjectPhaseResourceIT {

    private static final String DEFAULT_PROJECT_PHASE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_PHASE_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_PROJECT_PHASE_STATE = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_PHASE_STATE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/project-phases";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ProjectPhaseRepository projectPhaseRepository;

    @Mock
    private ProjectPhaseRepository projectPhaseRepositoryMock;

    @Autowired
    private ProjectPhaseMapper projectPhaseMapper;

    @Mock
    private ProjectPhaseService projectPhaseServiceMock;

    @Autowired
    private MockMvc restProjectPhaseMockMvc;

    private ProjectPhase projectPhase;

    private ProjectPhase insertedProjectPhase;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectPhase createEntity() {
        ProjectPhase projectPhase = new ProjectPhase()
            .projectPhaseCode(DEFAULT_PROJECT_PHASE_CODE)
            .projectPhaseState(DEFAULT_PROJECT_PHASE_STATE);
        // Add required entity
        Project project;
        project = ProjectResourceIT.createEntity();
        project.setId("fixed-id-for-tests");
        projectPhase.setProject(project);
        return projectPhase;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectPhase createUpdatedEntity() {
        ProjectPhase updatedProjectPhase = new ProjectPhase()
            .projectPhaseCode(UPDATED_PROJECT_PHASE_CODE)
            .projectPhaseState(UPDATED_PROJECT_PHASE_STATE);
        // Add required entity
        Project project;
        project = ProjectResourceIT.createUpdatedEntity();
        project.setId("fixed-id-for-tests");
        updatedProjectPhase.setProject(project);
        return updatedProjectPhase;
    }

    @BeforeEach
    void initTest() {
        projectPhase = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedProjectPhase != null) {
            projectPhaseRepository.delete(insertedProjectPhase);
            insertedProjectPhase = null;
        }
    }

    @Test
    void createProjectPhase() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);
        var returnedProjectPhaseDTO = om.readValue(
            restProjectPhaseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectPhaseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ProjectPhaseDTO.class
        );

        // Validate the ProjectPhase in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedProjectPhase = projectPhaseMapper.toEntity(returnedProjectPhaseDTO);
        assertProjectPhaseUpdatableFieldsEquals(returnedProjectPhase, getPersistedProjectPhase(returnedProjectPhase));

        insertedProjectPhase = returnedProjectPhase;
    }

    @Test
    void createProjectPhaseWithExistingId() throws Exception {
        // Create the ProjectPhase with an existing ID
        projectPhase.setId("existing_id");
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectPhaseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectPhaseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkProjectPhaseCodeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectPhase.setProjectPhaseCode(null);

        // Create the ProjectPhase, which fails.
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        restProjectPhaseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectPhaseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProjectPhaseStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectPhase.setProjectPhaseState(null);

        // Create the ProjectPhase, which fails.
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        restProjectPhaseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectPhaseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllProjectPhases() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        // Get all the projectPhaseList
        restProjectPhaseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectPhase.getId())))
            .andExpect(jsonPath("$.[*].projectPhaseCode").value(hasItem(DEFAULT_PROJECT_PHASE_CODE)))
            .andExpect(jsonPath("$.[*].projectPhaseState").value(hasItem(DEFAULT_PROJECT_PHASE_STATE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProjectPhasesWithEagerRelationshipsIsEnabled() throws Exception {
        when(projectPhaseServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProjectPhaseMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(projectPhaseServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProjectPhasesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(projectPhaseServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProjectPhaseMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(projectPhaseRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getProjectPhase() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        // Get the projectPhase
        restProjectPhaseMockMvc
            .perform(get(ENTITY_API_URL_ID, projectPhase.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectPhase.getId()))
            .andExpect(jsonPath("$.projectPhaseCode").value(DEFAULT_PROJECT_PHASE_CODE))
            .andExpect(jsonPath("$.projectPhaseState").value(DEFAULT_PROJECT_PHASE_STATE));
    }

    @Test
    void getNonExistingProjectPhase() throws Exception {
        // Get the projectPhase
        restProjectPhaseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingProjectPhase() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectPhase
        ProjectPhase updatedProjectPhase = projectPhaseRepository.findById(projectPhase.getId()).orElseThrow();
        updatedProjectPhase.projectPhaseCode(UPDATED_PROJECT_PHASE_CODE).projectPhaseState(UPDATED_PROJECT_PHASE_STATE);
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(updatedProjectPhase);

        restProjectPhaseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectPhaseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectPhaseDTO))
            )
            .andExpect(status().isOk());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedProjectPhaseToMatchAllProperties(updatedProjectPhase);
    }

    @Test
    void putNonExistingProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectPhaseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectPhaseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectPhaseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectPhaseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProjectPhaseWithPatch() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectPhase using partial update
        ProjectPhase partialUpdatedProjectPhase = new ProjectPhase();
        partialUpdatedProjectPhase.setId(projectPhase.getId());

        partialUpdatedProjectPhase.projectPhaseState(UPDATED_PROJECT_PHASE_STATE);

        restProjectPhaseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectPhase.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectPhase))
            )
            .andExpect(status().isOk());

        // Validate the ProjectPhase in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectPhaseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedProjectPhase, projectPhase),
            getPersistedProjectPhase(projectPhase)
        );
    }

    @Test
    void fullUpdateProjectPhaseWithPatch() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectPhase using partial update
        ProjectPhase partialUpdatedProjectPhase = new ProjectPhase();
        partialUpdatedProjectPhase.setId(projectPhase.getId());

        partialUpdatedProjectPhase.projectPhaseCode(UPDATED_PROJECT_PHASE_CODE).projectPhaseState(UPDATED_PROJECT_PHASE_STATE);

        restProjectPhaseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectPhase.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectPhase))
            )
            .andExpect(status().isOk());

        // Validate the ProjectPhase in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectPhaseUpdatableFieldsEquals(partialUpdatedProjectPhase, getPersistedProjectPhase(partialUpdatedProjectPhase));
    }

    @Test
    void patchNonExistingProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projectPhaseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectPhaseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectPhaseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProjectPhase() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectPhase.setId(UUID.randomUUID().toString());

        // Create the ProjectPhase
        ProjectPhaseDTO projectPhaseDTO = projectPhaseMapper.toDto(projectPhase);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectPhaseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(projectPhaseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectPhase in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProjectPhase() throws Exception {
        // Initialize the database
        insertedProjectPhase = projectPhaseRepository.save(projectPhase);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the projectPhase
        restProjectPhaseMockMvc
            .perform(delete(ENTITY_API_URL_ID, projectPhase.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return projectPhaseRepository.count();
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

    protected ProjectPhase getPersistedProjectPhase(ProjectPhase projectPhase) {
        return projectPhaseRepository.findById(projectPhase.getId()).orElseThrow();
    }

    protected void assertPersistedProjectPhaseToMatchAllProperties(ProjectPhase expectedProjectPhase) {
        assertProjectPhaseAllPropertiesEquals(expectedProjectPhase, getPersistedProjectPhase(expectedProjectPhase));
    }

    protected void assertPersistedProjectPhaseToMatchUpdatableProperties(ProjectPhase expectedProjectPhase) {
        assertProjectPhaseAllUpdatablePropertiesEquals(expectedProjectPhase, getPersistedProjectPhase(expectedProjectPhase));
    }
}

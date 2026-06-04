package co.edu.sena.web.rest;

import static co.edu.sena.domain.ProjectGroupAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Course;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.ProjectGroupRepository;
import co.edu.sena.service.ProjectGroupService;
import co.edu.sena.service.dto.ProjectGroupDTO;
import co.edu.sena.service.mapper.ProjectGroupMapper;
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
 * Integration tests for the {@link ProjectGroupResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ProjectGroupResourceIT {

    private static final Integer DEFAULT_GROUP_NUMBER = 1;
    private static final Integer UPDATED_GROUP_NUMBER = 2;

    private static final String DEFAULT_PROJECT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROJECT_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_PROJECT_GROUP_STATE = State.ACTIVE;
    private static final State UPDATED_PROJECT_GROUP_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/project-groups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ProjectGroupRepository projectGroupRepository;

    @Mock
    private ProjectGroupRepository projectGroupRepositoryMock;

    @Autowired
    private ProjectGroupMapper projectGroupMapper;

    @Mock
    private ProjectGroupService projectGroupServiceMock;

    @Autowired
    private MockMvc restProjectGroupMockMvc;

    private ProjectGroup projectGroup;

    private ProjectGroup insertedProjectGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectGroup createEntity() {
        ProjectGroup projectGroup = new ProjectGroup()
            .groupNumber(DEFAULT_GROUP_NUMBER)
            .projectName(DEFAULT_PROJECT_NAME)
            .projectGroupState(DEFAULT_PROJECT_GROUP_STATE);
        // Add required entity
        Course course;
        course = CourseResourceIT.createEntity();
        course.setId("fixed-id-for-tests");
        projectGroup.setCourse(course);
        return projectGroup;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectGroup createUpdatedEntity() {
        ProjectGroup updatedProjectGroup = new ProjectGroup()
            .groupNumber(UPDATED_GROUP_NUMBER)
            .projectName(UPDATED_PROJECT_NAME)
            .projectGroupState(UPDATED_PROJECT_GROUP_STATE);
        // Add required entity
        Course course;
        course = CourseResourceIT.createUpdatedEntity();
        course.setId("fixed-id-for-tests");
        updatedProjectGroup.setCourse(course);
        return updatedProjectGroup;
    }

    @BeforeEach
    void initTest() {
        projectGroup = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedProjectGroup != null) {
            projectGroupRepository.delete(insertedProjectGroup);
            insertedProjectGroup = null;
        }
    }

    @Test
    void createProjectGroup() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);
        var returnedProjectGroupDTO = om.readValue(
            restProjectGroupMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ProjectGroupDTO.class
        );

        // Validate the ProjectGroup in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedProjectGroup = projectGroupMapper.toEntity(returnedProjectGroupDTO);
        assertProjectGroupUpdatableFieldsEquals(returnedProjectGroup, getPersistedProjectGroup(returnedProjectGroup));

        insertedProjectGroup = returnedProjectGroup;
    }

    @Test
    void createProjectGroupWithExistingId() throws Exception {
        // Create the ProjectGroup with an existing ID
        projectGroup.setId("existing_id");
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkGroupNumberIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectGroup.setGroupNumber(null);

        // Create the ProjectGroup, which fails.
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        restProjectGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProjectNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectGroup.setProjectName(null);

        // Create the ProjectGroup, which fails.
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        restProjectGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkProjectGroupStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        projectGroup.setProjectGroupState(null);

        // Create the ProjectGroup, which fails.
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        restProjectGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllProjectGroups() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        // Get all the projectGroupList
        restProjectGroupMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectGroup.getId())))
            .andExpect(jsonPath("$.[*].groupNumber").value(hasItem(DEFAULT_GROUP_NUMBER)))
            .andExpect(jsonPath("$.[*].projectName").value(hasItem(DEFAULT_PROJECT_NAME)))
            .andExpect(jsonPath("$.[*].projectGroupState").value(hasItem(DEFAULT_PROJECT_GROUP_STATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProjectGroupsWithEagerRelationshipsIsEnabled() throws Exception {
        when(projectGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProjectGroupMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(projectGroupServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllProjectGroupsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(projectGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restProjectGroupMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(projectGroupRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getProjectGroup() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        // Get the projectGroup
        restProjectGroupMockMvc
            .perform(get(ENTITY_API_URL_ID, projectGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectGroup.getId()))
            .andExpect(jsonPath("$.groupNumber").value(DEFAULT_GROUP_NUMBER))
            .andExpect(jsonPath("$.projectName").value(DEFAULT_PROJECT_NAME))
            .andExpect(jsonPath("$.projectGroupState").value(DEFAULT_PROJECT_GROUP_STATE.toString()));
    }

    @Test
    void getNonExistingProjectGroup() throws Exception {
        // Get the projectGroup
        restProjectGroupMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingProjectGroup() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectGroup
        ProjectGroup updatedProjectGroup = projectGroupRepository.findById(projectGroup.getId()).orElseThrow();
        updatedProjectGroup
            .groupNumber(UPDATED_GROUP_NUMBER)
            .projectName(UPDATED_PROJECT_NAME)
            .projectGroupState(UPDATED_PROJECT_GROUP_STATE);
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(updatedProjectGroup);

        restProjectGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectGroupDTO))
            )
            .andExpect(status().isOk());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedProjectGroupToMatchAllProperties(updatedProjectGroup);
    }

    @Test
    void putNonExistingProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, projectGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(projectGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProjectGroupWithPatch() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectGroup using partial update
        ProjectGroup partialUpdatedProjectGroup = new ProjectGroup();
        partialUpdatedProjectGroup.setId(projectGroup.getId());

        partialUpdatedProjectGroup
            .groupNumber(UPDATED_GROUP_NUMBER)
            .projectName(UPDATED_PROJECT_NAME)
            .projectGroupState(UPDATED_PROJECT_GROUP_STATE);

        restProjectGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectGroup))
            )
            .andExpect(status().isOk());

        // Validate the ProjectGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectGroupUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedProjectGroup, projectGroup),
            getPersistedProjectGroup(projectGroup)
        );
    }

    @Test
    void fullUpdateProjectGroupWithPatch() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the projectGroup using partial update
        ProjectGroup partialUpdatedProjectGroup = new ProjectGroup();
        partialUpdatedProjectGroup.setId(projectGroup.getId());

        partialUpdatedProjectGroup
            .groupNumber(UPDATED_GROUP_NUMBER)
            .projectName(UPDATED_PROJECT_NAME)
            .projectGroupState(UPDATED_PROJECT_GROUP_STATE);

        restProjectGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedProjectGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedProjectGroup))
            )
            .andExpect(status().isOk());

        // Validate the ProjectGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertProjectGroupUpdatableFieldsEquals(partialUpdatedProjectGroup, getPersistedProjectGroup(partialUpdatedProjectGroup));
    }

    @Test
    void patchNonExistingProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, projectGroupDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(projectGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProjectGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        projectGroup.setId(UUID.randomUUID().toString());

        // Create the ProjectGroup
        ProjectGroupDTO projectGroupDTO = projectGroupMapper.toDto(projectGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restProjectGroupMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(projectGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ProjectGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProjectGroup() throws Exception {
        // Initialize the database
        insertedProjectGroup = projectGroupRepository.save(projectGroup);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the projectGroup
        restProjectGroupMockMvc
            .perform(delete(ENTITY_API_URL_ID, projectGroup.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return projectGroupRepository.count();
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

    protected ProjectGroup getPersistedProjectGroup(ProjectGroup projectGroup) {
        return projectGroupRepository.findById(projectGroup.getId()).orElseThrow();
    }

    protected void assertPersistedProjectGroupToMatchAllProperties(ProjectGroup expectedProjectGroup) {
        assertProjectGroupAllPropertiesEquals(expectedProjectGroup, getPersistedProjectGroup(expectedProjectGroup));
    }

    protected void assertPersistedProjectGroupToMatchUpdatableProperties(ProjectGroup expectedProjectGroup) {
        assertProjectGroupAllUpdatablePropertiesEquals(expectedProjectGroup, getPersistedProjectGroup(expectedProjectGroup));
    }
}

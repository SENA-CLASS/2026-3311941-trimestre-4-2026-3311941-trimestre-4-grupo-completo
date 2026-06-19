package co.edu.sena.web.rest;

import static co.edu.sena.domain.GroupResponseAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static co.edu.sena.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Assessment;
import co.edu.sena.domain.GroupResponse;
import co.edu.sena.domain.ItemList;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.repository.GroupResponseRepository;
import co.edu.sena.service.GroupResponseService;
import co.edu.sena.service.dto.GroupResponseDTO;
import co.edu.sena.service.mapper.GroupResponseMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
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
 * Integration tests for the {@link GroupResponseResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class GroupResponseResourceIT {

    private static final ZonedDateTime DEFAULT_EVALUATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_EVALUATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/group-responses";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private GroupResponseRepository groupResponseRepository;

    @Mock
    private GroupResponseRepository groupResponseRepositoryMock;

    @Autowired
    private GroupResponseMapper groupResponseMapper;

    @Mock
    private GroupResponseService groupResponseServiceMock;

    @Autowired
    private MockMvc restGroupResponseMockMvc;

    private GroupResponse groupResponse;

    private GroupResponse insertedGroupResponse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupResponse createEntity() {
        GroupResponse groupResponse = new GroupResponse().evaluationDate(DEFAULT_EVALUATION_DATE);
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createEntity();
        projectGroup.setId("fixed-id-for-tests");
        groupResponse.setProjectGroup(projectGroup);
        // Add required entity
        Assessment assessment;
        assessment = AssessmentResourceIT.createEntity();
        assessment.setId("fixed-id-for-tests");
        groupResponse.setAssessment(assessment);
        // Add required entity
        ItemList itemList;
        itemList = ItemListResourceIT.createEntity();
        itemList.setId("fixed-id-for-tests");
        groupResponse.setItemList(itemList);
        return groupResponse;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupResponse createUpdatedEntity() {
        GroupResponse updatedGroupResponse = new GroupResponse().evaluationDate(UPDATED_EVALUATION_DATE);
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createUpdatedEntity();
        projectGroup.setId("fixed-id-for-tests");
        updatedGroupResponse.setProjectGroup(projectGroup);
        // Add required entity
        Assessment assessment;
        assessment = AssessmentResourceIT.createUpdatedEntity();
        assessment.setId("fixed-id-for-tests");
        updatedGroupResponse.setAssessment(assessment);
        // Add required entity
        ItemList itemList;
        itemList = ItemListResourceIT.createUpdatedEntity();
        itemList.setId("fixed-id-for-tests");
        updatedGroupResponse.setItemList(itemList);
        return updatedGroupResponse;
    }

    @BeforeEach
    void initTest() {
        groupResponse = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedGroupResponse != null) {
            groupResponseRepository.delete(insertedGroupResponse);
            insertedGroupResponse = null;
        }
    }

    @Test
    void createGroupResponse() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);
        var returnedGroupResponseDTO = om.readValue(
            restGroupResponseMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(groupResponseDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            GroupResponseDTO.class
        );

        // Validate the GroupResponse in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedGroupResponse = groupResponseMapper.toEntity(returnedGroupResponseDTO);
        assertGroupResponseUpdatableFieldsEquals(returnedGroupResponse, getPersistedGroupResponse(returnedGroupResponse));

        insertedGroupResponse = returnedGroupResponse;
    }

    @Test
    void createGroupResponseWithExistingId() throws Exception {
        // Create the GroupResponse with an existing ID
        groupResponse.setId("existing_id");
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(groupResponseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkEvaluationDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        groupResponse.setEvaluationDate(null);

        // Create the GroupResponse, which fails.
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        restGroupResponseMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(groupResponseDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllGroupResponses() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        // Get all the groupResponseList
        restGroupResponseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupResponse.getId())))
            .andExpect(jsonPath("$.[*].evaluationDate").value(hasItem(sameInstant(DEFAULT_EVALUATION_DATE))));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllGroupResponsesWithEagerRelationshipsIsEnabled() throws Exception {
        when(groupResponseServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGroupResponseMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(groupResponseServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllGroupResponsesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(groupResponseServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGroupResponseMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(groupResponseRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getGroupResponse() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        // Get the groupResponse
        restGroupResponseMockMvc
            .perform(get(ENTITY_API_URL_ID, groupResponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(groupResponse.getId()))
            .andExpect(jsonPath("$.evaluationDate").value(sameInstant(DEFAULT_EVALUATION_DATE)));
    }

    @Test
    void getNonExistingGroupResponse() throws Exception {
        // Get the groupResponse
        restGroupResponseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingGroupResponse() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the groupResponse
        GroupResponse updatedGroupResponse = groupResponseRepository.findById(groupResponse.getId()).orElseThrow();
        updatedGroupResponse.evaluationDate(UPDATED_EVALUATION_DATE);
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(updatedGroupResponse);

        restGroupResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, groupResponseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(groupResponseDTO))
            )
            .andExpect(status().isOk());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedGroupResponseToMatchAllProperties(updatedGroupResponse);
    }

    @Test
    void putNonExistingGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, groupResponseDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(groupResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(groupResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(groupResponseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateGroupResponseWithPatch() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the groupResponse using partial update
        GroupResponse partialUpdatedGroupResponse = new GroupResponse();
        partialUpdatedGroupResponse.setId(groupResponse.getId());

        partialUpdatedGroupResponse.evaluationDate(UPDATED_EVALUATION_DATE);

        restGroupResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGroupResponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGroupResponse))
            )
            .andExpect(status().isOk());

        // Validate the GroupResponse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGroupResponseUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedGroupResponse, groupResponse),
            getPersistedGroupResponse(groupResponse)
        );
    }

    @Test
    void fullUpdateGroupResponseWithPatch() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the groupResponse using partial update
        GroupResponse partialUpdatedGroupResponse = new GroupResponse();
        partialUpdatedGroupResponse.setId(groupResponse.getId());

        partialUpdatedGroupResponse.evaluationDate(UPDATED_EVALUATION_DATE);

        restGroupResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGroupResponse.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedGroupResponse))
            )
            .andExpect(status().isOk());

        // Validate the GroupResponse in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertGroupResponseUpdatableFieldsEquals(partialUpdatedGroupResponse, getPersistedGroupResponse(partialUpdatedGroupResponse));
    }

    @Test
    void patchNonExistingGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, groupResponseDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(groupResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(groupResponseDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamGroupResponse() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        groupResponse.setId(UUID.randomUUID().toString());

        // Create the GroupResponse
        GroupResponseDTO groupResponseDTO = groupResponseMapper.toDto(groupResponse);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupResponseMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(groupResponseDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the GroupResponse in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteGroupResponse() throws Exception {
        // Initialize the database
        insertedGroupResponse = groupResponseRepository.save(groupResponse);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the groupResponse
        restGroupResponseMockMvc
            .perform(delete(ENTITY_API_URL_ID, groupResponse.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return groupResponseRepository.count();
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

    protected GroupResponse getPersistedGroupResponse(GroupResponse groupResponse) {
        return groupResponseRepository.findById(groupResponse.getId()).orElseThrow();
    }

    protected void assertPersistedGroupResponseToMatchAllProperties(GroupResponse expectedGroupResponse) {
        assertGroupResponseAllPropertiesEquals(expectedGroupResponse, getPersistedGroupResponse(expectedGroupResponse));
    }

    protected void assertPersistedGroupResponseToMatchUpdatableProperties(GroupResponse expectedGroupResponse) {
        assertGroupResponseAllUpdatablePropertiesEquals(expectedGroupResponse, getPersistedGroupResponse(expectedGroupResponse));
    }
}

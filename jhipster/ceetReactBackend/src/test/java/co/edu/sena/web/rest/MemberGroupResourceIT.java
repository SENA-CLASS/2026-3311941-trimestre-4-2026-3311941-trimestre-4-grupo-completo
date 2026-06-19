package co.edu.sena.web.rest;

import static co.edu.sena.domain.MemberGroupAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Apprentice;
import co.edu.sena.domain.MemberGroup;
import co.edu.sena.domain.ProjectGroup;
import co.edu.sena.repository.MemberGroupRepository;
import co.edu.sena.service.dto.MemberGroupDTO;
import co.edu.sena.service.mapper.MemberGroupMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
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
 * Integration tests for the {@link MemberGroupResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MemberGroupResourceIT {

    private static final String ENTITY_API_URL = "/api/member-groups";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MemberGroupRepository memberGroupRepository;

    @Autowired
    private MemberGroupMapper memberGroupMapper;

    @Autowired
    private MockMvc restMemberGroupMockMvc;

    private MemberGroup memberGroup;

    private MemberGroup insertedMemberGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MemberGroup createEntity() {
        MemberGroup memberGroup = new MemberGroup();
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createEntity();
        projectGroup.setId("fixed-id-for-tests");
        memberGroup.setProjectGroup(projectGroup);
        // Add required entity
        Apprentice apprentice;
        apprentice = ApprenticeResourceIT.createEntity();
        apprentice.setId("fixed-id-for-tests");
        memberGroup.setApprentice(apprentice);
        return memberGroup;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MemberGroup createUpdatedEntity() {
        MemberGroup updatedMemberGroup = new MemberGroup();
        // Add required entity
        ProjectGroup projectGroup;
        projectGroup = ProjectGroupResourceIT.createUpdatedEntity();
        projectGroup.setId("fixed-id-for-tests");
        updatedMemberGroup.setProjectGroup(projectGroup);
        // Add required entity
        Apprentice apprentice;
        apprentice = ApprenticeResourceIT.createUpdatedEntity();
        apprentice.setId("fixed-id-for-tests");
        updatedMemberGroup.setApprentice(apprentice);
        return updatedMemberGroup;
    }

    @BeforeEach
    void initTest() {
        memberGroup = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedMemberGroup != null) {
            memberGroupRepository.delete(insertedMemberGroup);
            insertedMemberGroup = null;
        }
    }

    @Test
    void createMemberGroup() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);
        var returnedMemberGroupDTO = om.readValue(
            restMemberGroupMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(memberGroupDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            MemberGroupDTO.class
        );

        // Validate the MemberGroup in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedMemberGroup = memberGroupMapper.toEntity(returnedMemberGroupDTO);
        assertMemberGroupUpdatableFieldsEquals(returnedMemberGroup, getPersistedMemberGroup(returnedMemberGroup));

        insertedMemberGroup = returnedMemberGroup;
    }

    @Test
    void createMemberGroupWithExistingId() throws Exception {
        // Create the MemberGroup with an existing ID
        memberGroup.setId("existing_id");
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMemberGroupMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(memberGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllMemberGroups() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        // Get all the memberGroupList
        restMemberGroupMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(memberGroup.getId())));
    }

    @Test
    void getMemberGroup() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        // Get the memberGroup
        restMemberGroupMockMvc
            .perform(get(ENTITY_API_URL_ID, memberGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(memberGroup.getId()));
    }

    @Test
    void getNonExistingMemberGroup() throws Exception {
        // Get the memberGroup
        restMemberGroupMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingMemberGroup() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the memberGroup
        MemberGroup updatedMemberGroup = memberGroupRepository.findById(memberGroup.getId()).orElseThrow();
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(updatedMemberGroup);

        restMemberGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, memberGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(memberGroupDTO))
            )
            .andExpect(status().isOk());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMemberGroupToMatchAllProperties(updatedMemberGroup);
    }

    @Test
    void putNonExistingMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, memberGroupDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(memberGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(memberGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(memberGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateMemberGroupWithPatch() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the memberGroup using partial update
        MemberGroup partialUpdatedMemberGroup = new MemberGroup();
        partialUpdatedMemberGroup.setId(memberGroup.getId());

        restMemberGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMemberGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMemberGroup))
            )
            .andExpect(status().isOk());

        // Validate the MemberGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMemberGroupUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedMemberGroup, memberGroup),
            getPersistedMemberGroup(memberGroup)
        );
    }

    @Test
    void fullUpdateMemberGroupWithPatch() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the memberGroup using partial update
        MemberGroup partialUpdatedMemberGroup = new MemberGroup();
        partialUpdatedMemberGroup.setId(memberGroup.getId());

        restMemberGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMemberGroup.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedMemberGroup))
            )
            .andExpect(status().isOk());

        // Validate the MemberGroup in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMemberGroupUpdatableFieldsEquals(partialUpdatedMemberGroup, getPersistedMemberGroup(partialUpdatedMemberGroup));
    }

    @Test
    void patchNonExistingMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, memberGroupDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(memberGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(memberGroupDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamMemberGroup() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        memberGroup.setId(UUID.randomUUID().toString());

        // Create the MemberGroup
        MemberGroupDTO memberGroupDTO = memberGroupMapper.toDto(memberGroup);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMemberGroupMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(memberGroupDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the MemberGroup in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteMemberGroup() throws Exception {
        // Initialize the database
        insertedMemberGroup = memberGroupRepository.save(memberGroup);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the memberGroup
        restMemberGroupMockMvc
            .perform(delete(ENTITY_API_URL_ID, memberGroup.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return memberGroupRepository.count();
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

    protected MemberGroup getPersistedMemberGroup(MemberGroup memberGroup) {
        return memberGroupRepository.findById(memberGroup.getId()).orElseThrow();
    }

    protected void assertPersistedMemberGroupToMatchAllProperties(MemberGroup expectedMemberGroup) {
        assertMemberGroupAllPropertiesEquals(expectedMemberGroup, getPersistedMemberGroup(expectedMemberGroup));
    }

    protected void assertPersistedMemberGroupToMatchUpdatableProperties(MemberGroup expectedMemberGroup) {
        assertMemberGroupAllUpdatablePropertiesEquals(expectedMemberGroup, getPersistedMemberGroup(expectedMemberGroup));
    }
}

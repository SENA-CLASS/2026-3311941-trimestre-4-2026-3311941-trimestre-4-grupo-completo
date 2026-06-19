package co.edu.sena.web.rest;

import static co.edu.sena.domain.DocumentTypeAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.DocumentType;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.DocumentTypeRepository;
import co.edu.sena.service.dto.DocumentTypeDTO;
import co.edu.sena.service.mapper.DocumentTypeMapper;
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
 * Integration tests for the {@link DocumentTypeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DocumentTypeResourceIT {

    private static final String DEFAULT_INITIALS = "AAAAAAAAAA";
    private static final String UPDATED_INITIALS = "BBBBBBBBBB";

    private static final String DEFAULT_DOCUMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENT_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATE_DOCUMENT_TYPE = State.ACTIVE;
    private static final State UPDATED_STATE_DOCUMENT_TYPE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/document-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    @Autowired
    private DocumentTypeMapper documentTypeMapper;

    @Autowired
    private MockMvc restDocumentTypeMockMvc;

    private DocumentType documentType;

    private DocumentType insertedDocumentType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentType createEntity() {
        return new DocumentType()
            .initials(DEFAULT_INITIALS)
            .documentName(DEFAULT_DOCUMENT_NAME)
            .stateDocumentType(DEFAULT_STATE_DOCUMENT_TYPE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentType createUpdatedEntity() {
        return new DocumentType()
            .initials(UPDATED_INITIALS)
            .documentName(UPDATED_DOCUMENT_NAME)
            .stateDocumentType(UPDATED_STATE_DOCUMENT_TYPE);
    }

    @BeforeEach
    void initTest() {
        documentType = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedDocumentType != null) {
            documentTypeRepository.delete(insertedDocumentType);
            insertedDocumentType = null;
        }
    }

    @Test
    void createDocumentType() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);
        var returnedDocumentTypeDTO = om.readValue(
            restDocumentTypeMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DocumentTypeDTO.class
        );

        // Validate the DocumentType in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDocumentType = documentTypeMapper.toEntity(returnedDocumentTypeDTO);
        assertDocumentTypeUpdatableFieldsEquals(returnedDocumentType, getPersistedDocumentType(returnedDocumentType));

        insertedDocumentType = returnedDocumentType;
    }

    @Test
    void createDocumentTypeWithExistingId() throws Exception {
        // Create the DocumentType with an existing ID
        documentType.setId("existing_id");
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkInitialsIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        documentType.setInitials(null);

        // Create the DocumentType, which fails.
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        restDocumentTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDocumentNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        documentType.setDocumentName(null);

        // Create the DocumentType, which fails.
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        restDocumentTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStateDocumentTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        documentType.setStateDocumentType(null);

        // Create the DocumentType, which fails.
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        restDocumentTypeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllDocumentTypes() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        // Get all the documentTypeList
        restDocumentTypeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentType.getId())))
            .andExpect(jsonPath("$.[*].initials").value(hasItem(DEFAULT_INITIALS)))
            .andExpect(jsonPath("$.[*].documentName").value(hasItem(DEFAULT_DOCUMENT_NAME)))
            .andExpect(jsonPath("$.[*].stateDocumentType").value(hasItem(DEFAULT_STATE_DOCUMENT_TYPE.toString())));
    }

    @Test
    void getDocumentType() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        // Get the documentType
        restDocumentTypeMockMvc
            .perform(get(ENTITY_API_URL_ID, documentType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(documentType.getId()))
            .andExpect(jsonPath("$.initials").value(DEFAULT_INITIALS))
            .andExpect(jsonPath("$.documentName").value(DEFAULT_DOCUMENT_NAME))
            .andExpect(jsonPath("$.stateDocumentType").value(DEFAULT_STATE_DOCUMENT_TYPE.toString()));
    }

    @Test
    void getNonExistingDocumentType() throws Exception {
        // Get the documentType
        restDocumentTypeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDocumentType() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the documentType
        DocumentType updatedDocumentType = documentTypeRepository.findById(documentType.getId()).orElseThrow();
        updatedDocumentType.initials(UPDATED_INITIALS).documentName(UPDATED_DOCUMENT_NAME).stateDocumentType(UPDATED_STATE_DOCUMENT_TYPE);
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(updatedDocumentType);

        restDocumentTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, documentTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(documentTypeDTO))
            )
            .andExpect(status().isOk());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDocumentTypeToMatchAllProperties(updatedDocumentType);
    }

    @Test
    void putNonExistingDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, documentTypeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(documentTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(documentTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDocumentTypeWithPatch() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the documentType using partial update
        DocumentType partialUpdatedDocumentType = new DocumentType();
        partialUpdatedDocumentType.setId(documentType.getId());

        partialUpdatedDocumentType.documentName(UPDATED_DOCUMENT_NAME);

        restDocumentTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDocumentType))
            )
            .andExpect(status().isOk());

        // Validate the DocumentType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDocumentTypeUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDocumentType, documentType),
            getPersistedDocumentType(documentType)
        );
    }

    @Test
    void fullUpdateDocumentTypeWithPatch() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the documentType using partial update
        DocumentType partialUpdatedDocumentType = new DocumentType();
        partialUpdatedDocumentType.setId(documentType.getId());

        partialUpdatedDocumentType
            .initials(UPDATED_INITIALS)
            .documentName(UPDATED_DOCUMENT_NAME)
            .stateDocumentType(UPDATED_STATE_DOCUMENT_TYPE);

        restDocumentTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDocumentType.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDocumentType))
            )
            .andExpect(status().isOk());

        // Validate the DocumentType in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDocumentTypeUpdatableFieldsEquals(partialUpdatedDocumentType, getPersistedDocumentType(partialUpdatedDocumentType));
    }

    @Test
    void patchNonExistingDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, documentTypeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(documentTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(documentTypeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDocumentType() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        documentType.setId(UUID.randomUUID().toString());

        // Create the DocumentType
        DocumentTypeDTO documentTypeDTO = documentTypeMapper.toDto(documentType);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDocumentTypeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(documentTypeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DocumentType in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDocumentType() throws Exception {
        // Initialize the database
        insertedDocumentType = documentTypeRepository.save(documentType);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the documentType
        restDocumentTypeMockMvc
            .perform(delete(ENTITY_API_URL_ID, documentType.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return documentTypeRepository.count();
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

    protected DocumentType getPersistedDocumentType(DocumentType documentType) {
        return documentTypeRepository.findById(documentType.getId()).orElseThrow();
    }

    protected void assertPersistedDocumentTypeToMatchAllProperties(DocumentType expectedDocumentType) {
        assertDocumentTypeAllPropertiesEquals(expectedDocumentType, getPersistedDocumentType(expectedDocumentType));
    }

    protected void assertPersistedDocumentTypeToMatchUpdatableProperties(DocumentType expectedDocumentType) {
        assertDocumentTypeAllUpdatablePropertiesEquals(expectedDocumentType, getPersistedDocumentType(expectedDocumentType));
    }
}

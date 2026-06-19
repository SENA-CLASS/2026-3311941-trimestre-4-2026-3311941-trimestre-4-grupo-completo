package co.edu.sena.web.rest;

import static co.edu.sena.domain.ApprenticeAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Apprentice;
import co.edu.sena.domain.Course;
import co.edu.sena.domain.Customer;
import co.edu.sena.domain.TrainingStatus;
import co.edu.sena.repository.ApprenticeRepository;
import co.edu.sena.service.ApprenticeService;
import co.edu.sena.service.dto.ApprenticeDTO;
import co.edu.sena.service.mapper.ApprenticeMapper;
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
 * Integration tests for the {@link ApprenticeResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class ApprenticeResourceIT {

    private static final String ENTITY_API_URL = "/api/apprentices";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private ApprenticeRepository apprenticeRepository;

    @Mock
    private ApprenticeRepository apprenticeRepositoryMock;

    @Autowired
    private ApprenticeMapper apprenticeMapper;

    @Mock
    private ApprenticeService apprenticeServiceMock;

    @Autowired
    private MockMvc restApprenticeMockMvc;

    private Apprentice apprentice;

    private Apprentice insertedApprentice;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprentice createEntity() {
        Apprentice apprentice = new Apprentice();
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createEntity();
        customer.setId("fixed-id-for-tests");
        apprentice.setCustomer(customer);
        // Add required entity
        TrainingStatus trainingStatus;
        trainingStatus = TrainingStatusResourceIT.createEntity();
        trainingStatus.setId("fixed-id-for-tests");
        apprentice.setTrainingStatus(trainingStatus);
        // Add required entity
        Course course;
        course = CourseResourceIT.createEntity();
        course.setId("fixed-id-for-tests");
        apprentice.setCourse(course);
        return apprentice;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprentice createUpdatedEntity() {
        Apprentice updatedApprentice = new Apprentice();
        // Add required entity
        Customer customer;
        customer = CustomerResourceIT.createUpdatedEntity();
        customer.setId("fixed-id-for-tests");
        updatedApprentice.setCustomer(customer);
        // Add required entity
        TrainingStatus trainingStatus;
        trainingStatus = TrainingStatusResourceIT.createUpdatedEntity();
        trainingStatus.setId("fixed-id-for-tests");
        updatedApprentice.setTrainingStatus(trainingStatus);
        // Add required entity
        Course course;
        course = CourseResourceIT.createUpdatedEntity();
        course.setId("fixed-id-for-tests");
        updatedApprentice.setCourse(course);
        return updatedApprentice;
    }

    @BeforeEach
    void initTest() {
        apprentice = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedApprentice != null) {
            apprenticeRepository.delete(insertedApprentice);
            insertedApprentice = null;
        }
    }

    @Test
    void createApprentice() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);
        var returnedApprenticeDTO = om.readValue(
            restApprenticeMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(apprenticeDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            ApprenticeDTO.class
        );

        // Validate the Apprentice in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedApprentice = apprenticeMapper.toEntity(returnedApprenticeDTO);
        assertApprenticeUpdatableFieldsEquals(returnedApprentice, getPersistedApprentice(returnedApprentice));

        insertedApprentice = returnedApprentice;
    }

    @Test
    void createApprenticeWithExistingId() throws Exception {
        // Create the Apprentice with an existing ID
        apprentice.setId("existing_id");
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restApprenticeMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(apprenticeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void getAllApprentices() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        // Get all the apprenticeList
        restApprenticeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apprentice.getId())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllApprenticesWithEagerRelationshipsIsEnabled() throws Exception {
        when(apprenticeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restApprenticeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(apprenticeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllApprenticesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(apprenticeServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restApprenticeMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(apprenticeRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getApprentice() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        // Get the apprentice
        restApprenticeMockMvc
            .perform(get(ENTITY_API_URL_ID, apprentice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(apprentice.getId()));
    }

    @Test
    void getNonExistingApprentice() throws Exception {
        // Get the apprentice
        restApprenticeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingApprentice() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the apprentice
        Apprentice updatedApprentice = apprenticeRepository.findById(apprentice.getId()).orElseThrow();
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(updatedApprentice);

        restApprenticeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apprenticeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(apprenticeDTO))
            )
            .andExpect(status().isOk());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedApprenticeToMatchAllProperties(updatedApprentice);
    }

    @Test
    void putNonExistingApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apprenticeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(apprenticeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(apprenticeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(apprenticeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateApprenticeWithPatch() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the apprentice using partial update
        Apprentice partialUpdatedApprentice = new Apprentice();
        partialUpdatedApprentice.setId(apprentice.getId());

        restApprenticeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprentice.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedApprentice))
            )
            .andExpect(status().isOk());

        // Validate the Apprentice in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertApprenticeUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedApprentice, apprentice),
            getPersistedApprentice(apprentice)
        );
    }

    @Test
    void fullUpdateApprenticeWithPatch() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the apprentice using partial update
        Apprentice partialUpdatedApprentice = new Apprentice();
        partialUpdatedApprentice.setId(apprentice.getId());

        restApprenticeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprentice.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedApprentice))
            )
            .andExpect(status().isOk());

        // Validate the Apprentice in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertApprenticeUpdatableFieldsEquals(partialUpdatedApprentice, getPersistedApprentice(partialUpdatedApprentice));
    }

    @Test
    void patchNonExistingApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, apprenticeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(apprenticeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(apprenticeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamApprentice() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        apprentice.setId(UUID.randomUUID().toString());

        // Create the Apprentice
        ApprenticeDTO apprenticeDTO = apprenticeMapper.toDto(apprentice);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenticeMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(apprenticeDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Apprentice in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteApprentice() throws Exception {
        // Initialize the database
        insertedApprentice = apprenticeRepository.save(apprentice);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the apprentice
        restApprenticeMockMvc
            .perform(delete(ENTITY_API_URL_ID, apprentice.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return apprenticeRepository.count();
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

    protected Apprentice getPersistedApprentice(Apprentice apprentice) {
        return apprenticeRepository.findById(apprentice.getId()).orElseThrow();
    }

    protected void assertPersistedApprenticeToMatchAllProperties(Apprentice expectedApprentice) {
        assertApprenticeAllPropertiesEquals(expectedApprentice, getPersistedApprentice(expectedApprentice));
    }

    protected void assertPersistedApprenticeToMatchUpdatableProperties(Apprentice expectedApprentice) {
        assertApprenticeAllUpdatablePropertiesEquals(expectedApprentice, getPersistedApprentice(expectedApprentice));
    }
}

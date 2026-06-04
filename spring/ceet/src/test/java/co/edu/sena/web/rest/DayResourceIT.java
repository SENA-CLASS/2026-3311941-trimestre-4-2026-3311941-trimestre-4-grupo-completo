package co.edu.sena.web.rest;

import static co.edu.sena.domain.DayAsserts.*;
import static co.edu.sena.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Day;
import co.edu.sena.domain.enumeration.State;
import co.edu.sena.repository.DayRepository;
import co.edu.sena.service.dto.DayDTO;
import co.edu.sena.service.mapper.DayMapper;
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
 * Integration tests for the {@link DayResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DayResourceIT {

    private static final String DEFAULT_DAY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DAY_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_DAY_STATE = State.ACTIVE;
    private static final State UPDATED_DAY_STATE = State.INACTIVE;

    private static final String ENTITY_API_URL = "/api/days";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private DayMapper dayMapper;

    @Autowired
    private MockMvc restDayMockMvc;

    private Day day;

    private Day insertedDay;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Day createEntity() {
        return new Day().dayName(DEFAULT_DAY_NAME).dayState(DEFAULT_DAY_STATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Day createUpdatedEntity() {
        return new Day().dayName(UPDATED_DAY_NAME).dayState(UPDATED_DAY_STATE);
    }

    @BeforeEach
    void initTest() {
        day = createEntity();
    }

    @AfterEach
    void cleanup() {
        if (insertedDay != null) {
            dayRepository.delete(insertedDay);
            insertedDay = null;
        }
    }

    @Test
    void createDay() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);
        var returnedDayDTO = om.readValue(
            restDayMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DayDTO.class
        );

        // Validate the Day in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedDay = dayMapper.toEntity(returnedDayDTO);
        assertDayUpdatableFieldsEquals(returnedDay, getPersistedDay(returnedDay));

        insertedDay = returnedDay;
    }

    @Test
    void createDayWithExistingId() throws Exception {
        // Create the Day with an existing ID
        day.setId("existing_id");
        DayDTO dayDTO = dayMapper.toDto(day);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkDayNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        day.setDayName(null);

        // Create the Day, which fails.
        DayDTO dayDTO = dayMapper.toDto(day);

        restDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDayStateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        day.setDayState(null);

        // Create the Day, which fails.
        DayDTO dayDTO = dayMapper.toDto(day);

        restDayMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllDays() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        // Get all the dayList
        restDayMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(day.getId())))
            .andExpect(jsonPath("$.[*].dayName").value(hasItem(DEFAULT_DAY_NAME)))
            .andExpect(jsonPath("$.[*].dayState").value(hasItem(DEFAULT_DAY_STATE.toString())));
    }

    @Test
    void getDay() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        // Get the day
        restDayMockMvc
            .perform(get(ENTITY_API_URL_ID, day.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(day.getId()))
            .andExpect(jsonPath("$.dayName").value(DEFAULT_DAY_NAME))
            .andExpect(jsonPath("$.dayState").value(DEFAULT_DAY_STATE.toString()));
    }

    @Test
    void getNonExistingDay() throws Exception {
        // Get the day
        restDayMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    void putExistingDay() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the day
        Day updatedDay = dayRepository.findById(day.getId()).orElseThrow();
        updatedDay.dayName(UPDATED_DAY_NAME).dayState(UPDATED_DAY_STATE);
        DayDTO dayDTO = dayMapper.toDto(updatedDay);

        restDayMockMvc
            .perform(put(ENTITY_API_URL_ID, dayDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isOk());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDayToMatchAllProperties(updatedDay);
    }

    @Test
    void putNonExistingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(put(ENTITY_API_URL_ID, dayDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDayWithPatch() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the day using partial update
        Day partialUpdatedDay = new Day();
        partialUpdatedDay.setId(day.getId());

        partialUpdatedDay.dayState(UPDATED_DAY_STATE);

        restDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDay))
            )
            .andExpect(status().isOk());

        // Validate the Day in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedDay, day), getPersistedDay(day));
    }

    @Test
    void fullUpdateDayWithPatch() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the day using partial update
        Day partialUpdatedDay = new Day();
        partialUpdatedDay.setId(day.getId());

        partialUpdatedDay.dayName(UPDATED_DAY_NAME).dayState(UPDATED_DAY_STATE);

        restDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDay.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDay))
            )
            .andExpect(status().isOk());

        // Validate the Day in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDayUpdatableFieldsEquals(partialUpdatedDay, getPersistedDay(partialUpdatedDay));
    }

    @Test
    void patchNonExistingDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dayDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dayDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDay() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        day.setId(UUID.randomUUID().toString());

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDayMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dayDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Day in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDay() throws Exception {
        // Initialize the database
        insertedDay = dayRepository.save(day);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the day
        restDayMockMvc.perform(delete(ENTITY_API_URL_ID, day.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dayRepository.count();
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

    protected Day getPersistedDay(Day day) {
        return dayRepository.findById(day.getId()).orElseThrow();
    }

    protected void assertPersistedDayToMatchAllProperties(Day expectedDay) {
        assertDayAllPropertiesEquals(expectedDay, getPersistedDay(expectedDay));
    }

    protected void assertPersistedDayToMatchUpdatableProperties(Day expectedDay) {
        assertDayAllUpdatablePropertiesEquals(expectedDay, getPersistedDay(expectedDay));
    }
}
